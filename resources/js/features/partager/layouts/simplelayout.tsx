import React, { ReactNode } from 'react';
import { Box, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminPageContainer from './AdminPageContainer';

interface SimpleLayoutProps {
    title: string;
    description: string;
    onCreateClick: () => void;
    createLabel?: string;
    children: ReactNode;
    totalCount?: number;
    icon?: ReactNode;
    createIcon?: ReactNode;
    footerLabel?: string;
}

export function SimpleLayout({
    title,
    description,
    onCreateClick,
    createLabel = 'Add New',
    children,
    totalCount,
    icon,
    createIcon,
    footerLabel = 'items',
}: SimpleLayoutProps) {
    return (
        <AdminPageContainer>
            <div className="min-h-screen bg-background text-foreground relative transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col gap-8 mb-10">
                        {/* Top Bar: Title & Primary Actions */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/25 text-primary-foreground">
                                    {icon ?? <Box size={28} />}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                                        {title}
                                    </h1>
                                    <p className="text-muted-foreground mt-1 text-sm font-medium">
                                        {description}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full md:w-auto">
                                <Button
                                    onClick={onCreateClick}
                                    size="lg"
                                    className="w-full md:w-auto rounded-xl shadow-md hover:shadow-xl transition-all"
                                >
                                    {createIcon ?? <Plus size={18} />}
                                    <span>{createLabel}</span>
                                </Button>
                            </div>
                        </div>

                    </div>

                    {/* Content Area */}
                    {children}

                    {/* Footer info */}
                    {totalCount !== undefined && (
                        <div className="mt-8 flex justify-center">
                            <p className="text-sm text-muted-foreground font-medium bg-card px-4 py-1.5 rounded-full border border-border shadow-sm">
                                Showing {totalCount} {footerLabel}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminPageContainer>
    );
}