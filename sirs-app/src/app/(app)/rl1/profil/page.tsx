'use client'

import { useState, useRef } from 'react'
import {
  Building2, Save, CheckCircle2, Upload, Plus, Trash2,
  MapPin, Phone, Mail, Globe, Award, FileText, Shield,
  Cpu, Users, Camera, Handshake,
} from 'lucide-react'
import clsx from 'clsx'

// ─── Types ─────────────────────────────────────────────────────────────────

type TabKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

interface KerjasamaLN {
  id: number
  institusi: string
  negara: string
  area: string
  output: string
  bentuk: string
  keterangan: string
  periode: string
}

interface ModulRow {
  no: number
  kategori: string
  subKategori: string
  modul: string
  checked: boolean
}

// ─── Initial Data ───────────────────────────────────────────────────────────

const INIT_A = {
  namaFasyankes: 'RSUD Dr. Soetomo',
  tahunBerdiri: 1938,
  direktur: 'dr. Ahmad Basuki, Sp.PD, KGEH',
  jenis: 'RS Umum',
  kelas: 'A',
  statusBLU: 'BLUD',
  kepemilikan: 'Pemerintah Daerah',
  namaPenyelenggara: 'Pemerintah Provinsi Jawa Timur',
  kerjasamaBPJS: 'Ya',
  alamat: 'Jl. Mayjend Prof. Dr. Moestopo No. 6-8, Surabaya 60286',
  kabKota: 'Kota Surabaya',
  luasTanah: 165000,
  luasBangunan: 87500,
  telepon: '(031) 5501078',
  email: 'info@rssoetomo.jatimprov.go.id',
  website: 'https://rssoetomo.jatimprov.go.id',
}

const INIT_B = {
  noSIO: 'HK.02.03/I/1234/2023',
  tglSIO: '2023-03-15',
  tglBerlakuSIO: '2028-03-14',
  fileSIO: '',
  pentahapanAkreditasi: 'Tingkat Paripurna',
  tglAkreditasi: '2024-03-15',
  tglBerlakuAkreditasi: '2027-03-14',
  fileAkreditasi: '',
  akreditasiInternasional: 'Tidak',
  rsPendidikan: 'Ya',
  noSKRSPendidikan: 'HK.02.03/III/2890/2020',
  tglSKRSPendidikan: '2020-06-10',
  noSKTT: '188/2345/SK/2022',
  tglSKTT: '2022-01-20',
  fileSKTT: '',
  ipwl: 'Tidak',
  noSKIPWL: '',
  tglSKIPWL: '',
  fileTarif: '',
}

const INIT_C = {
  layananUnggulan: 'Onkologi Terpadu, Transplantasi Ginjal, Bedah Jantung',
  simrs: 'Berfungsi Front Office, Back Office',
  pelayananDarah: 'BDRS',
  komiteTransfusi: 'Ada',
  auditDarah: 'Dilakukan',
  latitude: '-7.2654',
  longitude: '112.7525',
  namaKaIFRS: 'apt. Sari Dewi, S.Farm., M.Kes.',
  telpKaIFRS: '08123456789',
  emailKaIFRS: 'ifrs@rssoetomo.jatimprov.go.id',
  kerjasamaPSEF: 'Ya',
  kerjasamaFKFKG: 'FK Universitas Airlangga, FKG Universitas Airlangga, FK Universitas Hang Tuah',
}

const INIT_F_TOP = {
  jenisVendor: 'Swasta/PSE melalui kerja sama',
  namaDeveloper: 'PT. Intramedika Sistem',
  kondisiInternet: 'Akses baik',
  picNama: 'Budi Santoso, S.Kom.',
  picNIK: '3578012345670001',
  picEmail: 'satusehat@rssoetomo.jatimprov.go.id',
  picTelp: '081234567890',
  picJabatan: 'Kepala Instalasi IT',
}

const INIT_KERJASAMA: KerjasamaLN[] = [
  {
    id: 1,
    institusi: 'Mayo Clinic',
    negara: 'Amerika Serikat',
    area: 'Pendidikan & Penelitian',
    output: 'Publikasi bersama',
    bentuk: 'Fellowship, Training',
    keterangan: '-',
    periode: '2023-01 s/d 2026-12',
  },
]

const INIT_MODUL: ModulRow[] = [
  { no: 1,  kategori: 'Tata Kelola', subKategori: 'Unit Pengelola', modul: 'Rumah Sakit memiliki unit/instalasi informasi dan teknologi', checked: true },
  { no: 2,  kategori: 'Tata Kelola', subKategori: 'Sumber Daya Manusia', modul: 'Kepala Instalasi', checked: true },
  { no: 3,  kategori: 'Tata Kelola', subKategori: 'Sumber Daya Manusia', modul: 'Sistem Analis', checked: true },
  { no: 4,  kategori: 'Tata Kelola', subKategori: 'Sumber Daya Manusia', modul: 'Programmer', checked: true },
  { no: 5,  kategori: 'Tata Kelola', subKategori: 'Sumber Daya Manusia', modul: 'Database Administrator', checked: true },
  { no: 6,  kategori: 'Tata Kelola', subKategori: 'Sumber Daya Manusia', modul: 'Implementator (Hardware, Helpdesk dan Maintenance Jaringan)', checked: true },
  { no: 7,  kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pendaftaran online', checked: true },
  { no: 8,  kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pendaftaran offline', checked: true },
  { no: 9,  kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pembayaran', checked: true },
  { no: 10, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pelayanan Rawat Jalan', checked: true },
  { no: 11, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pelayanan Farmasi/ Apotik', checked: true },
  { no: 12, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pelayanan Laboratorium', checked: true },
  { no: 13, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pelayanan Radiologi', checked: true },
  { no: 14, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pelayanan IGD', checked: true },
  { no: 15, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pelayanan Gizi', checked: false },
  { no: 16, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pelayanan Keperawatan', checked: true },
  { no: 17, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Admission Rawat Inap', checked: true },
  { no: 18, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Pelayanan Rawat Inap', checked: true },
  { no: 19, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Resume Medis Elektronik', checked: true },
  { no: 20, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'Rekam Medik Elektronik', checked: true },
  { no: 21, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'RME - Pendaftaran', checked: true },
  { no: 22, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'RME - Rawat Jalan', checked: true },
  { no: 23, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'RME - Rawat Inap', checked: true },
  { no: 24, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'RME - IGD', checked: true },
  { no: 25, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'RME - Laboratorium', checked: true },
  { no: 26, kategori: 'Arsitektur', subKategori: 'Front Office', modul: 'RME - Apotek / Farmasi', checked: true },
  { no: 27, kategori: 'Arsitektur', subKategori: 'Back Office', modul: 'Keuangan/Akuntansi', checked: true },
  { no: 28, kategori: 'Arsitektur', subKategori: 'Back Office', modul: 'Gudang dan Logistik', checked: true },
  { no: 29, kategori: 'Arsitektur', subKategori: 'Back Office', modul: 'Dashboard Eksekutif', checked: true },
  { no: 30, kategori: 'Arsitektur', subKategori: 'Back Office', modul: 'Kepegawaian (data SDM, Kinerja Pegawai, Remunerasi/Payroll)', checked: false },
  { no: 31, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Development', modul: 'SIMRS/RME sudah terdaftar di SatuSehat', checked: true },
  { no: 32, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Development', modul: 'SIMRS/RME sudah memiliki ID SatuSehat', checked: true },
  { no: 33, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Development', modul: 'SatuSehat sudah pada Tahap Development', checked: true },
  { no: 34, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Development', modul: '- Usecase 1. Encounter & Condition', checked: true },
  { no: 35, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Development', modul: '- Usecase 2. Prosedur, TTV, Edukasi Gizi', checked: true },
  { no: 36, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Development', modul: '- Usecase 3. Obat', checked: false },
  { no: 37, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Development', modul: '- Usecase 4. Laboratorium', checked: false },
  { no: 38, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Production', modul: 'SatuSehat sudah pada Tahap Production', checked: false },
  { no: 39, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Production', modul: '- Usecase 1. Encounter & Condition', checked: false },
  { no: 40, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Production', modul: '- Usecase 2. Prosedur, TTV, Edukasi Gizi', checked: false },
  { no: 41, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Production', modul: '- Usecase 3. Obat', checked: false },
  { no: 42, kategori: 'Arsitektur', subKategori: 'Konektivitas SatuSehat Production', modul: '- Usecase 4. Laboratorium', checked: false },
  { no: 43, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'Sistem Informasi Manajemen dan Akuntansi Barang Milik Negara (SIMAK BMN)', checked: false },
  { no: 44, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'Pelaporan Sistem informasi Rumah Sakit (SIRS) dan Dashboard Informasi Pelayanan Kesehatan', checked: true },
  { no: 45, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'E-claim (INA CBG)', checked: true },
  { no: 46, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'V-claim BPJS', checked: true },
  { no: 47, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'Sistem Rujukan Terintegrasi (SISRUTE)', checked: true },
  { no: 48, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'Sistem Rawat Inap (SIRANAP)', checked: false },
  { no: 49, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'Aplikasi Sarana, Prasarana dan Peralatan Kesehatan (ASPAK)', checked: true },
  { no: 50, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'Sistem Informasi Tuberculosis Terpadu (SITT)', checked: false },
  { no: 55, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'E-Kohort KIA', checked: false },
  { no: 56, kategori: 'Arsitektur', subKategori: 'Interoperabilitas Sistem Informasi', modul: 'Komdat Kesmas', checked: false },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-slate-500 mb-1.5">{children}</label>
}

function TextInput({
  value, onChange, placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
  )
}

function NumberInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
  )
}

function DateInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="date"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
  )
}

function SelectInput({
  value, onChange, options,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function TextareaInput({
  value, onChange, rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  rows?: number
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    />
  )
}

function FileUpload({
  label, accept, maxMB, value, onChange,
}: {
  label: string
  accept: string
  maxMB: number
  value: string
  onChange: (name: string) => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div
        onClick={() => ref.current?.click()}
        className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
      >
        <Upload className="w-4 h-4 text-slate-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-600 truncate">
            {value || <span className="text-slate-400">Pilih file...</span>}
          </p>
          <p className="text-xs text-slate-400">{accept} · maks. {maxMB}MB</p>
        </div>
        {value && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
      </div>
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0]
          if (f) onChange(f.name)
        }}
      />
    </div>
  )
}

function SectionCard({
  title, icon: Icon, iconColor, children,
}: {
  title: string
  icon: React.ElementType
  iconColor: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h2 className={clsx('flex items-center gap-2 text-sm font-bold mb-4 pb-3 border-b border-slate-100', iconColor)}>
        <Icon className="w-4 h-4" />
        {title}
      </h2>
      {children}
    </div>
  )
}

function SaveButton({ saved, onSave }: { saved: boolean; onSave: () => void }) {
  return (
    <div className="flex justify-end pt-4">
      <button
        onClick={onSave}
        className={clsx(
          'flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm',
          saved ? 'bg-green-600 text-white' : 'bg-green-700 text-white hover:bg-green-800',
        )}
      >
        {saved ? <><CheckCircle2 className="w-4 h-4" /> Tersimpan</> : <><Save className="w-4 h-4" /> Simpan</>}
      </button>
    </div>
  )
}

// ─── Tab A ──────────────────────────────────────────────────────────────────

function TabA() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState(INIT_A)
  const set = (k: keyof typeof INIT_A) => (v: string | number) => {
    setSaved(false)
    setForm(f => ({ ...f, [k]: v }))
  }
  return (
    <div className="space-y-5">
      <SectionCard title="Identitas Rumah Sakit" icon={Building2} iconColor="text-blue-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <FieldLabel>Nama Fasyankes</FieldLabel>
            <TextInput value={form.namaFasyankes} onChange={set('namaFasyankes')} />
          </div>
          <div>
            <FieldLabel>Tahun Berdiri</FieldLabel>
            <NumberInput value={form.tahunBerdiri} onChange={set('tahunBerdiri')} />
          </div>
          <div>
            <FieldLabel>Nama Direktur Utama/Direktur</FieldLabel>
            <TextInput value={form.direktur} onChange={set('direktur')} />
          </div>
          <div>
            <FieldLabel>Jenis</FieldLabel>
            <SelectInput
              value={form.jenis}
              onChange={set('jenis')}
              options={['RS Umum', 'RS Khusus', 'RS Ibu dan Anak', 'RS Jiwa']}
            />
          </div>
          <div>
            <FieldLabel>Kelas</FieldLabel>
            <SelectInput
              value={form.kelas}
              onChange={set('kelas')}
              options={['A', 'B', 'C', 'D', 'D Pratama']}
            />
          </div>
          <div>
            <FieldLabel>Status BLU</FieldLabel>
            <SelectInput
              value={form.statusBLU}
              onChange={set('statusBLU')}
              options={['Non BLU/BLUD', 'BLU', 'BLUD']}
            />
          </div>
          <div>
            <FieldLabel>Kepemilikan</FieldLabel>
            <SelectInput
              value={form.kepemilikan}
              onChange={set('kepemilikan')}
              options={['Pemerintah Pusat', 'Pemerintah Daerah', 'TNI/Polri', 'Swasta', 'BUMN/BUMD']}
            />
          </div>
          <div>
            <FieldLabel>Nama Penyelenggara</FieldLabel>
            <TextInput value={form.namaPenyelenggara} onChange={set('namaPenyelenggara')} />
          </div>
          <div>
            <FieldLabel>Kerja sama BPJS</FieldLabel>
            <SelectInput value={form.kerjasamaBPJS} onChange={set('kerjasamaBPJS')} options={['Ya', 'Tidak']} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Alamat &amp; Kontak" icon={MapPin} iconColor="text-emerald-700">
        <div className="space-y-4">
          <div>
            <FieldLabel>Alamat RS</FieldLabel>
            <TextareaInput value={form.alamat} onChange={set('alamat')} rows={2} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Kab/Kota</FieldLabel>
              <TextInput value={form.kabKota} onChange={set('kabKota')} />
            </div>
            <div>
              <FieldLabel>Nomor Telepon (Call Center)</FieldLabel>
              <TextInput value={form.telepon} onChange={set('telepon')} />
            </div>
            <div>
              <FieldLabel>Alamat E-mail</FieldLabel>
              <TextInput value={form.email} onChange={set('email')} />
            </div>
            <div>
              <FieldLabel>Alamat Website</FieldLabel>
              <TextInput value={form.website} onChange={set('website')} />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Luas Lahan" icon={FileText} iconColor="text-violet-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Luas Tanah (m²)</FieldLabel>
            <NumberInput value={form.luasTanah} onChange={set('luasTanah')} />
          </div>
          <div>
            <FieldLabel>Luas Bangunan (m²)</FieldLabel>
            <NumberInput value={form.luasBangunan} onChange={set('luasBangunan')} />
          </div>
        </div>
      </SectionCard>

      <SaveButton saved={saved} onSave={() => setSaved(true)} />
    </div>
  )
}

// ─── Tab B ──────────────────────────────────────────────────────────────────

function TabB() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState(INIT_B)
  const set = (k: keyof typeof INIT_B) => (v: string) => {
    setSaved(false)
    setForm(f => ({ ...f, [k]: v }))
  }
  return (
    <div className="space-y-5">
      <SectionCard title="Surat Izin Operasional" icon={Shield} iconColor="text-blue-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Nomor Surat Izin Operasional</FieldLabel>
            <TextInput value={form.noSIO} onChange={set('noSIO')} />
          </div>
          <div>
            <FieldLabel>Tanggal Surat Izin Operasional</FieldLabel>
            <DateInput value={form.tglSIO} onChange={set('tglSIO')} />
          </div>
          <div>
            <FieldLabel>Tanggal Berlaku Surat Izin Operasional</FieldLabel>
            <DateInput value={form.tglBerlakuSIO} onChange={set('tglBerlakuSIO')} />
          </div>
          <div>
            <FileUpload
              label="Dokumen Surat Izin Operasional"
              accept="*.pdf"
              maxMB={5}
              value={form.fileSIO}
              onChange={set('fileSIO')}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Akreditasi Nasional" icon={Award} iconColor="text-yellow-600">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <FieldLabel>Pentahapan Akreditasi Nasional</FieldLabel>
            <SelectInput
              value={form.pentahapanAkreditasi}
              onChange={set('pentahapanAkreditasi')}
              options={['Lulus Perdana', 'Tingkat Dasar', 'Tingkat Madya', 'Tingkat Utama', 'Tingkat Paripurna', 'Proses Akreditasi']}
            />
          </div>
          <div>
            <FieldLabel>Tanggal Penetapan Akreditasi</FieldLabel>
            <DateInput value={form.tglAkreditasi} onChange={set('tglAkreditasi')} />
          </div>
          <div>
            <FieldLabel>Tanggal Berlaku Akreditasi</FieldLabel>
            <DateInput value={form.tglBerlakuAkreditasi} onChange={set('tglBerlakuAkreditasi')} />
          </div>
          <div className="sm:col-span-2">
            <FileUpload
              label="Dokumen Akreditasi"
              accept="*.pdf"
              maxMB={5}
              value={form.fileAkreditasi}
              onChange={set('fileAkreditasi')}
            />
          </div>
          <div>
            <FieldLabel>Akreditasi Internasional</FieldLabel>
            <SelectInput value={form.akreditasiInternasional} onChange={set('akreditasiInternasional')} options={['Ya', 'Tidak']} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="RS Pendidikan &amp; Tempat Tidur" icon={FileText} iconColor="text-emerald-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>RS Pendidikan</FieldLabel>
            <SelectInput value={form.rsPendidikan} onChange={set('rsPendidikan')} options={['Ya', 'Tidak']} />
          </div>
          <div>
            <FieldLabel>No. SK RS Pendidikan</FieldLabel>
            <TextInput value={form.noSKRSPendidikan} onChange={set('noSKRSPendidikan')} />
          </div>
          <div>
            <FieldLabel>Tanggal SK RS Pendidikan</FieldLabel>
            <DateInput value={form.tglSKRSPendidikan} onChange={set('tglSKRSPendidikan')} />
          </div>
          <div>
            <FieldLabel>Nomor SK Tempat Tidur</FieldLabel>
            <TextInput value={form.noSKTT} onChange={set('noSKTT')} />
          </div>
          <div>
            <FieldLabel>Tanggal SK Tempat Tidur</FieldLabel>
            <DateInput value={form.tglSKTT} onChange={set('tglSKTT')} />
          </div>
          <div>
            <FileUpload
              label="Dokumen SK Tempat Tidur"
              accept="*.pdf"
              maxMB={5}
              value={form.fileSKTT}
              onChange={set('fileSKTT')}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="IPWL &amp; Tarif" icon={FileText} iconColor="text-violet-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Institusi Penerima Wajib Lapor (IPWL)</FieldLabel>
            <SelectInput value={form.ipwl} onChange={set('ipwl')} options={['Ya', 'Tidak']} />
          </div>
          <div>
            <FieldLabel>No. SK Menkes IPWL</FieldLabel>
            <TextInput value={form.noSKIPWL} onChange={set('noSKIPWL')} placeholder="—" />
          </div>
          <div>
            <FieldLabel>Tanggal SK IPWL</FieldLabel>
            <DateInput value={form.tglSKIPWL} onChange={set('tglSKIPWL')} />
          </div>
          <div>
            <FileUpload
              label="Dokumen Tarif Layanan RS"
              accept="*.pdf"
              maxMB={5}
              value={form.fileTarif}
              onChange={set('fileTarif')}
            />
          </div>
        </div>
      </SectionCard>

      <SaveButton saved={saved} onSave={() => setSaved(true)} />
    </div>
  )
}

// ─── Tab C ──────────────────────────────────────────────────────────────────

function TabC() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState(INIT_C)
  const set = (k: keyof typeof INIT_C) => (v: string) => {
    setSaved(false)
    setForm(f => ({ ...f, [k]: v }))
  }
  return (
    <div className="space-y-5">
      <SectionCard title="Layanan &amp; SIMRS" icon={Cpu} iconColor="text-blue-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <FieldLabel>Layanan Unggulan</FieldLabel>
            <TextareaInput value={form.layananUnggulan} onChange={set('layananUnggulan')} rows={2} />
          </div>
          <div>
            <FieldLabel>SIMRS</FieldLabel>
            <SelectInput
              value={form.simrs}
              onChange={set('simrs')}
              options={[
                'Berfungsi Front Office, Back Office',
                'Berfungsi Front Office',
                'Tidak Berfungsi',
                'Tidak Ada',
              ]}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Pelayanan Darah" icon={FileText} iconColor="text-red-600">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <FieldLabel>Pelayanan Darah</FieldLabel>
            <SelectInput
              value={form.pelayananDarah}
              onChange={set('pelayananDarah')}
              options={['BDRS', 'UTD', 'Tidak ada']}
            />
          </div>
          <div>
            <FieldLabel>Komite/Panitia Transfusi Darah RS</FieldLabel>
            <SelectInput value={form.komiteTransfusi} onChange={set('komiteTransfusi')} options={['Ada', 'Tidak ada']} />
          </div>
          <div>
            <FieldLabel>Audit Penyelenggaraan Pelayanan Darah</FieldLabel>
            <SelectInput value={form.auditDarah} onChange={set('auditDarah')} options={['Dilakukan', 'Tidak dilakukan']} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Lokasi GPS" icon={MapPin} iconColor="text-emerald-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Latitude</FieldLabel>
            <TextInput value={form.latitude} onChange={set('latitude')} />
          </div>
          <div>
            <FieldLabel>Longitude</FieldLabel>
            <TextInput value={form.longitude} onChange={set('longitude')} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Instalasi Farmasi RS (IFRS)" icon={FileText} iconColor="text-violet-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <FieldLabel>Nama Kepala Instalasi Farmasi RS</FieldLabel>
            <TextInput value={form.namaKaIFRS} onChange={set('namaKaIFRS')} />
          </div>
          <div>
            <FieldLabel>No. Telp./HP Ka. IFRS</FieldLabel>
            <TextInput value={form.telpKaIFRS} onChange={set('telpKaIFRS')} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel>Alamat E-mail Ka. IFRS</FieldLabel>
            <TextInput value={form.emailKaIFRS} onChange={set('emailKaIFRS')} />
          </div>
          <div>
            <FieldLabel>Kerjasama dengan PSEF</FieldLabel>
            <SelectInput value={form.kerjasamaPSEF} onChange={set('kerjasamaPSEF')} options={['Ya', 'Tidak']} />
          </div>
          <div className="sm:col-span-3">
            <FieldLabel>Kerjasama dengan FK/FKG dan Institusi Pendidikan Kesehatan lainnya</FieldLabel>
            <TextareaInput value={form.kerjasamaFKFKG} onChange={set('kerjasamaFKFKG')} rows={2} />
          </div>
        </div>
      </SectionCard>

      <SaveButton saved={saved} onSave={() => setSaved(true)} />
    </div>
  )
}

// ─── Tab D ──────────────────────────────────────────────────────────────────

const PHOTO_FIELDS = [
  'Foto Tampak Depan RS',
  'Foto Ruang Pelayanan Rawat Jalan RS',
  'Foto Ruang Ranap RS',
  'Foto Ruang IGD RS',
  'Foto Alat Kesehatan RS',
]

function PhotoCard({ label, value, onChange }: { label: string; value: string; onChange: (n: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div
        className="bg-slate-100 h-36 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors"
        onClick={() => ref.current?.click()}
      >
        {value ? (
          <div className="text-center px-2">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-1" />
            <p className="text-xs text-slate-600 truncate max-w-[160px]">{value}</p>
          </div>
        ) : (
          <>
            <Camera className="w-8 h-8 text-slate-300 mb-1" />
            <p className="text-xs text-slate-400">Klik untuk upload</p>
          </>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-slate-700 mb-2">{label}</p>
        <button
          onClick={() => ref.current?.click()}
          className="flex items-center gap-1.5 w-full justify-center px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Upload className="w-3 h-3" /> Upload *.jpg · maks. 5MB
        </button>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onChange(f.name) }}
      />
    </div>
  )
}

function TabD() {
  const [saved, setSaved] = useState(false)
  const [photos, setPhotos] = useState<Record<string, string>>(
    Object.fromEntries(PHOTO_FIELDS.map(f => [f, '']))
  )
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-blue-700 mb-4 pb-3 border-b border-slate-100">
          <Camera className="w-4 h-4" /> Foto Rumah Sakit
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PHOTO_FIELDS.map(label => (
            <PhotoCard
              key={label}
              label={label}
              value={photos[label]}
              onChange={v => { setSaved(false); setPhotos(p => ({ ...p, [label]: v })) }}
            />
          ))}
        </div>
      </div>
      <SaveButton saved={saved} onSave={() => setSaved(true)} />
    </div>
  )
}

// ─── Tab E ──────────────────────────────────────────────────────────────────

const KS_COLS: Array<{ key: keyof KerjasamaLN; label: string }> = [
  { key: 'institusi',   label: 'Nama Institusi/RS Luar Negeri' },
  { key: 'negara',      label: 'Negara' },
  { key: 'area',        label: 'Area Kerja sama' },
  { key: 'output',      label: 'Output Kerja sama' },
  { key: 'bentuk',      label: 'Bentuk Kerja sama' },
  { key: 'keterangan',  label: 'Keterangan/Kendala' },
  { key: 'periode',     label: 'Periode Kerja sama' },
]

function TabE() {
  const [saved, setSaved] = useState(false)
  const [rows, setRows] = useState<KerjasamaLN[]>(INIT_KERJASAMA)
  const [nextId, setNextId] = useState(2)

  const addRow = () => {
    setRows(r => [...r, { id: nextId, institusi: '', negara: '', area: '', output: '', bentuk: '', keterangan: '', periode: '' }])
    setNextId(n => n + 1)
    setSaved(false)
  }
  const removeRow = (id: number) => { setRows(r => r.filter(x => x.id !== id)); setSaved(false) }
  const updateRow = (id: number, k: keyof KerjasamaLN, v: string) => {
    setRows(r => r.map(x => x.id === id ? { ...x, [k]: v } : x))
    setSaved(false)
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <h2 className="flex items-center gap-2 text-sm font-bold text-blue-700">
            <Handshake className="w-4 h-4" /> Kerja Sama Luar Negeri
          </h2>
          <button
            onClick={addRow}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 border border-slate-200 whitespace-nowrap">No</th>
                {KS_COLS.map(c => (
                  <th key={c.key} className="px-3 py-2 text-left text-xs font-semibold text-slate-500 border border-slate-200 whitespace-nowrap">{c.label}</th>
                ))}
                <th className="px-3 py-2 border border-slate-200" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-200 text-center text-slate-500">{idx + 1}</td>
                  {KS_COLS.map(c => (
                    <td key={c.key} className="px-2 py-1.5 border border-slate-200">
                      <input
                        type="text"
                        value={row[c.key]}
                        onChange={e => updateRow(row.id, c.key, e.target.value)}
                        className="w-full min-w-[100px] px-2 py-1 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                  ))}
                  <td className="px-2 py-1.5 border border-slate-200">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={KS_COLS.length + 2} className="px-3 py-6 text-center text-slate-400 text-sm border border-slate-200">
                    Belum ada data kerja sama luar negeri
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <SaveButton saved={saved} onSave={() => setSaved(true)} />
    </div>
  )
}

// ─── Tab F ──────────────────────────────────────────────────────────────────

function TabF() {
  const [saved, setSaved] = useState(false)
  const [top, setTop] = useState(INIT_F_TOP)
  const [modul, setModul] = useState<ModulRow[]>(INIT_MODUL)

  const setT = (k: keyof typeof INIT_F_TOP) => (v: string) => {
    setSaved(false)
    setTop(f => ({ ...f, [k]: v }))
  }
  const toggleModul = (no: number) => {
    setSaved(false)
    setModul(rows => rows.map(r => r.no === no ? { ...r, checked: !r.checked } : r))
  }

  // Build rowspan groups
  type GroupedModulRow = ModulRow & { katSpan?: number; subSpan?: number }
  const grouped: GroupedModulRow[] = modul.map((row, i, arr) => {
    const gRow: GroupedModulRow = { ...row }
    // kategori span
    if (i === 0 || arr[i - 1].kategori !== row.kategori) {
      gRow.katSpan = arr.filter(r => r.kategori === row.kategori).length
    }
    // subKategori span
    if (i === 0 || arr[i - 1].subKategori !== row.subKategori || arr[i - 1].kategori !== row.kategori) {
      gRow.subSpan = arr.filter(r => r.subKategori === row.subKategori && r.kategori === row.kategori).length
    }
    return gRow
  })

  return (
    <div className="space-y-5">
      <SectionCard title="Informasi SIMRS" icon={Cpu} iconColor="text-blue-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <FieldLabel>Jenis Vendor</FieldLabel>
            <SelectInput
              value={top.jenisVendor}
              onChange={setT('jenisVendor')}
              options={[
                'Pemerintah/Kemenkes',
                'Mandiri/Fasyankes sendiri',
                'Swasta/PSE melalui kerja sama',
                'Belum punya SIMRS',
              ]}
            />
          </div>
          <div>
            <FieldLabel>Nama Developer/Pengembang</FieldLabel>
            <TextInput value={top.namaDeveloper} onChange={setT('namaDeveloper')} />
          </div>
          <div>
            <FieldLabel>Kondisi Akses Internet</FieldLabel>
            <SelectInput
              value={top.kondisiInternet}
              onChange={setT('kondisiInternet')}
              options={['Tidak ada akses', 'Akses minim', 'Akses cukup', 'Akses baik']}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Kontak SATUSEHAT" icon={Users} iconColor="text-emerald-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Nama PIC Integrasi SATUSEHAT</FieldLabel>
            <TextInput value={top.picNama} onChange={setT('picNama')} />
          </div>
          <div>
            <FieldLabel>NIK PIC</FieldLabel>
            <TextInput value={top.picNIK} onChange={setT('picNIK')} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel>E-mail Integrasi Seluruh Ekosistem SATUSEHAT</FieldLabel>
            <TextInput value={top.picEmail} onChange={setT('picEmail')} />
          </div>
          <div>
            <FieldLabel>Nomor Telepon/WA PIC</FieldLabel>
            <TextInput value={top.picTelp} onChange={setT('picTelp')} />
          </div>
          <div>
            <FieldLabel>Jabatan PIC</FieldLabel>
            <TextInput value={top.picJabatan} onChange={setT('picJabatan')} />
          </div>
        </div>
      </SectionCard>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <h2 className="flex items-center gap-2 text-sm font-bold text-blue-700">
            <Cpu className="w-4 h-4" /> Modul SIMRS
          </h2>
          <div className="text-xs text-slate-500">
            {modul.filter(r => r.checked).length}/{modul.length} modul aktif
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-3 py-2 text-center text-xs font-semibold text-slate-500 border border-slate-200 w-10">No</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 border border-slate-200">Kategori</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 border border-slate-200">Sub Kategori</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 border border-slate-200">Modul</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-slate-500 border border-slate-200 w-20">Kondisi</th>
              </tr>
            </thead>
            <tbody>
              {grouped.map(row => (
                <tr key={row.no} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-200 text-center text-slate-500 text-xs">{row.no}</td>
                  {row.katSpan !== undefined ? (
                    <td
                      rowSpan={row.katSpan}
                      className="px-3 py-2 border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 align-top"
                    >
                      {row.kategori}
                    </td>
                  ) : null}
                  {row.subSpan !== undefined ? (
                    <td
                      rowSpan={row.subSpan}
                      className="px-3 py-2 border border-slate-200 text-xs text-slate-600 font-medium align-top"
                    >
                      {row.subKategori}
                    </td>
                  ) : null}
                  <td className="px-3 py-2 border border-slate-200 text-xs text-slate-700">{row.modul}</td>
                  <td className="px-3 py-2 border border-slate-200 text-center">
                    <button
                      onClick={() => toggleModul(row.no)}
                      className={clsx(
                        'inline-flex items-center justify-center w-5 h-5 rounded border-2 transition-colors',
                        row.checked
                          ? 'bg-green-500 border-green-500'
                          : 'bg-white border-slate-300 hover:border-slate-400',
                      )}
                    >
                      {row.checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SaveButton saved={saved} onSave={() => setSaved(true)} />
    </div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────────────

const TABS: Array<{ key: TabKey; label: string; icon: React.ElementType; color: string }> = [
  { key: 'A', label: 'Profil',               icon: Building2,  color: 'text-blue-700' },
  { key: 'B', label: 'Perizinan & Akreditasi', icon: Shield,   color: 'text-yellow-600' },
  { key: 'C', label: 'Lainnya',              icon: FileText,   color: 'text-emerald-700' },
  { key: 'D', label: 'Photo',                icon: Camera,     color: 'text-violet-700' },
  { key: 'E', label: 'Kerja Sama LN',        icon: Handshake,  color: 'text-rose-600' },
  { key: 'F', label: 'Profil SIMRS',         icon: Cpu,        color: 'text-cyan-700' },
]

export default function ProfilRSPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('A')

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Profil Rumah Sakit (RL 1.1)</h1>
            <p className="text-sm text-slate-500">Data identitas, perizinan, dan profil sistem informasi</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
          <FileText className="w-3.5 h-3.5" />
          Periode: Tahun 2024
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {TABS.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all',
                isActive
                  ? 'bg-white shadow-sm text-blue-700 border border-blue-100'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/60',
              )}
            >
              <span className={clsx(
                'inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold',
                isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600',
              )}>
                {tab.key}
              </span>
              <Icon className={clsx('w-3.5 h-3.5', isActive ? 'text-blue-600' : 'text-slate-400')} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'A' && <TabA />}
      {activeTab === 'B' && <TabB />}
      {activeTab === 'C' && <TabC />}
      {activeTab === 'D' && <TabD />}
      {activeTab === 'E' && <TabE />}
      {activeTab === 'F' && <TabF />}
    </div>
  )
}
