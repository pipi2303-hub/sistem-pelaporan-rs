import { z } from 'zod'

// ─── Auth ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  password: z.string().min(4, 'Password minimal 4 karakter'),
})

export const changePasswordSchema = z
  .object({
    passwordLama: z.string().min(4),
    passwordBaru: z.string().min(8, 'Password baru minimal 8 karakter'),
    konfirmasi: z.string(),
  })
  .refine((d) => d.passwordBaru === d.konfirmasi, {
    message: 'Konfirmasi password tidak cocok',
    path: ['konfirmasi'],
  })

// ─── RL 1 ────────────────────────────────────────────────────────────────────

export const profilRSSchema = z.object({
  namaRS: z.string().min(3, 'Nama RS wajib diisi'),
  kodeRS: z.string().regex(/^[0-9]{7}$/, 'Kode RS harus 7 digit angka'),
  jenisRS: z.string().min(1, 'Jenis RS wajib dipilih'),
  kelasRS: z.enum(['A', 'B', 'C', 'D', 'Khusus']),
  kepemilikan: z.string().min(1),
  direktur: z.string().min(3),
  alamat: z.string().min(10),
  telepon: z.string().regex(/^[0-9\-+() ]{7,20}$/),
  email: z.string().email('Format email tidak valid'),
  website: z.string().url('Format URL tidak valid').or(z.literal('')).optional(),
  statusAkreditasi: z.enum(['Paripurna', 'Utama', 'Madya', 'Dasar', 'Perdana', 'Belum']),
})

export const ttHarianRowSchema = z.object({
  kelasTTId: z.string(),
  tersedia: z.number().int().min(0),
  terisi: z.number().int().min(0),
  rusak: z.number().int().min(0),
}).refine((d) => d.terisi + d.rusak <= d.tersedia, {
  message: 'Terisi + Rusak tidak boleh melebihi Tersedia',
  path: ['terisi'],
})

// ─── RL 2 ────────────────────────────────────────────────────────────────────

export const ketenagaanRowSchema = z.object({
  jenisNakesId: z.string(),
  s3: z.number().int().min(0).default(0),
  s2sp: z.number().int().min(0).default(0),
  s1d4: z.number().int().min(0).default(0),
  d3: z.number().int().min(0).default(0),
  d1d2: z.number().int().min(0).default(0),
  smaKebawah: z.number().int().min(0).default(0),
  laki: z.number().int().min(0).default(0),
  perempuan: z.number().int().min(0).default(0),
})

// ─── RL 3 Sensus Harian ──────────────────────────────────────────────────────

export const sensusRowSchema = z.object({
  kelasTTId: z.string(),
  awal: z.number().int().min(0),
  masukBaru: z.number().int().min(0),
  masukPindahan: z.number().int().min(0),
  keluarHidup: z.number().int().min(0),
  matiLt48: z.number().int().min(0),
  matiGte48: z.number().int().min(0),
  dipindahkan: z.number().int().min(0),
  hariPerawatan: z.number().int().min(0),
}).superRefine((d, ctx) => {
  const akhir = d.awal + d.masukBaru + d.masukPindahan
    - d.keluarHidup - d.matiLt48 - d.matiGte48 - d.dipindahkan
  if (akhir < 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Pasien Akhir negatif (${akhir}): periksa data masuk/keluar`,
      path: ['keluarHidup'],
    })
  }
})

// ─── RL 3.3 Rawat Jalan ──────────────────────────────────────────────────────

export const rawatJalanRowSchema = z.object({
  poliklinikId: z.string(),
  baru: z.number().int().min(0).default(0),
  lama: z.number().int().min(0).default(0),
  bpjs: z.number().int().min(0).default(0),
  umum: z.number().int().min(0).default(0),
  jaminanLain: z.number().int().min(0).default(0),
})

// ─── RL 4 Morbiditas RI ──────────────────────────────────────────────────────

export const morbiditasRIRowSchema = z.object({
  kodeICD10: z.string().regex(/^[A-Z][0-9]{2}(\.[0-9]{1,4})?$/, 'Format ICD-10 tidak valid'),
  diagnosis: z.string().min(3),
  kelompokUmurId: z.string(),
  lakiLaki: z.number().int().min(0).default(0),
  perempuan: z.number().int().min(0).default(0),
  mati: z.number().int().min(0).default(0),
  hariRawat: z.number().int().min(0).default(0),
}).refine(
  (d) => d.mati <= d.lakiLaki + d.perempuan,
  { message: 'Jumlah mati tidak boleh melebihi total pasien', path: ['mati'] }
)

// ─── RL 5 Morbiditas RJ ──────────────────────────────────────────────────────

export const morbiditasRJRowSchema = z.object({
  kodeICD10: z.string().regex(/^[A-Z][0-9]{2}(\.[0-9]{1,4})?$/, 'Format ICD-10 tidak valid'),
  diagnosis: z.string().min(3),
  kelompokUmurId: z.string(),
  lakiLakiBaru: z.number().int().min(0).default(0),
  lakiLakiLama: z.number().int().min(0).default(0),
  perempuanBaru: z.number().int().min(0).default(0),
  perempuanLama: z.number().int().min(0).default(0),
})

// ─── RL 3.7 Neonatal ─────────────────────────────────────────────────────────

export const neonatalRowSchema = z.object({
  jenisKasus: z.string(),
  lahirHidup: z.number().int().min(0).default(0),
  lahirMati: z.number().int().min(0).default(0),
  matiNeonatal: z.number().int().min(0).default(0),
  beratLahirKurang: z.number().int().min(0).default(0),
})

// ─── Workflow ─────────────────────────────────────────────────────────────────

export const rejectSchema = z.object({
  catatan: z.string().min(10, 'Catatan penolakan minimal 10 karakter'),
})

// ─── Type exports ─────────────────────────────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>
export type ProfilRSInput = z.infer<typeof profilRSSchema>
export type TTHarianRow = z.infer<typeof ttHarianRowSchema>
export type KetenagaanRow = z.infer<typeof ketenagaanRowSchema>
export type SensusRow = z.infer<typeof sensusRowSchema>
export type RawatJalanRow = z.infer<typeof rawatJalanRowSchema>
export type MorbiditasRIRow = z.infer<typeof morbiditasRIRowSchema>
export type MorbiditasRJRow = z.infer<typeof morbiditasRJRowSchema>
export type NeonatalRow = z.infer<typeof neonatalRowSchema>
export type RejectInput = z.infer<typeof rejectSchema>
