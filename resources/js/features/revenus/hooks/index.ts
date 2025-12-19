import { useEntityModal } from '@/features/partager/hooks';
import type { Revenu } from '@/features/revenus/types/';

/**
 * Hook personnalisé pour la feature Revenu
 * Utilise le hook générique useEntityModal pour éviter la duplication de code
 * 
 * @example
 * ```tsx
 * function RevenuIndex() {
 *   const { open, mode, current, handleCreate, handleEdit, handleClose, handleView } = useRevenu();
 *   
 *   return (
 *     <>
 *       <CreateModal open={open && mode === 'create'} onClose={handleClose}>
 *         <RevenuForm />
 *       </CreateModal>
 *       <EditModal open={open && mode === 'edit'} onClose={handleClose}>
 *         <RevenuForm revenu={current} />
 *       </EditModal>
 *       <RevenuTable
 *         onView={handleView}
 *         onEdit={handleEdit}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useRevenu() {
    return useEntityModal<Revenu>();
}

