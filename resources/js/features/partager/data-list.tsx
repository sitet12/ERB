import { ReactNode } from 'react';
import { ActionButtons } from '@/features/partager/buttons/action-buttons';

export type DataListColumn<T> = {
    key: string;
    label: string;
    className?: string;
    render: (item: T) => ReactNode;
};

export type DataListProps<T> = {
    data: T[];
    columns: DataListColumn<T>[];
    emptyMessage?: string;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onPayment?: (item: T) => void;
    getShowPayment?: (item: T) => boolean;
    getRowKey?: (item: T) => string | number;
};

export function DataList<T>({
    data,
    columns,
    emptyMessage = 'Aucun élément trouvé',
    onEdit,
    onDelete,
    onPayment,
    getShowPayment,
    getRowKey,
}: DataListProps<T>) {
    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className={col.className || 'px-4 py-3'}>
                                    {col.label}
                                </th>
                            ))}
                            {(onEdit || onDelete || onPayment) && (
                                <th className="px-6 py-3 text-right">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {data.map((item, index) => {
                            const rowKey = getRowKey ? getRowKey(item) : index;
                            const showPayment = getShowPayment ? getShowPayment(item) : false;
                            
                            return (
                                <tr
                                    key={rowKey}
                                    className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className={col.className || 'py-4 px-4'}
                                        >
                                            {col.render(item)}
                                        </td>
                                    ))}
                                    {(onEdit || onDelete || onPayment) && (
                                        <td className="py-4 px-4 text-right pr-6">
                                            <ActionButtons
                                                onEdit={onEdit ? () => onEdit(item) : undefined}
                                                onDelete={onDelete ? () => onDelete(item) : undefined}
                                                onPayment={onPayment ? () => onPayment(item) : undefined}
                                                showPayment={showPayment}
                                            />
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

