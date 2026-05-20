# 02 — Database Schema Lengkap (PostgreSQL 16)

**Single-Tenant | Prisma ORM | Partitioning + Materialized Views**

---

## Daftar Isi

1. [Konvensi Penamaan](#1-konvensi-penamaan)
2. [Auth & Users](#2-auth--users)
3. [Audit Log](#3-audit-log)
4. [Master Data](#4-master-data)
5. [Profil RS — RL 1](#5-profil-rs--rl-1)
6. [Ketenagaan — RL 2](#6-ketenagaan--rl-2)
7. [Rawat Inap & Kunjungan — RL 3.1–3.5](#7-rawat-inap--kunjungan--rl-31-35)
8. [Kebidanan & Neonatal — RL 3.6–3.7](#8-kebidanan--neonatal--rl-36-37)
9. [Penunjang & Rujukan — RL 3.8–3.10](#9-penunjang--rujukan--rl-38-310)
10. [Layanan Khusus & Farmasi — RL 3.11–3.19](#10-layanan-khusus--farmasi--rl-311-319)
11. [Morbiditas — RL 4 & RL 5](#11-morbiditas--rl-4--rl-5)
12. [Workflow & Notifikasi](#12-workflow--notifikasi)
13. [Materialized Views](#13-materialized-views)
14. [Seed Data Dummy](#14-seed-data-dummy)

---

## 1. Konvensi Penamaan

- Tabel: `snake_case`, prefix per domain (`master_`, `rl1_`, `rl3_`, dll.)
- PK: `id UUID DEFAULT gen_random_uuid()` untuk tabel user-facing; `SERIAL` untuk master data
- Setiap tabel transaksional punya: `periode_id`, `created_at`, `updated_at`, `created_by`, `updated_by`
- Soft delete: kolom `deleted_at TIMESTAMPTZ` (NULL = aktif)
- Tabel besar (audit, sensus harian) menggunakan `PARTITION BY RANGE (created_at)` per tahun

---

## 2. Auth & Users

```sql
-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      VARCHAR(50)  UNIQUE NOT NULL,
  email         VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name     VARCHAR(100) NOT NULL,
  unit_kerja    VARCHAR(100),               -- e.g. 'IRNA Lantai 2', 'IGD'
  no_telepon    VARCHAR(20),
  is_active     BOOLEAN      DEFAULT TRUE,
  last_login    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ  DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  DEFAULT NOW(),
  deleted_at    TIMESTAMPTZ
);

CREATE INDEX idx_users_email    ON users(email)    WHERE deleted_at IS NULL;
CREATE INDEX idx_users_username ON users(username) WHERE deleted_at IS NULL;

-- ============================================================
-- ROLES
-- ============================================================
CREATE TABLE roles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode        VARCHAR(50)  UNIQUE NOT NULL,
  -- kode: ADMIN, PIC_UNIT, VALIDATOR, APPROVER, CODER, VIEWER_MANAJEMEN,
  --        INTEGRATOR, SUPERADMIN
  nama        VARCHAR(100) NOT NULL,
  deskripsi   TEXT,
  created_at  TIMESTAMPTZ  DEFAULT NOW()
);

-- ============================================================
-- PERMISSIONS
-- ============================================================
CREATE TABLE permissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode        VARCHAR(100) UNIQUE NOT NULL,
  -- format: {modul}:{aksi}  e.g. 'rl1:read', 'rl3_2:write', 'dashboard:read'
  modul       VARCHAR(50)  NOT NULL,
  aksi        VARCHAR(20)  NOT NULL, -- read, write, delete, submit, approve, export
  deskripsi   TEXT
);

CREATE TABLE user_roles (
  user_id    UUID REFERENCES users(id)  ON DELETE CASCADE,
  role_id    UUID REFERENCES roles(id)  ON DELETE CASCADE,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  granted_by UUID REFERENCES users(id),
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE role_permissions (
  role_id       UUID REFERENCES roles(id)       ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- ============================================================
-- REFRESH TOKENS
-- ============================================================
CREATE TABLE refresh_tokens (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash   VARCHAR(255) NOT NULL,
  expires_at   TIMESTAMPTZ NOT NULL,
  revoked_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  ip_address   INET,
  user_agent   TEXT
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id) WHERE revoked_at IS NULL;
```

---

## 3. Audit Log

```sql
-- ============================================================
-- AUDIT LOGS (Partitioned by Year)
-- ============================================================
CREATE TABLE audit_logs (
  id            BIGSERIAL,
  user_id       UUID,
  username      VARCHAR(50),   -- denormalized untuk histori
  aksi          VARCHAR(50)    NOT NULL,  -- CREATE,READ,UPDATE,DELETE,SUBMIT,APPROVE,REJECT,EXPORT
  modul         VARCHAR(50)    NOT NULL,  -- rl1, rl2, rl3_2, rl4_1, dashboard, admin
  entitas       VARCHAR(100),             -- nama tabel / objek
  entitas_id    VARCHAR(100),
  data_sebelum  JSONB,
  data_sesudah  JSONB,
  keterangan    TEXT,
  ip_address    INET,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ    DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE audit_logs_2024 PARTITION OF audit_logs
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
CREATE TABLE audit_logs_2025 PARTITION OF audit_logs
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
CREATE TABLE audit_logs_2026 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE INDEX idx_audit_modul   ON audit_logs(modul, created_at DESC);
CREATE INDEX idx_audit_user    ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_entitas ON audit_logs(entitas, entitas_id);
```

---

## 4. Master Data

```sql
-- ============================================================
-- MASTER ICD-10
-- ============================================================
CREATE TABLE master_icd10 (
  id                    SERIAL PRIMARY KEY,
  kode                  VARCHAR(10)  UNIQUE NOT NULL,
  deskripsi_id          TEXT         NOT NULL,
  deskripsi_en          TEXT,
  bab                   VARCHAR(5),          -- I, II, ... XXII
  blok                  VARCHAR(20),         -- A00-A09, dll.
  restriksi_gender      CHAR(1),             -- 'L'=Laki, 'P'=Perempuan, NULL=keduanya
  restriksi_umur_min    INTEGER,             -- dalam hari; 0=neonatus
  restriksi_umur_max    INTEGER,             -- dalam hari; NULL=tanpa batas
  is_active             BOOLEAN      DEFAULT TRUE,
  catatan               TEXT,
  updated_at            TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX idx_icd10_kode   ON master_icd10(kode);
CREATE INDEX idx_icd10_search ON master_icd10 USING GIN(to_tsvector('indonesian', deskripsi_id));

-- ============================================================
-- MASTER KELAS TEMPAT TIDUR
-- ============================================================
CREATE TABLE master_kelas_tt (
  id            SERIAL PRIMARY KEY,
  kode          VARCHAR(20)  UNIQUE NOT NULL,
  nama          VARCHAR(100) NOT NULL,
  kategori      VARCHAR(30)  NOT NULL,
  -- kategori: rawat_inap, icu, perinatologi, isolasi, intermediat, vk
  berventilasi  BOOLEAN      DEFAULT FALSE,
  urutan        INTEGER,
  is_active     BOOLEAN      DEFAULT TRUE
);

-- Data: VVIP, VIP, Kelas I, Kelas II, Kelas III,
--       ICU, ICU+Ventilator, ICCU/ICVCU, ICCU+Ventilator,
--       NICU, NICU+Ventilator, PICU, PICU+Ventilator,
--       HCU, RICU, RICU+Ventilator, Isolasi,
--       Perinatologi, VK Non-Covid, IGD Intermediate Ward

-- ============================================================
-- MASTER JENIS PELAYANAN
-- ============================================================
CREATE TABLE master_jenis_pelayanan (
  id        SERIAL PRIMARY KEY,
  kode      VARCHAR(20)  UNIQUE NOT NULL,
  nama      VARCHAR(100) NOT NULL,
  kategori  VARCHAR(50),    -- umum, spesialis, kjsu (Kanker Jantung Stroke Uronefrologi)
  is_active BOOLEAN DEFAULT TRUE
);

-- 36 jenis: Umum, Penyakit Dalam, Bedah, Obsgin, Anak, THT, Mata,
--           Saraf, Jiwa, Kulit Kelamin, Gigi Mulut, Jantung, Paru,
--           Ortopedi, Urologi, Bedah Saraf, Bedah Plastik, Bedah Anak,
--           Onkologi, Geriatri, Kedokteran Fisik Rehab, Anestesi,
--           Forensik, Gizi Klinik, Endokrin, Kardiologi Anak,
--           Neonatologi, Fetomaternal, Hematologi Onkologi Anak,
--           Bedah Toraks Kardiovaskular, Gastroenterologi, Hepatologi,
--           Nefrologi, Intensif, dll.

-- ============================================================
-- MASTER JENIS PEMERIKSAAN LAB
-- ============================================================
CREATE TABLE master_jenis_pemeriksaan_lab (
  id        SERIAL PRIMARY KEY,
  kode      VARCHAR(20)  UNIQUE NOT NULL,
  nama      VARCHAR(100) NOT NULL,
  sub_kode  VARCHAR(20),    -- sub-kategori jika ada
  urutan    INTEGER,
  is_active BOOLEAN DEFAULT TRUE
);

-- Hematologi, Kimia Klinik, Imunologi/Serologi, Urinalisis,
-- Hemostasis, Mikrobiologi Klinik, Parasitologi Klinik, Patologi Anatomi

-- ============================================================
-- MASTER KELOMPOK OBAT
-- ============================================================
CREATE TABLE master_kelompok_obat (
  id    SERIAL PRIMARY KEY,
  kode  VARCHAR(20) UNIQUE NOT NULL,
  nama  VARCHAR(100) NOT NULL,
  -- Generik Fornas, Generik Non-Fornas,
  -- Non-Generik Fornas, Non-Generik Non-Fornas
  is_fornas  BOOLEAN,
  is_generik BOOLEAN
);

-- ============================================================
-- MASTER KELOMPOK UMUR
-- ============================================================
CREATE TABLE master_kelompok_umur (
  id          SERIAL PRIMARY KEY,
  kode        VARCHAR(20) UNIQUE NOT NULL,
  label       VARCHAR(50) NOT NULL,    -- '<1 jam', '1–23 jam', '1–7 hari', ...
  min_hari    INTEGER NOT NULL,        -- batas bawah dalam hari
  max_hari    INTEGER,                 -- NULL = tidak terbatas
  urutan      INTEGER NOT NULL
);

-- 25 kelompok sesuai JUKNIS SIRS 6.3:
-- <1 jam, 1-23 jam, 1-7 hari, 8-28 hari, 29hr-<3bln, 3bln-<6bln,
-- 6bln-<9bln, 9bln-<12bln, 1-4 th, 5-9 th, 10-14 th, 15-19 th,
-- 20-24 th, 25-29 th, 30-34 th, 35-39 th, 40-44 th, 45-49 th,
-- 50-54 th, 55-59 th, 60-64 th, 65-69 th, 70-74 th, 75-84 th, ≥85 th

-- ============================================================
-- MASTER CARA BAYAR
-- ============================================================
CREATE TABLE master_cara_bayar (
  id        SERIAL PRIMARY KEY,
  kode      VARCHAR(20)  UNIQUE NOT NULL,
  nama      VARCHAR(100) NOT NULL,
  kategori  VARCHAR(50),  -- mandiri, pemerintah, swasta, gratis
  urutan    INTEGER,
  is_active BOOLEAN DEFAULT TRUE
);

-- Membayar Sendiri, JKN/BPJS, Jamkesda,
-- Asuransi Pemerintah Lainnya, Asuransi Swasta,
-- Cost Sharing, Gratis (Kartu Sehat/SKTM/lainnya)

-- ============================================================
-- MASTER JENIS NAKES
-- ============================================================
CREATE TABLE master_jenis_nakes (
  id              SERIAL PRIMARY KEY,
  kode            VARCHAR(20) UNIQUE NOT NULL,
  nama            VARCHAR(100) NOT NULL,
  kategori        VARCHAR(50),  -- medis, keperawatan, kebidanan, kefarmasian,
                                -- kesmas, kesling, gizi, keterapian_fisik,
                                -- keteknisian_medis, teknik_biomedika,
                                -- tenaga_psikologi, tenaga_penunjang
  is_active       BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- MASTER WILAYAH
-- ============================================================
CREATE TABLE master_wilayah (
  kode        VARCHAR(10) PRIMARY KEY,
  nama        VARCHAR(100) NOT NULL,
  level       SMALLINT NOT NULL,  -- 1=provinsi, 2=kab/kota, 3=kecamatan
  parent_kode VARCHAR(10) REFERENCES master_wilayah(kode)
);

CREATE INDEX idx_wilayah_parent ON master_wilayah(parent_kode);
```

---

## 5. Profil RS — RL 1

```sql
-- ============================================================
-- PROFIL RUMAH SAKIT (RL 1.1 & RL 1.2)
-- ============================================================
CREATE TABLE rs_profil (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Identitas
  nama_rs               VARCHAR(200) NOT NULL,
  kode_rs               VARCHAR(20),           -- kode dari Kemenkes
  jenis_rs              VARCHAR(50),           -- Umum, Khusus, Jiwa
  kelas_rs              CHAR(1),               -- A, B, C, D
  kepemilikan           VARCHAR(100),          -- Pemerintah Pusat, Pemda, TNI, Polri, Swasta
  status_blu            BOOLEAN DEFAULT FALSE,
  no_izin_operasional   VARCHAR(100),
  tgl_izin_operasional  DATE,
  no_penetapan_kelas    VARCHAR(100),
  tgl_penetapan_kelas   DATE,
  -- Kontak & Lokasi
  alamat                TEXT,
  kode_wilayah_kec      VARCHAR(10) REFERENCES master_wilayah(kode),
  kode_pos              VARCHAR(5),
  telepon               VARCHAR(20),
  fax                   VARCHAR(20),
  email                 VARCHAR(100),
  website               VARCHAR(200),
  latitude              NUMERIC(10,7),
  longitude             NUMERIC(10,7),
  -- Akreditasi
  status_akreditasi     VARCHAR(100),  -- Paripurna, Utama, Madya, Dasar, Tidak Terakreditasi
  lembaga_akreditasi    VARCHAR(100),  -- KARS, JCI
  no_sertifikat_akreditasi VARCHAR(100),
  tgl_akreditasi        DATE,
  tgl_berakhir_akreditasi DATE,
  -- Dokumen (path ke MinIO)
  dok_izin_operasional  VARCHAR(500),
  dok_sk_akreditasi     VARCHAR(500),
  dok_sk_kelas          VARCHAR(500),
  -- Metadata
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id)
);

-- ============================================================
-- KETERSEDIAAN LAYANAN RS (RL 1.2)
-- ============================================================
CREATE TABLE rs_layanan_tersedia (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jenis_pelayanan_id  INTEGER REFERENCES master_jenis_pelayanan(id),
  tersedia            BOOLEAN DEFAULT FALSE,
  keterangan          TEXT,
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_by          UUID REFERENCES users(id)
);

-- ============================================================
-- LAPORAN PERIODE (index semua laporan)
-- ============================================================
CREATE TABLE laporan_periode (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jenis         VARCHAR(10)  NOT NULL,  -- 'bulanan' | 'tahunan'
  tahun         SMALLINT     NOT NULL,
  bulan         SMALLINT,               -- NULL untuk laporan tahunan
  label         VARCHAR(20)  NOT NULL,  -- '2025-01', '2025'
  tgl_buka      DATE         NOT NULL,
  tgl_tutup     DATE         NOT NULL,  -- deadline (tgl 10 / 31 Maret)
  is_locked     BOOLEAN      DEFAULT FALSE,
  created_at    TIMESTAMPTZ  DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_periode_unik ON laporan_periode(jenis, tahun, bulan);

-- ============================================================
-- KETERSEDIAAN TEMPAT TIDUR HARIAN (RL 1.3) — Per Kelas TT
-- ============================================================
CREATE TABLE rl1_tt_harian (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tanggal       DATE     NOT NULL,
  shift         CHAR(1)  NOT NULL DEFAULT 'P',  -- P=Pagi, S=Sore
  kelas_tt_id   INTEGER  REFERENCES master_kelas_tt(id),
  tt_tersedia   SMALLINT NOT NULL DEFAULT 0,   -- jumlah TT yang siap pakai
  tt_terisi     SMALLINT NOT NULL DEFAULT 0,
  tt_rusak      SMALLINT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  created_by    UUID REFERENCES users(id),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_by    UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_tt_harian_unik ON rl1_tt_harian(tanggal, shift, kelas_tt_id);
CREATE INDEX idx_tt_harian_tgl ON rl1_tt_harian(tanggal DESC);

-- ============================================================
-- REKAPITULASI TT TAHUNAN (RL 1.3 Tahunan)
-- ============================================================
CREATE TABLE rl1_tt_tahunan (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id      UUID  REFERENCES laporan_periode(id),
  kelas_tt_id     INTEGER REFERENCES master_kelas_tt(id),
  tt_ditetapkan   SMALLINT DEFAULT 0,   -- TT sesuai penetapan kelas
  tt_efektif      SMALLINT DEFAULT 0,   -- TT yang benar-benar beroperasi
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_by      UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_tt_tahunan_unik ON rl1_tt_tahunan(periode_id, kelas_tt_id);

-- ============================================================
-- DATA PERALATAN (RL 1.4 / ASPAK)
-- ============================================================
CREATE TABLE rl1_peralatan (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id      UUID  REFERENCES laporan_periode(id),
  nama_alat       VARCHAR(200) NOT NULL,
  kode_aspak      VARCHAR(50),
  jumlah_ada      INTEGER DEFAULT 0,
  jumlah_berfungsi INTEGER DEFAULT 0,
  keterangan      TEXT,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_by      UUID REFERENCES users(id)
);
```

---

## 6. Ketenagaan — RL 2

```sql
-- ============================================================
-- KETENAGAAN (RL 2) — Per Jenis Nakes & Status Kepegawaian
-- ============================================================
CREATE TABLE rl2_ketenagaan (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id          UUID    REFERENCES laporan_periode(id),
  jenis_nakes_id      INTEGER REFERENCES master_jenis_nakes(id),
  -- Pendidikan
  pendidikan          VARCHAR(50), -- SD,SMP,SMA,D1,D2,D3,D4,S1,S2,S3,Sp,Sp2
  -- Status kepegawaian
  status_pegawai      VARCHAR(30), -- PNS, CPNS, PPPK, Kontrak, Magang
  -- Jenis kelamin
  jenis_kelamin       CHAR(1),     -- L, P
  -- Jumlah
  jumlah              SMALLINT     DEFAULT 0,
  -- Validasi SIP/STR
  memiliki_sip        BOOLEAN,
  memiliki_str        BOOLEAN,
  -- Metadata
  created_at          TIMESTAMPTZ  DEFAULT NOW(),
  updated_at          TIMESTAMPTZ  DEFAULT NOW(),
  updated_by          UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl2_unik ON rl2_ketenagaan(
  periode_id, jenis_nakes_id, pendidikan, status_pegawai, jenis_kelamin
);

CREATE INDEX idx_rl2_periode ON rl2_ketenagaan(periode_id);
```

---

## 7. Rawat Inap & Kunjungan — RL 3.1–3.5

```sql
-- ============================================================
-- SENSUS HARIAN RAWAT INAP (sumber data untuk RL 3.2)
-- ============================================================
CREATE TABLE rl3_sensus_harian (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tanggal             DATE        NOT NULL,
  kelas_tt_id         INTEGER     REFERENCES master_kelas_tt(id),
  jenis_pelayanan_id  INTEGER     REFERENCES master_jenis_pelayanan(id),
  -- Pasien awal hari (jam 00.00)
  pasien_awal         SMALLINT    DEFAULT 0,
  -- Masuk hari ini
  masuk_baru          SMALLINT    DEFAULT 0,
  masuk_pindahan      SMALLINT    DEFAULT 0,
  -- Keluar hari ini
  keluar_hidup        SMALLINT    DEFAULT 0,
  keluar_mati_lt48jam SMALLINT    DEFAULT 0,  -- mati <48 jam
  keluar_mati_ge48jam SMALLINT    DEFAULT 0,  -- mati ≥48 jam
  dipindahkan         SMALLINT    DEFAULT 0,
  -- Pasien akhir hari (jam 24.00) — derived, tapi disimpan untuk performa
  pasien_akhir        SMALLINT    GENERATED ALWAYS AS (
    pasien_awal + masuk_baru + masuk_pindahan
    - keluar_hidup - keluar_mati_lt48jam - keluar_mati_ge48jam - dipindahkan
  ) STORED,
  -- Hari Perawatan (HP) — jumlah TT terisi pada hari tsb
  hari_perawatan      SMALLINT    DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  created_by          UUID REFERENCES users(id),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_by          UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_sensus_harian_unik ON rl3_sensus_harian(tanggal, kelas_tt_id, jenis_pelayanan_id);
CREATE INDEX idx_sensus_harian_tgl ON rl3_sensus_harian(tanggal DESC);

-- ============================================================
-- RL 3.1 — INDIKATOR PELAYANAN RAWAT INAP (Bulanan & Tahunan)
-- Auto-generated dari sensus harian
-- ============================================================
CREATE TABLE rl3_1_indikator (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id          UUID    REFERENCES laporan_periode(id),
  kelas_tt_id         INTEGER REFERENCES master_kelas_tt(id),
  -- Input agregat dari sensus harian
  tt_tersedia         SMALLINT DEFAULT 0,      -- TT yang beroperasi
  hari_perawatan      INTEGER  DEFAULT 0,      -- total HP bulan ini
  pasien_keluar_hidup INTEGER  DEFAULT 0,
  pasien_keluar_mati  INTEGER  DEFAULT 0,      -- total mati (lt48 + ge48)
  pasien_mati_lt48    INTEGER  DEFAULT 0,
  lama_dirawat_total  INTEGER  DEFAULT 0,      -- total hari rawat semua pasien
  -- Indikator (computed, disimpan untuk performa)
  bor                 NUMERIC(5,2),            -- BOR = HP/(TT × hari kalender) × 100
  alos                NUMERIC(5,2),            -- ALOS = total hari rawat / pasien keluar
  bto                 NUMERIC(5,2),            -- BTO = pasien keluar / TT tersedia
  toi                 NUMERIC(5,2),            -- TOI = (TT×hari - HP) / pasien keluar
  ndr                 NUMERIC(5,2),            -- NDR = mati≥48 / pasien keluar × 1000
  gdr                 NUMERIC(5,2),            -- GDR = total mati / pasien keluar × 1000
  -- Metadata
  is_auto_generated   BOOLEAN  DEFAULT FALSE,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_by          UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_1_unik ON rl3_1_indikator(periode_id, kelas_tt_id);

-- ============================================================
-- RL 3.2 — RAWAT INAP PER JENIS PELAYANAN (Tahunan)
-- ============================================================
CREATE TABLE rl3_2_rawat_inap (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id            UUID    REFERENCES laporan_periode(id),
  jenis_pelayanan_id    INTEGER REFERENCES master_jenis_pelayanan(id),
  -- Pasien masuk per kelas TT (dipecah kelas I, II, III, VVIP, VIP, ICU, dll.)
  pasien_masuk_kelas_i      INTEGER DEFAULT 0,
  pasien_masuk_kelas_ii     INTEGER DEFAULT 0,
  pasien_masuk_kelas_iii    INTEGER DEFAULT 0,
  pasien_masuk_vvip         INTEGER DEFAULT 0,
  pasien_masuk_vip          INTEGER DEFAULT 0,
  pasien_masuk_icu          INTEGER DEFAULT 0,
  pasien_masuk_lainnya      INTEGER DEFAULT 0,
  -- Total & turunan
  total_pasien_masuk        INTEGER DEFAULT 0,
  total_pasien_keluar_hidup INTEGER DEFAULT 0,
  total_pasien_keluar_mati  INTEGER DEFAULT 0,
  -- Lama dirawat agregat
  total_hari_rawat          INTEGER DEFAULT 0,
  -- Metadata
  created_at                TIMESTAMPTZ DEFAULT NOW(),
  updated_at                TIMESTAMPTZ DEFAULT NOW(),
  updated_by                UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_2_unik ON rl3_2_rawat_inap(periode_id, jenis_pelayanan_id);

-- ============================================================
-- RL 3.3 — KUNJUNGAN RAWAT JALAN PER JENIS PELAYANAN
-- ============================================================
CREATE TABLE rl3_3_rawat_jalan (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id            UUID    REFERENCES laporan_periode(id),
  jenis_pelayanan_id    INTEGER REFERENCES master_jenis_pelayanan(id),
  -- Kunjungan
  kunjungan_baru_l      INTEGER DEFAULT 0,   -- kasus baru laki-laki
  kunjungan_baru_p      INTEGER DEFAULT 0,
  kunjungan_lama_l      INTEGER DEFAULT 0,
  kunjungan_lama_p      INTEGER DEFAULT 0,
  kunjungan_total       INTEGER DEFAULT 0,
  -- Cara bayar
  jkn                   INTEGER DEFAULT 0,
  mandiri               INTEGER DEFAULT 0,
  lainnya               INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_3_unik ON rl3_3_rawat_jalan(periode_id, jenis_pelayanan_id);

-- ============================================================
-- RL 3.4 — KUNJUNGAN IGD
-- ============================================================
CREATE TABLE rl3_4_igd (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id            UUID REFERENCES laporan_periode(id),
  -- Kedatangan
  datang_sendiri        INTEGER DEFAULT 0,
  rujukan_puskesmas     INTEGER DEFAULT 0,
  rujukan_rs_lain       INTEGER DEFAULT 0,
  rujukan_dokter        INTEGER DEFAULT 0,
  -- Tindak lanjut
  rawat_inap            INTEGER DEFAULT 0,
  rawat_jalan           INTEGER DEFAULT 0,
  rujuk_rs_lain         INTEGER DEFAULT 0,
  pulang_atas_permintaan INTEGER DEFAULT 0,
  doa                   INTEGER DEFAULT 0,   -- Dead on Arrival
  mati_di_igd           INTEGER DEFAULT 0,
  -- Cara bayar
  jkn                   INTEGER DEFAULT 0,
  mandiri               INTEGER DEFAULT 0,
  lainnya               INTEGER DEFAULT 0,
  -- Waktu tunggu (menit)
  avg_waktu_tunggu      NUMERIC(6,1),
  -- Total
  total_kunjungan       INTEGER GENERATED ALWAYS AS (
    rawat_inap + rawat_jalan + rujuk_rs_lain
    + pulang_atas_permintaan + doa + mati_di_igd
  ) STORED,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_4_unik ON rl3_4_igd(periode_id);
```

---

## 8. Kebidanan & Neonatal — RL 3.6–3.7

```sql
-- ============================================================
-- RL 3.6 — KEBIDANAN
-- ============================================================
CREATE TABLE rl3_6_kebidanan (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id                UUID REFERENCES laporan_periode(id),
  -- Persalinan
  persalinan_normal         INTEGER DEFAULT 0,
  persalinan_spontan_penyulit INTEGER DEFAULT 0,
  persalinan_vakum_forceps  INTEGER DEFAULT 0,
  persalinan_sc             INTEGER DEFAULT 0,
  total_persalinan          INTEGER GENERATED ALWAYS AS (
    persalinan_normal + persalinan_spontan_penyulit
    + persalinan_vakum_forceps + persalinan_sc
  ) STORED,
  -- Komplikasi Obstetri
  komplikasi_pendarahan     INTEGER DEFAULT 0,
  komplikasi_preeklampsia   INTEGER DEFAULT 0,
  komplikasi_infeksi        INTEGER DEFAULT 0,
  komplikasi_lainnya        INTEGER DEFAULT 0,
  -- Komplikasi Non-Obstetri
  komplikasi_hiv            INTEGER DEFAULT 0,
  komplikasi_hbsag          INTEGER DEFAULT 0,
  komplikasi_sifilis        INTEGER DEFAULT 0,
  komplikasi_tbc            INTEGER DEFAULT 0,
  komplikasi_malaria        INTEGER DEFAULT 0,
  -- Kematian ibu
  kematian_ibu_bersalin     INTEGER DEFAULT 0,
  kematian_ibu_nifas        INTEGER DEFAULT 0,
  penyebab_utama_kematian   TEXT,
  -- Metadata
  created_at                TIMESTAMPTZ DEFAULT NOW(),
  updated_at                TIMESTAMPTZ DEFAULT NOW(),
  updated_by                UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_6_unik ON rl3_6_kebidanan(periode_id);

-- ============================================================
-- RL 3.7 — NEONATAL
-- ============================================================
CREATE TABLE rl3_7_neonatal (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id                  UUID REFERENCES laporan_periode(id),
  -- Bayi lahir
  lahir_hidup                 INTEGER DEFAULT 0,
  lahir_mati                  INTEGER DEFAULT 0,
  bblr                        INTEGER DEFAULT 0,   -- Berat Bayi Lahir Rendah <2500g
  bblr_meninggal              INTEGER DEFAULT 0,
  -- Skrining
  skrining_hipertiroid_kongenital INTEGER DEFAULT 0,
  imd_berhasil                INTEGER DEFAULT 0,   -- Inisiasi Menyusu Dini
  -- Metode Kanguru
  perawatan_metode_kanguru    INTEGER DEFAULT 0,
  -- Imunisasi
  imunisasi_hb0               INTEGER DEFAULT 0,
  imunisasi_bcg               INTEGER DEFAULT 0,
  imunisasi_polio1            INTEGER DEFAULT 0,
  imunisasi_dpt1              INTEGER DEFAULT 0,
  imunisasi_ipv               INTEGER DEFAULT 0,
  imunisasi_campak_rubela     INTEGER DEFAULT 0,
  -- Kematian neonatal
  kematian_neonatal_dini      INTEGER DEFAULT 0,   -- 0-6 hari
  kematian_neonatal_lanjut    INTEGER DEFAULT 0,   -- 7-28 hari
  penyebab_utama_kematian     TEXT,
  created_at                  TIMESTAMPTZ DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ DEFAULT NOW(),
  updated_by                  UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_7_unik ON rl3_7_neonatal(periode_id);
```

---

## 9. Penunjang & Rujukan — RL 3.8–3.10

```sql
-- ============================================================
-- RL 3.8 — LABORATORIUM
-- ============================================================
CREATE TABLE rl3_8_laboratorium (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id              UUID    REFERENCES laporan_periode(id),
  jenis_pemeriksaan_id    INTEGER REFERENCES master_jenis_pemeriksaan_lab(id),
  -- Jumlah pemeriksaan per sumber
  dari_rawat_inap         INTEGER DEFAULT 0,
  dari_rawat_jalan        INTEGER DEFAULT 0,
  dari_igd                INTEGER DEFAULT 0,
  dari_luar_rs            INTEGER DEFAULT 0,
  total_pemeriksaan       INTEGER GENERATED ALWAYS AS (
    dari_rawat_inap + dari_rawat_jalan + dari_igd + dari_luar_rs
  ) STORED,
  -- QC
  jumlah_tidak_valid      INTEGER DEFAULT 0,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_by              UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_8_unik ON rl3_8_laboratorium(periode_id, jenis_pemeriksaan_id);

-- ============================================================
-- RL 3.9 — RADIOLOGI
-- ============================================================
CREATE TABLE rl3_9_radiologi (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id          UUID REFERENCES laporan_periode(id),
  jenis_pemeriksaan   VARCHAR(100) NOT NULL,
  -- e.g. Foto Polos, USG, CT Scan, MRI, Fluoroskopi, Mamografi,
  --      Panoramik, Nuklear Medik, Angiografi, Radioterapi
  dari_rawat_inap     INTEGER DEFAULT 0,
  dari_rawat_jalan    INTEGER DEFAULT 0,
  dari_igd            INTEGER DEFAULT 0,
  total               INTEGER GENERATED ALWAYS AS (
    dari_rawat_inap + dari_rawat_jalan + dari_igd
  ) STORED,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_by          UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_9_unik ON rl3_9_radiologi(periode_id, jenis_pemeriksaan);

-- ============================================================
-- RL 3.10 — RUJUKAN
-- ============================================================
CREATE TABLE rl3_10_rujukan (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id            UUID REFERENCES laporan_periode(id),
  -- Rujukan masuk (dari luar RS ke RS ini)
  rujuk_masuk_puskesmas INTEGER DEFAULT 0,
  rujuk_masuk_rs_lain   INTEGER DEFAULT 0,
  rujuk_masuk_klinik    INTEGER DEFAULT 0,
  -- Rujukan keluar (dari RS ini ke luar)
  rujuk_keluar_rs_lain  INTEGER DEFAULT 0,
  rujuk_keluar_puskesmas INTEGER DEFAULT 0,
  -- Per asal pasien (IRNA/IRJA/IGD)
  dari_rawat_inap       INTEGER DEFAULT 0,
  dari_rawat_jalan      INTEGER DEFAULT 0,
  dari_igd              INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_10_unik ON rl3_10_rujukan(periode_id);
```

---

## 10. Layanan Khusus & Farmasi — RL 3.11–3.19

```sql
-- RL 3.11 — GIGI MULUT
CREATE TABLE rl3_11_gigi (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id        UUID REFERENCES laporan_periode(id),
  jenis_tindakan    VARCHAR(100),   -- Pemeriksaan, Pencabutan, Penambalan, Dll.
  jumlah_l          INTEGER DEFAULT 0,
  jumlah_p          INTEGER DEFAULT 0,
  total             INTEGER GENERATED ALWAYS AS (jumlah_l + jumlah_p) STORED,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_by        UUID REFERENCES users(id)
);

-- RL 3.12 — REHABILITASI MEDIK
CREATE TABLE rl3_12_rehab_medik (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id        UUID REFERENCES laporan_periode(id),
  jenis_pelayanan   VARCHAR(100),  -- Fisioterapi, Terapi Wicara, Terapi Okupasi, Ortetik Prostetik
  jumlah_kunjungan  INTEGER DEFAULT 0,
  jumlah_pasien_baru INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_by        UUID REFERENCES users(id)
);

-- RL 3.13 — PELAYANAN KHUSUS
CREATE TABLE rl3_13_pelayanan_khusus (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id        UUID REFERENCES laporan_periode(id),
  jenis_layanan     VARCHAR(100),
  -- Hemodialisis, Kemoterapi, Radioterapi, ESWL, Hiperbarik, dll.
  jumlah_tindakan   INTEGER DEFAULT 0,
  jumlah_pasien     INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_by        UUID REFERENCES users(id)
);

-- RL 3.14 — KESEHATAN JIWA
CREATE TABLE rl3_14_keswa (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id            UUID REFERENCES laporan_periode(id),
  -- Rawat Jalan
  rj_kunjungan_baru_l   INTEGER DEFAULT 0,
  rj_kunjungan_baru_p   INTEGER DEFAULT 0,
  rj_kunjungan_lama_l   INTEGER DEFAULT 0,
  rj_kunjungan_lama_p   INTEGER DEFAULT 0,
  -- Rawat Inap
  ri_masuk_l            INTEGER DEFAULT 0,
  ri_masuk_p            INTEGER DEFAULT 0,
  ri_keluar_hidup_l     INTEGER DEFAULT 0,
  ri_keluar_hidup_p     INTEGER DEFAULT 0,
  ri_keluar_mati        INTEGER DEFAULT 0,
  -- Tindakan khusus
  psikoterapi           INTEGER DEFAULT 0,
  ecg                   INTEGER DEFAULT 0,   -- Elektrokonvulsif
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id)
);

-- RL 3.15 — KELUARGA BERENCANA
CREATE TABLE rl3_15_kb (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id        UUID REFERENCES laporan_periode(id),
  metode_kb         VARCHAR(50),  -- IUD, MOW, MOP, Kondom, Implant, Suntik, Pil
  peserta_baru      INTEGER DEFAULT 0,
  peserta_lama      INTEGER DEFAULT 0,
  komplikasi        INTEGER DEFAULT 0,
  kegagalan         INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_by        UUID REFERENCES users(id)
);

-- RL 3.16 — OBAT KHUSUS (Narkotika, Psikotropika, Obat Keras)
CREATE TABLE rl3_16_obat_khusus (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id        UUID REFERENCES laporan_periode(id),
  jenis_obat        VARCHAR(50),  -- narkotika, psikotropika, obat_keras
  nama_obat         VARCHAR(200),
  satuan            VARCHAR(20),
  stok_awal         NUMERIC(10,2) DEFAULT 0,
  penerimaan        NUMERIC(10,2) DEFAULT 0,
  pemakaian         NUMERIC(10,2) DEFAULT 0,
  stok_akhir        NUMERIC(10,2) DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_by        UUID REFERENCES users(id)
);

-- RL 3.17 — FARMASI (Penggunaan Obat)
CREATE TABLE rl3_17_farmasi (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id          UUID    REFERENCES laporan_periode(id),
  kelompok_obat_id    INTEGER REFERENCES master_kelompok_obat(id),
  -- Jumlah R/ (resep) yang dilayani
  jumlah_resep_ri     INTEGER DEFAULT 0,   -- rawat inap
  jumlah_resep_rj     INTEGER DEFAULT 0,   -- rawat jalan
  jumlah_resep_igd    INTEGER DEFAULT 0,
  total_resep         INTEGER GENERATED ALWAYS AS (
    jumlah_resep_ri + jumlah_resep_rj + jumlah_resep_igd
  ) STORED,
  -- Nilai rupiah
  nilai_rp            NUMERIC(15,0) DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_by          UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_17_unik ON rl3_17_farmasi(periode_id, kelompok_obat_id);

-- RL 3.18 — RESEP (per sumber)
CREATE TABLE rl3_18_resep (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id            UUID REFERENCES laporan_periode(id),
  sumber                VARCHAR(20),  -- rawat_inap, rawat_jalan, igd
  jumlah_lembar_resep   INTEGER DEFAULT 0,
  jumlah_item_obat      INTEGER DEFAULT 0,
  jumlah_dilayani_penuh INTEGER DEFAULT 0,
  jumlah_dilayani_sebagian INTEGER DEFAULT 0,
  jumlah_tidak_dilayani INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id)
);

-- RL 3.19 — CARA BAYAR PASIEN
CREATE TABLE rl3_19_cara_bayar (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id        UUID    REFERENCES laporan_periode(id),
  cara_bayar_id     INTEGER REFERENCES master_cara_bayar(id),
  sumber            VARCHAR(20),  -- rawat_inap, rawat_jalan, igd
  jumlah_pasien     INTEGER DEFAULT 0,
  nilai_tagihan_rp  NUMERIC(15,0) DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_by        UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl3_19_unik ON rl3_19_cara_bayar(periode_id, cara_bayar_id, sumber);
```

---

## 11. Morbiditas — RL 4 & RL 5

```sql
-- ============================================================
-- RL 4.1 — MORBIDITAS RAWAT INAP (per ICD-10 × Kelompok Umur × Gender)
-- ============================================================
CREATE TABLE rl4_1_morbiditas_ri (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id            UUID    REFERENCES laporan_periode(id),
  icd10_id              INTEGER REFERENCES master_icd10(id),
  kelompok_umur_id      INTEGER REFERENCES master_kelompok_umur(id),
  -- Kasus per gender
  kasus_baru_l          INTEGER DEFAULT 0,
  kasus_baru_p          INTEGER DEFAULT 0,
  -- Kematian per gender
  mati_l                INTEGER DEFAULT 0,
  mati_p                INTEGER DEFAULT 0,
  -- Lama dirawat
  total_hari_rawat      INTEGER DEFAULT 0,
  -- Metadata
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id)
) PARTITION BY LIST (EXTRACT(YEAR FROM created_at)::INTEGER);

CREATE UNIQUE INDEX idx_rl4_1_unik ON rl4_1_morbiditas_ri(
  periode_id, icd10_id, kelompok_umur_id
);
CREATE INDEX idx_rl4_1_icd10    ON rl4_1_morbiditas_ri(icd10_id);
CREATE INDEX idx_rl4_1_periode  ON rl4_1_morbiditas_ri(periode_id);

-- ============================================================
-- RL 4.2 — MORBIDITAS RAWAT INAP KHUSUS (per Jenis Pelayanan)
-- ============================================================
CREATE TABLE rl4_2_morbiditas_ri_khusus (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id            UUID    REFERENCES laporan_periode(id),
  jenis_pelayanan_id    INTEGER REFERENCES master_jenis_pelayanan(id),
  icd10_id              INTEGER REFERENCES master_icd10(id),
  jumlah_kasus          INTEGER DEFAULT 0,
  jumlah_mati           INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id)
);

-- ============================================================
-- RL 5.1 — MORBIDITAS RAWAT JALAN (per ICD-10 × Kelompok Umur × Gender)
-- ============================================================
CREATE TABLE rl5_1_morbiditas_rj (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id            UUID    REFERENCES laporan_periode(id),
  icd10_id              INTEGER REFERENCES master_icd10(id),
  kelompok_umur_id      INTEGER REFERENCES master_kelompok_umur(id),
  kunjungan_baru_l      INTEGER DEFAULT 0,
  kunjungan_baru_p      INTEGER DEFAULT 0,
  kunjungan_lama_l      INTEGER DEFAULT 0,
  kunjungan_lama_p      INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id)
);

CREATE UNIQUE INDEX idx_rl5_1_unik ON rl5_1_morbiditas_rj(
  periode_id, icd10_id, kelompok_umur_id
);
CREATE INDEX idx_rl5_1_icd10   ON rl5_1_morbiditas_rj(icd10_id);
CREATE INDEX idx_rl5_1_periode ON rl5_1_morbiditas_rj(periode_id);
```

---

## 12. Workflow & Notifikasi

```sql
-- ============================================================
-- STATUS LAPORAN PER MODUL PER PERIODE (Workflow)
-- ============================================================
CREATE TABLE laporan_status (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periode_id    UUID REFERENCES laporan_periode(id),
  modul         VARCHAR(30) NOT NULL,
  -- modul: rl1, rl2, rl3_1, rl3_2, rl3_3, rl3_4, rl3_5,
  --        rl3_6, rl3_7, rl3_8, rl3_9, rl3_10, rl3_11,
  --        rl3_12, rl3_13, rl3_14, rl3_15, rl3_16, rl3_17,
  --        rl3_18, rl3_19, rl4_1, rl4_2, rl5_1
  status        VARCHAR(20) NOT NULL DEFAULT 'draft',
  -- draft → submitted → validated → approved → sent → acknowledged
  catatan       TEXT,                   -- catatan dari validator/approver
  submitted_at  TIMESTAMPTZ,
  submitted_by  UUID REFERENCES users(id),
  validated_at  TIMESTAMPTZ,
  validated_by  UUID REFERENCES users(id),
  approved_at   TIMESTAMPTZ,
  approved_by   UUID REFERENCES users(id),
  sent_at       TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  rejection_reason TEXT,               -- alasan penolakan dari Kemenkes
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_laporan_status_unik ON laporan_status(periode_id, modul);

-- ============================================================
-- SUBMISSION LOG (riwayat pengiriman ke Kemenkes)
-- ============================================================
CREATE TABLE submission_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  laporan_status_id UUID REFERENCES laporan_status(id),
  target_sistem   VARCHAR(50) NOT NULL,  -- SIRS_ONLINE, RS_ONLINE, ASPAK, SISDMK
  endpoint_url    VARCHAR(500),
  request_payload JSONB,
  response_code   SMALLINT,
  response_body   JSONB,
  is_success      BOOLEAN,
  error_message   TEXT,
  attempt_number  SMALLINT DEFAULT 1,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFIKASI LOG
-- ============================================================
CREATE TABLE notifikasi_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipe          VARCHAR(20),    -- email, whatsapp, in_app
  penerima      VARCHAR(100),   -- email atau nomor WA
  subjek        VARCHAR(200),
  isi           TEXT,
  status        VARCHAR(20),    -- pending, sent, failed
  error_message TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  sent_at       TIMESTAMPTZ
);

-- ============================================================
-- JOB SCHEDULER REGISTRY
-- ============================================================
CREATE TABLE scheduler_jobs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_job        VARCHAR(100) NOT NULL,
  deskripsi       TEXT,
  cron_expression VARCHAR(50),          -- e.g. '0 8 1-10 * *'
  is_active       BOOLEAN DEFAULT TRUE,
  last_run        TIMESTAMPTZ,
  next_run        TIMESTAMPTZ,
  last_status     VARCHAR(20),          -- success, failed, running
  last_error      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 13. Materialized Views

```sql
-- ============================================================
-- MV: INDIKATOR BULANAN TERBARU (untuk dashboard)
-- ============================================================
CREATE MATERIALIZED VIEW mv_indikator_terbaru AS
SELECT
  lp.tahun,
  lp.bulan,
  lp.label AS periode,
  kt.nama  AS kelas_tt,
  ri.tt_tersedia,
  ri.hari_perawatan,
  ri.bor,
  ri.alos,
  ri.bto,
  ri.toi,
  ri.ndr,
  ri.gdr
FROM rl3_1_indikator ri
JOIN laporan_periode lp ON ri.periode_id = lp.id
JOIN master_kelas_tt kt ON ri.kelas_tt_id = kt.id
WHERE lp.jenis = 'bulanan'
ORDER BY lp.tahun DESC, lp.bulan DESC;

CREATE UNIQUE INDEX idx_mv_indikator ON mv_indikator_terbaru(periode, kelas_tt);

-- ============================================================
-- MV: 10 BESAR PENYAKIT RAWAT INAP (per tahun)
-- ============================================================
CREATE MATERIALIZED VIEW mv_10_besar_ri AS
SELECT
  lp.tahun,
  i.kode       AS kode_icd10,
  i.deskripsi_id AS diagnosis,
  SUM(m.kasus_baru_l + m.kasus_baru_p) AS total_kasus,
  SUM(m.mati_l + m.mati_p)             AS total_mati,
  RANK() OVER (
    PARTITION BY lp.tahun
    ORDER BY SUM(m.kasus_baru_l + m.kasus_baru_p) DESC
  ) AS peringkat
FROM rl4_1_morbiditas_ri m
JOIN laporan_periode lp ON m.periode_id = lp.id
JOIN master_icd10 i     ON m.icd10_id = i.id
GROUP BY lp.tahun, i.kode, i.deskripsi_id;

CREATE INDEX idx_mv_10besar_tahun ON mv_10_besar_ri(tahun, peringkat);

-- ============================================================
-- MV: KEPATUHAN PELAPORAN (per modul per periode)
-- ============================================================
CREATE MATERIALIZED VIEW mv_kepatuhan_laporan AS
SELECT
  lp.label  AS periode,
  ls.modul,
  ls.status,
  CASE
    WHEN ls.sent_at IS NOT NULL AND ls.sent_at <= lp.tgl_tutup THEN 'tepat_waktu'
    WHEN ls.sent_at IS NOT NULL AND ls.sent_at >  lp.tgl_tutup THEN 'terlambat'
    ELSE 'belum_dikirim'
  END AS kepatuhan
FROM laporan_status ls
JOIN laporan_periode lp ON ls.periode_id = lp.id;

-- Refresh semua MV (dijalankan via cron job setiap malam)
-- REFRESH MATERIALIZED VIEW CONCURRENTLY mv_indikator_terbaru;
-- REFRESH MATERIALIZED VIEW CONCURRENTLY mv_10_besar_ri;
-- REFRESH MATERIALIZED VIEW CONCURRENTLY mv_kepatuhan_laporan;
```

---

## 14. Seed Data Dummy

```sql
-- ============================================================
-- SEED: PROFIL RS (dummy)
-- ============================================================
INSERT INTO rs_profil (
  nama_rs, kode_rs, jenis_rs, kelas_rs, kepemilikan,
  no_izin_operasional, status_akreditasi, alamat, telepon, email
) VALUES (
  'RSUD Dr. Soedirman',
  'RS-001-DEMO',
  'Umum',
  'B',
  'Pemerintah Daerah',
  'HK.02.03/I/1234/2023',
  'Paripurna',
  'Jl. Ahmad Yani No. 100, Jakarta Pusat, DKI Jakarta',
  '021-5551234',
  'info@rsudsoedirman.demo.id'
);

-- ============================================================
-- SEED: ROLES
-- ============================================================
INSERT INTO roles (kode, nama, deskripsi) VALUES
  ('SUPERADMIN',      'Super Administrator',    'Akses penuh ke seluruh sistem'),
  ('ADMIN',           'Administrator',          'Kelola user & konfigurasi'),
  ('PIC_UNIT',        'PIC Unit Pelaporan',     'Input data per unit kerja'),
  ('VALIDATOR',       'Validator Laporan',      'Review & validasi laporan sebelum approve'),
  ('APPROVER',        'Approver',               'Persetujuan akhir sebelum kirim ke Kemenkes'),
  ('CODER',           'Coder ICD-10',           'Entry dan review kode diagnosis ICD-10'),
  ('VIEWER_MNJMN',    'Viewer Manajemen',       'Lihat dashboard & laporan (read-only)'),
  ('INTEGRATOR',      'Integrator Sistem',      'Kelola koneksi ke SIMRS & aplikasi Kemenkes');

-- ============================================================
-- SEED: USERS DUMMY
-- ============================================================
INSERT INTO users (username, email, password_hash, full_name, unit_kerja) VALUES
  ('admin',      'admin@rs.demo',       '$2b$12$HASHED_ADMIN',    'Administrator Sistem',  'IT'),
  ('pic_irna',   'irna@rs.demo',        '$2b$12$HASHED_PIC1',     'Budi Santoso',          'IRNA'),
  ('pic_igd',    'igd@rs.demo',         '$2b$12$HASHED_PIC2',     'Siti Rahayu',           'IGD'),
  ('pic_lab',    'lab@rs.demo',         '$2b$12$HASHED_PIC3',     'Ahmad Fauzi',           'Laboratorium'),
  ('pic_farmasi','farmasi@rs.demo',     '$2b$12$HASHED_PIC4',     'Dewi Lestari',          'Farmasi'),
  ('pic_rm',     'rekammedis@rs.demo',  '$2b$12$HASHED_PIC5',     'Eko Prasetyo',          'Rekam Medis'),
  ('validator1', 'validator@rs.demo',   '$2b$12$HASHED_VAL',      'Dr. Hendra Wijaya',     'Komite SIRS'),
  ('direksi',    'direksi@rs.demo',     '$2b$12$HASHED_DIR',      'dr. Ir. Soekarno, SpKJ','Direksi');

-- ============================================================
-- SEED: KELAS TEMPAT TIDUR
-- ============================================================
INSERT INTO master_kelas_tt (kode, nama, kategori, berventilasi, urutan) VALUES
  ('VVIP',       'VVIP',                   'rawat_inap',   FALSE, 1),
  ('VIP',        'VIP',                    'rawat_inap',   FALSE, 2),
  ('KELAS_I',    'Kelas I',                'rawat_inap',   FALSE, 3),
  ('KELAS_II',   'Kelas II',               'rawat_inap',   FALSE, 4),
  ('KELAS_III',  'Kelas III',              'rawat_inap',   FALSE, 5),
  ('ICU',        'ICU',                    'icu',          FALSE, 6),
  ('ICU_VENT',   'ICU + Ventilator',       'icu',          TRUE,  7),
  ('ICCU',       'ICCU/ICVCU',             'icu',          FALSE, 8),
  ('ICCU_VENT',  'ICCU/ICVCU + Ventilator','icu',          TRUE,  9),
  ('NICU',       'NICU',                   'perinatologi', FALSE, 10),
  ('NICU_VENT',  'NICU + Ventilator',      'perinatologi', TRUE,  11),
  ('PICU',       'PICU',                   'perinatologi', FALSE, 12),
  ('PICU_VENT',  'PICU + Ventilator',      'perinatologi', TRUE,  13),
  ('HCU',        'HCU',                    'icu',          FALSE, 14),
  ('RICU',       'RICU',                   'icu',          FALSE, 15),
  ('RICU_VENT',  'RICU + Ventilator',      'icu',          TRUE,  16),
  ('ISOLASI',    'Isolasi',                'isolasi',      FALSE, 17),
  ('PERINATO',   'Perinatologi',           'perinatologi', FALSE, 18),
  ('VK',         'VK Non-Covid',           'vk',           FALSE, 19),
  ('IGD_IMW',    'IGD Intermediate Ward',  'intermediat',  FALSE, 20);

-- ============================================================
-- SEED: CARA BAYAR
-- ============================================================
INSERT INTO master_cara_bayar (kode, nama, kategori, urutan) VALUES
  ('MANDIRI',    'Membayar Sendiri',               'mandiri',   1),
  ('JKN',        'JKN/BPJS Kesehatan',             'pemerintah',2),
  ('JAMKESDA',   'Jamkesda',                       'pemerintah',3),
  ('ASR_PEMDA',  'Asuransi Pemerintah Lainnya',    'pemerintah',4),
  ('ASR_SWASTA', 'Asuransi Swasta',                'swasta',    5),
  ('COST_SHARE', 'Cost Sharing',                   'campuran',  6),
  ('GRATIS',     'Gratis (Kartu Sehat/SKTM/dll.)', 'gratis',    7);

-- ============================================================
-- SEED: LAPORAN PERIODE (6 bulan terakhir + periode tahunan)
-- ============================================================
INSERT INTO laporan_periode (jenis, tahun, bulan, label, tgl_buka, tgl_tutup) VALUES
  ('bulanan', 2025, 10, '2025-10', '2025-10-01', '2025-11-10'),
  ('bulanan', 2025, 11, '2025-11', '2025-11-01', '2025-12-10'),
  ('bulanan', 2025, 12, '2025-12', '2025-12-01', '2026-01-10'),
  ('bulanan', 2026,  1, '2026-01', '2026-01-01', '2026-02-10'),
  ('bulanan', 2026,  2, '2026-02', '2026-02-01', '2026-03-10'),
  ('bulanan', 2026,  3, '2026-03', '2026-03-01', '2026-04-10'),
  ('bulanan', 2026,  4, '2026-04', '2026-04-01', '2026-05-10'),
  ('bulanan', 2026,  5, '2026-05', '2026-05-01', '2026-06-10'),
  ('tahunan', 2025, NULL, '2025',  '2026-01-01', '2026-03-31');
```

---

> **Catatan Performa:** Untuk tabel `rl4_1_morbiditas_ri` dan `rl5_1_morbiditas_rj` yang berpotensi besar (ribuan kode ICD-10 × 25 kelompok umur × 12 bulan), gunakan **partitioning by year** dan pastikan index pada `(periode_id, icd10_id)` selalu digunakan query. Materialized view `mv_10_besar_ri` di-refresh setiap malam jam 01.00 via BullMQ cron job.
