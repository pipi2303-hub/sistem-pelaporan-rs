'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  Users,
  Activity,
  FileText,
  ClipboardList,
  CheckSquare,
  Settings,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Pill,
  Stethoscope,
  Ambulance,
  Baby,
  Calendar,
  Scan,
  ArrowRightLeft,
  UserCheck,
  Smile,
  Brain,
  Heart,
  CreditCard,
} from 'lucide-react'

interface NavItem {
  href?: string
  label?: string
  icon?: React.ReactNode
  children?: NavItem[]
  section?: string
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  { section: 'FORMULIR RL' },
  {
    label: 'RL 1 — Identitas RS',
    icon: <Building2 className="w-4 h-4" />,
    children: [
      { href: '/rl1/profil', label: 'Profil Rumah Sakit' },
      { href: '/rl1/tempat-tidur', label: 'Tempat Tidur (RL 1.3)' },
    ],
  },
  {
    href: '/rl2',
    label: 'RL 2 — Ketenagaan',
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: 'RL 3 — Rawat Inap',
    icon: <BedDouble className="w-4 h-4" />,
    children: [
      { href: '/rl3/sensus-harian', label: 'Sensus Harian', icon: <Calendar className="w-3.5 h-3.5" /> },
      { href: '/rl3/indikator', label: 'Indikator (RL 3.1)', icon: <Activity className="w-3.5 h-3.5" /> },
      { href: '/rl3/rawat-inap', label: 'Rawat Inap (RL 3.2)', icon: <BedDouble className="w-3.5 h-3.5" /> },
      { href: '/rl3/rawat-jalan', label: 'Pelayanan Rawat Darurat (RL 3.3)', icon: <UserCheck className="w-3.5 h-3.5" /> },
      { href: '/rl3/igd', label: 'Rekapitulasi Pengunjung (RL 3.4)', icon: <Ambulance className="w-3.5 h-3.5" /> },
      { href: '/rl3/rekapitulasi-kunjungan', label: 'Rekapitulasi Kunjungan (RL 3.5)', icon: <Users className="w-3.5 h-3.5" /> },
      { href: '/rl3/kebidanan', label: 'Rekapitulasi Kebidanan (RL 3.6)', icon: <Baby className="w-3.5 h-3.5" /> },
      { href: '/rl3/neonatal', label: 'Rekapitulasi Kegiatan Pelayanan Neonatal, Bayi, dan Balita (RL 3.7)', icon: <Baby className="w-3.5 h-3.5" /> },
      { href: '/rl3/laboratorium', label: 'Rekapitulasi Kegiatan Pelayanan Laboratorium (RL 3.8)', icon: <FlaskConical className="w-3.5 h-3.5" /> },
      { href: '/rl3/radiologi', label: 'Rekapitulasi Kegiatan Pelayanan Radiologi (RL 3.9)', icon: <Scan className="w-3.5 h-3.5" /> },
      { href: '/rl3/rujukan', label: 'Rekapitulasi Kegiatan Pelayanan Rujukan (RL 3.10)', icon: <ArrowRightLeft className="w-3.5 h-3.5" /> },
      { href: '/rl3/gigi-mulut', label: 'Rekapitulasi Kegiatan Pelayanan Gigi dan Mulut (RL 3.11)', icon: <Smile className="w-3.5 h-3.5" /> },
      { href: '/rl3/pembedahan', label: 'Rekapitulasi Kegiatan Pelayanan Pembedahan (RL 3.12)', icon: <Stethoscope className="w-3.5 h-3.5" /> },
      { href: '/rl3/rehabilitasi-medik', label: 'Rekapitulasi Kegiatan Pelayanan Rehabilitasi Medik (RL 3.13)', icon: <Activity className="w-3.5 h-3.5" /> },
      { href: '/rl3/pelayanan-khusus', label: 'Rekapitulasi Kegiatan Pelayanan Khusus (RL 3.14)', icon: <ClipboardList className="w-3.5 h-3.5" /> },
      { href: '/rl3/kesehatan-jiwa', label: 'Rekapitulasi Kegiatan Pelayanan Kesehatan Jiwa (RL 3.15)', icon: <Brain className="w-3.5 h-3.5" /> },
      { href: '/rl3/keluarga-berencana', label: 'Rekapitulasi Kegiatan Pelayanan Keluarga Berencana (RL 3.16)', icon: <Heart className="w-3.5 h-3.5" /> },
      { href: '/rl3/farmasi', label: 'Rekapitulasi Kegiatan Pelayanan Farmasi RS - Pengadaan Obat (RL 3.17)', icon: <Pill className="w-3.5 h-3.5" /> },
      { href: '/rl3/farmasi-resep', label: 'Rekapitulasi Kegiatan Pelayanan Farmasi Rumah Sakit - Resep (RL 3.18)', icon: <Pill className="w-3.5 h-3.5" /> },
      { href: '/rl3/cara-bayar', label: 'Rekapitulasi Cara Bayar (RL 3.19)', icon: <CreditCard className="w-3.5 h-3.5" /> },
    ],
  },
  {
    href: '/rl4',
    label: 'RL 4 — Morbiditas RI',
    icon: <Stethoscope className="w-4 h-4" />,
  },
  {
    href: '/rl5',
    label: 'RL 5 — Morbiditas RJ',
    icon: <ClipboardList className="w-4 h-4" />,
  },
  { section: 'MANAJEMEN' },
  {
    href: '/workflow',
    label: 'Workflow & Status',
    icon: <CheckSquare className="w-4 h-4" />,
  },
  {
    href: '/admin',
    label: 'Administrasi',
    icon: <Settings className="w-4 h-4" />,
  },
]

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(() => {
    if (item.children) {
      return item.children.some(c => c.href && pathname.startsWith(c.href))
    }
    return false
  })

  if (item.section) {
    return (
      <div className="px-3 pt-4 pb-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.section}</p>
      </div>
    )
  }

  if (item.children) {
    const isChildActive = item.children.some(c => c.href && pathname.startsWith(c.href))
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={clsx(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
            isChildActive
              ? 'text-white bg-slate-700/60'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          )}
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span className="flex-1">{item.label}</span>
          {open
            ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          }
        </button>
        {open && (
          <div className="mt-1 ml-3 pl-3 border-l border-slate-700 space-y-0.5">
            {item.children.map((child, i) => (
              <NavItemComponent key={i} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (item.href) {
    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
    return (
      <Link
        href={item.href}
        className={clsx(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          depth > 0 ? 'text-xs py-1.5' : '',
          isActive
            ? 'bg-blue-700 text-white shadow-sm'
            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
        )}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span>{item.label}</span>
      </Link>
    )
  }

  return null
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-slate-900 flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">SIRS 6.3</p>
            <p className="text-slate-400 text-[11px] leading-tight">Sistem Pelaporan RS</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {navItems.map((item, i) => (
          <NavItemComponent key={i} item={item} />
        ))}
      </nav>

      {/* Periode Info */}
      <div className="px-4 py-4 border-t border-slate-700/50">
        <div className="bg-slate-800 rounded-lg px-3 py-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] text-slate-400 font-medium">Periode Aktif</p>
            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-medium">AKTIF</span>
          </div>
          <p className="text-sm font-bold text-white">Mei 2026</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Deadline: 10 Juni 2026</p>
          <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-blue-500 rounded-full" />
          </div>
          <p className="text-[10px] text-slate-500 mt-1">21 hari tersisa</p>
        </div>
      </div>
    </aside>
  )
}
