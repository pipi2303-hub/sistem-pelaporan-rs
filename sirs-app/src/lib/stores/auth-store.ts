'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppUser } from '@/lib/api-client'

interface AuthState {
  user: AppUser | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: AppUser, token: string) => void
  clearAuth: () => void
  hasRole: (...roles: AppUser['role'][]) => boolean
  canWrite: (modul: string) => boolean
}

// Unit restrictions per role PIC_UNIT
const PIC_UNIT_MODUL: Record<string, string[]> = {
  IRNA: ['rl3/rawat-inap', 'rl3/sensus-harian', 'rl3/indikator'],
  IGD: ['rl3/igd'],
  LAB: ['rl3/laboratorium'],
  FARMASI: ['rl3/farmasi'],
  KEBIDANAN: ['rl3/kebidanan', 'rl3/neonatal'],
  RADIOLOGI: ['rl3/radiologi'],
  RM: ['rl4', 'rl5'],
  SDM: ['rl2'],
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('sirs_token', token)
          localStorage.setItem('sirs_user', JSON.stringify(user))
        }
        set({ user, token, isAuthenticated: true })
      },

      clearAuth: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('sirs_token')
          localStorage.removeItem('sirs_user')
        }
        set({ user: null, token: null, isAuthenticated: false })
      },

      hasRole: (...roles) => {
        const { user } = get()
        return !!user && roles.includes(user.role)
      },

      canWrite: (modul) => {
        const { user } = get()
        if (!user) return false
        if (['SUPERADMIN', 'ADMIN'].includes(user.role)) return true
        if (user.role === 'PIC_UNIT') {
          const allowed = PIC_UNIT_MODUL[user.unitKerja ?? ''] ?? []
          return allowed.some((m) => modul.startsWith(m))
        }
        if (user.role === 'CODER') return modul === 'rl4' || modul === 'rl5'
        return false
      },
    }),
    {
      name: 'sirs-auth',
      partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: s.isAuthenticated }),
    }
  )
)
