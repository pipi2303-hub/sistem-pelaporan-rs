import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return n.toLocaleString("id-ID");
}

export function getBORStatus(bor: number): { label: string; color: string } {
  if (bor >= 85) return { label: "Tinggi", color: "text-red-600" };
  if (bor >= 70) return { label: "Optimal", color: "text-green-600" };
  return { label: "Rendah", color: "text-yellow-600" };
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "connected":
    case "aktif":
    case "sukses":
      return "bg-green-100 text-green-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "critical":
    case "error":
      return "bg-red-100 text-red-800";
    case "disconnected":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
}

export function getOccupancyColor(pct: number): string {
  if (pct >= 90) return "bg-red-500";
  if (pct >= 75) return "bg-yellow-500";
  return "bg-green-500";
}

export function getTriageColor(triage: string): string {
  if (triage.includes("Merah")) return "bg-red-500";
  if (triage.includes("Kuning")) return "bg-yellow-500";
  if (triage.includes("Hijau")) return "bg-green-500";
  if (triage.includes("Hitam")) return "bg-gray-800";
  return "bg-gray-400";
}
