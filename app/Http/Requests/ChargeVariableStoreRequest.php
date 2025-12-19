<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChargeVariableStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Modifier selon votre système d'authentification
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'charge_variable_type_id' => ['required', 'integer', Rule::exists('charge_variable_type', 'id')->whereNull('deleted_at')],
            'prix_unitaire' => ['required', 'numeric', 'min:0', 'max:999999999.99'],
            'quantite' => ['required', 'numeric', 'min:0', 'max:999999999.99'],
            'date' => ['required', 'date'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'charge_variable_type_id.required' => 'Le type de charge variable est obligatoire.',
            'charge_variable_type_id.exists' => 'Le type de charge variable sélectionné n\'existe pas.',
            'prix_unitaire.required' => 'Le prix unitaire est obligatoire.',
            'prix_unitaire.numeric' => 'Le prix unitaire doit être un nombre.',
            'prix_unitaire.min' => 'Le prix unitaire doit être positif.',
            'quantite.required' => 'La quantité est obligatoire.',
            'quantite.numeric' => 'La quantité doit être un nombre.',
            'quantite.min' => 'La quantité doit être positive.',
            'date.required' => 'La date est obligatoire.',
            'date.date' => 'La date doit être une date valide.',
        ];
    }
}

