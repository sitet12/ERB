<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class ChargeVariable extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'charge_variable';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'charge_variable_type_id',
        'prix_unitaire',
        'quantite',
        'date',
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
            'prix_unitaire' => 'decimal:2',
            'quantite' => 'decimal:2',
            'total' => 'decimal:2',
        ];
    }

    /**
     * Boot method: Calculer le total automatiquement avant de sauvegarder
     */
    protected static function boot(): void
    {
        parent::boot();

        static::saving(function (ChargeVariable $chargeVariable) {
            if (!is_null($chargeVariable->prix_unitaire) && !is_null($chargeVariable->quantite)) {
                $chargeVariable->total = $chargeVariable->prix_unitaire * $chargeVariable->quantite;
            }
        });
    }

    /**
     * Relation: Une charge variable appartient à un type
     *
     * @return BelongsTo<ChargeVariableType, ChargeVariable>
     */
    public function chargeVariableType(): BelongsTo
    {
        return $this->belongsTo(ChargeVariableType::class);
    }

    /**
     * Accessor: Prix unitaire formaté avec devise
     *
     * @return string
     */
    public function getPrixUnitaireFormateAttribute(): string
    {
        return number_format($this->prix_unitaire ?? 0, 2, ',', ' ') . ' DH';
    }

    /**
     * Accessor: Total formaté avec devise
     *
     * @return string
     */
    public function getTotalFormateAttribute(): string
    {
        return number_format($this->total ?? 0, 2, ',', ' ') . ' DH';
    }
}
