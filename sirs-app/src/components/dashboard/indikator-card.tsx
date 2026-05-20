import clsx from 'clsx'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface BenchmarkRange {
  min?: number
  max?: number
  label: string
}

interface IndikatorCardProps {
  label: string
  nilai: number
  satuan: string
  benchmark?: BenchmarkRange
  prevNilai?: number
  icon?: React.ReactNode
  decimal?: number
  higherIsBetter?: boolean
}

function getStatus(nilai: number, benchmark?: BenchmarkRange, higherIsBetter = true): 'good' | 'warn' | 'bad' {
  if (!benchmark) return 'good'
  const { min, max } = benchmark

  if (min !== undefined && max !== undefined) {
    if (nilai >= min && nilai <= max) return 'good'
    if (Math.abs(nilai - (nilai < min ? min : max)) <= 5) return 'warn'
    return 'bad'
  }
  if (max !== undefined) {
    if (nilai <= max) return 'good'
    if (nilai <= max * 1.1) return 'warn'
    return 'bad'
  }
  if (min !== undefined) {
    if (nilai >= min) return 'good'
    if (nilai >= min * 0.9) return 'warn'
    return 'bad'
  }
  return 'good'
}

export function IndikatorCard({
  label,
  nilai,
  satuan,
  benchmark,
  prevNilai,
  icon,
  decimal = 1,
  higherIsBetter = true,
}: IndikatorCardProps) {
  const status = getStatus(nilai, benchmark, higherIsBetter)

  const statusConfig = {
    good: { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-700', badge: 'bg-green-100 text-green-700', label: 'Baik' },
    warn: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', label: 'Perhatian' },
    bad: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700', badge: 'bg-red-100 text-red-700', label: 'Buruk' },
  }[status]

  const trendDiff = prevNilai !== undefined ? nilai - prevNilai : 0
  const trendUp = trendDiff > 0
  const trendDown = trendDiff < 0

  const TrendIcon = trendUp ? TrendingUp : trendDown ? TrendingDown : Minus
  const trendColor = trendDiff === 0
    ? 'text-slate-400'
    : (higherIsBetter ? trendUp : trendDown)
      ? 'text-green-500'
      : 'text-red-500'

  return (
    <div className={clsx(
      'bg-white rounded-xl border shadow-sm p-5 transition-all hover:shadow-md',
      statusConfig.border
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className={clsx('p-2 rounded-lg', statusConfig.bg)}>
              <span className={statusConfig.text}>{icon}</span>
            </div>
          )}
          <p className="text-sm font-medium text-slate-600">{label}</p>
        </div>
        <span className={clsx('text-[11px] font-semibold px-2 py-0.5 rounded-full', statusConfig.badge)}>
          {statusConfig.label}
        </span>
      </div>

      <div className="flex items-end gap-2">
        <span className={clsx('text-3xl font-bold tracking-tight', statusConfig.text)}>
          {nilai.toFixed(decimal)}
        </span>
        <span className="text-sm text-slate-400 mb-0.5">{satuan}</span>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        {benchmark && (
          <p className="text-[11px] text-slate-400">
            Benchmark: {benchmark.min !== undefined ? `${benchmark.min}–` : '≤'}{benchmark.max ?? benchmark.min}{satuan.includes('%') ? '%' : ''}
          </p>
        )}
        {prevNilai !== undefined && (
          <div className={clsx('flex items-center gap-1 text-xs font-medium ml-auto', trendColor)}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{Math.abs(trendDiff).toFixed(decimal)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
