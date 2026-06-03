'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { ToastProvider } from '@/components/ui/toast'
import { LogOut, Bell, ChevronDown, Building2 } from 'lucide-react'

interface User {
  username: string
  name: string
  role: string
  hospital: string
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('sirs_user')
    if (!stored) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(stored))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('sirs_user')
    router.push('/login')
  }

  // Build breadcrumb from path
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbMap: Record<string, string> = {
    'dashboard': 'Dashboard',
    'rl1': 'RL 1',
    'profil': 'Profil RS',
    'tempat-tidur': 'Tempat Tidur',
    'rl2': 'Ketenagaan (RL 2)',
    'rl3': 'RL 3',
    'sensus-harian': 'Sensus Harian',
    'indikator': 'Indikator',
    'rawat-inap': 'Rawat Inap (RL 3.2)',
    'igd': 'IGD (RL 3.4)',
    'kebidanan': 'Rekapitulasi Kegiatan Pelayanan Kebidanan',
    'neonatal': 'Rekapitulasi Kegiatan Pelayanan Neonatal, Bayi, dan Balita (RL 3.7)',
    'laboratorium': 'Rekapitulasi Kegiatan Pelayanan Laboratorium (RL 3.8)',
    'radiologi': 'Rekapitulasi Kegiatan Pelayanan Radiologi (RL 3.9)',
    'rujukan': 'Rekapitulasi Kegiatan Pelayanan Rujukan (RL 3.10)',
    'gigi-mulut': 'Rekapitulasi Kegiatan Pelayanan Gigi dan Mulut (RL 3.11)',
    'pembedahan': 'Rekapitulasi Kegiatan Pelayanan Pembedahan (RL 3.12)',
    'rehabilitasi-medik': 'Rekapitulasi Kegiatan Pelayanan Rehabilitasi Medik (RL 3.13)',
    'pelayanan-khusus': 'Rekapitulasi Kegiatan Pelayanan Khusus (RL 3.14)',
    'kesehatan-jiwa': 'Rekapitulasi Kegiatan Pelayanan Kesehatan Jiwa (RL 3.15)',
    'keluarga-berencana': 'Rekapitulasi Kegiatan Pelayanan Keluarga Berencana (RL 3.16)',
    'farmasi': 'Rekapitulasi Kegiatan Pelayanan Farmasi RS - Pengadaan Obat (RL 3.17)',
    'rl4': 'Morbiditas RI (RL 4.1)',
    'rl5': 'Morbiditas RJ (RL 5.1)',
    'workflow': 'Workflow & Status',
    'admin': 'Administrasi',
  }

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Memuat sistem...
        </div>
      </div>
    )
  }

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0 ml-[260px]">
          {/* Top header */}
          <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 gap-4 flex-shrink-0 z-30 sticky top-0">
            {/* Hospital name */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Building2 className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-800 truncate">
                RSUD Dr. Soetomo
              </span>
              <span className="hidden md:flex items-center gap-1 text-slate-300 text-sm">
                <span>/</span>
                <span className="text-slate-500 text-sm">
                  {segments.map(s => breadcrumbMap[s] || s).join(' / ')}
                </span>
              </span>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Notification bell */}
              <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>

              {/* Period badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span className="text-xs font-medium text-blue-700">Mei 2026</span>
              </div>

              {/* User menu */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-semibold text-slate-700 leading-tight">{user.name}</p>
                  <p className="text-[11px] text-slate-400">{user.role}</p>
                </div>
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
