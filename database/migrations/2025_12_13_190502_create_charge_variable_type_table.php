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
        Schema::create('charge_variable_type', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 100);
            $table->timestamps();
            $table->softDeletes();

            // Index pour optimiser les requêtes
            $table->index('nom');
            $table->index('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charge_variable_type');
    }
};
