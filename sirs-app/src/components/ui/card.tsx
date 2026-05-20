import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: boolean
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div className={clsx('bg-white rounded-xl border border-slate-200 shadow-sm', className)}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  border?: boolean
}

export function CardHeader({ children, className, border = true }: CardHeaderProps) {
  return (
    <div className={clsx(
      'px-5 py-4',
      border && 'border-b border-slate-100',
      className
    )}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={clsx('px-5 py-4', className)}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={clsx('px-5 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl', className)}>
      {children}
    </div>
  )
}
