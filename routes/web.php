<?php

use App\Http\Controllers\front\DashboardController;
use App\Http\Controllers\front\InvestorFrontController;
use App\Http\Controllers\front\WirausahaFrontController;
use App\Http\Controllers\InvestorController;
use App\Http\Controllers\WelcomeController;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\DataDiriController;
use App\Http\Controllers\PekerjaanController;
use App\Http\Controllers\WirausahaController;
use App\Http\Controllers\JenisUsahaController;
use App\Http\Controllers\TargetPasarController;
use App\Http\Controllers\DashboardAdminController;
use App\Http\Controllers\Auth\RegisteredUserController;

// Route::get('/', function () {
//     return Inertia::render('front/welcome');
// })->name('welcome');

Route::get('/', [WelcomeController::class, 'redirectIfLoggedIn'])->name('welcome');

Route::get('profile', function() {
    return Inertia::render('front/profile');
})->name('user.profile');

Route::get('wirausaha-detail', function() {
    return Inertia::render('front/wirausaha-detail');
})->name('wirausaha.detail');

Route::get('investor-detail', function() {
    return Inertia::render('front/investor-detail');
})->name('investor.detail');

Route::get('wirausaha', function() {
    return Inertia::render('front/wirausaha');
})->name('wirausaha.all');

Route::get('investor', function() {
    return Inertia::render('front/investor');
})->name('investor.all');

Route::get('about', function() {
    return Inertia::render('front/tentang-kami');
})->name('about');
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


    Route::get('home', [DashboardController::class, 'index'])->name('home');
    Route::get('/getWirausaha', [DashboardController::class, 'getWirausaha']);
    Route::get('wirausaha', [WirausahaFrontController::class, 'index'])->name('wirausaha.user');
    Route::get('investor', [InvestorFrontController::class, 'index'])->name('investor.user');
    Route::get('dashboard', [DashboardAdminController::class, 'index'])->name('dashboard');
    Route::get('/wirausaha', [WirausahaFrontController::class, 'index'])->name('wirausaha.index');
    Route::get('/wirausaha/{wirausaha}', [WirausahaFrontController::class, 'detail'])->name('wirausaha.detail');
    
  

    // Route::get('dashboard', [DashboardAdminController::class, 'index'])->name('dashboard');

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
        Route::resource('investor', InvestorController::class);
});

    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);

    Route::get('/chat/{user}', function (App\Models\User $user) {
        return Inertia::render('chat/Show', [
            'receiverId' => $user->id,
            'users' => User::where('id', '!=', auth()->id())->get(),
        ]);
    })->name('chat.show');

    Route::get('/chat', function () {
        return Inertia::render('chat/Index', [
            'users' => User::where('id', '!=', auth()->id())->get(),
        ]);
    })->name('chat.index');
});

Broadcast::routes(['middleware' => ['auth', 'web']]);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
