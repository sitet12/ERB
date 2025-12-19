import { useMemo, useCallback } from 'react';

/**
 * Generic hook for filtering items based on search query
 * @param items - Array of items to filter
 * @param searchQuery - Search query string
 * @param searchFn - Function that returns true if item matches search
 */
export function useSearchFilter<T>(
    items: T[],
    searchQuery: string,
    searchFn: (item: T, query: string) => boolean,
): T[] {
    const memoizedSearchFn = useCallback(searchFn, [searchFn]);
    
    return useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return items;
        return items.filter((item) => memoizedSearchFn(item, q));
    }, [items, searchQuery, memoizedSearchFn]);
}

