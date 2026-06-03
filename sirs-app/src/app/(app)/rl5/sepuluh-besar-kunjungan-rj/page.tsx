'use client'

import { infoRS } from '@/lib/dummy-data'
import { Trophy, FileText, Filter } from 'lucide-react'

const ROWS = [
  { no: 1,  icd: 'I10',   diagnosis: 'Essential (primary) hypertension',              kasusL: 850,  kasusP: 1020, kunjL: 2450,  kunjP: 2980  },
  { no: 2,  icd: 'E11.9', diagnosis: 'Type 2 diabetes mellitus without complications', kasusL: 620,  kasusP: 750,  kunjL: 1850,  kunjP: 2180  },
  { no: 3,  icd: 'M54.5', diagnosis: 'Low back pain',                                  kasusL: 420,  kasusP: 510,  kunjL: 895,   kunjP: 1050  },
  { no: 4,  icd: 'J45.9', diagnosis: 'Asthma, unspecified',                            kasusL: 385,  kasusP: 340,  kunjL: 820,   kunjP: 740   },
  { no: 5,  icd: 'J06.9', diagnosis: 'Acute upper respiratory infection, unspecified', kasusL: 680,  kasusP: 720,  kunjL: 720,   kunjP: 760   },
  { no: 6,  icd: 'N39.0', diagnosis: 'Urinary tract infection, site not specified',    kasusL: 120,  kasusP: 420,  kunjL: 145,   kunjP: 580   },
  { no: 7,  icd: 'K29.7', diagnosis: 'Gastritis, unspecified',                         kasusL: 480,  kasusP: 560,  kunjL: 680,   kunjP: 790   },
  { no: 8,  icd: 'I63.9', diagnosis: 'Cerebral infarction, unspecified',               kasusL: 245,  kasusP: 198,  kunjL: 580,   kunjP: 460   },
  { no: 9,  icd: 'L30.9', diagnosis: 'Dermatitis, unspecified',                        kasusL: 265,  kasusP: 298,  kunjL: 385,   kunjP: 420   },
  { no: 10, icd: 'A01.0', diagnosis: 'Typhoid fever',                                  kasusL: 310,  kasusP: 285,  kunjL: 345,   kunjP: 318   },
]

export default function SepuluhBesarKunjunganRJPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-blue-500" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">10 Besar Kunjungan Penyakit Rawat Jalan (RL 5.3)</h1>
            <p className="text-sm text-slate-500">Sepuluh besar kelompok diagnosis berdasarkan jumlah kunjungan rawat jalan — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL5.3.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={2} className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600 w-12">No.</th>
                <th rowSpan={2} className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600 min-w-[120px]">Kelompok ICD-10</th>
                <th rowSpan={2} className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600 min-w-[280px]">Kelompok Diagnosis Penyakit</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Jumlah Kasus Baru Menurut Jenis Kelamin</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Jumlah Kunjungan</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-20">L</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-20">P</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-24">Total</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-20">L</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-20">P</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.no} className="hover:bg-blue-50/20 transition-colors">
                  <td className="border border-slate-200 px-3 py-2 text-center text-slate-500">{row.no}</td>
                  <td className="border border-slate-200 px-4 py-2 font-mono font-bold text-blue-700">{row.icd}</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-700">{row.diagnosis}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center text-blue-700 font-semibold">{row.kasusL.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center text-pink-600 font-semibold">{row.kasusP.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center font-bold text-slate-800 bg-slate-50">{(row.kasusL + row.kasusP).toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center text-slate-600 font-semibold">{row.kunjL.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center text-slate-600 font-semibold">{row.kunjP.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center font-bold text-slate-800 bg-slate-50">{(row.kunjL + row.kunjP).toLocaleString('id')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
