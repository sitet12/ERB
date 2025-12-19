<?php

namespace App\Services;

use App\Models\Revenu;
use App\Models\ChargeFixe;
use App\Models\ChargeVariable;
use App\Models\Benefice;
use Carbon\Carbon;

class BeneficeService
{
    /**
     * Calcule le bénéfice pour une date donnée
     * 
     * @param Carbon|string $date
     * @return Benefice
     */
    public function calculerBeneficeDuJour(Carbon|string $date): Benefice
    {
        $date = $date instanceof Carbon ? $date : Carbon::parse($date);

        // Total des revenus payés pour cette date
        $totalRevenus = Revenu::paye()
            ->parDate($date)
            ->sum('montant');

        // Total des charges fixes pour cette date
        $totalChargesFixes = ChargeFixe::whereDate('date', $date)
            ->sum('montant');

        // Total des charges variables pour cette date
        $totalChargesVariables = ChargeVariable::whereDate('date', $date)
            ->sum('total');

        $totalCharges = $totalChargesFixes + $totalChargesVariables;
        $benefice = $totalRevenus - $totalCharges;

        // Créer ou mettre à jour le bénéfice du jour
        // Utiliser updateOrCreate pour éviter les race conditions
        // Passer l'objet Carbon directement pour que Laravel gère correctement la conversion
        return Benefice::updateOrCreate(
            ['date' => $date],
            [
                'total_revenus' => $totalRevenus,
                'total_charges' => $totalCharges,
                'benefice' => $benefice,
            ]
        );
    }

    /**
     * Calcule les bénéfices pour une période donnée
     * 
     * @param Carbon|string $dateDebut
     * @param Carbon|string $dateFin
     * @return array{total_revenus: float, total_charges: float, benefice: float, benefices: \Illuminate\Support\Collection}
     */
    public function calculerBeneficePeriode(Carbon|string $dateDebut, Carbon|string $dateFin): array
    {
        $dateDebut = $dateDebut instanceof Carbon ? $dateDebut : Carbon::parse($dateDebut);
        $dateFin = $dateFin instanceof Carbon ? $dateFin : Carbon::parse($dateFin);

        // Calculer le bénéfice pour chaque jour de la période
        $benefices = collect();
        $dateCourante = $dateDebut->copy();

        while ($dateCourante <= $dateFin) {
            $benefice = $this->calculerBeneficeDuJour($dateCourante);
            $benefices->push($benefice);
            $dateCourante->addDay();
        }

        // Totaux de la période
        $totalRevenus = $benefices->sum('total_revenus');
        $totalCharges = $benefices->sum('total_charges');
        $beneficeTotal = $benefices->sum('benefice');

        return [
            'total_revenus' => $totalRevenus,
            'total_charges' => $totalCharges,
            'benefice' => $beneficeTotal,
            'benefices' => $benefices,
        ];
    }
}

