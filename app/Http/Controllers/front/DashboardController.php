<?php

namespace App\Http\Controllers\front;

use Inertia\Inertia;
use App\Models\Investor;
use App\Models\Wirausaha;
use App\Models\JenisUsaha;
use App\Models\TargetPasar;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index() {
    $user = Auth::user();
    $investor = $user->investor;

    if ($investor) {
        $jenisUsaha = $investor->jenis_usaha_invest;
        $targetPasar = $investor->target_pasar_invest;

        $rekomendasi = collect();

        $matchFull = Wirausaha::with(['jenis_usaha', 'target_pasar', 'user'])
            ->whereIn('target_pasar_id', $targetPasar)
            ->whereIn('jenis_usaha_id', $jenisUsaha)
            ->get();
        
        $rekomendasi = $rekomendasi->merge($matchFull);

        $matchJenis = Wirausaha::with(['target_pasar', 'jenis_usaha', 'user'])
            ->whereIn('jenis_usaha_id', $jenisUsaha)
            ->whereNotIn('id', $rekomendasi->pluck('id'))
            ->get();
        
        $rekomendasi = $rekomendasi->merge($matchJenis);

        $matchTarget = Wirausaha::with(['jenis_usaha', 'target_pasar', 'user'])
            ->whereIn('target_pasar_id', $targetPasar)
            ->whereNotIn('id', $rekomendasi->pluck('id'))
            ->get();
        
        $rekomendasi = $rekomendasi->merge($matchTarget);

        if ($rekomendasi->isEmpty()) {
            $rekomendasi = Wirausaha::with(['jenis_usaha', 'target_pasar', 'user'])
                ->inRandomOrder()->take(12)->get();
        }
    } else {
        $rekomendasi = Wirausaha::with(['jenis_usaha', 'target_pasar'])
                        ->inRandomOrder()->take(12)->get();
    }

    // ambil wirausaha user dan hitung investorR-nya juga
    $wirausaha = $user->wirausaha;
    $investorR = collect();

    if($wirausaha) {
        $jenisUsaha = $wirausaha->jenis_usaha_id;
        $targetPasar = $wirausaha->target_pasar_id;

        $matchDua = Investor::with('user')
            ->whereJsonContains('target_pasar_invest', $targetPasar)
            ->whereJsonContains('jenis_usaha_invest', $jenisUsaha)
            ->get();

        $investorR = $investorR->merge($matchDua);

        $matchJenis = Investor::with('user')
            ->whereJsonContains('jenis_usaha_invest', $jenisUsaha)
            ->get();

        $investorR = $investorR->merge($matchJenis);

        $matchTarget = Investor::with('user')
            ->whereJsonContains('target_pasar_invest', $targetPasar)
            ->get();

        $investorR = $investorR->merge($matchTarget);

        if($investorR->isEmpty()) {
            $investorR = Investor::with('user')
                ->inRandomOrder()->take(12)->get();
        }
    } else {
        $investorR = Investor::with('user')
                ->inRandomOrder()->take(12)->get();
    }

    
        $investor->load([
            'user',
            'user.dataDiri',
            'user.dataDiri.pekerjaan'
        ]);
        
        // Ambil data pekerjaan dengan fallback
        $pekerjaan = $investor->user?->dataDiri?->pekerjaan?->job ?? 'Tidak diketahui';
        
        // Ambil data referensi
        $jenisUsahas = JenisUsaha::select('id', 'jenis_usaha')->get();
        $targetPasars = TargetPasar::select('id', 'target_pasar')->get();

        // Cari label jenis_usaha_invest
        $jenisUsahaLabels = [];
        if ($investor->jenis_usaha_invest && is_array($investor->jenis_usaha_invest)) {
            $jenisUsahaLabels = $jenisUsahas->whereIn('id', $investor->jenis_usaha_invest)->pluck('jenis_usaha')->toArray();
        }

        // Cari label target_pasar_invest
        $targetPasarLabels = [];
        if ($investor->target_pasar_invest && is_array($investor->target_pasar_invest)) {
            $targetPasarLabels = $targetPasars->whereIn('id', $investor->target_pasar_invest)->pluck('target_pasar')->toArray();
        }

        // Tambahkan informasi tambahan untuk investor
        $investorData = $investor->toArray();
        $investorData['pekerjaan'] = $pekerjaan;
        $investorData['jenis_usaha_labels'] = $jenisUsahaLabels;
        $investorData['target_pasar_labels'] = $targetPasarLabels;

    return Inertia::render('front/dashboard', [
        'rekomendasi' => $rekomendasi,
        'investor' => $investorR, // ✅ ini yang lo butuhin
        'jenis_usaha_labels' => $jenisUsahaLabels,
        'target_pasar_labels' => $targetPasarLabels
    ]);
}

}
