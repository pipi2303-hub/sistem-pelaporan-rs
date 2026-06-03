'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Lock, User, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800))

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('sirs_user', JSON.stringify({
        username: 'admin',
        name: 'dr. Adminstrator',
        role: 'Admin',
        hospital: 'RS Intramedika',
        loginAt: new Date().toISOString(),
      }))
      router.push('/dashboard')
    } else if (username === 'validator' && password === 'val123') {
      localStorage.setItem('sirs_user', JSON.stringify({
        username: 'validator',
        name: 'Anita Rahayu, SKM',
        role: 'Validator',
        hospital: 'RS Intramedika',
        loginAt: new Date().toISOString(),
      }))
      router.push('/dashboard')
    } else {
      setError('Username atau password salah. Silakan coba lagi.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4">
            <Building2 className="w-10 h-10 text-blue-700" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">SIRS 6.3</h1>
          <p className="text-blue-200 font-medium">Sistem Informasi Rumah Sakit</p>
          <p className="text-blue-300 text-sm mt-1">Aplikasi Pelaporan Internal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <h2 className="text-lg font-semibold text-slate-800">Masuk ke Sistem</h2>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="input-field pl-10"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-2.5 text-base mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Memverifikasi...
                </>
              ) : 'Masuk'}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-5 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs font-medium text-blue-700 mb-1">Demo Credentials:</p>
            <p className="text-xs text-blue-600">Admin: <code className="bg-blue-100 px-1 rounded">admin</code> / <code className="bg-blue-100 px-1 rounded">admin123</code></p>
            <p className="text-xs text-blue-600 mt-0.5">Validator: <code className="bg-blue-100 px-1 rounded">validator</code> / <code className="bg-blue-100 px-1 rounded">val123</code></p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-300 text-xs mt-6">
          Kementerian Kesehatan Republik Indonesia &copy; 2026
        </p>
      </div>
    </div>
  )
}
