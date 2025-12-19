import { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type FilterPeriod = 'jour' | 'semaine' | 'mois';

interface DateFilterDropdownProps {
    onApply: (period: FilterPeriod, date: string) => void;
    onClear: () => void;
    className?: string;
}

export function DateFilterDropdown({
    onApply,
    onClear,
    className,
}: DateFilterDropdownProps) {
    const [open, setOpen] = useState(false);
    const [period, setPeriod] = useState<FilterPeriod>('jour');
    const [date, setDate] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleApply = () => {
        if (date) {
            onApply(period, date);
            setOpen(false);
        }
    };

    const handleClear = () => {
        setPeriod('jour');
        setDate('');
        onClear();
        setOpen(false);
    };

    const getDateInputType = () => {
        switch (period) {
            case 'jour':
                return 'date';
            case 'semaine':
                return 'week';
            case 'mois':
                return 'month';
            default:
                return 'date';
        }
    };

    const getPlaceholder = () => {
        switch (period) {
            case 'jour':
                return 'Sélectionner une date';
            case 'semaine':
                return 'Sélectionner une semaine';
            case 'mois':
                return 'Sélectionner un mois';
            default:
                return 'Sélectionner une date';
        }
    };

    return (
        <div ref={dropdownRef} className={cn('relative', className)}>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
                <Calendar size={16} />
                <span className="hidden sm:inline">Filtres</span>
            </Button>

            {open && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                Filtrer par période
                            </h3>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="period" className="text-xs">Période</Label>
                            <Select value={period} onValueChange={(value) => setPeriod(value as FilterPeriod)}>
                                <SelectTrigger id="period" className="h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="jour">Par Jour</SelectItem>
                                    <SelectItem value="semaine">Par Semaine</SelectItem>
                                    <SelectItem value="mois">Par Mois</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="date" className="text-xs">{getPlaceholder()}</Label>
                            <Input
                                id="date"
                                type={getDateInputType()}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder={getPlaceholder()}
                                className="h-9"
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClear}
                                className="flex-1"
                            >
                                Effacer
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleApply}
                                disabled={!date}
                                className="flex-1"
                            >
                                Appliquer
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

