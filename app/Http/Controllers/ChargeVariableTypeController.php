<?php

namespace App\Http\Controllers;

use App\Http\Concerns\HandlesErrors;
use App\Http\Concerns\HandlesPagination;
use App\Http\Requests\ChargeVariableTypeStoreRequest;
use App\Http\Requests\ChargeVariableTypeUpdateRequest;
use App\Http\Resources\ChargeVariableTypeResource;
use App\Models\ChargeVariableType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChargeVariableTypeController extends Controller
{
    use HandlesErrors;
    use HandlesPagination;
    /**
     * Display a listing of the resource.
     * 
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $query = ChargeVariableType::query();

        // Filtre par nom si fourni
        if ($request->has('search') && $request->search) {
            $query->where('nom', 'like', '%' . $request->search . '%');
        }

        // Pagination avec 15 éléments par page
        $chargeVariableTypes = $query->latest()
            ->paginate($request->get('per_page', 15))
            ->withQueryString();

        return Inertia::render('charge-variable-types/Index', [
            'chargeVariableTypes' => $this->paginatedResource(ChargeVariableTypeResource::class, $chargeVariableTypes),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param ChargeVariableTypeStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ChargeVariableTypeStoreRequest $request)
    {
        return $this->handleAction(
            fn() => ChargeVariableType::create($request->validated()),
            'Type de charge variable créé avec succès.',
            'Impossible de créer le type de charge variable. Veuillez réessayer.',
            'charge-variable-types.index'
        );
    }

    /**
     * Display the specified resource.
     * Retourne les données pour affichage dans une modal.
     * 
     * @param ChargeVariableType $chargeVariableType
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(ChargeVariableType $chargeVariableType)
    {
        return redirect()
            ->route('charge-variable-types.index')
            ->with('viewChargeVariableType', new ChargeVariableTypeResource($chargeVariableType));
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param ChargeVariableTypeUpdateRequest $request
     * @param ChargeVariableType $chargeVariableType
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ChargeVariableTypeUpdateRequest $request, ChargeVariableType $chargeVariableType)
    {
        return $this->handleAction(
            fn() => $chargeVariableType->update($request->validated()),
            'Type de charge variable modifié avec succès.',
            'Impossible de modifier le type de charge variable. Veuillez réessayer.',
            'charge-variable-types.index'
        );
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param ChargeVariableType $chargeVariableType
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(ChargeVariableType $chargeVariableType)
    {
        return $this->handleAction(
            fn() => $chargeVariableType->delete(),
            'Type de charge variable supprimé avec succès.',
            'Impossible de supprimer le type de charge variable. Veuillez réessayer.',
            'charge-variable-types.index'
        );
    }
}

