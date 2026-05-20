# 05 — Project Scaffold & Struktur Kode

**NestJS (Backend) + Next.js 14 (Frontend) | Monorepo dengan pnpm Workspaces**

---

## Daftar Isi

1. [Struktur Monorepo](#1-struktur-monorepo)
2. [Backend — NestJS](#2-backend--nestjs)
3. [Frontend — Next.js](#3-frontend--nextjs)
4. [Shared Packages](#4-shared-packages)
5. [Konfigurasi Tools](#5-konfigurasi-tools)
6. [Docker Compose Dev](#6-docker-compose-dev)
7. [Environment Variables](#7-environment-variables)
8. [Scripts & Commands](#8-scripts--commands)

---

## 1. Struktur Monorepo

```
sirs-app/
├── apps/
│   ├── api/                          # NestJS Backend
│   └── web/                          # Next.js Frontend
├── packages/
│   ├── shared-types/                 # TypeScript types & Zod schemas
│   ├── icd10-validator/              # Validation rules ICD-10 SIRS 6.3
│   └── sirs-calculator/              # Kalkulasi BOR, ALOS, BTO, TOI, NDR, GDR
├── prisma/                           # Prisma schema & migrations (shared)
├── docker/
│   ├── docker-compose.yml
│   ├── docker-compose.prod.yml
│   └── nginx/
│       └── nginx.conf
├── scripts/
│   ├── seed.ts                       # Seed dummy data
│   ├── seed-icd10.ts                 # Import ICD-10 dari CSV
│   └── generate-periodo.ts           # Generate laporan_periode untuk 1 tahun
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── pnpm-workspace.yaml
├── package.json
└── turbo.json
```

---

## 2. Backend — NestJS

```
apps/api/
├── src/
│   ├── main.ts                       # Bootstrap NestJS app
│   ├── app.module.ts                 # Root module
│   │
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   └── kemenkes.config.ts        # API keys & URLs Kemenkes
│   │
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── require-permission.decorator.ts
│   │   │   ├── require-unit-scope.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── rbac.guard.ts
│   │   ├── interceptors/
│   │   │   ├── audit-log.interceptor.ts
│   │   │   ├── response-transform.interceptor.ts
│   │   │   └── timeout.interceptor.ts
│   │   ├── filters/
│   │   │   └── global-exception.filter.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── utils/
│   │       ├── pagination.util.ts
│   │       └── date.util.ts
│   │
│   ├── prisma/
│   │   └── prisma.service.ts         # Prisma client singleton
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       └── change-password.dto.ts
│   │   │
│   │   ├── master/
│   │   │   ├── master.module.ts
│   │   │   ├── master.controller.ts
│   │   │   ├── master.service.ts
│   │   │   └── dto/
│   │   │       └── icd10-validate.dto.ts
│   │   │
│   │   ├── rl1/
│   │   │   ├── rl1.module.ts
│   │   │   ├── rl1.controller.ts
│   │   │   ├── rl1.service.ts
│   │   │   ├── tt-harian.controller.ts
│   │   │   ├── tt-harian.service.ts
│   │   │   └── dto/
│   │   │       ├── update-profil.dto.ts
│   │   │       ├── input-tt-harian.dto.ts
│   │   │       └── update-tt-tahunan.dto.ts
│   │   │
│   │   ├── rl2/
│   │   │   ├── rl2.module.ts
│   │   │   ├── rl2.controller.ts
│   │   │   ├── rl2.service.ts
│   │   │   └── dto/
│   │   │       └── bulk-ketenagaan.dto.ts
│   │   │
│   │   ├── rl3/
│   │   │   ├── rl3.module.ts
│   │   │   ├── sensus-harian/
│   │   │   │   ├── sensus-harian.controller.ts
│   │   │   │   ├── sensus-harian.service.ts
│   │   │   │   └── dto/
│   │   │   │       └── input-sensus.dto.ts
│   │   │   ├── indikator/              # RL 3.1
│   │   │   │   ├── indikator.controller.ts
│   │   │   │   └── indikator.service.ts
│   │   │   ├── rawat-inap/             # RL 3.2
│   │   │   ├── rawat-jalan/            # RL 3.3
│   │   │   ├── igd/                    # RL 3.4
│   │   │   ├── kebidanan/              # RL 3.6
│   │   │   ├── neonatal/               # RL 3.7
│   │   │   ├── laboratorium/           # RL 3.8
│   │   │   ├── radiologi/              # RL 3.9
│   │   │   ├── rujukan/                # RL 3.10
│   │   │   ├── gigi/                   # RL 3.11
│   │   │   ├── rehab-medik/            # RL 3.12
│   │   │   ├── pelayanan-khusus/       # RL 3.13
│   │   │   ├── keswa/                  # RL 3.14
│   │   │   ├── kb/                     # RL 3.15
│   │   │   ├── obat-khusus/            # RL 3.16
│   │   │   ├── farmasi/                # RL 3.17
│   │   │   ├── resep/                  # RL 3.18
│   │   │   └── cara-bayar/             # RL 3.19
│   │   │
│   │   ├── rl4/
│   │   │   ├── rl4.module.ts
│   │   │   ├── morbiditas-ri.controller.ts
│   │   │   ├── morbiditas-ri.service.ts
│   │   │   ├── morbiditas-ri-khusus.controller.ts
│   │   │   └── dto/
│   │   │       └── bulk-morbiditas.dto.ts
│   │   │
│   │   ├── rl5/
│   │   │   ├── rl5.module.ts
│   │   │   ├── morbiditas-rj.controller.ts
│   │   │   ├── morbiditas-rj.service.ts
│   │   │   └── dto/
│   │   │       └── bulk-morbiditas-rj.dto.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── dashboard.module.ts
│   │   │   ├── dashboard.controller.ts
│   │   │   └── dashboard.service.ts
│   │   │
│   │   ├── workflow/
│   │   │   ├── workflow.module.ts
│   │   │   ├── workflow.controller.ts
│   │   │   ├── workflow.service.ts
│   │   │   └── workflow-state-machine.ts
│   │   │
│   │   ├── integrasi/
│   │   │   ├── integrasi.module.ts
│   │   │   ├── integrasi.controller.ts
│   │   │   ├── connectors/
│   │   │   │   ├── sirs-online.connector.ts
│   │   │   │   ├── rs-online.connector.ts
│   │   │   │   ├── aspak.connector.ts
│   │   │   │   ├── sisdmk.connector.ts
│   │   │   │   └── satusehat-fhir.connector.ts
│   │   │   └── dto/
│   │   │       └── submit-kemenkes.dto.ts
│   │   │
│   │   ├── notifikasi/
│   │   │   ├── notifikasi.module.ts
│   │   │   ├── notifikasi.service.ts
│   │   │   └── templates/
│   │   │       ├── deadline-reminder.mjml
│   │   │       ├── laporan-rejected.mjml
│   │   │       └── laporan-sent.mjml
│   │   │
│   │   ├── scheduler/
│   │   │   ├── scheduler.module.ts
│   │   │   ├── jobs/
│   │   │   │   ├── agregasi-bulanan.job.ts
│   │   │   │   ├── auto-submit-kemenkes.job.ts
│   │   │   │   ├── notifikasi-deadline.job.ts
│   │   │   │   ├── refresh-mv.job.ts        # Refresh materialized views
│   │   │   │   └── sinkronisasi-master.job.ts
│   │   │   └── scheduler.service.ts
│   │   │
│   │   └── admin/
│   │       ├── admin.module.ts
│   │       ├── users.controller.ts
│   │       ├── users.service.ts
│   │       ├── audit-log.controller.ts
│   │       ├── periode.controller.ts
│   │       └── system.controller.ts
│   │
│   └── validation/
│       ├── sirs-rules.validator.ts    # Aturan validasi JUKNIS 6.3
│       ├── sensus-consistency.validator.ts
│       └── icd10-restriction.validator.ts
│
├── test/
│   ├── unit/
│   │   ├── calculator.spec.ts
│   │   ├── sensus-consistency.spec.ts
│   │   └── icd10-restriction.spec.ts
│   ├── integration/
│   │   ├── auth.e2e-spec.ts
│   │   ├── rl3-sensus.e2e-spec.ts
│   │   └── workflow.e2e-spec.ts
│   └── fixtures/
│       ├── sensus-harian.fixture.ts
│       └── icd10-sample.fixture.ts
│
├── .env.example
├── nest-cli.json
├── tsconfig.json
└── package.json
```

---

## 3. Frontend — Next.js

```
apps/web/
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Redirect ke /dashboard
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (app)/                    # Layout dengan sidebar
│   │   │   ├── layout.tsx            # Sidebar + Header
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── rl1/
│   │   │   │   ├── page.tsx          # Profil RS
│   │   │   │   ├── layanan/page.tsx
│   │   │   │   └── tempat-tidur/
│   │   │   │       ├── page.tsx      # Input harian
│   │   │   │       └── tahunan/page.tsx
│   │   │   ├── rl2/
│   │   │   │   └── [periode_id]/page.tsx
│   │   │   ├── rl3/
│   │   │   │   ├── sensus-harian/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [periode_id]/
│   │   │   │       ├── page.tsx      # Overview progress RL 3
│   │   │   │       ├── indikator/page.tsx
│   │   │   │       ├── rawat-inap/page.tsx
│   │   │   │       ├── rawat-jalan/page.tsx
│   │   │   │       ├── igd/page.tsx
│   │   │   │       ├── kebidanan/page.tsx
│   │   │   │       ├── neonatal/page.tsx
│   │   │   │       ├── laboratorium/page.tsx
│   │   │   │       ├── radiologi/page.tsx
│   │   │   │       ├── rujukan/page.tsx
│   │   │   │       ├── layanan-khusus/page.tsx
│   │   │   │       └── farmasi/page.tsx
│   │   │   ├── rl4/
│   │   │   │   └── [periode_id]/
│   │   │   │       ├── page.tsx      # Tabel morbiditas RI
│   │   │   │       └── khusus/page.tsx
│   │   │   ├── rl5/
│   │   │   │   └── [periode_id]/page.tsx
│   │   │   ├── workflow/
│   │   │   │   └── [periode_id]/page.tsx
│   │   │   └── admin/
│   │   │       ├── users/page.tsx
│   │   │       ├── audit-log/page.tsx
│   │   │       ├── periode/page.tsx
│   │   │       ├── scheduler/page.tsx
│   │   │       └── system/page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── breadcrumb.tsx
│   │   ├── forms/
│   │   │   ├── sensus-harian-form.tsx
│   │   │   ├── morbiditas-form.tsx
│   │   │   ├── icd10-autocomplete.tsx
│   │   │   └── bulk-table-editor.tsx  # Mode Excel-like untuk input massal
│   │   ├── dashboard/
│   │   │   ├── indikator-card.tsx
│   │   │   ├── bor-gauge.tsx
│   │   │   ├── tren-chart.tsx
│   │   │   ├── top10-table.tsx
│   │   │   └── kepatuhan-badge.tsx
│   │   ├── workflow/
│   │   │   ├── status-badge.tsx
│   │   │   ├── approval-timeline.tsx
│   │   │   └── reject-dialog.tsx
│   │   └── common/
│   │       ├── data-table.tsx
│   │       ├── period-selector.tsx
│   │       ├── progress-ring.tsx
│   │       ├── validation-alert.tsx
│   │       └── export-button.tsx
│   │
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-periode.ts
│   │   ├── use-icd10-search.ts
│   │   └── use-sensus-harian.ts
│   │
│   ├── lib/
│   │   ├── api-client.ts             # Axios instance + interceptors
│   │   ├── auth.ts                   # NextAuth config
│   │   ├── query-client.ts           # React Query setup
│   │   └── utils.ts
│   │
│   ├── stores/
│   │   ├── auth.store.ts             # Zustand: user session
│   │   └── periode.store.ts          # Zustand: periode aktif
│   │
│   └── types/
│       └── index.ts                  # Re-export dari shared-types
│
├── public/
│   └── logo-rs.png
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 4. Shared Packages

### packages/shared-types/

```typescript
// packages/shared-types/src/index.ts

export type JenisKelamin = 'L' | 'P';
export type StatusWorkflow =
  | 'draft' | 'submitted' | 'validated'
  | 'approved' | 'sent' | 'acknowledged';

export interface LaporanPeriode {
  id: string;
  jenis: 'bulanan' | 'tahunan';
  tahun: number;
  bulan?: number;
  label: string;
  tglTutup: string;
  isLocked: boolean;
}

export interface SensusHarianRow {
  kelasTtId: number;
  jenisPelayananId: number;
  pasienAwal: number;
  masukBaru: number;
  masukPindahan: number;
  keluarHidup: number;
  keluarMatiLt48: number;
  keluarMatiGe48: number;
  dipindahkan: number;
  hariPerawatan: number;
}

export interface IndikatorPelayanan {
  kelasTt: string;
  ttTersedia: number;
  hariPerawatan: number;
  bor: number;
  alos: number;
  bto: number;
  toi: number;
  ndr: number;
  gdr: number;
}

export interface MorbiditasRow {
  kodeIcd10: string;
  kelompokUmurId: number;
  kasusBaru: { l: number; p: number };
  mati: { l: number; p: number };
  totalHariRawat?: number;
}
```

### packages/sirs-calculator/

```typescript
// packages/sirs-calculator/src/index.ts

export function hitungBOR(
  hariPerawatan: number,
  ttTersedia: number,
  jumlahHariKalender: number
): number {
  if (ttTersedia === 0 || jumlahHariKalender === 0) return 0;
  return (hariPerawatan / (ttTersedia * jumlahHariKalender)) * 100;
}

export function hitungALOS(
  totalHariRawat: number,
  pasienKeluar: number
): number {
  if (pasienKeluar === 0) return 0;
  return totalHariRawat / pasienKeluar;
}

export function hitungBTO(
  pasienKeluar: number,
  ttTersedia: number
): number {
  if (ttTersedia === 0) return 0;
  return pasienKeluar / ttTersedia;
}

export function hitungTOI(
  ttTersedia: number,
  jumlahHariKalender: number,
  hariPerawatan: number,
  pasienKeluar: number
): number {
  if (pasienKeluar === 0) return 0;
  return ((ttTersedia * jumlahHariKalender) - hariPerawatan) / pasienKeluar;
}

export function hitungNDR(
  pasienMatiGe48: number,
  pasienKeluar: number
): number {
  if (pasienKeluar === 0) return 0;
  return (pasienMatiGe48 / pasienKeluar) * 1000;
}

export function hitungGDR(
  totalPasienMati: number,
  pasienKeluar: number
): number {
  if (pasienKeluar === 0) return 0;
  return (totalPasienMati / pasienKeluar) * 1000;
}

export function validasiKonsistensiSensus(row: SensusHarianRow): boolean {
  const expected =
    row.pasienAwal + row.masukBaru + row.masukPindahan
    - row.keluarHidup - row.keluarMatiLt48 - row.keluarMatiGe48
    - row.dipindahkan;
  return expected >= 0;
}
```

### packages/icd10-validator/

```typescript
// packages/icd10-validator/src/index.ts

export interface Icd10Record {
  kode: string;
  restriksiGender: 'L' | 'P' | null;
  restriksiUmurMin: number | null;  // hari
  restriksiUmurMax: number | null;  // hari
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateIcd10(
  icd10: Icd10Record,
  gender: 'L' | 'P',
  umurHari: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (icd10.restriksiGender && icd10.restriksiGender !== gender) {
    errors.push(
      `Kode ${icd10.kode} hanya untuk pasien ${
        icd10.restriksiGender === 'L' ? 'laki-laki' : 'perempuan'
      }`
    );
  }

  if (icd10.restriksiUmurMin !== null && umurHari < icd10.restriksiUmurMin) {
    errors.push(`Kode ${icd10.kode}: umur pasien terlalu muda`);
  }

  if (icd10.restriksiUmurMax !== null && umurHari > icd10.restriksiUmurMax) {
    errors.push(`Kode ${icd10.kode}: umur pasien terlalu tua`);
  }

  return { valid: errors.length === 0, errors, warnings };
}
```

---

## 5. Konfigurasi Tools

### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "persistent": true,
      "cache": false
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {},
    "db:generate": {
      "cache": false
    }
  }
}
```

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### prisma/schema.prisma (ringkasan)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(uuid())
  username     String   @unique
  email        String   @unique
  passwordHash String   @map("password_hash")
  fullName     String   @map("full_name")
  unitKerja    String?  @map("unit_kerja")
  noTelepon    String?  @map("no_telepon")
  isActive     Boolean  @default(true) @map("is_active")
  lastLogin    DateTime? @map("last_login")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")
  deletedAt    DateTime? @map("deleted_at")

  userRoles      UserRole[]
  refreshTokens  RefreshToken[]
  auditLogs      AuditLog[]

  @@map("users")
}

// ... (semua model dari schema SQL di 02_DATABASE_SCHEMA.md)
```

---

## 6. Docker Compose Dev

```yaml
# docker/docker-compose.yml
version: '3.9'

services:
  postgres:
    image: postgres:16-alpine
    container_name: sirs_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: sirs_db
      POSTGRES_USER: sirs_user
      POSTGRES_PASSWORD: sirs_pass_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U sirs_user -d sirs_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: sirs_redis
    restart: unless-stopped
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  minio:
    image: minio/minio:latest
    container_name: sirs_minio
    restart: unless-stopped
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minio_admin
      MINIO_ROOT_PASSWORD: minio_pass_dev
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data

  api:
    build:
      context: ..
      dockerfile: apps/api/Dockerfile
    container_name: sirs_api
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    env_file:
      - ../apps/api/.env
    ports:
      - "3001:3001"
    volumes:
      - ../apps/api/src:/app/src   # Hot reload dev
    command: pnpm dev

  web:
    build:
      context: ..
      dockerfile: apps/web/Dockerfile
    container_name: sirs_web
    restart: unless-stopped
    depends_on:
      - api
    env_file:
      - ../apps/web/.env
    ports:
      - "3000:3000"
    volumes:
      - ../apps/web/src:/app/src
    command: pnpm dev

  nginx:
    image: nginx:alpine
    container_name: sirs_nginx
    restart: unless-stopped
    depends_on:
      - api
      - web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

---

## 7. Environment Variables

### apps/api/.env.example

```bash
# App
NODE_ENV=development
PORT=3001
APP_NAME="SIRS 6.3 API"

# Database
DATABASE_URL=postgresql://sirs_user:sirs_pass_dev@localhost:5432/sirs_db

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=ganti-dengan-secret-panjang-random-min-64-chars
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# MinIO / S3
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minio_admin
MINIO_SECRET_KEY=minio_pass_dev
MINIO_BUCKET=sirs-documents

# Email (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@rs.example.com
SMTP_PASS=smtp_password
SMTP_FROM="SIRS RS <noreply@rs.example.com>"

# WhatsApp Gateway (opsional)
WA_GATEWAY_URL=
WA_API_KEY=

# Kemenkes APIs
SIRS_ONLINE_BASE_URL=https://sirs6.kemkes.go.id/v3/api
SIRS_ONLINE_API_KEY=
RS_ONLINE_BASE_URL=https://rsonline.kemkes.go.id/api
RS_ONLINE_API_KEY=
ASPAK_BASE_URL=https://aspak.kemkes.go.id/api
ASPAK_API_KEY=
SISDMK_BASE_URL=https://sisdmk.kemkes.go.id/api
SISDMK_API_KEY=

# SATUSEHAT (Fase 5)
SATUSEHAT_BASE_URL=https://api-satusehat.kemkes.go.id/fhir-r4/v1
SATUSEHAT_CLIENT_ID=
SATUSEHAT_CLIENT_SECRET=

# Feature Flags
ENABLE_AUTO_SUBMIT=false      # set true untuk auto-submit ke Kemenkes
ENABLE_WA_NOTIF=false
ENABLE_FHIR_ADAPTER=false
```

### apps/web/.env.example

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_NAME="SIRS 6.3"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=ganti-dengan-nextauth-secret
```

---

## 8. Scripts & Commands

### Root package.json scripts

```json
{
  "scripts": {
    "dev":              "turbo dev",
    "build":            "turbo build",
    "test":             "turbo test",
    "lint":             "turbo lint",
    "db:generate":      "prisma generate",
    "db:migrate":       "prisma migrate dev",
    "db:migrate:prod":  "prisma migrate deploy",
    "db:seed":          "ts-node scripts/seed.ts",
    "db:seed:icd10":    "ts-node scripts/seed-icd10.ts",
    "db:reset":         "prisma migrate reset --force",
    "db:studio":        "prisma studio",
    "docker:up":        "docker compose -f docker/docker-compose.yml up -d",
    "docker:down":      "docker compose -f docker/docker-compose.yml down",
    "docker:logs":      "docker compose -f docker/docker-compose.yml logs -f"
  }
}
```

### Setup awal (developer baru)

```bash
# 1. Clone repo
git clone https://github.com/org/sirs-app.git && cd sirs-app

# 2. Install dependencies
pnpm install

# 3. Jalankan infrastruktur (DB, Redis, MinIO)
pnpm docker:up

# 4. Salin env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# 5. Generate Prisma client
pnpm db:generate

# 6. Jalankan migrasi database
pnpm db:migrate

# 7. Seed master data + dummy data
pnpm db:seed
pnpm db:seed:icd10

# 8. Jalankan aplikasi
pnpm dev
# API: http://localhost:3001
# Web: http://localhost:3000
# Prisma Studio: pnpm db:studio (port 5555)
# MinIO Console: http://localhost:9001
```
