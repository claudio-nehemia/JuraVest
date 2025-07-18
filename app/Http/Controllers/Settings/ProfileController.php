<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\JenisUsaha;
use App\Models\TargetPasar;
use App\Models\Pekerjaan;

class ProfileController extends Controller
{
    private $pendidikan_terakhir = ['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'];
    private $jenis_kelamin = ['Laki-Laki', 'Perempuan'];

    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        // \Log::info('=== MASUK EDIT PROFILE ===');

        $user = $request->user()->load([
            'role',
            'investor',
            'wirausaha',
        'dataDiri',
        ]);
        $role = $user->role?->role_name;
        $investor = $user->investor;
        $wirausaha = $user->wirausaha;
        $tipeUsaha = $user->wirausaha?->tipe_usaha;

        \Log::info('=== USER DATA ===', $user->toArray());
        \Log::info('=== ROLE ===', [$role]);
        \Log::info('=== TIPE USAHA ===', [$tipeUsaha]);


        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'user' => $user,
            'data_diri' => $user->dataDiris,
            'role' => $role,
            'tipe_usaha' => $tipeUsaha,
            'investor' => $investor ? [
                'id' => $investor->id,
                'nama_investor' => $investor->nama_investor,
                'user_id' => $investor->user_id,
                'tujuan_investasi' => $investor->tujuan_investasi,
                'foto_profil' => $investor->foto_profil,
                'jenis_usaha_invest' => $investor->jenis_usaha_invest ?? [],
                'target_pasar_invest' => $investor->target_pasar_invest ?? [],
            ] : null,
            'wirausaha' => $wirausaha,
            'pendidikan_terakhir_options' => $this->pendidikan_terakhir,
            'jenis_kelamin_options' => $this->jenis_kelamin,
            'listJenisUsaha' => JenisUsaha::all(['id', 'jenis_usaha']),
            'listTargetPasar' => TargetPasar::all(['id', 'target_pasar']),
            'listPekerjaan' => Pekerjaan::all(['id', 'job']),
        ]);
    }

    /**
     * Update user info (data pribadi)
     */
    public function updateUserInfo(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'pendidikan_terakhir' => 'required|in:' . implode(',', $this->pendidikan_terakhir),
            'jenis_kelamin' => 'required|in:' . implode(',', $this->jenis_kelamin),
            'pekerjaan_id' => 'required|exists:pekerjaans,id',
        ]);
        
        $request->user()->dataDiris()->update($validated);

        return to_route('profile.edit')->with('success', 'User info updated.');
    }

    /**
     * Update public profile (investor / wirausaha)
     */
    public function updatePublicProfile(Request $request): RedirectResponse
    {
        // \Log::info('=== MASUK updatePublicProfile ===');
        // \Log::info('Request data:', $request->all());
        
        $user = $request->user();
        $user = $request->user()->load('wirausaha','investor');
        $role = $user->role?->role_name;

        if ($role === 'Investor') {
        $validated = $request->validate([
            'tujuan_investasi' => 'required|string',
            'jenis_usaha_invest' => 'required|array',
            'jenis_usaha_invest.*' => 'exists:jenis_usahas,id',
            'target_pasar_invest' => 'required|array',
            'target_pasar_invest.*' => 'exists:target_pasars,id',
            'foto_profil' => 'nullable|image|max:2048',
        ]);

        $validated['jenis_usaha_invest'] = array_map('intval', $validated['jenis_usaha_invest']);
        $validated['target_pasar_invest'] = array_map('intval', $validated['target_pasar_invest']);

        if ($request->hasFile('foto_profil')) {
            if($user->investor->foto_profil){
                Storage::disk('public')->delete($user->investor->foto_profil);
            }
            $validated['foto_profil'] = $request->file('foto_profil')->store('foto_investor', 'public');
        } else {
            unset($validated['foto_profil']);
        }

        // \Log::info('=== VALIDATED DATA ===', $validated);
        // \Log::info('=== INVESTOR ID ===', ['id' => $user->investor->id]);

        $user->investor->update($validated);

        } elseif ($role === 'Wirausaha') {
        // validasi umum
        $validated = $request->validate([
            'nama_usaha' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|max:1000',
            'jenis_usaha_id' => 'required|exists:jenis_usahas,id',
            'target_pasar_id' => 'required|exists:target_pasars,id',
            'foto_profil' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto_profil')) {
            $path = $request->file('foto_profil')->store('foto_wirausaha', 'public');
            $validated['foto_profil'] = $path;
        }

        $wirausaha = $user->wirausaha;
        $tipeUsaha = $wirausaha->tipe_usaha;

        if ($tipeUsaha === 'Usaha Baru') {
            $usahaBaruValidated = $request->validate([
                'rencana_lokasi_operasional' => 'required|string|max:255',
                'rencana_mulai_usaha' => 'required|string|max:255',
                'alokasi_dana' => 'required|string|max:1000',
                'perkiraan_dana' => 'required|numeric',
                'latar_belakang' => 'required|string|max:1000',
            ]);

            $wirausaha->update([
                ...$validated,
                'usaha_baru' => $usahaBaruValidated,
            ]);

        } elseif ($tipeUsaha === 'Usaha Ongoing') {
            $usahaOngoingValidated = $request->validate([
                'lokasi_operasional' => 'required|string|max:255',
                'tahun_berdiri' => 'required|string|max:4',
                'jumlah_karyawan' => 'required|string|max:255',
                'estimasi_omzet' => 'required|numeric',
                'biaya_operasional' => 'required|numeric',
                'rencana_penggunaan_dana' => 'required|string|max:1000',
                'proyeksi_usaha' => 'required|string|max:1000',
                'media_social' => 'required|string|max:255',
                'kebutuhan_dana' => 'required|numeric',
            ]);

            $wirausaha->update([
                ...$validated,
                'usaha_ongoing' => $usahaOngoingValidated,
            ]);
        }

        // \Log::info('=== VALIDATED DATA ===', $validated);
        // \Log::info('=== WIRAUSAHA ID ===', ['id' => $wirausaha->id]);
    }


        return to_route('profile.edit')->with('success', 'Public profile updated.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
