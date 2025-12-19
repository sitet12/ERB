<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RevenuStoreRequest extends FormRequest
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
            // Mode de sélection du client : existant ou nouveau
            'client_mode' => ['required', Rule::in(['exist', 'new'])],

            // Si client existant
            'client_id' => ['required_if:client_mode,exist', 'integer', Rule::exists('client', 'id')->whereNull('deleted_at')],

            // Si nouveau client (créé dans le même formulaire)
            'new_client_nom' => ['required_if:client_mode,new', 'string', 'max:20'],
            'new_client_prenom' => ['required_if:client_mode,new', 'string', 'max:20'],
            'new_client_telephone' => ['nullable', 'string', 'regex:/^[0-9]+$/', 'max:20'],

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
            'client_mode.required' => 'Le mode de sélection du client est obligatoire.',
            'client_mode.in' => 'Le mode de sélection du client est invalide.',

            'client_id.required' => 'Le client est obligatoire.',
            'client_id.exists' => 'Le client sélectionné n\'existe pas.',
            'client_id.required_if' => 'Veuillez sélectionner un client existant.',

            'new_client_nom.required_if' => 'Le nom du nouveau client est obligatoire.',
            'new_client_nom.max' => 'Le nom du nouveau client ne peut pas dépasser 20 caractères.',
            'new_client_prenom.required_if' => 'Le prénom du nouveau client est obligatoire.',
            'new_client_prenom.max' => 'Le prénom du nouveau client ne peut pas dépasser 20 caractères.',
            'new_client_telephone.regex' => 'Le téléphone doit contenir uniquement des chiffres.',
            'new_client_telephone.max' => 'Le téléphone ne peut pas dépasser 20 caractères.',

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

