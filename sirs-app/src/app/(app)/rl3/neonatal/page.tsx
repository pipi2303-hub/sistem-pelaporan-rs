'use client'

import { infoRS } from '@/lib/dummy-data'
import { Baby, FileText, Filter } from 'lucide-react'

type Row = {
  no: string | number
  label: string
  isSection?: boolean  // baris A / B (abu gelap)
  isHeader?: boolean   // bold + bg abu muda
  blackHidup?: boolean // Jumlah Hidup + Dirujuk = N/A (hitam)
  rmRS?: number; rmBidan?: number; rmPkm?: number; rmFasLain?: number
  rmHidup?: number; rmMati?: number
  rnmHidup?: number; rnmMati?: number
  nrHidup?: number; nrMati?: number
  dirujuk?: number
}

function v(n: number | undefined) { return n ?? 0 }
function tRM(r: Row)  { return v(r.rmRS) + v(r.rmBidan) + v(r.rmPkm) + v(r.rmFasLain) }
function tRMtot(r: Row) { return (r.blackHidup ? 0 : v(r.rmHidup)) + v(r.rmMati) }
function tRNM(r: Row) { return (r.blackHidup ? 0 : v(r.rnmHidup)) + v(r.rnmMati) }
function tNR(r: Row)  { return (r.blackHidup ? 0 : v(r.nrHidup)) + v(r.nrMati) }

const ROWS: Row[] = [
  // ── A NEONATAL ──────────────────────────────────────────────────────────────
  { no: 'A', label: 'NEONATAL', isSection: true },

  { no: 1,     label: 'Bayi Lahir Hidup', isHeader: true,
    rmRS:55, rmBidan:20, rmPkm:35, rmFasLain:8, rmHidup:115, rmMati:0, rnmHidup:265, rnmMati:0, nrHidup:485, nrMati:0, dirujuk:18 },
  { no: '1.1', label: 'Lahir Prematur (< 37 minggu)', isHeader: true,
    rmRS:18, rmBidan:5,  rmPkm:10, rmFasLain:2, rmHidup:33,  rmMati:2, rnmHidup:62,  rnmMati:3, nrHidup:95,  nrMati:5, dirujuk:12 },
  { no: '1.1.1', label: '1500 - <2500 gram (BBLR)',
    rmRS:10, rmBidan:3,  rmPkm:5,  rmFasLain:1, rmHidup:18,  rmMati:1, rnmHidup:35,  rnmMati:1, nrHidup:52,  nrMati:2, dirujuk:6 },
  { no: '1.1.2', label: '1000 - <1500 gram (BBLSR)',
    rmRS:6,  rmBidan:1,  rmPkm:3,  rmFasLain:1, rmHidup:10,  rmMati:1, rnmHidup:18,  rnmMati:1, nrHidup:28,  nrMati:2, dirujuk:4 },
  { no: '1.1.3', label: '<1000 gram (BBLER)',
    rmRS:2,  rmBidan:1,  rmPkm:2,  rmFasLain:0, rmHidup:5,   rmMati:0, rnmHidup:9,   rnmMati:1, nrHidup:15,  nrMati:1, dirujuk:2 },
  { no: '1.2', label: 'Lahir Non Prematur (≥ 37 - 41 minggu)', isHeader: true,
    rmRS:28, rmBidan:12, rmPkm:20, rmFasLain:5, rmHidup:62,  rmMati:0, rnmHidup:145, rnmMati:0, nrHidup:310, nrMati:0, dirujuk:5 },
  { no: '1.2.1', label: '1500 - <2500 gram (BBLR)',
    rmRS:8,  rmBidan:3,  rmPkm:5,  rmFasLain:1, rmHidup:16,  rmMati:0, rnmHidup:32,  rnmMati:0, nrHidup:58,  nrMati:0, dirujuk:2 },
  { no: '1.2.2', label: '2500 - <4000 gram (BBLN)',
    rmRS:16, rmBidan:8,  rmPkm:12, rmFasLain:3, rmHidup:38,  rmMati:0, rnmHidup:95,  rnmMati:0, nrHidup:225, nrMati:0, dirujuk:2 },
  { no: '1.2.3', label: '≥4000 gram (BBLL)',
    rmRS:4,  rmBidan:1,  rmPkm:3,  rmFasLain:1, rmHidup:8,   rmMati:0, rnmHidup:18,  rnmMati:0, nrHidup:27,  nrMati:0, dirujuk:1 },
  { no: '1.3', label: 'Lahir Lebih dari 41 minggu', isHeader: true,
    rmRS:9,  rmBidan:3,  rmPkm:5,  rmFasLain:1, rmHidup:20,  rmMati:0, rnmHidup:58,  rnmMati:0, nrHidup:80,  nrMati:0, dirujuk:1 },
  { no: '1.3.1', label: '1500 - <2500 gram (BBLR)',
    rmRS:2,  rmBidan:1,  rmPkm:1,  rmFasLain:0, rmHidup:4,   rmMati:0, rnmHidup:10,  rnmMati:0, nrHidup:15,  nrMati:0, dirujuk:0 },
  { no: '1.3.2', label: '2500 - <4000 gram (BBLN)',
    rmRS:6,  rmBidan:2,  rmPkm:3,  rmFasLain:1, rmHidup:14,  rmMati:0, rnmHidup:42,  rnmMati:0, nrHidup:58,  nrMati:0, dirujuk:1 },
  { no: '1.3.3', label: '≥4000 gram (BBLL)',
    rmRS:1,  rmBidan:0,  rmPkm:1,  rmFasLain:0, rmHidup:2,   rmMati:0, rnmHidup:6,   rnmMati:0, nrHidup:7,   nrMati:0, dirujuk:0 },

  { no: 2,     label: 'Lahir Mati', isHeader: true, blackHidup: true,
    rmRS:8,  rmBidan:2,  rmPkm:4,  rmFasLain:1, rmMati:12, rnmMati:5, nrMati:8, dirujuk:0 },
  { no: '2.1', label: 'Lahir Mati Antepartum', blackHidup: true,
    rmRS:5,  rmBidan:1,  rmPkm:2,  rmFasLain:1, rmMati:8,  rnmMati:3, nrMati:5, dirujuk:0 },
  { no: '2.2', label: 'Lahir Mati Intrapartum', blackHidup: true,
    rmRS:3,  rmBidan:1,  rmPkm:2,  rmFasLain:0, rmMati:4,  rnmMati:2, nrMati:3, dirujuk:0 },

  { no: 3,     label: 'Kematian Neonatal dan Perinatal', isHeader: true, blackHidup: true,
    rmRS:6,  rmBidan:1,  rmPkm:3,  rmFasLain:1, rmMati:10, rnmMati:4, nrMati:7, dirujuk:0 },
  { no: '3.1', label: 'Kematian Neonatal Dini (0 - 7 hari)', blackHidup: true,
    rmRS:4,  rmBidan:1,  rmPkm:2,  rmFasLain:0, rmMati:6,  rnmMati:2, nrMati:4, dirujuk:0 },
  { no: '3.2', label: 'Kematian Neonatal Lanjut Perinatal (8 - 28 hari)', blackHidup: true,
    rmRS:2,  rmBidan:0,  rmPkm:1,  rmFasLain:1, rmMati:4,  rnmMati:2, nrMati:3, dirujuk:0 },

  { no: 4,     label: 'Komplikasi Neonatal:', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0, rmMati:0, rnmHidup:0, rnmMati:0, nrHidup:0, nrMati:0, dirujuk:0 },
  { no: '4.1', label: 'Asfiksia',
    rmRS:12, rmBidan:2,  rmPkm:5,  rmFasLain:1, rmHidup:15, rmMati:3, rnmHidup:8,  rnmMati:1, nrHidup:12, nrMati:2, dirujuk:5 },
  { no: '4.2', label: 'Trauma Kelahiran',
    rmRS:4,  rmBidan:1,  rmPkm:2,  rmFasLain:0, rmHidup:6,  rmMati:1, rnmHidup:3,  rnmMati:0, nrHidup:5,  nrMati:0, dirujuk:2 },
  { no: '4.3', label: 'BBLR',
    rmRS:18, rmBidan:4,  rmPkm:8,  rmFasLain:2, rmHidup:28, rmMati:3, rnmHidup:15, rnmMati:2, nrHidup:22, nrMati:3, dirujuk:8 },
  { no: '4.4', label: 'Tetanus Neonatorum',
    rmRS:1,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:1,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '4.5', label: 'Kelainan Bawaan',
    rmRS:6,  rmBidan:0,  rmPkm:2,  rmFasLain:1, rmHidup:7,  rmMati:2, rnmHidup:3,  rnmMati:1, nrHidup:5,  nrMati:1, dirujuk:3 },
  { no: '4.6', label: 'Covid-19',
    rmRS:2,  rmBidan:0,  rmPkm:1,  rmFasLain:0, rmHidup:3,  rmMati:0, rnmHidup:1,  rnmMati:0, nrHidup:2,  nrMati:0, dirujuk:1 },
  { no: '4.7', label: 'Infeksi / Sepsis',
    rmRS:8,  rmBidan:1,  rmPkm:3,  rmFasLain:1, rmHidup:10, rmMati:3, rnmHidup:5,  rnmMati:1, nrHidup:8,  nrMati:2, dirujuk:4 },
  { no: '4.8', label: 'Komplikasi lainnya',
    rmRS:4,  rmBidan:1,  rmPkm:2,  rmFasLain:0, rmHidup:5,  rmMati:1, rnmHidup:3,  rnmMati:0, nrHidup:4,  nrMati:1, dirujuk:2 },

  { no: 5, label: 'Bayi BBLR yang dilakukan perawatan metode kanguru', isHeader: true,
    rmRS:15, rmBidan:3,  rmPkm:6,  rmFasLain:1, rmHidup:24, rmMati:0, rnmHidup:18, rnmMati:0, nrHidup:32, nrMati:0, dirujuk:5 },
  { no: 6, label: 'Bayi baru lahir yang dilakukan IMD', isHeader: true,
    rmRS:42, rmBidan:15, rmPkm:28, rmFasLain:5, rmHidup:88, rmMati:0, rnmHidup:195,rnmMati:0, nrHidup:380,nrMati:0, dirujuk:0 },
  { no: 7, label: 'Bayi baru lahir yang dilakukan Skrining Hipertiroid Kongenital', isHeader: true,
    rmRS:38, rmBidan:0,  rmPkm:15, rmFasLain:2, rmHidup:52, rmMati:0, rnmHidup:120,rnmMati:0, nrHidup:245,nrMati:0, dirujuk:0 },

  // ── B BAYI DAN ANAK BALITA ─────────────────────────────────────────────────
  { no: 'B', label: 'BAYI DAN ANAK BALITA', isSection: true },

  { no: 8,     label: 'Bayi dan Anak Balita', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '8.1', label: 'Bayi Baru Lahir (0 – 28 hari)',
    rmRS:55, rmBidan:18, rmPkm:32, rmFasLain:6, rmHidup:108,rmMati:2, rnmHidup:265,rnmMati:3, nrHidup:485,nrMati:5, dirujuk:15 },
  { no: '8.2', label: 'Bayi (29 hari – 11 bulan)',
    rmRS:82, rmBidan:25, rmPkm:45, rmFasLain:8, rmHidup:155,rmMati:3, rnmHidup:320,rnmMati:5, nrHidup:620,nrMati:8, dirujuk:22 },
  { no: '8.3', label: 'Anak Balita (12 - 59 bulan)',
    rmRS:95, rmBidan:18, rmPkm:52, rmFasLain:10,rmHidup:168,rmMati:5, rnmHidup:385,rnmMati:8, nrHidup:720,nrMati:12,dirujuk:28 },

  { no: 9,     label: 'Balita Gizi Buruk', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '9.1', label: 'Balita Gizi Buruk usia 0-5 bulan',
    rmRS:5,  rmBidan:1,  rmPkm:3,  rmFasLain:0, rmHidup:8,  rmMati:1, rnmHidup:4,  rnmMati:0, nrHidup:7,  nrMati:1, dirujuk:3 },
  { no: '9.2', label: 'Balita Gizi Buruk usia 6-59 bulan',
    rmRS:12, rmBidan:2,  rmPkm:6,  rmFasLain:1, rmHidup:18, rmMati:2, rnmHidup:9,  rnmMati:1, nrHidup:15, nrMati:2, dirujuk:6 },

  { no: 10, label: 'Balita menggunakan Buku KIA', isHeader: true,
    rmRS:48, rmBidan:20, rmPkm:35, rmFasLain:5, rmHidup:105,rmMati:0, rnmHidup:285,rnmMati:0, nrHidup:520,nrMati:0, dirujuk:0 },

  { no: 11,    label: 'Balita dilakukan skrining pertumbuhan dan perkembangan', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '11.1', label: 'Skrining Pertumbuhan sesuai umur',
    rmRS:38, rmBidan:12, rmPkm:25, rmFasLain:4, rmHidup:78, rmMati:0, rnmHidup:185,rnmMati:0, nrHidup:360,nrMati:0, dirujuk:5 },
  { no: '11.2', label: 'Skrining perkembangan sesuai umur',
    rmRS:35, rmBidan:10, rmPkm:22, rmFasLain:3, rmHidup:68, rmMati:0, rnmHidup:165,rnmMati:0, nrHidup:320,nrMati:0, dirujuk:4 },
  { no: '11.3', label: 'Skrining keterlambatan bicara dan bahasa',
    rmRS:12, rmBidan:2,  rmPkm:8,  rmFasLain:1, rmHidup:22, rmMati:0, rnmHidup:48, rnmMati:0, nrHidup:92, nrMati:0, dirujuk:3 },
  { no: '11.4', label: 'Assessment kelainan motoric',
    rmRS:8,  rmBidan:1,  rmPkm:4,  rmFasLain:1, rmHidup:13, rmMati:0, rnmHidup:28, rnmMati:0, nrHidup:55, nrMati:0, dirujuk:2 },
  { no: '11.5', label: 'Skrining Kelainan Perilaku',
    rmRS:6,  rmBidan:0,  rmPkm:3,  rmFasLain:0, rmHidup:9,  rmMati:0, rnmHidup:18, rnmMati:0, nrHidup:35, nrMati:0, dirujuk:2 },
  { no: '11.6', label: 'Skrining Gangguan Pendengaran',
    rmRS:10, rmBidan:0,  rmPkm:5,  rmFasLain:1, rmHidup:15, rmMati:0, rnmHidup:32, rnmMati:0, nrHidup:62, nrMati:0, dirujuk:3 },
  { no: '10.7', label: 'Skrining Gangguan Penglihatan',
    rmRS:8,  rmBidan:0,  rmPkm:4,  rmFasLain:1, rmHidup:12, rmMati:0, rnmHidup:25, rnmMati:0, nrHidup:48, nrMati:0, dirujuk:2 },

  { no: 12,    label: 'Bayi mendapatkan imunisasi, Vitamin, dan Pengobatan Profilaksis:', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '12.1', label: 'Hb 0',
    rmRS:45, rmBidan:18, rmPkm:30, rmFasLain:5, rmHidup:95, rmMati:0, rnmHidup:225,rnmMati:0, nrHidup:420,nrMati:0, dirujuk:0 },
  { no: '12.2', label: 'BCG',
    rmRS:42, rmBidan:16, rmPkm:28, rmFasLain:4, rmHidup:88, rmMati:0, rnmHidup:210,rnmMati:0, nrHidup:398,nrMati:0, dirujuk:0 },
  { no: '12.3', label: 'Polio 1,2,3',
    rmRS:38, rmBidan:14, rmPkm:25, rmFasLain:4, rmHidup:80, rmMati:0, rnmHidup:195,rnmMati:0, nrHidup:365,nrMati:0, dirujuk:0 },
  { no: '12.4', label: 'DPT-HB-HiB 1, 2,3,4',
    rmRS:35, rmBidan:13, rmPkm:22, rmFasLain:3, rmHidup:72, rmMati:0, rnmHidup:180,rnmMati:0, nrHidup:340,nrMati:0, dirujuk:0 },
  { no: '12.5', label: 'IPV',
    rmRS:30, rmBidan:10, rmPkm:20, rmFasLain:3, rmHidup:62, rmMati:0, rnmHidup:155,rnmMati:0, nrHidup:295,nrMati:0, dirujuk:0 },
  { no: '12.6', label: 'Campak-Rubella',
    rmRS:28, rmBidan:9,  rmPkm:18, rmFasLain:2, rmHidup:56, rmMati:0, rnmHidup:142,rnmMati:0, nrHidup:268,nrMati:0, dirujuk:0 },
  { no: '12.7', label: 'Vitamin A 100.000 SI (1 kali dalam setahun)',
    rmRS:32, rmBidan:12, rmPkm:22, rmFasLain:3, rmHidup:68, rmMati:0, rnmHidup:165,rnmMati:0, nrHidup:310,nrMati:0, dirujuk:0 },
  { no: '12.8', label: 'Pemberian Komunikasi, Informasi dan Edukasi (KIE)',
    rmRS:40, rmBidan:15, rmPkm:28, rmFasLain:4, rmHidup:85, rmMati:0, rnmHidup:205,rnmMati:0, nrHidup:385,nrMati:0, dirujuk:0 },

  { no: 13,    label: 'Bayi yang lahir dari Ibu HIV +', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '13.1', label: 'Pemeriksaan Early Infant Diagnosis (EID)',
    rmRS:3,  rmBidan:0,  rmPkm:1,  rmFasLain:0, rmHidup:4,  rmMati:0, rnmHidup:1,  rnmMati:0, nrHidup:2,  nrMati:0, dirujuk:1 },
  { no: '13.2', label: 'Pengobatan ARV bagi balita HIV+',
    rmRS:2,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:2,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:1,  nrMati:0, dirujuk:1 },
  { no: '13.3', label: 'Pengobatan profilaksis kotrimoksazol',
    rmRS:3,  rmBidan:0,  rmPkm:1,  rmFasLain:0, rmHidup:4,  rmMati:0, rnmHidup:1,  rnmMati:0, nrHidup:2,  nrMati:0, dirujuk:0 },

  { no: 14,    label: 'Bayi yang lahir dari Ibu Sifilis +', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '14.1', label: 'Pemeriksaan Titer RPR',
    rmRS:2,  rmBidan:0,  rmPkm:1,  rmFasLain:0, rmHidup:3,  rmMati:0, rnmHidup:1,  rnmMati:0, nrHidup:2,  nrMati:0, dirujuk:0 },
  { no: '14.2', label: 'Pengobatan dosis tunggal Benzatin Penicilin G',
    rmRS:2,  rmBidan:0,  rmPkm:1,  rmFasLain:0, rmHidup:3,  rmMati:0, rnmHidup:1,  rnmMati:0, nrHidup:2,  nrMati:0, dirujuk:0 },

  { no: 15,    label: 'Bayi yang lahir dari Ibu Hepatitis +', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '15.1', label: 'Pemeriksaan serologis HBs Ag',
    rmRS:5,  rmBidan:1,  rmPkm:2,  rmFasLain:0, rmHidup:8,  rmMati:0, rnmHidup:3,  rnmMati:0, nrHidup:6,  nrMati:0, dirujuk:1 },
  { no: '15.2', label: 'Pemberian Hb 0',
    rmRS:8,  rmBidan:2,  rmPkm:4,  rmFasLain:1, rmHidup:14, rmMati:0, rnmHidup:6,  rnmMati:0, nrHidup:10, nrMati:0, dirujuk:0 },
  { no: '15.3', label: 'Pemberian Hb Ig',
    rmRS:4,  rmBidan:0,  rmPkm:2,  rmFasLain:0, rmHidup:6,  rmMati:0, rnmHidup:2,  rnmMati:0, nrHidup:4,  nrMati:0, dirujuk:0 },

  { no: 16,    label: 'Anak Balita (12 – 59 bulan) mendapatkan Imunisasi, Vitamin, dan Pengobatan profilaksis:', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '16.1', label: 'Campak-Rubela',
    rmRS:52, rmBidan:15, rmPkm:35, rmFasLain:5, rmHidup:105,rmMati:0, rnmHidup:245,rnmMati:0, nrHidup:465,nrMati:0, dirujuk:0 },
  { no: '16.2', label: 'Vitamin A 200.000 SI (2kali dalam setahun)',
    rmRS:58, rmBidan:18, rmPkm:38, rmFasLain:6, rmHidup:118,rmMati:0, rnmHidup:275,rnmMati:0, nrHidup:520,nrMati:0, dirujuk:0 },
  { no: '16.3', label: 'Anak balita mendapat obat pencegahan kecacingan 1 kali setahun',
    rmRS:45, rmBidan:12, rmPkm:30, rmFasLain:4, rmHidup:90, rmMati:0, rnmHidup:215,rnmMati:0, nrHidup:405,nrMati:0, dirujuk:0 },
  { no: '16.4', label: 'Balita (0-59 bulan) terduga TBC/ kontak erat mendapat TPT',
    rmRS:8,  rmBidan:1,  rmPkm:4,  rmFasLain:1, rmHidup:13, rmMati:0, rnmHidup:5,  rnmMati:0, nrHidup:10, nrMati:0, dirujuk:3 },
  { no: '16.5', label: 'Balita (0-59 bulan) TBC mendapatkan OAT',
    rmRS:5,  rmBidan:0,  rmPkm:3,  rmFasLain:0, rmHidup:8,  rmMati:0, rnmHidup:3,  rnmMati:0, nrHidup:6,  nrMati:0, dirujuk:2 },
  { no: '16.6', label: 'Pemberian Komunikasi, Informasi dan Edukasi (KIE)',
    rmRS:42, rmBidan:12, rmPkm:28, rmFasLain:4, rmHidup:85, rmMati:0, rnmHidup:195,rnmMati:0, nrHidup:375,nrMati:0, dirujuk:0 },

  { no: 17,    label: 'Balita Gizi Buruk mendapat perawatan', isHeader: true,
    rmRS:0,  rmBidan:0,  rmPkm:0,  rmFasLain:0, rmHidup:0,  rmMati:0, rnmHidup:0,  rnmMati:0, nrHidup:0,  nrMati:0, dirujuk:0 },
  { no: '17.1', label: 'Balita Gizi Buruk usia 0-5 bulan yang mendapat rawat inap',
    rmRS:4,  rmBidan:0,  rmPkm:2,  rmFasLain:0, rmHidup:5,  rmMati:1, rnmHidup:2,  rnmMati:0, nrHidup:4,  nrMati:1, dirujuk:2 },
  { no: '17.2', label: 'Balita Gizi Buruk usia 6-59 bulan yang mendapat rawat inap',
    rmRS:8,  rmBidan:0,  rmPkm:4,  rmFasLain:1, rmHidup:10, rmMati:2, rnmHidup:5,  rnmMati:1, nrHidup:8,  nrMati:1, dirujuk:4 },
  { no: '17.3', label: 'Balita Gizi Buruk usia 6-59 bulan yang mendapat rawat jalan',
    rmRS:10, rmBidan:1,  rmPkm:5,  rmFasLain:1, rmHidup:15, rmMati:0, rnmHidup:8,  rnmMati:0, nrHidup:12, nrMati:0, dirujuk:3 },
]

function BlackCell() {
  return <td className="border border-slate-300 bg-slate-900 px-1 py-1.5" />
}
function Td({ value }: { value: number }) {
  return <td className="border border-slate-200 px-1 py-1.5 text-center text-slate-700">{value}</td>
}

export default function NeonatalPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Baby className="w-5 h-5 text-pink-500" />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Rekapitulasi Kegiatan Pelayanan Neonatal, Bayi, dan Balita (RL 3.7)</h1>
            <p className="text-sm text-slate-500 mt-0.5">Data kelahiran, komplikasi & imunisasi — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.7.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              {/* Row 1 */}
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={3} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 w-10">No.</th>
                <th rowSpan={3} className="border border-slate-300 px-3 py-2 text-left font-bold text-slate-600 min-w-[200px]">Jenis Kegiatan</th>
                <th colSpan={13} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Rujukan</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Non Rujukan</th>
                <th rowSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[44px]">Dirujuk</th>
              </tr>
              {/* Row 2 */}
              <tr className="bg-slate-100 border-b border-slate-300">
                <th colSpan={7} className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-600">Medis</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-600">Non Medis</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-600"></th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-600"></th>
              </tr>
              {/* Row 3 */}
              <tr className="bg-slate-50 border-b border-slate-300">
                {['Rumah Sakit','Bidan','Pus­kes­mas','Fas kes Lain­nya','Jum­lah Hidup','Jum­lah Mati','Total Rujukan Medis',
                  'Jum­lah Hidup','Jum­lah Mati','Total Rujukan Non Medis',
                  'Jum­lah Hidup','Jum­lah Mati','Total Non Rujukan (Rujukan)',
                  'Jum­lah Hidup','Jum­lah Mati','Total Non Rujukan'].map((h, i) => (
                  <th key={i} className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                if (row.isSection) {
                  return (
                    <tr key={row.no} className="bg-slate-200">
                      <td className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-700">{row.no}</td>
                      <td colSpan={17} className="border border-slate-300 px-3 py-1.5 font-bold text-slate-800">{row.label}</td>
                    </tr>
                  )
                }
                const totRM  = tRMtot(row)
                const totRNM = tRNM(row)
                const totNRR = 0
                const totNR  = tNR(row)
                return (
                  <tr key={row.no} className={row.isHeader ? 'bg-slate-50' : 'hover:bg-blue-50/20 transition-colors'}>
                    <td className={`border border-slate-200 px-2 py-1.5 text-center ${row.isHeader ? 'font-bold text-slate-700' : 'text-slate-500'}`}>{row.no}</td>
                    <td className={`border border-slate-200 px-3 py-1.5 ${row.isHeader ? 'font-bold text-slate-800' : 'text-slate-700'}`}>{row.label}</td>
                    <Td value={v(row.rmRS)} />
                    <Td value={v(row.rmBidan)} />
                    <Td value={v(row.rmPkm)} />
                    <Td value={v(row.rmFasLain)} />
                    {row.blackHidup ? <BlackCell /> : <Td value={v(row.rmHidup)} />}
                    <Td value={v(row.rmMati)} />
                    <td className="border border-slate-200 px-1 py-1.5 text-center font-semibold text-blue-700">{totRM}</td>
                    {row.blackHidup ? <BlackCell /> : <Td value={v(row.rnmHidup)} />}
                    <Td value={v(row.rnmMati)} />
                    <td className="border border-slate-200 px-1 py-1.5 text-center font-semibold text-indigo-600">{tRNM(row)}</td>
                    {row.blackHidup ? <BlackCell /> : <Td value={0} />}
                    <Td value={0} />
                    <td className="border border-slate-200 px-1 py-1.5 text-center font-semibold text-slate-500">{totNRR}</td>
                    {row.blackHidup ? <BlackCell /> : <Td value={v(row.nrHidup)} />}
                    <Td value={v(row.nrMati)} />
                    <td className="border border-slate-200 px-1 py-1.5 text-center font-semibold text-emerald-700">{totNR}</td>
                    {row.blackHidup ? <BlackCell /> : <Td value={v(row.dirujuk)} />}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
