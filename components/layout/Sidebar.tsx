"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  BarChart3,
  UserCheck,
  Users,
  Ambulance,
  ClipboardList,
  Activity,
  ChevronDown,
  ChevronRight,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard Executive",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "RL 1 — Profil & Fasilitas",
    icon: Building2,
    children: [
      { label: "Profil Rumah Sakit", href: "/rl1/profil" },
      { label: "Master Pelayanan", href: "/rl1/pelayanan" },
      { label: "Bed Management", href: "/rl1/bed" },
    ],
  },
  {
    label: "RL 2 — Indikator",
    href: "/rl2",
    icon: BarChart3,
  },
  {
    label: "RL 3 — Rawat Inap",
    href: "/rl3",
    icon: BedDouble,
  },
  {
    label: "RL 4 — Rawat Jalan",
    href: "/rl4",
    icon: UserCheck,
  },
  {
    label: "RL 5 — IGD",
    href: "/rl5",
    icon: Ambulance,
  },
  {
    label: "Audit Trail",
    href: "/audit",
    icon: ClipboardList,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<string[]>(["RL 1 — Profil & Fasilitas"]);

  function toggleGroup(label: string) {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  }

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Stethoscope size={20} />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">SIMRS RL</div>
            <div className="text-xs text-slate-400">SIRS 6.3 · 2025</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isOpen = openGroups.includes(item.label);

          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {isOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-3 py-2 rounded-lg text-sm transition-colors",
                          pathname === child.href
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-green-400" />
          <span>Sistem Aktif</span>
        </div>
        <div className="mt-1">RS Harapan Sehat Nasional</div>
      </div>
    </aside>
  );
}
