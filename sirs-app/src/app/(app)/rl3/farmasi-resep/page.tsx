'use client'

import { infoRS } from '@/lib/dummy-data'
import { Pill, FileText, Filter } from 'lucide-react'

const ROWS = [
  { no: 1, label: 'Obat Generik Formularium Nasional',          rj: 3850, igd: 1245, ri: 2680 },
  { no: 2, label: 'Obat Generik Non Formularium Nasional',      rj: 1420, igd: 420,  ri: 980  },
  { no: 3, label: 'Obat Non Generik Formularium Nasional',      rj: 2310, igd: 680,  ri: 1540 },
  { no: 4, label: 'Obat Non Generik Non Formularium Nasional',  rj: 895,  igd: 210,  ri: 620  },
]

const sumRJ  = ROWS.reduce((s, r) => s + r.rj, 0)
const sumIGD = ROWS.reduce((s, r) => s + r.igd, 0)
const sumRI  = ROWS.reduce((s, r) => s + r.ri, 0)

export default function FarmasiResepPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-teal-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kegiatan Pelayanan Farmasi Rumah Sakit - Resep (RL 3.18)</h1>
            <p className="text-sm text-slate-500">Jumlah resep berdasarkan golongan obat dan unit pelayanan — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.18.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
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
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-32">Rawat Jalan</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-24">IGD</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-32">Rawat Inap</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.no} className="hover:bg-teal-50/20 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-500">{row.no}</td>
                <td className="border border-slate-200 px-4 py-2 text-slate-700">{row.label}</td>
                <td className="border border-slate-200 px-4 py-2 text-center font-mono text-slate-700">{row.rj.toLocaleString('id')}</td>
                <td className="border border-slate-200 px-4 py-2 text-center font-mono text-slate-700">{row.igd.toLocaleString('id')}</td>
                <td className="border border-slate-200 px-4 py-2 text-center font-mono text-slate-700">{row.ri.toLocaleString('id')}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <td className="border border-slate-300 px-3 py-2 text-center text-slate-600">99</td>
              <td className="border border-slate-300 px-4 py-2 text-slate-800 font-bold">Total</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-blue-700">{sumRJ.toLocaleString('id')}</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-blue-700">{sumIGD.toLocaleString('id')}</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-blue-700">{sumRI.toLocaleString('id')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
