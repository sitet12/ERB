import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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

export type FilterPeriod = 'jour' | 'semaine' | 'mois';

interface DateFilterModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApply: (period: FilterPeriod, date: string) => void;
    onClear: () => void;
    title?: string;
}

export function DateFilterModal({
    open,
    onOpenChange,
    onApply,
    onClear,
    title = 'Filtrer par date',
}: DateFilterModalProps) {
    const [period, setPeriod] = useState<FilterPeriod>('jour');
    const [date, setDate] = useState<string>('');

    // Reset when modal opens
    useEffect(() => {
        if (open) {
            setPeriod('jour');
            setDate('');
        }
    }, [open]);

    const handleApply = () => {
        if (date) {
            onApply(period, date);
            onOpenChange(false);
        }
    };

    const handleClear = () => {
        setPeriod('jour');
        setDate('');
        onClear();
        onOpenChange(false);
    };

    const getDateInputType = () => {
        switch (period) {
            case 'jour':
                return 'date';
            case 'semaine':
                return 'week'; // HTML5 week input
            case 'mois':
                return 'month'; // HTML5 month input
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Filtrer les charges fixes par période
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="period">Période</Label>
                        <Select value={period} onValueChange={(value) => setPeriod(value as FilterPeriod)}>
                            <SelectTrigger id="period">
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
                        <Label htmlFor="date">{getPlaceholder()}</Label>
                        <Input
                            id="date"
                            type={getDateInputType()}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder={getPlaceholder()}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={handleClear}>
                        Effacer
                    </Button>
                    <Button onClick={handleApply} disabled={!date}>
                        Appliquer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

