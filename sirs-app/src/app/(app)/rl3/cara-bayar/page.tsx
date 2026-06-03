'use client'

import { infoRS } from '@/lib/dummy-data'
import { CreditCard, FileText, Filter } from 'lucide-react'

type Row = {
  no: string | number
  label: string
  isHeader?: boolean
  riKeluar?: number; riLama?: number
  rjTotal?: number
  lab?: number; radio?: number; lainLain?: number
}

function v(n: number | undefined) { return n ?? 0 }

const ROWS: Row[] = [
  { no: 1, label: 'Membayar Sendiri', isHeader: true,
    riKeluar: 485, riLama: 2840, rjTotal: 1850, lab: 620, radio: 385, lainLain: 845 },

  { no: 2, label: 'Asuransi', isHeader: true,
    riKeluar: 0, riLama: 0, rjTotal: 0, lab: 0, radio: 0, lainLain: 0 },
  { no: '2.1', label: 'Asuransi JKN (BPJS Kesehatan)',
    riKeluar: 2850, riLama: 18420, rjTotal: 9850, lab: 3250, radio: 1980, lainLain: 4620 },
  { no: '2.2', label: 'Asuransi Pemerintah Daerah (Jamkesda)',
    riKeluar: 320,  riLama: 1950,  rjTotal: 845,  lab: 285,  radio: 165,  lainLain: 395  },
  { no: '2.3', label: 'Asuransi Pemerintah Lainnya',
    riKeluar: 185,  riLama: 1120,  rjTotal: 420,  lab: 145,  radio: 88,   lainLain: 187  },
  { no: '2.4', label: 'Asuransi Swasta',
    riKeluar: 245,  riLama: 1580,  rjTotal: 680,  lab: 225,  radio: 142,  lainLain: 313  },

  { no: 3, label: 'Keringanan (Cost Sharing)', isHeader: true,
    riKeluar: 128,  riLama: 745,   rjTotal: 320,  lab: 105,  radio: 62,   lainLain: 153  },

  { no: 4, label: 'Gratis', isHeader: true,
    riKeluar: 0, riLama: 0, rjTotal: 0, lab: 0, radio: 0, lainLain: 0 },
  { no: '4.1', label: 'Kartu Sehat',
    riKeluar: 98,   riLama: 580,   rjTotal: 245,  lab: 82,   radio: 48,   lainLain: 115  },
  { no: '4.2', label: 'Keterangan Tidak Mampu',
    riKeluar: 65,   riLama: 390,   rjTotal: 180,  lab: 58,   radio: 35,   lainLain: 87   },
  { no: '4.3', label: 'Lain-Lain',
    riKeluar: 42,   riLama: 245,   rjTotal: 120,  lab: 38,   radio: 22,   lainLain: 60   },
]

const dataRows = ROWS.filter(r => !r.isHeader || r.no === 1 || r.no === 3)
const sumAll   = ROWS.reduce((s, r) => ({
  riKeluar: s.riKeluar + v(r.riKeluar),
  riLama:   s.riLama   + v(r.riLama),
  rjTotal:  s.rjTotal  + v(r.rjTotal),
  lab:      s.lab      + v(r.lab),
  radio:    s.radio    + v(r.radio),
  lainLain: s.lainLain + v(r.lainLain),
}), { riKeluar: 0, riLama: 0, rjTotal: 0, lab: 0, radio: 0, lainLain: 0 })

// subtract header subtotals (group headers with isHeader that have sub-rows should not double-count)
const nonHeaderSum = ROWS.filter(r => {
  if (!r.isHeader) return true
  if (r.no === 1 || r.no === 3) return true // standalone rows
  return false
}).reduce((s, r) => ({
  riKeluar: s.riKeluar + v(r.riKeluar),
  riLama:   s.riLama   + v(r.riLama),
  rjTotal:  s.rjTotal  + v(r.rjTotal),
  lab:      s.lab      + v(r.lab),
  radio:    s.radio    + v(r.radio),
  lainLain: s.lainLain + v(r.lainLain),
}), { riKeluar: 0, riLama: 0, rjTotal: 0, lab: 0, radio: 0, lainLain: 0 })

function Td({ value }: { value: number }) {
  return <td className="border border-slate-200 px-2 py-1.5 text-center text-slate-700">{value.toLocaleString('id')}</td>
}

export default function CaraBayarPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rekapitulasi Cara Bayar (RL 3.19)</h1>
            <p className="text-sm text-slate-500">Data pasien berdasarkan cara pembayaran — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.19.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
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
                <th rowSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 w-10">No</th>
                <th rowSpan={2} className="border border-slate-300 px-3 py-2 text-left font-bold text-slate-600 min-w-[200px]">Cara Pembayaran</th>
                <th colSpan={2} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Pasien Rawat Inap</th>
                <th rowSpan={2} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[60px]">Jumlah Pasien Rawat Jalan</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Jumlah Pasien Rawat Jalan</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[60px]">Jumlah Pasien Keluar</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[60px]">Jumlah Lama Dirawat</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[70px]">Laboratorium</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[60px]">Radiologi</th>
                <th className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-500 min-w-[60px]">Lain-lain</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.no} className={row.isHeader ? 'bg-slate-50' : 'hover:bg-blue-50/20 transition-colors'}>
                  <td className={`border border-slate-200 px-2 py-1.5 text-center ${row.isHeader ? 'font-bold text-slate-700' : 'text-slate-500'}`}>{row.no}</td>
                  <td className={`border border-slate-200 px-3 py-1.5 ${row.isHeader ? 'font-bold text-slate-800' : 'text-slate-700'}`}>{row.label}</td>
                  <Td value={v(row.riKeluar)} />
                  <Td value={v(row.riLama)} />
                  <Td value={v(row.rjTotal)} />
                  <Td value={v(row.lab)} />
                  <Td value={v(row.radio)} />
                  <Td value={v(row.lainLain)} />
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-[11px]">
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-600">99</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-800 font-bold">TOTAL</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{nonHeaderSum.riKeluar.toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{nonHeaderSum.riLama.toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{nonHeaderSum.rjTotal.toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{nonHeaderSum.lab.toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{nonHeaderSum.radio.toLocaleString('id')}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{nonHeaderSum.lainLain.toLocaleString('id')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
