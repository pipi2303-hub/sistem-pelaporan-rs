'use client'

import { infoRS } from '@/lib/dummy-data'
import { Brain, FileText, Filter } from 'lucide-react'

const ROWS = [
  { no: 1, label: 'Pemeriksaan Psikiatri',              lakiLaki: 185, perempuan: 142 },
  { no: 2, label: 'Penatalaksanaan Medikamentosa',      lakiLaki: 210, perempuan: 178 },
  { no: 3, label: 'Psikoterapi',                        lakiLaki: 120, perempuan: 145 },
  { no: 4, label: 'Konseling',                          lakiLaki: 95,  perempuan: 132 },
  { no: 5, label: 'Elektro Medik',                      lakiLaki: 48,  perempuan: 35  },
  { no: 6, label: 'Terapi Perilaku',                    lakiLaki: 72,  perempuan: 88  },
  { no: 7, label: 'Rehabilitasi Medik Psikiatrik',      lakiLaki: 65,  perempuan: 58  },
  { no: 8, label: 'Assessment',                         lakiLaki: 88,  perempuan: 102 },
]

const totalL = ROWS.reduce((s, r) => s + r.lakiLaki, 0)
const totalP = ROWS.reduce((s, r) => s + r.perempuan, 0)
const grandTotal = totalL + totalP

export default function KesehatanJiwaPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kegiatan Pelayanan Kesehatan Jiwa (RL 3.15)</h1>
            <p className="text-sm text-slate-500">Jumlah kegiatan pelayanan kesehatan jiwa — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.15.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-xl">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600 w-14">No.</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600">Jenis Kegiatan</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-28">Laki-laki</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-28">Perempuan</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-28">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.no} className="hover:bg-purple-50/20 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-500">{row.no}</td>
                <td className="border border-slate-200 px-4 py-2 text-slate-700">{row.label}</td>
                <td className="border border-slate-200 px-4 py-2 text-center font-mono text-slate-700">{row.lakiLaki.toLocaleString('id')}</td>
                <td className="border border-slate-200 px-4 py-2 text-center font-mono text-slate-700">{row.perempuan.toLocaleString('id')}</td>
                <td className="border border-slate-200 px-4 py-2 text-center font-semibold text-slate-800 bg-slate-50">{(row.lakiLaki + row.perempuan).toLocaleString('id')}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <td className="border border-slate-300 px-3 py-2 text-center text-slate-600">99</td>
              <td className="border border-slate-300 px-4 py-2 text-slate-800 font-bold">TOTAL</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-blue-700">{totalL.toLocaleString('id')}</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-blue-700">{totalP.toLocaleString('id')}</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-800 font-bold">{grandTotal.toLocaleString('id')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
