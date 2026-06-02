"use client";

import Header from "@/components/layout/Header";
import { alertData, indikatorPelayanan, trendBOR, trendMortalitas } from "@/lib/dummy-data";
import { getBORStatus } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { BarChart3, AlertTriangle, AlertCircle, Info } from "lucide-react";

function IndikatorCard({
  label,
  nilai,
  satuan,
  rumus,
  batasMin,
  batasMax,
  deskripsi,
  statusColor,
}: {
  label: string;
  nilai: number;
  satuan: string;
  rumus: string;
  batasMin?: string;
  batasMax?: string;
  deskripsi: string;
  statusColor: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{label}</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className={`text-3xl font-bold ${statusColor}`}>{nilai}</span>
            <span className="text-sm text-gray-500">{satuan}</span>
          </div>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg">
          <BarChart3 size={18} className="text-blue-600" />
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-2">{deskripsi}</p>
      <div className="bg-gray-50 rounded-lg p-2 text-xs font-mono text-gray-700">{rumus}</div>
      {(batasMin || batasMax) && (
        <div className="flex gap-3 mt-2 text-xs text-gray-500">
          {batasMin && <span>Min: <strong>{batasMin}</strong></span>}
          {batasMax && <span>Ideal: <strong>{batasMax}</strong></span>}
        </div>
      )}
    </div>
  );
}

export default function RL2Page() {
  const { bor, alos, bto, toi, ndr, gdr } = indikatorPelayanan;
  const borStatus = getBORStatus(bor);

  return (
    <div>
      <Header
        title="RL 2 — Indikator Pelayanan"
        subtitle="Kalkulasi otomatis mutu dan efisiensi RS · Periode Mei 2026"
      />

      <div className="p-6 space-y-6">
        {/* Indikator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <IndikatorCard
            label="BOR"
            nilai={bor}
            satuan="%"
            rumus="(Hari Perawatan / (TT × Hari Periode)) × 100"
            batasMin="70%"
            batasMax="85%"
            deskripsi="Bed Occupancy Rate — persentase keterisian tempat tidur"
            statusColor={borStatus.color}
          />
          <IndikatorCard
            label="ALOS"
            nilai={alos}
            satuan="hari"
            rumus="Jumlah Lama Dirawat / Jumlah Pasien Keluar"
            batasMax="6–9 hari"
            deskripsi="Average Length of Stay — rata-rata lama rawat pasien"
            statusColor="text-blue-600"
          />
          <IndikatorCard
            label="BTO"
            nilai={bto}
            satuan="kali"
            rumus="Pasien Keluar / Jumlah Tempat Tidur"
            batasMax="40–50 kali/tahun"
            deskripsi="Bed Turn Over — frekuensi penggunaan tempat tidur"
            statusColor="text-purple-600"
          />
          <IndikatorCard
            label="TOI"
            nilai={toi}
            satuan="hari"
            rumus="((TT × Periode) − Hari Perawatan) / Pasien Keluar"
            batasMax="1–3 hari"
            deskripsi="Turn Over Interval — interval tempat tidur kosong"
            statusColor="text-green-600"
          />
          <IndikatorCard
            label="NDR"
            nilai={ndr}
            satuan="‰"
            rumus="(Mati ≥48 jam / Pasien Keluar) × 1000"
            batasMax="< 25‰"
            deskripsi="Net Death Rate — angka kematian ≥48 jam setelah masuk"
            statusColor={ndr > 25 ? "text-red-600" : "text-emerald-600"}
          />
          <IndikatorCard
            label="GDR"
            nilai={gdr}
            satuan="‰"
            rumus="(Total Mati / Pasien Keluar) × 1000"
            batasMax="< 45‰"
            deskripsi="Gross Death Rate — angka kematian seluruh pasien"
            statusColor={gdr > 45 ? "text-red-600" : "text-emerald-600"}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Tren BOR Bulanan (%)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendBOR}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => [`${v}%`, "BOR"]} />
                <ReferenceLine y={85} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Batas 85%", fontSize: 11, fill: "#ef4444" }} />
                <ReferenceLine y={70} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Min 70%", fontSize: 11, fill: "#f59e0b" }} />
                <Line type="monotone" dataKey="bor" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="BOR" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Tren Mortalitas (‰)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendMortalitas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v, name) => [`${v}‰`, name === "ndr" ? "NDR" : "GDR"]} />
                <Line type="monotone" dataKey="ndr" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} name="ndr" />
                <Line type="monotone" dataKey="gdr" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} name="gdr" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alert Monitoring */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-yellow-500" />
            <h3 className="font-semibold text-gray-900">Alert Monitoring Indikator</h3>
          </div>
          <div className="space-y-3">
            {alertData.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3.5 rounded-lg border ${
                  alert.status === "Critical"
                    ? "bg-red-50 border-red-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                {alert.status === "Critical" ? (
                  <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                ) : (
                  <AlertTriangle size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      alert.status === "Critical" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {alert.status}
                    </span>
                    <span className="text-xs text-gray-500">{alert.unit}</span>
                    <span className="ml-auto text-xs text-gray-400">{alert.waktu}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-1">{alert.jenis}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Nilai saat ini: <strong>{alert.nilai}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Formula */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-blue-800 text-sm">Sumber Kalkulasi Otomatis</p>
              <p className="text-xs text-blue-700 mt-1">
                Seluruh indikator dihitung otomatis oleh Census Engine dari data transaksi pelayanan harian.
                Formula mengacu pada Petunjuk Teknis SIRS Revisi 6.3 Tahun 2025 (Kemenkes RI).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
