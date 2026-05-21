'use client'

import { useState } from 'react'
import { rawatInapPelayanan, infoRS } from '@/lib/dummy-data'
import { BedDouble, FileText, ChevronRight, Filter } from 'lucide-react'
import clsx from 'clsx'

export default function RawatInapPelayananPage() {
  const [data] = useState(rawatInapPelayanan)

  const totalAwal = data.reduce((s, r) => s + r.awal, 0)
  const totalMasuk = data.reduce((s, r) => s + r.masuk, 0)
  const totalKeluar = data.reduce((s, r) => s + r.keluarHidup + r.keluarMatiLt48 + r.keluarMatiGe48, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rawat Inap per Jenis Pelayanan (RL 3.2)</h1>
            <p className="text-sm text-slate-500">Rekapitulasi pasien masuk dan keluar — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pasien Awal</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{totalAwal}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pasien Masuk</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{totalMasuk}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pasien Keluar</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{totalKeluar}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-bold text-slate-600">JENIS PELAYANAN</th>
                <th className="px-3 py-3 text-center font-bold text-slate-600">AWAL</th>
                <th className="px-3 py-3 text-center font-bold text-slate-600">MASUK</th>
                <th className="px-3 py-3 text-center font-bold text-slate-600">HIDUP</th>
                <th className="px-3 py-3 text-center font-bold text-slate-600">MATI &lt;48j</th>
                <th className="px-3 py-3 text-center font-bold text-slate-600">MATI &gt;48j</th>
                <th className="px-3 py-3 text-center font-bold text-slate-600">AKHIR</th>
                <th className="px-3 py-3 text-center font-bold text-slate-600">HP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-700">{row.pelayanan}</td>
                  <td className="px-3 py-3 text-center text-slate-600">{row.awal}</td>
                  <td className="px-3 py-3 text-center text-blue-600 font-bold">{row.masuk}</td>
                  <td className="px-3 py-3 text-center text-green-600">{row.keluarHidup}</td>
                  <td className="px-3 py-3 text-center text-red-500">{row.keluarMatiLt48}</td>
                  <td className="px-3 py-3 text-center text-red-700 font-bold">{row.keluarMatiGe48}</td>
                  <td className="px-3 py-3 text-center text-slate-800 font-bold">{row.akhir}</td>
                  <td className="px-3 py-3 text-center text-slate-500 font-mono">{row.hariRawat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
