'use client'

import { dataIGD, infoRS } from '@/lib/dummy-data'
import { Ambulance, FileText, Clock, Users, ArrowRight } from 'lucide-react'

export default function IGDPage() {
  const d = dataIGD
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Ambulance className="w-5 h-5 text-red-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Kunjungan IGD (RL 3.4)</h1>
            <p className="text-sm text-slate-500">Data tindak lanjut dan waktu tunggu — {infoRS.periodeAktif}</p>
          </div>
        </div>
        <a href="/reports/RL3.pdf" download className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
          <FileText className="w-4 h-4" /> Cetak PDF
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Kunjungan</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{d.totalKunjungan}</p>
        </div>
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-xs font-bold text-blue-500 uppercase">Dirawat (RI)</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{d.tindakLanjut.rawatInap}</p>
          <p className="text-[10px] text-blue-400 mt-1">{Math.round(d.tindakLanjut.rawatInap/d.totalKunjungan*100)}% Conversion</p>
        </div>
        <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-xs font-bold text-amber-500 uppercase">Waktu Tunggu</p>
          <p className="text-3xl font-bold text-amber-700 mt-2">{d.waktuTunggu}</p>
          <p className="text-[10px] text-amber-400 mt-1">Menit (Rata-rata)</p>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-100 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-xs font-bold text-red-500 uppercase">Kematian IGD</p>
          <p className="text-3xl font-bold text-red-700 mt-2">{d.tindakLanjut.matiDiIgd + d.tindakLanjut.doa}</p>
          <p className="text-[10px] text-red-400 mt-1">Termasuk DOA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-blue-600" /> Tindak Lanjut Pasien
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Rawat Jalan', value: d.tindakLanjut.rawatJalan, color: 'bg-green-500' },
              { label: 'Rawat Inap', value: d.tindakLanjut.rawatInap, color: 'bg-blue-500' },
              { label: 'Dirujuk ke RS Lain', value: d.tindakLanjut.dirujuk, color: 'bg-purple-500' },
              { label: 'Mati di IGD', value: d.tindakLanjut.matiDiIgd, color: 'bg-red-500' },
              { label: 'DOA (Dead on Arrival)', value: d.tindakLanjut.doa, color: 'bg-slate-800' },
              { label: 'Pulang Paksa', value: d.tindakLanjut.pulangPaksa, color: 'bg-amber-500' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-600">{item.label}</span>
                  <span className="font-bold text-slate-800">{item.value}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value/d.totalKunjungan*100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" /> Cara Bayar
          </h2>
          <div className="space-y-6 mt-8">
            {d.caraBayar.map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-slate-50 flex items-center justify-center bg-blue-50 text-blue-700 font-bold text-sm">
                  {Math.round(item.value/d.totalKunjungan*100)}%
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.value} Pasien</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
