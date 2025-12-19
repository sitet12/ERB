import { useEntityModal } from '@/features/partager/hooks';
import type { ChargeFixe } from '@/features/chargesfixes/types/';

/**
 * Hook personnalisé pour la feature ChargeFixe
 * Utilise le hook générique useEntityModal pour éviter la duplication de code
 * 
 * @example
 * ```tsx
 * function ChargeFixeIndex() {
 *   const { open, mode, current, handleCreate, handleEdit, handleClose, handleView } = useChargeFixe();
 *   
 *   return (
 *     <>
 *       <CreateModal open={open && mode === 'create'} onClose={handleClose}>
 *         <ChargeFixeForm />
 *       </CreateModal>
 *       <EditModal open={open && mode === 'edit'} onClose={handleClose}>
 *         <ChargeFixeForm chargeFixe={current} />
 *       </EditModal>
 *       <ChargeFixeTable
 *         onView={handleView}
 *         onEdit={handleEdit}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useChargeFixe() {
    return useEntityModal<ChargeFixe>();
}

