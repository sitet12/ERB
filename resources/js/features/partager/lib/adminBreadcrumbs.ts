import * as chargeFixeTypesRoute from '@/routes/charge-fixe-types';
import * as chargeVariableTypesRoute from '@/routes/charge-variable-types';
import * as chargesFixesRoute from '@/routes/charges-fixes';
import * as chargesVariablesRoute from '@/routes/charges-variables';
import * as clientsRoute from '@/routes/clients';
import * as revenusRoute from '@/routes/revenus';
import * as beneficesRoute from '@/routes/benefices';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const toArticleId = (article: number | { id: number }): number =>
    typeof article === 'number' ? article : article.id;

export const adminBreadcrumbs = {
    
    chargeFixeTypes: {
        index(): BreadcrumbItem[] {
            return [
                {
                    title: 'Types de Charges Fixes',
                    href: chargeFixeTypesRoute.index().url,
                },
            ];
        },
    },
    
    chargeVariableTypes: {
        index(): BreadcrumbItem[] {
            return [
                {
                    title: 'Types de Charges Variables',
                    href: chargeVariableTypesRoute.index().url,
                },
            ];
        },
    },
    
    chargesFixes: {
        index(): BreadcrumbItem[] {
            return [
                {
                    title: 'Charges Fixes',
                    href: chargesFixesRoute.index().url,
                },
            ];
        },
    },
    
    chargesVariables: {
        index(): BreadcrumbItem[] {
            return [
                {
                    title: 'Charges Variables',
                    href: chargesVariablesRoute.index().url,
                },
            ];
        },
    },
    
    clients: {
        index(): BreadcrumbItem[] {
            return [
                {
                    title: 'Clients',
                    href: clientsRoute.index().url,
                },
            ];
        },
    },
    
    revenus: {
        index(): BreadcrumbItem[] {
            return [
                {
                    title: 'Revenus',
                    href: revenusRoute.index().url,
                },
            ];
        },
    },
    
    benefices: {
        index(): BreadcrumbItem[] {
            return [
                {
                    title: 'Bénéfices',
                    href: beneficesRoute.index().url,
                },
            ];
        },
    },
    dashboard: {
        index(): BreadcrumbItem[] {
            return [
                {
                    title: 'Dashboard',
                    href: dashboard().url,
                },
            ];
        },
    },
};

