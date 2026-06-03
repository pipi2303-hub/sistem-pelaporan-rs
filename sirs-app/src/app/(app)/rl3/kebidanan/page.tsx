'use client'

import { infoRS } from '@/lib/dummy-data'
import { Baby, FileText, Filter } from 'lucide-react'

type Row = {
  no: string | number
  label: string
  isHeader?: boolean
  // black cell flags
  blackMati?: boolean   // Jum Mati (semua grup) + Dirujuk = N/A
  // Rujukan Medis
  rmRS?: number; rmBidan?: number; rmPkm?: number; rmFasLain?: number
  rmHidup?: number; rmMati?: number
  // Rujukan Non Medis
  rnmHidup?: number; rnmMati?: number
  // Non Rujukan
  nrHidup?: number; nrMati?: number
  // Dirujuk
  dirujuk?: number
}

function v(n: number | undefined) { return n ?? 0 }
function totalRM(r: Row) { return v(r.rmHidup) + (r.blackMati ? 0 : v(r.rmMati)) }
function totalRNM(r: Row) { return v(r.rnmHidup) + (r.blackMati ? 0 : v(r.rnmMati)) }
function totalNR(r: Row) { return v(r.nrHidup) + (r.blackMati ? 0 : v(r.nrMati)) }

const ROWS: Row[] = [
  {
    no: 1, label: 'Pemberian Buku KIA pada Ibu Hamil', isHeader: true, blackMati: true,
    rmRS: 0, rmBidan: 0, rmPkm: 0, rmFasLain: 0, rmHidup: 185,
    rnmHidup: 312, nrHidup: 420,
  },
  {
    no: 2, label: 'Pelayanan Antenatal', isHeader: true,
    rmRS: 42, rmBidan: 18, rmPkm: 30, rmFasLain: 8, rmHidup: 95, rmMati: 0,
    rnmHidup: 210, rnmMati: 0, nrHidup: 380, nrMati: 0, dirujuk: 12,
  },
  {
    no: 3, label: 'Persalinan:', isHeader: true,
    rmRS: 0, rmBidan: 0, rmPkm: 0, rmFasLain: 0, rmHidup: 0, rmMati: 0,
    rnmHidup: 0, rnmMati: 0, nrHidup: 0, nrMati: 0, dirujuk: 0,
  },
  {
    no: '3.1', label: 'Persalinan pervaginam tanpa penyulit (normal)',
    rmRS: 25, rmBidan: 12, rmPkm: 18, rmFasLain: 5, rmHidup: 58, rmMati: 0,
    rnmHidup: 142, rnmMati: 0, nrHidup: 285, nrMati: 0, dirujuk: 8,
  },
  {
    no: '3.2', label: 'Persalinan pervaginam spontan dengan penyulit',
    rmRS: 18, rmBidan: 5, rmPkm: 8, rmFasLain: 2, rmHidup: 30, rmMati: 1,
    rnmHidup: 45, rnmMati: 1, nrHidup: 55, nrMati: 0, dirujuk: 15,
  },
  {
    no: '3.3', label: 'Persalinan pervaginam dengan bantuan',
    rmRS: 12, rmBidan: 3, rmPkm: 5, rmFasLain: 1, rmHidup: 20, rmMati: 0,
    rnmHidup: 28, rnmMati: 0, nrHidup: 38, nrMati: 0, dirujuk: 5,
  },
  {
    no: '3.4', label: 'Persalinan Sectio caesaria',
    rmRS: 55, rmBidan: 0, rmPkm: 0, rmFasLain: 2, rmHidup: 55, rmMati: 1,
    rnmHidup: 18, rnmMati: 0, nrHidup: 82, nrMati: 0, dirujuk: 3,
  },
  {
    no: 4, label: 'Komplikasi obstetri pada ibu hamil, bersalin, dan nifas', isHeader: true,
    rmRS: 0, rmBidan: 0, rmPkm: 0, rmFasLain: 0, rmHidup: 0, rmMati: 0,
    rnmHidup: 0, rnmMati: 0, nrHidup: 0, nrMati: 0, dirujuk: 0,
  },
  {
    no: '4.1', label: 'Perdarahan sebelum persalinan',
    rmRS: 8, rmBidan: 2, rmPkm: 3, rmFasLain: 1, rmHidup: 12, rmMati: 1,
    rnmHidup: 5, rnmMati: 0, nrHidup: 8, nrMati: 0, dirujuk: 4,
  },
  {
    no: '4.2', label: 'Perdarahan setelah persalinan',
    rmRS: 10, rmBidan: 3, rmPkm: 4, rmFasLain: 1, rmHidup: 15, rmMati: 2,
    rnmHidup: 6, rnmMati: 1, nrHidup: 10, nrMati: 0, dirujuk: 5,
  },
  {
    no: '4.3', label: 'Pre eklamsia',
    rmRS: 15, rmBidan: 2, rmPkm: 5, rmFasLain: 1, rmHidup: 21, rmMati: 1,
    rnmHidup: 8, rnmMati: 0, nrHidup: 12, nrMati: 0, dirujuk: 6,
  },
  {
    no: '4.4', label: 'Eklamsia',
    rmRS: 6, rmBidan: 1, rmPkm: 2, rmFasLain: 0, rmHidup: 7, rmMati: 1,
    rnmHidup: 3, rnmMati: 0, nrHidup: 4, nrMati: 0, dirujuk: 3,
  },
  {
    no: '4.5', label: 'Infeksi',
    rmRS: 5, rmBidan: 1, rmPkm: 2, rmFasLain: 0, rmHidup: 8, rmMati: 0,
    rnmHidup: 4, rnmMati: 0, nrHidup: 6, nrMati: 0, dirujuk: 2,
  },
  {
    no: '4.6', label: 'Abortus',
    rmRS: 12, rmBidan: 0, rmPkm: 3, rmFasLain: 1, rmHidup: 14, rmMati: 0,
    rnmHidup: 5, rnmMati: 0, nrHidup: 18, nrMati: 0, dirujuk: 2,
  },
  {
    no: '4.7', label: 'Komplikasi lainnya',
    rmRS: 8, rmBidan: 2, rmPkm: 3, rmFasLain: 1, rmHidup: 12, rmMati: 1,
    rnmHidup: 4, rnmMati: 0, nrHidup: 7, nrMati: 0, dirujuk: 3,
  },
  {
    no: 5, label: 'Aborsi', isHeader: true,
    rmRS: 0, rmBidan: 0, rmPkm: 0, rmFasLain: 0, rmHidup: 0, rmMati: 0,
    rnmHidup: 0, rnmMati: 0, nrHidup: 0, nrMati: 0, dirujuk: 0,
  },
  {
    no: '5.1', label: 'Aborsi atas indikasi kedaruratan medis',
    rmRS: 4, rmBidan: 0, rmPkm: 1, rmFasLain: 0, rmHidup: 5, rmMati: 0,
    rnmHidup: 2, rnmMati: 0, nrHidup: 3, nrMati: 0, dirujuk: 1,
  },
  {
    no: '5.2', label: 'Aborsi atas indikasi kehamilan akibat perkosaan',
    rmRS: 1, rmBidan: 0, rmPkm: 0, rmFasLain: 0, rmHidup: 1, rmMati: 0,
    rnmHidup: 0, rnmMati: 0, nrHidup: 1, nrMati: 0, dirujuk: 0,
  },
  {
    no: 6, label: 'Skrining Status Imunisasi Tetanus', isHeader: true,
    rmRS: 20, rmBidan: 8, rmPkm: 15, rmFasLain: 3, rmHidup: 45, rmMati: 0,
    rnmHidup: 82, rnmMati: 0, nrHidup: 210, nrMati: 0, dirujuk: 5,
  },
  {
    no: 7, label: 'Komplikasi non obstetri pada ibu hamil, bersalin, dan nifas:', isHeader: true,
    rmRS: 0, rmBidan: 0, rmPkm: 0, rmFasLain: 0, rmHidup: 0, rmMati: 0,
    rnmHidup: 0, rnmMati: 0, nrHidup: 0, nrMati: 0, dirujuk: 0,
  },
  {
    no: '7.1', label: 'HIV',
    rmRS: 3, rmBidan: 0, rmPkm: 1, rmFasLain: 0, rmHidup: 4, rmMati: 0,
    rnmHidup: 1, rnmMati: 0, nrHidup: 2, nrMati: 0, dirujuk: 2,
  },
  {
    no: '7.2', label: 'Hepatitis B',
    rmRS: 5, rmBidan: 1, rmPkm: 2, rmFasLain: 0, rmHidup: 8, rmMati: 0,
    rnmHidup: 3, rnmMati: 0, nrHidup: 5, nrMati: 0, dirujuk: 2,
  },
  {
    no: '7.3', label: 'Sifilis',
    rmRS: 2, rmBidan: 0, rmPkm: 1, rmFasLain: 0, rmHidup: 3, rmMati: 0,
    rnmHidup: 1, rnmMati: 0, nrHidup: 2, nrMati: 0, dirujuk: 1,
  },
  {
    no: '7.4', label: 'Tuberkulosis',
    rmRS: 4, rmBidan: 0, rmPkm: 2, rmFasLain: 0, rmHidup: 6, rmMati: 0,
    rnmHidup: 2, rnmMati: 0, nrHidup: 3, nrMati: 0, dirujuk: 2,
  },
  {
    no: '7.5', label: 'Penyakit jantung',
    rmRS: 6, rmBidan: 0, rmPkm: 1, rmFasLain: 1, rmHidup: 7, rmMati: 1,
    rnmHidup: 2, rnmMati: 0, nrHidup: 4, nrMati: 0, dirujuk: 3,
  },
  {
    no: '7.6', label: 'Anemia',
    rmRS: 12, rmBidan: 3, rmPkm: 5, rmFasLain: 1, rmHidup: 20, rmMati: 0,
    rnmHidup: 8, rnmMati: 0, nrHidup: 15, nrMati: 0, dirujuk: 3,
  },
  {
    no: '7.7', label: 'Diabetes Melitus',
    rmRS: 5, rmBidan: 0, rmPkm: 2, rmFasLain: 0, rmHidup: 7, rmMati: 0,
    rnmHidup: 3, rnmMati: 0, nrHidup: 5, nrMati: 0, dirujuk: 2,
  },
  {
    no: '7.8', label: 'Terkonfirmasi COVID-19',
    rmRS: 2, rmBidan: 0, rmPkm: 1, rmFasLain: 0, rmHidup: 3, rmMati: 0,
    rnmHidup: 1, rnmMati: 0, nrHidup: 2, nrMati: 0, dirujuk: 1,
  },
  {
    no: '7.9', label: 'Komplikasi lainnya',
    rmRS: 4, rmBidan: 1, rmPkm: 2, rmFasLain: 0, rmHidup: 6, rmMati: 0,
    rnmHidup: 2, rnmMati: 0, nrHidup: 4, nrMati: 0, dirujuk: 2,
  },
  {
    no: 8, label: 'Ibu Hamil berisiko mempunyai bayi prematur', isHeader: true,
    rmRS: 0, rmBidan: 0, rmPkm: 0, rmFasLain: 0, rmHidup: 0, rmMati: 0,
    rnmHidup: 0, rnmMati: 0, nrHidup: 0, nrMati: 0, dirujuk: 0,
  },
  {
    no: '8.1', label: 'Diberikan antenatal kortikosteroid',
    rmRS: 8, rmBidan: 2, rmPkm: 3, rmFasLain: 1, rmHidup: 13, rmMati: 0,
    rnmHidup: 5, rnmMati: 0, nrHidup: 9, nrMati: 0, dirujuk: 3,
  },
  {
    no: '8.2', label: 'Tidak diberikan antenatal kortikosteroid',
    rmRS: 3, rmBidan: 1, rmPkm: 2, rmFasLain: 0, rmHidup: 5, rmMati: 1,
    rnmHidup: 2, rnmMati: 0, nrHidup: 4, nrMati: 0, dirujuk: 2,
  },
  {
    no: 9, label: 'Pelayanan Nifas', isHeader: true,
    rmRS: 30, rmBidan: 12, rmPkm: 20, rmFasLain: 4, rmHidup: 65, rmMati: 0,
    rnmHidup: 145, rnmMati: 0, nrHidup: 285, nrMati: 0, dirujuk: 8,
  },
  {
    no: 10, label: 'Ibu Nifas mendapat vitamin A', isHeader: true, blackMati: true,
    rmRS: 0, rmBidan: 0, rmPkm: 0, rmFasLain: 0, rmHidup: 320,
    rnmHidup: 485, nrHidup: 610,
  },
]

function BlackCell() {
  return <td className="border border-slate-300 bg-slate-900 px-1 py-1.5" />
}

function Td({ value }: { value: number }) {
  return <td className="border border-slate-200 px-1 py-1.5 text-center text-slate-700">{value}</td>
}

export default function KebidananPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Baby className="w-5 h-5 text-pink-500" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Kebidanan (RL 3.6)</h1>
            <p className="text-sm text-slate-500">Rekapitulasi kegiatan kebidanan — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.6.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
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
          <table className="w-full text-[10px] border-collapse">
            <thead>
              {/* Row 1 */}
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 w-10">No.</th>
                <th rowSpan={2} className="border border-slate-300 px-3 py-2 text-left font-bold text-slate-600 min-w-[220px]">Jenis Kegiatan</th>
                <th colSpan={7} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Rujukan Medis</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Rujukan Non Medis</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Non Rujukan</th>
                <th rowSpan={2} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600 min-w-[48px]">Dirujuk</th>
              </tr>
              {/* Row 2 */}
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[42px]">Rumah Sakit</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Bidan</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Pus­kes­mas</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[42px]">Fas kes Lain­nya</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Jum­lah Hidup</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Jum­lah Mati</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[46px]">Total Rujukan Medis</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Jum­lah Hidup</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Jum­lah Mati</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[46px]">Total Rujukan Non Medis</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Jum­lah Hidup</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[38px]">Jum­lah Mati</th>
                <th className="border border-slate-300 px-1 py-1.5 text-center font-semibold text-slate-500 min-w-[46px]">Total Non Rujukan</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const tRM  = totalRM(row)
                const tRNM = totalRNM(row)
                const tNR  = totalNR(row)
                return (
                  <tr key={row.no} className={row.isHeader ? 'bg-slate-50' : 'hover:bg-pink-50/20 transition-colors'}>
                    <td className={`border border-slate-200 px-2 py-1.5 text-center ${row.isHeader ? 'font-bold text-slate-700' : 'text-slate-500'}`}>{row.no}</td>
                    <td className={`border border-slate-200 px-3 py-1.5 ${row.isHeader ? 'font-bold text-slate-800' : 'text-slate-700'}`}>{row.label}</td>
                    <Td value={v(row.rmRS)} />
                    <Td value={v(row.rmBidan)} />
                    <Td value={v(row.rmPkm)} />
                    <Td value={v(row.rmFasLain)} />
                    <Td value={v(row.rmHidup)} />
                    {row.blackMati ? <BlackCell /> : <Td value={v(row.rmMati)} />}
                    <td className="border border-slate-200 px-1 py-1.5 text-center font-semibold text-blue-700">{tRM}</td>
                    <Td value={v(row.rnmHidup)} />
                    {row.blackMati ? <BlackCell /> : <Td value={v(row.rnmMati)} />}
                    <td className="border border-slate-200 px-1 py-1.5 text-center font-semibold text-indigo-600">{tRNM}</td>
                    <Td value={v(row.nrHidup)} />
                    {row.blackMati ? <BlackCell /> : <Td value={v(row.nrMati)} />}
                    <td className="border border-slate-200 px-1 py-1.5 text-center font-semibold text-emerald-700">{tNR}</td>
                    {row.blackMati ? <BlackCell /> : <Td value={v(row.dirujuk)} />}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
