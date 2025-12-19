import { useModalState } from '@/features/partager/hooks';
import type { ChargeVariableType } from '@/features/chargevariabletypes/types/';

/**
 * Hook personnalisé pour la feature ChargeVariableType
 * Combine la logique des modals et des handlers pour simplifier l'utilisation dans la page Index
 * 
 * @example
 * ```tsx
 * function ChargeVariableTypeIndex() {
 *   const { open, mode, current, handleCreate, handleEdit, handleClose, handleView } = useChargeVariableType();
 *   
 *   return (
 *     <>
 *       <CreateModal open={open && mode === 'create'} onClose={handleClose}>
 *         <ChargeVariableTypeForm />
 *       </CreateModal>
 *       <EditModal open={open && mode === 'edit'} onClose={handleClose}>
 *         <ChargeVariableTypeForm chargeVariableType={current} />
 *       </EditModal>
 *       <ChargeVariableTypeTable
 *         onView={handleView}
 *         onEdit={handleEdit}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useChargeVariableType() {
    // Gère l'état des modals (create/edit/view)
    const modalState = useModalState<ChargeVariableType>();

    return {
        // État des modals
        open: modalState.open,
        mode: modalState.mode,
        current: modalState.current,
        setOpen: modalState.setOpen,
        
        // Handlers
        handleCreate: modalState.handleCreate,
        handleEdit: modalState.handleEdit,
        handleView: modalState.handleView,
        handleClose: modalState.handleClose,
    };
}

