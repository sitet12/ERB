<?php

use App\Http\Controllers\BeneficeController;
use App\Http\Controllers\ChargeFixeController;
use App\Http\Controllers\ChargeFixeTypeController;
use App\Http\Controllers\ChargeVariableController;
use App\Http\Controllers\ChargeVariableTypeController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RevenuController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    //Route::get('dashboard', function () {
    //    return Inertia::render('dashboard');
    //})->name('dashboard');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Charge Fixe Types
    Route::resource('charge-fixe-types', ChargeFixeTypeController::class);

    // Clients
    Route::resource('clients', ClientController::class);

    // Revenus
    Route::resource('revenus', RevenuController::class);

    // Charges Fixes
    Route::resource('charges-fixes', ChargeFixeController::class);

    // Charge Variable Types
    Route::resource('charge-variable-types', ChargeVariableTypeController::class);

    // Charges Variables
    Route::resource('charges-variables', ChargeVariableController::class);

    // Benefices (read-only)
    Route::resource('benefices', BeneficeController::class)->only(['index', 'show']);
});

require __DIR__.'/settings.php';
