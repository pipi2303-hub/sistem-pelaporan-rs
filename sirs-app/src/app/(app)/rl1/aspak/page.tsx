'use client';

import { useState } from 'react';
import {
  Building2,
  Landmark,
  BedDouble,
  LayoutGrid,
  Stethoscope,
  DoorOpen,
  Printer,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import { infoRS } from '@/lib/dummy-data';

// ─── Types ───────────────────────────────────────────────────────────────────

type TabId = 'ringkasan' | 'sarana' | 'prasarana' | 'kalibrasi' | 'tindaklanjut';

interface Tab {
  id: TabId;
  label: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  { id: 'ringkasan', label: 'Ringkasan' },
  { id: 'sarana', label: 'Sarana' },
  { id: 'prasarana', label: 'Prasarana & Alkes' },
  { id: 'kalibrasi', label: 'Kalibrasi & Pemeliharaan' },
  { id: 'tindaklanjut', label: 'Tindak Lanjut' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SummaryCard({
  icon: Icon,
  label,
  value,
  colorClass,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  colorClass: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function ProgressBar({
  label,
  pct,
  colorClass,
}: {
  label: string;
  pct: number;
  colorClass: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="font-semibold text-gray-800">{pct}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Badge({
  label,
  variant,
}: {
  label: string;
  variant: 'green' | 'red' | 'amber' | 'blue';
}) {
  const cls: Record<string, string> = {
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-blue-100 text-blue-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls[variant]}`}>
      {label}
    </span>
  );
}

// ─── Tab Content ─────────────────────────────────────────────────────────────

function TabRingkasan() {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard icon={Building2} label="Luas Bangunan" value="35.000 m²" colorClass="bg-blue-500" />
        <SummaryCard icon={Landmark} label="Jumlah Gedung" value={5} colorClass="bg-indigo-500" />
        <SummaryCard icon={BedDouble} label="Total Tempat Tidur" value={375} colorClass="bg-green-500" />
        <SummaryCard icon={LayoutGrid} label="Total Sarana" value={156} colorClass="bg-amber-500" />
        <SummaryCard icon={Stethoscope} label="Total Alat Kesehatan" value="2.350" colorClass="bg-rose-500" />
        <SummaryCard icon={DoorOpen} label="Ruangan Pelayanan" value={156} colorClass="bg-cyan-500" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Profil RS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-700 text-sm">Profil Rumah Sakit</h3>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['Nama RS', 'RSUD Dr. Soetomo'],
                ['Kelas', 'B'],
                ['Kepemilikan', 'Pemerintah Daerah'],
                ['Status Operasional', 'Aktif'],
                ['Periode', infoRS.periodeAktif],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-2.5 text-gray-500 w-44">{k}</td>
                  <td className="px-5 py-2.5 text-gray-800 font-medium">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Skor ASPAK */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-700 text-sm mb-4">Skor ASPAK</h3>
          <ProgressBar label="Sarana" pct={93} colorClass="bg-blue-500" />
          <ProgressBar label="Prasarana" pct={98} colorClass="bg-green-500" />
          <ProgressBar label="Alat Kesehatan" pct={94} colorClass="bg-amber-500" />
          <ProgressBar label="Dokumentasi" pct={100} colorClass="bg-emerald-500" />

          <div className="mt-5 rounded-xl bg-green-50 border border-green-200 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Skor Total ASPAK</p>
              <p className="text-4xl font-extrabold text-green-700">95%</p>
            </div>
            <span className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-semibold">
              MEMENUHI STANDAR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabSarana() {
  const rows = [
    { no: 1, nama: 'IGD', jumlah: '1', luas: '1.250', kondisi: 'Baik' },
    { no: 2, nama: 'ICU', jumlah: '1', luas: '500', kondisi: 'Baik' },
    { no: 3, nama: 'NICU', jumlah: '1', luas: '250', kondisi: 'Baik' },
    { no: 4, nama: 'PICU', jumlah: '1', luas: '250', kondisi: 'Baik' },
    { no: 5, nama: 'Kamar Operasi', jumlah: '6', luas: '900', kondisi: 'Baik' },
    { no: 6, nama: 'Rawat Jalan', jumlah: '40 Poli', luas: '2.500', kondisi: 'Baik' },
    { no: 7, nama: 'Laboratorium', jumlah: '1', luas: '400', kondisi: 'Baik' },
    { no: 8, nama: 'Radiologi', jumlah: '1', luas: '450', kondisi: 'Baik' },
    { no: 9, nama: 'Farmasi', jumlah: '1', luas: '350', kondisi: 'Baik' },
    { no: 10, nama: 'CSSD', jumlah: '1', luas: '200', kondisi: 'Baik' },
  ];

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Sarana', value: '156', color: 'text-gray-800' },
          { label: 'Sesuai Standar', value: '145', color: 'text-green-700' },
          { label: 'Belum Sesuai', value: '11', color: 'text-red-600' },
          { label: 'Kepatuhan', value: '93%', color: 'text-green-700', badge: true },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
            <p className="text-xs text-gray-500 mb-1">{c.label}</p>
            {c.badge ? (
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-lg font-bold">
                {c.value}
              </span>
            ) : (
              <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-700 text-sm">Sarana Pelayanan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Sarana</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Jumlah Ruangan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Luas Total (m²)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Kondisi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.no} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{r.no}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{r.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{r.jumlah}</td>
                  <td className="px-4 py-3 text-gray-600">{r.luas}</td>
                  <td className="px-4 py-3">
                    <Badge label={r.kondisi} variant="green" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabPrasarana() {
  const prasarana = [
    { no: 1, nama: 'Genset', kapasitas: '1000 KVA', kondisi: 'Baik', status: 'Aktif' },
    { no: 2, nama: 'IPAL', kapasitas: '500 m³', kondisi: 'Baik', status: 'Aktif' },
    { no: 3, nama: 'Lift Pasien', kapasitas: '4 Unit', kondisi: 'Baik', status: 'Aktif' },
    { no: 4, nama: 'Medical Gas System', kapasitas: 'Sentral', kondisi: 'Baik', status: 'Aktif' },
    { no: 5, nama: 'Fire Hydrant', kapasitas: '25 Titik', kondisi: 'Baik', status: 'Aktif' },
    { no: 6, nama: 'CCTV', kapasitas: '150 Titik', kondisi: 'Baik', status: 'Aktif' },
    { no: 7, nama: 'HVAC', kapasitas: 'Sentral', kondisi: 'Baik', status: 'Aktif' },
    { no: 8, nama: 'UPS Data Center', kapasitas: '120 KVA', kondisi: 'Baik', status: 'Aktif' },
  ];

  const alkes = [
    { no: 1, nama: 'Ventilator', merk: 'GE Carescape', jumlah: 15, kondisi: 'Baik', kalibrasi: 'Valid', lokasi: 'ICU' },
    { no: 2, nama: 'Defibrillator', merk: 'Philips', jumlah: 8, kondisi: 'Baik', kalibrasi: 'Valid', lokasi: 'IGD' },
    { no: 3, nama: 'Patient Monitor', merk: 'Mindray', jumlah: 35, kondisi: 'Baik', kalibrasi: 'Valid', lokasi: 'ICU' },
    { no: 4, nama: 'CT Scan 128 Slice', merk: 'Siemens', jumlah: 1, kondisi: 'Baik', kalibrasi: 'Valid', lokasi: 'Radiologi' },
    { no: 5, nama: 'MRI 1.5 Tesla', merk: 'GE', jumlah: 1, kondisi: 'Baik', kalibrasi: 'Valid', lokasi: 'Radiologi' },
    { no: 6, nama: 'USG 4D', merk: 'Samsung', jumlah: 10, kondisi: 'Baik', kalibrasi: 'Valid', lokasi: 'Obgyn' },
    { no: 7, nama: 'Hematology Analyzer', merk: 'Sysmex', jumlah: 2, kondisi: 'Baik', kalibrasi: 'Valid', lokasi: 'Laboratorium' },
  ];

  const kondisi = [
    { jenis: 'Ventilator', total: 15, baik: 14, rusak: 0, perbaikan: 1 },
    { jenis: 'ECG', total: 10, baik: 9, rusak: 1, perbaikan: 0 },
    { jenis: 'Monitor', total: 35, baik: 35, rusak: 0, perbaikan: 0 },
    { jenis: 'USG', total: 10, baik: 10, rusak: 0, perbaikan: 0 },
    { jenis: 'CT Scan', total: 1, baik: 1, rusak: 0, perbaikan: 0 },
    { jenis: 'MRI', total: 1, baik: 1, rusak: 0, perbaikan: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Prasarana */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-700 text-sm">Prasarana</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Prasarana</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Kapasitas</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Kondisi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {prasarana.map((r) => (
                <tr key={r.no} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{r.no}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{r.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{r.kapasitas}</td>
                  <td className="px-4 py-3"><Badge label={r.kondisi} variant="green" /></td>
                  <td className="px-4 py-3"><Badge label={r.status} variant="blue" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alat Kesehatan Utama */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-700 text-sm">Alat Kesehatan Utama</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Alat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Merk/Tipe</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Jumlah</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Kondisi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Kalibrasi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Lokasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alkes.map((r) => (
                <tr key={r.no} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{r.no}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{r.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{r.merk}</td>
                  <td className="px-4 py-3 text-gray-600">{r.jumlah}</td>
                  <td className="px-4 py-3"><Badge label={r.kondisi} variant="green" /></td>
                  <td className="px-4 py-3"><Badge label={r.kalibrasi} variant="green" /></td>
                  <td className="px-4 py-3 text-gray-600">{r.lokasi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kondisi Alat */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-700 text-sm">Kondisi Alat Kesehatan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Jenis Alat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Baik</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Rusak</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Perbaikan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {kondisi.map((r) => (
                <tr key={r.jenis} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{r.jenis}</td>
                  <td className="px-4 py-3 text-gray-600">{r.total}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">{r.baik}</td>
                  <td className="px-4 py-3">
                    {r.rusak > 0 ? (
                      <Badge label={String(r.rusak)} variant="red" />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {r.perbaikan > 0 ? (
                      <Badge label={String(r.perbaikan)} variant="amber" />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabKalibrasi() {
  const kalibrasi = [
    { no: 1, nama: 'Ventilator ICU-01', kode: 'ALK001', tgl: '15-01-2026', berlaku: '15-01-2027', status: 'Aktif' as const },
    { no: 2, nama: 'Ventilator ICU-02', kode: 'ALK002', tgl: '15-01-2026', berlaku: '15-01-2027', status: 'Aktif' as const },
    { no: 3, nama: 'Syringe Pump-01', kode: 'ALK003', tgl: '10-03-2025', berlaku: '10-03-2026', status: 'Expired' as const },
    { no: 4, nama: 'ECG Unit IGD', kode: 'ALK004', tgl: '20-02-2026', berlaku: '20-02-2027', status: 'Aktif' as const },
  ];

  const pm = [
    { bulan: 'Januari', jadwal: 150, selesai: 148, pending: 2, pct: '98.7%' },
    { bulan: 'Februari', jadwal: 145, selesai: 145, pending: 0, pct: '100%' },
    { bulan: 'Maret', jadwal: 160, selesai: 157, pending: 3, pct: '98.1%' },
    { bulan: 'April', jadwal: 155, selesai: 154, pending: 1, pct: '99.4%' },
    { bulan: 'Mei', jadwal: 150, selesai: 149, pending: 1, pct: '99.3%' },
  ];

  const cm = [
    { alat: 'Ventilator ICU-07', lokasi: 'ICU', tgl: '10-05-2026', status: 'Dalam Perbaikan' as const },
    { alat: 'ECG IGD-02', lokasi: 'IGD', tgl: '22-05-2026', status: 'Selesai' as const },
    { alat: 'Syringe Pump-03', lokasi: 'ICU', tgl: '25-05-2026', status: 'Dalam Perbaikan' as const },
  ];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Alat', value: '2.350', variant: 'gray' },
          { label: 'Terkalibrasi', value: '2.210', variant: 'green' },
          { label: 'Belum Kalibrasi', value: '140', variant: 'red' },
          { label: 'Kepatuhan', value: '94%', variant: 'green' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
            <p className="text-xs text-gray-500 mb-1">{c.label}</p>
            <p
              className={`text-2xl font-bold ${
                c.variant === 'green'
                  ? 'text-green-700'
                  : c.variant === 'red'
                  ? 'text-red-600'
                  : 'text-gray-800'
              }`}
            >
              {c.value}
            </p>
          </div>
        ))}
      </div>

      {/* Status Kalibrasi */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-700 text-sm">Status Kalibrasi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Alat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Kode Aset</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal Kalibrasi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Berlaku Sampai</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {kalibrasi.map((r) => (
                <tr key={r.no} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{r.no}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{r.nama}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs">{r.kode}</td>
                  <td className="px-4 py-3 text-gray-600">{r.tgl}</td>
                  <td className="px-4 py-3 text-gray-600">{r.berlaku}</td>
                  <td className="px-4 py-3">
                    <Badge
                      label={r.status}
                      variant={r.status === 'Aktif' ? 'green' : 'red'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preventive Maintenance */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-700 text-sm">Preventive Maintenance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Bulan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Jadwal PM</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Selesai</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Pending</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pm.map((r) => (
                <tr key={r.bulan} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{r.bulan}</td>
                  <td className="px-4 py-3 text-gray-600">{r.jadwal}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">{r.selesai}</td>
                  <td className="px-4 py-3">
                    {r.pending > 0 ? (
                      <Badge label={String(r.pending)} variant="amber" />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-700">{r.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Corrective Maintenance */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-700 text-sm">Corrective Maintenance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Alat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Lokasi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal Rusak</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cm.map((r) => (
                <tr key={r.alat} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{r.alat}</td>
                  <td className="px-4 py-3 text-gray-600">{r.lokasi}</td>
                  <td className="px-4 py-3 text-gray-600">{r.tgl}</td>
                  <td className="px-4 py-3">
                    <Badge
                      label={r.status}
                      variant={r.status === 'Selesai' ? 'green' : 'amber'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabTindakLanjut() {
  const temuan = [
    '140 alat belum memiliki sertifikat kalibrasi aktif.',
    '11 ruangan belum memenuhi standar luas minimum.',
    '1 ventilator sedang dalam proses perbaikan.',
  ];

  const rencana = [
    { no: 1, kegiatan: 'Kalibrasi alat expired', target: 'Juli 2026' },
    { no: 2, kegiatan: 'Renovasi ruang pelayanan', target: 'Agustus 2026' },
    { no: 3, kegiatan: 'Penggantian alat rusak', target: 'Juli 2026' },
  ];

  const persetujuan = [
    { jabatan: 'Kepala IPSRS', nama: '—', ttd: '—' },
    { jabatan: 'Kepala Elektromedis', nama: '—', ttd: '—' },
    { jabatan: 'Direktur RS', nama: 'dr. Ahmad Basuki, Sp.PD', ttd: '—' },
  ];

  return (
    <div className="space-y-6">
      {/* Temuan */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-700 text-sm mb-4">Temuan</h3>
        <div className="space-y-3">
          {temuan.map((t, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-amber-700 mr-1">{i + 1}.</span>
                {t}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rencana Perbaikan */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-700 text-sm">Rencana Perbaikan</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">No</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Kegiatan</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rencana.map((r) => (
              <tr key={r.no} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{r.no}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{r.kegiatan}</td>
                <td className="px-4 py-3 text-gray-600">{r.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Persetujuan */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-700 text-sm">Persetujuan</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Jabatan</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanda Tangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {persetujuan.map((r) => (
              <tr key={r.jabatan} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{r.jabatan}</td>
                <td className="px-4 py-3 text-gray-600">{r.nama}</td>
                <td className="px-4 py-3 text-gray-400 italic">{r.ttd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AspakPage() {
  const [activeTab, setActiveTab] = useState<TabId>('ringkasan');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-100">
            <Building2 className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Sarana Prasarana dan Alat Kesehatan (RL 1.4)
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              ASPAK — Aplikasi Sarana Prasarana dan Alat Kesehatan
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Printer className="w-4 h-4" />
            Cetak PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Sinkronisasi ASPAK
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'ringkasan' && <TabRingkasan />}
        {activeTab === 'sarana' && <TabSarana />}
        {activeTab === 'prasarana' && <TabPrasarana />}
        {activeTab === 'kalibrasi' && <TabKalibrasi />}
        {activeTab === 'tindaklanjut' && <TabTindakLanjut />}
      </div>
    </div>
  );
}
