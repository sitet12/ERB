<?php

namespace App\Http\Concerns;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;

trait HandlesErrors
{
    /**
     * Exécute une action et gère les erreurs avec un message flash
     * 
     * @param callable $action Action à exécuter
     * @param string $successMessage Message de succès
     * @param string $errorMessage Message d'erreur
     * @param string $redirectRoute Route de redirection en cas de succès
     * @param array $redirectParams Paramètres pour la route de redirection
     * @return RedirectResponse
     */
    protected function handleAction(
        callable $action,
        string $successMessage,
        string $errorMessage,
        string $redirectRoute,
        array $redirectParams = []
    ): RedirectResponse {
        try {
            $action();
            
            return redirect()
                ->route($redirectRoute, $redirectParams)
                ->with('success', $successMessage);
        } catch (\Exception $e) {
            Log::error($errorMessage . ': ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect()
                ->back()
                ->withInput()
                ->with('error', $errorMessage);
        }
    }
}

