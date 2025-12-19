import { useMemo } from 'react';
import { type Paginated } from '@/types';

/**
 * Hook to extract data array from Paginated response
 * Used in all index pages to normalize paginated data
 */
export function useListData<T>(paginatedData: Paginated<T> | undefined): T[] {
    return useMemo(() => paginatedData?.data ?? [], [paginatedData]);
}

