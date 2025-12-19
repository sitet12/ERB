<?php

namespace App\Http\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Carbon\Carbon;

/**
 * Trait pour centraliser la logique de filtrage par date
 * 
 * Supporte:
 * - filter_date: Date exacte (YYYY-MM-DD)
 * - date_debut / date_fin: Plage de dates
 * - filter_period: 'jour', 'semaine', 'mois', 'annee' (avec filter_date comme référence)
 * 
 * @example
 * class RevenuController extends Controller
 * {
 *     use FiltersByDate;
 *     
 *     public function index(Request $request)
 *     {
 *         $query = Revenu::query();
 *         $this->applyDateFilters($query, $request, 'date');
 *         return $query->paginate(15);
 *     }
 * }
 */
trait FiltersByDate
{
    /**
     * Applique les filtres de date à une requête Eloquent
     * 
     * @param Builder $query La requête Eloquent à filtrer
     * @param Request $request La requête HTTP
     * @param string $dateColumn Le nom de la colonne de date (par défaut: 'date')
     * @return void
     */
    protected function applyDateFilters(Builder $query, Request $request, string $dateColumn = 'date'): void
    {
        // Filtre par période (jour, semaine, mois, année)
        if ($request->filled('filter_period') && $request->filled('filter_date')) {
            $this->applyPeriodFilter($query, $request, $dateColumn);
            return;
        }

        // Filtre par date exacte (prioritaire sur date_debut/date_fin)
        if ($request->filled('filter_date')) {
            $query->whereDate($dateColumn, $request->filter_date);
            return;
        }

        // Filtre par date début
        if ($request->filled('date_debut')) {
            $query->whereDate($dateColumn, '>=', $request->date_debut);
        }

        // Filtre par date fin
        if ($request->filled('date_fin')) {
            $query->whereDate($dateColumn, '<=', $request->date_fin);
        }
    }

    /**
     * Applique un filtre par période (jour, semaine, mois, année)
     * 
     * @param Builder $query
     * @param Request $request
     * @param string $dateColumn
     * @return void
     */
    protected function applyPeriodFilter(Builder $query, Request $request, string $dateColumn): void
    {
        $period = $request->get('filter_period');
        $referenceDate = Carbon::parse($request->get('filter_date'));

        switch ($period) {
            case 'jour':
                // Filtre par jour exact
                $query->whereDate($dateColumn, $referenceDate->format('Y-m-d'));
                break;

            case 'semaine':
                // Filtre par semaine (du lundi au dimanche)
                $startOfWeek = $referenceDate->copy()->startOfWeek();
                $endOfWeek = $referenceDate->copy()->endOfWeek();
                $query->whereDate($dateColumn, '>=', $startOfWeek->format('Y-m-d'))
                      ->whereDate($dateColumn, '<=', $endOfWeek->format('Y-m-d'));
                break;

            case 'mois':
                // Filtre par mois
                $startOfMonth = $referenceDate->copy()->startOfMonth();
                $endOfMonth = $referenceDate->copy()->endOfMonth();
                $query->whereDate($dateColumn, '>=', $startOfMonth->format('Y-m-d'))
                      ->whereDate($dateColumn, '<=', $endOfMonth->format('Y-m-d'));
                break;

            case 'annee':
                // Filtre par année
                $startOfYear = $referenceDate->copy()->startOfYear();
                $endOfYear = $referenceDate->copy()->endOfYear();
                $query->whereDate($dateColumn, '>=', $startOfYear->format('Y-m-d'))
                      ->whereDate($dateColumn, '<=', $endOfYear->format('Y-m-d'));
                break;

            default:
                // Par défaut, filtre par date exacte
                $query->whereDate($dateColumn, $referenceDate->format('Y-m-d'));
                break;
        }
    }

    /**
     * Récupère les paramètres de filtre de date pour les passer à la vue
     * 
     * @param Request $request
     * @return array
     */
    protected function getDateFilterParams(Request $request): array
    {
        return $request->only([
            'filter_date',
            'filter_period',
            'date_debut',
            'date_fin'
        ]);
    }
}

