import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminDetailLayoutProps {
    title: string;
    description?: string;
    backHref: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
}

export function AdminDetailLayout({
    title,
    description,
    backHref,
    children,
    actions,
    className,
}: AdminDetailLayoutProps) {
    return (
        <div className={cn('flex h-full flex-1 flex-col gap-4 rounded-xl p-4', className)}>
            <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border md:min-h-min">
                <div className="flex flex-col gap-6 p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-lg font-semibold text-foreground sm:text-xl lg:text-2xl">
                                {title}
                            </h1>
                            {description && (
                                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                                    {description}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={backHref}
                                aria-label="Retour"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-elegant transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            {actions}
                        </div>
                    </div>

                    <div className="rounded-lg border border-border/60 bg-card/50 p-4 sm:p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}