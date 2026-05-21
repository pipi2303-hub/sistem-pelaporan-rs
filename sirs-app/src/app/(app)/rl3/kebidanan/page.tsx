'use client'

import { dataKebidanan, infoRS } from '@/lib/dummy-data'
import { Baby, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

export default function KebidananPage() {
  const d = dataKebidanan
  const totalPersalinan = d.persalinan.reduce((s, r) => s + r.jumlah, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Baby className="w-5 h-5 text-pink-500" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Kebidanan (RL 3.6)</h1>
            <p className="text-sm text-slate-500">Data persalinan dan komplikasi — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <a href="/reports/RL3.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
          <FileText className="w-4 h-4" /> Cetak PDF
        </a>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Metode Persalinan</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 font-semibold text-slate-500">Jenis Persalinan</th>
                <th className="px-5 py-3 font-semibold text-slate-500 text-center">Rujukan</th>
                <th className="px-5 py-3 font-semibold text-slate-500 text-center">Non-Rujukan</th>
                <th className="px-5 py-3 font-semibold text-slate-500 text-center">Total</th>
                <th className="px-5 py-3 font-semibold text-slate-500 text-center">Mati Ibu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {d.persalinan.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-slate-800">{row.jenis}</td>
                  <td className="px-5 py-4 text-center text-slate-600">{row.rujukan}</td>
                  <td className="px-5 py-4 text-center text-slate-600">{row.nonRujukan}</td>
                  <td className="px-5 py-4 text-center font-bold text-blue-700">{row.jumlah}</td>
                  <td className="px-5 py-4 text-center font-bold text-red-600">{row.matiIbu}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-bold">
              <tr>
                <td className="px-5 py-3 text-slate-700 uppercase text-xs">Total Persalinan</td>
                <td className="px-5 py-3 text-center">{d.persalinan.reduce((s,r)=>s+r.rujukan,0)}</td>
                <td className="px-5 py-3 text-center">{d.persalinan.reduce((s,r)=>s+r.nonRujukan,0)}</td>
                <td className="px-5 py-3 text-center text-blue-700">{totalPersalinan}</td>
                <td className="px-5 py-3 text-center text-red-700">{d.persalinan.reduce((s,r)=>s+r.matiIbu,0)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" /> Komplikasi Persalinan
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {d.komplikasi.map(k => (
              <div key={k.jenis} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{k.jenis}</p>
                <p className="text-xl font-bold text-slate-800 mt-1">{k.jumlah}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-600 rounded-xl shadow-lg p-6 text-white flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-1">Rasio Persalinan SC</h3>
          <p className="text-blue-100 text-xs mb-4">Target nasional: &lt; 25% dari total persalinan</p>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-black">{Math.round(d.persalinan.find(p=>p.jenis.includes('Sectio'))!.jumlah / totalPersalinan * 100)}%</p>
            <div className="flex items-center gap-1 text-blue-100 text-xs mb-1 font-semibold bg-white/10 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Di Atas Target
            </div>
          </div>
          <div className="mt-4 h-2 bg-blue-800 rounded-full overflow-hidden">
             <div className="h-full bg-white rounded-full" style={{ width: `${Math.round(d.persalinan.find(p=>p.jenis.includes('Sectio'))!.jumlah / totalPersalinan * 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
