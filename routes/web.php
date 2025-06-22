<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardAdminController;
use App\Http\Controllers\DataDiriController;
use App\Http\Controllers\JenisUsahaController;
use App\Http\Controllers\PekerjaanController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TargetPasarController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WirausahaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('front/welcome');
})->name('welcome');

Route::get('profile', function() {
    return Inertia::render('front/profile');
})->name('user.profile');

// Route::get('inputName', [RegisteredUserController::class, 'showBasicInfo'])->name('register1');
// Route::get('setPassword', function(){
//     return Inertia::render('auth/register/step2SetPassword');
// })->name('register2');
// Route::get('setRole', function(){
//     return Inertia::render('auth/register/step3SetRole');
// })->name('register3');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');


    Route::get('home', function() {
        return Inertia::render('front/dashboard');
    })->name('home');
    Route::get('dashboard', [DashboardAdminController::class, 'index'])->name('dashboard');

    Route::prefix('admin')->group(function(){
        Route::resource('role', RoleController::class)->except(['show']);
        Route::resource('user', UserController::class)->except(['show']);
        Route::resource('jenis_usaha', JenisUsahaController::class)->except(['show']);
        Route::resource('target_pasar', TargetPasarController::class)->except('show');
        Route::resource('pekerjaan', PekerjaanController::class)->except('show');
        Route::resource('dataDiri', DataDiriController::class)->except('show');
        Route::resource('wirausaha', WirausahaController::class)->only(['index','destroy']);
        Route::get('wirausaha/newIndex', [WirausahaController::class,'newIndex'])->name('newWirausaha.index');
        Route::get('wirausaha/ongoingIndex', [WirausahaController::class, 'ongoingIndex'])->name('ongoingWirausaha.index');
        Route::get('wirausaha/ongoingCreate', [WirausahaController::class, 'ongoingCreate'])->name('ongoing.create');
        Route::get('wirausaha/newCreate', [WirausahaController::class, 'newCreate'])->name('new.create');
        Route::post('wirausaha/newStore',[WirausahaController::class,'newStore'])->name('new.store');
        Route::post('wirausaha/ongoingStore',[WirausahaController::class,'ongoingStore'])->name('ongoing.store');
        Route::get('wirausaha/newEdit/{wirausaha}/edit',[WirausahaController::class, 'newEdit'])->name('new.edit');
        Route::get('wirausaha/ongoingEdit/{wirausaha}/edit', [WirausahaController::class, 'ongoingEdit'])->name('ongoing.edit');
        Route::put('wirausaha/ongoingUpdate/{wirausaha}', [WirausahaController::class, 'ongoingUpdate'])->name('ongoing.update');
        Route::put('wirausaha/newUpdate/{wirausaha}', [WirausahaController::class, 'newUpdate'])->name('new.update');
});
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
