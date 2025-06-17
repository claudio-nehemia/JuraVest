<?php

namespace App\Http\Controllers\Auth;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page (multi-step).
     */
    public function create(): Response
    {
        $roles = Role::whereIn('id', [1, 2])->get();
        
        // Ambil data dari session untuk melanjutkan proses registrasi
        $registrationData = [
            'step1' => session('registration_step1'),
            'step2' => session('registration_step2') ? ['completed' => true] : null,
        ];
        
        return Inertia::render('auth/register/multiStepRegister', [
            'roles' => $roles,
            'registrationData' => $registrationData
        ]);
    }

    /**
     * Show basic info step
     */
    public function showBasicInfo(): Response
    {
        return Inertia::render('auth/register/step1BasicInfo');
    }

    /**
     * Show password step
     */
    public function showPassword(): Response
    {
        $registrationData = [
            'step1' => session('registration_step1'),
            'step2' => session('registration_step2') ? ['completed' => true] : null,
        ];
        
        return Inertia::render('auth/register/step2SetPassword', [
            'registrationData' => $registrationData
        ]);
    }

    /**
     * Show role selection step
     */
    public function setRole(): Response
    {
        $roles = Role::whereIn('id', [1,2])->get();
        
        $registrationData = [
            'step1' => session('registration_step1'),
            'step2' => session('registration_step2') ? ['completed' => true] : null,
        ];
        
        return Inertia::render('auth/register/step3SetRole', [
            'roles' => $roles,
            'registrationData' => $registrationData
        ]);
    }

    /**
     * Store basic information (Step 1)
     */
    public function storeBasicInfo(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'no_telp' => 'required|string|min:10|max:20'
        ]);

        session(['registration_step1' => $validated]);

        // Jika request adalah AJAX (dari React), return JSON response
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Informasi Berhasil Disimpan',
                'data' => $validated
            ]);
        }

        return redirect()->route('register.password')->with('success', 'Informasi Berhasil Disimpan');
    }

    /**
     * Store password (Step 2)
     */
    public function storePassword(Request $request)
    {
        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()]
        ]);

        if (!session('registration_step1')) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Silakan lengkapi langkah 1 terlebih dahulu'
                ], 422);
            }
            
            return redirect()->route('register')
                ->withErrors(['error' => 'Silakan lengkapi langkah 1 terlebih dahulu']);
        }

        // Simpan step 2 dengan tanda completed
        session([
            'registration_step2' => [
                'password' => $request->password,
                'password_confirmation' => $request->password_confirmation,
                'completed' => true
            ]
        ]);

        // Jika request adalah AJAX (dari React), return JSON response
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Password berhasil disimpan',
                'data' => ['completed' => true]
            ]);
        }

        return redirect()->route('register.role')->with('success', 'Data berhasil Disimpan');
    }

    /**
     * Final registration (Step 3)
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'role_id' => 'required|integer|exists:roles,id'
        ]);

        $step1Data = session('registration_step1');
        $step2Data = session('registration_step2');

        if (!$step1Data || !$step2Data || !$step2Data['completed']) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Silakan lengkapi semua langkah pendaftaran'
                ], 422);
            }
            
            return redirect()->route('register')
                ->withErrors(['error' => 'Silakan lengkapi semua langkah pendaftaran']);
        }

        // Cek apakah email sudah terdaftar
        $existingUser = User::where('email', $step1Data['email'])->first();
        if ($existingUser) {
            session()->forget(['registration_step1', 'registration_step2']);
            
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email sudah terdaftar'
                ], 422);
            }
            
            return redirect()->route('register')
                ->withErrors(['email' => 'Email sudah terdaftar']);
        }

        try {
            // Buat user baru
            $userData = [
                'name' => $step1Data['nama'],
                'email' => $step1Data['email'],
                'no_telp' => $step1Data['no_telp'],
                'password' => Hash::make($step2Data['password']),
                'role_id' => $request->role_id,
            ];

            $user = User::create($userData);

            // Hapus data session pendaftaran
            session()->forget(['registration_step1', 'registration_step2']);

            // Trigger event registered
            event(new Registered($user));

            // Login otomatis setelah registrasi
            Auth::login($user);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Pendaftaran berhasil! Selamat datang di JuraVest.',
                    'redirect' => route('dashboard')
                ]);
            }

            return redirect()->route('dashboard')
                ->with('success', 'Pendaftaran berhasil! Selamat datang di JuraVest.');

        } catch (\Exception $e) {
            // Hapus session data jika ada error
            session()->forget(['registration_step1', 'registration_step2']);
            
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pendaftaran gagal. Silakan coba lagi.'
                ], 500);
            }
            
            return redirect()->route('register')
                ->withErrors(['error' => 'Pendaftaran gagal. Silakan coba lagi.']);
        }
    }

    /**
     * Get registration data from session
     */
    public function getRegistrationData(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'step1' => session('registration_step1', null),
            'step2' => session('registration_step2') ? ['completed' => true] : null,
        ]);
    }

    /**
     * Clear registration session data
     */
    public function clearRegistrationData(): \Illuminate\Http\JsonResponse
    {
        session()->forget(['registration_step1', 'registration_step2']);
        
        return response()->json([
            'success' => true,
            'message' => 'Data pendaftaran telah dihapus'
        ]);
    }
}