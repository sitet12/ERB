/**
 * Helper functions pour la logique des bénéfices
 * Centralise la logique de calcul et de style pour éviter la duplication
 */

/**
 * Vérifie si un bénéfice est positif (>= 0)
 * 
 * @param benefice - Le montant du bénéfice
 * @returns true si le bénéfice est positif ou nul, false sinon
 * 
 * @example
 * ```tsx
 * const isPositive = isBeneficePositive(benefice.benefice);
 * ```
 */
export function isBeneficePositive(benefice: number): boolean {
    return benefice >= 0;
}

/**
 * Retourne les classes CSS pour afficher un bénéfice selon qu'il soit positif ou négatif
 * 
 * Utilise les variables de thème pour le rouge (destructive) et garde le vert hardcodé
 * car il n'y a pas de variable "success" dans le thème actuel.
 * 
 * @param isPositive - Indique si le bénéfice est positif
 * @returns Les classes CSS pour le style du bénéfice
 * 
 * @example
 * ```tsx
 * const colorClass = getBeneficeColorClass(isPositive);
 * <span className={`font-bold ${colorClass}`}>
 * ```
 */
export function getBeneficeColorClass(isPositive: boolean): string {
    return isPositive 
        ? 'text-green-600 dark:text-green-400' // Couleur sémantique (succès) - pas d'équivalent dans le thème
        : 'text-destructive'; // Utilise la variable de thème pour l'erreur
}

