<?php

use App\Http\Controllers\JenisUsahaController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TargetPasarController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('admin')->group(function(){
        Route::resource('role', RoleController::class)->except(['show']);
        Route::resource('user', UserController::class)->except(['show']);
        Route::resource('jenis_usaha', JenisUsahaController::class)->except(['show']);
        Route::resource('target_pasar', TargetPasarController::class)->except('show');
});
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
