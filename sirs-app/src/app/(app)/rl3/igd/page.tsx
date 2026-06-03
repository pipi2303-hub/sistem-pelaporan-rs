'use client'

import { infoRS } from '@/lib/dummy-data'
import { Users, FileText, Filter } from 'lucide-react'

const pengunjungBaru = 3842
const pengunjungLama = 8215
const total = pengunjungBaru + pengunjungLama

export default function RekPengunjungPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Pengunjung (RL 3.4)</h1>
            <p className="text-sm text-slate-500">Pendaftaran (Admission) — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.4.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-md">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-16">No</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600">Jenis Pengunjung</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <td className="border border-slate-200 px-4 py-2 text-center text-slate-500">1</td>
              <td className="border border-slate-200 px-4 py-2 text-slate-700">Pengunjung Baru</td>
              <td className="border border-slate-200 px-4 py-2 text-center font-semibold text-blue-700">{pengunjungBaru.toLocaleString('id')}</td>
            </tr>
            <tr className="hover:bg-blue-50/30 transition-colors">
              <td className="border border-slate-200 px-4 py-2 text-center text-slate-500">2</td>
              <td className="border border-slate-200 px-4 py-2 text-slate-700">Pengunjung Lama</td>
              <td className="border border-slate-200 px-4 py-2 text-center font-semibold text-slate-700">{pengunjungLama.toLocaleString('id')}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-600">99</td>
              <td className="border border-slate-300 px-4 py-2 text-slate-800 font-bold">TOTAL</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-800 font-bold">{total.toLocaleString('id')}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Petunjuk pengisian */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3 max-w-3xl">
        <p className="text-sm font-semibold text-slate-700">Pengisian formulir 3.4 Rekapitulasi Pengunjung sebagai berikut:</p>
        <ol className="list-decimal list-outside pl-5 space-y-2 text-sm text-slate-600">
          <li>
            Pengunjung Baru adalah pengunjung yang baru pertama kali datang ke Rumah Sakit dan mendapatkan nomor rekam medis baru. Nomor rekam medis diberikan hanya sekali seumur hidup. Pengunjung baru dapat melakukan kunjungan di beberapa Poliklinik atau IGD sebagai kunjungan baru dengan kasus baru.
          </li>
          <li>
            Pengunjung Lama adalah pengunjung yang datang untuk kedua kali dan seterusnya, yang datang ke poliklinik yang sama atau berbeda sebagai kunjungan lama atau kunjungan baru dengan kasus lama atau kasus baru. Pengunjung lama tidak mendapat Nomor Rekam Medis lagi.
          </li>
          <li>
            Jika 1 pasien datang beberapa kali dalam 1 bulan, maka hanya dihitung sebagai 1 pengunjung lama.
          </li>
          <li>
            Contoh kasus:
            <ol className="list-[lower-alpha] list-outside pl-5 mt-1 space-y-1">
              <li>Pasien A baru datang pertama kali ke RS di bulan Januari 2024, dapat nomor rekam medis, datang ke poliklinik, maka dihitung sebagai 1 pengunjung baru.</li>
              <li>Pasien A datang lagi ke RS di bulan Januari 2024, ke IGD atau Rawat Jalan atau Rawat Inap atau ke unit penunjang, dengan kasus sama/berbeda, maka dihitung sebagai 1 pengunjung lama.</li>
              <li>Pasien A datang lagi ke RS di bulan Januari 2024, berbeda hari, ke IGD atau Rawat Jalan atau Rawat Inap atau ke unit penunjang, dengan kasus sama/berbeda, maka tidak dihitung ke pengunjung lagi.</li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  )
}
