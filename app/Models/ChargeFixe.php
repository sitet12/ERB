<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class ChargeFixe extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'charge_fixe';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'charge_fixe_type_id',
        'montant',
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
            'montant' => 'decimal:2',
        ];
    }

    /**
     * Relation: Une charge fixe appartient à un type
     *
     * @return BelongsTo<ChargeFixeType, ChargeFixe>
     */
    public function chargeFixeType(): BelongsTo
    {
        return $this->belongsTo(ChargeFixeType::class);
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
