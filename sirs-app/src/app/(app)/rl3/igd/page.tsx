'use client'

import { infoRS } from '@/lib/dummy-data'
import { Users, FileText, Filter } from 'lucide-react'

const pengunjungBaru = 3842
const pengunjungLama = 8215
const total = pengunjungBaru + pengunjungLama

export default function RekPengunjungPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Pengunjung (RL 3.4)</h1>
            <p className="text-sm text-slate-500">Pendaftaran (Admission) — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.4.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-md">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-16">No</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600">Jenis Pengunjung</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <td className="border border-slate-200 px-4 py-2 text-center text-slate-500">1</td>
              <td className="border border-slate-200 px-4 py-2 text-slate-700">Pengunjung Baru</td>
              <td className="border border-slate-200 px-4 py-2 text-center font-semibold text-blue-700">{pengunjungBaru.toLocaleString('id')}</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <td className="border border-slate-200 px-4 py-2 text-center text-slate-500">2</td>
              <td className="border border-slate-200 px-4 py-2 text-slate-700">Pengunjung Lama</td>
              <td className="border border-slate-200 px-4 py-2 text-center font-semibold text-slate-700">{pengunjungLama.toLocaleString('id')}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-600">99</td>
              <td className="border border-slate-300 px-4 py-2 text-slate-800 font-bold">TOTAL</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-800 font-bold">{total.toLocaleString('id')}</td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
}
