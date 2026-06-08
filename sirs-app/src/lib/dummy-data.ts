// ============================================================
// SIRS 6.3 — Dummy / Mock Data
// ============================================================

// --- Indikator per Bulan (12 bulan terakhir) ---
export const indikatorBulanan = [
  { bulan: 'Jun 25', bor: 68.2, alos: 4.1, bto: 4.8, toi: 2.5, ndr: 9.1, gdr: 19.2 },
  { bulan: 'Jul 25', bor: 70.1, alos: 4.3, bto: 4.9, toi: 2.4, ndr: 8.9, gdr: 18.8 },
  { bulan: 'Agt 25', bor: 71.5, alos: 4.0, bto: 5.0, toi: 2.3, ndr: 8.6, gdr: 18.5 },
  { bulan: 'Sep 25', bor: 73.4, alos: 4.2, bto: 5.2, toi: 2.2, ndr: 8.8, gdr: 18.9 },
  { bulan: 'Okt 25', bor: 75.0, alos: 4.4, bto: 5.1, toi: 2.1, ndr: 9.0, gdr: 19.1 },
  { bulan: 'Nov 25', bor: 76.8, alos: 4.5, bto: 5.3, toi: 2.0, ndr: 9.2, gdr: 19.4 },
  { bulan: 'Des 25', bor: 74.2, alos: 4.3, bto: 5.1, toi: 2.2, ndr: 8.7, gdr: 18.6 },
  { bulan: 'Jan 26', bor: 71.8, alos: 4.1, bto: 4.9, toi: 2.4, ndr: 8.5, gdr: 18.2 },
  { bulan: 'Feb 26', bor: 70.5, alos: 4.0, bto: 4.8, toi: 2.5, ndr: 8.3, gdr: 17.9 },
  { bulan: 'Mar 26', bor: 72.1, alos: 4.2, bto: 5.0, toi: 2.3, ndr: 8.6, gdr: 18.3 },
  { bulan: 'Apr 26', bor: 73.8, alos: 4.3, bto: 5.1, toi: 2.2, ndr: 8.8, gdr: 18.5 },
  { bulan: 'Mei 26', bor: 72.5, alos: 4.2, bto: 5.1, toi: 2.3, ndr: 8.7, gdr: 18.3 },
]

// --- BOR per Kelas TT per bulan ---
export const borPerKelas = [
  { bulan: 'Jun 25', ICU: 88.5, 'Kelas I': 70.2, 'Kelas II': 65.8, 'Kelas III': 72.1 },
  { bulan: 'Jul 25', ICU: 90.1, 'Kelas I': 71.5, 'Kelas II': 67.3, 'Kelas III': 73.5 },
  { bulan: 'Agt 25', ICU: 87.3, 'Kelas I': 72.8, 'Kelas II': 68.9, 'Kelas III': 74.2 },
  { bulan: 'Sep 25', ICU: 91.2, 'Kelas I': 74.1, 'Kelas II': 70.4, 'Kelas III': 75.8 },
  { bulan: 'Okt 25', ICU: 92.4, 'Kelas I': 75.6, 'Kelas II': 71.8, 'Kelas III': 76.9 },
  { bulan: 'Nov 25', ICU: 93.8, 'Kelas I': 77.2, 'Kelas II': 73.5, 'Kelas III': 78.3 },
  { bulan: 'Des 25', ICU: 89.5, 'Kelas I': 75.8, 'Kelas II': 71.2, 'Kelas III': 76.5 },
  { bulan: 'Jan 26', ICU: 86.7, 'Kelas I': 73.4, 'Kelas II': 68.7, 'Kelas III': 74.1 },
  { bulan: 'Feb 26', ICU: 85.2, 'Kelas I': 72.1, 'Kelas II': 67.5, 'Kelas III': 72.8 },
  { bulan: 'Mar 26', ICU: 87.9, 'Kelas I': 73.8, 'Kelas II': 69.3, 'Kelas III': 74.5 },
  { bulan: 'Apr 26', ICU: 90.3, 'Kelas I': 75.2, 'Kelas II': 70.8, 'Kelas III': 75.9 },
  { bulan: 'Mei 26', ICU: 91.5, 'Kelas I': 74.6, 'Kelas II': 69.9, 'Kelas III': 75.2 },
]

// --- Cara Bayar Pasien ---
export const caraBayar = [
  { name: 'JKN / BPJS', value: 65, color: '#1d4ed8' },
  { name: 'Mandiri / Umum', value: 20, color: '#0891b2' },
  { name: 'Jamkesda', value: 10, color: '#7c3aed' },
  { name: 'Asuransi Lain', value: 3, color: '#059669' },
  { name: 'Lainnya', value: 2, color: '#94a3b8' },
]

// --- 10 Besar Penyakit Rawat Inap ---
export const sepuluhBesarPenyakit = [
  { rank: 1, kode: 'I10', diagnosis: 'Hipertensi Esensial', jumlah: 248, mati: 3 },
  { rank: 2, kode: 'J18.9', diagnosis: 'Pneumonia, tidak spesifik', jumlah: 187, mati: 12 },
  { rank: 3, kode: 'I21.9', diagnosis: 'Infark Miokard Akut, tidak spesifik', jumlah: 142, mati: 18 },
  { rank: 4, kode: 'E11.9', diagnosis: 'Diabetes Mellitus Tipe 2 tanpa komplikasi', jumlah: 138, mati: 5 },
  { rank: 5, kode: 'N18.9', diagnosis: 'Penyakit Ginjal Kronis, tidak spesifik', jumlah: 121, mati: 9 },
  { rank: 6, kode: 'K35.9', diagnosis: 'Appendisitis Akut', jumlah: 98, mati: 1 },
  { rank: 7, kode: 'A09', diagnosis: 'Diare dan Gastroenteritis', jumlah: 92, mati: 2 },
  { rank: 8, kode: 'J44.1', diagnosis: 'PPOK dengan eksaserbasi akut', jumlah: 87, mati: 7 },
  { rank: 9, kode: 'I63.9', diagnosis: 'Stroke Iskemik, tidak spesifik', jumlah: 82, mati: 14 },
  { rank: 10, kode: 'S72.0', diagnosis: 'Fraktur Kolum Femur', jumlah: 74, mati: 2 },
]

// --- Ketersediaan Tempat Tidur ---
export const ketersediaanTT = [
  { kelas: 'ICU', tersedia: 20, terisi: 18, kosong: 1, rusak: 1 },
  { kelas: 'NICU', tersedia: 10, terisi: 8, kosong: 1, rusak: 1 },
  { kelas: 'HCU', tersedia: 15, terisi: 11, kosong: 3, rusak: 1 },
  { kelas: 'VVIP', tersedia: 8, terisi: 5, kosong: 3, rusak: 0 },
  { kelas: 'VIP', tersedia: 30, terisi: 22, kosong: 7, rusak: 1 },
  { kelas: 'Kelas I', tersedia: 60, terisi: 44, kosong: 14, rusak: 2 },
  { kelas: 'Kelas II', tersedia: 80, terisi: 57, kosong: 20, rusak: 3 },
  { kelas: 'Kelas III', tersedia: 150, terisi: 112, kosong: 33, rusak: 5 },
]

// --- Tempat Tidur Per Kelas (Detail RL 1.3) ---
export const kelasTT = [
  { id: 1, kelas: 'VVIP', tersedia: 8, terisi: 5, rusak: 0 },
  { id: 2, kelas: 'VIP', tersedia: 30, terisi: 22, rusak: 1 },
  { id: 3, kelas: 'Kelas I (Utama)', tersedia: 25, terisi: 18, rusak: 1 },
  { id: 4, kelas: 'Kelas I', tersedia: 35, terisi: 26, rusak: 1 },
  { id: 5, kelas: 'Kelas II', tersedia: 80, terisi: 57, rusak: 3 },
  { id: 6, kelas: 'Kelas III', tersedia: 150, terisi: 112, rusak: 5 },
  { id: 7, kelas: 'ICU', tersedia: 20, terisi: 18, rusak: 1 },
  { id: 8, kelas: 'ICU + Ventilator', tersedia: 8, terisi: 7, rusak: 0 },
  { id: 9, kelas: 'ICCU', tersedia: 12, terisi: 10, rusak: 1 },
  { id: 10, kelas: 'NICU', tersedia: 10, terisi: 8, rusak: 1 },
  { id: 11, kelas: 'PICU', tersedia: 8, terisi: 6, rusak: 0 },
  { id: 12, kelas: 'HCU', tersedia: 15, terisi: 11, rusak: 1 },
  { id: 13, kelas: 'Isolasi Tekanan Negatif', tersedia: 6, terisi: 4, rusak: 0 },
  { id: 14, kelas: 'Perinatologi', tersedia: 20, terisi: 14, rusak: 1 },
  { id: 15, kelas: 'Luka Bakar', tersedia: 5, terisi: 3, rusak: 0 },
  { id: 16, kelas: 'Stroke Unit', tersedia: 10, terisi: 8, rusak: 0 },
  { id: 17, kelas: 'Rawat Gabung', tersedia: 18, terisi: 12, rusak: 1 },
  { id: 18, kelas: 'Kamar Tindakan Bedah', tersedia: 8, terisi: 6, rusak: 0 },
  { id: 19, kelas: 'Intermediate', tersedia: 12, terisi: 9, rusak: 0 },
  { id: 20, kelas: 'Lainnya', tersedia: 10, terisi: 7, rusak: 0 },
]

// --- Sensus Harian (30 hari) ---
export type SensusHarian = {
  tanggal: string
  status: 'selesai' | 'error' | 'belum'
  data: {
    [kelas: string]: {
      awal: number
      masukBaru: number
      masukPindahan: number
      keluarHidup: number
      matiKurang48: number
      matiLebih48: number
      dipindahkan: number
      hp: number
    }
  }
}

const buatSensusHarian = (): SensusHarian[] => {
  const tanggalList: SensusHarian[] = []
  const kelas = ['Penyakit Dalam', 'Bedah', 'Obsgin', 'Anak', 'ICU', 'Umum']

  for (let i = 1; i <= 31; i++) {
    const tgl = `2026-05-${String(i).padStart(2, '0')}`
    const hari = new Date(2026, 4, i)
    if (hari > new Date()) continue

    const status: 'selesai' | 'error' | 'belum' =
      i <= 17 ? 'selesai' : i === 18 ? 'error' : 'belum'

    const data: SensusHarian['data'] = {}
    kelas.forEach(k => {
      const awal = Math.floor(Math.random() * 30) + 20
      const masukBaru = Math.floor(Math.random() * 8) + 2
      const masukPindahan = Math.floor(Math.random() * 3)
      const keluarHidup = Math.floor(Math.random() * 7) + 1
      const matiKurang48 = Math.random() > 0.85 ? 1 : 0
      const matiLebih48 = Math.random() > 0.9 ? 1 : 0
      const dipindahkan = Math.floor(Math.random() * 2)
      const hp = Math.floor(Math.random() * 200) + 50
      data[k] = { awal, masukBaru, masukPindahan, keluarHidup, matiKurang48, matiLebih48, dipindahkan, hp }
    })

    tanggalList.push({ tanggal: tgl, status, data })
  }
  return tanggalList
}

export const sensusHarianData = buatSensusHarian()

// --- Indikator per Kelas TT (RL 3.1) ---
export const indikatorPerKelas = [
  { kelas: 'Penyakit Dalam', ttTersedia: 60, hariPerawatan: 1640, bor: 78.3, alos: 4.8, bto: 5.1, toi: 1.9, ndr: 9.2, gdr: 20.1 },
  { kelas: 'Bedah', ttTersedia: 50, hariPerawatan: 1320, bor: 75.4, alos: 5.2, bto: 4.8, toi: 2.1, ndr: 7.8, gdr: 16.4 },
  { kelas: 'Obstetri & Ginekologi', ttTersedia: 40, hariPerawatan: 1050, bor: 75.0, alos: 3.1, bto: 7.2, toi: 1.5, ndr: 4.2, gdr: 9.8 },
  { kelas: 'Anak', ttTersedia: 35, hariPerawatan: 840, bor: 68.6, alos: 3.8, bto: 5.4, toi: 2.3, ndr: 6.5, gdr: 14.2 },
  { kelas: 'ICU', ttTersedia: 20, hariPerawatan: 549, bor: 91.5, alos: 6.2, bto: 4.4, toi: 0.7, ndr: 42.5, gdr: 85.2 },
  { kelas: 'ICCU', ttTersedia: 12, hariPerawatan: 298, bor: 88.7, alos: 5.8, bto: 4.6, toi: 0.9, ndr: 35.8, gdr: 72.4 },
  { kelas: 'NICU', ttTersedia: 10, hariPerawatan: 248, bor: 83.4, alos: 8.1, bto: 3.1, toi: 1.8, ndr: 28.4, gdr: 62.1 },
  { kelas: 'VIP / Kelas I', ttTersedia: 65, hariPerawatan: 1580, bor: 69.2, alos: 4.1, bto: 5.0, toi: 2.4, ndr: 7.2, gdr: 15.8 },
  { kelas: 'Kelas II', ttTersedia: 80, hariPerawatan: 1920, bor: 68.1, alos: 4.0, bto: 5.1, toi: 2.5, ndr: 7.5, gdr: 16.2 },
  { kelas: 'Kelas III', ttTersedia: 150, hariPerawatan: 3480, bor: 66.0, alos: 3.8, bto: 5.2, toi: 2.8, ndr: 8.1, gdr: 17.4 },
  // Footer / Total
  { kelas: 'TOTAL', ttTersedia: 522, hariPerawatan: 12927, bor: 72.5, alos: 4.2, bto: 5.1, toi: 2.3, ndr: 8.7, gdr: 18.3 },
]

// --- Morbiditas Rawat Inap (RL 4.1) ---
export type MorbiditasRI = {
  id: number
  kode: string
  diagnosis: string
  kelUmur: string
  lBaru: number
  pBaru: number
  lMati: number
  pMati: number
  hariRawat: number
  restriksi?: boolean
}

export const morbiditasRI: MorbiditasRI[] = [
  { id: 1, kode: 'I10', diagnosis: 'Hipertensi Esensial (Primer)', kelUmur: '45-54', lBaru: 82, pBaru: 96, lMati: 1, pMati: 2, hariRawat: 856 },
  { id: 2, kode: 'I10', diagnosis: 'Hipertensi Esensial (Primer)', kelUmur: '55-64', lBaru: 48, pBaru: 62, lMati: 0, pMati: 0, hariRawat: 495 },
  { id: 3, kode: 'J18.9', diagnosis: 'Pneumonia, tidak spesifik', kelUmur: '< 1', lBaru: 28, pBaru: 22, lMati: 3, pMati: 2, hariRawat: 310 },
  { id: 4, kode: 'J18.9', diagnosis: 'Pneumonia, tidak spesifik', kelUmur: '55-64', lBaru: 52, pBaru: 45, lMati: 6, pMati: 4, hariRawat: 582 },
  { id: 5, kode: 'I21.9', diagnosis: 'Infark Miokard Akut, tidak spesifik', kelUmur: '45-54', lBaru: 58, pBaru: 31, lMati: 8, pMati: 4, hariRawat: 620 },
  { id: 6, kode: 'I21.9', diagnosis: 'Infark Miokard Akut, tidak spesifik', kelUmur: '55-64', lBaru: 32, pBaru: 21, lMati: 5, pMati: 1, hariRawat: 384 },
  { id: 7, kode: 'E11.9', diagnosis: 'Diabetes Mellitus Tipe 2', kelUmur: '45-54', lBaru: 44, pBaru: 52, lMati: 1, pMati: 2, hariRawat: 482 },
  { id: 8, kode: 'N18.9', diagnosis: 'Penyakit Ginjal Kronis, tidak spesifik', kelUmur: '45-54', lBaru: 38, pBaru: 42, lMati: 3, pMati: 4, hariRawat: 892 },
  { id: 9, kode: 'K35.9', diagnosis: 'Appendisitis Akut', kelUmur: '15-24', lBaru: 41, pBaru: 38, lMati: 0, pMati: 1, hariRawat: 242 },
  { id: 10, kode: 'A09', diagnosis: 'Diare dan Gastroenteritis', kelUmur: '1-4', lBaru: 45, pBaru: 38, lMati: 1, pMati: 1, hariRawat: 276 },
  { id: 11, kode: 'J44.1', diagnosis: 'PPOK dengan eksaserbasi akut', kelUmur: '55-64', lBaru: 52, pBaru: 22, lMati: 5, pMati: 2, hariRawat: 608 },
  { id: 12, kode: 'I63.9', diagnosis: 'Stroke Iskemik, tidak spesifik', kelUmur: '55-64', lBaru: 38, pBaru: 30, lMati: 8, pMati: 6, hariRawat: 680 },
  { id: 13, kode: 'S72.0', diagnosis: 'Fraktur Kolum Femur', kelUmur: '> 65', lBaru: 22, pBaru: 42, lMati: 1, pMati: 1, hariRawat: 524 },
  { id: 14, kode: 'O80', diagnosis: 'Persalinan Normal', kelUmur: '25-34', lBaru: 0, pBaru: 180, lMati: 0, pMati: 0, hariRawat: 360, restriksi: false },
  { id: 15, kode: 'P07.3', diagnosis: 'Bayi Prematur lain', kelUmur: '< 1', lBaru: 24, pBaru: 18, lMati: 4, pMati: 3, hariRawat: 420 },
  { id: 16, kode: 'C18.9', diagnosis: 'Karsinoma Kolon, tidak spesifik', kelUmur: '45-54', lBaru: 18, pBaru: 14, lMati: 3, pMati: 2, hariRawat: 512, restriksi: true },
  { id: 17, kode: 'K80.2', diagnosis: 'Kolelitiasis dengan Kolesistitis Akut', kelUmur: '35-44', lBaru: 28, pBaru: 42, lMati: 0, pMati: 1, hariRawat: 350 },
]

// --- Data Tenaga Kesehatan (RL 2) ---
export const ketenagaan = [
  { jenis: 'Dokter Spesialis', s3: 2, s2sp: 48, s1d4: 0, d3: 0, d1d2: 0, smaKebawah: 0, total: 50, l: 32, p: 18 },
  { jenis: 'Dokter Umum', s3: 0, s2sp: 0, s1d4: 38, d3: 0, d1d2: 0, smaKebawah: 0, total: 38, l: 20, p: 18 },
  { jenis: 'Dokter Gigi Spesialis', s3: 0, s2sp: 6, s1d4: 0, d3: 0, d1d2: 0, smaKebawah: 0, total: 6, l: 3, p: 3 },
  { jenis: 'Dokter Gigi', s3: 0, s2sp: 0, s1d4: 8, d3: 0, d1d2: 0, smaKebawah: 0, total: 8, l: 2, p: 6 },
  { jenis: 'Perawat (S1/Ners)', s3: 0, s2sp: 2, s1d4: 88, d3: 0, d1d2: 0, smaKebawah: 0, total: 90, l: 28, p: 62 },
  { jenis: 'Perawat (D3)', s3: 0, s2sp: 0, s1d4: 0, d3: 185, d1d2: 0, smaKebawah: 0, total: 185, l: 45, p: 140 },
  { jenis: 'Bidan', s3: 0, s2sp: 0, s1d4: 18, d3: 62, d1d2: 0, smaKebawah: 0, total: 80, l: 0, p: 80 },
  { jenis: 'Apoteker', s3: 0, s2sp: 2, s1d4: 22, d3: 0, d1d2: 0, smaKebawah: 0, total: 24, l: 8, p: 16 },
  { jenis: 'Asisten Apoteker', s3: 0, s2sp: 0, s1d4: 0, d3: 38, d1d2: 0, smaKebawah: 0, total: 38, l: 12, p: 26 },
  { jenis: 'Analis Kesehatan', s3: 0, s2sp: 0, s1d4: 12, d3: 28, d1d2: 0, smaKebawah: 0, total: 40, l: 14, p: 26 },
  { jenis: 'Radiografer', s3: 0, s2sp: 0, s1d4: 8, d3: 14, d1d2: 0, smaKebawah: 0, total: 22, l: 10, p: 12 },
  { jenis: 'Fisioterapis', s3: 0, s2sp: 0, s1d4: 10, d3: 8, d1d2: 0, smaKebawah: 0, total: 18, l: 8, p: 10 },
  { jenis: 'Rekam Medis', s3: 0, s2sp: 0, s1d4: 8, d3: 16, d1d2: 0, smaKebawah: 0, total: 24, l: 6, p: 18 },
  { jenis: 'Tenaga Gizi (Nutrisionis)', s3: 0, s2sp: 0, s1d4: 6, d3: 12, d1d2: 0, smaKebawah: 0, total: 18, l: 4, p: 14 },
  { jenis: 'Sanitarian', s3: 0, s2sp: 0, s1d4: 4, d3: 8, d1d2: 0, smaKebawah: 0, total: 12, l: 6, p: 6 },
  { jenis: 'Tenaga Adm & Manajemen', s3: 0, s2sp: 4, s1d4: 32, d3: 18, d1d2: 8, smaKebawah: 12, total: 74, l: 38, p: 36 },
]

// --- Workflow Status Modul ---
export type WorkflowStatus = 'draft' | 'submitted' | 'validated' | 'approved' | 'sent'

export type WorkflowModule = {
  id: string
  kode: string
  nama: string
  deskripsi: string
  status: WorkflowStatus
  submittedAt?: string
  submittedBy?: string
  validatedAt?: string
  validatedBy?: string
  approvedAt?: string
  approvedBy?: string
  sentAt?: string
  path: string
  wajib: boolean
}

export const workflowModules: WorkflowModule[] = [
  {
    id: 'rl1-profil',
    kode: 'RL 1.1',
    nama: 'Profil Rumah Sakit',
    deskripsi: 'Data identitas dan profil RS',
    status: 'approved',
    submittedAt: '2026-05-05T08:30:00',
    submittedBy: 'dr. Administrator',
    validatedAt: '2026-05-06T10:15:00',
    validatedBy: 'Anita Rahayu, SKM',
    approvedAt: '2026-05-07T09:00:00',
    approvedBy: 'dr. Direktur',
    path: '/rl1/profil',
    wajib: true,
  },
  {
    id: 'rl1-tt',
    kode: 'RL 1.3',
    nama: 'Tempat Tidur',
    deskripsi: 'Data ketersediaan tempat tidur',
    status: 'approved',
    submittedAt: '2026-05-08T09:00:00',
    submittedBy: 'dr. Administrator',
    validatedAt: '2026-05-09T11:00:00',
    validatedBy: 'Anita Rahayu, SKM',
    approvedAt: '2026-05-10T10:00:00',
    approvedBy: 'dr. Direktur',
    path: '/rl1/tempat-tidur',
    wajib: true,
  },
  {
    id: 'rl2',
    kode: 'RL 2',
    nama: 'Data Tenaga Kesehatan',
    deskripsi: 'Data SDM dan tenaga kesehatan',
    status: 'validated',
    submittedAt: '2026-05-10T10:00:00',
    submittedBy: 'dr. Administrator',
    validatedAt: '2026-05-11T14:00:00',
    validatedBy: 'Anita Rahayu, SKM',
    path: '/rl2',
    wajib: true,
  },
  {
    id: 'rl3-sensus',
    kode: 'RL 3 Sensus',
    nama: 'Sensus Harian RI',
    deskripsi: 'Sensus harian rawat inap Mei 2026',
    status: 'submitted',
    submittedAt: '2026-05-18T07:30:00',
    submittedBy: 'dr. Administrator',
    path: '/rl3/sensus-harian',
    wajib: true,
  },
  {
    id: 'rl3-1',
    kode: 'RL 3.1',
    nama: 'Indikator Rawat Inap',
    deskripsi: 'BOR, ALOS, BTO, TOI, NDR, GDR',
    status: 'submitted',
    submittedAt: '2026-05-18T08:00:00',
    submittedBy: 'dr. Administrator',
    path: '/rl3/indikator',
    wajib: true,
  },
  {
    id: 'rl3-2',
    kode: 'RL 3.2',
    nama: 'Rawat Inap (Pasien)',
    deskripsi: 'Data pasien rawat inap per kelas',
    status: 'draft',
    path: '/rl3/rawat-inap',
    wajib: true,
  },
  {
    id: 'rl3-4',
    kode: 'RL 3.4',
    nama: 'IGD',
    deskripsi: 'Data kunjungan IGD',
    status: 'draft',
    path: '/rl3/igd',
    wajib: true,
  },
  {
    id: 'rl3-6',
    kode: 'RL 3.6',
    nama: 'Kebidanan',
    deskripsi: 'Data persalinan dan kebidanan',
    status: 'draft',
    path: '/rl3/kebidanan',
    wajib: true,
  },
  {
    id: 'rl3-8',
    kode: 'RL 3.8',
    nama: 'Laboratorium',
    deskripsi: 'Data pemeriksaan laboratorium',
    status: 'draft',
    path: '/rl3/laboratorium',
    wajib: false,
  },
  {
    id: 'rl3-17',
    kode: 'RL 3.17',
    nama: 'Farmasi',
    deskripsi: 'Data kefarmasian',
    status: 'draft',
    path: '/rl3/farmasi',
    wajib: false,
  },
  {
    id: 'rl4',
    kode: 'RL 4.1',
    nama: 'Morbiditas Rawat Inap',
    deskripsi: '10 besar penyakit rawat inap per ICD-10',
    status: 'draft',
    path: '/rl4',
    wajib: true,
  },
  {
    id: 'rl5',
    kode: 'RL 5.1',
    nama: 'Morbiditas Rawat Jalan',
    deskripsi: '10 besar penyakit rawat jalan per ICD-10',
    status: 'draft',
    path: '/rl5',
    wajib: true,
  },
]

// --- ICD-10 Autocomplete Data ---
export const icd10List = [
  { kode: 'A00', nama: 'Kolera' },
  { kode: 'A09', nama: 'Diare dan gastroenteritis' },
  { kode: 'A15.0', nama: 'Tuberkulosis Paru' },
  { kode: 'A41.9', nama: 'Sepsis, tidak spesifik' },
  { kode: 'B20', nama: 'HIV/AIDS' },
  { kode: 'C18.9', nama: 'Kanker Kolon' },
  { kode: 'C50.9', nama: 'Kanker Payudara' },
  { kode: 'C34.9', nama: 'Kanker Paru' },
  { kode: 'E10.9', nama: 'Diabetes Mellitus Tipe 1' },
  { kode: 'E11.9', nama: 'Diabetes Mellitus Tipe 2' },
  { kode: 'I10', nama: 'Hipertensi Esensial' },
  { kode: 'I21.9', nama: 'Infark Miokard Akut' },
  { kode: 'I25.9', nama: 'Penyakit Jantung Iskemik Kronis' },
  { kode: 'I50.9', nama: 'Gagal Jantung, tidak spesifik' },
  { kode: 'I63.9', nama: 'Stroke Iskemik' },
  { kode: 'J18.9', nama: 'Pneumonia, tidak spesifik' },
  { kode: 'J44.1', nama: 'PPOK dengan eksaserbasi akut' },
  { kode: 'K35.9', nama: 'Appendisitis Akut' },
  { kode: 'K80.2', nama: 'Kolelitiasis' },
  { kode: 'N18.9', nama: 'Penyakit Ginjal Kronis' },
  { kode: 'O80', nama: 'Persalinan Normal' },
  { kode: 'P07.3', nama: 'Bayi Prematur' },
  { kode: 'S72.0', nama: 'Fraktur Kolum Femur' },
]

// --- Kelompok Umur ---
export const kelompokUmur = [
  '< 1 tahun', '1-4 tahun', '5-14 tahun', '15-24 tahun',
  '25-34 tahun', '35-44 tahun', '45-54 tahun', '55-64 tahun',
  '65-74 tahun', '> 75 tahun',
]

// --- Rawat Inap per Jenis Pelayanan (RL 3.2) ---
export const rawatInapPelayanan = [
  // pelayanan | awal | masuk | pindahan | dipindahkan | keluarHidup
  // | matiLLt48 | matiLGe48 | matiPLt48 | matiPGe48
  // | lamaDirawat | akhir | jumlahHariPerawatan
  // | hpVVIP | hpVIP | hpI | hpII | hpIII | hpKhusus | alokasiTT
  { pelayanan: 'Umum',                          awal: 8,  masuk: 22,  pindahan: 3,  dipindahkan: 2,  keluarHidup: 20,  matiLLt48: 0, matiLGe48: 1, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 88,  akhir: 10, jumlahHariPerawatan: 95,  hpVVIP: 5,  hpVIP: 10, hpI: 20, hpII: 35, hpIII: 25, hpKhusus: 0,  alokasiTT: 15  },
  { pelayanan: 'Penyakit Dalam',                awal: 45, masuk: 120, pindahan: 12, dipindahkan: 8,  keluarHidup: 115, matiLLt48: 2, matiLGe48: 3, matiPLt48: 1, matiPGe48: 2, lamaDirawat: 810, akhir: 46, jumlahHariPerawatan: 850, hpVVIP: 20, hpVIP: 45, hpI: 180, hpII: 350, hpIII: 230, hpKhusus: 25, alokasiTT: 55  },
  { pelayanan: 'Kesehatan Anak',                awal: 25, masuk: 80,  pindahan: 5,  dipindahkan: 4,  keluarHidup: 82,  matiLLt48: 1, matiLGe48: 0, matiPLt48: 0, matiPGe48: 1, lamaDirawat: 380, akhir: 22, jumlahHariPerawatan: 410, hpVVIP: 10, hpVIP: 25, hpI: 90, hpII: 180, hpIII: 95, hpKhusus: 10, alokasiTT: 30  },
  { pelayanan: 'Kesehatan Remaja',              awal: 5,  masuk: 18,  pindahan: 1,  dipindahkan: 1,  keluarHidup: 19,  matiLLt48: 0, matiLGe48: 0, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 72,  akhir: 4,  jumlahHariPerawatan: 78,  hpVVIP: 3,  hpVIP: 8,  hpI: 18, hpII: 30, hpIII: 19, hpKhusus: 0,  alokasiTT: 10  },
  { pelayanan: 'Obstetri',                      awal: 18, masuk: 110, pindahan: 2,  dipindahkan: 2,  keluarHidup: 108, matiLLt48: 0, matiLGe48: 0, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 320, akhir: 20, jumlahHariPerawatan: 340, hpVVIP: 15, hpVIP: 30, hpI: 70, hpII: 150, hpIII: 75, hpKhusus: 0,  alokasiTT: 25  },
  { pelayanan: 'Ginekologi',                    awal: 10, masuk: 45,  pindahan: 1,  dipindahkan: 3,  keluarHidup: 42,  matiLLt48: 0, matiLGe48: 0, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 165, akhir: 11, jumlahHariPerawatan: 180, hpVVIP: 8,  hpVIP: 18, hpI: 40, hpII: 75, hpIII: 39, hpKhusus: 0,  alokasiTT: 15  },
  { pelayanan: 'Bedah',                         awal: 30, masuk: 95,  pindahan: 8,  dipindahkan: 12, keluarHidup: 88,  matiLLt48: 1, matiLGe48: 1, matiPLt48: 0, matiPGe48: 1, lamaDirawat: 490, akhir: 30, jumlahHariPerawatan: 520, hpVVIP: 25, hpVIP: 55, hpI: 110, hpII: 210, hpIII: 110, hpKhusus: 10, alokasiTT: 40  },
  { pelayanan: 'Bedah Orthopedi',               awal: 8,  masuk: 30,  pindahan: 2,  dipindahkan: 3,  keluarHidup: 28,  matiLLt48: 0, matiLGe48: 1, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 145, akhir: 8,  jumlahHariPerawatan: 160, hpVVIP: 8,  hpVIP: 20, hpI: 35, hpII: 65, hpIII: 30, hpKhusus: 2,  alokasiTT: 12  },
  { pelayanan: 'Bedah Saraf',                   awal: 12, masuk: 28,  pindahan: 4,  dipindahkan: 2,  keluarHidup: 22,  matiLLt48: 1, matiLGe48: 3, matiPLt48: 1, matiPGe48: 1, lamaDirawat: 270, akhir: 14, jumlahHariPerawatan: 290, hpVVIP: 15, hpVIP: 30, hpI: 60, hpII: 120, hpIII: 60, hpKhusus: 5,  alokasiTT: 18  },
  { pelayanan: 'Luka Bakar',                    awal: 4,  masuk: 12,  pindahan: 1,  dipindahkan: 1,  keluarHidup: 10,  matiLLt48: 1, matiLGe48: 1, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 90,  akhir: 4,  jumlahHariPerawatan: 100, hpVVIP: 0,  hpVIP: 5,  hpI: 15, hpII: 40, hpIII: 30, hpKhusus: 10, alokasiTT: 8   },
  { pelayanan: 'Saraf',                         awal: 20, masuk: 55,  pindahan: 6,  dipindahkan: 5,  keluarHidup: 52,  matiLLt48: 1, matiLGe48: 1, matiPLt48: 0, matiPGe48: 2, lamaDirawat: 395, akhir: 20, jumlahHariPerawatan: 420, hpVVIP: 18, hpVIP: 40, hpI: 90, hpII: 175, hpIII: 90, hpKhusus: 7,  alokasiTT: 25  },
  { pelayanan: 'Jiwa',                          awal: 6,  masuk: 15,  pindahan: 0,  dipindahkan: 1,  keluarHidup: 14,  matiLLt48: 0, matiLGe48: 0, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 180, akhir: 6,  jumlahHariPerawatan: 195, hpVVIP: 0,  hpVIP: 5,  hpI: 25, hpII: 90, hpIII: 75, hpKhusus: 0,  alokasiTT: 10  },
  { pelayanan: 'Psikologi',                     awal: 2,  masuk: 8,   pindahan: 0,  dipindahkan: 0,  keluarHidup: 8,   matiLLt48: 0, matiLGe48: 0, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 48,  akhir: 2,  jumlahHariPerawatan: 52,  hpVVIP: 0,  hpVIP: 4,  hpI: 10, hpII: 25, hpIII: 13, hpKhusus: 0,  alokasiTT: 5   },
  { pelayanan: 'Penatalaksanaan NAPZA',         awal: 3,  masuk: 10,  pindahan: 0,  dipindahkan: 0,  keluarHidup: 10,  matiLLt48: 0, matiLGe48: 0, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 90,  akhir: 3,  jumlahHariPerawatan: 98,  hpVVIP: 0,  hpVIP: 3,  hpI: 15, hpII: 45, hpIII: 35, hpKhusus: 0,  alokasiTT: 8   },
  { pelayanan: 'THT',                           awal: 5,  masuk: 25,  pindahan: 1,  dipindahkan: 2,  keluarHidup: 25,  matiLLt48: 0, matiLGe48: 0, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 75,  akhir: 4,  jumlahHariPerawatan: 82,  hpVVIP: 4,  hpVIP: 10, hpI: 18, hpII: 32, hpIII: 18, hpKhusus: 0,  alokasiTT: 8   },
  { pelayanan: 'Mata',                          awal: 4,  masuk: 20,  pindahan: 0,  dipindahkan: 1,  keluarHidup: 20,  matiLLt48: 0, matiLGe48: 0, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 60,  akhir: 3,  jumlahHariPerawatan: 65,  hpVVIP: 3,  hpVIP: 8,  hpI: 14, hpII: 26, hpIII: 14, hpKhusus: 0,  alokasiTT: 7   },
  { pelayanan: 'Kulit dan Kelamin',             awal: 4,  masuk: 18,  pindahan: 1,  dipindahkan: 1,  keluarHidup: 18,  matiLLt48: 0, matiLGe48: 0, matiPLt48: 0, matiPGe48: 0, lamaDirawat: 65,  akhir: 4,  jumlahHariPerawatan: 70,  hpVVIP: 3,  hpVIP: 7,  hpI: 15, hpII: 28, hpIII: 15, hpKhusus: 2,  alokasiTT: 8   },
]

// --- Kunjungan IGD (RL 3.4) ---
export const dataIGD = {
  totalKunjungan: 1245,
  tindakLanjut: {
    rawatInap: 450,
    rawatJalan: 680,
    dirujuk: 45,
    pulangPaksa: 12,
    matiDiIgd: 38,
    doa: 20
  },
  caraBayar: [
    { label: 'JKN', value: 850 },
    { label: 'Mandiri', value: 245 },
    { label: 'Asuransi Lain', value: 150 }
  ],
  waktuTunggu: 18.5 // menit
}

// --- Kebidanan (RL 3.6) ---
export const dataKebidanan = {
  persalinan: [
    { jenis: 'Persalinan Normal', jumlah: 145, rujukan: 20, nonRujukan: 125, matiIbu: 0 },
    { jenis: 'Persalinan Sungsang / Vakum', jumlah: 24, rujukan: 18, nonRujukan: 6, matiIbu: 0 },
    { jenis: 'Persalinan Sectio Caesarea', jumlah: 82, rujukan: 55, nonRujukan: 27, matiIbu: 1 },
  ],
  komplikasi: [
    { jenis: 'Pendarahan', jumlah: 12 },
    { jenis: 'Pre-eklampsia', jumlah: 18 },
    { jenis: 'Infeksi', jumlah: 4 },
  ]
}

// --- Laboratorium (RL 3.8) ---
export const dataLaboratorium = [
  { jenis: 'Hematologi', ri: 1250, rj: 1800, igd: 950, luar: 120 },
  { jenis: 'Kimia Klinik', ri: 2100, rj: 2450, igd: 1100, luar: 240 },
  { jenis: 'Imunologi', ri: 450, rj: 820, igd: 150, luar: 85 },
  { jenis: 'Mikrobiologi', ri: 180, rj: 120, igd: 40, luar: 15 },
  { jenis: 'Urinalisis', ri: 850, rj: 1100, igd: 600, luar: 90 },
]

// --- Farmasi (RL 3.17) ---
export const dataFarmasi = [
  { kelompok: 'Obat Generik Fornas', resepRi: 1450, resepRj: 3200, resepIgd: 850 },
  { kelompok: 'Obat Generik Non-Fornas', resepRi: 420, resepRj: 1100, resepIgd: 240 },
  { kelompok: 'Obat Non-Generik Fornas', resepRi: 850, resepRj: 1400, resepIgd: 310 },
  { kelompok: 'Obat Non-Generik Non-Fornas', resepRi: 320, resepRj: 650, resepIgd: 120 },
]

// --- Morbiditas Rawat Jalan (RL 5.1) ---
export const morbiditasRJ: MorbiditasRI[] = [
  { id: 1, kode: 'I10', diagnosis: 'Hipertensi Esensial', kelUmur: '45-54', lBaru: 450, pBaru: 580, lMati: 0, pMati: 0, hariRawat: 0 },
  { id: 2, kode: 'E11.9', diagnosis: 'Diabetes Mellitus Tipe 2', kelUmur: '45-54', lBaru: 320, pBaru: 410, lMati: 0, pMati: 0, hariRawat: 0 },
  { id: 3, kode: 'I25.9', diagnosis: 'Penyakit Jantung Iskemik Kronis', kelUmur: '55-64', lBaru: 280, pBaru: 150, lMati: 0, pMati: 0, hariRawat: 0 },
  { id: 4, kode: 'A15.0', diagnosis: 'Tuberkulosis Paru', kelUmur: '25-34', lBaru: 120, pBaru: 95, lMati: 0, pMati: 0, hariRawat: 0 },
  { id: 5, kode: 'K29.7', diagnosis: 'Gastritis, tidak spesifik', kelUmur: '15-24', lBaru: 180, pBaru: 240, lMati: 0, pMati: 0, hariRawat: 0 },
]

// --- Info Rumah Sakit ---
export const infoRS = {
  nama: 'RS Intramedika',
  kodeRS: '3578003',
  jenis: 'Rumah Sakit Umum',
  kelas: 'A',
  alamat: 'Jl. Mayjen Prof. Dr. Moestopo No. 6-8, Surabaya 60286',
  telepon: '(031) 5501079',
  email: 'rsds@rssa.jatimprov.go.id',
  direktur: 'dr. Hendrian D. Soebagjo, Sp.M(K)',
  periodeAktif: 'Mei 2026',
  deadline: '10 Juni 2026',
}
