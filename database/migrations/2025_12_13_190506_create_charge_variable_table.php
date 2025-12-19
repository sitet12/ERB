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
        Schema::create('charge_variable', function (Blueprint $table) {
            $table->id();
            $table->foreignId('charge_variable_type_id')->constrained('charge_variable_type')->onDelete('restrict');
            $table->decimal('prix_unitaire', 12, 2);
            $table->decimal('quantite', 12, 2);
            $table->decimal('total', 12, 2);
            $table->date('date');
            $table->timestamps();
            $table->softDeletes();

            // Index pour optimiser les requêtes
            $table->index('date');
            $table->index(['charge_variable_type_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charge_variable');
    }
};
