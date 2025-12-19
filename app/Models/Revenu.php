<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class Revenu extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'revenus';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'client_id',
        'statut_id',
        'montant',
        'date',
        'note',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date' => 'date',
            'montant' => 'decimal:2',
        ];
    }

    /**
     * Relation: Un revenu appartient à un client
     *
     * @return BelongsTo<Client, Revenu>
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Relation: Un revenu appartient à un statut
     *
     * @return BelongsTo<Statut, Revenu>
     */
    public function statut(): BelongsTo
    {
        return $this->belongsTo(Statut::class);
    }

    /**
     * Scope: Filtrer les revenus payés
     *
     * @param Builder<Revenu> $query
     * @return Builder<Revenu>
     */
    public function scopePaye(Builder $query): Builder
    {
        return $query->whereHas('statut', fn (Builder $q) => $q->where('nom', 'Payé'));
    }

    /**
     * Scope: Filtrer les revenus impayés
     *
     * @param Builder<Revenu> $query
     * @return Builder<Revenu>
     */
    public function scopeImpaye(Builder $query): Builder
    {
        return $query->whereHas('statut', fn (Builder $q) => $q->where('nom', 'Impayé'));
    }

    /**
     * Scope: Filtrer par date
     *
     * @param Builder<Revenu> $query
     * @param Carbon|string $date
     * @return Builder<Revenu>
     */
    public function scopeParDate(Builder $query, Carbon|string $date): Builder
    {
        $date = $date instanceof Carbon ? $date : Carbon::parse($date);
        return $query->whereDate('date', $date);
    }

    /**
     * Scope: Filtrer par période
     *
     * @param Builder<Revenu> $query
     * @param Carbon|string $dateDebut
     * @param Carbon|string $dateFin
     * @return Builder<Revenu>
     */
    public function scopeParPeriode(Builder $query, Carbon|string $dateDebut, Carbon|string $dateFin): Builder
    {
        $dateDebut = $dateDebut instanceof Carbon ? $dateDebut : Carbon::parse($dateDebut);
        $dateFin = $dateFin instanceof Carbon ? $dateFin : Carbon::parse($dateFin);
        
        return $query->whereBetween('date', [$dateDebut, $dateFin]);
    }

    /**
     * Accessor: Montant formaté avec devise
     *
     * @return string
     */
    public function getMontantFormateAttribute(): string
    {
        return number_format($this->montant ?? 0, 2, ',', ' ') . ' DH';
    }
}
