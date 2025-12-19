import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground animate-in fade-in duration-300 pointer-events-none">
      {/* Background decoration (optional subtle glow) */}
      <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative flex flex-col items-center gap-6 z-10 pointer-events-auto">
        {/* Logo Icon with Pulse */}
        <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20 animate-pulse">
                <span className="text-4xl font-bold">E</span>
            </div>
             {/* Spinning ring around the logo */}
            <div className="absolute inset-[-10px] border-2 border-primary/30 border-t-primary rounded-2xl w-[calc(100%+20px)] h-[calc(100%+20px)] animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">EcoLaundry</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-medium">
                <Loader2 size={16} className="animate-spin" />
                <span>Chargement...</span>
            </div>
        </div>
      </div>
    </div>
  );
};