'use client'

import { useState, useMemo } from 'react'
import { Scan, Users, FileImage, TrendingUp, Download, Search } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RadiologiRow {
  id: string
  jenisPemeriksaan: string
  kategori: 'Konvensional' | 'CT Scan' | 'MRI' | 'USG' | 'Fluoroskopi' | 'Mamografi'
  ri: number
  rj: number
  igd: number
  ekstern: number
}

const DATA: RadiologiRow[] = [
  { id: '1', jenisPemeriksaan: 'X-Ray Thorax', kategori: 'Konvensional', ri: 420, rj: 650, igd: 210, ekstern: 85 },
  { id: '2', jenisPemeriksaan: 'X-Ray Tulang', kategori: 'Konvensional', ri: 180, rj: 320, igd: 140, ekstern: 45 },
  { id: '3', jenisPemeriksaan: 'X-Ray Abdomen', kategori: 'Konvensional', ri: 95, rj: 120, igd: 75, ekstern: 20 },
  { id: '4', jenisPemeriksaan: 'CT Scan Kepala', kategori: 'CT Scan', ri: 145, rj: 210, igd: 185, ekstern: 30 },
  { id: '5', jenisPemeriksaan: 'CT Scan Thorax', kategori: 'CT Scan', ri: 88, rj: 130, igd: 45, ekstern: 20 },
  { id: '6', jenisPemeriksaan: 'CT Scan Abdomen', kategori: 'CT Scan', ri: 75, rj: 115, igd: 35, ekstern: 18 },
  { id: '7', jenisPemeriksaan: 'MRI Kepala', kategori: 'MRI', ri: 62, rj: 95, igd: 20, ekstern: 15 },
  { id: '8', jenisPemeriksaan: 'MRI Tulang Belakang', kategori: 'MRI', ri: 45, rj: 78, igd: 10, ekstern: 12 },
  { id: '9', jenisPemeriksaan: 'USG Abdomen', kategori: 'USG', ri: 230, rj: 410, igd: 85, ekstern: 60 },
  { id: '10', jenisPemeriksaan: 'USG Kandungan', kategori: 'USG', ri: 80, rj: 295, igd: 30, ekstern: 25 },
  { id: '11', jenisPemeriksaan: 'USG Jantung (Echo)', kategori: 'USG', ri: 115, rj: 180, igd: 45, ekstern: 20 },
  { id: '12', jenisPemeriksaan: 'Fluoroskopi', kategori: 'Fluoroskopi', ri: 35, rj: 55, igd: 10, ekstern: 8 },
  { id: '13', jenisPemeriksaan: 'Mamografi', kategori: 'Mamografi', ri: 15, rj: 85, igd: 0, ekstern: 20 },
]

const KATEGORI_COLORS: Record<RadiologiRow['kategori'], string> = {
  'Konvensional': 'bg-blue-100 text-blue-700',
  'CT Scan': 'bg-purple-100 text-purple-700',
  'MRI': 'bg-indigo-100 text-indigo-700',
  'USG': 'bg-emerald-100 text-emerald-700',
  'Fluoroskopi': 'bg-amber-100 text-amber-700',
  'Mamografi': 'bg-pink-100 text-pink-700',
}

export default function RadiologiPage() {
  const [search, setSearch] = useState('')
  const [filterKategori, setFilterKategori] = useState<string>('Semua')

  const KATEGORI_LIST = ['Semua', 'Konvensional', 'CT Scan', 'MRI', 'USG', 'Fluoroskopi', 'Mamografi']

  const filtered = useMemo(() =>
    DATA.filter((r) => {
      const matchSearch = r.jenisPemeriksaan.toLowerCase().includes(search.toLowerCase())
      const matchKategori = filterKategori === 'Semua' || r.kategori === filterKategori
      return matchSearch && matchKategori
    }), [search, filterKategori])

  const totals = useMemo(() => ({
    ri: filtered.reduce((s, r) => s + r.ri, 0),
    rj: filtered.reduce((s, r) => s + r.rj, 0),
    igd: filtered.reduce((s, r) => s + r.igd, 0),
    ekstern: filtered.reduce((s, r) => s + r.ekstern, 0),
  }), [filtered])

  const grandTotal = totals.ri + totals.rj + totals.igd + totals.ekstern

  const chartData = Object.entries(
    DATA.reduce((acc, r) => {
      if (!acc[r.kategori]) acc[r.kategori] = 0
      acc[r.kategori] += r.ri + r.rj + r.igd + r.ekstern
      return acc
    }, {} as Record<string, number>)
  ).map(([name, total]) => ({ name, total }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Rekapitulasi Kegiatan Pelayanan Radiologi (RL 3.9)</h1>
          <p className="text-sm text-slate-500 mt-0.5">Pemeriksaan radiologi per jenis & asal pasien • Mei 2026</p>
        </div>
        <a
          href="/reports/RL3.9.pdf"
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800"
        >
          <Download className="w-4 h-4" />
          Unduh PDF
        </a>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pemeriksaan', value: grandTotal.toLocaleString('id'), sub: 'semua modalitas', icon: <Scan className="w-5 h-5 text-blue-600" />, color: 'bg-blue-50' },
          { label: 'Rawat Inap', value: totals.ri.toLocaleString('id'), sub: `${Math.round((totals.ri / grandTotal) * 100)}% dari total`, icon: <Users className="w-5 h-5 text-purple-600" />, color: 'bg-purple-50' },
          { label: 'Rawat Jalan', value: totals.rj.toLocaleString('id'), sub: `${Math.round((totals.rj / grandTotal) * 100)}% dari total`, icon: <FileImage className="w-5 h-5 text-emerald-600" />, color: 'bg-emerald-50' },
          { label: 'IGD + Ekstern', value: (totals.igd + totals.ekstern).toLocaleString('id'), sub: `${Math.round(((totals.igd + totals.ekstern) / grandTotal) * 100)}% dari total`, icon: <TrendingUp className="w-5 h-5 text-amber-600" />, color: 'bg-amber-50' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-start gap-3">
            <div className={`p-2 rounded-lg ${c.color}`}>{c.icon}</div>
            <div>
              <p className="text-xs text-slate-500">{c.label}</p>
              <p className="text-2xl font-bold text-slate-800">{c.value}</p>
              <p className="text-xs text-slate-400">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Distribusi per Modalitas</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 space-y-3">
          <h2 className="text-sm font-semibold text-slate-700">Data Pemeriksaan</h2>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari jenis pemeriksaan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {KATEGORI_LIST.map((k) => (
                <button
                  key={k}
                  onClick={() => setFilterKategori(k)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filterKategori === k
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-3 text-left font-medium">Jenis Pemeriksaan</th>
                <th className="px-4 py-3 text-center font-medium">Modalitas</th>
                <th className="px-4 py-3 text-right font-medium">Rawat Inap</th>
                <th className="px-4 py-3 text-right font-medium">Rawat Jalan</th>
                <th className="px-4 py-3 text-right font-medium">IGD</th>
                <th className="px-4 py-3 text-right font-medium">Ekstern</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700">{row.jenisPemeriksaan}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${KATEGORI_COLORS[row.kategori]}`}>
                      {row.kategori}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.ri.toLocaleString('id')}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.rj.toLocaleString('id')}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.igd.toLocaleString('id')}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.ekstern.toLocaleString('id')}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800">
                    {(row.ri + row.rj + row.igd + row.ekstern).toLocaleString('id')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-semibold text-slate-800 border-t-2 border-slate-200">
                <td className="px-4 py-3">TOTAL</td>
                <td />
                <td className="px-4 py-3 text-right">{totals.ri.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">{totals.rj.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">{totals.igd.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">{totals.ekstern.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">{grandTotal.toLocaleString('id')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
