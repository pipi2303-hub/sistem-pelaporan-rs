'use client'

import { infoRS } from '@/lib/dummy-data'
import { FlaskConical, FileText, Filter } from 'lucide-react'

type Row = {
  no: string | number
  label: string
  isSection?: boolean
  isHeader?: boolean
  blackNilai?: boolean
  jmlL?: number
  jmlP?: number
  nilaiL?: number
  nilaiP?: number
}

function BlackCell() {
  return <td className="border border-slate-300 bg-slate-900 px-1 py-1.5" />
}

function Td({ value }: { value: number }) {
  return (
    <td className="border border-slate-200 px-1 py-1.5 text-center text-slate-700">
      {value.toLocaleString()}
    </td>
  )
}

const ROWS: Row[] = [
  // ── SEKSI A ──
  { no: 'A', label: 'PATOLOGI KLINIK', isSection: true, blackNilai: true },

  { no: 1, label: 'Hematologi', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '1.1', label: 'Kadar Hemoglobin', jmlL: 1842, jmlP: 1956, nilaiL: 12, nilaiP: 11 },
  { no: '1.2', label: 'Nilai Hematokrit', jmlL: 1750, jmlP: 1820, nilaiL: 42, nilaiP: 38 },
  { no: '1.3', label: 'Hitung Lekosit', jmlL: 1680, jmlP: 1730, nilaiL: 8, nilaiP: 7 },
  { no: '1.4', label: 'Hitung Eritrosit', jmlL: 1520, jmlP: 1590, nilaiL: 5, nilaiP: 4 },
  { no: '1.5', label: 'Hitung Eosinophil', jmlL: 890, jmlP: 820, nilaiL: 3, nilaiP: 2 },
  { no: '1.6', label: 'Hitung Jenis Lekosit (%/absolut)', jmlL: 1450, jmlP: 1380, nilaiL: 6, nilaiP: 5 },
  { no: '1.7', label: 'Laju Endap Darah', jmlL: 960, jmlP: 1050, nilaiL: 18, nilaiP: 22 },
  { no: '1.8', label: 'Hitung Retikulosit', jmlL: 540, jmlP: 510, nilaiL: 2, nilaiP: 1 },
  { no: '1.9', label: 'Hitung Trombosit', jmlL: 1620, jmlP: 1700, nilaiL: 250, nilaiP: 265 },

  { no: 2, label: 'Kimia Klinik', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '2.1', label: 'Protein Total', jmlL: 720, jmlP: 680, nilaiL: 7, nilaiP: 7 },
  { no: '2.2', label: 'Albumin', jmlL: 810, jmlP: 790, nilaiL: 4, nilaiP: 4 },
  { no: '2.3', label: 'Globulin', jmlL: 430, jmlP: 410, nilaiL: 3, nilaiP: 3 },
  { no: '2.4', label: 'Bilirubin Total/Direk/Indirek', jmlL: 650, jmlP: 590, nilaiL: 1, nilaiP: 1 },
  { no: '2.5', label: 'SGOT/AST', jmlL: 980, jmlP: 920, nilaiL: 28, nilaiP: 24 },
  { no: '2.6', label: 'SGPT/ALT', jmlL: 975, jmlP: 910, nilaiL: 22, nilaiP: 18 },
  { no: '2.7', label: 'Ureum/BUN', jmlL: 1100, jmlP: 980, nilaiL: 35, nilaiP: 28 },
  { no: '2.8', label: 'Kreatinin (eGFR)', jmlL: 1120, jmlP: 990, nilaiL: 1, nilaiP: 1 },
  { no: '2.9', label: 'Asam Urat', jmlL: 870, jmlP: 830, nilaiL: 6, nilaiP: 5 },
  { no: '2.10', label: 'Trigliserida', jmlL: 760, jmlP: 720, nilaiL: 145, nilaiP: 130 },
  { no: '2.11', label: 'Kolesterol Total', jmlL: 900, jmlP: 950, nilaiL: 190, nilaiP: 195 },
  { no: '2.12', label: 'Kolesterol HDL', jmlL: 820, jmlP: 880, nilaiL: 48, nilaiP: 55 },
  { no: '2.13', label: 'Kolesterol LDL (direk)', jmlL: 800, jmlP: 850, nilaiL: 115, nilaiP: 118 },
  { no: '2.14', label: 'Glukosa Sewaktu/Puasa / 2jam PP', jmlL: 1380, jmlP: 1420, nilaiL: 105, nilaiP: 98 },
  { no: '2.15', label: 'HbA1c', jmlL: 620, jmlP: 680, nilaiL: 7, nilaiP: 6 },
  { no: '2.16', label: 'Fosfatase alkali', jmlL: 380, jmlP: 360, nilaiL: 85, nilaiP: 78 },
  { no: '2.17', label: 'Gamma GT', jmlL: 340, jmlP: 290, nilaiL: 32, nilaiP: 22 },
  { no: '2.18', label: 'LDH', jmlL: 260, jmlP: 240, nilaiL: 210, nilaiP: 195 },
  { no: '2.19', label: 'G 6 PD', jmlL: 180, jmlP: 150, nilaiL: 9, nilaiP: 9 },
  { no: '2.20', label: 'Amilase', jmlL: 210, jmlP: 190, nilaiL: 75, nilaiP: 68 },
  { no: '2.21', label: 'Lipase', jmlL: 195, jmlP: 178, nilaiL: 40, nilaiP: 36 },
  { no: '2.22', label: 'Cholinesterase', jmlL: 120, jmlP: 110, nilaiL: 7, nilaiP: 7 },
  { no: '2.23', label: 'CK Total - CK MB', jmlL: 280, jmlP: 220, nilaiL: 95, nilaiP: 72 },
  { no: '2.24', label: 'SI/TIBC', jmlL: 150, jmlP: 210, nilaiL: 90, nilaiP: 75 },
  { no: '2.25', label: 'Elektrolit Darah (Na, K, Cl, Ca, Mg, P)', jmlL: 1250, jmlP: 1180, nilaiL: 4, nilaiP: 4 },
  { no: '2.26', label: 'Analisa Gas Darah', jmlL: 580, jmlP: 490, nilaiL: 7, nilaiP: 7 },

  { no: 3, label: 'Imunologi Klinik', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '3.1', label: 'Widal', jmlL: 430, jmlP: 390, nilaiL: 1, nilaiP: 1 },
  { no: '3.2', label: 'Antibodi anti SARS-CoV-2', jmlL: 280, jmlP: 310, nilaiL: 2, nilaiP: 2 },
  { no: '3.3', label: 'Antigen SARS-CoV-2', jmlL: 350, jmlP: 380, nilaiL: 1, nilaiP: 1 },
  { no: '3.4', label: 'Dengue IgG-IgM', jmlL: 510, jmlP: 480, nilaiL: 2, nilaiP: 2 },
  { no: '3.5', label: 'HBs Ag', jmlL: 620, jmlP: 590, nilaiL: 1, nilaiP: 1 },
  { no: '3.6', label: 'Anti HBs', jmlL: 380, jmlP: 420, nilaiL: 15, nilaiP: 12 },
  { no: '3.7', label: 'Anti HBc', jmlL: 270, jmlP: 260, nilaiL: 1, nilaiP: 1 },
  { no: '3.8', label: 'Anti HBe', jmlL: 140, jmlP: 130, nilaiL: 1, nilaiP: 1 },
  { no: '3.9', label: 'Hbe Ag', jmlL: 130, jmlP: 120, nilaiL: 1, nilaiP: 1 },
  { no: '3.10', label: 'Anti HCV', jmlL: 310, jmlP: 290, nilaiL: 1, nilaiP: 1 },
  { no: '3.11', label: 'IgM Anti HAV', jmlL: 185, jmlP: 170, nilaiL: 1, nilaiP: 1 },
  { no: '3.12', label: 'Anti HIV', jmlL: 450, jmlP: 420, nilaiL: 1, nilaiP: 1 },
  { no: '3.13', label: 'NS1 (non structure antigen) Dengue', jmlL: 460, jmlP: 430, nilaiL: 2, nilaiP: 2 },
  { no: '3.14', label: 'Tes Antigen Malaria', jmlL: 220, jmlP: 190, nilaiL: 1, nilaiP: 1 },
  { no: '3.15', label: 'T3/T4 total', jmlL: 180, jmlP: 340, nilaiL: 8, nilaiP: 7 },
  { no: '3.16', label: 'FT3/FT4', jmlL: 175, jmlP: 330, nilaiL: 3, nilaiP: 2 },
  { no: '3.17', label: 'TSH', jmlL: 210, jmlP: 390, nilaiL: 2, nilaiP: 2 },

  { no: 4, label: 'Urinalisis dan analisis cairan', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '4.1', label: 'Protein/albumin', jmlL: 680, jmlP: 720, nilaiL: 15, nilaiP: 18 },
  { no: '4.2', label: 'Urobilinogen', jmlL: 450, jmlP: 470, nilaiL: 1, nilaiP: 1 },
  { no: '4.3', label: 'Bilirubin', jmlL: 420, jmlP: 440, nilaiL: 1, nilaiP: 1 },
  { no: '4.4', label: 'Sedimen Urine', jmlL: 760, jmlP: 810, nilaiL: 5, nilaiP: 4 },
  { no: '4.5', label: 'NAPZA Skrining', jmlL: 310, jmlP: 180, nilaiL: 1, nilaiP: 1 },

  { no: 5, label: 'Hemostasis', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '5.1', label: 'Masa perdarahan', jmlL: 320, jmlP: 290, nilaiL: 3, nilaiP: 3 },
  { no: '5.2', label: 'Masa pembekuan', jmlL: 310, jmlP: 280, nilaiL: 7, nilaiP: 7 },
  { no: '5.3', label: 'Masa prothrombin plasma', jmlL: 480, jmlP: 440, nilaiL: 12, nilaiP: 12 },
  { no: '5.4', label: 'Masa tromboplastin partial teraktivasi', jmlL: 470, jmlP: 430, nilaiL: 30, nilaiP: 30 },
  { no: '5.5', label: 'Masa thrombin', jmlL: 180, jmlP: 170, nilaiL: 14, nilaiP: 14 },
  { no: '5.6', label: 'Fibrinogen', jmlL: 220, jmlP: 210, nilaiL: 280, nilaiP: 270 },
  { no: '5.7', label: 'D-dimer', jmlL: 390, jmlP: 360, nilaiL: 520, nilaiP: 490 },
  { no: '5.8', label: 'Lupus anticoagulant', jmlL: 95, jmlP: 145, nilaiL: 1, nilaiP: 1 },

  // ── SEKSI B ──
  { no: 'B', label: 'MIKROBIOLOGI KLINIK', isSection: true, blackNilai: true },

  { no: 6, label: 'Pemeriksaan dahak mikroskopis TBC Bakteri Tahan Asam (Mycobacterium tuberkulosis)', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '6.1', label: 'Negatif', blackNilai: true, jmlL: 285, jmlP: 210 },
  { no: '6.2', label: '1-9', blackNilai: true, jmlL: 42, jmlP: 31 },
  { no: '6.3', label: '1+', blackNilai: true, jmlL: 68, jmlP: 47 },
  { no: '6.4', label: '2+', blackNilai: true, jmlL: 35, jmlP: 24 },
  { no: '6.5', label: '3+', blackNilai: true, jmlL: 18, jmlP: 12 },
  { no: '6.6', label: 'Tidak Dilakukan', blackNilai: true, jmlL: 52, jmlP: 38 },

  { no: 7, label: 'Biakan dan identifikasi bakteri aerob, serta uji kepekaan terhadap antibiotik', isHeader: true, jmlL: 310, jmlP: 240, nilaiL: 3, nilaiP: 3 },
  { no: 8, label: 'Biakan virus dan uji kepekaan terhadap antivirus', isHeader: true, jmlL: 85, jmlP: 72, nilaiL: 5, nilaiP: 5 },
  { no: 9, label: 'Biakan dan identifikasi M. tuberculosis dan uji kepekaan terhadap OAT', isHeader: true, jmlL: 145, jmlP: 98, nilaiL: 7, nilaiP: 7 },

  { no: 10, label: 'Pemeriksaan berbasis molekuler untuk deteksi virus DNA dan RNA terutama virus Influenza, SARS-CoV 1 dan 2, HIV', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '10.1', label: 'PCR', jmlL: 380, jmlP: 350, nilaiL: 1, nilaiP: 1 },
  { no: '10.2', label: 'Real time PCR', jmlL: 290, jmlP: 270, nilaiL: 1, nilaiP: 1 },
  { no: '10.3', label: 'Tes Cepat Molekuler', jmlL: 420, jmlP: 400, nilaiL: 1, nilaiP: 1 },
  { no: '10.4', label: 'Hibridisasi', jmlL: 55, jmlP: 48, nilaiL: 2, nilaiP: 2 },
  { no: '10.5', label: 'Sekuensing', jmlL: 28, jmlP: 22, nilaiL: 3, nilaiP: 3 },
  { no: '10.6', label: 'Metode lainnya', jmlL: 42, jmlP: 36, nilaiL: 2, nilaiP: 2 },

  { no: 11, label: 'Pemeriksaan Tes Cepat Molekuler (TCM) untuk TBC dan TBC Resistan Obat (RO)', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '11.1', label: 'Negatif', blackNilai: true, jmlL: 195, jmlP: 142 },
  { no: '11.2', label: 'Rif Sen', blackNilai: true, jmlL: 58, jmlP: 42 },
  { no: '11.3', label: 'Rif Res', blackNilai: true, jmlL: 22, jmlP: 15 },
  { no: '11.4', label: 'Rif Indet', blackNilai: true, jmlL: 12, jmlP: 8 },
  { no: '11.5', label: 'Invalid', blackNilai: true, jmlL: 8, jmlP: 5 },
  { no: '11.6', label: 'Error', blackNilai: true, jmlL: 5, jmlP: 4 },
  { no: '11.7', label: 'No Result', blackNilai: true, jmlL: 6, jmlP: 4 },
  { no: '11.8', label: 'Tidak Dilakukan', blackNilai: true, jmlL: 18, jmlP: 14 },

  { no: 12, label: 'Pemeriksaan berbasis molekuler untuk deteksi bakteri aerob, anaerob dan bakteri fastidious lainnya', isHeader: true, jmlL: 0, jmlP: 0 },
  { no: '12.1', label: 'PCR', jmlL: 98, jmlP: 82, nilaiL: 1, nilaiP: 1 },
  { no: '12.2', label: 'Real time PCR', jmlL: 75, jmlP: 64, nilaiL: 1, nilaiP: 1 },
  { no: '12.3', label: 'Tes Cepat Molekuler', jmlL: 110, jmlP: 95, nilaiL: 1, nilaiP: 1 },
  { no: '12.4', label: 'Hibridisasi', jmlL: 18, jmlP: 15, nilaiL: 2, nilaiP: 2 },
  { no: '12.5', label: 'Sekuensing', jmlL: 10, jmlP: 8, nilaiL: 3, nilaiP: 3 },
  { no: '12.6', label: 'Metode lainnya', jmlL: 14, jmlP: 12, nilaiL: 2, nilaiP: 2 },

  { no: 13, label: 'Pemeriksaan berbasis molekuler untuk deteksi gen pengkode resistensi antimikroba', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '13.1', label: 'PCR', jmlL: 65, jmlP: 52, nilaiL: 1, nilaiP: 1 },
  { no: '13.2', label: 'Real time PCR', jmlL: 48, jmlP: 38, nilaiL: 1, nilaiP: 1 },
  { no: '13.3', label: 'Tes Cepat Molekuler', jmlL: 72, jmlP: 58, nilaiL: 1, nilaiP: 1 },
  { no: '13.4', label: 'Hibridisasi', jmlL: 12, jmlP: 9, nilaiL: 2, nilaiP: 2 },
  { no: '13.5', label: 'Sekuensing', jmlL: 8, jmlP: 6, nilaiL: 3, nilaiP: 3 },
  { no: '13.6', label: 'Metode lainnya', jmlL: 10, jmlP: 8, nilaiL: 2, nilaiP: 2 },

  { no: 14, label: 'Pemeriksaan berbasis molekuler untuk deteksi jamur', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '14.1', label: 'PCR', jmlL: 42, jmlP: 38, nilaiL: 1, nilaiP: 1 },
  { no: '14.2', label: 'Real time PCR', jmlL: 35, jmlP: 31, nilaiL: 1, nilaiP: 1 },
  { no: '14.3', label: 'Tes Cepat Molekuler', jmlL: 52, jmlP: 45, nilaiL: 1, nilaiP: 1 },
  { no: '14.4', label: 'Hibridisasi', jmlL: 8, jmlP: 7, nilaiL: 2, nilaiP: 2 },
  { no: '14.5', label: 'Sekuensing', jmlL: 5, jmlP: 4, nilaiL: 3, nilaiP: 3 },
  { no: '14.6', label: 'Metode lainnya', jmlL: 7, jmlP: 6, nilaiL: 2, nilaiP: 2 },

  // ── SEKSI C ──
  { no: 'C', label: 'PARASITOLOGI KLINIK', isSection: true, blackNilai: true },

  { no: 15, label: 'Pemeriksaan Mikroskopis', isHeader: true, blackNilai: true, jmlL: 0, jmlP: 0 },
  { no: '15.1', label: 'Identifikasi cacing, larva/proglottid', blackNilai: true, jmlL: 120, jmlP: 98 },
  { no: '15.2', label: 'Identifikasi arthropoda (tuma, tungau, pinjal, kutu, arachnida, crustacea)', blackNilai: true, jmlL: 65, jmlP: 54 },
  { no: '15.3', label: 'Identifikasi nyamuk, larva nyamuk', blackNilai: true, jmlL: 48, jmlP: 41 },
  { no: '15.4', label: 'Identifikasi lalat dan larva lalat', blackNilai: true, jmlL: 32, jmlP: 28 },

  { no: 16, label: 'Pemeriksaan Jamur', isHeader: true, jmlL: 0, jmlP: 0 },
  { no: '16.1', label: 'Pemeriksaan langsung KOH', jmlL: 185, jmlP: 210, nilaiL: 1, nilaiP: 1 },
  { no: '16.2', label: 'Pemeriksaan langsung LPCB/tinta India', jmlL: 72, jmlP: 65, nilaiL: 1, nilaiP: 1 },
  { no: '16.3', label: 'Pemeriksaan jamur dengan pulasan khusus', jmlL: 58, jmlP: 52, nilaiL: 1, nilaiP: 1 },
  { no: '16.4', label: 'Kultur dan identifikasi jamur dari spesimen kulit, rambut, kuku, mukosa, cairan tubuh', jmlL: 145, jmlP: 130, nilaiL: 7, nilaiP: 7 },
  { no: '16.5', label: 'Identifikasi jamur dari biakan', jmlL: 98, jmlP: 85, nilaiL: 5, nilaiP: 5 },
  { no: '16.6', label: 'Uji kepekaan jamur ragi (manual/semiotomatis)', jmlL: 62, jmlP: 55, nilaiL: 3, nilaiP: 3 },
  { no: '16.7', label: 'Uji kepekaan jamur kapang (manual)', jmlL: 38, jmlP: 32, nilaiL: 4, nilaiP: 4 },

  // ── SEKSI D ──
  { no: 'D', label: 'PATOLOGI ANATOMI', isSection: true },

  { no: 17, label: 'Pemeriksaan tindakan biopsi aspirasi jarum halus dan/ atau tindakan kedokteran lainnya', isHeader: true, jmlL: 280, jmlP: 320, nilaiL: 1, nilaiP: 1 },

  { no: 18, label: 'Pemeriksaan Sitopatologi', isHeader: true, jmlL: 0, jmlP: 0 },
  { no: '18.1', label: 'Pemeriksaan Pap\'s Smear', jmlL: 0, jmlP: 520, nilaiL: 0, nilaiP: 1 },
  { no: '18.2', label: 'Pemeriksaan sitologi apus non ginekologi', jmlL: 145, jmlP: 168, nilaiL: 1, nilaiP: 1 },
  { no: '18.3', label: 'Pemeriksaan sitologi cairan', jmlL: 98, jmlP: 112, nilaiL: 1, nilaiP: 1 },

  { no: 19, label: 'Pemeriksaan Histopatologi', isHeader: true, jmlL: 0, jmlP: 0 },
  { no: '19.1', label: 'Pemeriksaan jaringan kecil', jmlL: 420, jmlP: 480, nilaiL: 7, nilaiP: 7 },
  { no: '19.2', label: 'Pemeriksaan jaringan sedang', jmlL: 280, jmlP: 310, nilaiL: 10, nilaiP: 10 },
  { no: '19.3', label: 'Pemeriksaan jaringan besar', jmlL: 95, jmlP: 108, nilaiL: 14, nilaiP: 14 },

  { no: 20, label: 'Pemeriksaan Imunopatologi', isHeader: true, jmlL: 0, jmlP: 0 },
  { no: '20.1', label: 'Pemeriksaan imunohistokimia Payudara', jmlL: 28, jmlP: 95, nilaiL: 5, nilaiP: 5 },
  { no: '20.2', label: 'Pemeriksaan imunohistokimia Limfoma', jmlL: 38, jmlP: 32, nilaiL: 5, nilaiP: 5 },
  { no: '20.3', label: 'Pemeriksaan imunohistokimia lanjutan (limfoma lanjut, kasus sulit, GIST, PD-L1, ALK, dll)', jmlL: 22, jmlP: 18, nilaiL: 7, nilaiP: 7 },
  { no: '20.4', label: 'Pemeriksaan imunositokimia', jmlL: 45, jmlP: 50, nilaiL: 4, nilaiP: 4 },
  { no: '20.5', label: 'Pemeriksaan imunofluoresensi (deteksi auto antibodi, deteksi komplek imun pada jaringan kulit dan ginjal, dll)', jmlL: 18, jmlP: 22, nilaiL: 3, nilaiP: 3 },

  { no: 21, label: 'Pemeriksaan Patologi Molekuler', isHeader: true, jmlL: 0, jmlP: 0 },
  { no: '21.1', label: 'Deteksi mutasi EGFR', jmlL: 52, jmlP: 48, nilaiL: 3, nilaiP: 3 },
  { no: '21.2', label: 'Deteksi mutasi all-RAS', jmlL: 35, jmlP: 30, nilaiL: 3, nilaiP: 3 },
  { no: '21.3', label: 'Deteksi mutasi BRAF', jmlL: 28, jmlP: 25, nilaiL: 3, nilaiP: 3 },
  { no: '21.4', label: 'Deteksi HPV Genotyping', jmlL: 12, jmlP: 58, nilaiL: 2, nilaiP: 2 },
  { no: '21.5', label: 'ISH', jmlL: 18, jmlP: 22, nilaiL: 2, nilaiP: 2 },
  { no: '21.6', label: 'CISH', jmlL: 14, jmlP: 16, nilaiL: 2, nilaiP: 2 },
  { no: '21.7', label: 'FISH', blackNilai: true, jmlL: 20, jmlP: 18 },

  { no: 22, label: 'Pemeriksaan Potong Beku', isHeader: true, blackNilai: true, jmlL: 45, jmlP: 38 },
  { no: 23, label: 'Pemeriksaan Otopsi Klinik', isHeader: true, blackNilai: true, jmlL: 12, jmlP: 5 },
]

export default function LaboratoriumPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kegiatan Pelayanan Laboratorium (RL 3.8)</h1>
            <p className="text-sm text-slate-500">Jumlah dan nilai rata-rata pemeriksaan — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/reports/RL3.8.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
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
                <th rowSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 w-12">No.</th>
                <th rowSpan={2} className="border border-slate-300 px-3 py-2 text-left font-bold text-slate-600 min-w-[260px]">Pemeriksaan</th>
                <th colSpan={2} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Jumlah Pemeriksaan</th>
                <th colSpan={2} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Nilai Rata-Rata Pemeriksaan</th>
              </tr>
              {/* Row 2 */}
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[60px]">Laki-laki</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[60px]">Perempuan</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[60px]">Laki-laki</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[60px]">Perempuan</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                if (row.isSection) {
                  return (
                    <tr key={row.no} className="bg-indigo-700">
                      <td className="border border-indigo-600 px-2 py-1.5 text-center font-bold text-white">{row.no}</td>
                      <td colSpan={4} className="border border-indigo-600 px-3 py-1.5 font-bold text-white uppercase tracking-wide">{row.label}</td>
                    </tr>
                  )
                }

                const isHeader = row.isHeader
                const bn = row.blackNilai

                return (
                  <tr
                    key={`${row.no}`}
                    className={isHeader ? 'bg-slate-50' : 'hover:bg-indigo-50/20 transition-colors'}
                  >
                    <td className={`border border-slate-200 px-2 py-1.5 text-center ${isHeader ? 'font-bold text-slate-700' : 'text-slate-500'}`}>
                      {row.no}
                    </td>
                    <td className={`border border-slate-200 px-3 py-1.5 ${isHeader ? 'font-bold text-slate-800' : 'text-slate-700'}`}>
                      {row.label}
                    </td>
                    <Td value={row.jmlL ?? 0} />
                    <Td value={row.jmlP ?? 0} />
                    {bn ? <BlackCell /> : <Td value={row.nilaiL ?? 0} />}
                    {bn ? <BlackCell /> : <Td value={row.nilaiP ?? 0} />}
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
