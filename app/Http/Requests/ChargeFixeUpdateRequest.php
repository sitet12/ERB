<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChargeFixeUpdateRequest extends FormRequest
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
            'charge_fixe_type_id' => ['required', 'integer', Rule::exists('charge_fixe_type', 'id')->whereNull('deleted_at')],
            'montant' => ['required', 'numeric', 'min:0', 'max:999999999.99'],
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
            'charge_fixe_type_id.required' => 'Le type de charge fixe est obligatoire.',
            'charge_fixe_type_id.exists' => 'Le type de charge fixe sélectionné n\'existe pas.',
            'montant.required' => 'Le montant est obligatoire.',
            'montant.numeric' => 'Le montant doit être un nombre.',
            'montant.min' => 'Le montant doit être positif.',
            'date.required' => 'La date est obligatoire.',
            'date.date' => 'La date doit être une date valide.',
        ];
    }
}

