<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Statut extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'statut';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
    ];

    /**
     * Relation: Un statut peut avoir plusieurs revenus
     *
     * @return HasMany<Revenu>
     */
    public function revenus(): HasMany
    {
        return $this->hasMany(Revenu::class);
    }

    /**
     * Accessor: Retourne la couleur du badge selon le statut
     *
     * @return string
     */
    public function getBadgeColorAttribute(): string
    {
        return match ($this->nom) {
            'Payé' => 'green',
            'Impayé' => 'red',
            default => 'gray',
        };
    }
}
