'use client'

import { infoRS } from '@/lib/dummy-data'
import { Users, FileText, Filter } from 'lucide-react'

type Row = {
  no: string | number
  label: string
  isHeader?: boolean
  isBold?: boolean
  dalamL: number
  dalamP: number
  luarL: number
  luarP: number
}

const ROWS: Row[] = [
  { no: 1,  label: 'Penyakit Dalam',                       dalamL: 1240, dalamP: 1580, luarL: 320, luarP: 410 },
  { no: 2,  label: 'Bedah',                                 dalamL: 980,  dalamP: 720,  luarL: 210, luarP: 175 },
  { no: 3,  label: 'Kesehatan Anak (Neonatal)',             dalamL: 185,  dalamP: 172,  luarL: 48,  luarP: 45  },
  { no: 4,  label: 'Kesehatan Anak (Lainnya)',              dalamL: 620,  dalamP: 590,  luarL: 145, luarP: 138 },
  { no: 5,  label: 'Obstetri & Ginekologi (Ibu Hamil)',     dalamL: 0,    dalamP: 890,  luarL: 0,   luarP: 210 },
  { no: 6,  label: 'Obstetri & Ginekologi (Lainnya)',       dalamL: 0,    dalamP: 540,  luarL: 0,   luarP: 132 },
  { no: 7,  label: 'Keluarga Berencana',                    dalamL: 0,    dalamP: 320,  luarL: 0,   luarP: 78  },
  { no: 8,  label: 'Jiwa',                                  dalamL: 280,  dalamP: 195,  luarL: 65,  luarP: 48  },
  { no: 9,  label: 'Napza',                                 dalamL: 42,   dalamP: 12,   luarL: 8,   luarP: 3   },
  { no: 10, label: 'Psikologi',                             dalamL: 155,  dalamP: 210,  luarL: 38,  luarP: 52  },
  { no: 11, label: 'THT',                                   dalamL: 380,  dalamP: 345,  luarL: 82,  luarP: 76  },
  { no: 12, label: 'Mata',                                  dalamL: 420,  dalamP: 395,  luarL: 95,  luarP: 88  },
  { no: 13, label: 'Kulit dan Kelamin',                     dalamL: 295,  dalamP: 380,  luarL: 68,  luarP: 90  },
  { no: 14, label: 'Gigi & Mulut',                          dalamL: 510,  dalamP: 620,  luarL: 110, luarP: 135 },
  { no: 15, label: 'Geriatri',                              dalamL: 245,  dalamP: 280,  luarL: 55,  luarP: 62  },
  { no: 16, label: 'Kardiologi',                            dalamL: 580,  dalamP: 390,  luarL: 145, luarP: 98  },
  { no: 17, label: 'Radiologi',                             dalamL: 720,  dalamP: 680,  luarL: 165, luarP: 155 },
  { no: 18, label: 'Bedah Orthopedi',                       dalamL: 340,  dalamP: 210,  luarL: 78,  luarP: 52  },
  { no: 19, label: 'Paru - Paru',                           dalamL: 445,  dalamP: 380,  luarL: 98,  luarP: 85  },
  { no: 20, label: 'Kanker',                                dalamL: 185,  dalamP: 220,  luarL: 42,  luarP: 55  },
  { no: 21, label: 'Uronefrologi',                          dalamL: 210,  dalamP: 145,  luarL: 48,  luarP: 35  },
  { no: 22, label: 'Kusta',                                 dalamL: 18,   dalamP: 12,   luarL: 4,   luarP: 3   },
  { no: 23, label: 'Umum',                                  dalamL: 890,  dalamP: 950,  luarL: 195, luarP: 210 },
  { no: 24, label: 'Rawat Darurat',                         dalamL: 620,  dalamP: 498,  luarL: 142, luarP: 115 },
  { no: 25, label: 'Rehabilitasi Medik',                    dalamL: 315,  dalamP: 380,  luarL: 72,  luarP: 88  },
  { no: 26, label: 'Akupungtur Medik',                      dalamL: 85,   dalamP: 120,  luarL: 18,  luarP: 28  },
  { no: 27, label: 'Konsultasi Gizi',                       dalamL: 95,   dalamP: 145,  luarL: 22,  luarP: 35  },
  { no: 28, label: 'Day Care',                              dalamL: 145,  dalamP: 168,  luarL: 32,  luarP: 38  },
  { no: 29, label: 'Medical Check Up',                      dalamL: 380,  dalamP: 290,  luarL: 85,  luarP: 68  },
  { no: 30, label: 'Bedah Saraf (Stroke)',                  dalamL: 125,  dalamP: 82,   luarL: 28,  luarP: 18  },
  { no: 31, label: 'Bedah Saraf (Lainnya)',                 dalamL: 95,   dalamP: 65,   luarL: 22,  luarP: 15  },
  { no: 32, label: 'Saraf (Stroke)',                        dalamL: 180,  dalamP: 145,  luarL: 42,  luarP: 35  },
  { no: 33, label: 'Saraf (Lainnya)',                       dalamL: 155,  dalamP: 128,  luarL: 35,  luarP: 30  },
  { no: 34, label: 'Lain – Lain',                           dalamL: 210,  dalamP: 245,  luarL: 48,  luarP: 58  },
]

const COMPUTED = ROWS.map(r => ({ ...r, total: r.dalamL + r.dalamP + r.luarL + r.luarP }))

const totalDalamL = COMPUTED.reduce((s, r) => s + r.dalamL, 0)
const totalDalamP = COMPUTED.reduce((s, r) => s + r.dalamP, 0)
const totalLuarL  = COMPUTED.reduce((s, r) => s + r.luarL, 0)
const totalLuarP  = COMPUTED.reduce((s, r) => s + r.luarP, 0)
const grandTotal  = totalDalamL + totalDalamP + totalLuarL + totalLuarP

const HARI_BUKA = 26
const rataHari   = Math.round(grandTotal / HARI_BUKA)

export default function RekKunjunganPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kunjungan (RL 3.5)</h1>
            <p className="text-sm text-slate-500">Kunjungan rawat jalan per jenis kegiatan — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.5.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Kunjungan</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{grandTotal.toLocaleString('id')}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dalam Kab/Kota</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{(totalDalamL + totalDalamP).toLocaleString('id')}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Luar Kab/Kota</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{(totalLuarL + totalLuarP).toLocaleString('id')}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rata-rata / Hari</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{rataHari.toLocaleString('id')}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 w-10">No</th>
                <th rowSpan={2} className="border border-slate-300 px-3 py-2 text-left font-bold text-slate-600 min-w-[200px]">Jenis Kegiatan</th>
                <th colSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600">Kunjungan Pasien<br/>Dalam Kab/Kota</th>
                <th colSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600">Kunjungan Pasien<br/>Luar Kab/Kota</th>
                <th rowSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 min-w-[70px]">Total<br/>Kunjungan</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Laki-laki</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Perempuan</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Laki-laki</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Perempuan</th>
              </tr>
            </thead>
            <tbody>
              {COMPUTED.map((row) => (
                <tr key={row.no} className="hover:bg-blue-50/30 transition-colors">
                  <td className="border border-slate-200 px-2 py-2 text-center text-slate-500">{row.no}</td>
                  <td className="border border-slate-200 px-3 py-2 text-slate-700">{row.label}</td>
                  <td className="border border-slate-200 px-2 py-2 text-center text-slate-700">{row.dalamL.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-2 py-2 text-center text-slate-700">{row.dalamP.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-2 py-2 text-center text-slate-700">{row.luarL.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-2 py-2 text-center text-slate-700">{row.luarP.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-2 py-2 text-center font-semibold text-slate-800">{row.total.toLocaleString('id')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {/* 99 TOTAL */}
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-600">99</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-800 font-bold">TOTAL</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{totalDalamL.toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{totalDalamP.toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-indigo-600">{totalLuarL.toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-indigo-600">{totalLuarP.toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-800">{grandTotal.toLocaleString('id')}</td>
              </tr>
              {/* 66 Rata-rata Hari Poliklinik Buka */}
              <tr className="bg-white border-t border-slate-200">
                <td className="border border-slate-200 px-2 py-2 text-center text-slate-500">66</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-700">Rata-Rata Hari Poliklinik Buka</td>
                <td colSpan={4} className="border border-slate-200 px-2 py-2 text-center text-slate-500">—</td>
                <td className="border border-slate-200 px-2 py-2 text-center font-semibold text-slate-700">{HARI_BUKA}</td>
              </tr>
              {/* 77 Rata-rata Kunjungan per Hari */}
              <tr className="bg-slate-50 font-bold border-t border-slate-300">
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-600">77</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-800 font-bold">Rata-Rata Kunjungan per Hari</td>
                <td colSpan={4} className="border border-slate-300 px-2 py-2 text-center text-slate-500">—</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-emerald-700">{rataHari.toLocaleString('id')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
