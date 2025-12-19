/**
 * Helper functions pour la logique des statuts de revenu
 * Centralise la logique de style pour éviter la duplication
 */

/**
 * Retourne les classes CSS pour le badge de statut (pour les cartes avec gradient)
 * 
 * @param badgeColor - La couleur du badge ('green', 'red', ou autre)
 * @returns Les classes CSS pour le gradient du badge
 * 
 * @example
 * ```tsx
 * const statutColor = getStatutBadgeGradientClass(statut.badge_color);
 * <BaseCard badge={{ className: statutColor }} />
 * ```
 */
export function getStatutBadgeGradientClass(badgeColor?: string): string {
    switch (badgeColor) {
        case 'green':
            return 'bg-gradient-to-r from-green-500 to-emerald-600';
        case 'red':
            return 'bg-gradient-to-r from-red-500 to-rose-600';
        default:
            return 'bg-gradient-to-r from-gray-500 to-slate-600';
    }
}

/**
 * Retourne les classes CSS pour le badge de statut (pour les tableaux avec fond)
 * 
 * @param badgeColor - La couleur du badge ('green', 'red', ou autre)
 * @returns Les classes CSS pour le badge avec fond
 * 
 * @example
 * ```tsx
 * const statutColor = getStatutBadgeClass(statut.badge_color);
 * <span className={`px-2 py-1 rounded-full ${statutColor}`}>
 * ```
 */
export function getStatutBadgeClass(badgeColor?: string): string {
    switch (badgeColor) {
        case 'green':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'red':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
}

