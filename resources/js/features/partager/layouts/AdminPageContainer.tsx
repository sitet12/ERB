import { ReactNode } from 'react';

interface AdminPageContainerProps {
    children: ReactNode;
}

export default function AdminPageContainer({ children }: AdminPageContainerProps) {
    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}