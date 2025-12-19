import * as React from 'react';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
    value?: string; // YYYY-MM-DD format
    onChange: (value: string) => void; // Returns YYYY-MM-DD format
    placeholder?: string;
    className?: string;
    buttonClassName?: string;
    disabled?: boolean;
    required?: boolean;
    'aria-invalid'?: boolean;
}

/**
 * Date picker component using Calendar + Popover.
 * Returns date in YYYY-MM-DD format (compatible with HTML date input).
 */
export function DatePicker({
    value,
    onChange,
    placeholder = 'Sélectionner une date',
    className,
    buttonClassName,
    disabled = false,
    required = false,
    'aria-invalid': ariaInvalid,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false);

    // Convert string (YYYY-MM-DD) to Date object
    const date = value ? new Date(value + 'T00:00:00') : undefined;

    const handleSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            // Format as YYYY-MM-DD for form submission
            const formatted = format(selectedDate, 'yyyy-MM-dd');
            onChange(formatted);
            setOpen(false);
        } else {
            onChange('');
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        'w-full justify-between font-normal bg-background text-foreground border-input',
                        !date && 'text-muted-foreground',
                        buttonClassName,
                    )}
                    aria-invalid={ariaInvalid}
                    aria-required={required}
                >
                    {date ? date.toLocaleDateString() : placeholder}
                    <ChevronDownIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-auto overflow-hidden p-0', className)} align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={handleSelect}
                />
            </PopoverContent>
        </Popover>
    );
}

