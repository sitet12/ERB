/**
 * Utility function to format date for HTML date input (YYYY-MM-DD)
 * Used for date inputs (not datetime-local)
 */
export function formatDateForInput(dateString: string | null | undefined): string | null {
    if (!dateString) return null;
    try {
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) return null;
        return dateObj.toISOString().split('T')[0];
    } catch {
        return null;
    }
}

/**
 * Format date for display (DD/MM/YYYY)
 */
export function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return '—';
    try {
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) return '—';
        return dateObj.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    } catch {
        return '—';
    }
}

/**
 * Date format options constants to avoid duplication
 */
export const DATE_FORMAT_SHORT: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
};

export const DATE_FORMAT_LONG: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export const DATE_FORMAT_WITH_TIME: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
};

/**
 * Helper functions using formatDateTime from data-table
 * These simplify common date formatting patterns
 */
import { formatDateTime as formatDateTimeBase } from '@/features/partager/data-table';

/**
 * Format date short (DD/MM/YYYY) using formatDateTime
 */
export function formatDateShort(value: string | number | Date | null | undefined): string {
    return formatDateTimeBase(value, DATE_FORMAT_SHORT, 'fr-FR');
}

/**
 * Format date long (e.g., "15 janvier 2024") using formatDateTime
 */
export function formatDateLong(value: string | number | Date | null | undefined): string {
    return formatDateTimeBase(value, DATE_FORMAT_LONG, 'fr-FR');
}

/**
 * Format date with time (DD/MM/YYYY HH:MM) using formatDateTime
 */
export function formatDateWithTime(value: string | number | Date | null | undefined): string {
    return formatDateTimeBase(value, DATE_FORMAT_WITH_TIME, 'fr-FR');
}

