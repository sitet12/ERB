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
        Schema::create('revenus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('client')->onDelete('restrict');
            $table->foreignId('statut_id')->constrained('statut')->onDelete('restrict');
            $table->decimal('montant', 12, 2);
            $table->date('date');
            $table->text('note')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Index pour optimiser les requêtes
            $table->index('date');
            $table->index(['client_id', 'date']);
            $table->index('statut_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revenus');
    }
};
