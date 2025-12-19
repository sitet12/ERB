<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('charge_fixe', function (Blueprint $table) {
            $table->id();
            $table->foreignId('charge_fixe_type_id')->constrained('charge_fixe_type')->onDelete('restrict');
            $table->decimal('montant', 12, 2);
            $table->date('date');
            $table->timestamps();
            $table->softDeletes();

            // Index pour optimiser les requêtes
            $table->index('date');
            $table->index(['charge_fixe_type_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charge_fixe');
    }
};
