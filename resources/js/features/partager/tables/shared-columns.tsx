import type { DataTableColumn } from '@/features/partager/data-table';
import { formatDateShort } from '@/features/partager/utils/date-formatters';

/**
 * Colonne partagée pour afficher la date de création
 * Évite la duplication de code dans toutes les tables
 * 
 * @example
 * ```tsx
 * const columns: DataTableColumn<Entity>[] = [
 *   ...otherColumns,
 *   createCreatedAtColumn<Entity>(),
 * ];
 * ```
 */
export function createCreatedAtColumn<T extends { created_at: string | null }>(): DataTableColumn<T> {
    return {
        key: 'created_at',
        label: 'Créé le',
        render: (item) => (
            <span className="text-sm text-muted-foreground">
                {formatDateShort(item.created_at)}
            </span>
        ),
    };
}

