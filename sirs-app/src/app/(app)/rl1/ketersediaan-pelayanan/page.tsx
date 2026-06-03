'use client'

import { useState, useMemo } from 'react'
import { Stethoscope, CheckCircle2, Circle, FileText, Filter, Search, Save } from 'lucide-react'
import { infoRS } from '@/lib/dummy-data'

type Item = { no: number; label: string; checked: boolean }
type Group = { no: number; label: string; items: Item[] }

const initialGroups: Group[] = [
  {
    no: 1,
    label: 'Pelayanan Medik Umum',
    items: [
      { no: 1, label: 'Pelayanan medik dasar / umum', checked: true },
      { no: 2, label: 'Pelayanan medik gigi mulut', checked: true },
      { no: 3, label: 'Pelayanan KIA/KB', checked: true },
    ],
  },
  {
    no: 2,
    label: 'Pelayanan Gawat Darurat',
    items: [
      { no: 1, label: 'Pelayanan Gawat Darurat Umum 24 jam & 7 hari seminggu', checked: true },
    ],
  },
  {
    no: 3,
    label: 'Pelayanan Medik Spesialis Dasar',
    items: [
      { no: 1, label: 'Penyakit dalam', checked: true },
      { no: 2, label: 'Kesehatan anak', checked: true },
      { no: 3, label: 'Bedah', checked: true },
      { no: 4, label: 'Obstetri dan ginekologi', checked: true },
    ],
  },
  {
    no: 4,
    label: 'Pelayanan Spesialis Penunjang Medik',
    items: [
      { no: 1, label: 'Anestesi', checked: true },
      { no: 2, label: 'Radiologi', checked: true },
      { no: 3, label: 'Patologi Klinik', checked: true },
      { no: 4, label: 'Patologi Anatomi', checked: true },
      { no: 5, label: 'Rehabilitasi Medik', checked: true },
      { no: 6, label: 'Mikrobiologi Klinik', checked: true },
    ],
  },
  {
    no: 5,
    label: 'Pelayanan Medik Spesialis Lain',
    items: [
      { no: 1, label: 'Mata', checked: true },
      { no: 2, label: 'Paru', checked: true },
      { no: 3, label: 'Kulit dan Kelamin', checked: true },
      { no: 4, label: 'Kedokteran Jiwa / Psikiatri/ Psikogeriatri/ NAPZA', checked: true },
      { no: 5, label: 'Orthopedi', checked: true },
      { no: 6, label: 'Telinga Hidung Tenggorok Kepala Leher', checked: true },
      { no: 7, label: 'Saraf', checked: true },
      { no: 8, label: 'Jantung dan Pembuluh Darah', checked: true },
      { no: 9, label: 'Kedokteran Forensik', checked: true },
      { no: 10, label: 'Urologi', checked: true },
      { no: 11, label: 'Bedah Plastik Rekonstruksi dan Estetika', checked: true },
      { no: 12, label: 'Bedah Saraf', checked: true },
      { no: 13, label: 'Program Terapi Rumatan Metadon (PTRM)', checked: false },
      { no: 14, label: 'Bedah thorax kardiak dan vaskuler', checked: true },
      { no: 15, label: 'Bedah Anak', checked: true },
      { no: 16, label: 'Radioterapi/Onkologi Radiasi', checked: true },
      { no: 17, label: 'Radiologi Kedokteran Gigi', checked: false },
      { no: 18, label: 'Parasitologi Klinik', checked: false },
      { no: 19, label: 'Farmakologi klinik', checked: true },
      { no: 20, label: 'Kedokteran Nuklir', checked: false },
      { no: 21, label: 'Laboratorium Gizi', checked: true },
      { no: 22, label: 'Kedokteran Okupasi', checked: false },
      { no: 23, label: 'Orthopedi dan traumatologi', checked: true },
      { no: 24, label: 'Kedokteran forensik dan medikolegal', checked: false },
      { no: 25, label: 'Anestesi dan terapi intensif', checked: true },
      { no: 26, label: 'Kedokteran fisik dan rehabilitasi', checked: true },
      { no: 27, label: 'Andrologi', checked: false },
      { no: 28, label: 'Kedokteran kelautan', checked: false },
      { no: 29, label: 'Kedokteran Keluarga', checked: false },
      { no: 30, label: 'Kedokteran Penerbangan', checked: false },
      { no: 31, label: 'Lainnya', checked: false },
      { no: 32, label: 'Emergensi', checked: true },
    ],
  },
  {
    no: 6,
    label: 'Pelayanan Medik Spesialis Lain berupa Pelayanan Spesialistik Mata di RS Mata',
    items: [
      { no: 1, label: 'Mata Infeksi dan Imunologi', checked: false },
      { no: 2, label: 'Mata Glaukoma', checked: false },
      { no: 3, label: 'Bedah Katarak', checked: false },
      { no: 4, label: 'Bedah vitreo retina lanjut', checked: false },
      { no: 5, label: 'Mata Komunitas', checked: false },
      { no: 6, label: 'Mata Pediatrik', checked: false },
      { no: 7, label: 'Onkologi Rekontruksi Mata', checked: false },
      { no: 8, label: 'Refraksi dan Lensa Kontak', checked: false },
      { no: 9, label: 'Kornea Lensa dan Bedah refraktif', checked: false },
      { no: 10, label: 'Oftamologi Komunitas', checked: false },
      { no: 11, label: 'Mata Strabismus', checked: false },
      { no: 12, label: 'Saraf Mata', checked: false },
    ],
  },
  {
    no: 7,
    label: 'Pelayanan Medik Spesialis Lain berupa Pelayanan Spesialistik Jantung dan Pembuluh Darah di RS Jantung',
    items: [
      { no: 1, label: 'Jantung konservatif', checked: true },
      { no: 2, label: 'Jantung Intervensi', checked: true },
      { no: 3, label: 'Jantung koroner', checked: true },
      { no: 4, label: 'Gagal Jantung Kronik', checked: true },
      { no: 5, label: 'Jantung Hipertensi', checked: true },
      { no: 6, label: 'Jantung Aritmia dan reprogram alat pacu jantung', checked: true },
      { no: 7, label: 'Kardiometabolik', checked: false },
      { no: 8, label: 'Jantung Vaskuler', checked: true },
      { no: 9, label: 'Jantung Valvular', checked: true },
      { no: 10, label: 'Pasca intervensi non bedah (Jantung)', checked: false },
      { no: 11, label: 'Pasca Operasi CABG (Jantung)', checked: true },
      { no: 12, label: 'Pasca Operasi katup (Jantung)', checked: true },
      { no: 13, label: 'Pasca operasi Pediatrik (Jantung)', checked: false },
      { no: 14, label: 'Jantung perikard', checked: false },
      { no: 15, label: 'Penyakit Jantung Pada Kehamilan', checked: false },
      { no: 16, label: 'Bedah jantung anak dan PJB', checked: true },
      { no: 17, label: 'Bedah jantung dewasa', checked: true },
      { no: 18, label: 'Prevensi Rehabilitasi Jantung', checked: false },
      { no: 19, label: 'Ekokardiografi', checked: true },
      { no: 20, label: 'Kardiologi intervensi', checked: true },
    ],
  },
  {
    no: 8,
    label: 'Pelayanan Medik Spesialis Lain berupa Pelayanan Spesialistik Jiwa dan KO',
    items: [
      { no: 1, label: 'Pelayanan kesehatan tumbuh kembang anak dan remaja', checked: true },
      { no: 2, label: 'Pelayanan kesehatan jiwa dewasa', checked: true },
      { no: 3, label: 'Pelayanan kesehatan jiwa lansia', checked: true },
      { no: 4, label: 'Gangguan mental organik', checked: true },
      { no: 5, label: 'Pelayanan psikologi dan psikometri', checked: true },
      { no: 6, label: 'Pelayanan kesehatan jiwa masyarakat', checked: false },
      { no: 7, label: 'Pelayanan konseling dan psikoterapi', checked: true },
      { no: 8, label: 'Rehab Mental', checked: true },
      { no: 9, label: 'Forensik Adiksi', checked: false },
      { no: 10, label: 'Neuropsikiatri dan Psikometri', checked: false },
      { no: 11, label: 'Kesehatan jiwa anak dan remaja', checked: true },
      { no: 12, label: 'Psikiatri adiksi', checked: false },
      { no: 13, label: 'Psikoterapi', checked: true },
      { no: 14, label: 'Psikiatri forensik', checked: false },
      { no: 15, label: 'Psikiatri komunitas', checked: false },
    ],
  },
  {
    no: 9,
    label: 'Pelayanan Medik Spesialis Lain berupa Pelayanan Spesialistik Paru di RS Paru',
    items: [
      { no: 1, label: 'Infeksi Paru', checked: false },
      { no: 2, label: 'Paru Asma dan PPOK', checked: false },
      { no: 3, label: 'Paru Onkologi', checked: false },
      { no: 4, label: 'Paru Fisiologi', checked: false },
      { no: 5, label: 'Penyakit paru akibat kerja', checked: false },
      { no: 6, label: 'Paru Imunologi', checked: false },
      { no: 7, label: 'Paru Intervensi', checked: false },
      { no: 8, label: 'Onkologi toraks', checked: false },
      { no: 9, label: 'Faal Paru Klinik', checked: false },
    ],
  },
  {
    no: 10,
    label: 'Pelayanan Medik Spesialis Lain berupa Pelayanan Spesialistik Orthopedi di RS Orthopedi',
    items: [
      { no: 1, label: 'Lower Extremity Surgery (Hip and Knee)', checked: false },
      { no: 2, label: 'Spine Surgery', checked: false },
      { no: 3, label: 'Hand and Micro Surgery', checked: false },
      { no: 4, label: 'Paediatric Surgery (Ortophaedi)', checked: false },
      { no: 5, label: 'Knee and Ankle', checked: false },
      { no: 6, label: 'Sport, Shoulder, and Elbow', checked: false },
      { no: 7, label: 'Tumor Muskuloskeletal', checked: false },
      { no: 8, label: 'Bedah Orthopedi', checked: false },
      { no: 9, label: 'Orthopedic spine', checked: false },
      { no: 10, label: 'Hand, upper limb and microsurgery', checked: false },
      { no: 11, label: 'Orthopedic oncology', checked: false },
      { no: 12, label: 'Pediatric orthopedic', checked: false },
      { no: 13, label: 'Foot and ankle', checked: false },
      { no: 14, label: 'Advance orthopedic trauma', checked: false },
      { no: 15, label: 'Orthopedic sports injury', checked: false },
      { no: 16, label: 'Bio Orthopedic', checked: false },
      { no: 17, label: 'Trauma dan Rekonstruksi', checked: false },
    ],
  },
  {
    no: 11,
    label: 'Pelayanan Medik Spesialis Gigi dan Mulut',
    items: [
      { no: 1, label: 'Bedah Mulut', checked: true },
      { no: 2, label: 'Konservasi / endodonsi', checked: true },
      { no: 3, label: 'Orthodonti', checked: true },
      { no: 4, label: 'Periodonti', checked: true },
      { no: 5, label: 'Prosthodonti', checked: true },
      { no: 6, label: 'Pedodonsi', checked: true },
      { no: 7, label: 'Penyakit Mulut', checked: true },
    ],
  },
  {
    no: 12,
    label: 'Pelayanan Rumah Sakit KO',
    items: [
      { no: 1, label: 'Isolasi Pasien Gaduh Gelisah', checked: true },
    ],
  },
  {
    no: 13,
    label: 'Pelayanan Mata di RS Mata',
    items: [
      { no: 1, label: 'Bank Mata', checked: false },
    ],
  },
  {
    no: 14,
    label: 'Pelayanan Fasilitas Penunjang di RS Stroke',
    items: [
      { no: 1, label: 'Akupuntur', checked: false },
      { no: 2, label: 'Kedokteran Olah raga', checked: false },
      { no: 3, label: 'Neurorehabilitasi', checked: false },
    ],
  },
  {
    no: 15,
    label: 'Pelayanan Medik Subspesialis Bedah',
    items: [
      { no: 1, label: 'Bedah vaskular', checked: true },
      { no: 2, label: 'Bedah digestif', checked: true },
      { no: 3, label: 'Bedah onkologi', checked: true },
    ],
  },
  {
    no: 16,
    label: 'Pelayanan Medik Subspesialistik Anak',
    items: [
      { no: 1, label: 'Perinatologi', checked: true },
      { no: 2, label: 'Neurologi', checked: true },
      { no: 3, label: 'Hemato-Onkologi', checked: true },
      { no: 4, label: 'Nefrologi', checked: true },
      { no: 5, label: 'Respirologi', checked: true },
      { no: 6, label: 'Alergi Imunologi', checked: true },
      { no: 7, label: 'Endokrin', checked: true },
      { no: 8, label: 'Nutrisi dan Metabolik', checked: true },
      { no: 9, label: 'Kardiologi Anak', checked: true },
      { no: 10, label: 'Infeksi dan Penyakit Tropis', checked: true },
      { no: 11, label: 'Tumbuh Kembang dan Pediatri Sosial', checked: true },
      { no: 12, label: 'Pencitraan Anak', checked: false },
      { no: 13, label: 'Neonatologi', checked: true },
      { no: 14, label: 'Emergensi dan Rawat Intensif Anak', checked: true },
      { no: 15, label: 'Anak Gastro-Hepatologi', checked: true },
    ],
  },
  {
    no: 17,
    label: 'Pelayanan Medik Subspesialistik Kebidanan dan Kandungan',
    items: [
      { no: 1, label: 'Kedokteran Fetomaternal', checked: true },
      { no: 2, label: 'Onkologi Ginekologi', checked: true },
      { no: 3, label: 'Fertilitas Endokrinologi Reproduksi', checked: true },
      { no: 4, label: 'Obstetri Ginekologi sosial', checked: false },
      { no: 5, label: 'Uro-ginekologi Rekonstruksi', checked: false },
    ],
  },
  {
    no: 18,
    label: 'Pelayanan Medik Subspesialistik Mata',
    items: [
      { no: 1, label: 'Vitreo Retina', checked: false },
      { no: 2, label: 'Strabismus', checked: false },
      { no: 3, label: 'Pediatrik Oftamologi', checked: false },
      { no: 4, label: 'Pediatri onkologi strabismus', checked: false },
      { no: 5, label: 'Rekonstruksi okuloplasti dan onkologi', checked: false },
    ],
  },
  {
    no: 19,
    label: 'Pelayanan Medik Subspesialis THT',
    items: [
      { no: 1, label: 'Bedah THT KL dan Rekonstruksi', checked: true },
      { no: 2, label: 'BERA (Brain Evoke Response Audimetri)', checked: true },
      { no: 3, label: 'E.N.G (Electric Nistamografi)', checked: false },
      { no: 4, label: 'Audiovestibuler', checked: true },
      { no: 5, label: 'Hearing Aid Center', checked: true },
      { no: 6, label: 'Otologi', checked: true },
      { no: 7, label: 'Rinologi', checked: true },
      { no: 8, label: 'Onkologi bedah kepala leher', checked: true },
      { no: 9, label: 'Laring faring', checked: true },
      { no: 10, label: 'Neurotologi', checked: false },
      { no: 11, label: 'Endoskopi bronkoesofagologi', checked: true },
      { no: 12, label: 'THT komunitas', checked: false },
      { no: 13, label: 'THT-KL plastik rekonstruksi', checked: true },
      { no: 14, label: 'Bedah kepala leher', checked: true },
      { no: 15, label: 'Pencitraan Kepala Leher', checked: false },
    ],
  },
  {
    no: 20,
    label: 'Pelayanan Medik Subspesialis Syaraf',
    items: [
      { no: 1, label: 'Stroke dan Cerebro Vaskuler', checked: true },
      { no: 2, label: 'Neuro fisiologi', checked: true },
      { no: 3, label: 'Neuro emergency / intensive', checked: true },
      { no: 4, label: 'Neuro restorasi/fungsi luhur', checked: false },
      { no: 5, label: 'Neuro optalmologi / otologi', checked: false },
      { no: 6, label: 'Neuro onkologi', checked: true },
      { no: 7, label: 'Epilepsi', checked: true },
      { no: 8, label: 'Bedah saraf neurotrauma', checked: true },
      { no: 9, label: 'Bedah saraf neuro onkologi', checked: true },
      { no: 10, label: 'Bedah saraf neurospine', checked: true },
      { no: 11, label: 'Bedah saraf neurofungsional', checked: false },
      { no: 12, label: 'Bedah saraf neuropediatri', checked: false },
      { no: 13, label: 'Bedah saraf neurovaskular', checked: true },
      { no: 14, label: 'Stroke dan neurovaskular', checked: true },
      { no: 15, label: 'Neuroinfeksi dan imunologi', checked: false },
      { no: 16, label: 'Neuropediatri', checked: false },
    ],
  },
]

export default function KetersediaanPelayananPage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState(false)

  const totalItems = useMemo(() => groups.reduce((acc, g) => acc + g.items.length, 0), [groups])
  const tersedia = useMemo(
    () => groups.reduce((acc, g) => acc + g.items.filter((i) => i.checked).length, 0),
    [groups]
  )
  const tidakTersedia = totalItems - tersedia
  const pctTersedia = totalItems > 0 ? Math.round((tersedia / totalItems) * 100) : 0

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups
    const q = search.toLowerCase()
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((item) => item.label.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0)
  }, [groups, search])

  function toggleItem(groupNo: number, itemNo: number) {
    setGroups((prev) =>
      prev.map((g) =>
        g.no === groupNo
          ? {
              ...g,
              items: g.items.map((item) =>
                item.no === itemNo ? { ...item, checked: !item.checked } : item
              ),
            }
          : g
      )
    )
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-green-100 p-2">
            <Stethoscope className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Ketersediaan Pelayanan (RL 1.2)</h1>
            <p className="text-sm text-slate-500">
              {infoRS.nama} &mdash; Periode {new Date().getFullYear()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <FileText className="h-4 w-4" />
            Cetak PDF
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Total Layanan</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{totalItems}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Tersedia</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{tersedia}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Tidak Tersedia</p>
          <p className="mt-1 text-2xl font-bold text-red-500">{tidakTersedia}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">% Ketersediaan</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{pctTersedia}%</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari nama layanan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm shadow-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-600 w-12">No</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">
                Kategori Pelayanan / Layanan
              </th>
              <th className="px-4 py-3 text-center font-semibold text-slate-600 w-28">Kondisi</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group) => (
              <>
                {/* Group header row */}
                <tr key={`group-${group.no}`} className="border-b border-slate-100 bg-slate-100">
                  <td className="px-4 py-2.5 font-bold text-slate-700">{group.no}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-700" colSpan={2}>
                    {group.label}
                  </td>
                </tr>
                {/* Item rows */}
                {group.items.map((item) => (
                  <tr
                    key={`item-${group.no}-${item.no}`}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-2 text-slate-500 pl-8">{item.no}</td>
                    <td className="px-4 py-2 text-slate-700">{item.label}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => toggleItem(group.no, item.no)}
                        className="inline-flex items-center justify-center rounded-md p-1 transition-colors hover:bg-slate-100"
                        title={item.checked ? 'Tersedia — klik untuk ubah' : 'Tidak tersedia — klik untuk ubah'}
                      >
                        {item.checked ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-300" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors ${
            saved
              ? 'bg-green-100 text-green-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <Save className="h-4 w-4" />
          {saved ? 'Tersimpan!' : 'Simpan'}
        </button>
      </div>
    </div>
  )
}
