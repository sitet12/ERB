<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChargeFixeType extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'charge_fixe_type';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
    ];

    /**
     * Relation: Un type peut avoir plusieurs charges fixes
     *
     * @return HasMany<ChargeFixe>
     */
    public function chargesFixes(): HasMany
    {
        return $this->hasMany(ChargeFixe::class);
    }
}
