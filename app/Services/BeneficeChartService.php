<?php

namespace App\Services;

use App\Models\Revenu;
use App\Models\ChargeFixe;
use App\Models\ChargeVariable;
use App\Services\PercentageCalculator;
use Carbon\Carbon;

class BeneficeChartService
{
    /**
     * Récupère les données de bénéfice pour le graphique
     * Retourne le mois actuel et le mois précédent avec revenus, charges et bénéfice
     * Optimisé pour éviter N+1 queries
     */
    public function getBeneficeComparison(): array
    {
        $now = Carbon::now();
        $currentMonth = $now->copy()->startOfMonth();
        $currentMonthEnd = $now->copy()->endOfMonth();
        
        $previousMonth = $now->copy()->subMonth()->startOfMonth();
        $previousMonthEnd = $now->copy()->subMonth()->endOfMonth();
        
        // Calculer les deux mois en une seule fois avec des requêtes optimisées
        $currentMonthData = $this->getMonthDataOptimized($currentMonth, $currentMonthEnd);
        $previousMonthData = $this->getMonthDataOptimized($previousMonth, $previousMonthEnd);
        
        // Calculer le pourcentage de croissance
        $growth = PercentageCalculator::calculateGrowth(
            $currentMonthData['benefice'],
            $previousMonthData['benefice']
        );
        
        return [
            'current_month' => [
                'month' => $currentMonth->format('Y-m'),
                'month_label' => $currentMonth->format('F Y'), // "December 2025"
                'revenus' => $currentMonthData['revenus'],
                'charges' => $currentMonthData['charges'],
                'benefice' => $currentMonthData['benefice'],
            ],
            'previous_month' => [
                'month' => $previousMonth->format('Y-m'),
                'month_label' => $previousMonth->format('F Y'), // "November 2025"
                'revenus' => $previousMonthData['revenus'],
                'charges' => $previousMonthData['charges'],
                'benefice' => $previousMonthData['benefice'],
            ],
            'growth' => $growth, // Pourcentage de croissance
        ];
    }
    
    /**
     * Calcule les données pour un mois donné avec requêtes optimisées
     * Utilise des requêtes directes pour éviter N+1
     */
    private function getMonthDataOptimized(Carbon $start, Carbon $end): array
    {
        $startDate = $start->format('Y-m-d');
        $endDate = $end->format('Y-m-d');
        
        // Utiliser des requêtes directes avec whereDate pour SQLite
        // Total revenus (payés + impayés) - 1 requête
        $revenus = Revenu::whereDate('date', '>=', $startDate)
            ->whereDate('date', '<=', $endDate)
            ->sum('montant');
        
        // Total charges fixes - 1 requête
        $chargesFixes = ChargeFixe::whereDate('date', '>=', $startDate)
            ->whereDate('date', '<=', $endDate)
            ->sum('montant');
        
        // Total charges variables - 1 requête
        $chargesVariables = ChargeVariable::whereDate('date', '>=', $startDate)
            ->whereDate('date', '<=', $endDate)
            ->sum('total');
        
        // Total charges
        $charges = $chargesFixes + $chargesVariables;
        
        // Bénéfice
        $benefice = $revenus - $charges;
        
        return [
            'revenus' => $revenus,
            'charges' => $charges,
            'benefice' => $benefice,
        ];
    }
    
}

