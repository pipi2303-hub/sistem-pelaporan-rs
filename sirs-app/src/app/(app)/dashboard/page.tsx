'use client'

import { indikatorBulanan, borPerKelas, caraBayar, sepuluhBesarPenyakit, ketersediaanTT, workflowModules, infoRS } from '@/lib/dummy-data'
import { IndikatorCard } from '@/components/dashboard/indikator-card'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts'
import { Activity, BedDouble, Users, Stethoscope, TrendingUp, AlertCircle, CheckCircle2, Clock, Send } from 'lucide-react'

const latest = indikatorBulanan[indikatorBulanan.length - 1]
const prev   = indikatorBulanan[indikatorBulanan.length - 2]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    sent:       { label: 'Terkirim',  cls: 'bg-green-100 text-green-700'  },
    approved:   { label: 'Disetujui', cls: 'bg-blue-100 text-blue-700'    },
    validated:  { label: 'Validasi',  cls: 'bg-amber-100 text-amber-700'  },
    submitted:  { label: 'Submitted', cls: 'bg-purple-100 text-purple-700'},
    draft:      { label: 'Draft',     cls: 'bg-slate-100 text-slate-500'  },
  }
  const cfg = map[status] ?? map.draft
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}

export default function DashboardPage() {
  const sentCount     = workflowModules.filter(m => m.status === 'sent').length
  const approvedCount = workflowModules.filter(m => m.status === 'approved').length
  const draftCount    = workflowModules.filter(m => m.status === 'draft').length

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Dashboard Manajemen</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Periode pelaporan: <span className="font-semibold text-blue-700">{infoRS.periodeAktif}</span>
            &nbsp;·&nbsp; Deadline: <span className="font-semibold text-red-600">{infoRS.deadline}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span className="text-green-700 font-medium">{approvedCount} Disetujui</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-amber-700 font-medium">{draftCount} Draft</span>
          </div>
        </div>
      </div>

      {/* ── Row 1: Indikator Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <IndikatorCard label="BOR" nilai={latest.bor} satuan="%" prevNilai={prev.bor}
          benchmark={{ min: 65, max: 80, label: '65–80%' }}
          icon={<BedDouble className="w-4 h-4" />} />
        <IndikatorCard label="ALOS" nilai={latest.alos} satuan=" hari" prevNilai={prev.alos}
          benchmark={{ min: 4, max: 9, label: '4–9 hari' }}
          icon={<Activity className="w-4 h-4" />} />
        <IndikatorCard label="BTO" nilai={latest.bto} satuan=" kali" prevNilai={prev.bto}
          benchmark={{ min: 4, label: '>4' }}
          icon={<TrendingUp className="w-4 h-4" />} />
        <IndikatorCard label="TOI" nilai={latest.toi} satuan=" hari" prevNilai={prev.toi}
          benchmark={{ min: 1, max: 3, label: '1–3 hari' }}
          icon={<Clock className="w-4 h-4" />} />
        <IndikatorCard label="NDR" nilai={latest.ndr} satuan="‰" prevNilai={prev.ndr}
          benchmark={{ max: 25, label: '<25‰' }}
          higherIsBetter={false}
          icon={<Stethoscope className="w-4 h-4" />} />
        <IndikatorCard label="GDR" nilai={latest.gdr} satuan="‰" prevNilai={prev.gdr}
          benchmark={{ max: 45, label: '<45‰' }}
          higherIsBetter={false}
          icon={<AlertCircle className="w-4 h-4" />} />
      </div>

      {/* ── Row 2: Charts ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* BOR Tren per kelas */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Tren BOR per Kelas TT (12 Bulan)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={borPerKelas} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
              <YAxis domain={[55, 100]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`${v}%`]} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line dataKey="ICU"      stroke="#dc2626" strokeWidth={2} dot={false} />
              <Line dataKey="Kelas I"  stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line dataKey="Kelas II" stroke="#7c3aed" strokeWidth={2} dot={false} />
              <Line dataKey="Kelas III" stroke="#059669" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-600 inline-block" /> ICU — target ≤85%</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-600 inline-block" /> Kelas I</span>
            <span>Zona ideal: 65–80%</span>
          </div>
        </div>

        {/* Pie cara bayar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Cara Bayar Pasien (Mei 2026)</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={caraBayar} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
                dataKey="value" nameKey="name" paddingAngle={2}>
                {caraBayar.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {caraBayar.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: 10 Besar + Workflow Status ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* 10 Besar Penyakit */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">10 Besar Penyakit Rawat Inap</h2>
            <span className="text-xs text-slate-400">Tahunan 2025</span>
          </div>
          <div className="divide-y divide-slate-50">
            {sepuluhBesarPenyakit.map(p => (
              <div key={p.rank} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 transition-colors">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  p.rank <= 3 ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}>{p.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{p.diagnosis}</p>
                  <p className="text-[11px] text-slate-400">{p.kode}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-slate-700">{p.jumlah}</p>
                  {p.mati > 0 && <p className="text-[11px] text-red-500">{p.mati} mati</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Workflow */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Status Pelaporan — Mei 2026</h2>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Deadline: 10 Jun</span>
            </div>
          </div>
          {/* Progress summary */}
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span>Progress keseluruhan</span>
              <span className="font-semibold">{Math.round((approvedCount + sentCount) / workflowModules.length * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${Math.round((approvedCount + sentCount) / workflowModules.length * 100)}%` }}
              />
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[340px] overflow-y-auto">
            {workflowModules.map(m => (
              <div key={m.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">{m.kode}</span>
                    <p className="text-xs font-semibold text-slate-700 truncate">{m.nama}</p>
                    {m.wajib && <span className="text-[10px] text-red-500">*</span>}
                  </div>
                  {m.sentAt && (
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      <Send className="w-2.5 h-2.5 inline mr-1" />
                      {new Date(m.sentAt).toLocaleDateString('id-ID')}
                    </p>
                  )}
                  {m.approvedAt && !m.sentAt && (
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5 inline mr-1" />
                      {new Date(m.approvedAt).toLocaleDateString('id-ID')}
                    </p>
                  )}
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 4: TT Real-time ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-700">Ketersediaan Tempat Tidur — Real-time</h2>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Update terakhir: Hari ini 06:00
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ketersediaanTT} layout="vertical" margin={{ top: 0, right: 40, left: 80, bottom: 0 }}>
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="kelas" tick={{ fontSize: 11 }} width={80} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="terisi"  name="Terisi"  stackId="a" fill="#2563eb" radius={0} />
            <Bar dataKey="kosong"  name="Kosong"  stackId="a" fill="#bfdbfe" radius={0} />
            <Bar dataKey="rusak"   name="Rusak"   stackId="a" fill="#fca5a5" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
        {/* Summary row */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[
            { label: 'Total TT', value: ketersediaanTT.reduce((s, k) => s + k.tersedia, 0), cls: 'text-slate-700' },
            { label: 'Terisi', value: ketersediaanTT.reduce((s, k) => s + k.terisi, 0), cls: 'text-blue-700' },
            { label: 'Kosong', value: ketersediaanTT.reduce((s, k) => s + k.kosong, 0), cls: 'text-green-700' },
            { label: 'Rusak', value: ketersediaanTT.reduce((s, k) => s + k.rusak, 0), cls: 'text-red-600' },
          ].map(item => (
            <div key={item.label} className="text-center py-2 bg-slate-50 rounded-lg">
              <p className={`text-xl font-bold ${item.cls}`}>{item.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
