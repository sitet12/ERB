<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class Benefice extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'benefice';

    /**
     * Pas de soft deletes pour les données calculées
     */

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'date',
        'total_revenus',
        'total_charges',
        'benefice',
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
            'total_revenus' => 'decimal:2',
            'total_charges' => 'decimal:2',
            'benefice' => 'decimal:2',
        ];
    }

    /**
     * Scope: Filtrer par date
     *
     * @param Builder<Benefice> $query
     * @param Carbon|string $date
     * @return Builder<Benefice>
     */
    public function scopeParDate(Builder $query, Carbon|string $date): Builder
    {
        $date = $date instanceof Carbon ? $date : Carbon::parse($date);
        return $query->whereDate('date', $date);
    }

    /**
     * Scope: Filtrer par période
     *
     * @param Builder<Benefice> $query
     * @param Carbon|string $dateDebut
     * @param Carbon|string $dateFin
     * @return Builder<Benefice>
     */
    public function scopeParPeriode(Builder $query, Carbon|string $dateDebut, Carbon|string $dateFin): Builder
    {
        $dateDebut = $dateDebut instanceof Carbon ? $dateDebut : Carbon::parse($dateDebut);
        $dateFin = $dateFin instanceof Carbon ? $dateFin : Carbon::parse($dateFin);
        
        return $query->whereBetween('date', [$dateDebut, $dateFin]);
    }

    /**
     * Accessor: Bénéfice formaté avec devise
     *
     * @return string
     */
    public function getBeneficeFormateAttribute(): string
    {
        return number_format($this->benefice ?? 0, 2, ',', ' ') . ' DH';
    }
}
