<?php

namespace App\Services;

use App\Models\Revenu;
use App\Models\ChargeFixe;
use App\Models\ChargeVariable;
use App\Models\Client;
use App\Models\Statut;
use Illuminate\Pagination\LengthAwarePaginator;

class SimpleDashboardService
{
    /**
     * Cache pour les statistiques calculées
     */
    private ?array $cachedStats = null;

    /**
     * Récupère toutes les statistiques du dashboard en une seule fois
     * Optimise les requêtes en évitant les appels multiples
     */
    public function getAllDashboardStats(): array
    {
        // Calculer tous les totaux en une seule fois
        $totalRevenus = Revenu::sum('montant');
        $totalChargesFixes = ChargeFixe::sum('montant');
        $totalChargesVariables = ChargeVariable::sum('total');
        $totalClients = Client::count();
        
        // Calculer le bénéfice
        $totalCharges = $totalChargesFixes + $totalChargesVariables;
        $totalBenefice = $totalRevenus - $totalCharges;
        
        // Calculer les pourcentages
        $margeBeneficiaire = $totalRevenus > 0 
            ? ($totalBenefice / $totalRevenus) * 100 
            : null;
        
        $pourcentageClients = min(($totalClients / 500) * 100, 100);
        $pourcentageRevenus = min(($totalRevenus / 100000) * 100, 100);
        
        $pourcentageChargesFixes = $totalRevenus > 0 
            ? ($totalChargesFixes / $totalRevenus) * 100 
            : null;
        
        $pourcentageChargesVariables = $totalRevenus > 0 
            ? ($totalChargesVariables / $totalRevenus) * 100 
            : null;
        
        $stats = [
            'totalBenefice' => $totalBenefice,
            'totalClients' => $totalClients,
            'totalRevenus' => $totalRevenus,
            'totalChargesFixes' => $totalChargesFixes,
            'totalChargesVariables' => $totalChargesVariables,
            'margeBeneficiaire' => $margeBeneficiaire,
            'pourcentageClients' => $pourcentageClients,
            'pourcentageRevenus' => $pourcentageRevenus,
            'pourcentageChargesFixes' => $pourcentageChargesFixes,
            'pourcentageChargesVariables' => $pourcentageChargesVariables,
        ];
        
        // Mettre en cache pour les méthodes individuelles
        $this->cachedStats = $stats;
        
        return $stats;
    }

    /**
     * Récupère les stats depuis le cache ou les calcule
     */
    private function getStats(): array
    {
        if ($this->cachedStats === null) {
            $this->getAllDashboardStats();
        }
        return $this->cachedStats;
    }

    /**
     * Calcule simplement le bénéfice total (tous les revenus - toutes les charges)
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getTotalBenefice(): float
    {
        return $this->getStats()['totalBenefice'];
    }

    /**
     * Calcule le pourcentage de marge bénéficiaire (bénéfice / revenus * 100)
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getMargeBeneficiaire(): ?float
    {
        return $this->getStats()['margeBeneficiaire'];
    }

    /**
     * Compte le nombre total de clients
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getTotalClients(): int
    {
        return $this->getStats()['totalClients'];
    }

    /**
     * Calcule le pourcentage de clients par rapport à l'objectif (500 clients max)
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getPourcentageClients(): float
    {
        return $this->getStats()['pourcentageClients'];
    }

    /**
     * Calcule le total des revenus (payés + impayés)
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getTotalRevenus(): float
    {
        return $this->getStats()['totalRevenus'];
    }

    /**
     * Calcule le pourcentage de revenus par rapport à l'objectif (100 000 DH max)
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getPourcentageRevenus(): float
    {
        return $this->getStats()['pourcentageRevenus'];
    }

    /**
     * Calcule le total des charges fixes
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getTotalChargesFixes(): float
    {
        return $this->getStats()['totalChargesFixes'];
    }

    /**
     * Calcule le pourcentage de charges fixes par rapport aux revenus
     * (charges fixes / revenus × 100)
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getPourcentageChargesFixes(): ?float
    {
        return $this->getStats()['pourcentageChargesFixes'];
    }

    /**
     * Calcule le total des charges variables
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getTotalChargesVariables(): float
    {
        return $this->getStats()['totalChargesVariables'];
    }

    /**
     * Calcule le pourcentage de charges variables par rapport aux revenus
     * (charges variables / revenus × 100)
     * Utilise le cache pour éviter les requêtes multiples
     */
    public function getPourcentageChargesVariables(): ?float
    {
        return $this->getStats()['pourcentageChargesVariables'];
    }

    /**
     * Récupère les données pour le graphique en camembert des revenus (payés/impayés)
     * Optimisé avec une seule requête groupée au lieu de 2 requêtes séparées
     */
    public function getRevenusPieChartData(): array
    {
        // Récupérer les IDs des statuts Payé et Impayé en une seule requête (optimisé)
        $statuts = Statut::whereIn('nom', ['Payé', 'Impayé'])->get()->keyBy('nom');
        
        $statutPayeId = $statuts->get('Payé')?->id;
        $statutImpayeId = $statuts->get('Impayé')?->id;

        // Si aucun statut n'existe, retourner des valeurs par défaut
        if (!$statutPayeId && !$statutImpayeId) {
            return [
                'paye' => 0.0,
                'impaye' => 0.0,
                'total' => 0.0,
            ];
        }

        // Construire la liste des IDs valides
        $statutIds = array_filter([$statutPayeId, $statutImpayeId], fn($id) => $id !== null);

        // Une seule requête avec groupBy pour optimiser (au lieu de 2 requêtes séparées)
        $results = Revenu::selectRaw('statut_id, SUM(montant) as total')
            ->whereIn('statut_id', $statutIds)
            ->groupBy('statut_id')
            ->pluck('total', 'statut_id');

        $revenusPayes = (float) ($results[$statutPayeId] ?? 0);
        $revenusImpayes = (float) ($results[$statutImpayeId] ?? 0);
        
        return [
            'paye' => $revenusPayes,
            'impaye' => $revenusImpayes,
            'total' => $revenusPayes + $revenusImpayes,
        ];
    }

}

