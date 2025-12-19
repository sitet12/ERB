<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Client extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'client';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'telephone',
    ];

    /**
     * Relation: Un client peut avoir plusieurs revenus
     *
     * @return HasMany<Revenu>
     */
    public function revenus(): HasMany
    {
        return $this->hasMany(Revenu::class);
    }

    /**
     * Scope: Filtrer par nom
     *
     * @param Builder<Client> $query
     * @param string $nom
     * @return Builder<Client>
     */
    public function scopeParNom(Builder $query, string $nom): Builder
    {
        return $query->where('nom', 'like', "%{$nom}%");
    }

    /**
     * Scope: Filtrer par téléphone
     *
     * @param Builder<Client> $query
     * @param string $telephone
     * @return Builder<Client>
     */
    public function scopeParTelephone(Builder $query, string $telephone): Builder
    {
        return $query->where('telephone', 'like', "%{$telephone}%");
    }

    /**
     * Mutator: Formater le téléphone
     *
     * @param string|null $value
     * @return void
     */
    protected function setTelephoneAttribute(?string $value): void
    {
        if ($value) {
            // Retirer tous les caractères non numériques
            $this->attributes['telephone'] = preg_replace('/[^0-9]/', '', $value);
        } else {
            $this->attributes['telephone'] = null;
        }
    }

    /**
     * Accessor: Nom complet (nom + prénom)
     *
     * @return string
     */
    public function getNomCompletAttribute(): string
    {
        return trim(($this->nom ?? '') . ' ' . ($this->prenom ?? ''));
    }
}
