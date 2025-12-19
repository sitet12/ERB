import { useModalState } from '@/features/partager/hooks';
import type { Benefice } from '@/features/benefices/types/';

/**
 * Hook personnalisé pour la feature Benefice
 * Benefice est READ-ONLY (pas de create/edit/delete)
 * Seule la vue (view) est disponible
 * 
 * @example
 * ```tsx
 * function BeneficeIndex() {
 *   const { open, mode, current, handleView, handleClose } = useBenefice();
 *   
 *   return (
 *     <>
 *       <ViewModal open={open && mode === 'view'} onClose={handleClose}>
 *         <BeneficeView benefice={current} />
 *       </ViewModal>
 *       <BeneficeTable
 *         onView={handleView}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useBenefice() {
    // Gère l'état des modals (seulement view car read-only)
    const modalState = useModalState<Benefice>();

    return {
        // État des modals
        open: modalState.open,
        mode: modalState.mode,
        current: modalState.current,
        setOpen: modalState.setOpen,
        
        // Handlers (seulement view car read-only)
        handleView: modalState.handleView,
        handleClose: modalState.handleClose,
    };
}

