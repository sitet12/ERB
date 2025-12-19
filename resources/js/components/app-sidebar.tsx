import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { index as chargeFixeTypesRoute } from '@/routes/charge-fixe-types';
import { index as chargeVariableTypesRoute } from '@/routes/charge-variable-types';
import { index as clientsRoute } from '@/routes/clients';
import { index as revenusRoute } from '@/routes/revenus';
import { index as chargesFixesRoute } from '@/routes/charges-fixes';
import { index as chargesVariablesRoute } from '@/routes/charges-variables';
import { index as beneficesRoute } from '@/routes/benefices';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Users,
    DollarSign,
    Receipt,
    TrendingDown,
    TrendingUp,
    Box,
    BarChart3,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
        icon: LayoutGrid,
    },
    {
        title: 'Clients',
        href: clientsRoute.url(),
        icon: Users,
    },
    {
        title: 'Revenus',
        href: revenusRoute.url(),
        icon: DollarSign,
    },
    {
        title: 'Charges Fixes',
        href: chargesFixesRoute.url(),
        icon: Receipt,
    },
    {
        title: 'Charges Variables',
        href: chargesVariablesRoute.url(),
        icon: TrendingDown,
    },
    
    {
        title: 'Bénéfices',
        href: beneficesRoute.url(),
        icon: BarChart3,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Types Charges Fixes',
        href: chargeFixeTypesRoute.url(),
        icon: Box,
    },
    {
        title: 'Types Charges Variables',
        href: chargeVariableTypesRoute.url(),
        icon: TrendingUp,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
