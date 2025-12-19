<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChargeFixeStoreRequest;
use App\Http\Requests\ChargeFixeUpdateRequest;
use App\Http\Resources\ChargeFixeResource;
use App\Http\Resources\ChargeFixeTypeResource;
use App\Http\Concerns\FiltersByDate;
use App\Http\Concerns\HandlesErrors;
use App\Http\Concerns\HandlesPagination;
use App\Http\Concerns\RecalculatesBenefice;
use App\Models\ChargeFixe;
use App\Models\ChargeFixeType;
use App\Services\BeneficeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChargeFixeController extends Controller
{
    use FiltersByDate;
    use HandlesErrors;
    use HandlesPagination;
    use RecalculatesBenefice;
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
        $query = ChargeFixe::with('chargeFixeType');

        // Filtre par recherche (nom du type)
        if ($request->has('search') && $request->search) {
            $query->whereHas('chargeFixeType', function ($typeQuery) use ($request) {
                $typeQuery->where('nom', 'like', '%' . $request->search . '%');
            });
        }

        // Filtre par type de charge fixe si fourni
        if ($request->has('charge_fixe_type_id') && $request->charge_fixe_type_id) {
            $query->where('charge_fixe_type_id', $request->charge_fixe_type_id);
        }

        // Appliquer les filtres de date (utilise le trait FiltersByDate)
        $this->applyDateFilters($query, $request, 'date');

        // Pagination avec 15 éléments par page
        $chargeFixes = $query->latest('date')
            ->paginate($request->get('per_page', 15))
            ->withQueryString();

        // Charger tous les types de charges fixes pour les filtres
        $chargeFixeTypes = ChargeFixeType::orderBy('nom')->get();

        return Inertia::render('charges-fixes/Index', [
            'chargeFixes' => $this->paginatedResource(ChargeFixeResource::class, $chargeFixes),
            'filters' => array_merge(
                $request->only(['search', 'charge_fixe_type_id']),
                $this->getDateFilterParams($request)
            ),
            'chargeFixeTypes' => ChargeFixeTypeResource::collection($chargeFixeTypes)->resolve(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param ChargeFixeStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ChargeFixeStoreRequest $request)
    {
        return $this->handleAction(
            function () use ($request) {
                $chargeFixe = ChargeFixe::create($request->validated());

                // Recalculer le bénéfice pour la date de la charge
                if ($chargeFixe->date) {
                    $this->beneficeService->calculerBeneficeDuJour($chargeFixe->date);
                }
            },
            'Charge fixe créée avec succès.',
            'Impossible de créer la charge fixe. Veuillez réessayer.',
            'charges-fixes.index'
        );
    }

    /**
     * Display the specified resource.
     * Retourne les données pour affichage dans une modal.
     * 
     * @param ChargeFixe $chargeFixe
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(ChargeFixe $chargeFixe)
    {
        return redirect()
            ->route('charges-fixes.index')
            ->with('viewChargeFixe', new ChargeFixeResource($chargeFixe->load('chargeFixeType')));
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param ChargeFixeUpdateRequest $request
     * @param ChargeFixe $chargeFixe
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ChargeFixeUpdateRequest $request, ChargeFixe $chargeFixe)
    {
        return $this->handleAction(
            fn() => $this->recalculateBeneficeOnUpdate($chargeFixe, $request->validated()),
            'Charge fixe modifiée avec succès.',
            'Impossible de modifier la charge fixe. Veuillez réessayer.',
            'charges-fixes.index'
        );
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param ChargeFixe $chargeFixe
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(ChargeFixe $chargeFixe)
    {
        return $this->handleAction(
            function () use ($chargeFixe) {
                $this->recalculateBeneficeOnDelete($chargeFixe);
                $chargeFixe->delete();
            },
            'Charge fixe supprimée avec succès.',
            'Impossible de supprimer la charge fixe. Veuillez réessayer.',
            'charges-fixes.index'
        );
    }
}

