'use client'

import { infoRS } from '@/lib/dummy-data'
import { Smile, FileText, Filter } from 'lucide-react'

const ROWS = [
  { no: 1,  label: 'Tumpatan Gigi Tetap',       jumlah: 485  },
  { no: 2,  label: 'Tumpatan Gigi Sulung',       jumlah: 312  },
  { no: 3,  label: 'Pengobatan Pulpa',            jumlah: 228  },
  { no: 4,  label: 'Pencabutan Gigi Tetap',       jumlah: 395  },
  { no: 5,  label: 'Pencabutan Gigi Sulung',      jumlah: 268  },
  { no: 6,  label: 'Pengobatan Periodontal',      jumlah: 182  },
  { no: 7,  label: 'Pengobatan Abses',            jumlah: 145  },
  { no: 8,  label: 'Pembersihan Karang Gigi',     jumlah: 520  },
  { no: 9,  label: 'Prothese Lengkap',            jumlah: 48   },
  { no: 10, label: 'Prothese Sebagian',           jumlah: 92   },
  { no: 11, label: 'Prothese Cekat',              jumlah: 135  },
  { no: 12, label: 'Orthodonti',                  jumlah: 78   },
  { no: 13, label: 'Jacket/Bridge',               jumlah: 110  },
  { no: 14, label: 'Bedah Mulut',                 jumlah: 65   },
  { no: 15, label: 'Implan Gigi',                 jumlah: 32   },
  { no: 16, label: 'Penyakit Mulut',              jumlah: 88   },
]

const grandTotal = ROWS.reduce((s, r) => s + r.jumlah, 0)

export default function GigiMulutPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-cyan-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kegiatan Pelayanan Gigi dan Mulut (RL 3.11)</h1>
            <p className="text-sm text-slate-500">Jumlah kegiatan pelayanan gigi dan mulut — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.11.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
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
              <th className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600 w-16">No.</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600">Jenis Kegiatan</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-28">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.no} className="hover:bg-cyan-50/20 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-500">{row.no}</td>
                <td className="border border-slate-200 px-4 py-2 text-slate-700">{row.label}</td>
                <td className="border border-slate-200 px-4 py-2 text-center font-mono text-slate-700">{row.jumlah.toLocaleString('id')}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <td className="border border-slate-300 px-3 py-2 text-center text-slate-600">99</td>
              <td className="border border-slate-300 px-4 py-2 text-slate-800 font-bold">TOTAL</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-800 font-bold">{grandTotal.toLocaleString('id')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
