import { AlertTriangle, AlertCircle, Bell } from "lucide-react";
import { alertData } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

export default function AlertPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Bell size={18} className="text-gray-600" />
        <h3 className="font-semibold text-gray-900">Alert Monitoring</h3>
        <span className="ml-auto bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
          {alertData.length} aktif
        </span>
      </div>
      <div className="space-y-3">
        {alertData.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border",
              alert.status === "Critical"
                ? "bg-red-50 border-red-200"
                : "bg-yellow-50 border-yellow-200"
            )}
          >
            {alert.status === "Critical" ? (
              <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-yellow-500 mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xs font-bold px-1.5 py-0.5 rounded",
                    alert.status === "Critical"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  )}
                >
                  {alert.status}
                </span>
                <span className="text-xs text-gray-500">{alert.unit}</span>
              </div>
              <p className="text-sm font-medium text-gray-800 mt-1">{alert.jenis}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">{alert.waktu}</span>
                <span className="text-xs font-semibold text-gray-700">Nilai: {alert.nilai}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
