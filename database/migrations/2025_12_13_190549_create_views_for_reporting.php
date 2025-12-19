<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Crée les vues pour faciliter les rapports et calculs
     */
    public function up(): void
    {
        // Vue: Total charges par jour (fixes + variables)
        // SQLite ne supporte pas CREATE OR REPLACE VIEW, il faut DROP puis CREATE
        DB::statement('DROP VIEW IF EXISTS total_charges_par_jour');
        DB::statement('
            CREATE VIEW total_charges_par_jour AS
            SELECT
                date,
                SUM(montant) AS total_charges
            FROM (
                SELECT date, montant FROM charge_fixe WHERE deleted_at IS NULL
                UNION ALL
                SELECT date, total AS montant FROM charge_variable WHERE deleted_at IS NULL
            ) AS charges_union
            GROUP BY date
        ');

        // Vue: Total revenus payés par jour (seulement les revenus avec statut "Payé")
        DB::statement('DROP VIEW IF EXISTS total_revenus_par_jour');
        DB::statement("
            CREATE VIEW total_revenus_par_jour AS
            SELECT
                r.date,
                SUM(r.montant) AS total_revenus
            FROM revenus r
            INNER JOIN statut s ON r.statut_id = s.id
            WHERE s.nom = 'Payé' AND r.deleted_at IS NULL
            GROUP BY r.date
        ");

        // Vue: Bénéfice par jour (revenus - charges)
        // Utilisation de UNION pour simuler FULL OUTER JOIN (MySQL/SQLite ne supporte pas FULL OUTER JOIN)
        DB::statement('DROP VIEW IF EXISTS benefice_par_jour');
        DB::statement('
            CREATE VIEW benefice_par_jour AS
            SELECT
                date,
                COALESCE(SUM(total_revenus), 0) AS total_revenus,
                COALESCE(SUM(total_charges), 0) AS total_charges,
                (COALESCE(SUM(total_revenus), 0) - COALESCE(SUM(total_charges), 0)) AS benefice
            FROM (
                SELECT date, total_revenus, 0 AS total_charges FROM total_revenus_par_jour
                UNION ALL
                SELECT date, 0 AS total_revenus, total_charges FROM total_charges_par_jour
            ) AS combined
            GROUP BY date
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS benefice_par_jour');
        DB::statement('DROP VIEW IF EXISTS total_revenus_par_jour');
        DB::statement('DROP VIEW IF EXISTS total_charges_par_jour');
    }
};
