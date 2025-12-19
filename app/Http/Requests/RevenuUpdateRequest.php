<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RevenuUpdateRequest extends FormRequest
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
            'client_id' => ['required', 'integer', Rule::exists('client', 'id')->whereNull('deleted_at')],
            'statut_id' => ['required', 'integer', Rule::exists('statut', 'id')->whereNull('deleted_at')],
            'montant' => ['required', 'numeric', 'min:1', 'max:99999'],
            'date' => ['required', 'date'],
            'note' => ['nullable', 'string'],
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
            'client_id.required' => 'Le client est obligatoire.',
            'client_id.exists' => 'Le client sélectionné n\'existe pas.',
            'statut_id.required' => 'Le statut est obligatoire.',
            'statut_id.exists' => 'Le statut sélectionné n\'existe pas.',
            'montant.required' => 'Le montant est obligatoire.',
            'montant.numeric' => 'Le montant doit être un nombre.',
            'montant.min' => 'Le montant doit être au moins 1.',
            'montant.max' => 'Le montant ne peut pas dépasser 99999.',
            'date.required' => 'La date est obligatoire.',
            'date.date' => 'La date doit être une date valide.',
        ];
    }
}

