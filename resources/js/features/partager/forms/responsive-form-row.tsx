import React from 'react';
import { cn } from '@/lib/utils';

type ColumnCount = 1 | 2 | 3;

interface ResponsiveFormRowProps {
    children: React.ReactNode;
    columns?: ColumnCount;
    className?: string;
}

const columnClasses: Record<ColumnCount, string> = {
    1: '',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 xl:grid-cols-3',
};

/**
 * Responsive row layout for form fields.
 * - Mobile: always stacked (`grid-cols-1`)
 * - Tablet: becomes 2 columns when `columns >= 2`
 * - Desktop: optional 3rd column when `columns = 3`
 */
export function ResponsiveFormRow({
    children,
    columns = 2,
    className,
}: ResponsiveFormRowProps) {
    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6',
                columnClasses[columns],
                className,
            )}
        >
            {React.Children.map(children, (child) => (
                <div className="min-w-0">{child}</div>
            ))}
        </div>
    );
}

