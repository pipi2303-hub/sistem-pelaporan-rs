'use client'

import { infoRS } from '@/lib/dummy-data'
import { ArrowRightLeft, FileText, Filter } from 'lucide-react'

type Row = {
  no: number | string
  label: string
  isHeader?: boolean
  // Rujukan Masuk — Diterima Dari
  rmPkm: number; rmRS: number; rmFas: number
  // Rujukan Masuk — Dikembalikan ke
  dkPkm: number; dkRS: number; dkFas: number
  // Dirujuk Keluar
  dkPasienRujukan: number; dkPasienSendiri: number
  // Diterima Kembali
  diterimaKembali: number
}

function v(n: number) { return n }

const ROWS: Row[] = [
  { no: 1,  label: 'Penyakit Dalam',    rmPkm: 85,  rmRS: 42,  rmFas: 18, dkPkm: 32, dkRS: 28, dkFas: 12, dkPasienRujukan: 45,  dkPasienSendiri: 120, diterimaKembali: 18 },
  { no: 2,  label: 'Bedah',             rmPkm: 62,  rmRS: 35,  rmFas: 12, dkPkm: 22, dkRS: 18, dkFas: 8,  dkPasienRujukan: 38,  dkPasienSendiri: 95,  diterimaKembali: 14 },
  { no: 3,  label: 'Kesehatan Anak',    rmPkm: 78,  rmRS: 28,  rmFas: 15, dkPkm: 28, dkRS: 22, dkFas: 10, dkPasienRujukan: 42,  dkPasienSendiri: 85,  diterimaKembali: 16 },
  { no: 4,  label: 'Kesehatan Remaja',  rmPkm: 22,  rmRS: 10,  rmFas: 5,  dkPkm: 8,  dkRS: 6,  dkFas: 3,  dkPasienRujukan: 12,  dkPasienSendiri: 28,  diterimaKembali: 5  },
  { no: 5,  label: 'Obstetri',          rmPkm: 95,  rmRS: 38,  rmFas: 20, dkPkm: 35, dkRS: 28, dkFas: 15, dkPasienRujukan: 52,  dkPasienSendiri: 110, diterimaKembali: 22 },
  { no: 6,  label: 'Ginekologi',        rmPkm: 42,  rmRS: 18,  rmFas: 8,  dkPkm: 15, dkRS: 12, dkFas: 6,  dkPasienRujukan: 25,  dkPasienSendiri: 55,  diterimaKembali: 9  },
  { no: 7,  label: 'Keluarga Berencana',rmPkm: 18,  rmRS: 5,   rmFas: 3,  dkPkm: 6,  dkRS: 4,  dkFas: 2,  dkPasienRujukan: 8,   dkPasienSendiri: 22,  diterimaKembali: 3  },
  { no: 8,  label: 'Saraf (Non Stroke)',rmPkm: 55,  rmRS: 25,  rmFas: 10, dkPkm: 20, dkRS: 15, dkFas: 7,  dkPasienRujukan: 32,  dkPasienSendiri: 68,  diterimaKembali: 12 },
  { no: 9,  label: 'Jiwa',              rmPkm: 35,  rmRS: 18,  rmFas: 8,  dkPkm: 12, dkRS: 10, dkFas: 5,  dkPasienRujukan: 22,  dkPasienSendiri: 45,  diterimaKembali: 8  },
  { no: 10, label: 'THT',               rmPkm: 30,  rmRS: 12,  rmFas: 6,  dkPkm: 10, dkRS: 8,  dkFas: 4,  dkPasienRujukan: 18,  dkPasienSendiri: 42,  diterimaKembali: 6  },
  { no: 11, label: 'Mata',              rmPkm: 28,  rmRS: 10,  rmFas: 5,  dkPkm: 9,  dkRS: 7,  dkFas: 3,  dkPasienRujukan: 16,  dkPasienSendiri: 38,  diterimaKembali: 5  },
  { no: 12, label: 'Kulit dan Kelamin', rmPkm: 25,  rmRS: 8,   rmFas: 4,  dkPkm: 8,  dkRS: 6,  dkFas: 3,  dkPasienRujukan: 14,  dkPasienSendiri: 35,  diterimaKembali: 4  },
  { no: 13, label: 'Gigi dan Mulut',    rmPkm: 20,  rmRS: 6,   rmFas: 4,  dkPkm: 7,  dkRS: 5,  dkFas: 3,  dkPasienRujukan: 12,  dkPasienSendiri: 30,  diterimaKembali: 4  },
  { no: 14, label: 'Radiologi',         rmPkm: 45,  rmRS: 22,  rmFas: 10, dkPkm: 15, dkRS: 12, dkFas: 5,  dkPasienRujukan: 28,  dkPasienSendiri: 65,  diterimaKembali: 10 },
  { no: 15, label: 'Paru',              rmPkm: 52,  rmRS: 24,  rmFas: 10, dkPkm: 18, dkRS: 14, dkFas: 6,  dkPasienRujukan: 30,  dkPasienSendiri: 72,  diterimaKembali: 12 },
  { no: 16, label: 'Kardiologi',        rmPkm: 65,  rmRS: 32,  rmFas: 14, dkPkm: 22, dkRS: 18, dkFas: 8,  dkPasienRujukan: 38,  dkPasienSendiri: 88,  diterimaKembali: 15 },
  { no: 17, label: 'Kanker',            rmPkm: 38,  rmRS: 20,  rmFas: 9,  dkPkm: 12, dkRS: 10, dkFas: 5,  dkPasienRujukan: 25,  dkPasienSendiri: 52,  diterimaKembali: 9  },
  { no: 18, label: 'Uronefrologi',      rmPkm: 32,  rmRS: 15,  rmFas: 7,  dkPkm: 10, dkRS: 8,  dkFas: 4,  dkPasienRujukan: 20,  dkPasienSendiri: 45,  diterimaKembali: 7  },
  { no: 19, label: 'Saraf (Stroke)',    rmPkm: 48,  rmRS: 22,  rmFas: 9,  dkPkm: 16, dkRS: 12, dkFas: 6,  dkPasienRujukan: 28,  dkPasienSendiri: 60,  diterimaKembali: 11 },
  { no: 20, label: 'Spesialisasi Lain', rmPkm: 55,  rmRS: 25,  rmFas: 12, dkPkm: 18, dkRS: 14, dkFas: 7,  dkPasienRujukan: 32,  dkPasienSendiri: 78,  diterimaKembali: 13 },
]

function totRM(r: Row)  { return r.rmPkm + r.rmRS + r.rmFas }
function totDK(r: Row)  { return r.dkPkm + r.dkRS + r.dkFas }
function totDKeluar(r: Row) { return r.dkPasienRujukan + r.dkPasienSendiri }

function sum(field: keyof Row) {
  return ROWS.reduce((s, r) => s + (r[field] as number), 0)
}

function Td({ value, bold }: { value: number; bold?: boolean }) {
  return (
    <td className={`border border-slate-200 px-1 py-1.5 text-center text-slate-700 ${bold ? 'font-semibold' : ''}`}>
      {value.toLocaleString('id')}
    </td>
  )
}

export default function RujukanPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-teal-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Rekapitulasi Kegiatan Pelayanan Rujukan (RL 3.10)</h1>
            <p className="text-sm text-slate-500 mt-0.5">Data rujukan masuk & keluar per jenis spesialisasi — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.10.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              {/* Row 1 */}
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={3} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 w-10">No.</th>
                <th rowSpan={3} className="border border-slate-300 px-3 py-2 text-left font-bold text-slate-600 min-w-[160px]">Jenis Spesialisasi</th>
                <th colSpan={8} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Rujukan Masuk</th>
                <th colSpan={4} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Dirujuk Keluar</th>
              </tr>
              {/* Row 2 */}
              <tr className="bg-slate-100 border-b border-slate-300">
                <th colSpan={4} className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-600">Diterima Dari</th>
                <th colSpan={4} className="border border-slate-300 px-2 py-1.5 text-center font-semibold text-slate-600">Dikembalikan ke</th>
                <th rowSpan={2} className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[52px]">Pasien Rujukan</th>
                <th rowSpan={2} className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[52px]">Pasien Datang Sendiri</th>
                <th rowSpan={2} className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[52px]">Total Dirujuk Keluar</th>
                <th rowSpan={2} className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[52px]">Diterima Kembali</th>
              </tr>
              {/* Row 3 */}
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[42px]">Pus­kes­mas</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">RS lain</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Fas kes lain</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[52px]">Total Rujukan Masuk</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[42px]">Pus­kes­mas</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">RS asal</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Fas kes lain</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[62px]">Total Rujukan Masuk Dikem­balikan</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.no} className="hover:bg-teal-50/20 transition-colors">
                  <td className="border border-slate-200 px-2 py-1.5 text-center text-slate-500">{row.no}</td>
                  <td className="border border-slate-200 px-3 py-1.5 text-slate-700">{row.label}</td>
                  <Td value={v(row.rmPkm)} />
                  <Td value={v(row.rmRS)} />
                  <Td value={v(row.rmFas)} />
                  <Td value={totRM(row)} bold />
                  <Td value={v(row.dkPkm)} />
                  <Td value={v(row.dkRS)} />
                  <Td value={v(row.dkFas)} />
                  <Td value={totDK(row)} bold />
                  <Td value={v(row.dkPasienRujukan)} />
                  <Td value={v(row.dkPasienSendiri)} />
                  <Td value={totDKeluar(row)} bold />
                  <Td value={v(row.diterimaKembali)} />
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-[11px]">
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-600">99</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-800 font-bold">TOTAL</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-blue-700">{sum('rmPkm').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-blue-700">{sum('rmRS').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-blue-700">{sum('rmFas').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-blue-800 font-bold">{ROWS.reduce((s,r)=>s+totRM(r),0).toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-indigo-600">{sum('dkPkm').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-indigo-600">{sum('dkRS').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-indigo-600">{sum('dkFas').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-indigo-800 font-bold">{ROWS.reduce((s,r)=>s+totDK(r),0).toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-teal-700">{sum('dkPasienRujukan').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-teal-700">{sum('dkPasienSendiri').toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-teal-800 font-bold">{ROWS.reduce((s,r)=>s+totDKeluar(r),0).toLocaleString('id')}</td>
                <td className="border border-slate-300 px-1 py-2 text-center text-slate-700">{sum('diterimaKembali').toLocaleString('id')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
