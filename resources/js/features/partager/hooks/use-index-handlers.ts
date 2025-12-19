import { router } from '@inertiajs/react';

interface UseIndexHandlersOptions<T> {
    baseRoute: string;
    getItemName?: (item: T) => string;
    requireConfirm?: boolean;
}

/**
 * Hook for common index page handlers (create, edit, delete)
 * Reduces duplication across index pages
 */
export function useIndexHandlers<T extends { id: number }>(
    options: UseIndexHandlersOptions<T>,
) {
    const { baseRoute, getItemName, requireConfirm = true } = options;

    const handleCreate = () => {
        router.visit(`${baseRoute}/create`);
    };

    const handleEdit = (item: T) => {
        router.visit(`${baseRoute}/${item.id}/edit`);
    };

    const handleDelete = (item: T) => {
        const itemName = getItemName ? getItemName(item) : 'cet élément';
        const message = `Êtes-vous sûr de vouloir supprimer ${itemName} ?`;

        if (!requireConfirm || confirm(message)) {
            router.delete(`${baseRoute}/${item.id}`);
        }
    };

    return {
        handleCreate,
        handleEdit,
        handleDelete,
    };
}

