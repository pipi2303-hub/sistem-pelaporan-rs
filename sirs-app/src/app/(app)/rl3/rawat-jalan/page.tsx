'use client'

import { infoRS } from '@/lib/dummy-data'
import { Ambulance, FileText, Filter } from 'lucide-react'

type Row = {
  no: string
  label: string
  isHeader?: boolean
  naL?: false  // Laki-laki not applicable (black cell)
  naFE?: false // False Emergency not applicable (black cell)
  blackMatiL?: boolean
  blackDoaL?: boolean
  blackLukaL?: boolean
  blackFE?: boolean
  // data fields — undefined means editable (0 as placeholder)
  rujukan?: number
  nonRujukan?: number
  dirawat?: number
  dirujuk?: number
  pulang?: number
  matiL?: number
  matiP?: number
  doaL?: number
  doaP?: number
  lukaL?: number
  lukaP?: number
  falseEmergency?: number
}

const ROWS: Row[] = [
  {
    no: '1', label: 'Bedah di Instalasi Gawat Darurat', isHeader: true,
    rujukan: 185, nonRujukan: 312, dirawat: 210, dirujuk: 42, pulang: 245,
    matiL: 8, matiP: 4, doaL: 5, doaP: 2, lukaL: 142, lukaP: 98,
    blackFE: true,
  },
  {
    no: '1.1', label: 'Kecelakaan lalu lintas darat',
    rujukan: 95, nonRujukan: 180, dirawat: 130, dirujuk: 28, pulang: 117,
    matiL: 5, matiP: 2, doaL: 3, doaP: 1, lukaL: 98, lukaP: 62,
    blackFE: true,
  },
  {
    no: '1.2', label: 'Kecelakaan lalu lintas perairan',
    rujukan: 8, nonRujukan: 12, dirawat: 10, dirujuk: 3, pulang: 7,
    matiL: 1, matiP: 0, doaL: 1, doaP: 0, lukaL: 12, lukaP: 6,
    blackFE: true,
  },
  {
    no: '1.3', label: 'Kecelakaan lalu lintas udara',
    rujukan: 2, nonRujukan: 0, dirawat: 2, dirujuk: 0, pulang: 0,
    matiL: 0, matiP: 0, doaL: 0, doaP: 0, lukaL: 2, lukaP: 0,
    blackFE: true,
  },
  {
    no: '1.4', label: 'Bedah lainnya (non kecelakaan)',
    rujukan: 80, nonRujukan: 120, dirawat: 68, dirujuk: 11, pulang: 121,
    matiL: 2, matiP: 2, doaL: 1, doaP: 1, lukaL: 30, lukaP: 30,
    blackFE: true,
  },
  {
    no: '2', label: 'Non Bedah', isHeader: true,
    rujukan: 210, nonRujukan: 520, dirawat: 310, dirujuk: 58, pulang: 362,
    matiL: 6, matiP: 5, doaL: 3, doaP: 2, lukaL: 48, lukaP: 35,
    falseEmergency: 87,
  },
  {
    no: '2.1', label: 'Kekerasan terhadap Perempuan (≥18 tahun)',
    rujukan: 18, nonRujukan: 32, dirawat: 22, dirujuk: 8, pulang: 20,
    blackMatiL: true, matiP: 1, blackDoaL: true, doaP: 0, blackLukaL: true, lukaP: 14,
    falseEmergency: 0,
  },
  {
    no: '2.2', label: 'Kekerasan terhadap Anak (<18 tahun)',
    rujukan: 12, nonRujukan: 28, dirawat: 18, dirujuk: 5, pulang: 17,
    matiL: 0, matiP: 0, doaL: 0, doaP: 0, lukaL: 10, lukaP: 8,
    falseEmergency: 0,
  },
  {
    no: '2.3', label: 'Kekerasan lainnya',
    rujukan: 25, nonRujukan: 48, dirawat: 30, dirujuk: 6, pulang: 37,
    matiL: 1, matiP: 0, doaL: 0, doaP: 0, lukaL: 22, lukaP: 10,
    falseEmergency: 0,
  },
  {
    no: '2.4', label: 'Non bedah lainnya',
    rujukan: 155, nonRujukan: 412, dirawat: 240, dirujuk: 39, pulang: 288,
    matiL: 5, matiP: 4, doaL: 3, doaP: 2, lukaL: 16, lukaP: 3,
    falseEmergency: 87,
  },
  {
    no: '3', label: 'Kebidanan', isHeader: true,
    rujukan: 142, nonRujukan: 98, dirawat: 185, dirujuk: 22, pulang: 33,
    blackMatiL: true, matiP: 2, blackDoaL: true, doaP: 1, blackLukaL: true, lukaP: 0,
    falseEmergency: 5,
  },
  {
    no: '4', label: 'Psikiatrik', isHeader: true,
    rujukan: 28, nonRujukan: 45, dirawat: 38, dirujuk: 15, pulang: 20,
    matiL: 0, matiP: 0, doaL: 0, doaP: 0, lukaL: 0, lukaP: 0,
    falseEmergency: 12,
  },
  {
    no: '5', label: 'Bayi', isHeader: true,
    rujukan: 65, nonRujukan: 38, dirawat: 72, dirujuk: 18, pulang: 13,
    matiL: 3, matiP: 2, doaL: 2, doaP: 1, lukaL: 0, lukaP: 0,
    falseEmergency: 3,
  },
  {
    no: '6', label: 'Anak', isHeader: true,
    rujukan: 88, nonRujukan: 145, dirawat: 120, dirujuk: 25, pulang: 88,
    matiL: 2, matiP: 1, doaL: 1, doaP: 0, lukaL: 5, lukaP: 3,
    falseEmergency: 18,
  },
  {
    no: '7', label: 'Geriatri', isHeader: true,
    rujukan: 95, nonRujukan: 62, dirawat: 98, dirujuk: 20, pulang: 39,
    matiL: 6, matiP: 5, doaL: 4, doaP: 3, lukaL: 2, lukaP: 1,
    falseEmergency: 8,
  },
]

function BlackCell() {
  return <td className="border border-slate-300 bg-slate-900 text-white text-center text-[11px] px-1 py-2">0</td>
}

function DataCell({ value }: { value: number | undefined }) {
  return (
    <td className="border border-slate-200 text-center text-[11px] px-1 py-2 text-slate-700">
      {value ?? 0}
    </td>
  )
}

export default function RawatDaruratPage() {
  const totalRujukan    = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.rujukan ?? 0), 0)
  const totalNonRujukan = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.nonRujukan ?? 0), 0)
  const totalDirawat    = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.dirawat ?? 0), 0)
  const totalDirujuk    = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.dirujuk ?? 0), 0)
  const totalPulang     = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.pulang ?? 0), 0)
  const totalMatiL      = ROWS.filter(r => !r.isHeader && !r.blackMatiL).reduce((s, r) => s + (r.matiL ?? 0), 0)
  const totalMatiP      = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.matiP ?? 0), 0)
  const totalDoaL       = ROWS.filter(r => !r.isHeader && !r.blackDoaL).reduce((s, r) => s + (r.doaL ?? 0), 0)
  const totalDoaP       = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.doaP ?? 0), 0)
  const totalLukaL      = ROWS.filter(r => !r.isHeader && !r.blackLukaL).reduce((s, r) => s + (r.lukaL ?? 0), 0)
  const totalLukaP      = ROWS.filter(r => !r.isHeader).reduce((s, r) => s + (r.lukaP ?? 0), 0)
  const totalFE         = ROWS.filter(r => !r.isHeader && !r.blackFE).reduce((s, r) => s + (r.falseEmergency ?? 0), 0)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Ambulance className="w-5 h-5 text-red-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Pelayanan Rawat Darurat (RL 3.3)</h1>
            <p className="text-sm text-slate-500">Rekapitulasi kunjungan rawat darurat — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL3.3.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Info note */}
      <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
        Formulir kunjungan rawat darurat dilaporkan <strong>bulanan</strong> dengan data bersumber dari Instalasi Gawat Darurat (IGD).
      </p>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              {/* Row 1 */}
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 w-10">No.</th>
                <th rowSpan={2} className="border border-slate-300 px-3 py-2 text-left font-bold text-slate-600 min-w-[200px]">Jenis Pelayanan</th>
                <th colSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600">Total Pasien</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600">Tindak Lanjut Pelayanan</th>
                <th colSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600">Mati di IGD</th>
                <th colSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600">DOA</th>
                <th colSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600">Luka-luka</th>
                <th rowSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 italic min-w-[60px]">False Emergency</th>
              </tr>
              {/* Row 2 */}
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Rujukan</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Non Rujukan</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Dirawat</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Dirujuk</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Pulang</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Laki-laki</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Perem­puan</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Laki-laki</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Perem­puan</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Laki-laki</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-500">Perem­puan</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.no}
                  className={row.isHeader ? 'bg-slate-50' : 'hover:bg-blue-50/30 transition-colors'}
                >
                  <td className={`border border-slate-200 px-2 py-2 text-center ${row.isHeader ? 'font-bold text-slate-700' : 'text-slate-500'}`}>
                    {row.no}
                  </td>
                  <td className={`border border-slate-200 px-3 py-2 ${row.isHeader ? 'font-bold text-slate-800' : 'text-slate-700'}`}>
                    {row.label}
                  </td>
                  <DataCell value={row.rujukan} />
                  <DataCell value={row.nonRujukan} />
                  <DataCell value={row.dirawat} />
                  <DataCell value={row.dirujuk} />
                  <DataCell value={row.pulang} />
                  {row.blackMatiL ? <BlackCell /> : <DataCell value={row.matiL} />}
                  <DataCell value={row.matiP} />
                  {row.blackDoaL ? <BlackCell /> : <DataCell value={row.doaL} />}
                  <DataCell value={row.doaP} />
                  {row.blackLukaL ? <BlackCell /> : <DataCell value={row.lukaL} />}
                  <DataCell value={row.lukaP} />
                  {row.blackFE ? <BlackCell /> : <DataCell value={row.falseEmergency} />}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-[11px]">
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-600">99</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-800">TOTAL</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{totalRujukan}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-blue-700">{totalNonRujukan}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">{totalDirawat}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">{totalDirujuk}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">{totalPulang}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-red-600">{totalMatiL}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-red-600">{totalMatiP}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">{totalDoaL}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">{totalDoaP}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-amber-700">{totalLukaL}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-amber-700">{totalLukaP}</td>
                <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">{totalFE}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
