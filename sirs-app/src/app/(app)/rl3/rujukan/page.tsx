'use client'

import { useState, useMemo } from 'react'
import { ArrowRightLeft, ArrowUpRight, ArrowDownLeft, MapPin, Download } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface RujukanRow {
  id: string
  tujuanAsal: string
  jenis: 'Keluar' | 'Masuk'
  rawatInap: number
  rawatJalan: number
  igd: number
  alasan: string
}

const DATA: RujukanRow[] = [
  // Rujukan Keluar
  { id: '1', tujuanAsal: 'RS Provinsi / Vertikal', jenis: 'Keluar', rawatInap: 45, rawatJalan: 120, igd: 28, alasan: 'Keterbatasan fasilitas' },
  { id: '2', tujuanAsal: 'RS Swasta Setara', jenis: 'Keluar', rawatInap: 18, rawatJalan: 45, igd: 12, alasan: 'Kapasitas penuh' },
  { id: '3', tujuanAsal: 'RS TNI/POLRI', jenis: 'Keluar', rawatInap: 8, rawatJalan: 22, igd: 5, alasan: 'Permintaan pasien/keluarga' },
  { id: '4', tujuanAsal: 'Puskesmas / FKTP', jenis: 'Keluar', rawatInap: 0, rawatJalan: 85, igd: 0, alasan: 'Follow-up kondisi stabil' },
  { id: '5', tujuanAsal: 'RS Luar Provinsi', jenis: 'Keluar', rawatInap: 12, rawatJalan: 8, igd: 6, alasan: 'Sub-spesialis tidak tersedia' },
  // Rujukan Masuk
  { id: '6', tujuanAsal: 'Puskesmas / FKTP', jenis: 'Masuk', rawatInap: 210, rawatJalan: 380, igd: 145, alasan: 'Butuh rawat lanjutan' },
  { id: '7', tujuanAsal: 'Klinik Swasta', jenis: 'Masuk', rawatInap: 65, rawatJalan: 130, igd: 48, alasan: 'Rujukan BPJS non-emergency' },
  { id: '8', tujuanAsal: 'RS Kelas C/D', jenis: 'Masuk', rawatInap: 38, rawatJalan: 45, igd: 32, alasan: 'Keterbatasan alat & spesialis' },
  { id: '9', tujuanAsal: 'Dokter Praktik Mandiri', jenis: 'Masuk', rawatInap: 20, rawatJalan: 95, igd: 15, alasan: 'Rujukan non-BPJS' },
  { id: '10', tujuanAsal: 'IGD Mandiri (Datang Sendiri)', jenis: 'Masuk', rawatInap: 180, rawatJalan: 0, igd: 520, alasan: 'Walk-in / kegawatan' },
]

const ALASAN_KELUAR = [
  { name: 'Keterbatasan Fasilitas', value: 45 + 8, fill: '#ef4444' },
  { name: 'Kapasitas Penuh', value: 18, fill: '#f97316' },
  { name: 'Sub-Spesialis Tdk Tersedia', value: 12, fill: '#eab308' },
  { name: 'Follow-up Stabil', value: 85, fill: '#22c55e' },
  { name: 'Permintaan Pasien', value: 8 + 22 + 5, fill: '#3b82f6' },
]

export default function RujukanPage() {
  const [activeTab, setActiveTab] = useState<'keluar' | 'masuk' | 'ringkasan'>('ringkasan')

  const keluarData = DATA.filter((r) => r.jenis === 'Keluar')
  const masukData = DATA.filter((r) => r.jenis === 'Masuk')

  const totalKeluar = useMemo(() => ({
    ri: keluarData.reduce((s, r) => s + r.rawatInap, 0),
    rj: keluarData.reduce((s, r) => s + r.rawatJalan, 0),
    igd: keluarData.reduce((s, r) => s + r.igd, 0),
  }), [])
  const totalMasuk = useMemo(() => ({
    ri: masukData.reduce((s, r) => s + r.rawatInap, 0),
    rj: masukData.reduce((s, r) => s + r.rawatJalan, 0),
    igd: masukData.reduce((s, r) => s + r.igd, 0),
  }), [])

  const grandKeluar = totalKeluar.ri + totalKeluar.rj + totalKeluar.igd
  const grandMasuk = totalMasuk.ri + totalMasuk.rj + totalMasuk.igd

  function RujukanTable({ data }: { data: RujukanRow[] }) {
    const totRI = data.reduce((s, r) => s + r.rawatInap, 0)
    const totRJ = data.reduce((s, r) => s + r.rawatJalan, 0)
    const totIGD = data.reduce((s, r) => s + r.igd, 0)
    return (
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
            <th className="px-4 py-3 text-left font-medium">
              {data[0]?.jenis === 'Keluar' ? 'Tujuan Rujukan' : 'Asal Rujukan'}
            </th>
            <th className="px-4 py-3 text-right font-medium">Rawat Inap</th>
            <th className="px-4 py-3 text-right font-medium">Rawat Jalan</th>
            <th className="px-4 py-3 text-right font-medium">IGD</th>
            <th className="px-4 py-3 text-right font-medium">Total</th>
            <th className="px-4 py-3 text-left font-medium">Keterangan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-medium text-slate-700">{row.tujuanAsal}</td>
              <td className="px-4 py-3 text-right text-slate-600">{row.rawatInap}</td>
              <td className="px-4 py-3 text-right text-slate-600">{row.rawatJalan}</td>
              <td className="px-4 py-3 text-right text-slate-600">{row.igd}</td>
              <td className="px-4 py-3 text-right font-semibold text-slate-800">
                {row.rawatInap + row.rawatJalan + row.igd}
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{row.alasan}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-slate-50 font-semibold text-slate-800 border-t-2 border-slate-200">
            <td className="px-4 py-3">TOTAL</td>
            <td className="px-4 py-3 text-right">{totRI}</td>
            <td className="px-4 py-3 text-right">{totRJ}</td>
            <td className="px-4 py-3 text-right">{totIGD}</td>
            <td className="px-4 py-3 text-right">{totRI + totRJ + totIGD}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">RL 3.10 — Rujukan</h1>
          <p className="text-sm text-slate-500 mt-0.5">Data rujukan masuk & keluar rumah sakit • Mei 2026</p>
        </div>
        <a
          href="/reports/RL3.10.pdf"
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800"
        >
          <Download className="w-4 h-4" />
          Unduh PDF
        </a>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <ArrowUpRight className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-xs text-red-600 font-medium">Total Rujukan Keluar</p>
            <p className="text-3xl font-bold text-red-700">{grandKeluar.toLocaleString('id')}</p>
            <p className="text-xs text-red-500">{totalKeluar.ri} RI · {totalKeluar.rj} RJ · {totalKeluar.igd} IGD</p>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <ArrowDownLeft className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-emerald-600 font-medium">Total Rujukan Masuk</p>
            <p className="text-3xl font-bold text-emerald-700">{grandMasuk.toLocaleString('id')}</p>
            <p className="text-xs text-emerald-500">{totalMasuk.ri} RI · {totalMasuk.rj} RJ · {totalMasuk.igd} IGD</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <ArrowRightLeft className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-blue-600 font-medium">Rasio Keluar / Masuk</p>
            <p className="text-3xl font-bold text-blue-700">
              {(grandKeluar / grandMasuk * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-blue-500">
              {grandKeluar < grandMasuk ? 'RS penerima rujukan dominan' : 'RS pengirim rujukan dominan'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200">
          {[
            { key: 'ringkasan', label: 'Ringkasan & Analisis', icon: <MapPin className="w-3.5 h-3.5" /> },
            { key: 'keluar', label: 'Rujukan Keluar', icon: <ArrowUpRight className="w-3.5 h-3.5" /> },
            { key: 'masuk', label: 'Rujukan Masuk', icon: <ArrowDownLeft className="w-3.5 h-3.5" /> },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as typeof activeTab)}
              className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'ringkasan' && (
          <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Alasan Rujukan Keluar</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={ALASAN_KELUAR}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {ALASAN_KELUAR.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Perbandingan Masuk vs Keluar per Layanan</h3>
              <div className="space-y-3 mt-4">
                {[
                  { label: 'Rawat Inap', keluar: totalKeluar.ri, masuk: totalMasuk.ri },
                  { label: 'Rawat Jalan', keluar: totalKeluar.rj, masuk: totalMasuk.rj },
                  { label: 'IGD', keluar: totalKeluar.igd, masuk: totalMasuk.igd },
                ].map((item) => {
                  const max = Math.max(item.keluar, item.masuk)
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>{item.label}</span>
                        <span>Keluar: {item.keluar} · Masuk: {item.masuk}</span>
                      </div>
                      <div className="flex gap-1 h-5">
                        <div className="flex-1 bg-slate-100 rounded-l-full overflow-hidden flex justify-end">
                          <div
                            className="bg-red-400 h-full rounded-l-full"
                            style={{ width: `${(item.keluar / max) * 100}%` }}
                          />
                        </div>
                        <div className="flex-1 bg-slate-100 rounded-r-full overflow-hidden">
                          <div
                            className="bg-emerald-400 h-full rounded-r-full"
                            style={{ width: `${(item.masuk / max) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="flex gap-4 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-400 rounded-full inline-block" /> Keluar</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-400 rounded-full inline-block" /> Masuk</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'keluar' && (
          <div className="overflow-x-auto">
            <RujukanTable data={keluarData} />
          </div>
        )}

        {activeTab === 'masuk' && (
          <div className="overflow-x-auto">
            <RujukanTable data={masukData} />
          </div>
        )}
      </div>
    </div>
  )
}
