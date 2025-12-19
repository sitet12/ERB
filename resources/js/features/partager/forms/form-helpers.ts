/**
 * Helper functions pour les formulaires
 * Centralise les textes et variantes répétés
 */

/**
 * Retourne le texte du bouton de soumission selon le mode (édition/création)
 */
export function getSubmitButtonText(isEditing: boolean): string {
    return isEditing ? 'Modifier' : 'Créer';
}

/**
 * Retourne la variante du bouton de soumission selon le mode (édition/création)
 */
export function getSubmitButtonVariant(isEditing: boolean): 'update' | 'create' {
    return isEditing ? 'update' : 'create';
}

