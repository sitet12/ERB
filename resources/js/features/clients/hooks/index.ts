import { useEntityModal } from '@/features/partager/hooks';
import type { Client } from '@/features/clients/types/';

/**
 * Hook personnalisé pour la feature Client
 * Utilise le hook générique useEntityModal pour éviter la duplication de code
 * 
 * @example
 * ```tsx
 * function ClientIndex() {
 *   const { open, mode, current, handleCreate, handleEdit, handleClose, handleView } = useClient();
 *   
 *   return (
 *     <>
 *       <CreateModal open={open && mode === 'create'} onClose={handleClose}>
 *         <ClientForm />
 *       </CreateModal>
 *       <EditModal open={open && mode === 'edit'} onClose={handleClose}>
 *         <ClientForm client={current} />
 *       </EditModal>
 *       <ClientTable
 *         onView={handleView}
 *         onEdit={handleEdit}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useClient() {
    return useEntityModal<Client>();
}

