import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { clsx } from 'clsx';

interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  onRowClick?: (item: T) => void;
  compact?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string;
}

type SortDirection = 'asc' | 'desc' | null;

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  keyField,
  onRowClick,
  compact = false,
  stickyHeader = false,
  maxHeight
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    
    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;
    
    const comparison = aVal < bVal ? -1 : 1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortColumn !== columnKey) {
      return <ChevronsUpDown size={12} className="text-[var(--text-muted)]" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp size={12} className="text-[var(--xrp-accent)]" />;
    }
    return <ChevronDown size={12} className="text-[var(--xrp-accent)]" />;
  };

  return (
    <div 
      className={clsx(
        'overflow-auto rounded border border-[var(--border-subtle)]',
        maxHeight && 'overflow-y-auto'
      )}
      style={{ maxHeight }}
    >
      <table className="w-full">
        <thead className={clsx(stickyHeader && 'sticky top-0 z-10')}>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={clsx(
                  'text-left bg-[var(--bg-tertiary)]',
                  compact ? 'px-2 py-1.5 text-[9px]' : 'px-3 py-2 text-[10px]',
                  column.sortable && 'cursor-pointer hover:bg-[var(--bg-hover)] select-none'
                )}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(String(column.key))}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {column.sortable && <SortIcon columnKey={String(column.key)} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, rowIndex) => (
            <tr
              key={String(item[keyField])}
              className={clsx(
                'border-t border-[var(--border-subtle)]',
                onRowClick && 'cursor-pointer hover:bg-[var(--bg-hover)]',
                rowIndex % 2 === 1 && 'bg-[var(--bg-secondary)]'
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={clsx(
                    compact ? 'px-2 py-1.5 text-[11px]' : 'px-3 py-2 text-xs'
                  )}
                >
                  {column.render 
                    ? column.render(item) 
                    : String(item[column.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-sm text-[var(--text-muted)]">
          No data available
        </div>
      )}
    </div>
  );
}

// Comparison table variant
interface ComparisonTableProps {
  data: Record<string, unknown>[];
  headers: string[];
  rowKey: string;
}

export function ComparisonTable({ data, headers, rowKey }: ComparisonTableProps) {
  return (
    <div className="overflow-auto rounded border border-[var(--border-subtle)]">
      <table className="w-full">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={header}
                className={clsx(
                  'px-3 py-2 text-[10px] text-left bg-[var(--bg-tertiary)]',
                  i === 0 && 'sticky left-0 z-10 bg-[var(--bg-tertiary)]'
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={String(row[rowKey])}
              className={clsx(
                'border-t border-[var(--border-subtle)]',
                rowIndex % 2 === 1 && 'bg-[var(--bg-secondary)]'
              )}
            >
              {headers.map((header, i) => {
                const key = header.toLowerCase().replace(/\s+/g, '');
                const value = row[key] ?? row[header] ?? '';
                return (
                  <td
                    key={header}
                    className={clsx(
                      'px-3 py-2 text-xs',
                      i === 0 && 'sticky left-0 bg-inherit font-medium'
                    )}
                  >
                    {String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
