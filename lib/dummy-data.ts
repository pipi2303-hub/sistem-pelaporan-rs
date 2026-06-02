// Dummy data sesuai spesifikasi SIRS 6.3 dari laporan.md

export const profilRS = {
  nama: "RS Harapan Sehat Nasional",
  kode: "1671001",
  jenis: "RS Umum",
  kelas: "B",
  kepemilikan: "Swasta",
  direktur: "dr. Andi Wijaya, MARS",
  kabupaten: "Palembang",
  provinsi: "Sumatera Selatan",
  akreditasi: "Paripurna",
  nomorIzin: "503/IZIN-RS/2020/001",
  telepon: "(0711) 555-1234",
  email: "info@rsharapansehat.co.id",
  alamat: "Jl. Merdeka No. 1, Palembang, Sumatera Selatan 30111",
  logo: null,
  integrasi: {
    satusehat: "Connected",
    bpjs: "Connected",
    sirsOnline: "Connected",
    aspak: "Connected",
    sisdmk: "Connected",
    sisrute: "Connected",
    eclaim: "Connected",
  },
};

export const pelayananRS = [
  { id: 1, nama: "Penyakit Dalam", jenis: "Spesialis", status: "Aktif" },
  { id: 2, nama: "Bedah", jenis: "Spesialis", status: "Aktif" },
  { id: 3, nama: "Anak", jenis: "Spesialis", status: "Aktif" },
  { id: 4, nama: "Obstetri & Ginekologi", jenis: "Spesialis", status: "Aktif" },
  { id: 5, nama: "Saraf", jenis: "Spesialis", status: "Aktif" },
  { id: 6, nama: "Kardiologi", jenis: "Spesialis", status: "Aktif" },
  { id: 7, nama: "Ortopedi", jenis: "Spesialis", status: "Aktif" },
  { id: 8, nama: "ICU", jenis: "ICU/Intensif", status: "Aktif" },
  { id: 9, nama: "NICU", jenis: "ICU/Intensif", status: "Aktif" },
  { id: 10, nama: "PICU", jenis: "ICU/Intensif", status: "Aktif" },
  { id: 11, nama: "Hemodialisa", jenis: "Penunjang", status: "Aktif" },
  { id: 12, nama: "Kemoterapi", jenis: "Penunjang", status: "Aktif" },
  { id: 13, nama: "Day Care", jenis: "Penunjang", status: "Aktif" },
  { id: 14, nama: "MCU", jenis: "Penunjang", status: "Aktif" },
  { id: 15, nama: "Rehabilitasi Medik", jenis: "Penunjang", status: "Aktif" },
  { id: 16, nama: "Farmasi", jenis: "Penunjang", status: "Aktif" },
  { id: 17, nama: "CSSD", jenis: "Penunjang", status: "Aktif" },
];

export const bedData = [
  { ruangan: "Mawar 1", kelas: "Kelas I", totalBed: 20, terpakai: 15, kosong: 5, booking: 2, maintenance: 0, isolasi: 0 },
  { ruangan: "Mawar 2", kelas: "Kelas II", totalBed: 25, terpakai: 20, kosong: 5, booking: 1, maintenance: 1, isolasi: 0 },
  { ruangan: "Mawar 3", kelas: "Kelas III", totalBed: 30, terpakai: 26, kosong: 4, booking: 0, maintenance: 0, isolasi: 2 },
  { ruangan: "ICU", kelas: "ICU Ventilator", totalBed: 10, terpakai: 9, kosong: 1, booking: 0, maintenance: 0, isolasi: 0 },
  { ruangan: "NICU", kelas: "NICU", totalBed: 12, terpakai: 10, kosong: 2, booking: 0, maintenance: 0, isolasi: 0 },
  { ruangan: "PICU", kelas: "PICU", totalBed: 8, terpakai: 6, kosong: 2, booking: 0, maintenance: 0, isolasi: 0 },
  { ruangan: "Anggrek", kelas: "VIP", totalBed: 15, terpakai: 9, kosong: 6, booking: 3, maintenance: 0, isolasi: 0 },
  { ruangan: "Isolasi", kelas: "Khusus", totalBed: 8, terpakai: 6, kosong: 2, booking: 0, maintenance: 0, isolasi: 6 },
  { ruangan: "Perinatologi", kelas: "Perinatologi", totalBed: 10, terpakai: 7, kosong: 3, booking: 0, maintenance: 0, isolasi: 0 },
];

export const indikatorPelayanan = {
  bor: 78,
  alos: 5.8,
  bto: 3.2,
  toi: 1.5,
  ndr: 12,
  gdr: 22,
};

export const trendBOR = [
  { bulan: "Jan", bor: 72 },
  { bulan: "Feb", bor: 74 },
  { bulan: "Mar", bor: 76 },
  { bulan: "Apr", bor: 80 },
  { bulan: "Mei", bor: 78 },
  { bulan: "Jun", bor: 82 },
  { bulan: "Jul", bor: 85 },
  { bulan: "Ags", bor: 83 },
  { bulan: "Sep", bor: 79 },
  { bulan: "Okt", bor: 77 },
  { bulan: "Nov", bor: 80 },
  { bulan: "Des", bor: 78 },
];

export const trendKunjungan = [
  { bulan: "Jan", rawatJalan: 5200, rawatInap: 480, igd: 2400 },
  { bulan: "Feb", rawatJalan: 5100, rawatInap: 490, igd: 2300 },
  { bulan: "Mar", rawatJalan: 5400, rawatInap: 510, igd: 2500 },
  { bulan: "Apr", rawatJalan: 5600, rawatInap: 530, igd: 2600 },
  { bulan: "Mei", rawatJalan: 5750, rawatInap: 540, igd: 2645 },
  { bulan: "Jun", rawatJalan: 5900, rawatInap: 560, igd: 2700 },
];

export const trendMortalitas = [
  { bulan: "Jan", ndr: 10, gdr: 20 },
  { bulan: "Feb", ndr: 11, gdr: 21 },
  { bulan: "Mar", ndr: 9, gdr: 19 },
  { bulan: "Apr", ndr: 13, gdr: 23 },
  { bulan: "Mei", ndr: 12, gdr: 22 },
  { bulan: "Jun", ndr: 11, gdr: 21 },
];

export const alertData = [
  { id: 1, jenis: "BOR ICU > 90%", status: "Warning", unit: "ICU", waktu: "2026-05-18 07:45", nilai: "90%" },
  { id: 2, jenis: "NICU Full", status: "Critical", unit: "NICU", waktu: "2026-05-18 06:30", nilai: "100%" },
  { id: 3, jenis: "Mortalitas meningkat", status: "Warning", unit: "RS", waktu: "2026-05-18 08:00", nilai: "NDR 13‰" },
  { id: 4, jenis: "Bed Isolasi > 80%", status: "Warning", unit: "Isolasi", waktu: "2026-05-18 09:00", nilai: "75%" },
];

export const sensusHarian = {
  pasienAwalBulan: 120,
  pasienMasuk: 540,
  pasienPindahan: 30,
  pasienDipindahkan: 28,
  keluarHidup: 500,
  matiKurang48jam: 5,
  matiLebih48jam: 8,
  jumlahLamaDirawat: 3200,
  jumlahHariPerawatan: 3480,
  sisaPasienAkhirBulan: 149,
};

export const sensusPerRuangan = [
  { ruangan: "Penyakit Dalam", pasienAwal: 30, masuk: 120, keluar: 115, sisa: 35, los: 5.2 },
  { ruangan: "Bedah", pasienAwal: 20, masuk: 100, keluar: 95, sisa: 25, los: 6.1 },
  { ruangan: "Anak", pasienAwal: 15, masuk: 80, keluar: 78, sisa: 17, los: 4.8 },
  { ruangan: "Kebidanan", pasienAwal: 10, masuk: 90, keluar: 88, sisa: 12, los: 3.5 },
  { ruangan: "ICU", pasienAwal: 8, masuk: 25, keluar: 23, sisa: 10, los: 8.2 },
  { ruangan: "NICU", pasienAwal: 7, masuk: 30, keluar: 28, sisa: 9, los: 7.5 },
  { ruangan: "Kardiologi", pasienAwal: 12, masuk: 50, keluar: 48, sisa: 14, los: 6.8 },
  { ruangan: "Saraf", pasienAwal: 8, masuk: 35, keluar: 33, sisa: 10, los: 7.1 },
];

export const occupancyHarian = [
  { unit: "ICU", occupancy: 95 },
  { unit: "NICU", occupancy: 85 },
  { unit: "PICU", occupancy: 70 },
  { unit: "Kelas III", occupancy: 88 },
  { unit: "Kelas II", occupancy: 80 },
  { unit: "Kelas I", occupancy: 75 },
  { unit: "VIP", occupancy: 60 },
  { unit: "Isolasi", occupancy: 75 },
];

export const kunjunganPoli = [
  { poli: "Penyakit Dalam", total: 1250, baru: 320, lama: 930 },
  { poli: "Bedah", total: 850, baru: 210, lama: 640 },
  { poli: "Anak", total: 920, baru: 280, lama: 640 },
  { poli: "OBGYN", total: 1100, baru: 250, lama: 850 },
  { poli: "Saraf", total: 500, baru: 130, lama: 370 },
  { poli: "MCU", total: 300, baru: 300, lama: 0 },
  { poli: "Rehabilitasi Medik", total: 450, baru: 90, lama: 360 },
  { poli: "Kardiologi", total: 380, baru: 95, lama: 285 },
  { poli: "Ortopedi", total: 420, baru: 110, lama: 310 },
];

export const statistikDomisili = [
  { kategori: "Dalam Kota", jumlah: 4500, warna: "#3b82f6" },
  { kategori: "Luar Kota", jumlah: 1250, warna: "#10b981" },
];

export const statistikGender = [
  { gender: "Laki-laki", jumlah: 2600, warna: "#3b82f6" },
  { gender: "Perempuan", jumlah: 3150, warna: "#ec4899" },
];

export const monitoringPoli = [
  { poli: "Penyakit Dalam", waiting: 45, dokterAktif: 3, avgWait: 35 },
  { poli: "Anak", waiting: 30, dokterAktif: 2, avgWait: 28 },
  { poli: "OBGYN", waiting: 25, dokterAktif: 2, avgWait: 32 },
  { poli: "Saraf", waiting: 12, dokterAktif: 1, avgWait: 45 },
  { poli: "Bedah", waiting: 18, dokterAktif: 2, avgWait: 40 },
];

export const igdKategori = [
  { kategori: "Bedah", total: 520, warna: "#ef4444" },
  { kategori: "Non Bedah", total: 1200, warna: "#3b82f6" },
  { kategori: "Kebidanan", total: 250, warna: "#ec4899" },
  { kategori: "Psikiatri", total: 45, warna: "#8b5cf6" },
  { kategori: "Bayi", total: 120, warna: "#f59e0b" },
  { kategori: "Anak", total: 300, warna: "#10b981" },
  { kategori: "Geriatri", total: 210, warna: "#6b7280" },
];

export const igdOutcome = [
  { outcome: "Dirawat", total: 850, warna: "#3b82f6" },
  { outcome: "Dirujuk", total: 120, warna: "#f59e0b" },
  { outcome: "Pulang", total: 1450, warna: "#10b981" },
  { outcome: "Mati di IGD", total: 15, warna: "#ef4444" },
  { outcome: "DOA", total: 8, warna: "#7f1d1d" },
];

export const igdTriage = [
  { triage: "Merah (P1)", jumlah: 180, warna: "#ef4444", keterangan: "Gawat Darurat" },
  { triage: "Kuning (P2)", jumlah: 520, warna: "#f59e0b", keterangan: "Darurat Tidak Gawat" },
  { triage: "Hijau (P3)", jumlah: 1800, warna: "#10b981", keterangan: "Tidak Gawat Tidak Darurat" },
  { triage: "Hitam (P0)", jumlah: 8, warna: "#374151", keterangan: "Meninggal/Harapan Tipis" },
];

export const falseEmergency = [
  { kategori: "Non Emergency", total: 320 },
  { kategori: "Emergency Ringan", total: 110 },
];

export const igdRealtime = {
  waiting: 12,
  bedAvailable: 4,
  bedTotal: 20,
  observasi: 8,
  dirawat: 850,
  dirujuk: 120,
};

export const auditTrail = [
  { id: 1, user: "admin.rm", role: "ADMIN_RM", aktivitas: "Generate RL 3.2 Mei 2026", timestamp: "2026-05-18 08:00", status: "Sukses" },
  { id: 2, user: "kepala.rm", role: "ADMIN_RM", aktivitas: "Approve RL Mei 2026", timestamp: "2026-05-18 08:15", status: "Sukses" },
  { id: 3, user: "petugas.igd", role: "PETUGAS_PELAYANAN", aktivitas: "Update Triage P1 - 3 Pasien", timestamp: "2026-05-18 09:00", status: "Sukses" },
  { id: 4, user: "admin.rm", role: "ADMIN_RM", aktivitas: "Send RL ke SIRS Online", timestamp: "2026-05-18 09:30", status: "Sukses" },
  { id: 5, user: "direktur", role: "DIREKTUR", aktivitas: "View Dashboard Executive", timestamp: "2026-05-18 10:00", status: "Sukses" },
  { id: 6, user: "petugas.rawat", role: "PETUGAS_PELAYANAN", aktivitas: "Registrasi Rawat Inap - Pasien Baru", timestamp: "2026-05-18 10:15", status: "Sukses" },
  { id: 7, user: "admin.rm", role: "ADMIN_RM", aktivitas: "Validasi Sensus Harian", timestamp: "2026-05-18 10:45", status: "Sukses" },
  { id: 8, user: "petugas.poli", role: "PETUGAS_PELAYANAN", aktivitas: "Update Status Dokter - Poli PD", timestamp: "2026-05-18 11:00", status: "Sukses" },
];

export const kpiDashboard = {
  totalKunjungan: 5750,
  bor: 78,
  occupancyICU: 95,
  pasienRawatInap: 540,
  kunjunganIGD: 2645,
  mortalitas: 1.2,
  waitingTime: 32,
  totalBed: 138,
};
