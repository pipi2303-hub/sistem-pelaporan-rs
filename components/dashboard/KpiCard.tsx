import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  color?: "blue" | "green" | "red" | "yellow" | "purple";
  trend?: number;
  subtitle?: string;
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  green: "bg-green-50 text-green-600 border-green-100",
  red: "bg-red-50 text-red-600 border-red-100",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
};

const iconBgMap = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  red: "bg-red-100 text-red-600",
  yellow: "bg-yellow-100 text-yellow-600",
  purple: "bg-purple-100 text-purple-600",
};

export default function KpiCard({
  title,
  value,
  unit,
  icon: Icon,
  color = "blue",
  trend,
  subtitle,
}: KpiCardProps) {
  return (
    <div className={cn("bg-white rounded-xl border p-5 shadow-sm", colorMap[color].split(" ")[2])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-2xl font-bold text-gray-900">
              {typeof value === "number" ? value.toLocaleString("id-ID") : value}
            </span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-xs font-medium px-1.5 py-0.5 rounded",
                  trend >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}
              >
                {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
              </span>
              <span className="text-xs text-gray-400">vs bulan lalu</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconBgMap[color])}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
