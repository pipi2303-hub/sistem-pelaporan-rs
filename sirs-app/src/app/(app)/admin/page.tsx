'use client'

import { useState } from 'react'
import {
  Users, ShieldCheck, ClipboardList, Calendar,
  Plus, Search, Trash2, Edit2, CheckCircle,
  XCircle, Clock, RefreshCw,
} from 'lucide-react'

type Role = 'SUPERADMIN' | 'ADMIN' | 'PIC_UNIT' | 'VALIDATOR' | 'APPROVER' | 'CODER' | 'VIEWER_MNJMN' | 'INTEGRATOR'

interface UserItem {
  id: string
  nama: string
  username: string
  role: Role
  unitKerja?: string
  email: string
  aktif: boolean
  terakhirLogin: string
}

interface AuditLog {
  id: string
  waktu: string
  aktor: string
  aksi: string
  modul: string
  detail: string
  ip: string
}

interface SchedulerJob {
  id: string
  nama: string
  jadwal: string
  status: 'aktif' | 'nonaktif' | 'berjalan' | 'gagal'
  terakhirJalan: string
  berikutnya: string
}

const USERS: UserItem[] = [
  { id: '1', nama: 'Dr. Rini Widiastuti', username: 'admin', role: 'ADMIN', email: 'rini@rsud.co.id', aktif: true, terakhirLogin: '2026-06-02 08:14' },
  { id: '2', nama: 'Siti Rahayu, S.Kep', username: 'irna_pic', role: 'PIC_UNIT', unitKerja: 'IRNA', email: 'siti@rsud.co.id', aktif: true, terakhirLogin: '2026-06-02 07:45' },
  { id: '3', nama: 'Bagas Pratama', username: 'validator', role: 'VALIDATOR', email: 'bagas@rsud.co.id', aktif: true, terakhirLogin: '2026-06-01 16:30' },
  { id: '4', nama: 'dr. Hendri Santoso', username: 'approver', role: 'APPROVER', email: 'hendri@rsud.co.id', aktif: true, terakhirLogin: '2026-06-01 14:00' },
  { id: '5', nama: 'Ani Komariah, Amd.RMIK', username: 'coder01', role: 'CODER', email: 'ani@rsud.co.id', aktif: true, terakhirLogin: '2026-06-02 09:10' },
  { id: '6', nama: 'Ir. Budi Setiawan', username: 'mnjmn01', role: 'VIEWER_MNJMN', email: 'budi@rsud.co.id', aktif: true, terakhirLogin: '2026-05-31 11:22' },
  { id: '7', nama: 'Lab PIC', username: 'lab_pic', role: 'PIC_UNIT', unitKerja: 'LAB', email: 'lab@rsud.co.id', aktif: false, terakhirLogin: '2026-05-20 10:00' },
  { id: '8', nama: 'Farmasi PIC', username: 'farmasi_pic', role: 'PIC_UNIT', unitKerja: 'FARMASI', email: 'farmasi@rsud.co.id', aktif: true, terakhirLogin: '2026-06-02 08:55' },
]

const AUDIT_LOGS: AuditLog[] = [
  { id: '1', waktu: '2026-06-02 09:15', aktor: 'coder01', aksi: 'CREATE', modul: 'RL4', detail: 'Tambah diagnosis I10 — Hipertensi', ip: '192.168.1.45' },
  { id: '2', waktu: '2026-06-02 08:50', aktor: 'irna_pic', aksi: 'UPDATE', modul: 'RL3 Sensus', detail: 'Edit sensus harian tgl 01 Juni 2026', ip: '192.168.1.32' },
  { id: '3', waktu: '2026-06-02 08:14', aktor: 'admin', aksi: 'LOGIN', modul: 'Auth', detail: 'Login berhasil', ip: '192.168.1.10' },
  { id: '4', waktu: '2026-06-01 16:30', aktor: 'validator', aksi: 'VALIDATE', modul: 'Workflow', detail: 'Validasi RL 3.2 Rawat Inap Mei 2026', ip: '192.168.1.28' },
  { id: '5', waktu: '2026-06-01 14:00', aktor: 'approver', aksi: 'APPROVE', modul: 'Workflow', detail: 'Setujui RL 1.3 Tempat Tidur Mei 2026', ip: '192.168.1.55' },
  { id: '6', waktu: '2026-06-01 10:22', aktor: 'farmasi_pic', aksi: 'CREATE', modul: 'RL3 Farmasi', detail: 'Input data farmasi Mei 2026', ip: '192.168.1.40' },
  { id: '7', waktu: '2026-05-31 11:22', aktor: 'mnjmn01', aksi: 'VIEW', modul: 'Dashboard', detail: 'Akses dashboard manajemen', ip: '192.168.1.20' },
  { id: '8', waktu: '2026-05-30 09:00', aktor: 'system', aksi: 'SUBMIT', modul: 'Integrasi', detail: 'Auto-submit ke SIRS Online v3 — sukses', ip: 'system' },
]

const SCHEDULER_JOBS: SchedulerJob[] = [
  { id: '1', nama: 'Auto-submit SIRS Online', jadwal: '0 6 10 * *', status: 'aktif', terakhirJalan: '2026-05-10 06:00', berikutnya: '2026-06-10 06:00' },
  { id: '2', nama: 'Reminder Deadline Laporan', jadwal: '0 8 8,9 * *', status: 'aktif', terakhirJalan: '2026-06-01 08:00', berikutnya: '2026-06-08 08:00' },
  { id: '3', nama: 'Backup Database Harian', jadwal: '0 2 * * *', status: 'aktif', terakhirJalan: '2026-06-02 02:00', berikutnya: '2026-06-03 02:00' },
  { id: '4', nama: 'Refresh Materialized Views', jadwal: '0 1 * * *', status: 'berjalan', terakhirJalan: '2026-06-02 01:00', berikutnya: '2026-06-03 01:00' },
  { id: '5', nama: 'Sync SISDMK', jadwal: '0 4 1 * *', status: 'gagal', terakhirJalan: '2026-06-01 04:00', berikutnya: '2026-07-01 04:00' },
  { id: '6', nama: 'Sync ASPAK', jadwal: '0 3 1 * *', status: 'nonaktif', terakhirJalan: '2026-05-01 03:00', berikutnya: '—' },
]

const ROLE_LABELS: Record<Role, { label: string; color: string }> = {
  SUPERADMIN: { label: 'Super Admin', color: 'bg-red-100 text-red-700' },
  ADMIN: { label: 'Admin', color: 'bg-orange-100 text-orange-700' },
  PIC_UNIT: { label: 'PIC Unit', color: 'bg-blue-100 text-blue-700' },
  VALIDATOR: { label: 'Validator', color: 'bg-purple-100 text-purple-700' },
  APPROVER: { label: 'Approver', color: 'bg-emerald-100 text-emerald-700' },
  CODER: { label: 'Coder', color: 'bg-teal-100 text-teal-700' },
  VIEWER_MNJMN: { label: 'Viewer', color: 'bg-slate-100 text-slate-600' },
  INTEGRATOR: { label: 'Integrator', color: 'bg-indigo-100 text-indigo-700' },
}

const JOB_STATUS: Record<SchedulerJob['status'], { label: string; color: string; icon: React.ReactNode }> = {
  aktif: { label: 'Aktif', color: 'text-emerald-600', icon: <CheckCircle className="w-4 h-4" /> },
  nonaktif: { label: 'Nonaktif', color: 'text-slate-400', icon: <XCircle className="w-4 h-4" /> },
  berjalan: { label: 'Berjalan', color: 'text-blue-600', icon: <RefreshCw className="w-4 h-4 animate-spin" /> },
  gagal: { label: 'Gagal', color: 'text-red-600', icon: <XCircle className="w-4 h-4" /> },
}

const AKSI_COLORS: Record<string, string> = {
  LOGIN: 'bg-slate-100 text-slate-600',
  CREATE: 'bg-blue-100 text-blue-700',
  UPDATE: 'bg-amber-100 text-amber-700',
  DELETE: 'bg-red-100 text-red-700',
  VALIDATE: 'bg-purple-100 text-purple-700',
  APPROVE: 'bg-emerald-100 text-emerald-700',
  SUBMIT: 'bg-teal-100 text-teal-700',
  VIEW: 'bg-slate-100 text-slate-500',
}

type Tab = 'users' | 'audit' | 'scheduler'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('users')
  const [userSearch, setUserSearch] = useState('')
  const [auditSearch, setAuditSearch] = useState('')

  const filteredUsers = USERS.filter((u) =>
    u.nama.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    (u.unitKerja ?? '').toLowerCase().includes(userSearch.toLowerCase())
  )

  const filteredAudit = AUDIT_LOGS.filter((l) =>
    l.aktor.toLowerCase().includes(auditSearch.toLowerCase()) ||
    l.modul.toLowerCase().includes(auditSearch.toLowerCase()) ||
    l.detail.toLowerCase().includes(auditSearch.toLowerCase())
  )

  const activeUsers = USERS.filter((u) => u.aktif).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Administrasi Sistem</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manajemen pengguna, audit log, dan penjadwalan</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pengguna', value: USERS.length.toString(), sub: `${activeUsers} aktif`, icon: <Users className="w-5 h-5 text-blue-600" />, color: 'bg-blue-50' },
          { label: 'Peran Terdaftar', value: '8', sub: 'RBAC roles aktif', icon: <ShieldCheck className="w-5 h-5 text-purple-600" />, color: 'bg-purple-50' },
          { label: 'Log Hari Ini', value: AUDIT_LOGS.filter(l => l.waktu.startsWith('2026-06-02')).length.toString(), sub: 'aktivitas tercatat', icon: <ClipboardList className="w-5 h-5 text-emerald-600" />, color: 'bg-emerald-50' },
          { label: 'Scheduled Jobs', value: SCHEDULER_JOBS.filter(j => j.status === 'aktif').length.toString(), sub: `dari ${SCHEDULER_JOBS.length} total job`, icon: <Calendar className="w-5 h-5 text-amber-600" />, color: 'bg-amber-50' },
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

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200">
          {[
            { key: 'users', label: 'Pengguna', icon: <Users className="w-4 h-4" /> },
            { key: 'audit', label: 'Audit Log', icon: <ClipboardList className="w-4 h-4" /> },
            { key: 'scheduler', label: 'Scheduler', icon: <Calendar className="w-4 h-4" /> },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as Tab)}
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

        {/* === USERS TAB === */}
        {activeTab === 'users' && (
          <>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama / username / unit..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                <Plus className="w-4 h-4" />
                Tambah Pengguna
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <th className="px-4 py-3 text-left font-medium">Nama</th>
                    <th className="px-4 py-3 text-left font-medium">Username</th>
                    <th className="px-4 py-3 text-center font-medium">Peran</th>
                    <th className="px-4 py-3 text-left font-medium">Unit Kerja</th>
                    <th className="px-4 py-3 text-center font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Terakhir Login</th>
                    <th className="px-4 py-3 text-center font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800">{user.nama}</div>
                        <div className="text-xs text-slate-400">{user.email}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-mono text-xs">{user.username}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_LABELS[user.role].color}`}>
                          {ROLE_LABELS[user.role].label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{user.unitKerja ?? '—'}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${user.aktif ? 'text-emerald-600' : 'text-slate-400'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.aktif ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          {user.aktif ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{user.terakhirLogin}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* === AUDIT LOG TAB === */}
        {activeTab === 'audit' && (
          <>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari aktor / modul / detail..."
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <span className="text-xs text-slate-400">{filteredAudit.length} entri ditemukan</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <th className="px-4 py-3 text-left font-medium">Waktu</th>
                    <th className="px-4 py-3 text-left font-medium">Aktor</th>
                    <th className="px-4 py-3 text-center font-medium">Aksi</th>
                    <th className="px-4 py-3 text-left font-medium">Modul</th>
                    <th className="px-4 py-3 text-left font-medium">Detail</th>
                    <th className="px-4 py-3 text-left font-medium">IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAudit.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{log.waktu}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-700">{log.aktor}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${AKSI_COLORS[log.aksi] ?? 'bg-slate-100 text-slate-600'}`}>
                          {log.aksi}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">{log.modul}</td>
                      <td className="px-4 py-3 text-xs text-slate-500 max-w-xs truncate">{log.detail}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* === SCHEDULER TAB === */}
        {activeTab === 'scheduler' && (
          <div className="p-5 space-y-3">
            {SCHEDULER_JOBS.map((job) => {
              const st = JOB_STATUS[job.status]
              return (
                <div key={job.id} className={`border rounded-xl p-4 ${
                  job.status === 'gagal' ? 'border-red-200 bg-red-50' :
                  job.status === 'berjalan' ? 'border-blue-200 bg-blue-50' :
                  'border-slate-200 bg-white'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className={st.color}>{st.icon}</span>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{job.nama}</p>
                        <p className="text-xs text-slate-500 font-mono">{job.jadwal}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      job.status === 'aktif' ? 'bg-emerald-100 text-emerald-700' :
                      job.status === 'gagal' ? 'bg-red-100 text-red-700' :
                      job.status === 'berjalan' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {st.label}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-6 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Terakhir: {job.terakhirJalan}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Berikutnya: {job.berikutnya}
                    </span>
                  </div>
                  {job.status === 'gagal' && (
                    <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      Koneksi ke SISDMK timeout — periksa konfigurasi integrasi
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
