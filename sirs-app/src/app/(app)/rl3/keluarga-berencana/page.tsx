'use client'

import { infoRS } from '@/lib/dummy-data'
import { Heart, FileText, Filter } from 'lucide-react'

const ROWS = [
  { no: 1, label: 'Tubektomi/MOW/Sterilisasi wanita',                                    pascaPersalinan: 28,  pascaKeguguran: 5,   interval: 42,  komplikasi: 2, kegagalan: 0, efekSamping: 3, dropOut: 1  },
  { no: 2, label: 'Vasektomi/MOP/Sterilisasi pria',                                       pascaPersalinan: 0,   pascaKeguguran: 0,   interval: 18,  komplikasi: 0, kegagalan: 0, efekSamping: 1, dropOut: 0  },
  { no: 3, label: 'Implan',                                                                pascaPersalinan: 45,  pascaKeguguran: 12,  interval: 95,  komplikasi: 3, kegagalan: 1, efekSamping: 8, dropOut: 5  },
  { no: 4, label: 'Alat Kontrasepsi Dalam Rahim (AKDR) / Intra Uterine Device (IUD)',     pascaPersalinan: 62,  pascaKeguguran: 18,  interval: 120, komplikasi: 4, kegagalan: 1, efekSamping: 6, dropOut: 3  },
  { no: 5, label: 'Suntik',                                                                pascaPersalinan: 185, pascaKeguguran: 48,  interval: 380, komplikasi: 5, kegagalan: 2, efekSamping: 22,dropOut: 18 },
  { no: 6, label: 'Pil',                                                                   pascaPersalinan: 120, pascaKeguguran: 35,  interval: 295, komplikasi: 2, kegagalan: 3, efekSamping: 15,dropOut: 25 },
  { no: 7, label: 'Kondom',                                                                pascaPersalinan: 30,  pascaKeguguran: 8,   interval: 85,  komplikasi: 0, kegagalan: 1, efekSamping: 2, dropOut: 8  },
  { no: 8, label: 'MAL (Metode Amenore Laktasi)',                                         pascaPersalinan: 95,  pascaKeguguran: 0,   interval: 0,   komplikasi: 0, kegagalan: 2, efekSamping: 0, dropOut: 12 },
]

const sum = (k: keyof typeof ROWS[0]) => ROWS.reduce((s, r) => s + (r[k] as number), 0)
const totKB = (r: typeof ROWS[0]) => r.pascaPersalinan + r.pascaKeguguran + r.interval

function Td({ value, bold }: { value: number; bold?: boolean }) {
  return (
    <td className={`border border-slate-200 px-2 py-2 text-center text-slate-700 ${bold ? 'font-semibold bg-slate-50' : ''}`}>
      {value.toLocaleString('id')}
    </td>
  )
}

export default function KeluargaBerencanePage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kegiatan Pelayanan Keluarga Berencana (RL 3.16)</h1>
            <p className="text-sm text-slate-500">Data peserta KB baru per jenis kontrasepsi — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.16.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 w-10">No.</th>
                <th rowSpan={2} className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600 min-w-[180px]">Jenis Pelayanan Keluarga Berencana</th>
                <th colSpan={4} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Pelayanan KB</th>
                <th rowSpan={2} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[52px]">Komplikasi KB</th>
                <th rowSpan={2} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[52px]">Kegagalan KB</th>
                <th rowSpan={2} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[52px]">Efek Samping</th>
                <th rowSpan={2} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[52px] italic">Drop Out</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[52px]">Pasca Persalinan</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[52px]">Pasca Keguguran</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[44px]">Interval</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[44px]">Total</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.no} className="hover:bg-pink-50/20 transition-colors">
                  <td className="border border-slate-200 px-2 py-2 text-center text-slate-500">{row.no}</td>
                  <td className="border border-slate-200 px-3 py-2 text-slate-700">{row.label}</td>
                  <Td value={row.pascaPersalinan} />
                  <Td value={row.pascaKeguguran} />
                  <Td value={row.interval} />
                  <Td value={totKB(row)} bold />
                  <Td value={row.komplikasi} />
                  <Td value={row.kegagalan} />
                  <Td value={row.efekSamping} />
                  <Td value={row.dropOut} />
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-[11px]">
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-600">99</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-800 font-bold">TOTAL</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{sum('pascaPersalinan').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{sum('pascaKeguguran').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{sum('interval').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-800 font-bold bg-slate-50">{ROWS.reduce((s, r) => s + totKB(r), 0).toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-red-600">{sum('komplikasi').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-red-600">{sum('kegagalan').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-amber-700">{sum('efekSamping').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">{sum('dropOut').toLocaleString('id')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
