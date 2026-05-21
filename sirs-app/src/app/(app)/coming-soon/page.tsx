'use client'

import { Construction, ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'

export default function ComingSoonPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-amber-500" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Modul Sedang Dikembangkan</h1>
      <p className="text-slate-500 max-w-md mb-8">
        Halaman ini masih dalam tahap implementasi sesuai blueprint SIRS 6.3.
        Namun, Anda tetap dapat mengunduh draf laporan simulasi di bawah ini.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/dashboard" className="btn-secondary">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <a href="/reports/RL5.pdf" download className="btn-primary">
          <FileText className="w-4 h-4" /> Cetak Draft RL 5 (PDF)
        </a>
      </div>
    </div>
  )
}
