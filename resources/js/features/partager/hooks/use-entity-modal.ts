import { useModalState } from './use-modal-state';

/**
 * Hook générique pour gérer les modals d'entités (create/edit/view)
 * Remplace les hooks spécifiques dupliqués (useClient, useRevenu, etc.)
 * 
 * @example
 * ```tsx
 * function EntityIndex() {
 *   const { open, mode, current, handleCreate, handleEdit, handleClose, handleView } = useEntityModal<Entity>();
 *   
 *   return (
 *     <>
 *       <CreateModal open={open && mode === 'create'} onClose={handleClose}>
 *         <EntityForm />
 *       </CreateModal>
 *       <EditModal open={open && mode === 'edit'} onClose={handleClose}>
 *         <EntityForm entity={current} />
 *       </EditModal>
 *       <EntityTable
 *         onView={handleView}
 *         onEdit={handleEdit}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useEntityModal<T>() {
    return useModalState<T>();
}

