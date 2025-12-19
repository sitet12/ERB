<?php

namespace App\Http\Controllers;

use App\Http\Concerns\FiltersByDate;
use App\Http\Concerns\HandlesErrors;
use App\Http\Concerns\HandlesPagination;
use App\Http\Requests\ClientStoreRequest;
use App\Http\Requests\ClientUpdateRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    use FiltersByDate;
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
        $query = Client::query();

        // Filtre par nom si fourni
        if ($request->has('search') && $request->search) {
            $query->parNom($request->search);
        }

        // Filtre par téléphone si fourni
        if ($request->has('telephone') && $request->telephone) {
            $query->parTelephone($request->telephone);
        }

        // Appliquer les filtres de date (utilise le trait FiltersByDate)
        // Filtrer par created_at (date de création du client)
        $this->applyDateFilters($query, $request, 'created_at');

        // Pagination avec 15 éléments par page
        $clients = $query->latest()
            ->paginate($request->get('per_page', 15))
            ->withQueryString();

        return Inertia::render('clients/Index', [
            'clients' => $this->paginatedResource(ClientResource::class, $clients),
            'filters' => array_merge(
                $request->only(['search', 'telephone']),
                $this->getDateFilterParams($request)
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param ClientStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ClientStoreRequest $request)
    {
        return $this->handleAction(
            fn() => Client::create($request->validated()),
            'Client créé avec succès.',
            'Impossible de créer le client. Veuillez réessayer.',
            'clients.index'
        );
    }

    /**
     * Display the specified resource.
     * Retourne les données pour affichage dans une modal.
     * 
     * @param Client $client
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(Client $client)
    {
        return redirect()
            ->route('clients.index')
            ->with('viewClient', new ClientResource($client->load('revenus')));
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param ClientUpdateRequest $request
     * @param Client $client
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ClientUpdateRequest $request, Client $client)
    {
        return $this->handleAction(
            fn() => $client->update($request->validated()),
            'Client modifié avec succès.',
            'Impossible de modifier le client. Veuillez réessayer.',
            'clients.index'
        );
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param Client $client
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Client $client)
    {
        return $this->handleAction(
            fn() => $client->delete(),
            'Client supprimé avec succès.',
            'Impossible de supprimer le client. Veuillez réessayer.',
            'clients.index'
        );
    }
}

