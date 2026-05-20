# 03 — API Specification (REST)

**NestJS | JWT Auth | OpenAPI 3.0 Style**

Base URL: `https://{host}/api/v1`

---

## Daftar Isi

1. [Konvensi & Auth](#1-konvensi--auth)
2. [Auth Endpoints](#2-auth-endpoints)
3. [Master Data](#3-master-data)
4. [RL 1 — Identitas RS](#4-rl-1--identitas-rs)
5. [RL 2 — Ketenagaan](#5-rl-2--ketenagaan)
6. [RL 3 — Rawat Inap & Penunjang](#6-rl-3--rawat-inap--penunjang)
7. [RL 4 & RL 5 — Morbiditas](#7-rl-4--rl-5--morbiditas)
8. [Dashboard](#8-dashboard)
9. [Workflow & Approval](#9-workflow--approval)
10. [Integrasi Kemenkes](#10-integrasi-kemenkes)
11. [Admin](#11-admin)
12. [Error Response](#12-error-response)

---

## 1. Konvensi & Auth

### Headers Wajib

```
Authorization: Bearer <access_token>
Content-Type: application/json
Accept: application/json
```

### Query Parameter Umum

| Parameter | Tipe | Deskripsi |
|---|---|---|
| `page` | integer | Nomor halaman (default: 1) |
| `limit` | integer | Item per halaman (default: 20, max: 100) |
| `sort` | string | Kolom sort, e.g. `created_at:desc` |

### Struktur Response Standar

```json
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 150 }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data tidak valid",
    "details": [{ "field": "bor", "message": "BOR tidak boleh melebihi 100%" }]
  }
}
```

---

## 2. Auth Endpoints

### POST /auth/login

Autentikasi pengguna, mengembalikan access token (15 menit) + refresh token (7 hari).

**Request:**
```json
{
  "username": "pic_irna",
  "password": "P@ssw0rd123"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 900,
    "user": {
      "id": "uuid",
      "username": "pic_irna",
      "full_name": "Budi Santoso",
      "roles": ["PIC_UNIT"],
      "permissions": ["rl3_2:read", "rl3_2:write", "rl3_4:read", "rl3_4:write"]
    }
  }
}
```

---

### POST /auth/refresh

Perbarui access token menggunakan refresh token.

**Request:**
```json
{ "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

---

### POST /auth/logout

Revoke refresh token aktif.

---

### GET /auth/me

Informasi user yang sedang login + permissions.

---

### PATCH /auth/change-password

```json
{
  "current_password": "OldPass123",
  "new_password": "NewPass456!",
  "confirm_password": "NewPass456!"
}
```

---

## 3. Master Data

### GET /master/icd10

Pencarian kode ICD-10 dengan full-text search.

**Query:** `?q=hipertensi&page=1&limit=20`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "kode": "I10",
      "deskripsi_id": "Hipertensi esensial (primer)",
      "deskripsi_en": "Essential (primary) hypertension",
      "bab": "IX",
      "restriksi_gender": null,
      "restriksi_umur_min": null,
      "restriksi_umur_max": null
    }
  ]
}
```

---

### GET /master/icd10/:kode

Detail satu kode ICD-10 beserta restriksi validasi.

---

### GET /master/kelas-tt

Daftar semua kelas tempat tidur aktif.

---

### GET /master/jenis-pelayanan

Daftar jenis pelayanan. Query: `?kategori=kjsu`

---

### GET /master/cara-bayar

Daftar cara bayar aktif.

---

### GET /master/kelompok-umur

25 kelompok umur sesuai SIRS 6.3.

---

### GET /master/jenis-nakes

Daftar jenis tenaga kesehatan.

---

### GET /master/jenis-pemeriksaan-lab

Daftar jenis pemeriksaan laboratorium.

---

### GET /master/wilayah

Query: `?level=2&parent=31` (kabkota di Provinsi DKI Jakarta)

---

### POST /master/icd10/validate

Validasi kode ICD-10 terhadap data pasien (gender + umur).

**Request:**
```json
{
  "kode_icd10": "O10",
  "jenis_kelamin": "L",
  "umur_hari": 10950
}
```

**Response 422:**
```json
{
  "success": false,
  "error": {
    "code": "ICD10_GENDER_RESTRICTION",
    "message": "Kode O10 hanya berlaku untuk pasien perempuan"
  }
}
```

---

## 4. RL 1 — Identitas RS

### GET /rl1/profil

Mendapatkan profil RS saat ini.

---

### PUT /rl1/profil

Update profil RS (memerlukan permission `rl1:write`).

**Request:**
```json
{
  "nama_rs": "RSUD Dr. Soedirman",
  "kelas_rs": "B",
  "status_akreditasi": "Paripurna",
  "tgl_akreditasi": "2024-03-15",
  "tgl_berakhir_akreditasi": "2027-03-14",
  "latitude": -6.2088,
  "longitude": 106.8456
}
```

---

### POST /rl1/profil/dokumen

Upload dokumen (PDF, max 5MB). `Content-Type: multipart/form-data`

**Form fields:** `jenis_dokumen` (izin_operasional|sk_akreditasi|sk_kelas), `file`

---

### GET /rl1/layanan

Daftar layanan tersedia + status checklist.

---

### PUT /rl1/layanan/:jenis_pelayanan_id

Aktifkan/nonaktifkan ketersediaan layanan.

---

### GET /rl1/tempat-tidur/harian

Kondisi TT hari ini.

**Query:** `?tanggal=2026-05-20&shift=P`

**Response:**
```json
{
  "data": [
    {
      "kelas_tt": "ICU",
      "tt_tersedia": 10,
      "tt_terisi": 8,
      "tt_kosong": 2,
      "tt_rusak": 0,
      "bor_saat_ini": 80.0
    }
  ]
}
```

---

### POST /rl1/tempat-tidur/harian

Input/update sensus TT (dilakukan 2x/hari: pagi & sore).

**Request:**
```json
{
  "tanggal": "2026-05-20",
  "shift": "P",
  "data": [
    { "kelas_tt_id": 6, "tt_tersedia": 10, "tt_terisi": 8, "tt_rusak": 0 },
    { "kelas_tt_id": 7, "tt_tersedia": 4,  "tt_terisi": 3, "tt_rusak": 1 }
  ]
}
```

---

### GET /rl1/tempat-tidur/tahunan/:periode_id

Rekapitulasi TT tahunan per kelas.

---

### PUT /rl1/tempat-tidur/tahunan/:periode_id

Update data TT tahunan.

---

### GET /rl1/peralatan

Daftar peralatan RS (ASPAK).

---

### POST /rl1/peralatan

Tambah/update data peralatan.

---

## 5. RL 2 — Ketenagaan

### GET /rl2/ketenagaan/:periode_id

Data ketenagaan periode tertentu, dikelompokkan per jenis nakes.

---

### POST /rl2/ketenagaan/:periode_id/bulk

Input data ketenagaan secara batch (seluruh jenis nakes sekaligus).

**Request:**
```json
{
  "periode_id": "uuid",
  "data": [
    {
      "jenis_nakes_id": 1,
      "pendidikan": "S1",
      "status_pegawai": "PNS",
      "jenis_kelamin": "L",
      "jumlah": 5,
      "memiliki_sip": true,
      "memiliki_str": true
    }
  ]
}
```

---

### GET /rl2/ketenagaan/:periode_id/ringkasan

Ringkasan total per kategori nakes (untuk form pelaporan ke Kemenkes).

---

### DELETE /rl2/ketenagaan/:id

Hapus satu baris data ketenagaan.

---

## 6. RL 3 — Rawat Inap & Penunjang

### RL 3 — Sensus Harian

#### GET /rl3/sensus-harian

**Query:** `?tanggal_dari=2026-05-01&tanggal_sampai=2026-05-20`

---

#### POST /rl3/sensus-harian

Input sensus harian rawat inap. Validasi otomatis konsistensi:
`pasien_akhir = pasien_awal + masuk_baru + masuk_pindahan - keluar_hidup - keluar_mati - dipindahkan`

**Request:**
```json
{
  "tanggal": "2026-05-20",
  "data": [
    {
      "kelas_tt_id": 3,
      "jenis_pelayanan_id": 1,
      "pasien_awal": 45,
      "masuk_baru": 8,
      "masuk_pindahan": 2,
      "keluar_hidup": 6,
      "keluar_mati_lt48jam": 0,
      "keluar_mati_ge48jam": 1,
      "dipindahkan": 1,
      "hari_perawatan": 47
    }
  ]
}
```

---

#### GET /rl3/sensus-harian/kalender/:tahun/:bulan

Tampilan kalender konsistensi sensus (hijau=lengkap, merah=ada error).

---

### RL 3.1 — Indikator

#### GET /rl3/indikator/:periode_id

Semua indikator BOR/ALOS/BTO/TOI/NDR/GDR per kelas TT untuk periode tertentu.

---

#### POST /rl3/indikator/:periode_id/generate

Trigger auto-generate indikator dari data sensus harian.

**Response:**
```json
{
  "data": {
    "generated": 20,
    "errors": [],
    "ringkasan": {
      "bor_agregat": 72.5,
      "alos_agregat": 4.2,
      "gdr_agregat": 18.3
    }
  }
}
```

---

#### PUT /rl3/indikator/:periode_id/:kelas_tt_id

Manual override jika ada koreksi.

---

### RL 3.2 — Rawat Inap

#### GET /rl3/rawat-inap/:periode_id

Data RL 3.2 per jenis pelayanan.

---

#### POST /rl3/rawat-inap/:periode_id/bulk

Input batch semua jenis pelayanan.

---

### RL 3.3 — Rawat Jalan

#### GET /rl3/rawat-jalan/:periode_id

---

#### POST /rl3/rawat-jalan/:periode_id/bulk

---

### RL 3.4 — IGD

#### GET /rl3/igd/:periode_id

---

#### PUT /rl3/igd/:periode_id

Update data IGD (field `total_kunjungan` dihitung otomatis).

---

### RL 3.6 — Kebidanan

#### GET /rl3/kebidanan/:periode_id

---

#### PUT /rl3/kebidanan/:periode_id

---

### RL 3.7 — Neonatal

#### GET /rl3/neonatal/:periode_id

---

#### PUT /rl3/neonatal/:periode_id

---

### RL 3.8 — Laboratorium

#### GET /rl3/laboratorium/:periode_id

---

#### POST /rl3/laboratorium/:periode_id/bulk

---

### RL 3.9 — Radiologi

#### GET /rl3/radiologi/:periode_id

---

#### POST /rl3/radiologi/:periode_id/bulk

---

### RL 3.10 — Rujukan

#### GET /rl3/rujukan/:periode_id

---

#### PUT /rl3/rujukan/:periode_id

---

### RL 3.11-3.15 — Layanan Khusus

#### GET /rl3/layanan-khusus/:modul/:periode_id

`modul`: `gigi` | `rehab-medik` | `pelayanan-khusus` | `keswa` | `kb`

---

#### POST /rl3/layanan-khusus/:modul/:periode_id/bulk

---

### RL 3.16-3.19 — Farmasi

#### GET /rl3/farmasi/obat-khusus/:periode_id

---

#### POST /rl3/farmasi/obat-khusus/:periode_id/bulk

---

#### GET /rl3/farmasi/penggunaan/:periode_id

---

#### POST /rl3/farmasi/penggunaan/:periode_id/bulk

---

#### GET /rl3/farmasi/resep/:periode_id

---

#### PUT /rl3/farmasi/resep/:periode_id

---

#### GET /rl3/cara-bayar/:periode_id

---

#### POST /rl3/cara-bayar/:periode_id/bulk

---

### GET /rl3/progress/:periode_id

Progress pengisian semua sub-modul RL 3 untuk periode tertentu.

**Response:**
```json
{
  "data": {
    "total_modul": 19,
    "terisi": 12,
    "persen": 63.2,
    "detail": [
      { "modul": "rl3_1", "label": "Indikator Rawat Inap",  "status": "complete" },
      { "modul": "rl3_2", "label": "Rawat Inap per Yankes", "status": "complete" },
      { "modul": "rl3_3", "label": "Rawat Jalan",           "status": "partial"  },
      { "modul": "rl3_4", "label": "IGD",                   "status": "empty"    }
    ]
  }
}
```

---

## 7. RL 4 & RL 5 — Morbiditas

### GET /rl4/morbiditas-ri/:periode_id

Data morbiditas rawat inap. Query: `?icd10=I&kelompok_umur=10`

---

### POST /rl4/morbiditas-ri/:periode_id/bulk

Bulk input morbiditas. Validasi restriksi ICD-10 (gender, umur) dijalankan otomatis.

**Request:**
```json
{
  "data": [
    {
      "kode_icd10": "I10",
      "kelompok_umur_id": 18,
      "kasus_baru_l": 25,
      "kasus_baru_p": 32,
      "mati_l": 0,
      "mati_p": 1,
      "total_hari_rawat": 228
    }
  ]
}
```

**Response (jika ada warning):**
```json
{
  "success": true,
  "data": { "inserted": 24, "warnings": 1 },
  "warnings": [
    {
      "kode_icd10": "O80",
      "kelompok_umur_id": 7,
      "message": "Kode O80 tidak umum untuk kelompok umur 6–9 bulan"
    }
  ]
}
```

---

### DELETE /rl4/morbiditas-ri/:periode_id/baris/:id

---

### GET /rl4/morbiditas-ri/:periode_id/10-besar

10 besar penyakit rawat inap untuk periode ini.

---

### GET /rl4/morbiditas-ri-khusus/:periode_id

---

### POST /rl4/morbiditas-ri-khusus/:periode_id/bulk

---

### GET /rl5/morbiditas-rj/:periode_id

---

### POST /rl5/morbiditas-rj/:periode_id/bulk

---

### GET /rl5/morbiditas-rj/:periode_id/10-besar

---

### POST /rl4/validasi/:periode_id

Jalankan validasi SIRS 6.3 pada seluruh data morbiditas periode ini.

**Response:**
```json
{
  "data": {
    "total_baris": 450,
    "valid": 445,
    "error": 3,
    "warning": 2,
    "errors": [
      {
        "kode_icd10": "P07",
        "kelompok_umur": "20-24 tahun",
        "aturan": "UMUR_RESTRICTION",
        "pesan": "Kode P07 hanya untuk usia <28 hari, bukan 20-24 tahun"
      }
    ]
  }
}
```

---

## 8. Dashboard

### GET /dashboard/indikator-utama

**Query:** `?tahun=2026&bulan=4`

**Response:**
```json
{
  "data": {
    "periode": "2026-04",
    "bor_total": 72.5,
    "alos_total": 4.2,
    "bto_total": 5.1,
    "toi_total": 2.3,
    "ndr_total": 8.7,
    "gdr_total": 18.3,
    "per_kelas": [
      {
        "kelas_tt": "ICU",
        "bor": 88.2,
        "alos": 6.1,
        "bor_status": "tinggi",
        "bor_benchmark_min": 60,
        "bor_benchmark_max": 85
      }
    ]
  }
}
```

---

### GET /dashboard/tren-indikator

**Query:** `?tahun=2026&indikator=bor&kelas_tt=ICU`

Tren 12 bulan terakhir untuk satu indikator.

---

### GET /dashboard/10-besar-penyakit

**Query:** `?jenis=rawat_inap&tahun=2026&bulan=4`

---

### GET /dashboard/kepatuhan-pelaporan

Status pengiriman semua modul untuk periode aktif.

**Response:**
```json
{
  "data": {
    "periode": "2026-05",
    "deadline": "2026-06-10",
    "sisa_hari": 21,
    "modul": [
      { "kode": "rl1",   "label": "Identitas RS",     "status": "sent",      "terkirim": "2026-05-08" },
      { "kode": "rl3_2", "label": "Rawat Inap",        "status": "approved",  "terkirim": null },
      { "kode": "rl4_1", "label": "Morbiditas RI",     "status": "validated", "terkirim": null },
      { "kode": "rl3_4", "label": "IGD",               "status": "draft",     "terkirim": null }
    ]
  }
}
```

---

### GET /dashboard/kunjungan-heatmap

Heatmap kunjungan rawat jalan per poli per hari dalam 1 bulan.

**Query:** `?tahun=2026&bulan=4`

---

### GET /dashboard/tt-realtime

Status TT real-time saat ini (dari sensus pagi/sore terakhir).

---

## 9. Workflow & Approval

### GET /workflow/laporan/:periode_id

Daftar semua modul + status workflow untuk satu periode.

---

### POST /workflow/submit

Submit laporan modul untuk review.

**Request:**
```json
{
  "periode_id": "uuid",
  "modul": "rl3_2",
  "catatan": "Data sudah diverifikasi dengan sensus harian"
}
```

---

### POST /workflow/validate

Validasi laporan (hanya role VALIDATOR).

```json
{
  "laporan_status_id": "uuid",
  "aksi": "approve",
  "catatan": "Data konsisten, disetujui"
}
```

---

### POST /workflow/approve

Final approval (hanya role APPROVER/DIREKSI).

---

### POST /workflow/reject

Kembalikan ke draft dengan catatan.

```json
{
  "laporan_status_id": "uuid",
  "catatan": "BOR bulan ini tidak masuk akal (125%), mohon dicek ulang sensus harian tgl 15"
}
```

---

### GET /workflow/history/:laporan_status_id

Riwayat lengkap perubahan status (audit trail).

---

## 10. Integrasi Kemenkes

### POST /integrasi/submit-sirs-online/:periode_id

Kirim laporan ke SIRS Online v3. Hanya bisa dijalankan jika status `approved`.

**Request:**
```json
{ "modul": ["rl3_1", "rl3_2", "rl4_1"], "mode": "auto" }
```

**Response:**
```json
{
  "data": {
    "job_id": "bull-job-uuid",
    "status": "queued",
    "estimasi": "2-5 menit"
  }
}
```

---

### GET /integrasi/submit-status/:job_id

Cek status submission job (polling).

---

### GET /integrasi/submission-log/:periode_id

Riwayat semua pengiriman ke semua sistem Kemenkes untuk periode ini.

---

### POST /integrasi/sync-aspak

Sinkronisasi data alkes/sarpras ke ASPAK.

---

### POST /integrasi/sync-sisdmk

Sinkronisasi data SDM ke SISDMK.

---

### POST /integrasi/sync-rs-online

Update profil & TT ke RS Online.

---

### GET /integrasi/test-koneksi

Test koneksi ke semua sistem Kemenkes + respons status.

**Response:**
```json
{
  "data": {
    "sirs_online": { "status": "ok",      "latency_ms": 245 },
    "rs_online":   { "status": "ok",      "latency_ms": 180 },
    "aspak":       { "status": "timeout", "latency_ms": null },
    "sisdmk":      { "status": "ok",      "latency_ms": 310 }
  }
}
```

---

## 11. Admin

### GET /admin/users

Daftar pengguna + role aktif.

---

### POST /admin/users

Buat user baru.

**Request:**
```json
{
  "username": "pic_kamar4",
  "email": "kamar4@rs.demo",
  "full_name": "Rina Kusuma",
  "unit_kerja": "IRNA Kamar 4",
  "roles": ["PIC_UNIT"],
  "no_telepon": "081234567890"
}
```

---

### PATCH /admin/users/:id

Update user (nama, unit, telepon, status aktif).

---

### POST /admin/users/:id/roles

Assign/revoke role untuk user.

---

### GET /admin/audit-log

**Query:** `?user_id=uuid&modul=rl3_2&aksi=SUBMIT&dari=2026-05-01&sampai=2026-05-20`

---

### GET /admin/scheduler-jobs

Daftar cron jobs + status terakhir.

---

### PATCH /admin/scheduler-jobs/:id

Aktifkan/nonaktifkan atau update cron expression.

---

### POST /admin/scheduler-jobs/:id/run-now

Jalankan job secara manual (untuk testing).

---

### GET /admin/periode

Daftar semua periode laporan.

---

### POST /admin/periode

Buat periode baru (biasanya otomatis, tapi bisa manual).

---

### PATCH /admin/periode/:id/lock

Kunci periode agar tidak bisa diubah lagi.

---

### GET /admin/master-data/sinkronisasi-status

Status sinkronisasi master data (ICD-10, wilayah, dll.) dari sumber Kemenkes.

---

### POST /admin/master-data/refresh-icd10

Trigger refresh ICD-10 dari sumber terbaru.

---

### GET /admin/system-health

Status kesehatan sistem: DB connection, Redis, queue length, disk usage.

**Response:**
```json
{
  "data": {
    "status": "healthy",
    "db": { "connected": true, "pool_active": 8, "pool_idle": 12 },
    "redis": { "connected": true, "memory_mb": 45 },
    "queues": {
      "submit_kemenkes": { "waiting": 0, "active": 0, "failed": 2 },
      "notifikasi":      { "waiting": 3, "active": 0, "failed": 0 }
    },
    "disk_usage_pct": 42
  }
}
```

---

## 12. Error Response

### Kode Error Standar

| Kode | HTTP Status | Deskripsi |
|---|---|---|
| `UNAUTHORIZED` | 401 | Token tidak valid atau expired |
| `FORBIDDEN` | 403 | Tidak punya permission untuk aksi ini |
| `NOT_FOUND` | 404 | Data tidak ditemukan |
| `VALIDATION_ERROR` | 422 | Data request tidak valid |
| `ICD10_GENDER_RESTRICTION` | 422 | Kode ICD-10 tidak sesuai gender |
| `ICD10_AGE_RESTRICTION` | 422 | Kode ICD-10 tidak sesuai kelompok umur |
| `FORMULA_INCONSISTENCY` | 422 | Rumus konsistensi sensus tidak terpenuhi |
| `PERIOD_LOCKED` | 409 | Periode sudah dikunci, tidak bisa diubah |
| `WORKFLOW_INVALID_TRANSITION` | 409 | Transisi status tidak valid |
| `KEMENKES_API_ERROR` | 502 | Error dari server Kemenkes |
| `KEMENKES_API_TIMEOUT` | 504 | Timeout koneksi ke Kemenkes |
| `DUPLICATE_ENTRY` | 409 | Data sudah ada untuk periode + modul ini |
| `INTERNAL_ERROR` | 500 | Error sistem internal |

### Contoh Error Validasi

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Beberapa field tidak valid",
    "details": [
      {
        "field": "masuk_baru",
        "value": -3,
        "message": "Jumlah pasien masuk tidak boleh negatif"
      },
      {
        "field": "pasien_akhir",
        "message": "Konsistensi formula gagal: seharusnya 47, terisi 50. Periksa ulang data masuk/keluar."
      }
    ]
  }
}
```
