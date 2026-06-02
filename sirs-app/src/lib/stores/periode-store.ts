'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PeriodeAktif {
  id: string
  bulan: number
  tahun: number
  jenis: 'bulanan' | 'tahunan'
  deadline: string
  label: string // "Mei 2026"
}

const BULAN = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des']

function makeDummyPeriode(bulan: number, tahun: number): PeriodeAktif {
  return {
    id: `${tahun}-${String(bulan).padStart(2, '0')}`,
    bulan,
    tahun,
    jenis: 'bulanan',
    deadline: `${tahun}-${String(bulan + 1).padStart(2, '0')}-10`,
    label: `${BULAN[bulan - 1]} ${tahun}`,
  }
}

interface PeriodeState {
  active: PeriodeAktif
  history: PeriodeAktif[]
  setPeriode: (p: PeriodeAktif) => void
}

// Default: periode saat ini (Juni 2026 — pelaporan Mei)
const DEFAULT_PERIODE = makeDummyPeriode(5, 2026)

export const usePeriodeStore = create<PeriodeState>()(
  persist(
    (set) => ({
      active: DEFAULT_PERIODE,
      history: [
        makeDummyPeriode(5, 2026),
        makeDummyPeriode(4, 2026),
        makeDummyPeriode(3, 2026),
        makeDummyPeriode(2, 2026),
        makeDummyPeriode(1, 2026),
      ],
      setPeriode: (p) => set({ active: p }),
    }),
    { name: 'sirs-periode' }
  )
)
