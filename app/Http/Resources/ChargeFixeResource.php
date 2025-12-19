<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChargeFixeResource extends JsonResource
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
            'charge_fixe_type_id' => $this->charge_fixe_type_id,
            'montant' => $this->montant,
            'montant_formate' => $this->montant_formate,
            'date' => $this->date?->format('Y-m-d'),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            // Relations chargées si présentes
            'charge_fixe_type' => $this->whenLoaded('chargeFixeType', fn () => [
                'id' => $this->chargeFixeType->id,
                'nom' => $this->chargeFixeType->nom,
            ]),
        ];
    }
}

