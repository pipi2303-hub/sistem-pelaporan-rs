'use client'

import { useState, useMemo } from 'react'
import { Users, TrendingUp, CreditCard, RefreshCw, Download, Search } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface PoliklinikRow {
  id: string
  nama: string
  baru: number
  lama: number
  bpjs: number
  umum: number
  jaminanLain: number
}

const INITIAL_DATA: PoliklinikRow[] = [
  { id: '1', nama: 'Poli Penyakit Dalam', baru: 312, lama: 890, bpjs: 985, umum: 167, jaminanLain: 50 },
  { id: '2', nama: 'Poli Bedah', baru: 198, lama: 540, bpjs: 620, umum: 98, jaminanLain: 20 },
  { id: '3', nama: 'Poli Anak', baru: 430, lama: 310, bpjs: 610, umum: 110, jaminanLain: 20 },
  { id: '4', nama: 'Poli Obgyn', baru: 275, lama: 420, bpjs: 530, umum: 140, jaminanLain: 25 },
  { id: '5', nama: 'Poli Saraf', baru: 160, lama: 380, bpjs: 450, umum: 75, jaminanLain: 15 },
  { id: '6', nama: 'Poli Jantung', baru: 220, lama: 510, bpjs: 600, umum: 105, jaminanLain: 25 },
  { id: '7', nama: 'Poli THT', baru: 145, lama: 290, bpjs: 360, umum: 60, jaminanLain: 15 },
  { id: '8', nama: 'Poli Mata', baru: 185, lama: 330, bpjs: 415, umum: 85, jaminanLain: 15 },
  { id: '9', nama: 'Poli Kulit & Kelamin', baru: 130, lama: 260, bpjs: 310, umum: 65, jaminanLain: 15 },
  { id: '10', nama: 'Poli Ortopedi', baru: 175, lama: 350, bpjs: 430, umum: 80, jaminanLain: 15 },
  { id: '11', nama: 'Poli Psikiatri', baru: 95, lama: 210, bpjs: 250, umum: 45, jaminanLain: 10 },
  { id: '12', nama: 'Poli Gigi & Mulut', baru: 210, lama: 180, bpjs: 280, umum: 95, jaminanLain: 15 },
  { id: '13', nama: 'Poli Rehab Medik', baru: 120, lama: 340, bpjs: 390, umum: 60, jaminanLain: 10 },
  { id: '14', nama: 'Poli VCT/HIV', baru: 45, lama: 120, bpjs: 140, umum: 20, jaminanLain: 5 },
  { id: '15', nama: 'Poli Umum', baru: 380, lama: 210, bpjs: 420, umum: 155, jaminanLain: 15 },
]

function SummaryCard({
  label, value, sub, icon, color,
}: { label: string; value: string; sub: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-start gap-4">
      <div className={`p-2.5 rounded-lg ${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

export default function RawatJalanPage() {
  const [search, setSearch] = useState('')
  const [syncing, setSyncing] = useState(false)

  const filtered = useMemo(() =>
    INITIAL_DATA.filter((r) =>
      r.nama.toLowerCase().includes(search.toLowerCase())
    ), [search])

  const totals = useMemo(() => ({
    baru: filtered.reduce((s, r) => s + r.baru, 0),
    lama: filtered.reduce((s, r) => s + r.lama, 0),
    bpjs: filtered.reduce((s, r) => s + r.bpjs, 0),
    umum: filtered.reduce((s, r) => s + r.umum, 0),
    jaminanLain: filtered.reduce((s, r) => s + r.jaminanLain, 0),
  }), [filtered])

  const totalKunjungan = totals.baru + totals.lama

  const chartData = INITIAL_DATA.slice(0, 8).map((r) => ({
    nama: r.nama.replace('Poli ', ''),
    Baru: r.baru,
    Lama: r.lama,
  }))

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">RL 3.3 — Rawat Jalan</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kunjungan rawat jalan per poliklinik • Mei 2026</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSync}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            Sinkronisasi SIMRS
          </button>
          <a
            href="/reports/RL3.3.pdf"
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            <Download className="w-4 h-4" />
            Unduh PDF
          </a>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Kunjungan"
          value={totalKunjungan.toLocaleString('id')}
          sub={`${totals.baru.toLocaleString('id')} baru + ${totals.lama.toLocaleString('id')} lama`}
          icon={<Users className="w-5 h-5 text-blue-600" />}
          color="bg-blue-50"
        />
        <SummaryCard
          label="Pasien Baru"
          value={totals.baru.toLocaleString('id')}
          sub={`${Math.round((totals.baru / totalKunjungan) * 100)}% dari total kunjungan`}
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <SummaryCard
          label="Kunjungan BPJS"
          value={totals.bpjs.toLocaleString('id')}
          sub={`${Math.round((totals.bpjs / totalKunjungan) * 100)}% dari total kunjungan`}
          icon={<CreditCard className="w-5 h-5 text-purple-600" />}
          color="bg-purple-50"
        />
        <SummaryCard
          label="Jumlah Poliklinik"
          value={INITIAL_DATA.length.toString()}
          sub="poliklinik aktif periode ini"
          icon={<Users className="w-5 h-5 text-amber-600" />}
          color="bg-amber-50"
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Kunjungan Baru vs Lama — 8 Poli Terbesar</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="nama" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Baru" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Lama" fill="#93c5fd" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">Data per Poliklinik</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari poliklinik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-3 text-left font-medium">Poliklinik</th>
                <th className="px-4 py-3 text-right font-medium">Baru</th>
                <th className="px-4 py-3 text-right font-medium">Lama</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 text-right font-medium">BPJS</th>
                <th className="px-4 py-3 text-right font-medium">Umum</th>
                <th className="px-4 py-3 text-right font-medium">Jaminan Lain</th>
                <th className="px-4 py-3 text-right font-medium">% Baru</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => {
                const total = row.baru + row.lama
                const pctBaru = Math.round((row.baru / total) * 100)
                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700">{row.nama}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.baru.toLocaleString('id')}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.lama.toLocaleString('id')}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800">{total.toLocaleString('id')}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.bpjs.toLocaleString('id')}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.umum.toLocaleString('id')}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.jaminanLain.toLocaleString('id')}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        pctBaru >= 40 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {pctBaru}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-semibold text-slate-800 border-t-2 border-slate-200">
                <td className="px-4 py-3">TOTAL</td>
                <td className="px-4 py-3 text-right">{totals.baru.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">{totals.lama.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">{totalKunjungan.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">{totals.bpjs.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">{totals.umum.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">{totals.jaminanLain.toLocaleString('id')}</td>
                <td className="px-4 py-3 text-right">
                  {Math.round((totals.baru / totalKunjungan) * 100)}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
