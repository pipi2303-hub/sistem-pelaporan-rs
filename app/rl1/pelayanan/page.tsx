import Header from "@/components/layout/Header";
import { pelayananRS } from "@/lib/dummy-data";
import { Stethoscope, CheckCircle2 } from "lucide-react";

const jenisColors: Record<string, string> = {
  Spesialis: "bg-blue-100 text-blue-700",
  "ICU/Intensif": "bg-red-100 text-red-700",
  Penunjang: "bg-purple-100 text-purple-700",
};

export default function PelayananPage() {
  const grouped = pelayananRS.reduce<Record<string, typeof pelayananRS>>((acc, p) => {
    if (!acc[p.jenis]) acc[p.jenis] = [];
    acc[p.jenis].push(p);
    return acc;
  }, {});

  return (
    <div>
      <Header
        title="RL 1 — Master Pelayanan"
        subtitle="Mapping pelayanan rumah sakit (RL 1.2)"
      />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-600">{pelayananRS.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total Pelayanan</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">
              {pelayananRS.filter((p) => p.status === "Aktif").length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Aktif</p>
          </div>
          {Object.entries(grouped).map(([jenis, items]) => (
            <div key={jenis} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-gray-800">{items.length}</p>
              <p className="text-sm text-gray-500 mt-1">{jenis}</p>
            </div>
          ))}
        </div>

        {/* Grouped Tables */}
        {Object.entries(grouped).map(([jenis, items]) => (
          <div key={jenis} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Stethoscope size={16} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{jenis}</h3>
              <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full ${jenisColors[jenis] ?? "bg-gray-100 text-gray-700"}`}>
                {items.length} layanan
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <th className="px-6 py-3 text-left">No</th>
                    <th className="px-6 py-3 text-left">Nama Pelayanan</th>
                    <th className="px-6 py-3 text-left">Jenis</th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5 text-gray-400">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-medium text-gray-800">{p.nama}</td>
                      <td className="px-6 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${jenisColors[p.jenis] ?? "bg-gray-100 text-gray-700"}`}>
                          {p.jenis}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="flex items-center gap-1.5 text-green-700">
                          <CheckCircle2 size={14} className="text-green-500" />
                          <span className="text-xs font-semibold">{p.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
