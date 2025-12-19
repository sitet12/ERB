import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

interface UseDateFilterOptions {
    /**
     * The route URL to filter (e.g., '/revenus', '/charges-fixes')
     */
    routeUrl: string;
    /**
     * The query parameter name for the date filter (default: 'filter_date')
     */
    paramName?: string;
    /**
     * Additional query parameters to preserve when filtering
     */
    preserveParams?: Record<string, string | number | undefined>;
}

/**
 * Centralized hook for date filtering
 * Manages date filter state and automatically triggers router.get() when date changes
 * 
 * @example
 * const { filterDate, onFilterDateChange } = useDateFilter({ routeUrl: '/revenus' });
 * 
 * <MainLayout
 *   filterDate={filterDate}
 *   onFilterDateChange={onFilterDateChange}
 * />
 */
export function useDateFilter({
    routeUrl,
    paramName = 'filter_date',
    preserveParams = {},
}: UseDateFilterOptions) {
    const page = usePage();
    
    // Get initial filter date from URL query params
    const initialFilterDate = 
        (page.url.includes('?') && new URLSearchParams(page.url.split('?')[1]).get(paramName)) || '';

    const [filterDate, setFilterDate] = useState<string>(initialFilterDate);

    // Sync with URL if it changes externally (e.g., browser back/forward)
    useEffect(() => {
        const urlParams = new URLSearchParams(page.url.split('?')[1] || '');
        const urlFilterDate = urlParams.get(paramName) || '';
        if (urlFilterDate !== filterDate) {
            setFilterDate(urlFilterDate);
        }
    }, [page.url, paramName, filterDate]);

    const onFilterDateChange = (date: string) => {
        setFilterDate(date);
        
        // Get all current URL params to preserve them
        const urlParams = new URLSearchParams(page.url.split('?')[1] || '');
        const params: Record<string, string | number | undefined> = {
            ...preserveParams,
        };
        
        // Preserve all existing URL params except the date param
        urlParams.forEach((value, key) => {
            if (key !== paramName && key !== 'filter_period' && key !== 'date_debut' && key !== 'date_fin') {
                params[key] = value;
            }
        });
        
        if (date) {
            params[paramName] = date;
        } else {
            // Remove param if date is empty
            delete params[paramName];
        }

        router.get(
            routeUrl,
            params,
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Function to clear the filter
    const clearFilter = () => {
        onFilterDateChange('');
    };

    return {
        filterDate,
        onFilterDateChange,
        clearFilter,
    };
}

