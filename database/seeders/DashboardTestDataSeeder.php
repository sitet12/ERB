<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Revenu;
use App\Models\ChargeFixe;
use App\Models\ChargeVariable;
use App\Models\ChargeFixeType;
use App\Models\ChargeVariableType;
use App\Models\Statut;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DashboardTestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Crée des données de test pour novembre et décembre :
     * - 10 clients
     * - Revenus pour chaque client (novembre et décembre)
     * - Charges fixes (novembre et décembre)
     * - Charges variables (novembre et décembre)
     */
    public function run(): void
    {
        // Récupérer ou créer les statuts
        $statutPaye = Statut::firstOrCreate(['nom' => 'Payé']);
        $statutImpaye = Statut::firstOrCreate(['nom' => 'Impayé']);
        
        // Récupérer ou créer les types de charges fixes
        $chargeFixeTypeLoyer = ChargeFixeType::firstOrCreate(['nom' => 'Loyer']);
        $chargeFixeTypeSalaire = ChargeFixeType::firstOrCreate(['nom' => 'Salaire']);
        $chargeFixeTypeAssurance = ChargeFixeType::firstOrCreate(['nom' => 'Assurance']);
        
        // Récupérer ou créer les types de charges variables
        $chargeVariableTypeEau = ChargeVariableType::firstOrCreate(['nom' => 'Eau']);
        $chargeVariableTypeElectricite = ChargeVariableType::firstOrCreate(['nom' => 'Électricité']);
        $chargeVariableTypeProduits = ChargeVariableType::firstOrCreate(['nom' => 'Produits de nettoyage']);
        
        // Dates pour novembre et décembre 2025
        $novembreStart = Carbon::create(2025, 11, 1)->startOfMonth();
        $novembreEnd = Carbon::create(2025, 11, 1)->endOfMonth();
        $decembreStart = Carbon::create(2025, 12, 1)->startOfMonth();
        $decembreEnd = Carbon::create(2025, 12, 1)->endOfMonth();
        
        // Créer 10 clients normaux
        $clients = [];
        for ($i = 1; $i <= 10; $i++) {
            $clients[] = Client::create([
                'nom' => "Client{$i}",
                'prenom' => "Test{$i}",
                'telephone' => "061234567{$i}",
            ]);
        }
        
        // Créer le même client 20 fois (pour tester les doublons)
        $clientDuplique = Client::create([
            'nom' => "Oussama",
            'prenom' => "Ali",
            'telephone' => "0612345678",
        ]);
        
        // Créer 19 autres instances du même client
        for ($i = 1; $i <= 19; $i++) {
            $clients[] = Client::create([
                'nom' => "Oussama",
                'prenom' => "Ali",
                'telephone' => "061234567" . (8 + $i), // Téléphones différents
            ]);
        }
        
        // Ajouter le premier client dupliqué à la liste
        $clients[] = $clientDuplique;
        
        // Créer des revenus pour chaque client (novembre et décembre)
        foreach ($clients as $index => $client) {
            // Revenus novembre (mixte payé/impayé)
            $revenusNovembre = rand(3, 8); // 3 à 8 revenus par client en novembre
            for ($j = 0; $j < $revenusNovembre; $j++) {
                $dateNovembre = $novembreStart->copy()->addDays(rand(0, 29));
                $statut = rand(0, 1) === 0 ? $statutPaye : $statutImpaye;
                
                Revenu::create([
                    'client_id' => $client->id,
                    'statut_id' => $statut->id,
                    'montant' => rand(50, 500) + (rand(0, 99) / 100), // 50.00 à 500.99
                    'date' => $dateNovembre->format('Y-m-d'),
                    'note' => "Revenu test novembre pour {$client->nom}",
                ]);
            }
            
            // Revenus décembre (mixte payé/impayé)
            $revenusDecembre = rand(3, 8); // 3 à 8 revenus par client en décembre
            for ($j = 0; $j < $revenusDecembre; $j++) {
                $dateDecembre = $decembreStart->copy()->addDays(rand(0, min(15, $decembreEnd->diffInDays(now())))); // Jusqu'à aujourd'hui
                $statut = rand(0, 1) === 0 ? $statutPaye : $statutImpaye;
                
                Revenu::create([
                    'client_id' => $client->id,
                    'statut_id' => $statut->id,
                    'montant' => rand(50, 500) + (rand(0, 99) / 100), // 50.00 à 500.99
                    'date' => $dateDecembre->format('Y-m-d'),
                    'note' => "Revenu test décembre pour {$client->nom}",
                ]);
            }
        }
        
        // Créer des charges fixes pour novembre
        $typesChargesFixes = [$chargeFixeTypeLoyer, $chargeFixeTypeSalaire, $chargeFixeTypeAssurance];
        foreach ($typesChargesFixes as $type) {
            $dateNovembre = $novembreStart->copy()->addDays(rand(0, 29));
            ChargeFixe::create([
                'charge_fixe_type_id' => $type->id,
                'montant' => match($type->nom) {
                    'Loyer' => 2000.00,
                    'Salaire' => 5000.00,
                    'Assurance' => 500.00,
                    default => 1000.00,
                },
                'date' => $dateNovembre->format('Y-m-d'),
            ]);
        }
        
        // Créer des charges fixes pour décembre
        foreach ($typesChargesFixes as $type) {
            $dateDecembre = $decembreStart->copy()->addDays(rand(0, min(15, $decembreEnd->diffInDays(now()))));
            ChargeFixe::create([
                'charge_fixe_type_id' => $type->id,
                'montant' => match($type->nom) {
                    'Loyer' => 2000.00,
                    'Salaire' => 5000.00,
                    'Assurance' => 500.00,
                    default => 1000.00,
                },
                'date' => $dateDecembre->format('Y-m-d'),
            ]);
        }
        
        // Créer des charges variables pour novembre
        $typesChargesVariables = [$chargeVariableTypeEau, $chargeVariableTypeElectricite, $chargeVariableTypeProduits];
        foreach ($typesChargesVariables as $type) {
            $dateNovembre = $novembreStart->copy()->addDays(rand(0, 29));
            $quantite = rand(10, 100);
            $prixUnitaire = match($type->nom) {
                'Eau' => 8.50,
                'Électricité' => 2.30,
                'Produits de nettoyage' => 25.00,
                default => 10.00,
            };
            
            ChargeVariable::create([
                'charge_variable_type_id' => $type->id,
                'prix_unitaire' => $prixUnitaire,
                'quantite' => $quantite,
                'date' => $dateNovembre->format('Y-m-d'),
                // total sera calculé automatiquement par le boot method
            ]);
        }
        
        // Créer des charges variables pour décembre
        foreach ($typesChargesVariables as $type) {
            $dateDecembre = $decembreStart->copy()->addDays(rand(0, min(15, $decembreEnd->diffInDays(now()))));
            $quantite = rand(10, 100);
            $prixUnitaire = match($type->nom) {
                'Eau' => 8.50,
                'Électricité' => 2.30,
                'Produits de nettoyage' => 25.00,
                default => 10.00,
            };
            
            ChargeVariable::create([
                'charge_variable_type_id' => $type->id,
                'prix_unitaire' => $prixUnitaire,
                'quantite' => $quantite,
                'date' => $dateDecembre->format('Y-m-d'),
                // total sera calculé automatiquement par le boot method
            ]);
        }
        
        $this->command->info('✅ Données de test créées avec succès !');
        $this->command->info('   - 10 clients normaux créés');
        $this->command->info('   - 20 clients "Oussama Ali" créés (pour tester les doublons)');
        $this->command->info('   - Revenus créés pour novembre et décembre');
        $this->command->info('   - Charges fixes créées pour novembre et décembre');
        $this->command->info('   - Charges variables créées pour novembre et décembre');
    }
}

