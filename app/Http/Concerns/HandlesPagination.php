<?php

namespace App\Http\Concerns;

use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Trait pour centraliser la logique de pagination avec Resources
 * 
 * Formate les données paginées pour Inertia.js avec les métadonnées complètes
 * 
 * @example
 * class ClientController extends Controller
 * {
 *     use HandlesPagination;
 *     
 *     public function index(Request $request)
 *     {
 *         $clients = Client::query()->paginate(15);
 *         return Inertia::render('clients/Index', [
 *             'clients' => $this->paginatedResource(ClientResource::class, $clients),
 *         ]);
 *     }
 * }
 */
trait HandlesPagination
{
    /**
     * Formate une pagination avec un Resource pour Inertia
     * 
     * @param string $resourceClass La classe Resource à utiliser
     * @param LengthAwarePaginator $paginator L'objet paginé
     * @return array
     */
    protected function paginatedResource(string $resourceClass, LengthAwarePaginator $paginator): array
    {
        return [
            'data' => $resourceClass::collection($paginator->items())->resolve(),
            'links' => $paginator->linkCollection()->toArray(),
            'current_page' => $paginator->currentPage(),
            'last_page' => $paginator->lastPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
        ];
    }
}

