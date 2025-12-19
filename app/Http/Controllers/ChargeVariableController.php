<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChargeVariableStoreRequest;
use App\Http\Requests\ChargeVariableUpdateRequest;
use App\Http\Resources\ChargeVariableResource;
use App\Http\Resources\ChargeVariableTypeResource;
use App\Http\Concerns\FiltersByDate;
use App\Http\Concerns\HandlesErrors;
use App\Http\Concerns\HandlesPagination;
use App\Http\Concerns\RecalculatesBenefice;
use App\Models\ChargeVariable;
use App\Models\ChargeVariableType;
use App\Services\BeneficeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChargeVariableController extends Controller
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
        $query = ChargeVariable::with('chargeVariableType');

        // Filtre par recherche (nom du type)
        if ($request->has('search') && $request->search) {
            $query->whereHas('chargeVariableType', function ($typeQuery) use ($request) {
                $typeQuery->where('nom', 'like', '%' . $request->search . '%');
            });
        }

        // Filtre par type de charge variable si fourni
        if ($request->has('charge_variable_type_id') && $request->charge_variable_type_id) {
            $query->where('charge_variable_type_id', $request->charge_variable_type_id);
        }

        // Appliquer les filtres de date (utilise le trait FiltersByDate)
        $this->applyDateFilters($query, $request, 'date');

        // Pagination avec 15 éléments par page
        $chargeVariables = $query->latest('date')
            ->paginate($request->get('per_page', 15))
            ->withQueryString();

        // Charger tous les types de charges variables pour les filtres
        $chargeVariableTypes = ChargeVariableType::orderBy('nom')->get();

        return Inertia::render('charges-variables/Index', [
            'chargeVariables' => $this->paginatedResource(ChargeVariableResource::class, $chargeVariables),
            'filters' => array_merge(
                $request->only(['search', 'charge_variable_type_id']),
                $this->getDateFilterParams($request)
            ),
            'chargeVariableTypes' => ChargeVariableTypeResource::collection($chargeVariableTypes)->resolve(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param ChargeVariableStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ChargeVariableStoreRequest $request)
    {
        return $this->handleAction(
            function () use ($request) {
                $chargeVariable = ChargeVariable::create($request->validated());

                // Recalculer le bénéfice pour la date de la charge
                if ($chargeVariable->date) {
                    $this->beneficeService->calculerBeneficeDuJour($chargeVariable->date);
                }
            },
            'Charge variable créée avec succès.',
            'Impossible de créer la charge variable. Veuillez réessayer.',
            'charges-variables.index'
        );
    }

    /**
     * Display the specified resource.
     * Retourne les données pour affichage dans une modal.
     * 
     * @param ChargeVariable $chargeVariable
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(ChargeVariable $chargeVariable)
    {
        return redirect()
            ->route('charges-variables.index')
            ->with('viewChargeVariable', new ChargeVariableResource($chargeVariable->load('chargeVariableType')));
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param ChargeVariableUpdateRequest $request
     * @param ChargeVariable $chargeVariable
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ChargeVariableUpdateRequest $request, ChargeVariable $chargeVariable)
    {
        return $this->handleAction(
            fn() => $this->recalculateBeneficeOnUpdate($chargeVariable, $request->validated()),
            'Charge variable modifiée avec succès.',
            'Impossible de modifier la charge variable. Veuillez réessayer.',
            'charges-variables.index'
        );
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param ChargeVariable $chargeVariable
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(ChargeVariable $chargeVariable)
    {
        return $this->handleAction(
            function () use ($chargeVariable) {
                $this->recalculateBeneficeOnDelete($chargeVariable);
                $chargeVariable->delete();
            },
            'Charge variable supprimée avec succès.',
            'Impossible de supprimer la charge variable. Veuillez réessayer.',
            'charges-variables.index'
        );
    }
}

