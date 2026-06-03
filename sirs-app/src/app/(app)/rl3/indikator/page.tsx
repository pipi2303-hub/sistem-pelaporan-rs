'use client'

import { useState } from 'react'
import { indikatorPerKelas } from '@/lib/dummy-data'
import { Zap, Info, Send, CheckCircle2, BarChart3, FileText } from 'lucide-react'
import clsx from 'clsx'

const PERIODES = ['Mei 2026', 'Apr 2026', 'Mar 2026', 'Feb 2026', 'Jan 2026']

function cellColor(field: string, val: number) {
  const benchmarks: Record<string, { min?: number; max?: number; higherBetter?: boolean }> = {
    bor:  { min: 65, max: 80 },
    alos: { min: 4, max: 9 },
    bto:  { min: 4, higherBetter: true },
    toi:  { min: 1, max: 3 },
    ndr:  { max: 25, higherBetter: false },
    gdr:  { max: 45, higherBetter: false },
  }
  const b = benchmarks[field]
  if (!b) return ''
  let good = true
  if (b.min !== undefined && val < b.min) good = false
  if (b.max !== undefined && val > b.max) good = false
  if (!good) {
    const badlyOff = (b.max && val > b.max * 1.2) || (b.min && val < b.min * 0.8)
    return badlyOff ? 'text-red-600 font-bold' : 'text-amber-600 font-semibold'
  }
  return 'text-green-700 font-semibold'
}

export default function IndikatorPage() {
  const [periode, setPeriode] = useState(PERIODES[0])
  const [generated, setGenerated] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const data = indikatorPerKelas
  const total = data[data.length - 1]
  const rows  = data.slice(0, -1)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Indikator Pelayanan (RL 3.1)</h1>
            <p className="text-sm text-slate-500">BOR, ALOS, BTO, TOI, NDR, GDR — auto-generate dari sensus harian</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/reports/RL3.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <select value={periode} onChange={e => setPeriode(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            {PERIODES.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: 'BOR', value: total.bor, unit: '%',    color: total.bor >= 65 && total.bor <= 80 ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50' },
          { label: 'ALOS', value: total.alos, unit: ' hr', color: 'border-blue-200 bg-blue-50' },
          { label: 'BTO', value: total.bto, unit: 'x',   color: 'border-blue-200 bg-blue-50' },
          { label: 'TOI', value: total.toi, unit: ' hr', color: 'border-purple-200 bg-purple-50' },
          { label: 'NDR', value: total.ndr, unit: '‰',   color: total.ndr < 25 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50' },
          { label: 'GDR', value: total.gdr, unit: '‰',   color: total.gdr < 45 ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50' },
        ].map(item => (
          <div key={item.label} className={`rounded-xl border p-4 text-center shadow-sm ${item.color}`}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{item.value.toFixed(1)}<span className="text-sm font-normal text-slate-500">{item.unit}</span></p>
          </div>
        ))}
      </div>

      {/* Info benchmark */}
      <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>Benchmark: BOR 65–80% · ALOS 4–9 hari · TOI 1–3 hari · NDR &lt;25‰ · GDR &lt;45‰ (Kemenkes RI)</span>
      </div>

      {/* Generate button */}
      {!generated && (
        <button onClick={() => setGenerated(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
          <Zap className="w-4 h-4" /> Generate dari Sensus Harian
        </button>
      )}
      {generated && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
          <CheckCircle2 className="w-4 h-4" /> Indikator berhasil di-generate dari {total.hariPerawatan.toLocaleString()} hari perawatan
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {['Jenis Pelayanan', 'TT Tersedia', 'Hari Perawatan', 'BOR%', 'ALOS', 'BTO', 'TOI', 'NDR‰', 'GDR‰'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rows.map((row, idx) => (
                <tr key={row.kelas} className={clsx('hover:bg-slate-50 transition-colors', idx % 2 === 0 ? '' : 'bg-slate-50/30')}>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.kelas}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ttTersedia}</td>
                  <td className="px-4 py-3 text-slate-600">{row.hariPerawatan.toLocaleString()}</td>
                  <td className={`px-4 py-3 ${cellColor('bor', row.bor)}`}>{row.bor.toFixed(1)}%</td>
                  <td className={`px-4 py-3 ${cellColor('alos', row.alos)}`}>{row.alos.toFixed(1)}</td>
                  <td className={`px-4 py-3 ${cellColor('bto', row.bto)}`}>{row.bto.toFixed(1)}</td>
                  <td className={`px-4 py-3 ${cellColor('toi', row.toi)}`}>{row.toi.toFixed(1)}</td>
                  <td className={`px-4 py-3 ${cellColor('ndr', row.ndr)}`}>{row.ndr.toFixed(1)}</td>
                  <td className={`px-4 py-3 ${cellColor('gdr', row.gdr)}`}>{row.gdr.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 bg-blue-50 font-bold">
                <td className="px-4 py-3 text-blue-800">TOTAL / RATA-RATA</td>
                <td className="px-4 py-3 text-blue-800">{total.ttTersedia}</td>
                <td className="px-4 py-3 text-blue-800">{total.hariPerawatan.toLocaleString()}</td>
                <td className={`px-4 py-3 ${cellColor('bor', total.bor)}`}>{total.bor.toFixed(1)}%</td>
                <td className={`px-4 py-3 ${cellColor('alos', total.alos)}`}>{total.alos.toFixed(1)}</td>
                <td className={`px-4 py-3 ${cellColor('bto', total.bto)}`}>{total.bto.toFixed(1)}</td>
                <td className={`px-4 py-3 ${cellColor('toi', total.toi)}`}>{total.toi.toFixed(1)}</td>
                <td className={`px-4 py-3 ${cellColor('ndr', total.ndr)}`}>{total.ndr.toFixed(1)}</td>
                <td className={`px-4 py-3 ${cellColor('gdr', total.gdr)}`}>{total.gdr.toFixed(1)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Workflow action */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
            Draft
          </span>
          <p className="text-sm text-slate-600">Data sudah lengkap. Kirim untuk direview Validator.</p>
        </div>
        <button onClick={() => setSubmitted(true)}
          className={clsx(
            'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm',
            submitted ? 'bg-green-600 text-white' : 'bg-blue-700 text-white hover:bg-blue-800'
          )}>
          {submitted
            ? <><CheckCircle2 className="w-4 h-4" /> Submitted!</>
            : <><Send className="w-4 h-4" /> Submit untuk Review</>}
        </button>
      </div>
    </div>
  )
}
