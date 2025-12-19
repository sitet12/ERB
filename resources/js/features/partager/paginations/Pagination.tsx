import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type PaginationLink } from '@/types';

interface PaginationProps {
    links: PaginationLink[];
}

export function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) return null;

    const previousLink = links[0];
    const nextLink = links[links.length - 1];
    const pageLinks = links.slice(1, -1).slice(0, 7); // Limite à 7 pages maximum

    return (
        <div className="mt-6 flex items-center justify-center gap-1">
            {previousLink?.url && (
                <Link
                    href={previousLink.url}
                    className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-md',
                        'bg-background text-foreground hover:bg-muted',
                        'border border-border transition'
                    )}
                    aria-label="Page précédente"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </Link>
            )}

            {pageLinks.map((link, index) => {
                const pageNumber = link.label.replace(/&hellip;/g, '...');

                return (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={cn(
                            'flex items-center justify-center w-8 h-8 rounded-md',
                            'text-sm font-medium transition',
                            link.active
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background text-foreground hover:bg-muted border border-border',
                            !link.url && 'opacity-50 cursor-not-allowed'
                        )}
                        aria-label={`Page ${pageNumber}`}
                        aria-current={link.active ? 'page' : undefined}
                    >
                        {pageNumber}
                    </Link>
                );
            })}

            {nextLink?.url && (
                <Link
                    href={nextLink.url}
                    className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-md',
                        'bg-background text-foreground hover:bg-muted',
                        'border border-border transition'
                    )}
                    aria-label="Page suivante"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </Link>
            )}
        </div>
    );
}