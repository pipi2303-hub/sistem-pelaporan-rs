'use client'

import { useState } from 'react'
import { ketenagaan } from '@/lib/dummy-data'
import { Users, RefreshCw, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'

export default function KetenagaanPage() {
  const [synced, setSynced] = useState(false)

  const totalDokter  = ketenagaan.slice(0, 4).reduce((s, r) => s + r.total, 0)
  const totalPerawat = ketenagaan.slice(4, 7).reduce((s, r) => s + r.total, 0)
  const totalFarmasi = ketenagaan.slice(7, 9).reduce((s, r) => s + r.total, 0)
  const totalSemua   = ketenagaan.reduce((s, r) => s + r.total, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Ketenagaan (RL 2)</h1>
            <p className="text-sm text-slate-500">Data sumber daya manusia kesehatan — Tahunan 2025</p>
          </div>
        </div>
        <button onClick={() => setSynced(true)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all',
            synced ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-slate-300 text-slate-600 hover:border-blue-300 hover:text-blue-700'
          )}>
          {synced ? <CheckCircle2 className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
          {synced ? 'Tersinkronisasi' : 'Sinkronisasi dari SISDMK'}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Dokter (Sp + Umum + Gigi)', value: totalDokter,  cls: 'bg-blue-50 border-blue-100', val: 'text-blue-700' },
          { label: 'Perawat & Bidan',            value: totalPerawat, cls: 'bg-teal-50 border-teal-100', val: 'text-teal-700' },
          { label: 'Farmasi',                    value: totalFarmasi, cls: 'bg-purple-50 border-purple-100', val: 'text-purple-700' },
          { label: 'Total Semua Nakes',           value: totalSemua,  cls: 'bg-slate-50 border-slate-200',  val: 'text-slate-800' },
        ].map(item => (
          <div key={item.label} className={`rounded-xl border p-4 text-center shadow-sm ${item.cls}`}>
            <p className={`text-3xl font-bold ${item.val}`}>{item.value}</p>
            <p className="text-xs text-slate-500 mt-1 leading-tight">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Data per Jenis Tenaga Kesehatan</p>
          <p className="text-xs text-slate-400">Filter: Semua · PNS · PPPK · Kontrak</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-2.5 text-left font-semibold text-slate-500 uppercase tracking-wider">Jenis Nakes</th>
                <th className="px-3 py-2.5 text-center font-semibold text-slate-500">S3</th>
                <th className="px-3 py-2.5 text-center font-semibold text-slate-500">S2/Sp</th>
                <th className="px-3 py-2.5 text-center font-semibold text-slate-500">S1/D4</th>
                <th className="px-3 py-2.5 text-center font-semibold text-slate-500">D3</th>
                <th className="px-3 py-2.5 text-center font-semibold text-slate-500">D1/D2</th>
                <th className="px-3 py-2.5 text-center font-semibold text-slate-500">SMA↓</th>
                <th className="px-3 py-2.5 text-center font-semibold text-blue-600">Total</th>
                <th className="px-3 py-2.5 text-center font-semibold text-slate-500">L</th>
                <th className="px-3 py-2.5 text-center font-semibold text-slate-500">P</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ketenagaan.map((row, idx) => (
                <tr key={row.jenis} className={clsx('hover:bg-slate-50 transition-colors', idx % 2 !== 0 ? 'bg-slate-50/30' : '')}>
                  <td className="px-4 py-2.5 font-semibold text-slate-700">{row.jenis}</td>
                  {[row.s3, row.s2sp, row.s1d4, row.d3, row.d1d2, row.smaKebawah].map((v, i) => (
                    <td key={i} className={clsx('px-3 py-2.5 text-center', v > 0 ? 'text-slate-700 font-medium' : 'text-slate-200')}>
                      {v > 0 ? v : '—'}
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-center font-bold text-blue-700">{row.total}</td>
                  <td className="px-3 py-2.5 text-center text-slate-500">{row.l}</td>
                  <td className="px-3 py-2.5 text-center text-pink-500">{row.p}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 bg-blue-50 font-bold">
                <td className="px-4 py-3 text-blue-800">TOTAL</td>
                {['s3','s2sp','s1d4','d3','d1d2','smaKebawah'].map(k => (
                  <td key={k} className="px-3 py-3 text-center text-blue-800">
                    {ketenagaan.reduce((s, r) => s + (r as any)[k], 0)}
                  </td>
                ))}
                <td className="px-3 py-3 text-center text-blue-800">{totalSemua}</td>
                <td className="px-3 py-3 text-center text-blue-800">{ketenagaan.reduce((s,r) => s+r.l, 0)}</td>
                <td className="px-3 py-3 text-center text-pink-600">{ketenagaan.reduce((s,r) => s+r.p, 0)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
