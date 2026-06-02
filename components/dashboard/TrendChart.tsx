"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { trendBOR, trendKunjungan, trendMortalitas } from "@/lib/dummy-data";

export function BORChart() {
  return (
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
  );
}

export function KunjunganChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Tren Kunjungan Bulanan</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={trendKunjungan}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="rawatJalan" name="Rawat Jalan" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="rawatInap" name="Rawat Inap" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="igd" name="IGD" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MortalitasChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Tren Mortalitas (‰)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={trendMortalitas}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v, name) => [`${v}‰`, name === "ndr" ? "NDR" : "GDR"]} />
          <Legend formatter={(v) => (v === "ndr" ? "NDR" : "GDR")} />
          <Line type="monotone" dataKey="ndr" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} name="ndr" />
          <Line type="monotone" dataKey="gdr" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} name="gdr" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
