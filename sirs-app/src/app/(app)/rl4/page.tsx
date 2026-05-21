'use client'

import { useState } from 'react'
import { morbiditasRI, icd10List, kelompokUmur, sepuluhBesarPenyakit, type MorbiditasRI } from '@/lib/dummy-data'
import { Plus, Search, X, CheckCircle2, AlertTriangle, Trophy, Microscope, FileText } from 'lucide-react'
import clsx from 'clsx'

export default function MorbiditasRIPage() {
  const [rows, setRows]           = useState<MorbiditasRI[]>(morbiditasRI)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch]       = useState('')
  const [validated, setValidated] = useState(false)
  const [icd10Query, setIcd10Query] = useState('')
  const [showDropdown, setShowDropdown]  = useState(false)

  // Modal form state
  const [form, setForm] = useState({
    kode: '', diagnosis: '', kelUmur: kelompokUmur[6],
    lBaru: 0, pBaru: 0, lMati: 0, pMati: 0, hariRawat: 0
  })

  const filteredRows = rows.filter(r =>
    search === '' ||
    r.kode.toLowerCase().includes(search.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(search.toLowerCase())
  )

  const icd10Suggestions = icd10List.filter(i =>
    icd10Query.length >= 2 &&
    (i.kode.toLowerCase().includes(icd10Query.toLowerCase()) ||
     i.nama.toLowerCase().includes(icd10Query.toLowerCase()))
  ).slice(0, 6)

  const handleAddRow = () => {
    if (!form.kode) return
    const newRow: MorbiditasRI = {
      id: rows.length + 1,
      kode: form.kode,
      diagnosis: form.diagnosis,
      kelUmur: form.kelUmur,
      lBaru: form.lBaru,
      pBaru: form.pBaru,
      lMati: form.lMati,
      pMati: form.pMati,
      hariRawat: form.hariRawat,
    }
    setRows(prev => [...prev, newRow])
    setShowModal(false)
    setForm({ kode: '', diagnosis: '', kelUmur: kelompokUmur[6], lBaru: 0, pBaru: 0, lMati: 0, pMati: 0, hariRawat: 0 })
    setIcd10Query('')
  }

  // Validate: O kode for male
  const validationErrors = rows.filter(r =>
    r.kode.startsWith('O') && r.lBaru > 0
  )

  const totalKasus = rows.reduce((s, r) => s + r.lBaru + r.pBaru, 0)
  const totalMati  = rows.reduce((s, r) => s + r.lMati + r.pMati, 0)

  // Top 10 from current rows
  const top10 = [...rows]
    .sort((a, b) => (b.lBaru + b.pBaru) - (a.lBaru + a.pBaru))
    .slice(0, 10)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Microscope className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Morbiditas Rawat Inap (RL 4.1)</h1>
            <p className="text-sm text-slate-500">Data diagnosis per ICD-10, kelompok umur &amp; jenis kelamin — Tahunan 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/reports/RL4.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Tambah Diagnosis
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-700">{rows.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Baris Data</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-700">{totalKasus.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Kasus</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{totalMati}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Mati</p>
        </div>
      </div>

      {/* Validation */}
      {validated && validationErrors.length > 0 && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-700">{validationErrors.length} pelanggaran restriksi ICD-10 ditemukan</p>
            <ul className="mt-2 space-y-1">
              {validationErrors.map(r => (
                <li key={r.id} className="text-xs text-red-600">
                  • Kode {r.kode} — Kelas O (kehamilan/persalinan) tidak boleh ada kasus laki-laki ({r.lBaru} kasus L)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {validated && validationErrors.length === 0 && (
        <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <p className="text-sm font-semibold text-green-700">Semua data valid — tidak ada pelanggaran restriksi ICD-10</p>
        </div>
      )}

      <div className="flex gap-4">
        {/* Main table */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Search + validate */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari kode ICD-10 atau nama diagnosis..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button onClick={() => setValidated(true)}
              className="flex items-center gap-2 px-4 py-2 border border-amber-300 text-amber-700 bg-amber-50 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors">
              <CheckCircle2 className="w-4 h-4" /> Validasi ICD-10
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {['ICD-10', 'Diagnosis', 'Kel. Umur', 'L Baru', 'P Baru', 'Total', 'L Mati', 'P Mati', 'Hari Rawat'].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRows.map((row, idx) => {
                    const isOCodeMale = row.kode.startsWith('O') && row.lBaru > 0
                    return (
                      <tr key={row.id} className={clsx('hover:bg-slate-50 transition-colors', isOCodeMale && validated ? 'bg-red-50' : idx % 2 !== 0 ? 'bg-slate-50/30' : '')}>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className={clsx(
                              'font-mono font-bold text-xs px-1.5 py-0.5 rounded',
                              row.restriksi ? 'bg-amber-100 text-amber-700' :
                              row.kode.startsWith('O') ? 'bg-purple-100 text-purple-700' :
                              'bg-blue-100 text-blue-700'
                            )}>{row.kode}</span>
                            {isOCodeMale && validated && <AlertTriangle className="w-3 h-3 text-red-500" />}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-slate-700 max-w-[200px]">
                          <span className="line-clamp-2">{row.diagnosis}</span>
                        </td>
                        <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">{row.kelUmur}</td>
                        <td className="px-3 py-2.5 text-slate-700 text-center font-semibold">{row.lBaru}</td>
                        <td className="px-3 py-2.5 text-slate-700 text-center font-semibold">{row.pBaru}</td>
                        <td className="px-3 py-2.5 text-blue-700 text-center font-bold">{row.lBaru + row.pBaru}</td>
                        <td className="px-3 py-2.5 text-center">{row.lMati > 0 ? <span className="text-red-600 font-semibold">{row.lMati}</span> : <span className="text-slate-300">—</span>}</td>
                        <td className="px-3 py-2.5 text-center">{row.pMati > 0 ? <span className="text-red-600 font-semibold">{row.pMati}</span> : <span className="text-slate-300">—</span>}</td>
                        <td className="px-3 py-2.5 text-slate-500 text-right">{row.hariRawat}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {filteredRows.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-sm">
                  Tidak ada data yang sesuai pencarian &quot;{search}&quot;
                </div>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-400">{filteredRows.length} dari {rows.length} baris ditampilkan</p>
        </div>

        {/* 10 Besar sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-20">
            <div className="px-4 py-3 border-b border-slate-100 bg-yellow-50 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <p className="text-xs font-semibold text-slate-700">10 Besar Penyakit RI</p>
            </div>
            <div className="divide-y divide-slate-50">
              {top10.map((r, i) => (
                <div key={r.id} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 transition-colors">
                  <span className={clsx(
                    'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0',
                    i < 3 ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                  )}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-slate-700 truncate">{r.diagnosis.split(',')[0]}</p>
                    <p className="text-[10px] text-slate-400">{r.kode}</p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 flex-shrink-0">{r.lBaru + r.pBaru}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Tambah Diagnosis</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* ICD-10 Autocomplete */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kode ICD-10 *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ketik kode atau nama penyakit..."
                    value={icd10Query}
                    onChange={e => { setIcd10Query(e.target.value); setShowDropdown(true) }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {showDropdown && icd10Suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden">
                      {icd10Suggestions.map(i => (
                        <button key={i.kode}
                          onClick={() => {
                            setForm(f => ({ ...f, kode: i.kode, diagnosis: i.nama }))
                            setIcd10Query(`${i.kode} — ${i.nama}`)
                            setShowDropdown(false)
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors text-sm border-b border-slate-50 last:border-0">
                          <span className="font-bold text-blue-700 mr-2">{i.kode}</span>
                          <span className="text-slate-700">{i.nama}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {form.kode && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-green-700">
                    <CheckCircle2 className="w-3 h-3" />
                    Dipilih: <span className="font-bold">{form.kode}</span>
                  </div>
                )}
              </div>

              {/* Kelompok Umur */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kelompok Umur</label>
                <select value={form.kelUmur} onChange={e => setForm(f => ({ ...f, kelUmur: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {kelompokUmur.map(k => <option key={k}>{k}</option>)}
                </select>
              </div>

              {/* Kasus L/P */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Kasus Baru (L)', field: 'lBaru' as const },
                  { label: 'Kasus Baru (P)', field: 'pBaru' as const },
                  { label: 'Mati (L)', field: 'lMati' as const },
                  { label: 'Mati (P)', field: 'pMati' as const },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
                    <input type="number" min={0} value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: +e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Total Hari Rawat</label>
                <input type="number" min={0} value={form.hariRawat}
                  onChange={e => setForm(f => ({ ...f, hariRawat: +e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100">
              <button onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                Batal
              </button>
              <button onClick={handleAddRow} disabled={!form.kode}
                className="px-5 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
