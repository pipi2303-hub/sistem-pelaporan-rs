# 01 — Arsitektur Sistem SIRS 6.3

**Single-Tenant | NestJS | PostgreSQL | Next.js**

---

## Daftar Isi

1. [Gambaran Sistem](#1-gambaran-sistem)
2. [System Context Diagram](#2-system-context-diagram)
3. [Component Architecture](#3-component-architecture)
4. [Data Flow — Siklus Pelaporan](#4-data-flow--siklus-pelaporan)
5. [Deployment Topology](#5-deployment-topology)
6. [Keputusan Teknologi](#6-keputusan-teknologi)

---

## 1. Gambaran Sistem

Aplikasi SIRS 6.3 adalah sistem pelaporan internal rumah sakit yang berfungsi sebagai:

- **Pusat agregasi data** dari seluruh unit (IRNA, IGD, Lab, Farmasi, Rekam Medis, SDM)
- **Engine validasi** sesuai aturan JUKNIS SIRS 6.3 Kemenkes RI
- **Gateway pelaporan** ke aplikasi Kemenkes (SIRS Online v3, RS Online, ASPAK, SISDMK)
- **Dashboard manajemen** indikator pelayanan real-time

Karena tidak ada SIMRS eksisting, sistem ini sekaligus berperan sebagai **sumber data primer** dengan modul entri manual yang lengkap dan data dummy/seed untuk development.

---

## 2. System Context Diagram

```mermaid
C4Context
  title System Context — Aplikasi SIRS 6.3 (Single-Tenant RS)

  Person(pic_unit, "PIC Unit", "Rawat Inap, IGD, Lab,\nFarmasi, RM, SDM")
  Person(validator, "Validator", "Komite Rekam Medis / SIRS")
  Person(direksi, "Direksi / Manajemen", "Melihat dashboard & KPI")
  Person(admin, "Admin Sistem", "Kelola user, master data")

  System(sirs_app, "Aplikasi SIRS 6.3", "Platform pelaporan internal RS:\nentri data, validasi, approval,\ndashboard, submit ke Kemenkes")

  System_Ext(sirs_online, "SIRS Online v3\nsirs6.kemkes.go.id", "Penerimaan laporan RL 3,4,5\nbulanan & tahunan")
  System_Ext(rs_online, "RS Online\nKemenkes RI", "Profil RS, ketersediaan TT")
  System_Ext(aspak, "ASPAK\nKemenkes RI", "Data alkes & sarpras")
  System_Ext(sisdmk, "SISDMK\nKemenkes RI", "Data SDM kesehatan")
  System_Ext(satusehat, "SATUSEHAT\n(FHIR R4)", "Interoperabilitas RME\n[fase 5]")
  System_Ext(notif, "Email / WhatsApp\nGateway", "Notifikasi deadline,\npersetujuan, penolakan")

  Rel(pic_unit, sirs_app, "Input data, lihat status laporan")
  Rel(validator, sirs_app, "Validasi & approve laporan")
  Rel(direksi, sirs_app, "Monitor dashboard KPI")
  Rel(admin, sirs_app, "Administrasi sistem")

  Rel(sirs_app, sirs_online, "POST laporan RL 3/4/5", "REST API")
  Rel(sirs_app, rs_online, "PUT profil & TT", "REST API")
  Rel(sirs_app, aspak, "PUT data alkes", "REST API")
  Rel(sirs_app, sisdmk, "GET/PUT data SDM", "REST API")
  Rel(sirs_app, satusehat, "POST FHIR Bundle", "FHIR R4 REST")
  Rel(sirs_app, notif, "Kirim notifikasi", "SMTP / WA API")
```

---

## 3. Component Architecture

```mermaid
graph TB
  subgraph PRESENTATION["Presentation Layer (Next.js 14 + TypeScript)"]
    WEB["Web App\n(Browser)"]
    subgraph PAGES["Pages / Modules"]
      P1["RL 1 — Identitas RS"]
      P2["RL 2 — Ketenagaan"]
      P3["RL 3 — Rawat Inap & Penunjang"]
      P4["RL 4 — Morbiditas RI"]
      P5["RL 5 — Morbiditas RJ"]
      DASH["Dashboard Manajemen"]
      ADMIN["Admin Panel"]
    end
  end

  subgraph API["API Layer (NestJS)"]
    GW["API Gateway\n(Nginx)"]
    AUTH["Auth Module\n(JWT + RBAC)"]
    subgraph MODULES["Domain Modules"]
      M1["RL1 Module"]
      M2["RL2 Module"]
      M3["RL3 Module"]
      M4["RL4 Module"]
      M5["RL5 Module"]
      MDash["Dashboard Module"]
      MMaster["Master Data Module"]
      MAdmin["Admin Module"]
    end
    VAL["Validation Engine\n(Rules SIRS 6.3)"]
    CALC["Calculator Engine\n(BOR/ALOS/BTO/TOI/NDR/GDR)"]
    WF["Workflow Engine\n(Approval States)"]
  end

  subgraph JOB["Background Jobs (BullMQ)"]
    J1["Aggregator Bulanan"]
    J2["Auto-Submit ke Kemenkes"]
    J3["Notifikasi Deadline"]
    J4["Sinkronisasi Master Data"]
  end

  subgraph INT["Integration Layer"]
    I1["SIRS Online v3 Connector"]
    I2["RS Online Connector"]
    I3["ASPAK Connector"]
    I4["SISDMK Connector"]
    I5["FHIR Adapter (SATUSEHAT)"]
    I6["Notif Gateway (Email/WA)"]
  end

  subgraph DATA["Data Layer"]
    PG[("PostgreSQL 16\n(Primary DB)")]
    REDIS[("Redis 7\n(Cache + Queue)")]
    S3["MinIO / S3\n(File Storage)"]
  end

  WEB --> GW
  GW --> AUTH
  AUTH --> MODULES
  MODULES --> VAL
  MODULES --> CALC
  MODULES --> WF
  MODULES --> PG
  MODULES --> REDIS
  JOB --> INT
  JOB --> PG
  INT --> I1
  INT --> I2
  INT --> I3
  INT --> I4
  INT --> I5
  INT --> I6
  M1 --> S3
```

---

## 4. Data Flow — Siklus Pelaporan Bulanan

```mermaid
sequenceDiagram
  actor PIC as PIC Unit
  participant APP as Aplikasi SIRS
  participant VAL as Validation Engine
  participant WF as Workflow Engine
  participant SCHED as Scheduler (BullMQ)
  participant KEMENKES as SIRS Online v3

  Note over PIC,KEMENKES: Siklus Bulanan (tgl 1–10 bulan berikutnya)

  PIC->>APP: Input data harian / bulanan
  APP->>APP: Auto-save draft (30 detik)
  APP->>VAL: Validasi inline real-time
  VAL-->>APP: Highlight error / warning

  PIC->>APP: Submit draft untuk review
  APP->>WF: Transisi: Draft → Submitted

  Note over WF: Notif email/WA ke Validator

  actor VALID as Validator
  VALID->>APP: Review data
  alt Data OK
    VALID->>WF: Approve → Validated
    WF->>SCHED: Queue auto-submit job (jika diaktifkan)
  else Data bermasalah
    VALID->>WF: Reject → Draft (dengan catatan)
    WF-->>PIC: Notif: laporan dikembalikan
  end

  actor DIR as Direksi
  DIR->>APP: Final approval (opsional)
  WF->>WF: Validated → Approved

  SCHED->>APP: Trigger submit job
  APP->>KEMENKES: POST /laporan/rl3/{periode}
  KEMENKES-->>APP: 200 OK / Error response

  alt Submit berhasil
    APP->>WF: Approved → Sent
    APP-->>DIR: Notif: laporan terkirim ✓
  else Submit gagal
    APP->>APP: Log error, retry 3x
    APP-->>DIR: Notif: submit gagal, aksi manual
  end

  KEMENKES-->>APP: Acknowledgement (async)
  APP->>WF: Sent → Acknowledged
```

---

## 5. Deployment Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                    Server On-Premise RS                         │
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │   Nginx      │    │  Next.js     │    │   NestJS API     │  │
│  │  (Reverse    │───▶│  Frontend    │    │   (Port 3001)    │  │
│  │   Proxy)     │    │  (Port 3000) │    │                  │  │
│  │  Port 80/443 │    └──────────────┘    └──────┬───────────┘  │
│  └──────────────┘                               │              │
│                                                 ▼              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │  PostgreSQL  │    │    Redis     │    │     MinIO        │  │
│  │  (Port 5432) │◀───│  (Port 6379) │    │  (Port 9000)     │  │
│  │  Primary DB  │    │  Cache+Queue │    │  File Storage    │  │
│  └──────────────┘    └──────────────┘    └──────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Docker Compose / Kubernetes                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                         Internet (HTTPS)
                              │
        ┌─────────────────────┼───────────────────┐
        ▼                     ▼                   ▼
  SIRS Online v3          RS Online           ASPAK/SISDMK
  (Kemenkes)              (Kemenkes)          (Kemenkes)
```

**Spesifikasi Server Minimum (On-Premise):**

| Komponen | Minimum | Rekomendasi |
|---|---|---|
| CPU | 4 core | 8 core |
| RAM | 8 GB | 16 GB |
| Storage | 500 GB SSD | 1 TB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |
| Network | 100 Mbps | 1 Gbps |

---

## 6. Keputusan Teknologi

| Layer | Teknologi | Versi | Alasan |
|---|---|---|---|
| **Frontend** | Next.js + TypeScript | 14.x (App Router) | SSR untuk SEO & performa, App Router untuk layout terstruktur per modul RL |
| **UI Components** | shadcn/ui + Tailwind CSS | latest | Komponen aksesibel, customizable, cocok untuk form medis kompleks |
| **State Management** | Zustand + React Query | latest | Zustand untuk UI state, React Query untuk server state & cache |
| **Backend** | NestJS + TypeScript | 10.x | Modular architecture cocok dengan struktur per-RL, decorator pattern untuk validation |
| **ORM** | Prisma | 5.x | Type-safe, migrasi otomatis, schema-first, cocok untuk PostgreSQL |
| **Database** | PostgreSQL | 16.x | Partitioning native, JSONB, Row-Level Security, materialized views |
| **Cache / Queue** | Redis + BullMQ | 7.x / 5.x | BullMQ untuk job scheduling & retry logic pelaporan Kemenkes |
| **File Storage** | MinIO | latest | S3-compatible, on-premise, untuk upload dokumen SK/Izin |
| **Auth** | JWT + Passport.js | — | Stateless auth, refresh token rotation, RBAC middleware |
| **Validasi** | class-validator + Zod | — | class-validator untuk NestJS DTO, Zod untuk shared schema |
| **Email** | Nodemailer + MJML | — | Transactional email untuk notifikasi deadline |
| **Testing** | Jest + Supertest | — | Unit + integration testing |
| **CI/CD** | GitHub Actions | — | Automated build, test, deploy pipeline |
| **Container** | Docker + Compose | — | Reproducible dev & prod environment |

---

## Catatan Arsitektur Khusus

### Kenapa Single-Tenant (bukan Multi-Tenant)?

Untuk 1 RS: database schema lebih sederhana (tidak perlu `rs_id` di setiap tabel), Row-Level Security tidak diperlukan, performa query lebih optimal karena tidak ada partition per-tenant.

### Kenapa Prisma bukan TypeORM?

Prisma memberikan type-safety yang lebih ketat untuk data medis, migrasi lebih aman (diff-based), dan developer experience lebih baik. TypeORM lebih fleksibel tetapi lebih rentan runtime error.

### Kenapa BullMQ untuk Scheduler?

Karena pelaporan ke Kemenkes harus reliable: BullMQ mendukung retry dengan exponential backoff, job persistence di Redis (tidak hilang saat restart), dan dead letter queue untuk laporan yang gagal.
