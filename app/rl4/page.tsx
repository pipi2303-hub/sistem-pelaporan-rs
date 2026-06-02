"use client";

import Header from "@/components/layout/Header";
import { kunjunganPoli, statistikDomisili, statistikGender, monitoringPoli } from "@/lib/dummy-data";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { UserCheck, Clock, Users } from "lucide-react";

export default function RL4Page() {
  const totalKunjungan = kunjunganPoli.reduce((s, p) => s + p.total, 0);
  const totalBaru = kunjunganPoli.reduce((s, p) => s + p.baru, 0);
  const totalLama = kunjunganPoli.reduce((s, p) => s + p.lama, 0);

  return (
    <div>
      <Header
        title="RL 4 — Rawat Jalan"
        subtitle="Rekap kunjungan dan statistik poliklinik · Mei 2026"
      />

      <div className="p-6 space-y-6">
        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Kunjungan", value: totalKunjungan.toLocaleString("id-ID"), color: "text-blue-600" },
            { label: "Pasien Baru", value: totalBaru.toLocaleString("id-ID"), color: "text-green-600" },
            { label: "Pasien Lama", value: totalLama.toLocaleString("id-ID"), color: "text-purple-600" },
            { label: "Jumlah Poli Aktif", value: kunjunganPoli.length, color: "text-orange-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Kunjungan per Poli + Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tabel Poli */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <UserCheck size={18} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Kunjungan per Poliklinik</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <th className="px-6 py-3 text-left">Poliklinik</th>
                    <th className="px-6 py-3 text-center">Total</th>
                    <th className="px-6 py-3 text-center">Baru</th>
                    <th className="px-6 py-3 text-center">Lama</th>
                    <th className="px-6 py-3 text-left">Proporsi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {kunjunganPoli.sort((a, b) => b.total - a.total).map((p) => {
                    const pct = Math.round((p.total / totalKunjungan) * 100);
                    return (
                      <tr key={p.poli} className="hover:bg-gray-50">
                        <td className="px-6 py-3.5 font-medium text-gray-800">{p.poli}</td>
                        <td className="px-6 py-3.5 text-center font-bold text-gray-900">{p.total.toLocaleString("id-ID")}</td>
                        <td className="px-6 py-3.5 text-center">
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{p.baru}</span>
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{p.lama}</span>
                        </td>
                        <td className="px-6 py-3.5 min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                              <div className="h-2 rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-gray-600 w-8">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pie Charts */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users size={16} />
                Asal Domisili
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={statistikDomisili} dataKey="jumlah" nameKey="kategori" cx="50%" cy="50%" outerRadius={65} label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                    {statistikDomisili.map((entry, i) => (
                      <Cell key={i} fill={entry.warna} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [(v as number).toLocaleString("id-ID"), "Pasien"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 justify-center mt-2">
                {statistikDomisili.map((d) => (
                  <div key={d.kategori} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.warna }} />
                    <span className="text-xs text-gray-600">{d.kategori}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users size={16} />
                Statistik Gender
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={statistikGender} dataKey="jumlah" nameKey="gender" cx="50%" cy="50%" outerRadius={65} label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                    {statistikGender.map((entry, i) => (
                      <Cell key={i} fill={entry.warna} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [(v as number).toLocaleString("id-ID"), "Pasien"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 justify-center mt-2">
                {statistikGender.map((d) => (
                  <div key={d.gender} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.warna }} />
                    <span className="text-xs text-gray-600">{d.gender}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chart Bar Poli */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Perbandingan Pasien Baru vs Lama per Poli</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={kunjunganPoli.sort((a, b) => b.total - a.total)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="poli" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="baru" name="Pasien Baru" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="lama" name="Pasien Lama" fill="#3b82f6" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monitoring Antrian */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Clock size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-900">Monitoring Antrian Realtime</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">Poliklinik</th>
                  <th className="px-6 py-3 text-center">Waiting</th>
                  <th className="px-6 py-3 text-center">Dokter Aktif</th>
                  <th className="px-6 py-3 text-center">Avg. Tunggu</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monitoringPoli.map((poli) => (
                  <tr key={poli.poli} className="hover:bg-gray-50">
                    <td className="px-6 py-3.5 font-medium text-gray-800">{poli.poli}</td>
                    <td className="px-6 py-3.5 text-center">
                      <span className={`text-sm font-bold ${poli.waiting > 40 ? "text-red-600" : poli.waiting > 20 ? "text-yellow-600" : "text-green-600"}`}>
                        {poli.waiting}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{poli.dokterAktif}</span>
                    </td>
                    <td className="px-6 py-3.5 text-center text-gray-600">{poli.avgWait} menit</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        poli.waiting > 40 ? "bg-red-100 text-red-700" :
                        poli.waiting > 20 ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {poli.waiting > 40 ? "Padat" : poli.waiting > 20 ? "Sedang" : "Normal"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
