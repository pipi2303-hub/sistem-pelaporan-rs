'use client'

import { infoRS } from '@/lib/dummy-data'
import { ClipboardList, FileText, Filter } from 'lucide-react'

type Row = {
  no: string | number
  label: string
  isHeader?: boolean
  jumlah?: number
}

const ROWS: Row[] = [
  { no: 1,     label: 'Elektro Kardiographi (EKG)',                          jumlah: 1245 },
  { no: 2,     label: 'Elektro Myographi (EMG)',                              jumlah: 182  },
  { no: 3,     label: 'Echo Cardiographi (ECG)',                              jumlah: 420  },
  { no: 4,     label: 'Endoskopi (semua bentuk)',                             jumlah: 312  },
  { no: 5,     label: 'Hemodialisa',                                           jumlah: 895  },
  { no: 6,     label: 'Densometri Tulang',                                     jumlah: 145  },
  { no: 7,     label: 'Pungsi',                                                jumlah: 88   },
  { no: 8,     label: 'Spirometri',                                            jumlah: 210  },
  { no: 9,     label: 'Tes Kulit/Alergi/Histamin',                            jumlah: 165  },
  { no: 10,    label: 'Topometri',                                             jumlah: 42   },
  { no: 11,    label: 'Akupunktur Medik',                                      jumlah: 95   },
  { no: 12,    label: 'Akupunktur Tradisional',                               jumlah: 78   },
  { no: 13,    label: 'Akupressur',                                            jumlah: 55   },
  { no: 14,    label: 'Herbal/Jamu',                                           jumlah: 38   },
  { no: 15,    label: 'Pijat Baduta',                                          jumlah: 62   },
  { no: 16,    label: 'Kunjungan Rumah (Homecare)', isHeader: true },
  { no: '16.1',label: 'Kunjungan Rumah (Homecare) Non Lansia',               jumlah: 145  },
  { no: '16.2',label: 'Rehabilitasi Medis Lansia',                            jumlah: 88   },
  { no: '16.3',label: 'Pemeriksaan Medis Umum dan Spesialis Bagi Lansia',    jumlah: 120  },
  { no: '16.4',label: 'Asuhan dan/atau Tindakan Keperawatan Bagi Lansia',    jumlah: 95   },
  { no: '16.5',label: 'Kunjungan Rumah (Homecare) Lansia Lainnya',           jumlah: 52   },
  { no: 17,    label: 'Tidak lanjut lesi pra Kanker Leher Rahim',            jumlah: 35   },
  { no: 18,    label: 'Lain-Lain',                                             jumlah: 110  },
]

const grandTotal = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.jumlah ?? 0), 0)

export default function PelayananKhususPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-violet-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kegiatan Pelayanan Khusus (RL 3.14)</h1>
            <p className="text-sm text-slate-500">Jumlah kegiatan pelayanan khusus — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.14.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

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
              <tr key={row.no} className={row.isHeader ? 'bg-slate-50' : 'hover:bg-violet-50/20 transition-colors'}>
                <td className={`border border-slate-200 px-3 py-2 text-center ${row.isHeader ? 'font-bold text-slate-700' : 'text-slate-500'}`}>
                  {row.no}
                </td>
                <td className={`border border-slate-200 px-4 py-2 ${row.isHeader ? 'font-bold text-slate-800' : 'text-slate-700'}`}>
                  {row.label}
                </td>
                <td className={`border border-slate-200 px-4 py-2 text-center ${row.isHeader ? 'bg-slate-100' : 'font-mono text-slate-700'}`}>
                  {row.isHeader ? '' : (row.jumlah ?? 0).toLocaleString('id')}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <td className="border border-slate-300 px-3 py-2 text-center text-slate-600">99</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-800 font-bold">TOTAL</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-800 font-bold">{grandTotal.toLocaleString('id')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
