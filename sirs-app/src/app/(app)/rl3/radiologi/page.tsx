'use client'

import { infoRS } from '@/lib/dummy-data'
import { Scan, FileText, Filter } from 'lucide-react'

type Row = {
  no: string | number
  label: string
  isHeader?: boolean
  jumlah?: number
}

const ROWS: Row[] = [
  { no: 1,    label: 'Radiodiagnostik', isHeader: true },
  { no: '1.1', label: 'Foto tanpa bahan kontras',       jumlah: 2840 },
  { no: '1.2', label: 'Foto dengan bahan kontras',      jumlah: 385  },
  { no: '1.3', label: 'Foto dengan rol film',            jumlah: 120  },
  { no: '1.4', label: 'Flouroskopi',                     jumlah: 95   },
  { no: '1.5', label: 'Foto Gigi',                       jumlah: 510  },
  { no: '1.6', label: 'C.T. Scan',                       jumlah: 748  },
  { no: '1.7', label: 'Lymphografi',                     jumlah: 18   },
  { no: '1.8', label: 'Angiografi',                      jumlah: 42   },
  { no: '1.9', label: 'Lain-Lain',                       jumlah: 215  },

  { no: 2,    label: 'Radioterapi', isHeader: true },
  { no: '2.1', label: 'Radioterapi dengan Linac',        jumlah: 320  },
  { no: '2.2', label: 'Radioterapi dengan Cobalt',       jumlah: 145  },
  { no: '2.3', label: 'Radioterapi dengan Brakhiterapi', jumlah: 68   },
  { no: '2.4', label: 'Lain-Lain',                       jumlah: 32   },

  { no: 3,    label: 'Kedokteran Nuklir', isHeader: true },
  { no: '3.1', label: 'Diagnostik',                      jumlah: 85   },
  { no: '3.2', label: 'Therapi',                         jumlah: 38   },
  { no: '3.3', label: 'Lain-Lain',                       jumlah: 12   },

  { no: 4,    label: 'Imaging/Pencitraan', isHeader: true },
  { no: '4.1', label: 'USG',                             jumlah: 1245 },
  { no: '4.2', label: 'MRI',                             jumlah: 362  },
  { no: '4.3', label: 'Lain-lain',                       jumlah: 148  },
]

const grandTotal = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.jumlah ?? 0), 0)

export default function RadiologiPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Scan className="w-5 h-5 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Rekapitulasi Kegiatan Pelayanan Radiologi (RL 3.9)</h1>
            <p className="text-sm text-slate-500 mt-0.5">Jumlah kegiatan pelayanan radiologi — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.9.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-lg">
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
              <tr
                key={row.no}
                className={row.isHeader ? 'bg-slate-50' : 'hover:bg-indigo-50/20 transition-colors'}
              >
                <td className={`border border-slate-200 px-3 py-2 text-center ${row.isHeader ? 'font-bold text-slate-700' : 'text-slate-500'}`}>
                  {row.no}
                </td>
                <td className={`border border-slate-200 px-4 py-2 ${row.isHeader ? 'font-bold text-slate-800' : 'text-slate-700'}`}>
                  {row.label}
                </td>
                <td className={`border border-slate-200 px-4 py-2 text-center ${row.isHeader ? 'bg-slate-100' : 'text-slate-700 font-mono'}`}>
                  {row.isHeader ? '' : (row.jumlah ?? 0).toLocaleString('id')}
                </td>
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
