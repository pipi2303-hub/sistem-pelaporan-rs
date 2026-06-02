"use client";

import { Bell, User, ChevronDown } from "lucide-react";
import { alertData } from "@/lib/dummy-data";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const criticalAlerts = alertData.filter((a) => a.status === "Critical").length;
  const warningAlerts = alertData.filter((a) => a.status === "Warning").length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Tanggal */}
        <div className="text-sm text-gray-500 hidden md:block">
          {new Date("2026-05-18").toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        {/* Notifikasi */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-600" />
          {(criticalAlerts + warningAlerts) > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {criticalAlerts + warningAlerts}
            </span>
          )}
        </button>

        {/* User */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <div className="text-left hidden md:block">
            <div className="text-sm font-medium text-gray-900">admin.rm</div>
            <div className="text-xs text-gray-500">ADMIN_RM</div>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
