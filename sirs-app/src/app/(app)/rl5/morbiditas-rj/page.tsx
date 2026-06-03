'use client'

import { infoRS } from '@/lib/dummy-data'
import { ClipboardList, FileText, Filter } from 'lucide-react'

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
type AgeLPMap = Record<AgeKey, [number, number]>

function makeAges(vals: Partial<Record<AgeKey, [number, number]>>): AgeLPMap {
  const base = Object.fromEntries(AGE_GROUPS.map(g => [g.key, [0, 0]])) as AgeLPMap
  return { ...base, ...vals }
}

type Row = {
  kode: string
  diagnosis: string
  ages: AgeLPMap
  kasusL: number; kasusP: number
  kunjunganL: number; kunjunganP: number
}

const ROWS: Row[] = [
  {
    kode: 'I10', diagnosis: 'Essential (primary) hypertension',
    ages: makeAges({ a13:[4,6], a14:[6,8], a15:[10,14], a16:[15,18], a17:[18,20], a18:[16,18], a19:[12,14], a20:[8,10] }),
    kasusL: 89, kasusP: 108, kunjunganL: 245, kunjunganP: 298,
  },
  {
    kode: 'E11.9', diagnosis: 'Type 2 diabetes mellitus without complications',
    ages: makeAges({ a13:[3,5], a14:[5,7], a15:[8,10], a16:[12,15], a17:[14,16], a18:[12,14], a19:[8,10], a20:[5,6] }),
    kasusL: 67, kasusP: 83, kunjunganL: 185, kunjunganP: 220,
  },
  {
    kode: 'J06.9', diagnosis: 'Acute upper respiratory infection, unspecified',
    ages: makeAges({ a4:[4,4], a5:[5,5], a6:[6,6], a7:[8,8], a8:[6,5], a9:[4,4], a10:[5,5], a11:[6,7], a12:[5,6] }),
    kasusL: 49, kasusP: 50, kunjunganL: 52, kunjunganP: 54,
  },
  {
    kode: 'K29.7', diagnosis: 'Gastritis, unspecified',
    ages: makeAges({ a9:[2,3], a10:[4,5], a11:[6,8], a12:[8,10], a13:[7,9], a14:[6,7], a15:[5,6], a16:[4,5] }),
    kasusL: 42, kasusP: 53, kunjunganL: 65, kunjunganP: 78,
  },
  {
    kode: 'M54.5', diagnosis: 'Low back pain',
    ages: makeAges({ a12:[3,5], a13:[5,8], a14:[8,10], a15:[10,12], a16:[9,11], a17:[8,9], a18:[6,7], a19:[4,5] }),
    kasusL: 53, kasusP: 67, kunjunganL: 98, kunjunganP: 118,
  },
  {
    kode: 'J45.9', diagnosis: 'Asthma, unspecified',
    ages: makeAges({ a5:[2,2], a6:[3,2], a7:[4,3], a8:[5,4], a9:[4,3], a14:[4,4], a15:[5,5], a16:[4,4] }),
    kasusL: 31, kasusP: 27, kunjunganL: 68, kunjunganP: 62,
  },
  {
    kode: 'A01.0', diagnosis: 'Typhoid fever',
    ages: makeAges({ a8:[3,2], a9:[4,3], a10:[5,4], a11:[6,5], a12:[4,4], a13:[3,3] }),
    kasusL: 25, kasusP: 21, kunjunganL: 28, kunjunganP: 24,
  },
  {
    kode: 'L30.9', diagnosis: 'Dermatitis, unspecified',
    ages: makeAges({ a7:[2,3], a8:[3,3], a9:[4,4], a10:[4,5], a11:[5,5], a12:[4,5], a13:[3,4] }),
    kasusL: 25, kasusP: 29, kunjunganL: 38, kunjunganP: 42,
  },
  {
    kode: 'H10.9', diagnosis: 'Conjunctivitis, unspecified',
    ages: makeAges({ a7:[2,2], a8:[3,2], a9:[3,3], a10:[2,2], a11:[2,3], a15:[2,2], a16:[2,3] }),
    kasusL: 16, kasusP: 17, kunjunganL: 18, kunjunganP: 19,
  },
  {
    kode: 'N39.0', diagnosis: 'Urinary tract infection, site not specified',
    ages: makeAges({ a10:[0,3], a11:[0,5], a12:[0,8], a13:[0,7], a14:[0,6], a15:[0,5], a16:[1,4], a17:[1,3] }),
    kasusL: 2, kasusP: 41, kunjunganL: 4, kunjunganP: 58,
  },
]

export default function MorbiditasRJPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Kompilasi Morbiditas Pasien Rawat Jalan (RL 5.1)</h1>
            <p className="text-sm text-slate-500">Data diagnosis per ICD-10, kelompok umur &amp; jenis kelamin — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL5.1.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="text-[9px] border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[58px] sticky left-0 bg-slate-100 z-10">Kode ICD</th>
                <th rowSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[140px] sticky left-[58px] bg-slate-100 z-10">Diagnosis Penyakit</th>
                <th colSpan={50} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">
                  Jumlah Kasus Baru Menurut Kelompok Umur &amp; Jenis Kelamin
                </th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[90px]">Jumlah Kasus Baru Menurut Jenis Kelamin</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[90px]">Jumlah Kunjungan</th>
              </tr>
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
                  <td className="border border-slate-200 px-2 py-1.5 text-slate-700 sticky left-[58px] bg-white z-10">{row.diagnosis}</td>
                  {AGE_GROUPS.map(g => {
                    const [l, p] = row.ages[g.key]
                    return (
                      <>
                        <td key={`${g.key}-L`} className={`border border-slate-200 px-1 py-1.5 text-center ${l > 0 ? 'text-blue-700 font-semibold' : 'text-slate-300'}`}>{l > 0 ? l : ''}</td>
                        <td key={`${g.key}-P`} className={`border border-slate-200 px-1 py-1.5 text-center ${p > 0 ? 'text-pink-600 font-semibold' : 'text-slate-300'}`}>{p > 0 ? p : ''}</td>
                      </>
                    )
                  })}
                  <td className="border border-slate-200 px-1 py-1.5 text-center text-blue-700 font-bold">{row.kasusL}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center text-pink-600 font-bold">{row.kasusP}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center font-bold text-slate-800 bg-slate-50">{row.kasusL + row.kasusP}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center text-slate-600 font-semibold">{row.kunjunganL}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center text-slate-600 font-semibold">{row.kunjunganP}</td>
                  <td className="border border-slate-200 px-1 py-1.5 text-center font-bold text-slate-800 bg-slate-50">{row.kunjunganL + row.kunjunganP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 text-[10px] text-slate-500 border-t border-slate-100 italic">
          *) L = Laki-laki, P = Perempuan &nbsp;&nbsp; **) hr = hari, bln = bulan, th = tahun
        </div>
      </div>
    </div>
  )
}
