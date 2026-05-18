import Header from "@/components/layout/Header";
import KpiCard from "@/components/dashboard/KpiCard";
import AlertPanel from "@/components/dashboard/AlertPanel";
import { BORChart, KunjunganChart, MortalitasChart } from "@/components/dashboard/TrendChart";
import { kpiDashboard, occupancyHarian } from "@/lib/dummy-data";
import { getOccupancyColor } from "@/lib/utils";
import {
  Users,
  BedDouble,
  Ambulance,
  Activity,
  Heart,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <Header
        title="Dashboard Executive"
        subtitle="RS Harapan Sehat Nasional — Periode Mei 2026"
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Kunjungan"
            value={kpiDashboard.totalKunjungan}
            unit="pasien"
            icon={Users}
            color="blue"
            trend={3.2}
            subtitle="Mei 2026"
          />
          <KpiCard
            title="BOR"
            value={`${kpiDashboard.bor}%`}
            icon={BedDouble}
            color="green"
            trend={-1.5}
            subtitle="Bed Occupancy Rate"
          />
          <KpiCard
            title="Occupancy ICU"
            value={`${kpiDashboard.occupancyICU}%`}
            icon={Activity}
            color="red"
            trend={5.0}
            subtitle="Kapasitas penuh"
          />
          <KpiCard
            title="Rawat Inap"
            value={kpiDashboard.pasienRawatInap}
            unit="pasien"
            icon={Heart}
            color="purple"
            trend={2.0}
            subtitle="Masuk bulan ini"
          />
          <KpiCard
            title="Kunjungan IGD"
            value={kpiDashboard.kunjunganIGD}
            unit="pasien"
            icon={Ambulance}
            color="yellow"
            trend={4.1}
            subtitle="Bulan berjalan"
          />
          <KpiCard
            title="Mortalitas"
            value={`${kpiDashboard.mortalitas}%`}
            icon={AlertTriangle}
            color="red"
            trend={0.2}
            subtitle="GDR bulan ini"
          />
          <KpiCard
            title="Rata-rata Tunggu"
            value={kpiDashboard.waitingTime}
            unit="menit"
            icon={Clock}
            color="blue"
            trend={-3.0}
            subtitle="Rawat Jalan"
          />
          <KpiCard
            title="Total Tempat Tidur"
            value={kpiDashboard.totalBed}
            unit="TT"
            icon={TrendingUp}
            color="green"
            subtitle="Kapasitas aktif"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BORChart />
          <KunjunganChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MortalitasChart />

          {/* Occupancy per Unit */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Occupancy per Unit</h3>
            <div className="space-y-3">
              {occupancyHarian.map((unit) => (
                <div key={unit.unit}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{unit.unit}</span>
                    <span
                      className={
                        unit.occupancy >= 90
                          ? "text-red-600 font-bold"
                          : unit.occupancy >= 75
                          ? "text-yellow-600 font-semibold"
                          : "text-green-600 font-semibold"
                      }
                    >
                      {unit.occupancy}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getOccupancyColor(unit.occupancy)}`}
                      style={{ width: `${unit.occupancy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Panel */}
          <AlertPanel />
        </div>
      </div>
    </div>
  );
}
