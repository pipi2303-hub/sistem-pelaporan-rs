'use client'

import { dataFarmasi, infoRS } from '@/lib/dummy-data'
import { Pill, FileText, PieChart, ShoppingBag } from 'lucide-react'

export default function FarmasiPage() {
  const data = dataFarmasi
  const totalResep = data.reduce((s, r) => s + r.resepRi + r.resepRj + r.resepIgd, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-emerald-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Farmasi & Resep (RL 3.17)</h1>
            <p className="text-sm text-slate-500">Penggunaan obat per kelompok — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <a href="/reports/RL3.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
          <FileText className="w-4 h-4" /> Cetak PDF
        </a>
      </div>

      <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Total Lembar Resep Dilayani</p>
            <p className="text-5xl font-black">{totalResep.toLocaleString()}</p>
            <div className="flex gap-4 mt-4 text-xs font-semibold">
              <span className="bg-white/20 px-3 py-1 rounded-full">RI: {data.reduce((s,r)=>s+r.resepRi,0)}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">RJ: {data.reduce((s,r)=>s+r.resepRj,0)}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">IGD: {data.reduce((s,r)=>s+r.resepIgd,0)}</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <ShoppingBag className="w-32 h-32 text-emerald-500 opacity-50" />
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
          <p className="text-xs font-bold text-slate-600 uppercase">Distribusi Penggunaan Obat</p>
        </div>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
              <th className="px-5 py-3">Kelompok Obat</th>
              <th className="px-5 py-3 text-right">Rawat Inap</th>
              <th className="px-5 py-3 text-right">Rawat Jalan</th>
              <th className="px-5 py-3 text-right">IGD</th>
              <th className="px-5 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, idx) => {
              const rowTotal = row.resepRi + row.resepRj + row.resepIgd
              return (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-700">{row.kelompok}</td>
                  <td className="px-5 py-4 text-right">{row.resepRi.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right">{row.resepRj.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right">{row.resepIgd.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right font-bold text-emerald-700">{rowTotal.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
