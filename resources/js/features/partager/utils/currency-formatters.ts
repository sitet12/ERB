/**
 * Utility functions for currency formatting
 * Centralized to avoid code duplication
 */

/**
 * Format a number as currency (DH) with 2 decimal places
 * @param value - The number to format
 * @returns Formatted string like "1 234,56 DH"
 */
export function formatCurrency(value: number | null | undefined): string {
    const numValue = value ?? 0;
    return `${numValue.toLocaleString('fr-FR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    })} DH`;
}

/**
 * Format a number with locale formatting (no currency symbol)
 * @param value - The number to format
 * @returns Formatted string like "1 234"
 */
export function formatNumber(value: number | null | undefined): string {
    return (value ?? 0).toLocaleString('fr-FR');
}

