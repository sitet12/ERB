<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChargeVariableResource extends JsonResource
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
            'charge_variable_type_id' => $this->charge_variable_type_id,
            'prix_unitaire' => $this->prix_unitaire,
            'prix_unitaire_formate' => $this->prix_unitaire_formate,
            'quantite' => $this->quantite,
            'total' => $this->total,
            'total_formate' => $this->total_formate,
            'date' => $this->date?->format('Y-m-d'),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            // Relations chargées si présentes
            'charge_variable_type' => $this->whenLoaded('chargeVariableType', fn () => [
                'id' => $this->chargeVariableType->id,
                'nom' => $this->chargeVariableType->nom,
            ]),
        ];
    }
}

