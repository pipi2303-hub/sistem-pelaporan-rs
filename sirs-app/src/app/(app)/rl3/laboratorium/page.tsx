'use client'

import { dataLaboratorium, infoRS } from '@/lib/dummy-data'
import { FlaskConical, FileText, Search, Download } from 'lucide-react'

export default function LaboratoriumPage() {
  const data = dataLaboratorium
  const totalRI = data.reduce((s, r) => s + r.ri, 0)
  const totalRJ = data.reduce((s, r) => s + r.rj, 0)
  const totalIGD = data.reduce((s, r) => s + r.igd, 0)
  const totalLuar = data.reduce((s, r) => s + r.luar, 0)
  const grandTotal = totalRI + totalRJ + totalIGD + totalLuar

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Laboratorium (RL 3.8)</h1>
            <p className="text-sm text-slate-500">Jumlah pemeriksaan berdasarkan jenis — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <a href="/reports/RL3.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
          <FileText className="w-4 h-4" /> Cetak PDF
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Rawat Inap', val: totalRI, color: 'text-blue-700' },
          { label: 'Rawat Jalan', val: totalRJ, color: 'text-indigo-700' },
          { label: 'IGD', val: totalIGD, color: 'text-red-700' },
          { label: 'Luar RS', val: totalLuar, color: 'text-slate-700' },
        ].map(item => (
          <div key={item.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">{item.label}</p>
            <p className={`text-2xl font-bold mt-1 ${item.color}`}>{item.val.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
           <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Cari jenis pemeriksaan..." className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs" />
           </div>
           <p className="text-sm font-bold text-slate-800">Total: {grandTotal.toLocaleString()}</p>
        </div>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-5 py-3 font-semibold text-slate-500">Jenis Pemeriksaan</th>
              <th className="px-5 py-3 font-semibold text-slate-500 text-right">RI</th>
              <th className="px-5 py-3 font-semibold text-slate-500 text-right">RJ</th>
              <th className="px-5 py-3 font-semibold text-slate-500 text-right">IGD</th>
              <th className="px-5 py-3 font-semibold text-slate-500 text-right">Luar</th>
              <th className="px-5 py-3 font-semibold text-slate-700 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, idx) => {
              const rowTotal = row.ri + row.rj + row.igd + row.luar
              return (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{row.jenis}</td>
                  <td className="px-5 py-3.5 text-right text-slate-600">{row.ri.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right text-slate-600">{row.rj.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right text-slate-600">{row.igd.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right text-slate-600">{row.luar.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-indigo-700">{rowTotal.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
