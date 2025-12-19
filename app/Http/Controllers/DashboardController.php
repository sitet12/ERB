<?php

namespace App\Http\Controllers;

use App\Services\SimpleDashboardService;
use App\Services\BeneficeChartService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected SimpleDashboardService $simpleDashboardService,
        protected BeneficeChartService $beneficeChartService
    ) {}

    /**
     * Affiche le dashboard
     */
    public function index(Request $request): Response
    {
        // Récupérer toutes les statistiques en une seule fois (optimisé)
        $stats = $this->simpleDashboardService->getAllDashboardStats();
        
        // Récupérer les données pour le graphique de bénéfice (optimisé - 6 requêtes max)
        $beneficeChart = $this->beneficeChartService->getBeneficeComparison();

        // Récupérer les données pour le graphique en camembert des revenus
        $revenusPieChart = $this->simpleDashboardService->getRevenusPieChartData();

        return Inertia::render('dashboard', [
            ...$stats,
            'beneficeChart' => $beneficeChart,
            'revenusPieChart' => $revenusPieChart,
        ]);
    }
}