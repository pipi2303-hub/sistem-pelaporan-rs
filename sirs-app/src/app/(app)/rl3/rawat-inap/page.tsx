'use client'

import { useState } from 'react'
import { rawatInapPelayanan, infoRS } from '@/lib/dummy-data'
import { BedDouble, FileText, Filter } from 'lucide-react'

export default function RawatInapPelayananPage() {
  const [data] = useState(rawatInapPelayanan)

  const totalAwal      = data.reduce((s, r) => s + r.awal, 0)
  const totalMasuk     = data.reduce((s, r) => s + r.masuk, 0)
  const totalKeluar    = data.reduce((s, r) => s + r.keluarHidup + r.matiLLt48 + r.matiLGe48 + r.matiPLt48 + r.matiPGe48, 0)
  const totalLamaDirawat = data.reduce((s, r) => s + r.lamaDirawat, 0)
  const totalHP        = data.reduce((s, r) => s + r.jumlahHariPerawatan, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Pelayanan Rawat Darurat (RL 3.2)</h1>
            <p className="text-sm text-slate-500">Rekapitulasi pasien masuk dan keluar — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pasien Awal</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{totalAwal.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pasien Masuk</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{totalMasuk.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pasien Keluar</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{totalKeluar.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lama Dirawat (hari)</p>
          <p className="text-2xl font-bold text-violet-700 mt-1">{totalLamaDirawat.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hari Perawatan</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{totalHP.toLocaleString()}</p>
        </div>
      </div>

      {/* Main table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              {/* Row 1 — group headers */}
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300 w-8">No</th>
                <th rowSpan={2} className="px-3 py-2 text-left font-bold text-slate-600 border border-slate-300 min-w-[140px]">Jenis Pelayanan</th>
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Pasien Awal Bulan</th>
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Pasien Masuk</th>
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Pasien Pindahan</th>
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Pasien Dipindahkan</th>
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Pasien Keluar Hidup</th>
                <th colSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Pasien Laki-Laki Keluar Mati</th>
                <th colSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Pasien Perempuan Keluar Mati</th>
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Jumlah Lama Dirawat</th>
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Pasien Akhir Bulan</th>
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Jumlah Hari Perawatan</th>
                <th colSpan={6} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300">Rincian Hari Perawatan per Kelas</th>
                <th rowSpan={2} className="px-2 py-2 text-center font-bold text-slate-600 border border-slate-300 min-w-[60px]">Jumlah Alokasi TT Awal Bulan</th>
              </tr>
              {/* Row 2 — sub-headers */}
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">&lt;48 jam</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">≥48 jam</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">&lt;48 jam</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">≥48 jam</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">VVIP</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">VIP</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">I</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">II</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">III</th>
                <th className="px-2 py-2 text-center font-semibold text-slate-500 border border-slate-300">Kelas Khusus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row, idx) => {
                const totalMati = row.matiLLt48 + row.matiLGe48 + row.matiPLt48 + row.matiPGe48
                return (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-2 py-2 text-center text-slate-400 border border-slate-100">{idx + 1}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700 border border-slate-100">{row.pelayanan}</td>
                    <td className="px-2 py-2 text-center text-slate-600 border border-slate-100">{row.awal}</td>
                    <td className="px-2 py-2 text-center text-blue-600 font-bold border border-slate-100">{row.masuk}</td>
                    <td className="px-2 py-2 text-center text-indigo-600 border border-slate-100">{row.pindahan}</td>
                    <td className="px-2 py-2 text-center text-indigo-400 border border-slate-100">{row.dipindahkan}</td>
                    <td className="px-2 py-2 text-center text-green-600 border border-slate-100">{row.keluarHidup}</td>
                    <td className="px-2 py-2 text-center border border-slate-100">
                      <span className={row.matiLLt48 > 0 ? 'text-red-500 font-semibold' : 'text-slate-400'}>{row.matiLLt48}</span>
                    </td>
                    <td className="px-2 py-2 text-center border border-slate-100">
                      <span className={row.matiLGe48 > 0 ? 'text-red-700 font-bold' : 'text-slate-400'}>{row.matiLGe48}</span>
                    </td>
                    <td className="px-2 py-2 text-center border border-slate-100">
                      <span className={row.matiPLt48 > 0 ? 'text-red-500 font-semibold' : 'text-slate-400'}>{row.matiPLt48}</span>
                    </td>
                    <td className="px-2 py-2 text-center border border-slate-100">
                      <span className={row.matiPGe48 > 0 ? 'text-red-700 font-bold' : 'text-slate-400'}>{row.matiPGe48}</span>
                    </td>
                    <td className="px-2 py-2 text-center text-violet-700 border border-slate-100">{row.lamaDirawat}</td>
                    <td className="px-2 py-2 text-center text-slate-800 font-bold border border-slate-100">{row.akhir}</td>
                    <td className="px-2 py-2 text-center text-amber-600 font-mono border border-slate-100">{row.jumlahHariPerawatan}</td>
                    <td className="px-2 py-2 text-center text-slate-500 font-mono border border-slate-100">{row.hpVVIP}</td>
                    <td className="px-2 py-2 text-center text-slate-500 font-mono border border-slate-100">{row.hpVIP}</td>
                    <td className="px-2 py-2 text-center text-slate-500 font-mono border border-slate-100">{row.hpI}</td>
                    <td className="px-2 py-2 text-center text-slate-500 font-mono border border-slate-100">{row.hpII}</td>
                    <td className="px-2 py-2 text-center text-slate-500 font-mono border border-slate-100">{row.hpIII}</td>
                    <td className="px-2 py-2 text-center text-slate-500 font-mono border border-slate-100">{row.hpKhusus}</td>
                    <td className="px-2 py-2 text-center text-slate-600 font-semibold border border-slate-100">{row.alokasiTT}</td>
                  </tr>
                )
              })}
            </tbody>
            {/* Totals row */}
            <tfoot>
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-[11px]">
                <td colSpan={2} className="px-3 py-2 text-slate-700 border border-slate-300">TOTAL</td>
                <td className="px-2 py-2 text-center text-slate-700 border border-slate-300">{data.reduce((s, r) => s + r.awal, 0)}</td>
                <td className="px-2 py-2 text-center text-blue-700 border border-slate-300">{data.reduce((s, r) => s + r.masuk, 0)}</td>
                <td className="px-2 py-2 text-center text-indigo-700 border border-slate-300">{data.reduce((s, r) => s + r.pindahan, 0)}</td>
                <td className="px-2 py-2 text-center text-indigo-500 border border-slate-300">{data.reduce((s, r) => s + r.dipindahkan, 0)}</td>
                <td className="px-2 py-2 text-center text-green-700 border border-slate-300">{data.reduce((s, r) => s + r.keluarHidup, 0)}</td>
                <td className="px-2 py-2 text-center text-red-500 border border-slate-300">{data.reduce((s, r) => s + r.matiLLt48, 0)}</td>
                <td className="px-2 py-2 text-center text-red-700 border border-slate-300">{data.reduce((s, r) => s + r.matiLGe48, 0)}</td>
                <td className="px-2 py-2 text-center text-red-500 border border-slate-300">{data.reduce((s, r) => s + r.matiPLt48, 0)}</td>
                <td className="px-2 py-2 text-center text-red-700 border border-slate-300">{data.reduce((s, r) => s + r.matiPGe48, 0)}</td>
                <td className="px-2 py-2 text-center text-violet-700 border border-slate-300">{data.reduce((s, r) => s + r.lamaDirawat, 0)}</td>
                <td className="px-2 py-2 text-center text-slate-700 border border-slate-300">{data.reduce((s, r) => s + r.akhir, 0)}</td>
                <td className="px-2 py-2 text-center text-amber-700 border border-slate-300">{data.reduce((s, r) => s + r.jumlahHariPerawatan, 0)}</td>
                <td className="px-2 py-2 text-center border border-slate-300">{data.reduce((s, r) => s + r.hpVVIP, 0)}</td>
                <td className="px-2 py-2 text-center border border-slate-300">{data.reduce((s, r) => s + r.hpVIP, 0)}</td>
                <td className="px-2 py-2 text-center border border-slate-300">{data.reduce((s, r) => s + r.hpI, 0)}</td>
                <td className="px-2 py-2 text-center border border-slate-300">{data.reduce((s, r) => s + r.hpII, 0)}</td>
                <td className="px-2 py-2 text-center border border-slate-300">{data.reduce((s, r) => s + r.hpIII, 0)}</td>
                <td className="px-2 py-2 text-center border border-slate-300">{data.reduce((s, r) => s + r.hpKhusus, 0)}</td>
                <td className="px-2 py-2 text-center text-slate-700 border border-slate-300">{data.reduce((s, r) => s + r.alokasiTT, 0)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
