<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RevenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'client_id' => $this->client_id,
            'statut_id' => $this->statut_id,
            'montant' => $this->montant,
            'montant_formate' => $this->montant_formate,
            'date' => $this->date?->format('Y-m-d'),
            'note' => $this->note,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            // Relations chargées si présentes
            'client' => $this->whenLoaded('client', fn () => [
                'id' => $this->client->id,
                'nom' => $this->client->nom,
                'prenom' => $this->client->prenom,
                'nom_complet' => $this->client->nom_complet,
            ]),
            'statut' => $this->whenLoaded('statut', fn () => [
                'id' => $this->statut->id,
                'nom' => $this->statut->nom,
                'badge_color' => $this->statut->badge_color,
            ]),
        ];
    }
}

