<?php

namespace App\Http\Concerns;

use App\Services\BeneficeService;
use Illuminate\Database\Eloquent\Model;

/**
 * Trait pour centraliser la logique de recalcul de bénéfice après modification/suppression
 * Évite la duplication de code dans les controllers
 * 
 * @example
 * class RevenuController extends Controller
 * {
 *     use RecalculatesBenefice;
 *     
 *     public function update(Request $request, Revenu $revenu)
 *     {
 *         $this->recalculateBeneficeOnUpdate($revenu, $request->validated());
 *         return redirect()->route('revenus.index');
 *     }
 * }
 */
trait RecalculatesBenefice
{
    /**
     * Recalcule le bénéfice après une mise à jour
     * Gère automatiquement l'ancienne et la nouvelle date
     * 
     * @param Model $model Le modèle mis à jour (Revenu, ChargeFixe, ChargeVariable)
     * @param array $newData Les nouvelles données validées
     * @return void
     */
    protected function recalculateBeneficeOnUpdate(Model $model, array $newData): void
    {
        $oldDate = $model->getOriginal('date');
        $model->update($newData);
        $newDate = $model->date;

        $this->recalculateBeneficeForDates($oldDate, $newDate);
    }

    /**
     * Recalcule le bénéfice après une suppression
     * 
     * @param Model $model Le modèle supprimé
     * @return void
     */
    protected function recalculateBeneficeOnDelete(Model $model): void
    {
        $date = $model->date;
        if ($date) {
            $this->getBeneficeService()->calculerBeneficeDuJour($date);
        }
    }

    /**
     * Recalcule le bénéfice pour l'ancienne et la nouvelle date
     * 
     * @param mixed $oldDate Ancienne date (Carbon|string|null)
     * @param mixed $newDate Nouvelle date (Carbon|string|null)
     * @return void
     */
    protected function recalculateBeneficeForDates($oldDate, $newDate): void
    {
        $beneficeService = $this->getBeneficeService();

        // Recalculer pour l'ancienne date
        if ($oldDate) {
            $beneficeService->calculerBeneficeDuJour($oldDate);
        }

        // Recalculer pour la nouvelle date si elle a changé
        if ($newDate) {
            if (!$oldDate || $this->datesAreDifferent($oldDate, $newDate)) {
                $beneficeService->calculerBeneficeDuJour($newDate);
            }
        }
    }

    /**
     * Vérifie si deux dates sont différentes
     * 
     * @param mixed $date1 Première date
     * @param mixed $date2 Deuxième date
     * @return bool
     */
    protected function datesAreDifferent($date1, $date2): bool
    {
        if (!$date1 || !$date2) {
            return true;
        }

        $date1Formatted = $date1 instanceof \Carbon\Carbon 
            ? $date1->format('Y-m-d') 
            : \Carbon\Carbon::parse($date1)->format('Y-m-d');
        
        $date2Formatted = $date2 instanceof \Carbon\Carbon 
            ? $date2->format('Y-m-d') 
            : \Carbon\Carbon::parse($date2)->format('Y-m-d');

        return $date1Formatted !== $date2Formatted;
    }

    /**
     * Récupère l'instance de BeneficeService
     * Utilise l'injection de dépendance si disponible, sinon crée une nouvelle instance
     * 
     * @return BeneficeService
     */
    protected function getBeneficeService(): BeneficeService
    {
        // Si le controller a déjà une propriété beneficeService, l'utiliser
        if (property_exists($this, 'beneficeService')) {
            return $this->beneficeService;
        }

        // Sinon, créer une nouvelle instance
        return app(BeneficeService::class);
    }
}

