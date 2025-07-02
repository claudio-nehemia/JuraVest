<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::prefix('register')->group(function(){
        // Halaman utama multi-step register
        Route::get('/', [RegisteredUserController::class, 'create'])
            ->name('register');
        
        // Halaman individual steps (opsional, jika ingin diakses langsung)
        Route::get('basic-info', [RegisteredUserController::class, 'showBasicInfo']) 
            ->name('register.show-basicInfo');
        Route::get('set-password', [RegisteredUserController::class, 'showPassword'])
            ->name('register.show-password');
        Route::get('set-data-diri', [RegisteredUserController::class, 'showDataDiri'])
            ->name('register.show-dataDiri');
        Route::get('set-role', [RegisteredUserController::class, 'showRole'])
            ->name('register.show-role');
        Route::get('set-status-usaha', [RegisteredUserController::class, 'showStatusUsaha'])
            ->name('register.show-statusUsaha');
        Route::get('show-form-investor', [RegisteredUserController::class, 'showFormInvestor'])
            ->name('register.show-formInvestor');
        Route::get('show-form-usaha-baru', [RegisteredUserController::class, 'showFormStatusUsahaBaru'])
            ->name('register.show-formStatusUsahaBaru');
        Route::get('show-form-usaha-ongoing', [RegisteredUserController::class, 'showFormStatusUsahaOngoing'])
            ->name('register.show-formStatusUsahaOngoing');    
        
        // API endpoints untuk multi-step register
        Route::post('basic-info', [RegisteredUserController::class, 'storeBasicInfo']) 
            ->name('register.store-basicInfo');
        Route::post('set-password', [RegisteredUserController::class, 'storePassword'])
            ->name('register.store-password');
        Route::post('set-data-diri', [RegisteredUserController::class, 'storeDataDiri'])
            ->name('register.store-dataDiri');
        Route::post('set-role', [RegisteredUserController::class, 'storeRole'])
            ->name('register.store-role');
        Route::post('set-status-usaha', [RegisteredUserController::class, 'storeStatusUsaha'])
            ->name('register.store-statusUsaha');
        Route::post('show-form-investor', [RegisteredUserController::class, 'storeFormInvestor'])
            ->name('register.store-formInvestor');
        Route::post('store-form-usaha-baru', [RegisteredUserController::class, 'storeFormStatusUsahaBaru'])
            ->name('register.store-formStatusUsahaBaru');
        Route::post('store-form-usaha-ongoing', [RegisteredUserController::class, 'storeFormStatusUsahaOngoing'])
            ->name('register.store-formStatusUsahaOngoing');

        // Endpoint untuk mengambil data registrasi dari session
        Route::get('data', [RegisteredUserController::class, 'getRegistrationData'])
            ->name('register.get-data'); 
        Route::delete('clear', [RegisteredUserController::class, 'clearRegistrationData'])
            ->name('register.clear-data');
    });

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});