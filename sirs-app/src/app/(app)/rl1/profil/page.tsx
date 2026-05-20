'use client'

import { useState } from 'react'
import { infoRS } from '@/lib/dummy-data'
import { Building2, Save, CheckCircle2, MapPin, Phone, Mail, Globe, Award } from 'lucide-react'
import clsx from 'clsx'

export default function ProfilRSPage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    namaRS:          infoRS.nama,
    kodeRS:          infoRS.kodeRS,
    jenisRS:         infoRS.jenis,
    kelasRS:         infoRS.kelas,
    alamat:          infoRS.alamat,
    telepon:         infoRS.telepon,
    email:           infoRS.email,
    direktur:        infoRS.direktur,
    akreditasi:      'Paripurna',
    lembaga:         'KARS',
    tglAkreditasi:   '2024-03-15',
    tglBerakhir:     '2027-03-14',
    noIzin:          'HK.02.03/I/1234/2023',
    statusBLU:       'Ya',
    kepemilikan:     'Pemerintah Daerah',
    website:         'https://rssoetomo.jatimprov.go.id',
  })

  const LAYANAN = [
    'Penyakit Dalam', 'Bedah Umum', 'Obstetri & Ginekologi', 'Kesehatan Anak', 'Bedah Saraf',
    'Kardiologi', 'Onkologi', 'Urologi', 'Ortopedi', 'THT-KL', 'Mata', 'Kulit & Kelamin',
    'Saraf', 'Jiwa / Psikiatri', 'Rehabilitasi Medik', 'Gigi & Mulut',
    'Radiologi', 'Patologi Klinik', 'Patologi Anatomi', 'Anestesiologi',
    'IGD 24 Jam', 'ICU/ICCU', 'NICU/PICU', 'Hemodialisa', 'Kemoterapi',
  ]
  const [layananAktif, setLayananAktif] = useState<Set<string>>(
    new Set(LAYANAN.filter((_, i) => i !== 13 && i !== 23))
  )

  const toggleLayanan = (l: string) => {
    setLayananAktif(prev => {
      const next = new Set(prev)
      next.has(l) ? next.delete(l) : next.add(l)
      return next
    })
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Profil Rumah Sakit (RL 1.1)</h1>
            <p className="text-sm text-slate-500">Data identitas dan profil {infoRS.nama}</p>
          </div>
        </div>
        <button onClick={() => setSaved(true)}
          className={clsx(
            'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm',
            saved ? 'bg-green-600 text-white' : 'bg-blue-700 text-white hover:bg-blue-800'
          )}>
          {saved ? <><CheckCircle2 className="w-4 h-4" /> Tersimpan!</> : <><Save className="w-4 h-4" /> Simpan Perubahan</>}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Identitas Dasar */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">Identitas Dasar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Nama Rumah Sakit', field: 'namaRS', full: true },
                { label: 'Kode RS (Kemenkes)', field: 'kodeRS' },
                { label: 'Jenis RS', field: 'jenisRS' },
                { label: 'Kelas RS', field: 'kelasRS' },
                { label: 'Kepemilikan', field: 'kepemilikan' },
                { label: 'Status BLU', field: 'statusBLU' },
                { label: 'Nama Direktur', field: 'direktur', full: true },
              ].map(({ label, field, full }) => (
                <div key={field} className={full ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
                  <input type="text" value={(form as any)[field]}
                    onChange={e => { setSaved(false); setForm(f => ({ ...f, [field]: e.target.value })) }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" /> Kontak &amp; Lokasi
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Alamat Lengkap</label>
                <textarea rows={2} value={form.alamat}
                  onChange={e => { setSaved(false); setForm(f => ({ ...f, alamat: e.target.value })) }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Telepon', field: 'telepon', icon: Phone },
                  { label: 'Email', field: 'email', icon: Mail },
                  { label: 'Website', field: 'website', icon: Globe },
                ].map(({ label, field, icon: Icon }) => (
                  <div key={field}>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                      <Icon className="w-3 h-3" /> {label}
                    </label>
                    <input type="text" value={(form as any)[field]}
                      onChange={e => { setSaved(false); setForm(f => ({ ...f, [field]: e.target.value })) }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Akreditasi */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" /> Akreditasi
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Status', field: 'akreditasi' },
                { label: 'Lembaga', field: 'lembaga' },
                { label: 'Tanggal Akreditasi', field: 'tglAkreditasi', type: 'date' },
                { label: 'Berlaku Sampai', field: 'tglBerakhir', type: 'date' },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
                  <input type={type ?? 'text'} value={(form as any)[field]}
                    onChange={e => { setSaved(false); setForm(f => ({ ...f, [field]: e.target.value })) }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-700 font-semibold">Paripurna — Berlaku hingga 14 Maret 2027</span>
            </div>
          </div>
        </div>

        {/* Ketersediaan Layanan */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-fit">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-700">Ketersediaan Layanan</h2>
            <span className="text-xs text-slate-400">{layananAktif.size}/{LAYANAN.length} aktif</span>
          </div>
          <div className="space-y-2">
            {LAYANAN.map(l => (
              <label key={l} className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" checked={layananAktif.has(l)} onChange={() => toggleLayanan(l)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className={clsx('text-sm transition-colors', layananAktif.has(l) ? 'text-slate-700' : 'text-slate-400 line-through')}>
                  {l}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
