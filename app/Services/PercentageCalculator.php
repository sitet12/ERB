<?php

namespace App\Services;

/**
 * Service utilitaire pour calculer les pourcentages de changement
 * Centralise la logique de calcul pour éviter la duplication
 */
class PercentageCalculator
{
    /**
     * Calcule le pourcentage de changement entre deux valeurs
     * 
     * @param float $current Valeur actuelle
     * @param float $previous Valeur précédente
     * @return float|null Pourcentage de changement (null si previous = 0 et current = 0)
     */
    public static function calculate(float $current, float $previous): ?float
    {
        if ($previous == 0) {
            return $current > 0 ? 100 : null;
        }
        
        return (($current - $previous) / abs($previous)) * 100;
    }

    /**
     * Calcule le pourcentage de croissance (alias pour calculate)
     * 
     * @param float $current Valeur actuelle
     * @param float $previous Valeur précédente
     * @return float|null Pourcentage de croissance
     */
    public static function calculateGrowth(float $current, float $previous): ?float
    {
        return self::calculate($current, $previous);
    }
}

