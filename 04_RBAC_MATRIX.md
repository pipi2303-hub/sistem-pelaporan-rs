# 04 — RBAC Matrix (Role-Based Access Control)

**8 Role | Per-Modul Permissions**

---

## Definisi Role

| Role Code | Nama | Deskripsi Singkat |
|---|---|---|
| `SUPERADMIN` | Super Administrator | Akses penuh, termasuk konfigurasi sistem |
| `ADMIN` | Administrator | Kelola user, master data, scheduler |
| `PIC_UNIT` | PIC Unit Pelaporan | Input data formulir RL per unit kerja |
| `VALIDATOR` | Validator | Review & validasi laporan sebelum approve |
| `APPROVER` | Approver | Persetujuan akhir sebelum kirim ke Kemenkes |
| `CODER` | Coder ICD-10 | Input & review kode diagnosis RL 4 & RL 5 |
| `VIEWER_MNJMN` | Viewer Manajemen | Read-only: dashboard & laporan |
| `INTEGRATOR` | Integrator Sistem | Kelola koneksi ke SIMRS & Kemenkes |

---

## Matrix Permissions per Modul

Legend: `R`=Read, `W`=Write/Update, `D`=Delete, `S`=Submit, `A`=Approve, `X`=Export, `—`=Tidak ada akses

| Modul / Aksi | SUPERADMIN | ADMIN | PIC_UNIT | VALIDATOR | APPROVER | CODER | VIEWER_MNJMN | INTEGRATOR |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **AUTH** | | | | | | | | |
| Login / Logout | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ganti Password | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **MASTER DATA** | | | | | | | | |
| master:read | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| master:write | ✓ | ✓ | — | — | — | — | — | — |
| **RL 1 — Identitas RS** | | | | | | | | |
| rl1:read | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| rl1:write | ✓ | ✓ | ✓¹ | — | — | — | — | — |
| rl1:submit | ✓ | ✓ | ✓¹ | — | — | — | — | — |
| rl1:approve | ✓ | — | — | ✓ | ✓ | — | — | — |
| rl1:export | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | — |
| **RL 1.3 — Tempat Tidur Harian** | | | | | | | | |
| tt_harian:read | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| tt_harian:write | ✓ | ✓ | ✓ | — | — | — | — | — |
| **RL 2 — Ketenagaan** | | | | | | | | |
| rl2:read | ✓ | ✓ | ✓² | ✓ | ✓ | — | ✓ | ✓ |
| rl2:write | ✓ | ✓ | ✓² | — | — | — | — | — |
| rl2:submit | ✓ | ✓ | ✓² | — | — | — | — | — |
| rl2:approve | ✓ | — | — | ✓ | ✓ | — | — | — |
| rl2:export | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | — |
| **RL 3.1–3.5 — Rawat Inap & Kunjungan** | | | | | | | | |
| rl3_irna:read | ✓ | ✓ | ✓³ | ✓ | ✓ | — | ✓ | ✓ |
| rl3_irna:write | ✓ | ✓ | ✓³ | — | — | — | — | — |
| rl3_irna:submit | ✓ | ✓ | ✓³ | — | — | — | — | — |
| rl3_irna:approve | ✓ | — | — | ✓ | ✓ | — | — | — |
| rl3_igd:read | ✓ | ✓ | ✓⁴ | ✓ | ✓ | — | ✓ | ✓ |
| rl3_igd:write | ✓ | ✓ | ✓⁴ | — | — | — | — | — |
| rl3_rj:read | ✓ | ✓ | ✓⁵ | ✓ | ✓ | — | ✓ | ✓ |
| rl3_rj:write | ✓ | ✓ | ✓⁵ | — | — | — | — | — |
| **RL 3.6–3.7 — Kebidanan & Neonatal** | | | | | | | | |
| rl3_kia:read | ✓ | ✓ | ✓⁶ | ✓ | ✓ | — | ✓ | ✓ |
| rl3_kia:write | ✓ | ✓ | ✓⁶ | — | — | — | — | — |
| **RL 3.8–3.10 — Lab, Radiologi, Rujukan** | | | | | | | | |
| rl3_lab:read | ✓ | ✓ | ✓⁷ | ✓ | ✓ | — | ✓ | ✓ |
| rl3_lab:write | ✓ | ✓ | ✓⁷ | — | — | — | — | — |
| rl3_rad:read | ✓ | ✓ | ✓⁸ | ✓ | ✓ | — | ✓ | ✓ |
| rl3_rad:write | ✓ | ✓ | ✓⁸ | — | — | — | — | — |
| rl3_rujukan:read | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| rl3_rujukan:write | ✓ | ✓ | ✓ | — | — | — | — | — |
| **RL 3.11–3.19 — Layanan Khusus & Farmasi** | | | | | | | | |
| rl3_farmasi:read | ✓ | ✓ | ✓⁹ | ✓ | ✓ | — | ✓ | ✓ |
| rl3_farmasi:write | ✓ | ✓ | ✓⁹ | — | — | — | — | — |
| rl3_layanan_khusus:read | ✓ | ✓ | ✓¹⁰| ✓ | ✓ | — | ✓ | ✓ |
| rl3_layanan_khusus:write | ✓ | ✓ | ✓¹⁰| — | — | — | — | — |
| **RL 4 & RL 5 — Morbiditas ICD-10** | | | | | | | | |
| rl4:read | ✓ | ✓ | ✓¹¹| ✓ | ✓ | ✓ | ✓ | ✓ |
| rl4:write | ✓ | ✓ | ✓¹¹| — | — | ✓ | — | — |
| rl4:submit | ✓ | ✓ | — | — | — | ✓ | — | — |
| rl4:approve | ✓ | — | — | ✓ | ✓ | — | — | — |
| rl5:read | ✓ | ✓ | ✓¹¹| ✓ | ✓ | ✓ | ✓ | ✓ |
| rl5:write | ✓ | ✓ | ✓¹¹| — | — | ✓ | — | — |
| rl5:submit | ✓ | ✓ | — | — | — | ✓ | — | — |
| **DASHBOARD** | | | | | | | | |
| dashboard:read | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| dashboard:export | ✓ | ✓ | — | ✓ | ✓ | — | ✓ | — |
| **WORKFLOW** | | | | | | | | |
| workflow:submit | ✓ | ✓ | ✓ | — | — | ✓¹²| — | — |
| workflow:validate | ✓ | — | — | ✓ | — | — | — | — |
| workflow:approve | ✓ | — | — | — | ✓ | — | — | — |
| workflow:reject | ✓ | — | — | ✓ | ✓ | — | — | — |
| workflow:history | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **INTEGRASI KEMENKES** | | | | | | | | |
| integrasi:read | ✓ | ✓ | — | — | — | — | — | ✓ |
| integrasi:submit_kemenkes | ✓ | — | — | — | ✓¹³| — | — | ✓ |
| integrasi:sync_aspak | ✓ | — | — | — | — | — | — | ✓ |
| integrasi:sync_sisdmk | ✓ | — | — | — | — | — | — | ✓ |
| integrasi:test_koneksi | ✓ | ✓ | — | — | — | — | — | ✓ |
| **ADMIN** | | | | | | | | |
| admin:users_read | ✓ | ✓ | — | — | — | — | — | — |
| admin:users_write | ✓ | ✓ | — | — | — | — | — | — |
| admin:audit_log | ✓ | ✓ | — | — | — | — | — | — |
| admin:scheduler | ✓ | ✓ | — | — | — | — | — | — |
| admin:master_refresh | ✓ | ✓ | — | — | — | — | — | — |
| admin:system_health | ✓ | ✓ | — | — | — | — | — | ✓ |

---

## Catatan Pembatasan Unit (Unit-Scoped Access)

PIC_UNIT memiliki akses write **hanya ke modul yang sesuai unit kerjanya**. Pembatasan ini dikonfigurasi per user saat pembuatan akun:

| Catatan | Unit Kerja | Modul yang Bisa Diakses |
|---|---|---|
| ¹ | Manajemen RS | RL 1 (Identitas, TT, Peralatan) |
| ² | SDM/Kepegawaian | RL 2 (Ketenagaan) |
| ³ | Rawat Inap (IRNA) | RL 3.1, RL 3.2, Sensus Harian |
| ⁴ | IGD | RL 3.4 (Kunjungan IGD) |
| ⁵ | Rawat Jalan | RL 3.3 (Kunjungan Rawat Jalan) |
| ⁶ | KIA / Kebidanan | RL 3.6, RL 3.7 (Kebidanan & Neonatal) |
| ⁷ | Laboratorium | RL 3.8 (Laboratorium) |
| ⁸ | Radiologi | RL 3.9 (Radiologi) |
| ⁹ | Farmasi | RL 3.16, 3.17, 3.18, 3.19 |
| ¹⁰ | Unit terkait | RL 3.11–3.15 (Layanan Khusus) |
| ¹¹ | Rekam Medis | Akses baca RL 4 & RL 5 |
| ¹² | Coder ICD-10 | Submit RL 4 & RL 5 |
| ¹³ | Approver | Submit ke Kemenkes setelah approve |

---

## Implementasi di NestJS

### Guard & Decorator

```typescript
// Contoh penggunaan di controller NestJS
@Controller('rl3/rawat-inap')
@UseGuards(JwtAuthGuard, RbacGuard)
export class RL32Controller {

  @Get(':periode_id')
  @RequirePermission('rl3_irna:read')
  findByPeriode(@Param('periode_id') periodeId: string) { ... }

  @Post(':periode_id/bulk')
  @RequirePermission('rl3_irna:write')
  @RequireUnitScope('IRNA')          // tambahan: validasi unit kerja user
  bulkInsert(@Body() dto: BulkRL32Dto) { ... }

  @Post(':periode_id/submit')
  @RequirePermission('workflow:submit')
  submitLaporan(...) { ... }
}
```

### Prisma Row-Level Filtering

```typescript
// Untuk PIC_UNIT: filter data hanya untuk unit mereka
async findSensusHarian(userId: string, options: QueryOptions) {
  const user = await this.userService.findWithRoles(userId);
  const unitScope = user.unitKerja;

  return this.prisma.rl3SensusHarian.findMany({
    where: {
      // Jika SUPERADMIN/VALIDATOR/APPROVER: tidak ada filter unit
      // Jika PIC_UNIT: filter berdasarkan jenis_pelayanan yang sesuai unit
      ...(user.isPicUnit ? { jenisPelayanan: { unitKerja: unitScope } } : {})
    }
  });
}
```

---

## Workflow State Machine

```
            [PIC_UNIT / CODER]
                    │
                    ▼ POST /workflow/submit
            ┌───────────────┐
            │     DRAFT      │ ◄──────────────────────────────┐
            └───────────────┘                                  │
                    │                                          │ reject
                    ▼                                          │
            ┌───────────────┐                      [VALIDATOR / APPROVER]
            │  SUBMITTED    │                                  │
            └───────────────┘                                  │
                    │                                          │
                    ▼ POST /workflow/validate (approve)        │
            ┌───────────────┐                                  │
            │   VALIDATED   │ ─────────────────────────────────┘
            └───────────────┘
                    │
                    ▼ POST /workflow/approve
            ┌───────────────┐
            │   APPROVED    │
            └───────────────┘
                    │
                    ▼ POST /integrasi/submit-sirs-online
            ┌───────────────┐
            │     SENT      │
            └───────────────┘
                    │
                    ▼ (webhook dari Kemenkes)
            ┌───────────────┐
            │ ACKNOWLEDGED  │
            └───────────────┘
```
