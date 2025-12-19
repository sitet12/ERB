import { useEntityModal } from '@/features/partager/hooks';
import type { ChargeVariable } from '@/features/chargesvariables/types/';

/**
 * Hook personnalisé pour la feature ChargeVariable
 * Utilise le hook générique useEntityModal pour éviter la duplication de code
 * 
 * @example
 * ```tsx
 * function ChargeVariableIndex() {
 *   const { open, mode, current, handleCreate, handleEdit, handleClose, handleView } = useChargeVariable();
 *   
 *   return (
 *     <>
 *       <CreateModal open={open && mode === 'create'} onClose={handleClose}>
 *         <ChargeVariableForm />
 *       </CreateModal>
 *       <EditModal open={open && mode === 'edit'} onClose={handleClose}>
 *         <ChargeVariableForm chargeVariable={current} />
 *       </EditModal>
 *       <ChargeVariableTable
 *         onView={handleView}
 *         onEdit={handleEdit}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useChargeVariable() {
    return useEntityModal<ChargeVariable>();
}

