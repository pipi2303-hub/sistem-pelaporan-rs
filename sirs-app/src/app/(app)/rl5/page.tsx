'use client'

import { useState } from 'react'
import { morbiditasRJ, infoRS } from '@/lib/dummy-data'
import { ClipboardList, FileText, Search, Filter } from 'lucide-react'

export default function MorbiditasRJPage() {
  const [data] = useState(morbiditasRJ)
  const [search, setSearch] = useState('')
  const filteredData = data.filter(r =>
    search === '' ||
    r.kode.toLowerCase().includes(search.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">RL 5 - Data Kompilasi Penyakit/Morbiditas Pasien Rawat Jalan</h1>
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

      <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input type="text" placeholder="Cari diagnosis atau kode ICD-10..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
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
                {filteredData.map((row, idx) => (
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
    </div>
  )
}
