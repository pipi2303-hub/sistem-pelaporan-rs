import Header from "@/components/layout/Header";
import { bedData } from "@/lib/dummy-data";
import { getOccupancyColor } from "@/lib/utils";
import { BedDouble, Activity } from "lucide-react";

const bedStatusColors: Record<string, string> = {
  Terisi: "bg-blue-500",
  Kosong: "bg-green-500",
  Booking: "bg-yellow-500",
  Maintenance: "bg-gray-400",
  Isolasi: "bg-purple-500",
};

export default function BedManagementPage() {
  const totalBed = bedData.reduce((s, r) => s + r.totalBed, 0);
  const totalTerpakai = bedData.reduce((s, r) => s + r.terpakai, 0);
  const totalKosong = bedData.reduce((s, r) => s + r.kosong, 0);
  const totalBooking = bedData.reduce((s, r) => s + r.booking, 0);
  const totalIsolasi = bedData.reduce((s, r) => s + r.isolasi, 0);
  const borKeseluruhan = Math.round((totalTerpakai / totalBed) * 100);

  return (
    <div>
      <Header
        title="RL 1 — Bed Management"
        subtitle="Monitoring tempat tidur realtime (RL 1.3)"
      />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Tempat Tidur", value: totalBed, color: "text-gray-800", bg: "bg-white" },
            { label: "Terpakai", value: totalTerpakai, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
            { label: "Kosong", value: totalKosong, color: "text-green-600", bg: "bg-green-50 border-green-100" },
            { label: "Booking", value: totalBooking, color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-100" },
            { label: "Isolasi", value: totalIsolasi, color: "text-purple-600", bg: "bg-purple-50 border-purple-100" },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-xl border p-4 shadow-sm text-center ${bg}`}>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* BOR Keseluruhan */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              <span className="font-semibold text-gray-900">BOR Keseluruhan</span>
            </div>
            <span
              className={`text-lg font-bold ${
                borKeseluruhan >= 85 ? "text-red-600" : borKeseluruhan >= 70 ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {borKeseluruhan}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${getOccupancyColor(borKeseluruhan)}`}
              style={{ width: `${borKeseluruhan}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>0%</span>
            <span className="text-yellow-500">70% (Min)</span>
            <span className="text-red-500">85% (Batas)</span>
            <span>100%</span>
          </div>
        </div>

        {/* Tabel per Ruangan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <BedDouble size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-900">Kapasitas per Ruangan</h3>
            <span className="ml-auto text-xs text-gray-500">Update realtime</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">Ruangan</th>
                  <th className="px-6 py-3 text-left">Kelas</th>
                  <th className="px-6 py-3 text-center">Total TT</th>
                  <th className="px-6 py-3 text-center">Terpakai</th>
                  <th className="px-6 py-3 text-center">Kosong</th>
                  <th className="px-6 py-3 text-center">Booking</th>
                  <th className="px-6 py-3 text-center">Isolasi</th>
                  <th className="px-6 py-3 text-left">BOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bedData.map((row) => {
                  const bor = Math.round((row.terpakai / row.totalBed) * 100);
                  return (
                    <tr key={row.ruangan} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-gray-800">{row.ruangan}</td>
                      <td className="px-6 py-3.5 text-gray-600">{row.kelas}</td>
                      <td className="px-6 py-3.5 text-center font-medium">{row.totalBed}</td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          {row.terpakai}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          {row.kosong}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          {row.booking}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          {row.isolasi}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getOccupancyColor(bor)}`}
                              style={{ width: `${bor}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs font-bold w-10 text-right ${
                              bor >= 90 ? "text-red-600" : bor >= 75 ? "text-yellow-600" : "text-green-600"
                            }`}
                          >
                            {bor}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legenda Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Legenda Status Tempat Tidur</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(bedStatusColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-sm text-gray-700">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
