# 07 — Panduan Implementasi Fase demi Fase

**Full Coverage | NestJS + Next.js | ~10 Bulan**

---

## Gambaran Timeline

```
Bulan:  1    2    3    4    5    6    7    8    9    10
        ├────┼────┼────┼────┼────┼────┼────┼────┼────┤
Fase 1  ████████
Fase 2       ████████████
Fase 3                  ████████████████
Fase 4                              ████████
Fase 5                                      ████████
```

---

## Fase 1 — Foundation & Setup (Minggu 1–6)

### Tujuan
Infrastruktur jalan, database selesai, auth berfungsi, master data terisi.

### Sprint 1 (Minggu 1–2): Infrastruktur & Repo

**Deliverable:**
- [ ] Monorepo setup: pnpm workspaces + Turborepo
- [ ] Docker Compose dev environment (Postgres, Redis, MinIO)
- [ ] NestJS app bootstrap dengan struktur modul
- [ ] Next.js 14 app bootstrap (App Router)
- [ ] Prisma setup + schema awal (tabel auth + master)
- [ ] GitHub Actions CI pipeline (lint + test)
- [ ] Environment variables dikonfigurasi

**Definition of Done:**
- `pnpm dev` berjalan tanpa error
- `pnpm test` lulus semua test awal
- Docker Compose up berjalan dalam 1 perintah

### Sprint 2 (Minggu 3–4): Auth & Master Data

**Deliverable:**
- [ ] Auth module: login, refresh token, logout, change password
- [ ] JWT middleware + RBAC guard
- [ ] Seed 8 roles + permissions
- [ ] Master data API: ICD-10, kelas TT, jenis pelayanan, cara bayar, kelompok umur
- [ ] Import ~13.000 kode ICD-10 dari CSV (bahasa Indonesia)
- [ ] Halaman login frontend
- [ ] Layout sidebar + header frontend

**Definition of Done:**
- Login berhasil, JWT tervalidasi di semua endpoint
- Endpoint `GET /master/icd10?q=hipertensi` mengembalikan hasil dalam <200ms
- Full-text search ICD-10 bekerja dengan akurasi baik

### Sprint 3 (Minggu 5–6): Laporan Periode & Profil RS

**Deliverable:**
- [ ] Tabel `laporan_periode` terisi otomatis (12 bulan ke depan + periode tahunan)
- [ ] API + UI profil RS (RL 1.1, RL 1.2)
- [ ] Upload dokumen (MinIO integration)
- [ ] Ketersediaan layanan RS (checklist)
- [ ] Modul admin: CRUD user, assign role
- [ ] Audit log interceptor berjalan

**Definition of Done:**
- Profil RS bisa diisi dan disimpan dengan validasi
- Upload PDF berhasil, file tersimpan di MinIO
- Audit log tercatat untuk setiap aksi

---

## Fase 2 — Core Build (Minggu 7–18)

### Tujuan
Modul inti yang paling sering digunakan: TT harian, rawat inap, IGD, morbiditas ICD-10.

### Sprint 4 (Minggu 7–8): RL 1.3 — Tempat Tidur (Quick Win #1)

**Deliverable:**
- [ ] API sensus TT harian (POST 2x/hari, GET per tanggal)
- [ ] Kalkulasi BOR real-time dari TT harian
- [ ] Halaman input TT harian (mobile-friendly, <3 tap untuk input)
- [ ] View kalender bulanan kondisi TT
- [ ] Validasi: TT terisi tidak boleh melebihi TT tersedia

**Definition of Done:**
- PIC bisa input 20 kelas TT dalam <5 menit
- BOR per kelas TT muncul otomatis setelah input
- Tampil benar di layar tablet 10 inci

### Sprint 5 (Minggu 9–11): RL 3.1 & 3.2 — Indikator & Rawat Inap (Quick Win #2)

**Deliverable:**
- [ ] API sensus harian rawat inap (POST bulk per kelas TT × jenis pelayanan)
- [ ] Validator konsistensi formula sensus (pasien_akhir = ...)
- [ ] Auto-generator RL 3.1 dari sensus harian (BOR/ALOS/BTO/TOI/NDR/GDR)
- [ ] API & UI RL 3.2 (rawat inap per jenis pelayanan, per kelas TT)
- [ ] Halaman sensus harian dengan feedback error real-time
- [ ] Kalender konsistensi sensus (hijau/kuning/merah per hari)

**Definition of Done:**
- Generator RL 3.1 menghasilkan indikator akurat dibandingkan kalkulasi manual
- Formula konsistensi menolak data yang tidak valid sebelum tersimpan
- 6 indikator tampil per kelas TT di halaman indikator

### Sprint 6 (Minggu 12–13): RL 3.3 & 3.4 — RJ & IGD

**Deliverable:**
- [ ] API & UI rawat jalan per jenis pelayanan (RL 3.3)
- [ ] API & UI IGD dengan semua field (RL 3.4)
- [ ] Validasi: `total_kunjungan_igd = tindak_lanjut + mati_di_igd + doa`

### Sprint 7 (Minggu 14–16): RL 4.1 — Morbiditas RI (Quick Win #3)

**Deliverable:**
- [ ] API bulk input morbiditas RI (ICD-10 × kelompok umur × gender)
- [ ] Validasi restriksi ICD-10: gender + kelompok umur
- [ ] Validator kode O hanya untuk perempuan, kode P hanya untuk neonatus, dll.
- [ ] UI tabel morbiditas: mode Excel-like (100+ baris, navigasi keyboard)
- [ ] ICD-10 autocomplete dengan debounce (ketik 3 huruf → muncul saran)
- [ ] Generator 10 Besar Penyakit dari RL 4.1
- [ ] Dummy data 50 diagnosis × 10 kelompok umur untuk demo

**Definition of Done:**
- Input 50 baris morbiditas dalam <10 menit
- Kode O80 otomatis ditolak untuk pasien laki-laki
- 10 Besar Penyakit tampil dan bisa diexport ke Excel

### Sprint 8 (Minggu 17–18): RL 5.1 & Workflow Awal

**Deliverable:**
- [ ] API & UI morbiditas rawat jalan (RL 5.1) — struktur mirip RL 4.1
- [ ] Workflow engine: state machine draft→submitted→validated→approved→sent
- [ ] API workflow: submit, validate, approve, reject
- [ ] UI workflow: status badge per modul, tombol aksi per role
- [ ] Notifikasi in-app ketika status berubah

---

## Fase 3 — Expand & Integrate (Minggu 19–32)

### Tujuan
Lengkapi semua sub-modul RL 3, integrasi Kemenkes, notifikasi deadline.

### Sprint 9–10 (Minggu 19–22): RL 2 & RL 3.6–3.10

**Deliverable:**
- [ ] RL 2: ketenagaan per jenis nakes, pendidikan, status pegawai
- [ ] RL 3.6: kebidanan (persalinan, komplikasi obstetri)
- [ ] RL 3.7: neonatal (lahir hidup/mati, BBLR, imunisasi, PMK)
- [ ] RL 3.8: laboratorium per jenis pemeriksaan
- [ ] RL 3.9: radiologi per jenis pemeriksaan
- [ ] RL 3.10: rujukan masuk/keluar

### Sprint 11–12 (Minggu 23–26): RL 3.11–3.19

**Deliverable:**
- [ ] RL 3.11: gigi mulut
- [ ] RL 3.12: rehabilitasi medik
- [ ] RL 3.13: pelayanan khusus (hemodialisis, kemoterapi, dll.)
- [ ] RL 3.14: kesehatan jiwa
- [ ] RL 3.15: keluarga berencana
- [ ] RL 3.16: obat khusus (narkotika, psikotropika)
- [ ] RL 3.17–3.18: farmasi & resep
- [ ] RL 3.19: cara bayar
- [ ] Progress bar per sub-modul di halaman overview RL 3

### Sprint 13–14 (Minggu 27–30): Integrasi Kemenkes

**Deliverable:**
- [ ] SIRS Online v3 connector (HTTP client + retry logic)
- [ ] RS Online connector (profil + TT)
- [ ] ASPAK connector (peralatan)
- [ ] SISDMK connector (SDM)
- [ ] BullMQ job: submit-sirs-online dengan retry exponential
- [ ] BullMQ job: sync-aspak, sync-sisdmk, sync-rs-online
- [ ] Submission log UI: riwayat pengiriman + status
- [ ] Test koneksi ke semua sistem Kemenkes

**Definition of Done:**
- Submit ke SIRS Online berhasil (atau masuk retry queue jika gagal)
- Submission log mencatat semua percobaan
- Alert email dikirim jika pengiriman gagal 5x

### Sprint 15 (Minggu 31–32): Scheduler & Notifikasi

**Deliverable:**
- [ ] BullMQ cron: notifikasi deadline H-7, H-3, H-1
- [ ] BullMQ cron: refresh materialized views setiap malam 01.00
- [ ] BullMQ cron: agregasi bulanan tanggal 1 setiap bulan
- [ ] Email template dengan MJML (deadline reminder, laporan ditolak, laporan terkirim)
- [ ] Rejection log UI untuk data yang ditolak Kemenkes
- [ ] Admin panel: kelola cron jobs, lihat queue status

---

## Fase 4 — Dashboard & UAT (Minggu 33–38)

### Tujuan
Dashboard manajemen, pilot testing, pelatihan.

### Sprint 16–17 (Minggu 33–36): Dashboard Manajemen

**Deliverable:**
- [ ] Kartu indikator BOR/ALOS/BTO/TOI/NDR/GDR dengan benchmark warna (hijau/kuning/merah)
- [ ] Gauge chart BOR per kelas TT
- [ ] Line chart tren 12 bulan (menggunakan Recharts)
- [ ] Tabel 10 Besar Penyakit (RI + RJ, auto-update)
- [ ] Heatmap kunjungan rawat jalan per poli per hari
- [ ] Kartu kepatuhan pelaporan per modul per periode
- [ ] Kartu TT real-time (dari sensus pagi/sore terbaru)
- [ ] Export dashboard ke PDF (pdfkit / puppeteer)

**Benchmark Indikator:**

| Indikator | Merah (Buruk) | Kuning (Perhatian) | Hijau (Ideal) |
|---|---|---|---|
| BOR | <60% atau >85% | 60–65% atau 80–85% | 65–80% |
| ALOS | <3 atau >12 hari | 3–4 atau 9–12 hari | 4–9 hari |
| TOI | <1 atau >3 hari | 1 atau 3 hari | 1–3 hari |
| BTO | <30 kali/TT/tahun | 30–35 | >35 kali/TT/tahun |
| NDR | >25‰ | 20–25‰ | <20‰ |
| GDR | >45‰ | 35–45‰ | <35‰ |

### Sprint 18 (Minggu 37–38): UAT & Bug Fix

**Deliverable:**
- [ ] UAT dengan PIC setiap unit (IRNA, IGD, Lab, Farmasi, RM, SDM)
- [ ] Test skenario: input data 1 bulan penuh, validasi, approve, submit
- [ ] Bug fix dari UAT
- [ ] Performance test: 50 concurrent users, response time <2s
- [ ] Pelatihan pengguna per unit (1 sesi/unit, 2 jam)
- [ ] User manual (PDF, per role)

---

## Fase 5 — SATUSEHAT & Go-Live (Minggu 39–46)

### Tujuan
FHIR adapter, optimasi, go-live.

### Sprint 19–20 (Minggu 39–42): SATUSEHAT FHIR

**Deliverable:**
- [ ] SATUSEHAT OAuth2 client (client credentials flow)
- [ ] FHIR resource mapper: RL 4.1 → Condition + Encounter bundle
- [ ] FHIR resource mapper: RL 3.1 → Observation bundle
- [ ] POST FHIR Bundle ke SATUSEHAT endpoint
- [ ] Reconciliation: verifikasi data yang sudah dikirim
- [ ] Feature flag `ENABLE_FHIR_ADAPTER` (default off, aktifkan setelah stable)

### Sprint 21 (Minggu 43–44): Optimasi Performa

**Deliverable:**
- [ ] Audit semua query N+1 dengan Prisma
- [ ] Tambah index yang kurang (berdasarkan EXPLAIN ANALYZE)
- [ ] Optimize materialized view refresh strategy
- [ ] Redis caching untuk master data & dashboard
- [ ] Rate limiting di API gateway
- [ ] Response compression (gzip)

### Sprint 22 (Minggu 45–46): Go-Live & Dokumentasi

**Deliverable:**
- [ ] Audit log lengkap & dokumentasi teknis
- [ ] Backup otomatis harian (pg_dump ke MinIO/S3)
- [ ] Monitoring: uptime check, error rate alert
- [ ] Runbook: incident response untuk deadline pelaporan
- [ ] Go-live checklist selesai semua
- [ ] Laporan akhir implementasi

---

## Checklist UAT Per Modul

### RL 1.3 — Tempat Tidur

- [ ] Input TT pagi hari berhasil
- [ ] Input TT sore hari berhasil
- [ ] BOR auto-hitung akurat
- [ ] Kalender TT menampilkan data benar
- [ ] Error jika TT terisi > TT tersedia

### RL 3.1 & 3.2 — Rawat Inap

- [ ] Input sensus harian semua kelas TT
- [ ] Validasi formula sensus menolak data inconsisten
- [ ] Auto-generate RL 3.1 dari sensus menghasilkan nilai benar
- [ ] Input RL 3.2 per jenis pelayanan
- [ ] BOR/ALOS/dll menampilkan nilai dan benchmark

### RL 4.1 — Morbiditas RI

- [ ] Input 20+ kode ICD-10 dengan autocomplete
- [ ] Kode O ditolak untuk laki-laki
- [ ] Kode P ditolak untuk dewasa
- [ ] 10 Besar Penyakit muncul otomatis
- [ ] Export ke Excel berhasil

### Workflow

- [ ] PIC submit laporan → status berubah ke submitted
- [ ] Validator approve → status ke validated
- [ ] Approver final approve → status ke approved
- [ ] Reject dengan catatan → kembali ke draft, catatan tampil
- [ ] Audit trail lengkap: siapa, kapan, aksi apa

### Integrasi

- [ ] Test koneksi semua sistem Kemenkes berhasil
- [ ] Submit ke SIRS Online diqueue dan dieksekusi
- [ ] Submission log tercatat
- [ ] Notifikasi email diterima saat laporan terkirim

---

## Risiko & Mitigasi per Fase

| Fase | Risiko | Mitigasi |
|---|---|---|
| 1 | Import ICD-10 tidak lengkap | Sediakan CSV dari WHO Bahasa Indonesia + validasi kode |
| 2 | Formula indikator berbeda interpretasi dengan Kemenkes | Verifikasi dengan dokumen JUKNIS 6.3 lampiran formula |
| 3 | API Kemenkes tidak terdokumentasi lengkap | Gunakan capture traffic dari SIRS Online web untuk reverse engineering format |
| 3 | API Kemenkes sering down | Fallback: export manual Excel/PDF + reminder kirim manual |
| 4 | Pengguna tidak mau pakai sistem baru | Champions per unit dari Sprint 1, training iteratif sejak Sprint 4 |
| 5 | SATUSEHAT environment unstable | Feature flag off by default, aktifkan setelah API stable |
