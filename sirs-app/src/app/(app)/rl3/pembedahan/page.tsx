'use client'

import { infoRS } from '@/lib/dummy-data'
import { Stethoscope, FileText, Filter } from 'lucide-react'

const ROWS = [
  { no: 1,  label: 'Bedah',                      khusus: 28,  besar: 95,  sedang: 142, kecil: 85  },
  { no: 2,  label: 'Obstetri dan Ginekologi',     khusus: 12,  besar: 82,  sedang: 120, kecil: 65  },
  { no: 3,  label: 'Bedah Saraf (Non Stroke)',    khusus: 18,  besar: 45,  sedang: 38,  kecil: 12  },
  { no: 4,  label: 'THT',                          khusus: 5,   besar: 28,  sedang: 65,  kecil: 90  },
  { no: 5,  label: 'Mata',                         khusus: 3,   besar: 15,  sedang: 72,  kecil: 120 },
  { no: 6,  label: 'Kulit dan Kelamin',            khusus: 2,   besar: 8,   sedang: 35,  kecil: 68  },
  { no: 7,  label: 'Gigi dan Mulut',               khusus: 1,   besar: 5,   sedang: 28,  kecil: 95  },
  { no: 8,  label: 'Bedah Anak',                   khusus: 10,  besar: 32,  sedang: 45,  kecil: 22  },
  { no: 9,  label: 'Kardiovaskular',               khusus: 35,  besar: 62,  sedang: 28,  kecil: 8   },
  { no: 10, label: 'Bedah Orthopedi',              khusus: 8,   besar: 55,  sedang: 88,  kecil: 35  },
  { no: 11, label: 'Thoraks',                      khusus: 15,  besar: 38,  sedang: 22,  kecil: 5   },
  { no: 12, label: 'Digestif',                     khusus: 20,  besar: 72,  sedang: 55,  kecil: 18  },
  { no: 13, label: 'Urologi',                      khusus: 12,  besar: 42,  sedang: 58,  kecil: 30  },
  { no: 14, label: 'Bedah Saraf (Stroke)',         khusus: 22,  besar: 35,  sedang: 18,  kecil: 5   },
  { no: 15, label: 'Kanker',                       khusus: 18,  besar: 48,  sedang: 32,  kecil: 10  },
  { no: 16, label: 'Lain-lain',                    khusus: 5,   besar: 18,  sedang: 35,  kecil: 42  },
]

const total = (r: typeof ROWS[0]) => r.khusus + r.besar + r.sedang + r.kecil
const sumCol = (k: 'khusus' | 'besar' | 'sedang' | 'kecil') => ROWS.reduce((s, r) => s + r[k], 0)
const grandTotal = ROWS.reduce((s, r) => s + total(r), 0)

export default function PembedahanPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-rose-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kegiatan Pelayanan Pembedahan (RL 3.12)</h1>
            <p className="text-sm text-slate-500">Jumlah tindakan pembedahan per spesialisasi — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.12.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-2xl">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600 w-14">No.</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600">Spesialisasi</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600">Khusus</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600">Besar</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600">Sedang</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600">Kecil</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.no} className="hover:bg-rose-50/20 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-500">{row.no}</td>
                <td className="border border-slate-200 px-4 py-2 text-slate-700">{row.label}</td>
                <td className="border border-slate-200 px-3 py-2 text-center font-mono text-slate-700">{row.khusus}</td>
                <td className="border border-slate-200 px-3 py-2 text-center font-mono text-slate-700">{row.besar}</td>
                <td className="border border-slate-200 px-3 py-2 text-center font-mono text-slate-700">{row.sedang}</td>
                <td className="border border-slate-200 px-3 py-2 text-center font-mono text-slate-700">{row.kecil}</td>
                <td className="border border-slate-200 px-3 py-2 text-center font-semibold text-slate-800 bg-slate-50">{total(row)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <td className="border border-slate-300 px-3 py-2 text-center text-slate-600">99</td>
              <td className="border border-slate-300 px-4 py-2 text-slate-800 font-bold">TOTAL</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-blue-700">{sumCol('khusus')}</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-blue-700">{sumCol('besar')}</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-blue-700">{sumCol('sedang')}</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-blue-700">{sumCol('kecil')}</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-slate-800 font-bold">{grandTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
