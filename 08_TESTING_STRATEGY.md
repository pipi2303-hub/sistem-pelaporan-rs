# 08 — Strategi Pengujian

**Jest | Supertest | Coverage Target 80% Domain Logic**

---

## Piramida Testing

```
                  ┌─────────┐
                  │   E2E   │  ← Sedikit, lambat, bernilai tinggi
                  │  Tests  │    (5–10 skenario kritis)
                 /───────────\
                / Integration \  ← Sedang, middleware + DB
               /    Tests      \  (30–50 tests)
              /─────────────────\
             /    Unit Tests     \  ← Banyak, cepat, isolasi
            /   (Domain Logic)    \  (100+ tests)
           /───────────────────────\
```

---

## 1. Unit Tests — Domain Logic

Fokus pada kode yang **tidak boleh salah**: kalkulasi indikator, validasi ICD-10, konsistensi sensus.

### 1.1 Calculator Tests

```typescript
// packages/sirs-calculator/src/__tests__/calculator.spec.ts

describe('hitungBOR', () => {
  it('menghitung BOR dengan benar', () => {
    // HP=1800, TT=100, hari=30 → BOR = 1800/(100×30)×100 = 60%
    expect(hitungBOR(1800, 100, 30)).toBeCloseTo(60.0, 1);
  });

  it('mengembalikan 0 jika TT tersedia 0', () => {
    expect(hitungBOR(500, 0, 30)).toBe(0);
  });

  it('BOR bisa melebihi 100% (TT tambahan/darurat)', () => {
    expect(hitungBOR(3200, 100, 30)).toBeCloseTo(106.67, 1);
  });
});

describe('hitungALOS', () => {
  it('menghitung ALOS dengan benar', () => {
    // total hari rawat=840, pasien keluar=120 → ALOS=7
    expect(hitungALOS(840, 120)).toBe(7);
  });

  it('mengembalikan 0 jika tidak ada pasien keluar', () => {
    expect(hitungALOS(0, 0)).toBe(0);
  });
});

describe('hitungNDR', () => {
  it('menghitung NDR dengan benar', () => {
    // mati≥48jam=12, pasien keluar=1500 → NDR=8‰
    expect(hitungNDR(12, 1500)).toBeCloseTo(8.0, 1);
  });
});

describe('validasiKonsistensiSensus', () => {
  it('lulus untuk data konsisten', () => {
    const row = {
      pasienAwal: 50,      masukBaru: 5,        masukPindahan: 2,
      keluarHidup: 4,      keluarMatiLt48: 1,   keluarMatiGe48: 0,
      dipindahkan: 1,      hariPerawatan: 51
    };
    expect(validasiKonsistensiSensus(row)).toBe(true);
    // 50+5+2-4-1-0-1 = 51 ✓
  });

  it('gagal jika pasien akhir negatif', () => {
    const row = {
      pasienAwal: 10,      masukBaru: 0,         masukPindahan: 0,
      keluarHidup: 15,     keluarMatiLt48: 0,    keluarMatiGe48: 0,
      dipindahkan: 0,      hariPerawatan: 0
    };
    expect(validasiKonsistensiSensus(row)).toBe(false);
    // 10+0+0-15-0-0-0 = -5 (negatif → invalid)
  });
});
```

### 1.2 ICD-10 Validator Tests

```typescript
// packages/icd10-validator/src/__tests__/icd10-validator.spec.ts

describe('validateIcd10 — Gender Restriction', () => {
  const icdO80: Icd10Record = {
    kode: 'O80',
    restriksiGender: 'P',
    restriksiUmurMin: null,
    restriksiUmurMax: null
  };

  it('menolak kode O80 untuk laki-laki', () => {
    const result = validateIcd10(icdO80, 'L', 10950);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('perempuan');
  });

  it('menerima kode O80 untuk perempuan dewasa', () => {
    const result = validateIcd10(icdO80, 'P', 10950);
    expect(result.valid).toBe(true);
  });
});

describe('validateIcd10 — Age Restriction', () => {
  const icdP07: Icd10Record = {
    kode: 'P07',
    restriksiGender: null,
    restriksiUmurMin: 0,     // 0 hari (lahir)
    restriksiUmurMax: 28     // 28 hari (neonatus)
  };

  it('menolak kode P07 untuk anak 5 tahun', () => {
    const umur5Tahun = 5 * 365;
    const result = validateIcd10(icdP07, 'L', umur5Tahun);
    expect(result.valid).toBe(false);
  });

  it('menerima kode P07 untuk bayi 7 hari', () => {
    const result = validateIcd10(icdP07, 'L', 7);
    expect(result.valid).toBe(true);
  });
});
```

### 1.3 Workflow State Machine Tests

```typescript
// apps/api/src/modules/workflow/__tests__/workflow-state-machine.spec.ts

describe('WorkflowStateMachine', () => {
  it('mengizinkan transisi draft → submitted', () => {
    const sm = new WorkflowStateMachine('draft');
    expect(sm.canTransition('submitted')).toBe(true);
  });

  it('menolak transisi draft → approved (skip step)', () => {
    const sm = new WorkflowStateMachine('draft');
    expect(sm.canTransition('approved')).toBe(false);
  });

  it('menolak transisi sent → draft (mundur)', () => {
    const sm = new WorkflowStateMachine('sent');
    expect(sm.canTransition('draft')).toBe(false);
  });

  it('mengizinkan reject dari validated → draft', () => {
    const sm = new WorkflowStateMachine('validated');
    expect(sm.canTransition('draft')).toBe(true);
  });
});
```

---

## 2. Integration Tests — API Endpoints

Menggunakan **Supertest** + test database (PostgreSQL docker terpisah).

### Setup

```typescript
// apps/api/test/setup.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export async function createTestApp(): Promise<INestApplication> {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();
  await app.init();
  return app;
}

// Jalankan sebelum semua test: reset DB, seed data minimal
beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  await seedMinimalTestData(prisma);
});
```

### Auth Integration Tests

```typescript
// apps/api/test/integration/auth.e2e-spec.ts

describe('POST /auth/login', () => {
  it('200: login berhasil dengan kredensial valid', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ username: 'pic_irna_test', password: 'TestPass123!' });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('access_token');
    expect(res.body.data).toHaveProperty('refresh_token');
    expect(res.body.data.user.roles).toContain('PIC_UNIT');
  });

  it('401: password salah', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ username: 'pic_irna_test', password: 'WrongPass' });

    expect(res.status).toBe(401);
  });

  it('401: user tidak aktif', async () => {
    await prisma.user.update({
      where: { username: 'inactive_user' },
      data: { isActive: false }
    });

    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ username: 'inactive_user', password: 'Pass123!' });

    expect(res.status).toBe(401);
  });
});
```

### RL 3 Sensus Integration Tests

```typescript
// apps/api/test/integration/rl3-sensus.e2e-spec.ts

describe('POST /rl3/sensus-harian', () => {
  let authToken: string;

  beforeAll(async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ username: 'pic_irna_test', password: 'TestPass123!' });
    authToken = res.body.data.access_token;
  });

  it('201: input sensus valid tersimpan', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/rl3/sensus-harian')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        tanggal: '2026-05-15',
        data: [{
          kelas_tt_id: 3,      // Kelas I
          jenis_pelayanan_id: 1,
          pasien_awal: 45,     masuk_baru: 8,        masuk_pindahan: 2,
          keluar_hidup: 6,     keluar_mati_lt48jam: 0, keluar_mati_ge48jam: 1,
          dipindahkan: 1,      hari_perawatan: 47
        }]
      });

    expect(res.status).toBe(201);
    expect(res.body.data.created).toBe(1);
  });

  it('422: formula konsistensi gagal', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/rl3/sensus-harian')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        tanggal: '2026-05-16',
        data: [{
          kelas_tt_id: 3, jenis_pelayanan_id: 1,
          pasien_awal: 10, masuk_baru: 2, masuk_pindahan: 0,
          keluar_hidup: 20,  // lebih besar dari awal + masuk = error
          keluar_mati_lt48jam: 0, keluar_mati_ge48jam: 0,
          dipindahkan: 0, hari_perawatan: 0
        }]
      });

    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('FORMULA_INCONSISTENCY');
  });

  it('403: PIC Farmasi tidak bisa input sensus IRNA', async () => {
    const farmasiToken = await getTokenForRole('PIC_UNIT', 'Farmasi');

    const res = await request(app.getHttpServer())
      .post('/api/v1/rl3/sensus-harian')
      .set('Authorization', `Bearer ${farmasiToken}`)
      .send({ tanggal: '2026-05-15', data: [...] });

    expect(res.status).toBe(403);
  });
});
```

### RL 4 Morbiditas Integration Tests

```typescript
// apps/api/test/integration/rl4-morbiditas.e2e-spec.ts

describe('POST /rl4/morbiditas-ri/:periodeId/bulk', () => {
  it('422: kode O80 untuk laki-laki ditolak', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/v1/rl4/morbiditas-ri/${testPeriodeId}/bulk`)
      .set('Authorization', `Bearer ${coderToken}`)
      .send({
        data: [{
          kode_icd10: 'O80',
          kelompok_umur_id: 18,
          kasus_baru_l: 5,        // LAKI-LAKI dengan kode kehamilan → HARUS DITOLAK
          kasus_baru_p: 0,
          mati_l: 0, mati_p: 0,
          total_hari_rawat: 25
        }]
      });

    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('ICD10_GENDER_RESTRICTION');
  });

  it('201: data valid dengan warning umur unusual', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/v1/rl4/morbiditas-ri/${testPeriodeId}/bulk`)
      .set('Authorization', `Bearer ${coderToken}`)
      .send({
        data: [{
          kode_icd10: 'I10',
          kelompok_umur_id: 18,
          kasus_baru_l: 25, kasus_baru_p: 32,
          mati_l: 0, mati_p: 1,
          total_hari_rawat: 228
        }]
      });

    expect(res.status).toBe(201);
    expect(res.body.data.inserted).toBe(1);
  });
});
```

---

## 3. E2E Tests — Skenario Kritis

Menggunakan **Playwright** (jika ada waktu) atau **Supertest E2E** untuk skenario end-to-end.

### Skenario 1: Siklus Pelaporan Bulanan Penuh

```
1. PIC IRNA input sensus harian 30 hari
2. Sistem auto-generate RL 3.1
3. PIC IRNA submit RL 3.1 + RL 3.2
4. Validator review & approve
5. Approver final approve
6. Sistem enqueue submit ke SIRS Online (dengan mock SIRS Online)
7. Mock SIRS Online return 200 OK
8. Status berubah ke 'sent'
9. Email notifikasi dikirim (mock SMTP)
10. Audit log lengkap tercatat
```

### Skenario 2: Penolakan & Koreksi

```
1. PIC input data dengan BOR 125% (tidak realistis)
2. Validator reject dengan catatan
3. PIC menerima notifikasi
4. PIC koreksi data
5. PIC re-submit
6. Validator approve
```

### Skenario 3: Deadline Auto-Submit

```
1. Semua laporan status 'approved'
2. Trigger cron job auto-submit (manual via admin panel)
3. Semua laporan di-queue
4. Worker memproses dan kirim ke Kemenkes
5. Status berubah ke 'sent'
6. Direksi menerima summary email
```

---

## 4. Konfigurasi Jest

### Root jest.config.ts

```typescript
// apps/api/jest.config.ts
export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.module.ts',
    '!**/dto/**',
    '!**/main.ts',
  ],
  coverageDirectory: '../coverage',
  coverageThresholds: {
    global: {
      branches:   80,
      functions:  80,
      lines:      80,
      statements: 80,
    },
    // Domain logic harus lebih tinggi
    './modules/rl3/sensus-harian/**': { lines: 95 },
    './validation/**':                { lines: 95 },
    '../../packages/sirs-calculator/**': { lines: 100 },
    '../../packages/icd10-validator/**': { lines: 100 },
  },
  testEnvironment: 'node',
};
```

---

## 5. Test Database Setup

```yaml
# docker-compose.test.yml — database terpisah untuk test
services:
  postgres_test:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB:       sirs_test
      POSTGRES_USER:     sirs_test_user
      POSTGRES_PASSWORD: sirs_test_pass
    ports:
      - "5433:5432"   # Port berbeda dari dev
    tmpfs:
      - /var/lib/postgresql/data  # In-memory, reset otomatis
```

```bash
# Jalankan test dengan DB test
DATABASE_URL=postgresql://sirs_test_user:sirs_test_pass@localhost:5433/sirs_test \
  pnpm test
```

---

## 6. CI Test Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB:       sirs_test
          POSTGRES_USER:     sirs_test
          POSTGRES_PASSWORD: sirs_test
        ports: ["5433:5432"]
        options: --health-cmd pg_isready --health-interval 10s
      redis:
        image: redis:7-alpine
        ports: ["6379:6379"]

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'pnpm' }

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma Client
        run: pnpm db:generate

      - name: Run DB migrations
        run: pnpm db:migrate
        env:
          DATABASE_URL: postgresql://sirs_test:sirs_test@localhost:5433/sirs_test

      - name: Run unit tests
        run: pnpm test --filter=sirs-calculator --filter=icd10-validator

      - name: Run API tests with coverage
        run: pnpm test:cov
        env:
          DATABASE_URL: postgresql://sirs_test:sirs_test@localhost:5433/sirs_test
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-secret-key

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: apps/api/coverage/lcov.info
```
