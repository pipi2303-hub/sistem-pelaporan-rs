'use client'

import { useState } from 'react'
import { kelasTT } from '@/lib/dummy-data'
import { BedDouble, Save, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

type TTRow = {
  id: number
  kelas: string
  tersedia: number
  terisi: number
  rusak: number
}

function borColor(bor: number) {
  if (bor > 90) return 'text-red-600 font-bold'
  if (bor > 80) return 'text-amber-600 font-semibold'
  return 'text-green-700 font-semibold'
}

export default function TempatTidurPage() {
  const [shift, setShift] = useState<'P' | 'S'>('P')
  const [rows, setRows] = useState<TTRow[]>(kelasTT.map(k => ({ ...k })))
  const [saved, setSaved] = useState(false)

  const update = (id: number, field: keyof TTRow, val: number) => {
    setSaved(false)
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: Math.max(0, val) } : r))
  }

  const totalTersedia = rows.reduce((s, r) => s + r.tersedia, 0)
  const totalTerisi   = rows.reduce((s, r) => s + r.terisi, 0)
  const totalRusak    = rows.reduce((s, r) => s + r.rusak, 0)
  const totalKosong   = rows.reduce((s, r) => s + Math.max(0, r.tersedia - r.terisi - r.rusak), 0)
  const borTotal      = totalTersedia > 0 ? (totalTerisi / totalTersedia * 100) : 0

  const handleSave = () => setSaved(true)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-blue-700" />
            Tempat Tidur Harian (RL 1.3)
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Rabu, 20 Mei 2026 &nbsp;·&nbsp; Input 2× sehari (Pagi & Sore)
          </p>
        </div>
        {/* Shift toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Shift:</span>
          {(['P', 'S'] as const).map(s => (
            <button key={s}
              onClick={() => setShift(s)}
              className={clsx(
                'px-4 py-1.5 rounded-lg text-sm font-semibold border transition-all',
                shift === s
                  ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-300'
              )}
            >
              {s === 'P' ? '🌅 Pagi (06.00)' : '🌆 Sore (18.00)'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total TT Tersedia', value: totalTersedia, cls: 'text-slate-700', bg: 'bg-slate-50' },
          { label: 'Terisi', value: totalTerisi, cls: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Kosong', value: totalKosong, cls: 'text-green-700', bg: 'bg-green-50' },
          { label: 'Rusak', value: totalRusak, cls: 'text-red-600', bg: 'bg-red-50' },
        ].map(item => (
          <div key={item.label} className={`${item.bg} rounded-xl p-4 border border-white shadow-sm text-center`}>
            <p className={`text-2xl font-bold ${item.cls}`}>{item.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      {/* BOR agregat */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold text-slate-700">BOR Keseluruhan</span>
            <span className={clsx('text-lg font-bold', borColor(borTotal))}>
              {borTotal.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={clsx('h-full rounded-full transition-all', borTotal > 90 ? 'bg-red-500' : borTotal > 80 ? 'bg-amber-500' : 'bg-blue-600')}
              style={{ width: `${Math.min(borTotal, 100)}%` }}
            />
          </div>
        </div>
        <div className="flex-shrink-0 text-xs text-slate-400 text-right">
          <p>Ideal: 65–80%</p>
          {borTotal > 80 && <p className="text-amber-600 font-semibold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Di atas ideal</p>}
          {borTotal <= 80 && <p className="text-green-600 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Normal</p>}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Detail Per Kelas TT — Shift {shift === 'P' ? 'Pagi' : 'Sore'}
          </p>
          <p className="text-xs text-slate-400">* TT Kosong dan BOR dihitung otomatis</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Kelas TT', 'TT Tersedia', 'TT Terisi', 'TT Rusak', 'TT Kosong *', 'BOR% *'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rows.map((row, idx) => {
                const kosong = Math.max(0, row.tersedia - row.terisi - row.rusak)
                const bor = row.tersedia > 0 ? (row.terisi / row.tersedia * 100) : 0
                const isICU = row.kelas.includes('ICU') || row.kelas.includes('NICU') || row.kelas.includes('PICU') || row.kelas.includes('HCU')
                return (
                  <tr key={row.id} className={clsx('hover:bg-slate-50 transition-colors', idx % 2 === 0 ? '' : 'bg-slate-50/30')}>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">{row.kelas}</span>
                        {isICU && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-semibold">Kritis</span>}
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="number" min={0} value={row.tersedia}
                        onChange={e => update(row.id, 'tersedia', +e.target.value)}
                        className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="number" min={0} value={row.terisi}
                        onChange={e => update(row.id, 'terisi', +e.target.value)}
                        className={clsx(
                          'w-20 px-2 py-1 border rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                          row.terisi > row.tersedia ? 'border-red-300 bg-red-50' : 'border-slate-200'
                        )}
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="number" min={0} value={row.rusak}
                        onChange={e => update(row.id, 'rusak', +e.target.value)}
                        className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center font-semibold text-green-700">{kosong}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={clsx('h-full rounded-full', bor > 90 ? 'bg-red-500' : bor > 80 ? 'bg-amber-500' : 'bg-blue-500')}
                            style={{ width: `${Math.min(bor, 100)}%` }}
                          />
                        </div>
                        <span className={clsx('text-xs w-12 text-right', borColor(bor))}>
                          {bor.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {/* Footer total */}
            <tfoot>
              <tr className="border-t-2 border-slate-200 bg-blue-50">
                <td className="px-4 py-3 font-bold text-sm text-blue-800">TOTAL</td>
                <td className="px-4 py-3 text-center font-bold text-blue-800">{totalTersedia}</td>
                <td className="px-4 py-3 text-center font-bold text-blue-800">{totalTerisi}</td>
                <td className="px-4 py-3 text-center font-bold text-red-700">{totalRusak}</td>
                <td className="px-4 py-3 text-center font-bold text-green-700">{totalKosong}</td>
                <td className="px-4 py-3">
                  <span className={clsx('text-sm font-bold', borColor(borTotal))}>
                    {borTotal.toFixed(1)}%
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Auto-save aktif setiap 30 detik. Data tersimpan sebagai draft.
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => setRows(kelasTT.map(k => ({ ...k })))}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
          <button onClick={handleSave}
            className={clsx(
              'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm',
              saved
                ? 'bg-green-600 text-white'
                : 'bg-blue-700 text-white hover:bg-blue-800'
            )}>
            {saved ? <><CheckCircle2 className="w-4 h-4" /> Tersimpan!</> : <><Save className="w-4 h-4" /> Simpan Sensus {shift === 'P' ? 'Pagi' : 'Sore'}</>}
          </button>
        </div>
      </div>
    </div>
  )
}
