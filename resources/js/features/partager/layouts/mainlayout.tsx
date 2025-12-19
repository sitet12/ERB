import { ReactNode, useState, useEffect } from 'react';
import { Box, Plus, LayoutGrid, List, Search, SlidersHorizontal, X } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface SearchProps {
    query: string;
    onChange: (query: string) => void;
    placeholder?: string;
}

interface FilterProps {
    date?: string; // YYYY-MM-DD format
    onDateChange?: (date: string) => void;
    onClear?: () => void;
}

interface CreateProps {
    onClick?: () => void;
    label?: string;
    icon?: ReactNode;
}

interface ViewProps {
    mode: 'list' | 'cards';
    onChange: (mode: 'cards' | 'list') => void;
}

interface HeaderProps {
    title: string;
    description: string;
    icon?: ReactNode;
}

interface FooterProps {
    totalCount?: number;
    filteredCount?: number;
    label?: string;
}

interface MainLayoutProps {
    header: HeaderProps;
    search: SearchProps;
    view: ViewProps;
    filter?: FilterProps;
    create?: CreateProps;
    footer?: FooterProps;
    children: ReactNode;
}

export function MainLayout({
    header,
    search,
    view,
    filter,
    create,
    footer,
    children,
}: MainLayoutProps) {
    const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
    const [localFilterDate, setLocalFilterDate] = useState<string>(filter?.date || '');

    // Sync localFilterDate with filter.date prop
    useEffect(() => {
        if (filter?.date !== undefined) {
            setLocalFilterDate(filter.date);
        }
    }, [filter?.date]);

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col gap-8 mb-10">
                    {/* Top Bar: Title & Primary Actions */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/25 text-primary-foreground">
                                {header.icon ?? <Box size={28} />}
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                                    {header.title}
                                </h1>
                                <p className="text-muted-foreground mt-1 text-sm font-medium">
                                    {header.description}
                                </p>
                            </div>
                        </div>

                        {create?.onClick && (
                            <Button
                                onClick={create.onClick}
                                size="lg"
                                className="flex items-center justify-center gap-2 w-full md:w-auto rounded-xl shadow-md hover:shadow-xl transition-all"
                            >
                                {create.icon ?? <Plus size={18} />}
                                <span>{create.label ?? 'Ajouter'}</span>
                            </Button>
                        )}
                    </div>

                    {/* Controls Bar: Search, Filter, View Toggle */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card p-2 rounded-2xl shadow-sm border border-border">
                        {/* Search Input */}
                        <div className="relative w-full md:max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder={search.placeholder ?? 'Rechercher...'}
                                value={search.query}
                                onChange={(e) => search.onChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-muted border-none rounded-xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground transition-all"
                            />
                        </div>

                        {/* Right Side Controls */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                            {/* Filter Button with Popover */}
                            {filter && (
                                <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-2 rounded-xl text-sm font-semibold transition-colors"
                                        >
                                            <SlidersHorizontal size={16} />
                                            <span className="hidden sm:inline">
                                                {filter.date || localFilterDate
                                                    ? new Date((filter.date || localFilterDate) + 'T00:00:00').toLocaleDateString('fr-FR')
                                                    : 'Filtres'}
                                            </span>
                                            {/* Show X button if a date is selected */}
                                            {(filter.date || localFilterDate) && filter.onClear && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        filter.onClear?.();
                                                        setFilterPopoverOpen(false);
                                                    }}
                                                    className="ml-1 p-0.5 hover:bg-muted rounded transition-colors"
                                                    title="Effacer le filtre"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end" side="bottom" sideOffset={4}>
                                        <div className="p-3">
                                            <div className="flex items-center justify-between mb-3">
                                                <Label className="text-sm font-medium text-foreground">
                                                    Filtrer par date
                                                </Label>
                                                {/* Clear button in popover */}
                                                {(filter.date || localFilterDate) && filter.onClear && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            filter.onClear?.();
                                                            setFilterPopoverOpen(false);
                                                        }}
                                                        className="text-xs h-7 px-2"
                                                    >
                                                        Effacer
                                                    </Button>
                                                )}
                                            </div>
                                            <Calendar
                                                mode="single"
                                                selected={filter.date || localFilterDate 
                                                    ? new Date((filter.date || localFilterDate) + 'T00:00:00')
                                                    : undefined
                                                }
                                                captionLayout="dropdown"
                                                onSelect={(selectedDate) => {
                                                    if (selectedDate) {
                                                        const formatted = format(selectedDate, 'yyyy-MM-dd');
                                                        setLocalFilterDate(formatted);
                                                        if (filter.onDateChange) {
                                                            filter.onDateChange(formatted);
                                                        }
                                                        setFilterPopoverOpen(false); // Ferme automatiquement après sélection
                                                    } else {
                                                        if (filter.onClear) {
                                                            filter.onClear();
                                                        }
                                                        setFilterPopoverOpen(false);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}

                            {/* Divider */}
                            {filter && <div className="h-8 w-px bg-border mx-1" />}

                            {/* View Toggles */}
                            <div className="flex bg-muted p-1 rounded-xl">
                                <button
                                    onClick={() => view.onChange('cards')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${
                                        view.mode === 'cards'
                                            ? 'bg-card text-primary shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                    title="Vue en cartes"
                                >
                                    <LayoutGrid size={18} />
                                </button>
                                <button
                                    onClick={() => view.onChange('list')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${
                                        view.mode === 'list'
                                            ? 'bg-card text-primary shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                    title="Vue en liste"
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                {children}

                {/* Footer info */}
                {footer && (footer.totalCount !== undefined || footer.filteredCount !== undefined) && (
                    <div className="mt-8 flex justify-center">
                        <p className="text-sm text-muted-foreground font-medium bg-card px-4 py-1.5 rounded-full border border-border shadow-sm">
                            Affichage de {footer.filteredCount ?? footer.totalCount ?? 0} sur {footer.totalCount ?? 0}{' '}
                            {footer.label ?? 'éléments'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

