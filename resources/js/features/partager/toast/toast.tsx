import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Toast as ToastType } from '@/types';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-destructive" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const bgStyles = {
    success: "bg-card border-l-4 border-l-green-500",
    error: "bg-card border-l-4 border-l-destructive",
    info: "bg-card border-l-4 border-l-blue-500"
  };

  return (
    <div className={`${bgStyles[toast.variant]} border border-border flex items-start gap-3 p-4 rounded-lg shadow-lg animate-toast-in min-w-[320px] max-w-[420px] pointer-events-auto transition-all`}>
      <div className="flex-shrink-0 mt-0.5">
        {icons[toast.variant]}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-foreground">{toast.message}</h4>
        {toast.description && (
          <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>
        )}
      </div>
      <button 
        onClick={() => onRemove(toast.id)}
        className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-md hover:bg-secondary"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};