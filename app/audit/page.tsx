import Header from "@/components/layout/Header";
import { auditTrail } from "@/lib/dummy-data";
import { ClipboardList, CheckCircle2, User, Shield } from "lucide-react";

const roleColors: Record<string, string> = {
  ADMIN_RM: "bg-blue-100 text-blue-700",
  DIREKTUR: "bg-purple-100 text-purple-700",
  PETUGAS_PELAYANAN: "bg-green-100 text-green-700",
};

export default function AuditPage() {
  return (
    <div>
      <Header
        title="Audit Trail"
        subtitle="Log aktivitas sistem dan pelaporan RL"
      />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Aktivitas", value: auditTrail.length, color: "text-gray-800" },
            { label: "ADMIN_RM", value: auditTrail.filter(a => a.role === "ADMIN_RM").length, color: "text-blue-600" },
            { label: "DIREKTUR", value: auditTrail.filter(a => a.role === "DIREKTUR").length, color: "text-purple-600" },
            { label: "PETUGAS", value: auditTrail.filter(a => a.role === "PETUGAS_PELAYANAN").length, color: "text-green-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Info RBAC */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-blue-800 text-sm">RBAC — Role Based Access Control</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {[
                  { role: "ADMIN_RM", desc: "Generate laporan, validasi, approve RL" },
                  { role: "DIREKTUR", desc: "View Dashboard Executive" },
                  { role: "PETUGAS_PELAYANAN", desc: "Input pelayanan (tidak bisa akses laporan RL)" },
                ].map(({ role, desc }) => (
                  <div key={role} className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-blue-200">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${roleColors[role]}`}>{role}</span>
                    <span className="text-xs text-gray-600">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Log Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <ClipboardList size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-900">Log Aktivitas</h3>
            <span className="ml-auto text-xs text-gray-500">Hari ini · 18 Mei 2026</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Aktivitas</th>
                  <th className="px-6 py-3 text-left">Timestamp</th>
                  <th className="px-6 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {auditTrail.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                          <User size={12} className="text-white" />
                        </div>
                        <span className="font-medium text-gray-800">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${roleColors[log.role] ?? "bg-gray-100 text-gray-700"}`}>
                        {log.role}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-700">{log.aktivitas}</td>
                    <td className="px-6 py-3.5 text-gray-500 font-mono text-xs">{log.timestamp}</td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="flex items-center justify-center gap-1.5 text-green-700">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span className="text-xs font-semibold">{log.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Workflow Pelaporan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-5">Workflow Pelaporan RL Otomatis</h3>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-blue-200" />
            <div className="space-y-4">
              {[
                { step: 1, label: "Pasien registrasi pelayanan", status: "done" },
                { step: 2, label: "Pelayanan dilakukan & selesai", status: "done" },
                { step: 3, label: "Data transaksi tersimpan ke sistem", status: "done" },
                { step: 4, label: "Data masuk Census Engine (async)", status: "done" },
                { step: 5, label: "Data masuk Data Warehouse RL", status: "done" },
                { step: 6, label: "RL dihitung otomatis oleh engine", status: "done" },
                { step: 7, label: "Validasi sistem berjalan", status: "done" },
                { step: 8, label: "Approval Petugas RM", status: "done" },
                { step: 9, label: "Generate file RL", status: "active" },
                { step: 10, label: "Kirim ke SIRS Online Kemenkes", status: "pending" },
              ].map(({ step, label, status }) => (
                <div key={step} className="flex items-center gap-4 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 z-10 ${
                    status === "done" ? "bg-green-500 text-white" :
                    status === "active" ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                    "bg-gray-200 text-gray-500"
                  }`}>
                    {status === "done" ? <CheckCircle2 size={16} /> : step}
                  </div>
                  <div className={`flex-1 p-3 rounded-lg border ${
                    status === "done" ? "bg-green-50 border-green-200" :
                    status === "active" ? "bg-blue-50 border-blue-300" :
                    "bg-gray-50 border-gray-200"
                  }`}>
                    <span className={`text-sm font-medium ${
                      status === "done" ? "text-green-800" :
                      status === "active" ? "text-blue-800" :
                      "text-gray-500"
                    }`}>{label}</span>
                    {status === "active" && (
                      <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-bold">IN PROGRESS</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
