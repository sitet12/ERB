<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChargeVariableType extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'charge_variable_type';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
    ];

    /**
     * Relation: Un type peut avoir plusieurs charges variables
     *
     * @return HasMany<ChargeVariable>
     */
    public function chargesVariables(): HasMany
    {
        return $this->hasMany(ChargeVariable::class);
    }
}
