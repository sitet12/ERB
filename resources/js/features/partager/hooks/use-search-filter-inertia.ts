import { useState, useEffect, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';
import { debounce } from '@/lib/utils';

interface UseSearchFilterInertiaOptions {
    /**
     * The route URL to search (e.g., '/clients', '/revenus')
     */
    routeUrl: string;
    /**
     * The query parameter name for search (default: 'search')
     */
    paramName?: string;
    /**
     * Debounce delay in milliseconds (default: 500)
     */
    debounceMs?: number;
    /**
     * Additional query parameters to preserve when searching
     */
    preserveParams?: Record<string, string | number | undefined>;
}

/**
 * Hook for search filtering with Inertia.js
 * Manages search state and automatically triggers router.get() with debounce
 * 
 * @example
 * const { searchQuery, onSearchChange } = useSearchFilterInertia({ 
 *   routeUrl: '/clients' 
 * });
 * 
 * <MainLayout
 *   searchQuery={searchQuery}
 *   onSearchChange={onSearchChange}
 * />
 */
export function useSearchFilterInertia({
    routeUrl,
    paramName = 'search',
    debounceMs = 500,
    preserveParams = {},
}: UseSearchFilterInertiaOptions) {
    const page = usePage();
    
    // Get initial search from URL query params
    const getSearchFromUrl = () => {
        const urlParams = new URLSearchParams(page.url.split('?')[1] || '');
        return urlParams.get(paramName) || '';
    };

    const [searchQuery, setSearchQuery] = useState<string>(getSearchFromUrl());

    // Sync with URL if it changes externally (e.g., browser back/forward)
    useEffect(() => {
        const urlSearch = getSearchFromUrl();
        if (urlSearch !== searchQuery) {
            setSearchQuery(urlSearch);
        }
    }, [page.url, paramName]);

    // Create debounced search function
    const debouncedSearchRef = useRef(
        debounce((query: string) => {
            // Get all current URL params to preserve them
            const urlParams = new URLSearchParams(page.url.split('?')[1] || '');
            const params: Record<string, string | number | undefined> = {
                ...preserveParams,
            };
            
            // Preserve all existing URL params except the search param
            urlParams.forEach((value, key) => {
                if (key !== paramName && key !== 'page') { // Don't preserve page when searching
                    params[key] = value;
                }
            });
            
            if (query.trim()) {
                params[paramName] = query.trim();
            } else {
                // Remove param if search is empty
                delete params[paramName];
            }

            router.get(
                routeUrl,
                params,
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true, // Replace history instead of pushing
                }
            );
        }, debounceMs)
    );

    const onSearchChange = (query: string) => {
        setSearchQuery(query);
        debouncedSearchRef.current(query);
    };

    return {
        searchQuery,
        onSearchChange,
    };
}

