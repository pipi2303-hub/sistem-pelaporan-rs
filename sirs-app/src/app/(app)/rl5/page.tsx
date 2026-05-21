'use client'

import { useState } from 'react'
import { morbiditasRJ, infoRS } from '@/lib/dummy-data'
import { ClipboardList, FileText, Search, Trophy, Filter } from 'lucide-react'
import clsx from 'clsx'

export default function MorbiditasRJPage() {
  const [data] = useState(morbiditasRJ)
  const totalBaru = data.reduce((s, r) => s + r.lBaru + r.pBaru, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Morbiditas Rawat Jalan (RL 5.1)</h1>
            <p className="text-sm text-slate-500">Data diagnosis rawat jalan per ICD-10 — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL5.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 shadow-sm transition-colors">
            Sinkronisasi SIMRS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-3">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input type="text" placeholder="Cari diagnosis atau kode ICD-10..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>
             <button className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors">
               <Filter className="w-5 h-5 text-slate-400" />
             </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Kode</th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4 text-center">Kel. Umur</th>
                  <th className="px-6 py-4 text-right">L Baru</th>
                  <th className="px-6 py-4 text-right">P Baru</th>
                  <th className="px-6 py-4 text-right text-blue-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs">{row.kode}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{row.diagnosis}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{row.kelUmur}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{row.lBaru}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{row.pBaru}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">{row.lBaru + row.pBaru}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
             <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h2 className="font-bold text-slate-800">Top 5 Penyakit</h2>
             </div>
             <div className="space-y-5">
                {data.map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={clsx(
                      'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0',
                      i === 0 ? 'bg-amber-100 text-amber-700' : 
                      i === 1 ? 'bg-slate-100 text-slate-600' :
                      i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-400'
                    )}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-700 truncate">{r.diagnosis}</p>
                      <p className="text-[10px] text-slate-400 uppercase mt-0.5">{Math.round((r.lBaru+r.pBaru)/totalBaru*100)}% dari total kasus</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-blue-700 rounded-2xl p-6 text-white shadow-lg">
             <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Total Kunjungan Baru</p>
             <p className="text-4xl font-black">{totalBaru.toLocaleString()}</p>
             <p className="text-blue-200 text-[10px] mt-4 leading-relaxed">
               * Data kumulatif dari seluruh poli rawat jalan selama periode {infoRS.periodeAktif}.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
