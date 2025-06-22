<?php

namespace App\Http\Controllers\Auth;

use App\Models\Role;
use App\Models\User;
use App\Models\JenisUsaha;
use App\Models\Pekerjaan;
use App\Models\TargetPasar;
use App\Models\Wirausaha;
use App\Models\DataDiri;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
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
        $pekerjaanOptions = Pekerjaan::select('id', 'job as nama')->get();
        $jenisUsahaOptions = JenisUsaha::select('id', 'jenis_usaha as nama')->get();
        $targetPasarOptions = TargetPasar::select('id', 'target_pasar as nama')->get();
        
        // Ambil data dari session untuk melanjutkan proses registrasi
        $registrationData = [
            'step1' => session('registration_step1'),
            'step2' => session('registration_step2'),
            'step3' => session('registration_step3'),
            'step4' => session('registration_step4'),
            'step5' => session('registration_step5'),
        ];
        
        return Inertia::render('auth/register/multiStepRegister', [
            'roles' => $roles,
            'registrationData' => $registrationData,
            'jenisUsahaOptions' => $jenisUsahaOptions,
            'targetPasarOptions' => $targetPasarOptions,
            'pekerjaanOptions' => $pekerjaanOptions,
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
     * Show data diri step
     */
    public function showDataDiri(): Response
    {
        
        $pekerjaanOptions = Pekerjaan::select('id', 'job as nama')->get();
        
        $registrationData = [
            'step1' => session('registration_step1'),
            'step2' => session('registration_step2') ? ['completed' => true] : null,
            'step3' => session('registration_step3'),
        ];
        
        return Inertia::render('auth/register/step2FormDataDiri', [
            'registrationData' => $registrationData
        ]);
    }

    /**
     * Show role selection step
     */
    public function showRole(): Response
    {
        $roles = Role::whereIn('id', [1,2])->get();
        
        $registrationData = [
            'step1' => session('registration_step1'),
            'step2' => session('registration_step2') ? ['completed' => true] : null,
            'step3' => session('registration_step3'),
            'step4' => session('registration_step4'),
        ];
        
        return Inertia::render('auth/register/step4SetRole', [
            'roles' => $roles,
            'registrationData' => $registrationData
        ]);
    }

    /**
     * Show status usaha selection step
     */
    public function showStatusUsaha(): Response
    {
        $registrationData = [
            'step1' => session('registration_step1'),
            'step2' => session('registration_step2') ? ['completed' => true] : null,
            'step3' => session('registration_step3'),
            'step4' => session('registration_step4'),
            'step5' => session('registration_step5'),
        ];

        return Inertia::render('auth/register/step4StatusUsaha', [
            'registrationData' => $registrationData
        ]);
    }

    /**
     * Show form usaha_baru step
     */
    public function showFormStatusUsahaBaru(): Response
    {
        $jenisUsahaOptions = JenisUsaha::select('id', 'jenis_usaha as nama')->get();
        $targetPasarOptions = TargetPasar::select('id', 'target_pasar as nama')->get();
    
        $registrationData = [
            'step1' => session('registration_step1'),
            'step2' => session('registration_step2') ? ['completed' => true] : null,
            'step3' => session('registration_step3'),
            'step4' => session('registration_step4'),
            'step5' => session('registration_step5'),
            'step6' => session('registration_step6'),
        ];
    
        return Inertia::render('auth/register/step6aFormUsahaBaru', [
            'registrationData' => $registrationData,
            'jenisUsahaOptions' => $jenisUsahaOptions,
            'targetPasarOptions' => $targetPasarOptions,
        ]);
    }

    /**
     * Show form usaha_ongoing step
     */
    public function showFormStatusUsahaOngoing(): Response
    {
        $jenisUsahaOptions = JenisUsaha::select('id', 'jenis_usaha as nama')->get();
        $targetPasarOptions = TargetPasar::select('id', 'target_pasar as nama')->get();

        $registrationData = [
            'step1' => session('registration_step1'),
            'step2' => session('registration_step2') ? ['completed' => true] : null,
            'step3' => session('registration_step3'),
            'step4' => session('registration_step4'),
            'step5' => session('registration_step5'),
            'step6' => session('registration_step6'),
        ];

        return Inertia::render('auth/register/step6bFormUsahaOngoing', [
            'registrationData' => $registrationData,
            'jenisUsahaOptions' => $jenisUsahaOptions,
            'targetPasarOptions' => $targetPasarOptions,
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

        // return redirect()->route('register.show-password')->with('success', 'Informasi Berhasil Disimpan');
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
                    'message' => 'Silahkan lengkapi langkah 1 terlebih dahulu'
                ], 422);
            }
            
            return redirect()->route('register') //register = halaman utama multi-step register
                ->withErrors(['error' => 'Silahkan lengkapi langkah 1 terlebih dahulu']);
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

        // return redirect()->route('register.show-role')->with('success', 'Data berhasil Disimpan');
    }

    /**
     * Final registration (Step 3)
     */
    // public function store(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'role_id' => 'required|integer|exists:roles,id'
    //     ]);

    //     $step1Data = session('registration_step1');
    //     $step2Data = session('registration_step2');

    //     if (!$step1Data || !$step2Data || !$step2Data['completed']) {
    //         if ($request->expectsJson()) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Silakan lengkapi semua langkah pendaftaran'
    //             ], 422);
    //         }
            
    //         return redirect()->route('register')
    //             ->withErrors(['error' => 'Silakan lengkapi semua langkah pendaftaran']);
    //     }

    //     // Cek apakah email sudah terdaftar
    //     $existingUser = User::where('email', $step1Data['email'])->first();
    //     if ($existingUser) {
    //         session()->forget(['registration_step1', 'registration_step2']);
            
    //         if ($request->expectsJson()) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Email sudah terdaftar'
    //             ], 422);
    //         }
            
    //         return redirect()->route('register')
    //             ->withErrors(['email' => 'Email sudah terdaftar']);
    //     }

    //     try {
    //         // Buat user baru
    //         $userData = [
    //             'name' => $step1Data['nama'],
    //             'email' => $step1Data['email'],
    //             'no_telp' => $step1Data['no_telp'],
    //             'password' => Hash::make($step2Data['password']),
    //             'role_id' => $request->role_id,
    //         ];

    //         $user = User::create($userData);

    //         // Hapus data session pendaftaran
    //         session()->forget(['registration_step1', 'registration_step2']);

    //         // Trigger event registered
    //         event(new Registered($user));

    //         // Login otomatis setelah registrasi
    //         Auth::login($user);

    //         if ($request->expectsJson()) {
    //             return response()->json([
    //                 'success' => true,
    //                 'message' => 'Pendaftaran berhasil! Selamat datang di JuraVest.',
    //                 'redirect' => route('dashboard')
    //             ]);
    //         }

    //         return redirect()->route('dashboard')
    //             ->with('success', 'Pendaftaran berhasil! Selamat datang di JuraVest.');

    //     } catch (\Exception $e) {
    //         // Hapus session data jika ada error
    //         session()->forget(['registration_step1', 'registration_step2']);
            
    //         if ($request->expectsJson()) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Pendaftaran gagal. Silakan coba lagi.'
    //             ], 500);
    //         }
            
    //         return redirect()->route('register')
    //             ->withErrors(['error' => 'Pendaftaran gagal. Silakan coba lagi.']);
    //     }
    // }

    /**
     * Store role_id (Step 3)
     */
    public function storeDataDiri(Request $request)
    {
        $pekerjaanOptions = Pekerjaan::select('id', 'job as nama')->get();
        
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'pendidikan_terakhir' => ['required', Rule::in(['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'])],
            'jenis_kelamin' => ['required',Rule::in(['Laki-Laki', 'Perempuan'])],
            'pekerjaan_id' => 'required|integer|exists:pekerjaans,id'
        ]);

        // Validasi step sebelumnya harus sudah completed
        if (!session('registration_step2.completed')) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Silahkan lengkapi langkah 2 terlebih dahulu'
                ], 422);
            }
            
            return redirect()->route('register.show-password')
                ->withErrors(['error' => 'Silahkan lengkapi langkah 2 terlebih dahulu']);
        }

        // Simpan step 3 dengan tanda completed
        session([
            'registration_step3' => [
                'nama_lengkap' => $request->nama_lengkap,
                'tanggal_lahir' => $request->tanggal_lahir,
                'alamat' => $request->alamat,
                'pendidikan_terakhir' => $request->pendidikan_terakhir,
                'jenis_kelamin' => $request->jenis_kelamin,
                'pekerjaan_id' => $request->pekerjaan_id,
                'completed' => true
            ]
        ]);

        // Jika request adalah AJAX (dari React), return JSON response
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data diri berhasil disimpan',
                'data' => ['completed' => true],
            ]);
        }

        // return redirect()->route('register.showRole')->with('success', 'Data berhasil disimpan');
    }
    
    /**
     * Store role_id (Step 4)
     */
    public function storeRole(Request $request)
    {
        $request->validate([
            'role_id' => 'required|integer|exists:roles,id'
        ]);

        // Validasi step sebelumnya harus sudah completed
        if (!session('registration_step3.completed')) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Silahkan lengkapi langkah 3 terlebih dahulu'
                ], 422);
            }
            
            return redirect()->route('register.show-dataDiri')
                ->withErrors(['error' => 'Silahkan lengkapi langkah 3 terlebih dahulu']);
        }

        // Simpan step 4 dengan tanda completed
        session([
            'registration_step4' => [
                'role_id' => $request->role_id,
                'completed' => true
            ]
        ]);

        // Jika request adalah AJAX (dari React), return JSON response
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Role berhasil disimpan',
                'data' => [
                'role_id' => $request->role_id,
                'completed' => true,
            ],
            ]);
        }

        // return redirect()->route('register.show-statusUsaha')->with('success', 'Data berhasil disimpan');
    }

    /**
     * Store status_usaha (Step 5)
    */
    public function storeStatusUsaha(Request $request)
    {
        $request->validate([
            'status_usaha' => 'required|in:usaha_baru,usaha_ongoing',
        ]);

        // Validasi step sebelumnya harus sudah completed
        if (!session('registration_step4.completed')) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Silahkan lengkapi langkah 3 terlebih dahulu'
                ], 422);
            }
            
            return redirect()->route('register.show-role')
                ->withErrors(['error' => 'Silahkan lengkapi langkah 3 terlebih dahulu']);
        }

        // Simpan step 4 dengan tanda completed
        session([
            'registration_step5' => [
                'status_usaha' => $request->status_usaha,
                'completed' => true
            ]
        ]);

        // Jika request adalah AJAX (dari React), return JSON response
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Status usaha berhasil disimpan',
                'data' => [
                'status_usaha' => $request->status_usaha,
                'completed' => true,
            ],
            ]);
        }

        // if ($request->status_usaha === 'usaha_baru') {
        //     return redirect()->route('register.show-formStatusUsahaBaru')->with('success', 'Data berhasil disimpan');
        // } elseif ($request->status_usaha === 'usaha_ongoing') {
        //     return redirect()->route('register.show-formStatusUsahaOngoing')->with('success', 'Data berhasil disimpan');
        // }
    }

    /**
     * Store usaha baru data (Step 5a)
    */
    // public function storeFormStatusUsahaBaru(Request $request)
    // {
    //     $request->validate([
    //         'nama_usaha' => 'required|string|max:50',
    //         'jenis_usaha_id' => 'required|integer|exists:jenis_usahas,id',
    //         'target_pasar_id' => 'required|integer|exists:target_pasars,id',
    //         // 'tipe_usaha' => 'required|string|in:Usaha Baru',

    //         'usaha_baru.rencana_lokasi_operasional' => 'required|string|max:50',
    //         'usaha_baru.rencana_mulai_usaha' => 'required|string|max:4',
    //         'usaha_baru.alokasi_dana' => 'required|string|min:10',
    //         'usaha_baru.perkiraan_dana' => 'required|numeric|min:0',
    //         'usaha_baru.latar_belakang' => 'required|string|min:10',
    //     ]);

    //     // Validasi step sebelumnya harus sudah completed
    //     if (!session('registration_step4.completed')) {
    //         if ($request->expectsJson()) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Silakan lengkapi langkah 4 terlebih dahulu'
    //             ], 422);
    //         }
            
    //         return redirect()->route('register.show-statusUsaha')
    //             ->withErrors(['error' => 'Silakan lengkapi langkah 4 terlebih dahulu']);
    //     }

    //     $step4 = session('registration_step4');
    //     $tipeUsaha = $step4['status_usaha'] ?? null;
        
    //     // Simpan step 5a dengan tanda completed
    //     session([
    //         'registration_step5' => [
    //             'nama_usaha' => $request->nama_usaha,
    //             'jenis_usaha_id' => $request->jenis_usaha_id,
    //             'target_pasar_id' => $request->target_pasar_id,
    //             'tipe_usaha' => $tipeUsaha,
    //             'usaha_baru' => $request->usaha_baru,
    //             'completed' => true
    //         ]
    //     ]);

    //     // Jika request adalah AJAX (dari React), return JSON response
    //     if ($request->expectsJson()) {
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Data usaha baru berhasil disimpan',
    //             'data' => [
    //             'nama_usaha' => $request->nama_usaha,
    //             'jenis_usaha_id' => $request->jenis_usaha_id,
    //             'target_pasar_id' => $request->target_pasar_id,
    //             'tipe_usaha' => $tipeUsaha,
    //             'usaha_baru' => $request->usaha_baru,
    //             'completed' => true
    //         ]
    //         ]);
    //     }

    //     // return redirect()->route('register.next-step')->with('success', 'Data berhasil disimpan'); // sesuaikan route
    // }

    /**
     * Store usaha ongoing data (Step 5b)
     */
    // public function storeFormStatusUsahaOngoing(Request $request)
    // {
    //     $request->validate([
    //         'nama_usaha' => 'required|string|max:50',
    //         'jenis_usaha_id' => 'required|integer|exists:jenis_usahas,id',
    //         'target_pasar_id' => 'required|integer|exists:target_pasars,id',
    //         'tipe_usaha' => 'required|string|in:Usaha Ongoing',

    //         'usaha_ongoing.lokasi_operasional' => 'required|string|max:50',
    //         'usaha_ongoing.tahun_berdiri' => 'required|string|max:4',
    //         'usaha_ongoing.jumlah_karyawan' => 'required|string|min:1',
    //         'usaha_ongoing.estimasi_omzet' => 'required|numeric|min:0',
    //         'usaha_ongoing.biaya_operasional' => 'required|numeric|min:0',
    //         'usaha_ongoing.rencana_penggunaan_dana' => 'required|string|min:10',
    //         'usaha_ongoing.proyeksi_usaha' => 'required|string|min:10',
    //         'usaha_ongoing.media_social' => 'required|string|min:3',
    //     ]);

    //     // Validasi step sebelumnya harus sudah completed
    //     if (!session('registration_step4.completed')) {
    //         if ($request->expectsJson()) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Silakan lengkapi langkah 4 terlebih dahulu'
    //             ], 422);
    //         }
            
    //         return redirect()->route('register.show-statusUsaha')
    //             ->withErrors(['error' => 'Silakan lengkapi langkah 4 terlebih dahulu']);
    //     }

    //     // Simpan step 5b dengan tanda completed
    //     session([
    //         'registration_step5' => [
    //             'nama_usaha' => $request->nama_usaha,
    //             'jenis_usaha_id' => $request->jenis_usaha_id,
    //             'target_pasar_id' => $request->target_pasar_id,
    //             'tipe_usaha' => $request->tipe_usaha,
    //             'usaha_ongoing' => $request->usaha_ongoing,
    //             'completed' => true
    //         ]
    //     ]);

    //     // Jika request adalah AJAX (dari React), return JSON response
    //     if ($request->expectsJson()) {
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Data usaha ongoing berhasil disimpan',
    //             'data' => [
    //             'nama_usaha' => $request->nama_usaha,
    //             'jenis_usaha_id' => $request->jenis_usaha_id,
    //             'target_pasar_id' => $request->target_pasar_id,
    //             'tipe_usaha' => $request->tipe_usaha,
    //             'usaha_ongoing' => $request->usaha_baru,
    //             'completed' => true
    //         ]
    //         ]);
    //     }

    //     // return redirect()->route('register.next-step')->with('success', 'Data berhasil disimpan'); // sesuaikan route
    // }
    
    public function storeFormStatusUsahaBaru(Request $request)
    {
        // Validasi data step 6a
        $request->validate([
            'nama_usaha' => 'required|string|max:50',
            'jenis_usaha_id' => 'required|integer|exists:jenis_usahas,id',
            'target_pasar_id' => 'required|integer|exists:target_pasars,id',

            'usaha_baru.rencana_lokasi_operasional' => 'required|string|max:50',
            'usaha_baru.rencana_mulai_usaha' => 'required|string|max:4',
            'usaha_baru.alokasi_dana' => 'required|string|min:10',
            'usaha_baru.perkiraan_dana' => 'required|numeric|min:0',
            'usaha_baru.latar_belakang' => 'required|string|min:10',
        ]);

        // Ambil semua data dari session
        $step1 = session('registration_step1');
        $step2 = session('registration_step2');
        $step3 = session('registration_step3');
        $step4 = session('registration_step4');
        $step5 = session('registration_step5');

        if (!$step1 || !$step2 || !$step3 || !$step4 || !$step5 || !$step2['completed'] || !$step3['completed'] || !$step4['completed'] || !$step5['completed']) {
            return response()->json([
                'success' => false,
                'message' => 'Data pendaftaran tidak lengkap. Silakan ulangi proses.'
            ], 422);
        }

        // $tipeUsaha = $step4['status_usaha'] ?? null;

        $tipeUsaha = match ($step5['status_usaha'] ?? null) {
            'usaha_baru' => 'Usaha Baru',
            'usaha_ongoing' => 'Usaha Ongoing',
            default => null,
        };

        try {
            DB::beginTransaction();

            // Cek email unik
            $existingUser = User::where('email', $step1['email'])->first();
            if ($existingUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email sudah terdaftar'
                ], 422);
            }

            // Buat user
            $user = User::create([
                'name' => $step1['nama'],
                'email' => $step1['email'],
                'no_telp' => $step1['no_telp'],
                'password' => Hash::make($step2['password']),
                'role_id' => $step4['role_id'],
            ]);

            //Simpan ke tabel data diri
            DataDiri::create([
                'user_id' => $user->id,
                'nama_lengkap' => $step3['nama_lengkap'],
                'tanggal_lahir' => $step3['tanggal_lahir'],
                'alamat' => $step3['alamat'],
                'pendidikan_terakhir' => $step3['pendidikan_terakhir'],
                'jenis_kelamin' => $step3['jenis_kelamin'],
                'pekerjaan_id' => $step3['pekerjaan_id']
            ]);
            
            // Simpan ke tabel wirausaha
            Wirausaha::create([
                'user_id' => $user->id,
                'nama_usaha' => $request->nama_usaha,
                'jenis_usaha_id' => $request->jenis_usaha_id,
                'target_pasar_id' => $request->target_pasar_id,
                'tipe_usaha' => $tipeUsaha,
                'usaha_baru' => $request->usaha_baru,   // seluruh nested array dimasukkan ke jsonb
                'usaha_ongoing' => null, // atau biarkan default
            ]);

            // Hapus session pendaftaran
            session()->forget([
                'registration_step1',
                'registration_step2',
                'registration_step3',
                'registration_step4',
                'registration_step5',
                'registration_step6'
            ]);

            // Login otomatis
            event(new Registered($user));
            Auth::login($user);

            DB::commit();

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Pendaftaran berhasil!',
                    'redirect' => route('dashboard'),
                ]);
            }
            
            return redirect()->route('dashboard')
                ->with('success', 'Pendaftaran berhasil!');            

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Pendaftaran gagal: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store usaha ongoing data (Step 6b)
     */
    public function storeFormStatusUsahaOngoing(Request $request)
    {
        $request->validate([
            'nama_usaha' => 'required|string|max:50',
            'jenis_usaha_id' => 'required|integer|exists:jenis_usahas,id',
            'target_pasar_id' => 'required|integer|exists:target_pasars,id',

            'usaha_ongoing.lokasi_operasional' => 'required|string|max:50',
            'usaha_ongoing.tahun_berdiri' => 'required|string|max:4',
            'usaha_ongoing.jumlah_karyawan' => 'required|string|min:1',
            'usaha_ongoing.estimasi_omzet' => 'required|numeric|min:0',
            'usaha_ongoing.biaya_operasional' => 'required|numeric|min:0',
            'usaha_ongoing.rencana_penggunaan_dana' => 'required|string|min:10',
            'usaha_ongoing.proyeksi_usaha' => 'required|string|min:10',
            'usaha_ongoing.media_social' => 'required|string|min:3',
        ]);

        // Ambil semua data dari session
        $step1 = session('registration_step1');
        $step2 = session('registration_step2');
        $step3 = session('registration_step3');
        $step4 = session('registration_step4');

        if (!$step1 || !$step2 || !$step3 || !$step4 || !$step5 || !$step2['completed'] || !$step3['completed'] || !$step4['completed'] || !$step5['completed']) {
            return response()->json([
                'success' => false,
                'message' => 'Data pendaftaran tidak lengkap. Silakan ulangi proses.'
            ], 422);
        }

        $tipeUsaha = match ($step5['status_usaha'] ?? null) {
            'usaha_baru' => 'Usaha Baru',
            'usaha_ongoing' => 'Usaha Ongoing',
            default => null,
        };
        
        try {
            DB::beginTransaction();

            // Cek email unik
            $existingUser = User::where('email', $step1['email'])->first();
            if ($existingUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email sudah terdaftar'
                ], 422);
            }

            // Buat user
            $user = User::create([
                'name' => $step1['nama'],
                'email' => $step1['email'],
                'no_telp' => $step1['no_telp'],
                'password' => Hash::make($step2['password']),
                'role_id' => $step4['role_id'],
            ]);

            //Simpan ke tabel data diri
            DataDiri::create([
                'user_id' => $user->id,
                'nama_lengkap' => $step3['nama_lengkap'],
                'tanggal_lahir' => $step3['tanggal_lahir'],
                'alamat' => $step3['alamat'],
                'pendidikan_terakhir' => $step3['pendidikan_terakhir'],
                'jenis_kelamin' => $step3['jenis_kelamin'],
                'pekerjaan_id' => $step3['pekerjaan_id']
            ]);

            // Simpan ke tabel wirausaha
            Wirausaha::create([
                'user_id' => $user->id,
                'nama_usaha' => $request->nama_usaha,
                'jenis_usaha_id' => $request->jenis_usaha_id,
                'target_pasar_id' => $request->target_pasar_id,
                'tipe_usaha' => $tipeUsaha,
                'usaha_baru' => null,   // seluruh nested array dimasukkan ke jsonb
                'usaha_ongoing' => $request->usaha_ongoing, // atau biarkan default
            ]);

            // Hapus session pendaftaran
            session()->forget([
                'registration_step1',
                'registration_step2',
                'registration_step3',
                'registration_step4',
                'registration_step5'
            ]);

            // Login otomatis
            event(new Registered($user));
            Auth::login($user);

            DB::commit();

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Pendaftaran berhasil!',
                    'redirect' => route('dashboard'),
                ]);
            }
            
            return redirect()->route('dashboard')
                ->with('success', 'Pendaftaran berhasil!');            

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Pendaftaran gagal: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Get registration data from session
     */
    public function getRegistrationData(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'step1' => session('registration_step1', null),
            'step2' => session('registration_step2') ? ['completed' => session('registration_step2.completed', false)] : null,
            'step3' => session('registration_step3') ? ['completed' => session('registration_step3.completed', false)] : null,
            'step4' => session('registration_step4') ? ['completed' => session('registration_step4.completed', false)] : null,
            'step5' => session('registration_step5') ? ['completed' => session('registration_step5.completed', false)] : null,
        ]);
    }

    /**
     * Clear registration session data
     */
    public function clearRegistrationData(): \Illuminate\Http\JsonResponse
    {
        session()->forget([
            'registration_step1', 
            'registration_step2', 
            'registration_step3', 
            'registration_step4', 
            'registration_step5'
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Data pendaftaran telah dihapus'
        ]);
    }
    
    
    // /**
    //  * Get registration data from session
    //  */
    // public function getRegistrationData(): \Illuminate\Http\JsonResponse
    // {
    //     return response()->json([
    //         'step1' => session('registration_step1', null),
    //         'step2' => session('registration_step2') ? ['completed' => true] : null,
    //     ]);
    // }

    /**
     * Clear registration session data
     */
    // public function clearRegistrationData(): \Illuminate\Http\JsonResponse
    // {
    //     session()->forget(['registration_step1', 'registration_step2']);
        
    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Data pendaftaran telah dihapus'
    //     ]);
    // }
}