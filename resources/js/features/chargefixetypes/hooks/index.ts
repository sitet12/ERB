import { useModalState } from '@/features/partager/hooks';
import type { ChargeFixeType } from '@/features/chargefixetypes/types/';

/**
 * Hook personnalisé pour la feature ChargeFixeType
 * Combine la logique des modals et des handlers pour simplifier l'utilisation dans la page Index
 * 
 * @example
 * ```tsx
 * function ChargeFixeTypeIndex() {
 *   const { open, mode, current, handleCreate, handleEdit, handleClose, handleView } = useChargeFixeType();
 *   
 *   return (
 *     <>
 *       <CreateModal open={open && mode === 'create'} onClose={handleClose}>
 *         <ChargeFixeTypeForm />
 *       </CreateModal>
 *       <EditModal open={open && mode === 'edit'} onClose={handleClose}>
 *         <ChargeFixeTypeForm chargeFixeType={current} />
 *       </EditModal>
 *       <ChargeFixeTypeTable
 *         onView={handleView}
 *         onEdit={handleEdit}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useChargeFixeType() {
    // Gère l'état des modals (create/edit/view)
    const modalState = useModalState<ChargeFixeType>();

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

