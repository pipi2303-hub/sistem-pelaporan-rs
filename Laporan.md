# REKOMENDASI PENGEMBANGAN APLIKASI PELAPORAN SISTEM INFORMASI RUMAH SAKIT (SIRS)

**Berdasarkan JUKNIS SIRS Revisi 6.3 — Kementerian Kesehatan RI (2024)**

*Dokumen Pendamping Hasil Analisis Petunjuk Teknis SIRS 6.3*

---

## Daftar Isi

1. [Tujuan & Sasaran Aplikasi](#1-tujuan--sasaran-aplikasi)
2. [Arsitektur Sistem yang Direkomendasikan](#2-arsitektur-sistem-yang-direkomendasikan)
3. [Modul Aplikasi Sesuai Formulir RL](#3-modul-aplikasi-sesuai-formulir-rl)
4. [Fitur-Fitur Lintas Modul](#4-fitur-fitur-lintas-modul-cross-cutting-features)
5. [Rekomendasi Teknologi (Tech Stack)](#5-rekomendasi-teknologi-tech-stack)
6. [Struktur Database — Entitas Master](#6-struktur-database--entitas-master-yang-direkomendasikan)
7. [Pertimbangan UI / UX](#7-pertimbangan-ui--ux)
8. [Keamanan, Privasi & Compliance](#8-keamanan-privasi--compliance)
9. [Strategi Integrasi](#9-strategi-integrasi)
10. [Roadmap Implementasi](#10-roadmap-implementasi-yang-direkomendasikan)
11. [KPI Keberhasilan](#11-kpi-keberhasilan-aplikasi)
12. [Risiko & Mitigasi](#12-risiko--mitigasi)
13. [Kesimpulan & Langkah Berikutnya](#13-kesimpulan--langkah-berikutnya)

---

## 1. Tujuan & Sasaran Aplikasi

Aplikasi pelaporan SIRS 6.3 yang akan dikembangkan bertujuan untuk menjadi sistem internal rumah sakit yang membantu mengumpulkan, memvalidasi, dan mengirimkan data ke aplikasi resmi Kementerian Kesehatan (RS Online, SIRS Online v3, ASPAK, SISDMK), sekaligus menjadi alat bantu manajemen melalui dashboard indikator pelayanan.

**Sasaran utama:**

1. Mengurangi pekerjaan manual entri ulang data dari SIMRS ke aplikasi SIRS Online — pelaporan berbasis interoperabilitas, bukan hanya entri.
2. Menjamin ketepatan waktu (bulanan ≤ tgl 10, tahunan ≤ 31 Maret) melalui scheduler dan notifikasi otomatis.
3. Menjamin kualitas data melalui validasi sesuai aturan SIRS 6.3 (rumus konsistensi, batas umur kode ICD-10, jenis kelamin, dll.).
4. Mendukung akreditasi RS (Standar MRMIK 4 — KMK No. 1128 Tahun 2022) dengan jejak audit pelaporan yang lengkap.
5. Menjadi fondasi interoperabilitas dengan SATUSEHAT (sesuai arahan pada Kata Pengantar JUKNIS SIRS 6.3).

---

## 2. Arsitektur Sistem yang Direkomendasikan

Arsitektur direkomendasikan modular (microservice-friendly) dengan 5 lapisan utama agar setiap formulir RL dapat dikembangkan, diuji, dan dipelihara secara independen tanpa mengganggu modul lain.

### a. Lapisan Sumber Data (Data Source Layer)

- Konektor ke SIMRS eksisting (database / API).
- Konektor ke LIS (Lab Information System) untuk RL 3.8.
- Konektor ke RIS/PACS untuk RL 3.9.
- Konektor ke sistem farmasi (e-resep, gudang obat) untuk RL 3.17 & RL 3.18.
- Form entri manual sebagai fallback untuk unit yang belum terdigitalisasi.

### b. Lapisan Integrasi (Integration Layer)

- ETL/ELT pipeline untuk normalisasi data dari berbagai sumber ke skema SIRS 6.3.
- Message queue (RabbitMQ / Kafka / Redis Pub-Sub) untuk event-driven update.
- Mapping engine: kode internal RS → kode standar Kemenkes (ICD-10, jenis pelayanan, kelas TT).

### c. Lapisan Bisnis & Validasi (Domain Layer)

- Engine kalkulasi indikator BOR, ALOS, BTO, TOI, NDR, GDR per kelas pelayanan.
- Validator otomatis: konsistensi formula (mis. `Pasien akhir = awal + masuk + pindahan − keluar − dipindahkan`), batas umur ICD-10, restriksi gender.
- Aggregator periodik (bulanan/tahunan) yang dijalankan via cron job.
- Generator 10 Besar Penyakit / Kematian / Kunjungan dari RL 4.1 & RL 5.1.

### d. Lapisan Publikasi (Publishing Layer)

- Konektor REST ke SIRS Online v3.0.0 (sirs6.kemkes.go.id/v3) untuk auto-submit.
- Konektor ke ASPAK, SISDMK, RS Online, MANTIS.
- FHIR adapter untuk interoperabilitas SATUSEHAT (siap untuk masa depan).
- Export Excel/PDF untuk dokumentasi internal & audit.

### e. Lapisan Antarmuka (Presentation Layer)

- Web app responsif (desktop & tablet) untuk entri & validasi.
- Dashboard manajemen real-time dengan KPI utama.
- Mobile-friendly untuk input data tempat tidur (RL 1.3) oleh perawat.
- Modul administrasi: manajemen pengguna, role, audit log.

---

## 3. Modul Aplikasi Sesuai Formulir RL

| Modul | Sumber Data Internal RS | Fitur Kunci yang Direkomendasikan |
|---|---|---|
| **RL 1 — Identitas RS** | Bag. Manajemen, IPSRS, Rawat Inap | • Form Profil RS lengkap (akreditasi, BLU, kepemilikan, koordinat lat/long)<br>• Upload dokumen (Izin Operasional, SK Akreditasi, SK TT — PDF max 5MB)<br>• Modul ketersediaan pelayanan (checklist 100+ jenis layanan)<br>• Modul tempat tidur real-time (input 2x/hari pagi & sore)<br>• Konektor ke ASPAK untuk RL 1.4 |
| **RL 2 — Ketenagaan** | Bag. SDM / Kepegawaian | • Konektor langsung ke SISDMK<br>• Sinkronisasi otomatis data SDM (dokter, perawat, nakes lain)<br>• Tracking SIP / STR / kompetensi<br>• Auto-update ke RS Online setiap 3 bulan |
| **RL 3.1 – 3.5 — Rawat Inap & Kunjungan** | IRNA, IGD, IRJA, Pendaftaran | • Auto-generate indikator BOR/ALOS/BTO/TOI/NDR/GDR dari sensus harian<br>• Engine kalkulasi otomatis dengan formula bawaan<br>• Pemisahan per kelas TT (VVIP, VIP, I, II, III, ICU, NICU, PICU, dst.)<br>• Sensus harian dengan kontrol konsistensi |
| **RL 3.6 – 3.7 — Kebidanan & Neonatal** | Poli Kebidanan, KIA, Ruang Bersalin, NICU | • Tracking persalinan (normal, spontan dgn penyulit, vakum/forceps, SC)<br>• Modul komplikasi obstetri & non-obstetri (HIV, HBV, sifilis, TBC, dll.)<br>• Skrining hipertiroid kongenital, IMD, BBLR & metode kanguru<br>• Imunisasi bayi (HB0, BCG, Polio, DPT, IPV, Campak-Rubela) |
| **RL 3.8 – 3.10 — Penunjang & Rujukan** | Lab, Radiologi, Rujukan (IGD/IRJA/IRNA) | • Modul lab lengkap (Pat. Klinik, Mikrobiologi, Parasitologi, Pat. Anatomi)<br>• Integrasi LIS untuk auto-input jumlah pemeriksaan<br>• Integrasi RIS/PACS untuk modul Radiologi<br>• Integrasi SISRUTE untuk modul Rujukan |
| **RL 3.11 – 3.19 — Layanan Khusus & Farmasi** | Poli Gigi, Rehab Medik, Jiwa, KB, Farmasi, Kasir | • Modul Farmasi: tracking item obat (Fornas vs Non-Fornas, Generik vs Paten)<br>• Modul Resep: rawat jalan, IGD, rawat inap<br>• Modul Cara Bayar: integrasi BPJS (V-Claim), Jamkesda, asuransi swasta<br>• Pelaporan tahunan: scheduler otomatis rekap 1 Jan – 31 Des |
| **RL 4 & RL 5 — Morbiditas ICD-10** | Rekam Medis, Coder, Dokter | • Database lengkap ICD-10 (deskripsi Bahasa Indonesia)<br>• Validasi otomatis: kode ICD-10 vs jenis kelamin (kode O hanya P, dll.)<br>• Validasi kelompok umur (kode P & Z38 hanya <1 jam s.d. 28 hari)<br>• Auto-generate 10 Besar Penyakit / Kematian / Kunjungan dari RL 4.1 & RL 5.1<br>• Modul coding assistant untuk membantu coder |

---

## 4. Fitur-Fitur Lintas Modul (Cross-Cutting Features)

### 4.1 Validasi & Quality Control

- Validasi inline pada setiap field (mis. tanggal lahir vs kelompok umur ICD).
- Validasi konsistensi formula otomatis (`Total Pasien IGD = Tindak Lanjut + Mati di IGD + DOA`).
- Highlight error & warning sebelum submit, dengan penjelasan mengapa data ditolak.
- Rejection log untuk data yang ditolak oleh server Kemenkes.

### 4.2 Scheduler & Notifikasi

- Reminder otomatis (email/WA) ke PIC unit menjelang deadline (mis. H-3 sebelum tgl 10).
- Auto-submit ke SIRS Online setelah data tervalidasi (opsional, dengan approval flow).
- Notifikasi ke direksi jika ada laporan terlambat atau ditolak.

### 4.3 Workflow Approval

- Multi-level approval: PIC Unit → Validator (Komite Rekam Medis / SIRS) → Direksi.
- Status: `Draft → Submitted → Validated → Approved → Sent to Kemenkes → Acknowledged`.
- Tracking siapa mengubah apa, kapan (audit trail lengkap).

### 4.4 Dashboard Manajemen

- Visual real-time BOR/ALOS/BTO/TOI/NDR/GDR dengan benchmark nilai ideal.
- Tren 10 Besar Penyakit (bulanan & tahunan), drill-down per jenis kelamin & kelompok umur.
- Heatmap kunjungan rawat jalan per poli, per hari.
- Indikator kepatuhan pelaporan (on-time vs late) per unit.

### 4.5 Master Data & Referensi

- Database lengkap ICD-10 (versi WHO Bahasa Indonesia).
- Master jenis pelayanan, kelas TT, jenis pemeriksaan lab, kelompok obat, cara bayar.
- Updater otomatis ketika Kemenkes merilis versi master baru.

### 4.6 Audit Log & Keamanan

- Audit log: siapa melihat / mengubah / menyetujui / mengirim data, dari IP mana, kapan.
- Enkripsi data sensitif (NIK PIC, data pasien) sesuai UU PDP No. 27/2022.
- Backup otomatis harian + retensi sesuai kebijakan rumah sakit.

---

## 5. Rekomendasi Teknologi (Tech Stack)

| Lapisan | Rekomendasi Teknologi | Alasan |
|---|---|---|
| **Frontend** | React / Next.js + TypeScript + TailwindCSS | Web app responsif (akses dari berbagai unit), TypeScript untuk keamanan tipe data medis, ekosistem matang. |
| **Backend / API** | Node.js (NestJS) atau Python (FastAPI) / Laravel | RESTful API + GraphQL untuk reporting. NestJS untuk arsitektur modular per RL. FHIR-ready untuk SATUSEHAT. |
| **Database** | PostgreSQL + Redis | PostgreSQL: relational, JSON support untuk form fleksibel, partitioning untuk data besar. Redis: cache indikator & sesi. |
| **Integrasi** | HL7 FHIR R4 + REST API | Standar interoperabilitas SATUSEHAT. HL7 FHIR untuk pertukaran data klinis ke Kemenkes. |
| **Reporting Engine** | Apache Superset / Metabase atau custom dashboard | Visualisasi indikator BOR/ALOS/dll. dengan auto-refresh; dashboard manajemen. |
| **Background Job** | BullMQ / Celery | Job scheduler untuk: auto-submit ke SIRS Online (tgl 1–10), agregasi bulanan/tahunan, sinkronisasi ASPAK/SISDMK. |
| **Deployment** | Docker + Kubernetes / Docker Compose | On-premise untuk keamanan data pasien (PDP), opsi cloud-hybrid jika diperlukan. |
| **Auth & Security** | OAuth2 / Keycloak + RBAC + Audit Log | Role-based per unit (IRNA, IGD, Lab, Coder, Manajemen, Validator), enkripsi at-rest & in-transit (TLS). |

---

## 6. Struktur Database — Entitas Master yang Direkomendasikan

Master data adalah fondasi yang harus dibangun terlebih dahulu sebelum modul-modul transaksional. Tanpa master data yang konsisten, output tidak akan diterima oleh sistem Kemenkes.

| Entitas Master | Keterangan / Contoh Data |
|---|---|
| `master_icd10` | Kode + deskripsi (ID & EN) + restriksi gender + restriksi kelompok umur. Sumber: WHO ICD-10 versi Bahasa Indonesia. |
| `master_jenis_pelayanan` | Umum, Penyakit Dalam, Anak, Bedah, … (sesuai daftar RL 3.2 — 36 jenis), termasuk KJSU (Kanker, Jantung, Stroke, Uronefrologi). |
| `master_kelas_tt` | VVIP, VIP, I, II, III, ICU±vent, NICU±vent, PICU±vent, HCU, ICCU/ICVCU±vent, RICU±vent, Isolasi, Perinatologi, VK Non Covid, IGD Intermediate Ward. |
| `master_jenis_pemeriksaan_lab` | Hematologi, Kimia Klinik, Imunologi, Urinalisis, Hemostasis, Mikrobiologi, Parasitologi, Patologi Anatomi (sesuai RL 3.8). |
| `master_kelompok_obat` | Generik Fornas, Generik Non-Fornas, Non-Generik Fornas, Non-Generik Non-Fornas. |
| `master_kelompok_umur` | 25 kelompok: <1 jam, 1–23 jam, 1–7 hari, 8–28 hari, 29 hari–<3 bln, … , ≥85 th. |
| `master_cara_bayar` | Membayar Sendiri, JKN/BPJS, Jamkesda, Asuransi Pemerintah Lainnya, Swasta, Cost Sharing, Gratis (Kartu Sehat/SKTM/lainnya). |

> Tabel transaksional dirancang per formulir RL dengan **partitioning by year/month** untuk performa query agregat. Gunakan denormalization moderat (read-heavy untuk reporting) dan **materialized view** untuk indikator yang sering ditampilkan di dashboard.

---

## 7. Pertimbangan UI / UX

- Form sederhana dengan grup field sesuai struktur formulir RL — hindari satu halaman dengan ratusan field; gunakan tab atau wizard.
- Auto-save draft setiap 30 detik agar pekerjaan PIC tidak hilang.
- Mode tampilan tabel mirip Excel untuk pengguna yang terbiasa dengan formulir Excel SIRS lama (kurva belajar lebih landai).
- Pencarian ICD-10 dengan autocomplete + kode + deskripsi (mis. ketik "hipertensi" → muncul I10, I11, I12, dst.).
- Indikator visual progress pengisian per formulir (mis. *"RL 3.2: 80% terisi"*).
- Bahasa Indonesia konsisten, ikuti terminologi JUKNIS SIRS 6.3 — bukan terminologi internal RS.
- Versi mobile/tablet ringan untuk input RL 1.3 (Tempat Tidur) oleh kepala ruang.

---

## 8. Keamanan, Privasi & Compliance

1. **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (PDP)** — enkripsi data sensitif, audit consent, hak subjek data.
2. **UU No. 17 Tahun 2023 tentang Kesehatan** — kewajiban kerahasiaan rekam medis.
3. **Permenkes 24/2022 tentang Rekam Medis Elektronik** — RME terstandar & interoperabel.
4. **Standar Akreditasi MRMIK 4 (KMK 1128/2022)** — kelengkapan & ketepatan waktu SIRS sebagai elemen penilaian.
5. **ISO 27001** (rekomendasi) untuk manajemen keamanan informasi.
6. **Role-Based Access Control (RBAC)** per unit dan per role (entri, validator, approver, viewer).

---

## 9. Strategi Integrasi

### 9.1 Integrasi dengan SIMRS Eksisting

- Read-only database access ke SIMRS untuk hindari pelanggaran integritas data SIMRS.
- Atau API connector jika SIMRS menyediakan endpoint.
- Buffer / staging table di sisi aplikasi SIRS agar tidak mengganggu performa SIMRS.

### 9.2 Integrasi dengan Aplikasi Kemenkes

- **RS Online** — REST API untuk update profil & ketersediaan TT.
- **ASPAK** — sinkronisasi data alkes & sarpras.
- **SISDMK** — sinkronisasi data SDM.
- **SIRS Online v3** — push laporan RL 3, 4, 5 bulanan/tahunan.
- **SATUSEHAT (FHIR)** — rencana jangka menengah untuk interoperabilitas RME.

### 9.3 Modul Tunggal vs Multi-Tenant

- Jika untuk 1 RS: single-tenant, sederhana, on-premise.
- Jika untuk jaringan RS / kelompok: multi-tenant dengan isolasi data per RS (row-level security PostgreSQL).

---

## 10. Roadmap Implementasi yang Direkomendasikan

> Estimasi total: **8 – 12 bulan** dari kick-off hingga go-live menyeluruh (5 fase). Dapat lebih cepat jika tim teknis sudah familiar dengan ekosistem SIRS dan SIMRS eksisting.

| Fase | Estimasi Waktu | Deliverable |
|---|---|---|
| **Fase 1 — Discovery & Setup** | 4 – 6 minggu | • Workshop dengan unit terkait (IRNA, IGD, Lab, RM, Farmasi, SDM)<br>• Inventarisasi sumber data eksisting (SIMRS, LIS, RIS, manual)<br>• Arsitektur sistem, ERD database, mock-up UI<br>• Setup infrastruktur (server, repo, CI/CD) |
| **Fase 2 — Core Build** | 8 – 12 minggu | • Modul autentikasi & RBAC<br>• Master data (ICD-10, jenis pelayanan, kelas TT)<br>• Modul **RL 1.3** (Tempat Tidur real-time) — quick win<br>• Modul **RL 3.2** (Rawat Inap) → auto-generate **RL 3.1**<br>• Modul **RL 4 & RL 5** (Morbiditas ICD-10) |
| **Fase 3 — Expand & Integrate** | 10 – 14 minggu | • Sisanya RL 3.3 s.d. RL 3.19<br>• Integrasi SIMRS (sensus harian, lab, farmasi, kasir, rekam medis)<br>• Integrasi ASPAK & SISDMK (RL 1.4 & RL 2)<br>• Konektor auto-submit ke SIRS Online v3.0.0 |
| **Fase 4 — Dashboard & Pilot** | 4 – 6 minggu | • Dashboard BOR/ALOS/BTO/TOI/NDR/GDR per kelas<br>• Dashboard 10 Besar Penyakit otomatis<br>• Pilot 1 bulan di satu unit; UAT per modul<br>• Pelatihan pengguna per unit |
| **Fase 5 — SATUSEHAT & Optimasi** | 6 – 8 minggu | • Implementasi HL7 FHIR untuk SATUSEHAT (Encounter, Condition, Procedure, Observation, Medication)<br>• Optimasi performa (indexing, query, caching)<br>• Audit log lengkap & dokumentasi<br>• Go-live menyeluruh |

---

## 11. KPI Keberhasilan Aplikasi

1. **Ketepatan waktu** pelaporan: 100% laporan bulanan terkirim ≤ tanggal 10.
2. **Akurasi data**: < 1% rejection rate dari sisi server Kemenkes.
3. **Otomatisasi**: ≥ 80% data terisi otomatis dari SIMRS (bukan entri manual).
4. **Waktu penyusunan laporan**: turun dari hari ke menit per formulir.
5. **Kepuasan PIC pelaporan**: ≥ 4/5 (survei internal).
6. **Skor akreditasi MRMIK 4**: meningkat dari pelaporan SIRS yang lengkap & tepat waktu.

---

## 12. Risiko & Mitigasi

### Risiko Teknis

- **API Kemenkes berubah / tidak stabil** → buat layer abstraksi & fallback ke entri manual.
- **SIMRS legacy sulit diintegrasikan** → mulai dengan ETL berbasis file/database read-only.
- **Kualitas data sumber buruk** → bangun validator kuat & dashboard kualitas data.

### Risiko Organisasi

- **Resistensi pengguna unit** → libatkan unit sejak fase Discovery, training intensif, champions per unit.
- **Coder ICD-10 tidak konsisten** → sediakan coding assistant + audit periodik.
- **Aturan SIRS berubah** → arsitektur modular & master data versioned agar mudah update.

---

## 13. Kesimpulan & Langkah Berikutnya

Aplikasi pelaporan SIRS 6.3 yang ideal **bukan hanya "form entri data Kemenkes"** — tetapi sebuah platform integrasi yang mengikat seluruh sumber data klinis & operasional rumah sakit, melakukan validasi otomatis, dan mengirim hasil yang sudah terverifikasi ke berbagai aplikasi Kemenkes. Pendekatan ini akan menghilangkan duplikasi pekerjaan, meningkatkan akurasi, dan memberi nilai tambah berupa dashboard manajemen real-time.

**Langkah konkret yang direkomendasikan untuk Intramedika dalam memulai pengembangan:**

1. Bentuk tim proyek dengan komposisi: Project Manager, Business Analyst (dengan latar belakang Rekam Medis), 2–3 Software Engineer (Frontend + Backend), 1 Database Engineer, 1 QA/Tester.
2. Lakukan workshop awal bersama PIC dari Rawat Inap, IGD, Rawat Jalan, Lab, Radiologi, Farmasi, Rekam Medis, SDM, dan Manajemen.
3. Pilih RS Pilot (jika untuk produk komersial) untuk uji coba fase Discovery & Core Build.
4. Bangun MVP fokus pada **"quick win"**: RL 1.3 (Tempat Tidur), RL 3.1 + RL 3.2 (Indikator & Rawat Inap), dan RL 4.1 (Morbiditas Rawat Inap).
5. Setelah MVP terbukti, ekspansi ke modul-modul lain sambil membangun konektor ke aplikasi Kemenkes.
6. Siapkan strategi jangka panjang untuk interoperabilitas dengan SATUSEHAT (FHIR) — ini akan menjadi standar dalam 2–3 tahun ke depan.

Dengan pendekatan modular & bertahap, aplikasi ini dapat menjadi tulang punggung pelaporan rumah sakit sekaligus produk yang bernilai komersial bagi industri perumahsakitan Indonesia.

---

## Sumber & Referensi

- Petunjuk Teknis Pelaporan SIRS Revisi 6.3 — Kemenkes RI (2024).
- Surat Edaran Dirjen Yankes Nomor HK.02.02/D/45788/2024.
- Permenkes No. 1171/2011 tentang SIRS; Permenkes No. 24/2022 tentang RME.
- KMK No. 1128/2022 tentang Standar Akreditasi RS (Standar MRMIK 4).
- UU No. 17/2023 tentang Kesehatan; UU No. 27/2022 tentang Pelindungan Data Pribadi.
