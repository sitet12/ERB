import { useState } from 'react';

/**
 * Hook to manage modal state (open/close, mode, current item)
 * Supports create, edit, and view modes
 */
export function useModalState<T>() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'create' | 'edit' | 'view'>('create');
    const [current, setCurrent] = useState<T | null>(null);

    const handleCreate = () => {
        setMode('create');
        setCurrent(null);
        setOpen(true);
    };

    const handleEdit = (item: T) => {
        setMode('edit');
        setCurrent(item);
        setOpen(true);
    };

    const handleView = (item: T) => {
        setMode('view');
        setCurrent(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        mode,
        current,
        setOpen,
        handleCreate,
        handleEdit,
        handleView,
        handleClose,
    };
}

