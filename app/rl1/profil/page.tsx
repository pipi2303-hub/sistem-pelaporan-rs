import Header from "@/components/layout/Header";
import { profilRS } from "@/lib/dummy-data";
import { getStatusColor } from "@/lib/utils";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  Shield,
  Link2,
  CheckCircle2,
} from "lucide-react";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start py-3 border-b border-gray-100 last:border-0">
      <span className="w-44 text-sm text-gray-500 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

export default function ProfilPage() {
  const integrasiEntries = Object.entries(profilRS.integrasi);

  return (
    <div>
      <Header
        title="RL 1 — Profil Rumah Sakit"
        subtitle="Master data identitas dan integrasi nasional"
      />

      <div className="p-6 space-y-6">
        {/* Identitas RS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card Identitas */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-blue-100 p-2.5 rounded-xl">
                <Building2 size={22} className="text-blue-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Identitas Rumah Sakit</h2>
                <p className="text-xs text-gray-500">Data master RL 1.1</p>
              </div>
            </div>

            <InfoRow label="Nama RS" value={profilRS.nama} />
            <InfoRow label="Kode RS" value={profilRS.kode} />
            <InfoRow label="Jenis RS" value={profilRS.jenis} />
            <InfoRow label="Kelas RS" value={profilRS.kelas} />
            <InfoRow label="Kepemilikan" value={profilRS.kepemilikan} />
            <InfoRow label="Status Akreditasi" value={profilRS.akreditasi} />
            <InfoRow label="No. Izin Operasional" value={profilRS.nomorIzin} />
            <InfoRow label="Direktur" value={profilRS.direktur} />
          </div>

          {/* Card Lokasi & Kontak */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-gray-600" />
                <h3 className="font-semibold text-gray-900">Lokasi</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-500">Alamat</p>
                  <p className="font-medium text-gray-800">{profilRS.alamat}</p>
                </div>
                <div className="flex gap-6 pt-1">
                  <div>
                    <p className="text-gray-500">Kabupaten/Kota</p>
                    <p className="font-medium text-gray-800">{profilRS.kabupaten}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Provinsi</p>
                    <p className="font-medium text-gray-800">{profilRS.provinsi}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Phone size={18} className="text-gray-600" />
                <h3 className="font-semibold text-gray-900">Kontak</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-400" />
                  <span className="text-gray-800">{profilRS.telepon}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  <span className="text-gray-800">{profilRS.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-400" />
                  <span className="text-gray-800">{profilRS.direktur}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Integrasi Nasional */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-green-100 p-2.5 rounded-xl">
              <Link2 size={22} className="text-green-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Integrasi Nasional</h2>
              <p className="text-xs text-gray-500">Status koneksi sistem eksternal</p>
            </div>
            <div className="ml-auto">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                {integrasiEntries.filter(([, v]) => v === "Connected").length}/{integrasiEntries.length} Aktif
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { key: "satusehat", label: "SATUSEHAT", desc: "Interoperabilitas" },
              { key: "bpjs", label: "BPJS VClaim", desc: "SEP & Klaim" },
              { key: "eclaim", label: "EClaim INA-CBG", desc: "Klaim INA-CBG" },
              { key: "sirsOnline", label: "SIRS Online", desc: "Pelaporan RL" },
              { key: "sisrute", label: "SISRUTE", desc: "Rujukan" },
              { key: "aspak", label: "ASPAK", desc: "Sarpras" },
              { key: "sisdmk", label: "SISDMK", desc: "SDM Kesehatan" },
            ].map(({ key, label, desc }) => {
              const status = profilRS.integrasi[key as keyof typeof profilRS.integrasi];
              const isConnected = status === "Connected";
              return (
                <div
                  key={key}
                  className={`rounded-xl border p-4 text-center ${
                    isConnected ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                  }`}
                >
                  <CheckCircle2
                    size={20}
                    className={`mx-auto mb-2 ${isConnected ? "text-green-500" : "text-red-400"}`}
                  />
                  <p className="text-xs font-bold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  <span
                    className={`mt-2 inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusColor(status)}`}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Akreditasi & Kepatuhan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-purple-100 p-2.5 rounded-xl">
              <Shield size={22} className="text-purple-600" />
            </div>
            <h2 className="font-bold text-gray-900">Akreditasi & Kepatuhan</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Status Akreditasi", value: profilRS.akreditasi, color: "bg-green-100 text-green-800" },
              { label: "Kelas RS", value: `Kelas ${profilRS.kelas}`, color: "bg-blue-100 text-blue-800" },
              { label: "Kepemilikan", value: profilRS.kepemilikan, color: "bg-purple-100 text-purple-800" },
              { label: "Jenis RS", value: profilRS.jenis, color: "bg-yellow-100 text-yellow-800" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <span className={`inline-block text-sm font-bold px-2.5 py-1 rounded-lg ${color}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
