"use client";

import Header from "@/components/layout/Header";
import {
  igdKategori,
  igdOutcome,
  igdTriage,
  falseEmergency,
  igdRealtime,
} from "@/lib/dummy-data";
import { getTriageColor } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Ambulance, BedDouble, AlertCircle } from "lucide-react";

export default function RL5Page() {
  const totalIGD = igdKategori.reduce((s, d) => s + d.total, 0);

  return (
    <div>
      <Header
        title="RL 5 — Gawat Darurat (IGD)"
        subtitle="Monitoring triage dan rekap kunjungan · Mei 2026"
      />

      <div className="p-6 space-y-6">
        {/* Realtime Status */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Waiting", value: igdRealtime.waiting, color: "text-red-600", bg: "bg-red-50 border-red-100" },
            { label: "Bed Tersedia", value: igdRealtime.bedAvailable, color: "text-green-600", bg: "bg-green-50 border-green-100" },
            { label: "Total Bed IGD", value: igdRealtime.bedTotal, color: "text-gray-700", bg: "bg-white" },
            { label: "Observasi", value: igdRealtime.observasi, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
            { label: "Total Kunjungan", value: totalIGD.toLocaleString("id-ID"), color: "text-purple-600", bg: "bg-purple-50 border-purple-100" },
            { label: "Dirujuk", value: igdRealtime.dirujuk, color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-xl border p-4 shadow-sm text-center ${bg}`}>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Triage Digital */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <AlertCircle size={18} className="text-red-500" />
            <h3 className="font-semibold text-gray-900">Triage Digital</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {igdTriage.map((t) => (
              <div key={t.triage} className="rounded-xl border-2 p-4 text-center" style={{ borderColor: t.warna }}>
                <div
                  className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg ${getTriageColor(t.triage)}`}
                >
                  {t.jumlah}
                </div>
                <p className="font-bold text-gray-800 text-sm">{t.triage}</p>
                <p className="text-xs text-gray-500 mt-1">{t.keterangan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Outcome IGD */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Outcome Pasien IGD</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={igdOutcome}
                  dataKey="total"
                  nameKey="outcome"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ percent }) =>
                    (percent ?? 0) > 0.05 ? `${((percent ?? 0) * 100).toFixed(0)}%` : ""
                  }
                >
                  {igdOutcome.map((entry, i) => (
                    <Cell key={i} fill={entry.warna} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [(v as number).toLocaleString("id-ID"), "Pasien"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {igdOutcome.map((d) => (
                <div key={d.outcome} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.warna }} />
                  <span className="text-xs text-gray-600">{d.outcome}: <strong>{d.total}</strong></span>
                </div>
              ))}
            </div>
          </div>

          {/* Kategori Kunjungan */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Kategori Kunjungan IGD</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={igdKategori} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="kategori" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip />
                <Bar dataKey="total" name="Pasien" radius={[0, 4, 4, 0]}>
                  {igdKategori.map((entry, i) => (
                    <Cell key={i} fill={entry.warna} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* False Emergency */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">False Emergency</h3>
            <div className="space-y-4">
              {falseEmergency.map((f) => (
                <div key={f.kategori} className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
                  <p className="text-sm font-semibold text-yellow-800">{f.kategori}</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">{f.total}</p>
                  <p className="text-xs text-yellow-600 mt-1">pasien bulan ini</p>
                </div>
              ))}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500">Total False Emergency</p>
                <p className="text-2xl font-bold text-gray-700 mt-1">
                  {falseEmergency.reduce((s, f) => s + f.total, 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {((falseEmergency.reduce((s, f) => s + f.total, 0) / totalIGD) * 100).toFixed(1)}% dari total kunjungan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Rekap RL IGD */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Ambulance size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-900">Rekap Kunjungan IGD (RL 3.3)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">Kategori</th>
                  <th className="px-6 py-3 text-center">Total</th>
                  <th className="px-6 py-3 text-center">% dari Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {igdKategori.map((k) => {
                  const pct = ((k.total / totalIGD) * 100).toFixed(1);
                  return (
                    <tr key={k.kategori} className="hover:bg-gray-50">
                      <td className="px-6 py-3.5 font-medium text-gray-800">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: k.warna }} />
                          {k.kategori}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-center font-bold text-gray-900">{k.total.toLocaleString("id-ID")}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div className="h-2 rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-600 w-10">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-50 font-bold">
                  <td className="px-6 py-3.5 text-gray-800">TOTAL</td>
                  <td className="px-6 py-3.5 text-center text-gray-900">{totalIGD.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-3.5 text-center text-gray-600">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
