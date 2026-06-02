'use client'

import { useState } from 'react'
import { Baby, Heart, AlertTriangle, Download, Info } from 'lucide-react'

interface NeonatalRow {
  id: string
  kategori: string
  lahirHidup: number
  lahirMati: number
  matiNeonatal: number
  bblr: number // Berat Badan Lahir Rendah < 2500g
  asfiksia: number
  ikterus: number
  sepsis: number
}

const DATA: NeonatalRow[] = [
  { id: '1', kategori: 'Persalinan Normal Spontan', lahirHidup: 145, lahirMati: 2, matiNeonatal: 1, bblr: 8, asfiksia: 5, ikterus: 12, sepsis: 1 },
  { id: '2', kategori: 'Persalinan SC', lahirHidup: 98, lahirMati: 1, matiNeonatal: 0, bblr: 12, asfiksia: 3, ikterus: 9, sepsis: 2 },
  { id: '3', kategori: 'Persalinan Vakum/Forsep', lahirHidup: 14, lahirMati: 0, matiNeonatal: 1, bblr: 1, asfiksia: 2, ikterus: 1, sepsis: 0 },
  { id: '4', kategori: 'Persalinan Rujukan Masuk', lahirHidup: 22, lahirMati: 3, matiNeonatal: 2, bblr: 7, asfiksia: 6, ikterus: 4, sepsis: 3 },
]

const IMUNISASI = [
  { jenis: 'HB0 (Hepatitis B 0)', jumlah: 268, target: 279, pct: 96 },
  { jenis: 'Polio 0', jumlah: 260, target: 279, pct: 93 },
  { jenis: 'BCG', jumlah: 255, target: 279, pct: 91 },
  { jenis: 'Vitamin K1 Injeksi', jumlah: 275, target: 279, pct: 99 },
]

function StatCard({ label, value, sub, color, icon }: {
  label: string; value: string; sub: string; color: string; icon: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-start gap-3">
      <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    </div>
  )
}

export default function NeonatalPage() {
  const [activeTab, setActiveTab] = useState<'kelahiran' | 'komplikasi' | 'imunisasi'>('kelahiran')

  const totalLahirHidup = DATA.reduce((s, r) => s + r.lahirHidup, 0)
  const totalLahirMati = DATA.reduce((s, r) => s + r.lahirMati, 0)
  const totalMatiNeonatal = DATA.reduce((s, r) => s + r.matiNeonatal, 0)
  const totalBBLR = DATA.reduce((s, r) => s + r.bblr, 0)
  const totalKelahiran = totalLahirHidup + totalLahirMati
  const angkaMatiNeonatal = totalKelahiran > 0
    ? ((totalMatiNeonatal / totalLahirHidup) * 1000).toFixed(1)
    : '0'

  const TABS = [
    { key: 'kelahiran', label: 'Data Kelahiran' },
    { key: 'komplikasi', label: 'Komplikasi Neonatal' },
    { key: 'imunisasi', label: 'Imunisasi Neonatal' },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">RL 3.7 — Neonatal</h1>
          <p className="text-sm text-slate-500 mt-0.5">Data kelahiran & perawatan neonatal • Mei 2026</p>
        </div>
        <a
          href="/reports/RL3.7.pdf"
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800"
        >
          <Download className="w-4 h-4" />
          Unduh PDF
        </a>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Kelahiran"
          value={totalKelahiran.toString()}
          sub={`${totalLahirHidup} hidup, ${totalLahirMati} mati`}
          color="bg-pink-50"
          icon={<Baby className="w-5 h-5 text-pink-600" />}
        />
        <StatCard
          label="Lahir Hidup"
          value={totalLahirHidup.toString()}
          sub={`${Math.round((totalLahirHidup / totalKelahiran) * 100)}% dari total kelahiran`}
          color="bg-emerald-50"
          icon={<Heart className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          label="BBLR (< 2500 g)"
          value={totalBBLR.toString()}
          sub={`${Math.round((totalBBLR / totalLahirHidup) * 100)}% dari lahir hidup`}
          color="bg-amber-50"
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        />
        <StatCard
          label="Angka Mati Neonatal"
          value={`${angkaMatiNeonatal}‰`}
          sub={`per 1.000 kelahiran hidup`}
          color="bg-red-50"
          icon={<Info className="w-5 h-5 text-red-600" />}
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'kelahiran' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-3 text-left font-medium">Kategori Persalinan</th>
                  <th className="px-4 py-3 text-right font-medium">Lahir Hidup</th>
                  <th className="px-4 py-3 text-right font-medium">Lahir Mati</th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                  <th className="px-4 py-3 text-right font-medium">Mati Neonatal</th>
                  <th className="px-4 py-3 text-right font-medium">BBLR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DATA.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700">{row.kategori}</td>
                    <td className="px-4 py-3 text-right text-emerald-700 font-medium">{row.lahirHidup}</td>
                    <td className="px-4 py-3 text-right text-red-600">{row.lahirMati}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800">{row.lahirHidup + row.lahirMati}</td>
                    <td className="px-4 py-3 text-right text-red-600">{row.matiNeonatal}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.bblr > 10 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {row.bblr}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-semibold text-slate-800 border-t-2 border-slate-200">
                  <td className="px-4 py-3">TOTAL</td>
                  <td className="px-4 py-3 text-right text-emerald-700">{totalLahirHidup}</td>
                  <td className="px-4 py-3 text-right text-red-600">{totalLahirMati}</td>
                  <td className="px-4 py-3 text-right">{totalKelahiran}</td>
                  <td className="px-4 py-3 text-right text-red-600">{totalMatiNeonatal}</td>
                  <td className="px-4 py-3 text-right">{totalBBLR}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {activeTab === 'komplikasi' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-3 text-left font-medium">Kategori</th>
                  <th className="px-4 py-3 text-right font-medium">Asfiksia</th>
                  <th className="px-4 py-3 text-right font-medium">Ikterus</th>
                  <th className="px-4 py-3 text-right font-medium">Sepsis Neonatal</th>
                  <th className="px-4 py-3 text-right font-medium">Total Komplikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DATA.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700">{row.kategori}</td>
                    <td className="px-4 py-3 text-right text-amber-700">{row.asfiksia}</td>
                    <td className="px-4 py-3 text-right text-amber-700">{row.ikterus}</td>
                    <td className="px-4 py-3 text-right text-red-600">{row.sepsis}</td>
                    <td className="px-4 py-3 text-right font-semibold">{row.asfiksia + row.ikterus + row.sepsis}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-semibold text-slate-800 border-t-2 border-slate-200">
                  <td className="px-4 py-3">TOTAL</td>
                  <td className="px-4 py-3 text-right">{DATA.reduce((s, r) => s + r.asfiksia, 0)}</td>
                  <td className="px-4 py-3 text-right">{DATA.reduce((s, r) => s + r.ikterus, 0)}</td>
                  <td className="px-4 py-3 text-right">{DATA.reduce((s, r) => s + r.sepsis, 0)}</td>
                  <td className="px-4 py-3 text-right">
                    {DATA.reduce((s, r) => s + r.asfiksia + r.ikterus + r.sepsis, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {activeTab === 'imunisasi' && (
          <div className="p-5 space-y-3">
            <p className="text-xs text-slate-500 mb-4">Cakupan imunisasi neonatal sesuai program wajib</p>
            {IMUNISASI.map((item) => (
              <div key={item.jenis} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.jenis}</span>
                  <span className="text-slate-500">
                    {item.jumlah} / {item.target} bayi
                    <span className={`ml-2 font-semibold ${item.pct >= 95 ? 'text-emerald-600' : item.pct >= 85 ? 'text-amber-600' : 'text-red-600'}`}>
                      {item.pct}%
                    </span>
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.pct >= 95 ? 'bg-emerald-500' : item.pct >= 85 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-4 flex gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> ≥ 95% — Target tercapai</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> 85–94% — Perhatian</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> {'< 85%'} — Perlu tindak lanjut</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
