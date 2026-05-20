'use client'

import { useState } from 'react'
import { sensusHarianData } from '@/lib/dummy-data'
import { ChevronLeft, ChevronRight, Save, AlertTriangle, CheckCircle2, ClipboardList } from 'lucide-react'
import clsx from 'clsx'

const JENIS_PELAYANAN = ['Penyakit Dalam', 'Bedah', 'Obsgin', 'Anak', 'ICU', 'Umum']

type SensusRow = {
  kelas: string
  awal: number
  masukBaru: number
  masukPindahan: number
  keluarHidup: number
  matiKurang48: number
  matiLebih48: number
  dipindahkan: number
  hp: number
}

function buildInitialRows(kelas: string): SensusRow {
  return { kelas, awal: 0, masukBaru: 0, masukPindahan: 0, keluarHidup: 0, matiKurang48: 0, matiLebih48: 0, dipindahkan: 0, hp: 0 }
}

function hitungAkhir(r: SensusRow) {
  return r.awal + r.masukBaru + r.masukPindahan - r.keluarHidup - r.matiKurang48 - r.matiLebih48 - r.dipindahkan
}

const KELAS_TT_LIST = ['Kelas I', 'Kelas II', 'Kelas III', 'VIP', 'VVIP', 'ICU']

export default function SensusHarianPage() {
  const today = new Date(2026, 4, 20)
  const [selectedDate, setSelectedDate] = useState('2026-05-20')
  const [activeTab, setActiveTab] = useState(0)
  const [validated, setValidated] = useState(false)
  const [saved, setSaved] = useState(false)

  // Initialize rows per jenis pelayanan per kelas TT
  const [allRows, setAllRows] = useState<Record<string, SensusRow[]>>(() => {
    const init: Record<string, SensusRow[]> = {}
    JENIS_PELAYANAN.forEach(jp => {
      const existing = sensusHarianData.find(d => d.tanggal === '2026-05-17')
      if (existing && existing.data[jp]) {
        const d = existing.data[jp]
        init[jp] = KELAS_TT_LIST.map(k => ({
          kelas: k,
          awal: d.awal,
          masukBaru: d.masukBaru,
          masukPindahan: d.masukPindahan,
          keluarHidup: d.keluarHidup,
          matiKurang48: d.matiKurang48,
          matiLebih48: d.matiLebih48,
          dipindahkan: d.dipindahkan,
          hp: d.hp,
        }))
      } else {
        init[jp] = KELAS_TT_LIST.map(buildInitialRows)
      }
    })
    return init
  })

  const activeJP = JENIS_PELAYANAN[activeTab]
  const rows = allRows[activeJP]

  const updateRow = (idx: number, field: keyof SensusRow, val: number) => {
    setSaved(false)
    setValidated(false)
    setAllRows(prev => ({
      ...prev,
      [activeJP]: prev[activeJP].map((r, i) => i === idx ? { ...r, [field]: Math.max(0, val) } : r)
    }))
  }

  const errors = rows.filter(r => hitungAkhir(r) < 0)
  const hasErrors = errors.length > 0

  const handleValidate = () => setValidated(true)
  const handleSave = () => { if (!hasErrors) setSaved(true) }

  // Kalender sidebar
  const days = Array.from({ length: 20 }, (_, i) => {
    const d = `2026-05-${String(i + 1).padStart(2, '0')}`
    const found = sensusHarianData.find(s => s.tanggal === d)
    return { tanggal: d, status: found?.status ?? 'belum', day: i + 1 }
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-blue-700" />
        <div>
          <h1 className="text-xl font-bold text-slate-900">Sensus Harian Rawat Inap</h1>
          <p className="text-sm text-slate-500">Input data pasien harian per jenis pelayanan &amp; kelas TT</p>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Date + tab selector */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => { setSelectedDate(e.target.value); setSaved(false); setValidated(false) }}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <p className="text-sm text-slate-500">Rabu, 20 Mei 2026</p>
            </div>
          </div>

          {/* Jenis Pelayanan Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            {JENIS_PELAYANAN.map((jp, i) => (
              <button key={jp} onClick={() => setActiveTab(i)}
                className={clsx(
                  'flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  activeTab === i
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700'
                )}
              >
                {jp}
              </button>
            ))}
          </div>

          {/* Validation alert */}
          {validated && hasErrors && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-700">Validasi gagal: {errors.length} baris tidak konsisten</p>
                <p className="text-xs text-red-500 mt-0.5">
                  Rumus: Akhir = Awal + Masuk Baru + Pindahan − Keluar − Mati − Dipindahkan. Nilai tidak boleh negatif.
                </p>
                <ul className="mt-2 space-y-0.5">
                  {errors.map(r => (
                    <li key={r.kelas} className="text-xs text-red-600">
                      • {r.kelas}: perhitungan menghasilkan {hitungAkhir(r)} (negatif)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {validated && !hasErrors && (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-sm font-semibold text-green-700">Semua baris valid — formula konsisten</p>
            </div>
          )}

          {/* Sensus Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {activeJP}
              </p>
              <p className="text-xs text-slate-400">* Akhir dihitung otomatis</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    {['Kelas TT', 'Awal', 'Masuk Baru', 'Masuk Pindahan', 'Keluar Hidup', 'Mati <48j', 'Mati ≥48j', 'Dipindahkan', 'Akhir *', 'HP'].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {rows.map((row, idx) => {
                    const akhir = hitungAkhir(row)
                    const isError = akhir < 0
                    return (
                      <tr key={row.kelas} className={clsx('hover:bg-slate-50 transition-colors', isError ? 'bg-red-50' : '')}>
                        <td className="px-3 py-2 font-semibold text-slate-700 whitespace-nowrap">{row.kelas}</td>
                        {(['awal', 'masukBaru', 'masukPindahan', 'keluarHidup', 'matiKurang48', 'matiLebih48', 'dipindahkan'] as const).map(field => (
                          <td key={field} className="px-2 py-2">
                            <input type="number" min={0} value={row[field]}
                              onChange={e => updateRow(idx, field, +e.target.value)}
                              className="w-16 px-2 py-1 border border-slate-200 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
                            />
                          </td>
                        ))}
                        <td className={clsx('px-3 py-2 text-center font-bold text-sm', isError ? 'text-red-600' : 'text-blue-700')}>
                          {akhir}
                          {isError && <AlertTriangle className="w-3 h-3 inline ml-1 text-red-500" />}
                        </td>
                        <td className="px-2 py-2">
                          <input type="number" min={0} value={row.hp}
                            onChange={e => updateRow(idx, 'hp', +e.target.value)}
                            className="w-16 px-2 py-1 border border-slate-200 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">Mengisi {activeJP} — {JENIS_PELAYANAN.length} jenis pelayanan total</p>
            <div className="flex gap-2">
              <button onClick={handleValidate}
                className="flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-700 bg-blue-50 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                <CheckCircle2 className="w-4 h-4" /> Validasi Formula
              </button>
              <button onClick={handleSave}
                className={clsx(
                  'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm',
                  saved ? 'bg-green-600 text-white' : hasErrors ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-blue-700 text-white hover:bg-blue-800'
                )}
                disabled={hasErrors}
              >
                {saved ? <><CheckCircle2 className="w-4 h-4" /> Tersimpan!</> : <><Save className="w-4 h-4" /> Simpan</>}
              </button>
            </div>
          </div>
        </div>

        {/* Kalender sidebar */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-20">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-xs font-semibold text-slate-600">Mei 2026</p>
            </div>
            <div className="p-3 grid grid-cols-5 gap-1">
              {days.map(d => (
                <button key={d.tanggal}
                  onClick={() => setSelectedDate(d.tanggal)}
                  title={`${d.tanggal} — ${d.status}`}
                  className={clsx(
                    'aspect-square rounded-lg flex items-center justify-center text-xs font-semibold transition-all',
                    d.tanggal === selectedDate
                      ? 'ring-2 ring-blue-500 ring-offset-1'
                      : '',
                    d.status === 'selesai' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                    d.status === 'error'   ? 'bg-red-100 text-red-600 hover:bg-red-200' :
                    'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  )}
                >{d.day}</button>
              ))}
            </div>
            <div className="px-3 pb-3 space-y-1.5">
              {[
                { color: 'bg-green-100', text: 'text-green-700', label: 'Lengkap' },
                { color: 'bg-red-100',   text: 'text-red-600',   label: 'Ada Error' },
                { color: 'bg-slate-100', text: 'text-slate-400', label: 'Belum' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-xs">
                  <span className={`w-3 h-3 rounded ${item.color}`} />
                  <span className="text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
