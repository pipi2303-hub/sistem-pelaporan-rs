'use client'

import { infoRS } from '@/lib/dummy-data'
import { Skull, FileText, Filter } from 'lucide-react'

const ROWS = [
  { no: 1,  icd: 'I21.9',  diagnosis: 'Acute myocardial infarction, unspecified',          hidupL: 385, hidupP: 210, matiL: 42, matiP: 18 },
  { no: 2,  icd: 'C34.1',  diagnosis: 'Malignant neoplasm of upper lobe, bronchus or lung', hidupL: 175, hidupP: 130, matiL: 32, matiP: 22 },
  { no: 3,  icd: 'I63.9',  diagnosis: 'Cerebral infarction, unspecified',                   hidupL: 245, hidupP: 198, matiL: 22, matiP: 15 },
  { no: 4,  icd: 'N18.5',  diagnosis: 'Chronic kidney disease, stage 5',                    hidupL: 310, hidupP: 265, matiL: 28, matiP: 20 },
  { no: 5,  icd: 'J18.9',  diagnosis: 'Pneumonia, unspecified organism',                    hidupL: 480, hidupP: 395, matiL: 15, matiP: 12 },
  { no: 6,  icd: 'A15.0',  diagnosis: 'Tuberculosis of lung',                               hidupL: 198, hidupP: 145, matiL: 18, matiP: 10 },
  { no: 7,  icd: 'I50.9',  diagnosis: 'Heart failure, unspecified',                         hidupL: 220, hidupP: 195, matiL: 14, matiP: 11 },
  { no: 8,  icd: 'C22.0',  diagnosis: 'Liver cell carcinoma',                               hidupL: 95,  hidupP: 62,  matiL: 12, matiP: 8  },
  { no: 9,  icd: 'E11.9',  diagnosis: 'Type 2 diabetes mellitus without complications',     hidupL: 620, hidupP: 710, matiL: 8,  matiP: 10 },
  { no: 10, icd: 'G40.9',  diagnosis: 'Epilepsy, unspecified',                              hidupL: 88,  hidupP: 72,  matiL: 5,  matiP: 4  },
]

export default function SepuluhBesarMatiRIPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Skull className="w-5 h-5 text-red-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">10 Besar Kematian Penyakit Rawat Inap (RL 4.3)</h1>
            <p className="text-sm text-slate-500">Sepuluh besar kelompok diagnosis penyebab kematian rawat inap — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/reports/RL4.3.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileText className="w-4 h-4" /> Cetak PDF
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th rowSpan={2} className="border border-slate-300 px-3 py-2 text-center font-bold text-slate-600 w-12">No.</th>
                <th rowSpan={2} className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600 min-w-[120px]">Kelompok ICD-10</th>
                <th rowSpan={2} className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-600 min-w-[280px]">Kelompok Diagnosis Penyakit</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Jumlah Pasien Hidup dan Mati Menurut Jenis Kelamin</th>
                <th colSpan={3} className="border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-600">Jumlah Pasien Keluar Mati</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-20">L</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-20">P</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-24">Total</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-20">L</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-20">P</th>
                <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-500 w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.no} className="hover:bg-red-50/20 transition-colors">
                  <td className="border border-slate-200 px-3 py-2 text-center text-slate-500">{row.no}</td>
                  <td className="border border-slate-200 px-4 py-2 font-mono font-bold text-blue-700">{row.icd}</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-700">{row.diagnosis}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center text-blue-700 font-semibold">{row.hidupL.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center text-pink-600 font-semibold">{row.hidupP.toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center font-bold text-slate-800 bg-slate-50">{(row.hidupL + row.hidupP).toLocaleString('id')}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center text-red-600 font-semibold">{row.matiL}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center text-red-500 font-semibold">{row.matiP}</td>
                  <td className="border border-slate-200 px-3 py-2 text-center font-bold text-red-700 bg-slate-50">{row.matiL + row.matiP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
