<?php

namespace App\Http\Controllers;

use App\Http\Concerns\HandlesPagination;
use App\Http\Resources\BeneficeResource;
use App\Models\Benefice;
use App\Models\Revenu;
use App\Models\ChargeFixe;
use App\Models\ChargeVariable;
use App\Services\BeneficeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Carbon\Carbon;

class BeneficeController extends Controller
{
    use HandlesPagination;
    public function __construct(
        protected BeneficeService $beneficeService
    ) {
    }

    /**
     * Display a listing of the resource.
     * 
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {

        // Récupérer toutes les dates uniques qui ont des revenus payés ou des charges
        $datesRevenus = Revenu::paye()->distinct()->pluck('date')->map(fn ($date) => $date->format('Y-m-d'));
        $datesChargesFixes = ChargeFixe::distinct()->pluck('date')->map(fn ($date) => $date->format('Y-m-d'));
        $datesChargesVariables = ChargeVariable::distinct()->pluck('date')->map(fn ($date) => $date->format('Y-m-d'));
        
        $allDates = $datesRevenus->merge($datesChargesFixes)->merge($datesChargesVariables)->unique()->sort();

        // Calculer les bénéfices pour chaque date
        $benefices = collect();
        foreach ($allDates as $date) {
            $benefice = $this->beneficeService->calculerBeneficeDuJour($date);
            $benefices->push($benefice);
        }

        // Appliquer les filtres de date avec comparaison correcte
        // Filtre par date exacte (prioritaire sur date_debut/date_fin)
        if ($request->filled('filter_date')) {
            $filterDate = Carbon::parse($request->filter_date);
            $benefices = $benefices->filter(function ($benefice) use ($filterDate) {
                return Carbon::parse($benefice->date)->isSameDay($filterDate);
            });
        } else {
            // Filtre par date début
            if ($request->filled('date_debut')) {
                $dateDebut = Carbon::parse($request->date_debut);
                $benefices = $benefices->filter(function ($benefice) use ($dateDebut) {
                    return Carbon::parse($benefice->date)->greaterThanOrEqualTo($dateDebut);
                });
            }

            // Filtre par date fin
            if ($request->filled('date_fin')) {
                $dateFin = Carbon::parse($request->date_fin);
                $benefices = $benefices->filter(function ($benefice) use ($dateFin) {
                    return Carbon::parse($benefice->date)->lessThanOrEqualTo($dateFin);
                });
            }
        }

        // Trier par date décroissante
        $benefices = $benefices->sortByDesc('date')->values();

        // Ajouter la recherche par montant total (bénéfice) si fournie
        if ($request->has('search') && $request->search) {
            $search = trim($request->search);
            
            // Convertir la recherche en nombre si possible (pour recherche numérique)
            $searchNumeric = is_numeric($search) ? (float)$search : null;
            
            $benefices = $benefices->filter(function ($benefice) use ($search, $searchNumeric) {
                // Recherche par montant exact ou partiel
                if ($searchNumeric !== null) {
                    // Si c'est un nombre, chercher par montant exact ou proche
                    return abs($benefice->benefice - $searchNumeric) < 0.01 || 
                           stripos((string)$benefice->benefice, $search) !== false;
                }
                
                // Recherche textuelle dans le montant formaté
                $beneficeFormate = number_format($benefice->benefice, 2, ',', ' ');
                return stripos($beneficeFormate, $search) !== false ||
                       stripos((string)$benefice->benefice, $search) !== false;
            })->values();
        }

        // Pagination manuelle
        $perPage = $request->get('per_page', 15);
        $currentPage = $request->get('page', 1);
        $offset = ($currentPage - 1) * $perPage;
        $items = $benefices->slice($offset, $perPage)->values();
        
        $paginatedBenefices = new LengthAwarePaginator(
            $items,
            $benefices->count(),
            $perPage,
            $currentPage,
            [
                'path' => $request->url(),
                'query' => $request->query(),
            ]
        );

        return Inertia::render('benefices/Index', [
            'benefices' => $this->paginatedResource(BeneficeResource::class, $paginatedBenefices),
            'filters' => $request->only(['search', 'filter_date', 'date_debut', 'date_fin']),
        ]);
    }

    /**
     * Display the specified resource.
     * Retourne les données pour affichage dans une modal.
     * 
     * @param Benefice $benefice
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(Benefice $benefice)
    {
        return redirect()
            ->route('benefices.index')
            ->with('viewBenefice', new BeneficeResource($benefice));
    }
}

