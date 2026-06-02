const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3200/api/v1'

interface ApiError {
  code: string
  message: string
  details?: { field: string; message: string }[]
}

export class ApiClientError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: { field: string; message: string }[]
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('sirs_token')
    : null

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })

  const body = await res.json().catch(() => null)

  if (!res.ok) {
    const err: ApiError = body?.error ?? { code: 'UNKNOWN', message: res.statusText }
    throw new ApiClientError(err.code, err.message, err.details)
  }

  return body as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(data) }),
  put: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(data) }),
  patch: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}

// --- typed endpoint helpers ---

export const authApi = {
  login: (username: string, password: string) =>
    api.post<{ access_token: string; refresh_token: string; user: AppUser }>(
      '/auth/login', { username, password }
    ),
  me: () => api.get<AppUser>('/auth/me'),
  logout: () => api.post('/auth/logout'),
  changePassword: (oldPassword: string, newPassword: string) =>
    api.patch('/auth/change-password', { oldPassword, newPassword }),
}

export const masterApi = {
  searchIcd10: (q: string) =>
    api.get<Icd10Item[]>(`/master/icd10?q=${encodeURIComponent(q)}`),
  validateIcd10: (kode: string, gender: 'L' | 'P', usiaBulan: number) =>
    api.post<{ valid: boolean; pesan?: string }>(
      '/master/icd10/validate', { kode, gender, usiaBulan }
    ),
  kelasTT: () => api.get<KelasTT[]>('/master/kelas-tt'),
  jenisPelayanan: () => api.get<JenisPelayanan[]>('/master/jenis-pelayanan'),
  caraBayar: () => api.get<CaraBayar[]>('/master/cara-bayar'),
  kelompokUmur: () => api.get<KelompokUmur[]>('/master/kelompok-umur'),
}

export const periodeApi = {
  list: () => api.get<Periode[]>('/periode'),
  active: () => api.get<Periode>('/periode/active'),
  create: (data: { bulan: number; tahun: number; jenis: 'bulanan' | 'tahunan' }) =>
    api.post<Periode>('/periode', data),
}

export const workflowApi = {
  submit: (periodeId: string, modul: string) =>
    api.post('/workflow/submit', { periodeId, modul }),
  validate: (periodeId: string, modul: string) =>
    api.post('/workflow/validate', { periodeId, modul }),
  approve: (periodeId: string, modul: string) =>
    api.post('/workflow/approve', { periodeId, modul }),
  reject: (periodeId: string, modul: string, catatan: string) =>
    api.post('/workflow/reject', { periodeId, modul, catatan }),
  history: (periodeId: string) =>
    api.get<WorkflowHistory[]>(`/workflow/history/${periodeId}`),
}

// --- shared types used by API ---

export interface AppUser {
  id: string
  username: string
  name: string
  role: 'SUPERADMIN' | 'ADMIN' | 'PIC_UNIT' | 'VALIDATOR' | 'APPROVER' | 'CODER' | 'VIEWER_MNJMN' | 'INTEGRATOR'
  unitKerja?: string
  hospital: string
}

export interface Icd10Item {
  kode: string
  nama: string
  bab: string
  restriksiGender?: 'L' | 'P'
  restriksiUsiaMin?: number
  restriksiUsiaMax?: number
}

export interface KelasTT {
  id: string
  kode: string
  nama: string
  kategori: string
}

export interface JenisPelayanan {
  id: string
  kode: string
  nama: string
}

export interface CaraBayar {
  id: string
  kode: string
  nama: string
}

export interface KelompokUmur {
  id: string
  label: string
  minBulan: number
  maxBulan: number | null
}

export interface Periode {
  id: string
  bulan: number
  tahun: number
  jenis: 'bulanan' | 'tahunan'
  deadline: string
  status: 'aktif' | 'tutup' | 'terkunci'
}

export interface WorkflowHistory {
  modul: string
  status: string
  aktor: string
  waktu: string
  catatan?: string
}
