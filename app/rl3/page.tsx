"use client";

import Header from "@/components/layout/Header";
import { sensusHarian, sensusPerRuangan, occupancyHarian } from "@/lib/dummy-data";
import { getOccupancyColor } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BedDouble, CheckCircle2, FileText } from "lucide-react";

function SensusRow({ label, value, highlight = false }: { label: string; value: number | string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-3 border-b border-gray-100 last:border-0 ${highlight ? "bg-blue-50 -mx-5 px-5 rounded" : ""}`}>
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-bold ${highlight ? "text-blue-700" : "text-gray-900"}`}>{value}</span>
    </div>
  );
}

export default function RL3Page() {
  const { pasienAwalBulan, pasienMasuk, pasienPindahan, pasienDipindahkan, keluarHidup,
    matiKurang48jam, matiLebih48jam, jumlahLamaDirawat, jumlahHariPerawatan, sisaPasienAkhirBulan } = sensusHarian;

  const totalKeluar = keluarHidup + matiKurang48jam + matiLebih48jam;

  return (
    <div>
      <Header
        title="RL 3 — Rawat Inap"
        subtitle="Sensus harian dan rekap bulanan · Mei 2026"
      />

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Pasien Awal", value: pasienAwalBulan, color: "text-gray-800" },
            { label: "Pasien Masuk", value: pasienMasuk, color: "text-blue-600" },
            { label: "Total Keluar", value: totalKeluar, color: "text-green-600" },
            { label: "Sisa Akhir Bulan", value: sisaPasienAkhirBulan, color: "text-purple-600" },
            { label: "Total Hari Perawatan", value: jumlahHariPerawatan.toLocaleString(), color: "text-orange-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
              <p className={`text-2xl font-bold ${color}`}>{typeof value === "number" ? value.toLocaleString("id-ID") : value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sensus Bulanan RL 3.2 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText size={16} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Rekap Sensus Bulanan RL 3.2</h3>
                <p className="text-xs text-gray-500">Mei 2026</p>
              </div>
              <span className="ml-auto text-xs bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} />
                Valid
              </span>
            </div>

            <SensusRow label="A. Pasien awal bulan" value={pasienAwalBulan} />
            <SensusRow label="B. Pasien masuk" value={pasienMasuk} />
            <SensusRow label="C. Pasien pindahan dari ruang lain" value={pasienPindahan} />
            <div className="my-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Pasien Keluar</p>
            </div>
            <SensusRow label="D. Keluar hidup" value={keluarHidup} />
            <SensusRow label="E. Mati &lt;48 jam dirawat" value={matiKurang48jam} />
            <SensusRow label="F. Mati ≥48 jam dirawat" value={matiLebih48jam} />
            <SensusRow label="G. Dipindahkan ke ruang lain" value={pasienDipindahkan} />
            <div className="my-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Lama Rawat</p>
            </div>
            <SensusRow label="H. Jumlah lama dirawat (hari)" value={jumlahLamaDirawat.toLocaleString("id-ID")} />
            <SensusRow label="I. Jumlah hari perawatan" value={jumlahHariPerawatan.toLocaleString("id-ID")} />
            <SensusRow label="J. Sisa pasien akhir bulan" value={sisaPasienAkhirBulan} highlight />
          </div>

          {/* Occupancy Harian */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Occupancy per Unit</h3>
              <div className="space-y-3">
                {occupancyHarian.map((unit) => (
                  <div key={unit.unit}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{unit.unit}</span>
                      <span className={
                        unit.occupancy >= 90 ? "text-red-600 font-bold" :
                        unit.occupancy >= 75 ? "text-yellow-600 font-semibold" :
                        "text-green-600 font-semibold"
                      }>
                        {unit.occupancy}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${getOccupancyColor(unit.occupancy)}`}
                        style={{ width: `${unit.occupancy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Validasi Sistem */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Validasi Sistem</h3>
              <div className="space-y-2">
                {[
                  { check: "Saldo pasien akhir bulan valid", ok: (pasienAwalBulan + pasienMasuk + pasienPindahan - keluarHidup - matiKurang48jam - matiLebih48jam - pasienDipindahkan) === sisaPasienAkhirBulan },
                  { check: "Lama dirawat tidak negatif", ok: true },
                  { check: "Hari perawatan ≥ lama dirawat", ok: jumlahHariPerawatan >= jumlahLamaDirawat },
                  { check: "Tidak ada bed overcapacity", ok: true },
                  { check: "Transfer antar ruangan valid", ok: pasienPindahan === pasienDipindahkan },
                ].map(({ check, ok }) => (
                  <div key={check} className={`flex items-center gap-2 p-2 rounded-lg text-sm ${ok ? "bg-green-50" : "bg-red-50"}`}>
                    <CheckCircle2 size={14} className={ok ? "text-green-500" : "text-red-500"} />
                    <span className={ok ? "text-green-800" : "text-red-800"}>{check}</span>
                    <span className={`ml-auto text-xs font-bold ${ok ? "text-green-600" : "text-red-600"}`}>
                      {ok ? "OK" : "Error"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sensus per Ruangan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <BedDouble size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-900">Sensus per Ruangan</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">Ruangan</th>
                  <th className="px-6 py-3 text-center">Awal</th>
                  <th className="px-6 py-3 text-center">Masuk</th>
                  <th className="px-6 py-3 text-center">Keluar</th>
                  <th className="px-6 py-3 text-center">Sisa</th>
                  <th className="px-6 py-3 text-center">ALOS (hari)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sensusPerRuangan.map((row) => (
                  <tr key={row.ruangan} className="hover:bg-gray-50">
                    <td className="px-6 py-3.5 font-medium text-gray-800">{row.ruangan}</td>
                    <td className="px-6 py-3.5 text-center text-gray-600">{row.pasienAwal}</td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{row.masuk}</span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{row.keluar}</span>
                    </td>
                    <td className="px-6 py-3.5 text-center font-semibold text-gray-800">{row.sisa}</td>
                    <td className="px-6 py-3.5 text-center">
                      <span className={`text-xs font-bold ${row.los > 7 ? "text-red-600" : "text-gray-700"}`}>
                        {row.los}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Perbandingan */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Perbandingan Masuk vs Keluar per Ruangan</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={sensusPerRuangan}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="ruangan" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="masuk" name="Masuk" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="keluar" name="Keluar" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sisa" name="Sisa" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
