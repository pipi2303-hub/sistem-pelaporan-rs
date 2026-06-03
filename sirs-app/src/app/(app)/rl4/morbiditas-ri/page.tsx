'use client'

import { infoRS } from '@/lib/dummy-data'
import { Microscope, FileText, Filter } from 'lucide-react'

// Age group labels and keys
const AGE_GROUPS = [
  { label: '<1 jam',      key: 'a0'  },
  { label: '1-23 jam',   key: 'a1'  },
  { label: '1-7 hr',     key: 'a2'  },
  { label: '8-28 hr',    key: 'a3'  },
  { label: '29hr–<3bln', key: 'a4'  },
  { label: '3-<6 bln',   key: 'a5'  },
  { label: '6-11 bln',   key: 'a6'  },
  { label: '1-4 th',     key: 'a7'  },
  { label: '5-9 th',     key: 'a8'  },
  { label: '10-14 th',   key: 'a9'  },
  { label: '15-19 th',   key: 'a10' },
  { label: '20-24 th',   key: 'a11' },
  { label: '25-29 th',   key: 'a12' },
  { label: '30-34 th',   key: 'a13' },
  { label: '35-39 th',   key: 'a14' },
  { label: '40-44 th',   key: 'a15' },
  { label: '45-49 th',   key: 'a16' },
  { label: '50-54 th',   key: 'a17' },
  { label: '55-59 th',   key: 'a18' },
  { label: '60-64 th',   key: 'a19' },
  { label: '65-69 th',   key: 'a20' },
  { label: '70-74 th',   key: 'a21' },
  { label: '75-79 th',   key: 'a22' },
  { label: '80-84 th',   key: 'a23' },
  { label: '≥85',        key: 'a24' },
] as const

type AgeKey = typeof AGE_GROUPS[number]['key']
type AgeLPMap = Record<AgeKey, [number, number]> // [L, P]

type Row = {
  kode: string
  diagnosis: string
  ages: AgeLPMap
  totalHidupL: number; totalHidupP: number
  matiL: number; matiP: number
}

function makeAges(vals: Partial<Record<AgeKey, [number, number]>>): AgeLPMap {
  const base = Object.fromEntries(AGE_GROUPS.map(g => [g.key, [0, 0]])) as AgeLPMap
  return { ...base, ...vals }
}

const ROWS: Row[] = [
  {
    kode: 'A01.0', diagnosis: 'Typhoid fever',
    ages: makeAges({ a11:[2,3], a12:[3,4], a13:[2,3], a14:[3,2], a15:[4,3], a16:[3,4], a17:[2,3] }),
    totalHidupL: 19, totalHidupP: 22, matiL: 0, matiP: 0,
  },
  {
    kode: 'A15.0', diagnosis: 'Tuberculosis of lung',
    ages: makeAges({ a8:[1,0], a9:[2,1], a10:[3,2], a14:[4,3], a15:[5,4], a16:[6,4], a17:[5,3], a18:[4,2], a19:[3,2] }),
    totalHidupL: 33, totalHidupP: 21, matiL: 2, matiP: 1,
  },
  {
    kode: 'E11.9', diagnosis: 'Type 2 diabetes mellitus without complications',
    ages: makeAges({ a13:[2,3], a14:[4,5], a15:[6,7], a16:[8,9], a17:[9,8], a18:[7,6], a19:[5,4], a20:[3,2] }),
    totalHidupL: 44, totalHidupP: 44, matiL: 1, matiP: 1,
  },
  {
    kode: 'I10', diagnosis: 'Essential (primary) hypertension',
    ages: makeAges({ a14:[3,4], a15:[5,6], a16:[8,9], a17:[10,12], a18:[9,11], a19:[7,8], a20:[5,6], a21:[3,4] }),
    totalHidupL: 50, totalHidupP: 60, matiL: 1, matiP: 0,
  },
  {
    kode: 'I21.9', diagnosis: 'Acute myocardial infarction, unspecified',
    ages: makeAges({ a15:[3,1], a16:[5,2], a17:[7,3], a18:[6,3], a19:[4,2], a20:[3,1] }),
    totalHidupL: 28, totalHidupP: 12, matiL: 4, matiP: 2,
  },
  {
    kode: 'J18.9', diagnosis: 'Pneumonia, unspecified organism',
    ages: makeAges({ a0:[2,2], a1:[3,2], a2:[4,3], a3:[2,2], a4:[1,1], a7:[3,2], a8:[2,2], a17:[4,3], a18:[5,4], a19:[4,3] }),
    totalHidupL: 30, totalHidupP: 24, matiL: 2, matiP: 1,
  },
  {
    kode: 'K35.8', diagnosis: 'Acute appendicitis',
    ages: makeAges({ a8:[2,1], a9:[4,3], a10:[5,4], a11:[6,5], a12:[4,4], a13:[3,3] }),
    totalHidupL: 24, totalHidupP: 20, matiL: 0, matiP: 0,
  },
  {
    kode: 'N18.5', diagnosis: 'Chronic kidney disease, stage 5',
    ages: makeAges({ a14:[2,1], a15:[3,2], a16:[4,3], a17:[5,4], a18:[4,3], a19:[3,2] }),
    totalHidupL: 21, totalHidupP: 15, matiL: 3, matiP: 2,
  },
  {
    kode: 'O80', diagnosis: 'Encounter for full-term uncomplicated delivery',
    ages: makeAges({ a10:[0,8], a11:[0,15], a12:[0,18], a13:[0,12], a14:[0,8] }),
    totalHidupL: 0, totalHidupP: 61, matiL: 0, matiP: 0,
  },
  {
    kode: 'S06.3', diagnosis: 'Focal traumatic brain injury',
    ages: makeAges({ a7:[1,0], a8:[2,1], a9:[3,1], a10:[4,2], a11:[3,1], a15:[3,2], a16:[4,2], a17:[3,1] }),
    totalHidupL: 23, totalHidupP: 10, matiL: 2, matiP: 1,
  },
]

export default function MorbiditasRIPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Microscope className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Kompilasi Penyakit/Morbiditas Pasien Rawat Inap (RL 4.1)</h1>
            <p className="text-sm text-slate-500">Data diagnosis per ICD-10, kelompok umur &amp; jenis kelamin — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL4.1.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
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
          <table className="text-[9px] border-collapse">
            <thead>
              {/* Row 1 */}
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[60px] sticky left-0 bg-slate-100 z-10">Kode ICD</th>
                <th rowSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[140px] sticky left-[60px] bg-slate-100 z-10">Diagnosis Penyakit</th>
                <th colSpan={50} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">
                  Jumlah Pasien Keluar Hidup dan Mati Menurut Kelompok Umur &amp; Jenis Kelamin
                </th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[90px]">Jumlah Pasien Keluar Hidup dan Mati Menurut Jenis Kelamin</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[90px]">Jumlah Pasien Keluar Mati</th>
              </tr>
              {/* Row 2 — age group labels */}
              <tr className="bg-slate-100 border-b border-slate-200">
                {AGE_GROUPS.map(g => (
                  <th key={g.key} colSpan={2} className="border border-slate-200 px-1 py-1 text-center font-semibold text-slate-600 min-w-[44px] whitespace-nowrap">{g.label}</th>
                ))}
                <th rowSpan={2} className="border border-slate-200 px-1 py-1 text-center font-semibold text-slate-500 min-w-[22px]">L</th>
                <th rowSpan={2} className="border border-slate-200 px-1 py-1 text-center font-semibold text-slate-500 min-w-[22px]">P</th>
                <th rowSpan={2} className="border border-slate-200 px-1 py-1 text-center font-semibold text-slate-500 min-w-[30px]">Total</th>
                <th rowSpan={2} className="border border-slate-200 px-1 py-1 text-center font-semibold text-slate-500 min-w-[22px]">L</th>
                <th rowSpan={2} className="border border-slate-200 px-1 py-1 text-center font-semibold text-slate-500 min-w-[22px]">P</th>
                <th rowSpan={2} className="border border-slate-200 px-1 py-1 text-center font-semibold text-slate-500 min-w-[30px]">Total</th>
              </tr>
              {/* Row 3 — L/P per age group */}
              <tr className="bg-slate-50 border-b border-slate-300">
                {AGE_GROUPS.map(g => (
                  <>
                    <th key={`${g.key}-L`} className="border border-slate-200 px-1 py-1 text-center font-semibold text-slate-400 min-w-[20px]">L</th>
                    <th key={`${g.key}-P`} className="border border-slate-200 px-1 py-1 text-center font-semibold text-slate-400 min-w-[20px]">P</th>
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.kode} className="hover:bg-blue-50/30 transition-colors">
                  <td className="border border-slate-200 px-2 py-1.5 text-center font-mono font-bold text-blue-700 sticky left-0 bg-white z-10 whitespace-nowrap">{row.kode}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-slate-700 sticky left-[60px] bg-white z-10">{row.diagnosis}</td>
                  {AGE_GROUPS.map(g => {
                    const [l, p] = row.ages[g.key]
                    return (
                      <>
                        <td key={`${g.key}-L`} className={`border border-slate-200 px-1 py-1.5 text-center ${l > 0 ? 'text-blue-700 font-semibold' : 'text-slate-300'}`}>{l > 0 ? l : ''}</td>
                        <td key={`${g.key}-P`} className={`border border-slate-200 px-1 py-1.5 text-center ${p > 0 ? 'text-pink-600 font-semibold' : 'text-slate-300'}`}>{p > 0 ? p : ''}</td>
                      </>
                    )
                  })}
                  <td className="border border-slate-200 px-1 py-1.5 text-center text-blue-700 font-bold">{row.totalHidupL}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center text-pink-600 font-bold">{row.totalHidupP}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center font-bold text-slate-800 bg-slate-50">{row.totalHidupL + row.totalHidupP}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center text-red-600 font-bold">{row.matiL > 0 ? row.matiL : ''}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center text-red-500 font-bold">{row.matiP > 0 ? row.matiP : ''}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center font-bold text-red-700 bg-slate-50">{(row.matiL + row.matiP) > 0 ? row.matiL + row.matiP : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* footnote */}
        <div className="px-4 py-2 text-[10px] text-slate-500 border-t border-slate-100 italic">
          *) L = Laki-laki, P = Perempuan &nbsp;&nbsp; **) hr = hari, bln = bulan, th = tahun
        </div>
      </div>
    </div>
  )
}
