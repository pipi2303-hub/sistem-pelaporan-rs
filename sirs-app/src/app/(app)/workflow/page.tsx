'use client'

import { useState } from 'react'
import { workflowModules, infoRS, type WorkflowModule, type WorkflowStatus } from '@/lib/dummy-data'
import { CheckCircle2, Clock, Send, FileText, AlertCircle, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

const STATUS_CONFIG: Record<WorkflowStatus, { label: string; cls: string; bg: string }> = {
  draft:      { label: 'Draft',      cls: 'bg-slate-100 text-slate-500 border border-slate-200',  bg: 'bg-slate-50'   },
  submitted:  { label: 'Submitted',  cls: 'bg-purple-100 text-purple-700 border border-purple-200', bg: 'bg-purple-50' },
  validated:  { label: 'Tervalidasi',cls: 'bg-amber-100 text-amber-700 border border-amber-200',   bg: 'bg-amber-50'  },
  approved:   { label: 'Disetujui',  cls: 'bg-blue-100 text-blue-700 border border-blue-200',      bg: 'bg-blue-50'   },
  sent:       { label: 'Terkirim',   cls: 'bg-green-100 text-green-700 border border-green-200',   bg: 'bg-green-50'  },
}

function StatusIcon({ status }: { status: WorkflowStatus }) {
  if (status === 'sent')      return <CheckCircle2 className="w-4 h-4 text-green-600" />
  if (status === 'approved')  return <CheckCircle2 className="w-4 h-4 text-blue-600" />
  if (status === 'validated') return <CheckCircle2 className="w-4 h-4 text-amber-500" />
  if (status === 'submitted') return <Clock className="w-4 h-4 text-purple-500" />
  return <FileText className="w-4 h-4 text-slate-400" />
}

function fmtDate(iso?: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: '2-digit' })
}

export default function WorkflowPage() {
  const [modules, setModules]   = useState<WorkflowModule[]>(workflowModules)
  const [selected, setSelected] = useState<WorkflowModule | null>(modules[3])
  const [rejectOpen, setRejectOpen] = useState(false)
  const [rejectNote, setRejectNote] = useState('')

  const sentCount     = modules.filter(m => m.status === 'sent').length
  const approvedCount = modules.filter(m => m.status === 'approved').length
  const draftCount    = modules.filter(m => m.status === 'draft').length
  const progress      = Math.round((sentCount + approvedCount) / modules.length * 100)

  // Deadline countdown
  const deadline = new Date('2026-06-10')
  const today    = new Date('2026-05-20')
  const sisaHari = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  const handleTransition = (id: string, toStatus: WorkflowStatus) => {
    setModules(prev => prev.map(m => {
      if (m.id !== id) return m
      const now = new Date().toISOString()
      return {
        ...m,
        status: toStatus,
        ...(toStatus === 'submitted'  ? { submittedAt: now, submittedBy: 'dr. Administrator' } : {}),
        ...(toStatus === 'validated'  ? { validatedAt: now, validatedBy: 'Anita Rahayu, SKM' } : {}),
        ...(toStatus === 'approved'   ? { approvedAt:  now, approvedBy:  'dr. Direktur'       } : {}),
        ...(toStatus === 'sent'       ? { sentAt:       now }                                   : {}),
        ...(toStatus === 'draft'      ? { submittedAt: undefined, validatedAt: undefined, approvedAt: undefined, sentAt: undefined } : {}),
      }
    }))
    if (selected?.id === id) {
      setSelected(prev => prev ? { ...prev, status: toStatus } : prev)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Workflow &amp; Status Laporan</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola alur persetujuan semua modul pelaporan SIRS</p>
        </div>
        <div className={clsx(
          'flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold',
          sisaHari <= 3 ? 'bg-red-50 border-red-200 text-red-700' :
          sisaHari <= 7 ? 'bg-amber-50 border-amber-200 text-amber-700' :
          'bg-blue-50 border-blue-200 text-blue-700'
        )}>
          <Clock className="w-4 h-4" />
          {sisaHari} hari lagi · Deadline {infoRS.deadline}
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700">Progress Keseluruhan — {infoRS.periodeAktif}</span>
          <span className="text-lg font-bold text-blue-700">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-6 mt-3 text-xs text-slate-500">
          {[
            { label: 'Terkirim',   count: sentCount,                     cls: 'text-green-700' },
            { label: 'Disetujui',  count: approvedCount,                 cls: 'text-blue-700'  },
            { label: 'Submitted',  count: modules.filter(m => m.status === 'submitted').length, cls: 'text-purple-700' },
            { label: 'Validated',  count: modules.filter(m => m.status === 'validated').length, cls: 'text-amber-700' },
            { label: 'Draft',      count: draftCount,                    cls: 'text-slate-500' },
          ].map(item => (
            <span key={item.label} className={`font-semibold ${item.cls}`}>{item.count} {item.label}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-5">
        {/* Module cards grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {modules.map(m => {
              const cfg = STATUS_CONFIG[m.status]
              const isSelected = selected?.id === m.id
              return (
                <button key={m.id} onClick={() => setSelected(m)}
                  className={clsx(
                    'text-left p-4 rounded-xl border-2 transition-all hover:shadow-md',
                    isSelected ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 bg-white hover:border-blue-200'
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={m.status} />
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">{m.kode}</span>
                      {m.wajib && <span className="text-[10px] text-red-500 font-bold">*</span>}
                    </div>
                    <span className={clsx('text-[11px] font-semibold px-2 py-0.5 rounded-full', cfg.cls)}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{m.nama}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{m.deskripsi}</p>
                  {m.submittedAt && (
                    <p className="text-[11px] text-slate-400 mt-2">Submit: {fmtDate(m.submittedAt)}</p>
                  )}
                  {/* Action button */}
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    {m.status === 'draft' && (
                      <div className="flex items-center gap-2">
                        <Link href={m.path} className="text-xs text-blue-600 hover:underline font-medium">
                          Isi Data →
                        </Link>
                        <span className="text-slate-300">|</span>
                        <button onClick={e => { e.stopPropagation(); handleTransition(m.id, 'submitted') }}
                          className="text-xs text-purple-600 hover:underline font-medium">
                          Submit →
                        </button>
                      </div>
                    )}
                    {m.status === 'submitted' && (
                      <button onClick={e => { e.stopPropagation(); handleTransition(m.id, 'validated') }}
                        className="text-xs text-amber-700 font-semibold hover:text-amber-800">
                        ✓ Validasi (Validator)
                      </button>
                    )}
                    {m.status === 'validated' && (
                      <button onClick={e => { e.stopPropagation(); handleTransition(m.id, 'approved') }}
                        className="text-xs text-blue-700 font-semibold hover:text-blue-800">
                        ✓ Approve (Direksi)
                      </button>
                    )}
                    {m.status === 'approved' && (
                      <button onClick={e => { e.stopPropagation(); handleTransition(m.id, 'sent') }}
                        className="flex items-center gap-1 text-xs text-green-700 font-semibold hover:text-green-800">
                        <Send className="w-3 h-3" /> Kirim ke Kemenkes
                      </button>
                    )}
                    {m.status === 'sent' && (
                      <div className="flex items-center gap-1 text-xs text-green-700 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Terkirim {fmtDate(m.sentAt)}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-20">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                <p className="text-sm font-semibold text-slate-700">{selected.kode} — {selected.nama}</p>
                <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-slate-200 transition-colors">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              {/* Timeline */}
              <div className="p-4 space-y-0">
                {[
                  { step: 'Draft',       key: undefined,         at: undefined,                by: undefined },
                  { step: 'Submitted',   key: 'submitted' as const,  at: selected.submittedAt,  by: selected.submittedBy  },
                  { step: 'Validated',   key: 'validated' as const,  at: selected.validatedAt,  by: selected.validatedBy  },
                  { step: 'Approved',    key: 'approved'  as const,  at: selected.approvedAt,   by: selected.approvedBy   },
                  { step: 'Terkirim',    key: 'sent'      as const,  at: selected.sentAt,       by: undefined             },
                ].map((item, i, arr) => {
                  const ORDER: WorkflowStatus[] = ['draft', 'submitted', 'validated', 'approved', 'sent']
                  const itemOrder   = i
                  const currentOrder = ORDER.indexOf(selected.status)
                  const isDone = itemOrder <= currentOrder
                  const isCurrent = itemOrder === currentOrder

                  return (
                    <div key={item.step} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={clsx(
                          'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all',
                          isDone && !isCurrent ? 'bg-blue-700 border-blue-700' :
                          isCurrent            ? 'bg-white border-blue-600 ring-2 ring-blue-200' :
                          'bg-white border-slate-200'
                        )}>
                          {isDone && !isCurrent
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            : isCurrent
                              ? <div className="w-2 h-2 rounded-full bg-blue-600" />
                              : <div className="w-2 h-2 rounded-full bg-slate-200" />
                          }
                        </div>
                        {i < arr.length - 1 && (
                          <div className={clsx('w-0.5 flex-1 min-h-[28px]', isDone ? 'bg-blue-200' : 'bg-slate-100')} />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className={clsx('text-xs font-semibold', isDone ? 'text-blue-700' : isCurrent ? 'text-slate-800' : 'text-slate-400')}>
                          {item.step}
                        </p>
                        {item.at && (
                          <p className="text-[11px] text-slate-400 mt-0.5">{fmtDate(item.at)}</p>
                        )}
                        {item.by && (
                          <p className="text-[11px] text-slate-500">{item.by}</p>
                        )}
                        {!item.at && isDone && item.step === 'Draft' && (
                          <p className="text-[11px] text-slate-400">Dibuat otomatis</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quick action */}
              <div className="px-4 pb-4 pt-0 space-y-2">
                <a
                  href={`/reports/${selected.kode.split(' ')[0]}.pdf`}
                  download
                  className="w-full py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" /> Cetak Laporan (PDF)
                </a>

                {selected.status === 'draft' && (
                  <button onClick={() => handleTransition(selected.id, 'submitted')}
                    className="w-full py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 transition-colors">
                    Submit untuk Validasi
                  </button>
                )}
                {selected.status === 'submitted' && (
                  <div className="space-y-2">
                    <button onClick={() => handleTransition(selected.id, 'validated')}
                      className="w-full py-2 bg-amber-500 text-white rounded-lg text-xs font-semibold hover:bg-amber-600 transition-colors">
                      ✓ Validasi
                    </button>
                    <button onClick={() => setRejectOpen(true)}
                      className="w-full py-2 border border-red-300 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors">
                      ✗ Kembalikan (Reject)
                    </button>
                  </div>
                )}
                {selected.status === 'validated' && (
                  <button onClick={() => handleTransition(selected.id, 'approved')}
                    className="w-full py-2 bg-blue-700 text-white rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors">
                    ✓ Approve (Final)
                  </button>
                )}
                {selected.status === 'approved' && (
                  <button onClick={() => handleTransition(selected.id, 'sent')}
                    className="w-full py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <Send className="w-3.5 h-3.5" /> Kirim ke SIRS Online
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reject modal */}
      {rejectOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h2 className="text-base font-bold text-slate-900">Kembalikan Laporan</h2>
            </div>
            <p className="text-sm text-slate-600">Laporan akan dikembalikan ke status Draft. Berikan catatan untuk PIC.</p>
            <textarea rows={3} placeholder="Contoh: BOR bulan ini 125%, mohon cek ulang sensus harian tgl 15..."
              value={rejectNote} onChange={e => setRejectNote(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
            <div className="flex gap-2">
              <button onClick={() => { setRejectOpen(false); setRejectNote('') }}
                className="flex-1 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                Batal
              </button>
              <button onClick={() => {
                if (selected) handleTransition(selected.id, 'draft')
                setRejectOpen(false); setRejectNote('')
              }}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                Kembalikan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
