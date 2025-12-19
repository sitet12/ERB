import { cn } from '@/lib/utils';
import { EmptyState } from '@/features/partager/empty-state';
import React from 'react';

export type DataTableColumn<T> = {
    key: keyof T | string;
    label: string;
    className?: string;
    render?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
    data: T[];
    columns: DataTableColumn<T>[];
    emptyMessage?: string;
    emptyDescription?: string;
    emptyIcon?: React.ReactNode;
    tableClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
};

/**
 * Helper to format dates consistently across tables.
 */
export function formatDateTime(
    value: string | number | Date | null | undefined,
    options: Intl.DateTimeFormatOptions = {},
    locale?: string,
    fallback = '—',
) {
    if (!value) return fallback;
    try {
        const date = value instanceof Date ? value : new Date(value);
        return date.toLocaleString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            ...options,
        });
    } catch (_) {
        return fallback;
    }
}

export function DataTable<T>({
    data,
    columns,
    emptyMessage = 'Aucun élément',
    emptyDescription,
    emptyIcon,
    tableClassName,
    headerClassName,
    bodyClassName,
}: DataTableProps<T>) {
    return (
        <div className="overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border rounded-lg bg-card">
            <div className="overflow-x-auto">
                <table
                    className={cn(
                        'min-w-full text-sm text-left',
                        tableClassName,
                    )}
                >
                    <thead
                        className={cn(
                            'bg-muted/60 text-xs font-semibold uppercase tracking-wide',
                            headerClassName,
                        )}
                    >
                        <tr>
                            {columns.map((col) => (
                                <th key={String(col.key)} className={cn('px-4 py-3', col.className)}>
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={cn('divide-y divide-border/70', bodyClassName)}>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <EmptyState
                                        title={emptyMessage}
                                        description={emptyDescription}
                                        icon={emptyIcon}
                                        className="py-6"
                                    />
                                </td>
                            </tr>
                        ) : (
                            data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-muted/40 transition-colors">
                                    {columns.map((col) => (
                                        <td
                                            key={String(col.key)}
                                            className={cn('px-4 py-3', col.className)}
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : (row as any)[col.key as keyof T]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

