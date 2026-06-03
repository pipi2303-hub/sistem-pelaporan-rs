'use client'

import { infoRS } from '@/lib/dummy-data'
import { Activity, FileText, Filter } from 'lucide-react'

type Row = {
  no: string | number
  label: string
  isHeader?: boolean
  jumlah?: number
}

const ROWS: Row[] = [
  { no: 1,     label: 'Medis', isHeader: true },
  { no: '1.1', label: 'Gait Analyzer',                jumlah: 48  },
  { no: '1.2', label: 'E M G',                         jumlah: 82  },
  { no: '1.3', label: 'Uro Dinamic',                   jumlah: 35  },
  { no: '1.4', label: 'Side Back',                     jumlah: 28  },
  { no: '1.5', label: 'E N Tree',                      jumlah: 20  },
  { no: '1.6', label: 'Spyrometer',                    jumlah: 55  },
  { no: '1.7', label: 'Static Bicycle',                jumlah: 42  },
  { no: '1.8', label: 'Tread Mill',                    jumlah: 38  },
  { no: '1.9', label: 'Body Platysmograf',              jumlah: 15  },
  { no: '1.10',label: 'lain-lain',                     jumlah: 30  },

  { no: 2,     label: 'Fisioterapi', isHeader: true },
  { no: '2.1', label: 'Latihan Fisik',                 jumlah: 385 },
  { no: '2.2', label: 'Aktinoterapi',                  jumlah: 210 },
  { no: '2.3', label: 'Elektroterapi',                 jumlah: 320 },
  { no: '2.4', label: 'Hidroterapi',                   jumlah: 95  },
  { no: '2.5', label: 'Traksi Lumbal dan Cervical',    jumlah: 148 },
  { no: '2.6', label: 'Fisioterapi Anak',              jumlah: 112 },
  { no: '2.7', label: 'Lain-lain',                     jumlah: 65  },

  { no: 3,     label: 'Okupasiterapi', isHeader: true },
  { no: '3.1', label: 'Snoosien Room',                 jumlah: 28  },
  { no: '3.2', label: 'Sensori Integrasi',             jumlah: 72  },
  { no: '3.3', label: 'Latihan aktivitas kehidupan sehari-hari', jumlah: 185 },
  { no: '3.4', label: 'Proper Body Mekanik',           jumlah: 95  },
  { no: '3.5', label: 'Pembuatan Alat Lontar dan Adaptasi Alat', jumlah: 38 },
  { no: '3.6', label: 'Analisa Persiapan Kerja',       jumlah: 42  },
  { no: '3.7', label: 'Latihan Relaksasi',             jumlah: 120 },
  { no: '3.8', label: 'Analisa dan Intervensi, Persepsi, Kognitif, Psikomotorik', jumlah: 88 },
  { no: '3.9', label: 'Okupasiterapi Anak',            jumlah: 65  },
  { no: '3.10',label: 'Lain-lain',                     jumlah: 32  },

  { no: 4,     label: 'Terapi Wicara', isHeader: true },
  { no: '4.1', label: 'Fungsi Bicara',                 jumlah: 95  },
  { no: '4.2', label: 'Fungsi Bahasa / Laku',          jumlah: 72  },
  { no: '4.3', label: 'Fungsi Menelan',                jumlah: 48  },
  { no: '4.4', label: 'Terapi Wicara Anak',            jumlah: 85  },
  { no: '4.5', label: 'Lain-lain',                     jumlah: 20  },

  { no: 5,     label: 'Psikologi', isHeader: true },
  { no: '5.1', label: 'Psikologi Anak',                jumlah: 112 },
  { no: '5.2', label: 'Psikologi Dewasa',              jumlah: 145 },
  { no: '5.3', label: 'Lain-lain',                     jumlah: 35  },

  { no: 6,     label: 'Sosial Medik', isHeader: true },
  { no: '6.1', label: 'Evaluasi Lingkungan Rumah',     jumlah: 58  },
  { no: '6.2', label: 'Evaluasi Ekonomi',              jumlah: 72  },
  { no: '6.3', label: 'Evaluasi Pekerjaan',            jumlah: 45  },
  { no: '6.4', label: 'Lain-lain',                     jumlah: 18  },

  { no: 7,     label: 'Ortotik Prostetik', isHeader: true },
  { no: '7.1', label: 'Pembuatan Alat Bantu',          jumlah: 42  },
  { no: '7.2', label: 'Pembuatan Alat Anggota Tiruan', jumlah: 28  },
  { no: '7.3', label: 'Lain-Lain',                     jumlah: 15  },
]

const grandTotal = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.jumlah ?? 0), 0)

export default function RehabilitasiMedikPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Kegiatan Pelayanan Rehabilitasi Medik (RL 3.13)</h1>
            <p className="text-sm text-slate-500">Jumlah tindakan rehabilitasi medik per jenis — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.13.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
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
              <th className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600">Jenis Tindakan</th>
              <th className="border border-slate-300 px-4 py-2 text-center font-bold text-slate-600 w-28">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.no} className={row.isHeader ? 'bg-slate-50' : 'hover:bg-emerald-50/20 transition-colors'}>
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
              <td className="border border-slate-300 px-4 py-2 text-slate-800 font-bold">TOTAL</td>
              <td className="border border-slate-300 px-4 py-2 text-center text-slate-800 font-bold">{grandTotal.toLocaleString('id')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
