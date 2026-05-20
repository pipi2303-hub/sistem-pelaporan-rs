# SIRS 6.3 — Blueprint Pengembangan Komprehensif

**Intramedika | Single-Tenant | NestJS + Next.js | PostgreSQL**

---

## Ringkasan Proyek

| Item | Detail |
|---|---|
| **Produk** | Aplikasi Pelaporan SIRS 6.3 internal rumah sakit |
| **Standar** | JUKNIS SIRS Revisi 6.3 — Kemenkes RI (2024) |
| **Scope** | Single RS, full coverage RL 1–5, dummy SIMRS |
| **Stack** | NestJS + Next.js 14 + PostgreSQL + Redis + MinIO |
| **Estimasi** | 10 bulan, 22 sprint |
| **Tim** | PM, 2 BE Engineer, 2 FE Engineer, 1 DB Engineer, 1 QA |

---

## Navigasi Dokumen

| No | Dokumen | Isi Utama | Prioritas |
|---|---|---|---|
| — | [Laporan.md](Laporan.md) | Rekomendasi awal (sumber utama) | Referensi |
| 01 | [01_ARCHITECTURE.md](01_ARCHITECTURE.md) | System context, component diagram, deployment topology, keputusan teknologi | Baca pertama |
| 02 | [02_DATABASE_SCHEMA.md](02_DATABASE_SCHEMA.md) | DDL lengkap ~50 tabel, index, materialized views, seed dummy data | Kritikal |
| 03 | [03_API_SPECIFICATION.md](03_API_SPECIFICATION.md) | 100+ REST endpoints, request/response schema, error codes | Kritikal |
| 04 | [04_RBAC_MATRIX.md](04_RBAC_MATRIX.md) | 8 role, matrix permission per modul, unit-scoped access, state machine workflow | Kritikal |
| 05 | [05_PROJECT_SCAFFOLD.md](05_PROJECT_SCAFFOLD.md) | Struktur folder monorepo, NestJS modules, Next.js pages, shared packages, Docker Compose dev | Kritikal |
| 06 | [06_INTEGRATION_SPECIFICATION.md](06_INTEGRATION_SPECIFICATION.md) | Dummy SIMRS, SIRS Online v3, RS Online, ASPAK, SISDMK, SATUSEHAT FHIR | Penting |
| 07 | [07_IMPLEMENTATION_GUIDE.md](07_IMPLEMENTATION_GUIDE.md) | 22 sprint breakdown, Definition of Done, UAT checklist, benchmark indikator | Penting |
| 08 | [08_TESTING_STRATEGY.md](08_TESTING_STRATEGY.md) | Unit test (kalkulasi, ICD-10, workflow), integration test, E2E, coverage 80% | Penting |
| 09 | [09_DEVOPS_GUIDE.md](09_DEVOPS_GUIDE.md) | Dockerfile, CI/CD pipeline, Nginx, monitoring, backup, incident response, go-live checklist | Penting |

---

## Quick Start untuk Developer

```bash
# 1. Clone & setup
git clone https://github.com/intramedika/sirs-app.git && cd sirs-app
pnpm install

# 2. Jalankan infrastruktur
pnpm docker:up

# 3. Setup database
cp apps/api/.env.example apps/api/.env
pnpm db:generate && pnpm db:migrate && pnpm db:seed

# 4. Jalankan
pnpm dev
# Web: http://localhost:3000  |  API: http://localhost:3001
# Prisma Studio: pnpm db:studio (port 5555)
```

**Login default (dummy):**
| Username | Password | Role |
|---|---|---|
| `admin` | `Admin@123` | ADMIN |
| `pic_irna` | `PicIrna@123` | PIC_UNIT (IRNA) |
| `validator1` | `Validator@123` | VALIDATOR |
| `direksi` | `Direksi@123` | VIEWER_MNJMN + APPROVER |

---

## Status per Formulir RL

| Formulir | Nama | Frekuensi | Sprint Target |
|---|---|---|---|
| RL 1.1–1.2 | Profil & Layanan RS | Tahunan | Sprint 3 |
| RL 1.3 | Tempat Tidur Harian | Harian | Sprint 4 ⭐ |
| RL 1.4 | Peralatan (ASPAK) | Tahunan | Sprint 13 |
| RL 2 | Ketenagaan | Tahunan | Sprint 9 |
| RL 3.1 | Indikator Rawat Inap | Bulanan | Sprint 5 ⭐ |
| RL 3.2 | Rawat Inap per Yankes | Tahunan | Sprint 5 ⭐ |
| RL 3.3 | Kunjungan Rawat Jalan | Bulanan | Sprint 6 |
| RL 3.4 | Kunjungan IGD | Bulanan | Sprint 6 |
| RL 3.5 | Indikator Tahunan | Tahunan | Sprint 6 |
| RL 3.6 | Kebidanan | Bulanan | Sprint 9 |
| RL 3.7 | Neonatal | Bulanan | Sprint 9 |
| RL 3.8 | Laboratorium | Bulanan | Sprint 10 |
| RL 3.9 | Radiologi | Bulanan | Sprint 10 |
| RL 3.10 | Rujukan | Bulanan | Sprint 10 |
| RL 3.11 | Gigi Mulut | Bulanan | Sprint 11 |
| RL 3.12 | Rehab Medik | Bulanan | Sprint 11 |
| RL 3.13 | Pelayanan Khusus | Bulanan | Sprint 11 |
| RL 3.14 | Kesehatan Jiwa | Bulanan | Sprint 12 |
| RL 3.15 | Keluarga Berencana | Bulanan | Sprint 12 |
| RL 3.16 | Obat Khusus | Tahunan | Sprint 12 |
| RL 3.17 | Farmasi | Tahunan | Sprint 12 |
| RL 3.18 | Resep | Bulanan | Sprint 12 |
| RL 3.19 | Cara Bayar | Bulanan | Sprint 12 |
| RL 4.1 | Morbiditas Rawat Inap | Tahunan | Sprint 7 ⭐ |
| RL 4.2 | Morbiditas RI Khusus | Tahunan | Sprint 13 |
| RL 5.1 | Morbiditas Rawat Jalan | Tahunan | Sprint 8 ⭐ |

⭐ = Quick win / modul prioritas tinggi

---

## KPI Keberhasilan

| KPI | Target | Cara Ukur |
|---|---|---|
| Ketepatan waktu pelaporan | 100% laporan terkirim ≤ tgl 10 | `mv_kepatuhan_laporan` |
| Akurasi data | <1% rejection dari Kemenkes | `submission_log.is_success` |
| Otomatisasi input | ≥80% data dari sensus harian (bukan manual entri ulang) | Survey PIC |
| Waktu penyusunan laporan | Turun dari hari → menit | Survey PIC |
| Kepuasan pengguna | ≥4/5 | Survei internal pasca go-live |

---

*Dokumen ini di-generate dari Laporan.md sebagai blueprint implementasi oleh Intramedika.*
*Tanggal generate: 2026-05-20*
