<?php

namespace App\Http\Controllers;

use App\Http\Concerns\HandlesErrors;
use App\Http\Concerns\HandlesPagination;
use App\Http\Requests\ChargeFixeTypeStoreRequest;
use App\Http\Requests\ChargeFixeTypeUpdateRequest;
use App\Http\Resources\ChargeFixeTypeResource;
use App\Models\ChargeFixeType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChargeFixeTypeController extends Controller
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
        $query = ChargeFixeType::query();

        // Filtre par nom si fourni
        if ($request->has('search') && $request->search) {
            $query->where('nom', 'like', '%' . $request->search . '%');
        }

        // Pagination avec 15 éléments par page
        $chargeFixeTypes = $query->latest()
            ->paginate($request->get('per_page', 15))
            ->withQueryString();

        return Inertia::render('charge-fixe-types/Index', [
            'chargeFixeTypes' => $this->paginatedResource(ChargeFixeTypeResource::class, $chargeFixeTypes),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param ChargeFixeTypeStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ChargeFixeTypeStoreRequest $request)
    {
        return $this->handleAction(
            fn() => ChargeFixeType::create($request->validated()),
            'Type de charge fixe créé avec succès.',
            'Impossible de créer le type de charge fixe. Veuillez réessayer.',
            'charge-fixe-types.index'
        );
    }

    /**
     * Display the specified resource.
     * Retourne les données pour affichage dans une modal.
     * 
     * @param ChargeFixeType $chargeFixeType
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(ChargeFixeType $chargeFixeType)
    {
        return redirect()
            ->route('charge-fixe-types.index')
            ->with('viewChargeFixeType', new ChargeFixeTypeResource($chargeFixeType));
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param ChargeFixeTypeUpdateRequest $request
     * @param ChargeFixeType $chargeFixeType
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ChargeFixeTypeUpdateRequest $request, ChargeFixeType $chargeFixeType)
    {
        return $this->handleAction(
            fn() => $chargeFixeType->update($request->validated()),
            'Type de charge fixe modifié avec succès.',
            'Impossible de modifier le type de charge fixe. Veuillez réessayer.',
            'charge-fixe-types.index'
        );
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param ChargeFixeType $chargeFixeType
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(ChargeFixeType $chargeFixeType)
    {
        return $this->handleAction(
            fn() => $chargeFixeType->delete(),
            'Type de charge fixe supprimé avec succès.',
            'Impossible de supprimer le type de charge fixe. Veuillez réessayer.',
            'charge-fixe-types.index'
        );
    }
}
