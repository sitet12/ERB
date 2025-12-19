<?php

namespace App\Http\Controllers;

use App\Http\Requests\RevenuStoreRequest;
use App\Http\Requests\RevenuUpdateRequest;
use App\Http\Resources\ClientResource;
use App\Http\Resources\RevenuResource;
use App\Models\Client;
use App\Models\Revenu;
use App\Models\Statut;
use App\Http\Concerns\FiltersByDate;
use App\Http\Concerns\HandlesErrors;
use App\Http\Concerns\HandlesPagination;
use App\Http\Concerns\RecalculatesBenefice;
use App\Services\BeneficeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RevenuController extends Controller
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
        $query = Revenu::with(['client', 'statut']);

        // Filtre par recherche (nom du client ou note)
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('client', function ($clientQuery) use ($search) {
                    $clientQuery->where('nom', 'like', '%' . $search . '%')
                        ->orWhere('prenom', 'like', '%' . $search . '%');
                })->orWhere('note', 'like', '%' . $search . '%');
            });
        }

        // Filtre par client si fourni
        if ($request->has('client_id') && $request->client_id) {
            $query->where('client_id', $request->client_id);
        }

        // Filtre par statut si fourni
        if ($request->has('statut_id') && $request->statut_id) {
            $query->where('statut_id', $request->statut_id);
        }

        // Appliquer les filtres de date (utilise le trait FiltersByDate)
        $this->applyDateFilters($query, $request, 'date');

        // Pagination avec 15 éléments par page
        $revenus = $query->latest('date')
            ->paginate($request->get('per_page', 10))
            ->onEachSide(2)
            ->withQueryString();

        // Charger tous les clients pour les filtres
        $clients = Client::orderBy('nom')->get();

        // Charger tous les statuts pour le formulaire
        $statuts = Statut::orderBy('nom')->get();

        return Inertia::render('revenus/Index', [
            'revenus' => $this->paginatedResource(RevenuResource::class, $revenus),
            'filters' => array_merge(
                $request->only(['search', 'client_id', 'statut_id']),
                $this->getDateFilterParams($request)
            ),
            'clients' => ClientResource::collection($clients)->resolve(),
            'statuts' => $statuts->map(fn ($statut) => [
                'id' => $statut->id,
                'nom' => $statut->nom,
                'badge_color' => $statut->badge_color,
            ])->toArray(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param RevenuStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(RevenuStoreRequest $request)
    {
        return $this->handleAction(
            function () use ($request) {
                $data = $request->validated();

                // Transaction : soit client + revenu sont créés, soit rien n'est créé
                $revenu = DB::transaction(function () use ($data) {
                    // Déterminer le client à utiliser (existant ou nouveau)
                    if ($data['client_mode'] === 'new') {
                        $client = Client::create([
                            'nom' => $data['new_client_nom'],
                            'prenom' => $data['new_client_prenom'],
                            'telephone' => $data['new_client_telephone'] ?? null,
                        ]);
                        $clientId = $client->id;
                    } else {
                        $clientId = $data['client_id'];
                    }

                    return Revenu::create([
                        'client_id' => $clientId,
                        'statut_id' => $data['statut_id'],
                        'montant' => $data['montant'],
                        'date' => $data['date'],
                        'note' => $data['note'] ?? null,
                    ]);
                });

                // Recalculer le bénéfice pour la date du revenu
                if ($revenu->date) {
                    $this->beneficeService->calculerBeneficeDuJour($revenu->date);
                }
            },
            'Revenu créé avec succès.',
            'Impossible de créer le revenu. Veuillez réessayer.',
            'revenus.index'
        );
    }

    /**
     * Display the specified resource.
     * Retourne les données pour affichage dans une modal.
     * 
     * @param Revenu $revenu
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(Revenu $revenu)
    {
        return redirect()
            ->route('revenus.index')
            ->with('viewRevenu', new RevenuResource($revenu->load(['client', 'statut'])));
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param RevenuUpdateRequest $request
     * @param Revenu $revenu
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(RevenuUpdateRequest $request, Revenu $revenu)
    {
        return $this->handleAction(
            fn() => $this->recalculateBeneficeOnUpdate($revenu, $request->validated()),
            'Revenu modifié avec succès.',
            'Impossible de modifier le revenu. Veuillez réessayer.',
            'revenus.index'
        );
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param Revenu $revenu
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Revenu $revenu)
    {
        return $this->handleAction(
            function () use ($revenu) {
                $this->recalculateBeneficeOnDelete($revenu);
                $revenu->delete();
            },
            'Revenu supprimé avec succès.',
            'Impossible de supprimer le revenu. Veuillez réessayer.',
            'revenus.index'
        );
    }
}

