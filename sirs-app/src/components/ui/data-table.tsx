import clsx from 'clsx'

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T, index: number) => React.ReactNode
  align?: 'left' | 'center' | 'right'
  width?: string
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField?: keyof T
  striped?: boolean
  stickyHeader?: boolean
  compact?: boolean
  emptyMessage?: string
  className?: string
  footerRow?: React.ReactNode
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  striped = true,
  stickyHeader = false,
  compact = false,
  emptyMessage = 'Tidak ada data',
  className,
  footerRow,
}: DataTableProps<T>) {
  const cellPadding = compact ? 'px-3 py-2' : 'px-4 py-3'

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b-2 border-slate-200">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={col.width ? { width: col.width } : undefined}
                className={clsx(
                  cellPadding,
                  'text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap',
                  stickyHeader && 'sticky top-0 bg-slate-50',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right',
                  col.align !== 'center' && col.align !== 'right' && 'text-left',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-12 text-slate-400 text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={keyField ? String(row[keyField as string]) : rowIndex}
                className={clsx(
                  'border-b border-slate-100 transition-colors',
                  striped && rowIndex % 2 === 1 ? 'bg-slate-50/50' : 'bg-white',
                  'hover:bg-blue-50/30'
                )}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={clsx(
                      cellPadding,
                      'text-slate-700',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right',
                      col.className
                    )}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : String(row[col.key as string] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
          {footerRow}
        </tbody>
      </table>
    </div>
  )
}
