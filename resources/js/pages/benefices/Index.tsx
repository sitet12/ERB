import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';
import { BeneficeTable } from '@/features/benefices/components/tables/BeneficeTable';
import { BeneficeCard } from '@/features/benefices/components/cards/BeneficeCard';
import { BeneficeView } from '@/features/benefices/components/views/BeneficeView';
import { CrudModal } from '@/features/partager/modals/crud-modal';
import { Pagination } from '@/features/partager/paginations/Pagination';
import { useBenefice } from '@/features/benefices/hooks';
import { useListData, useDateFilter, useSearchFilterInertia } from '@/features/partager/hooks';
import { MainLayout } from '@/features/partager/layouts/mainlayout';
import { adminBreadcrumbs } from '@/features/partager/lib/adminBreadcrumbs';
import type { Benefice } from '@/features/benefices/types/';
import type { Paginated } from '@/types';

interface Props {
    benefices: Paginated<Benefice>;
}

type ViewMode = 'cards' | 'list';

export default function BeneficesIndex({ benefices }: Props) {
    const { open, mode, current, handleView, handleClose } = useBenefice();
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const { filterDate, onFilterDateChange, clearFilter } = useDateFilter({ routeUrl: '/benefices' });
    const { searchQuery, onSearchChange } = useSearchFilterInertia({ 
        routeUrl: '/benefices',
    });
    const beneficesList = useListData(benefices);

    return (
        <AppLayout breadcrumbs={adminBreadcrumbs.benefices.index()}>
            <Head title="Bénéfices" />

            <MainLayout
                header={{
                    title: "Bénéfices",
                    description: "Consultez vos bénéfices calculés automatiquement",
                    icon: <TrendingUp size={28} />,
                }}
                search={{
                    query: searchQuery,
                    onChange: onSearchChange,
                }}
                view={{
                    mode: viewMode,
                    onChange: setViewMode,
                }}
                filter={{
                    date: filterDate,
                    onDateChange: onFilterDateChange,
                    onClear: clearFilter,
                }}
                footer={{
                    totalCount: benefices.total,
                    label: "bénéfices",
                }}
            >
                {viewMode === 'list' ? (
                    <>
                        <BeneficeTable
                            benefices={benefices}
                            onView={handleView}
                        />
                        {/* Pagination centrée */}
                        {benefices.links && benefices.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={benefices.links} />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {beneficesList.map((benefice) => (
                                <BeneficeCard
                                    key={benefice.id}
                                    benefice={benefice}
                                    onView={() => handleView(benefice)}
                                />
                            ))}
                        </div>
                        {/* Pagination centrée */}
                        {benefices.links && benefices.links.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <Pagination links={benefices.links} />
                            </div>
                        )}
                    </>
                )}
            </MainLayout>

            {/* Modal View (read-only) */}
            <CrudModal
                open={open}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        handleClose();
                    }
                }}
                mode={mode}
                titleView="Détails du bénéfice"
            >
                {current && <BeneficeView benefice={current} />}
            </CrudModal>
        </AppLayout>
    );
}

