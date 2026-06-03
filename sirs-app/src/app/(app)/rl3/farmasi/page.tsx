'use client'

import { infoRS } from '@/lib/dummy-data'
import { Pill, FileText, Filter } from 'lucide-react'

const ROWS = [
  { no: 1, label: 'Obat Generik Formularium Nasional',          jumlahItem: 485,  tersedia: 462  },
  { no: 2, label: 'Obat Generik Non Formularium Nasional',      jumlahItem: 210,  tersedia: 185  },
  { no: 3, label: 'Obat Non Generik Formularium Nasional',      jumlahItem: 320,  tersedia: 298  },
  { no: 4, label: 'Obat Non Generik Non Formularium Nasional',  jumlahItem: 145,  tersedia: 112  },
]

const totalItem     = ROWS.reduce((s, r) => s + r.jumlahItem, 0)
const totalTersedia = ROWS.reduce((s, r) => s + r.tersedia, 0)

export default function FarmasiPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-green-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kegiatan Pelayanan Farmasi RS - Pengadaan Obat (RL 3.17)</h1>
            <p className="text-sm text-slate-500">Jumlah item obat berdasarkan golongan — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.17.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-2xl">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600 w-14">No</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600">Golongan Obat</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-36">Jumlah Item Obat</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-48">Jumlah Item Obat Yang Tersedia Di Rumah Sakit</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.no} className="hover:bg-green-50/20 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-500">{row.no}</td>
                <td className="border border-slate-200 px-4 py-2 text-slate-700">{row.label}</td>
                <td className="border border-slate-200 px-4 py-2 text-center font-mono text-slate-700">{row.jumlahItem.toLocaleString('id')}</td>
                <td className="border border-slate-200 px-4 py-2 text-center font-mono text-slate-700">{row.tersedia.toLocaleString('id')}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <td className="border border-slate-300 px-3 py-2 text-center text-slate-600">99</td>
              <td className="border border-slate-300 px-4 py-2 text-slate-800 font-bold">Total</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-800 font-bold">{totalItem.toLocaleString('id')}</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-800 font-bold">{totalTersedia.toLocaleString('id')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
