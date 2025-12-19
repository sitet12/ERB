<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Initialise les statuts de base : Payé et Impayé
     */
    public function run(): void
    {
        // Utilisation de insertOrIgnore pour éviter les doublons
        DB::table('statut')->insertOrIgnore([
            [
                'nom' => 'Payé',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Impayé',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
