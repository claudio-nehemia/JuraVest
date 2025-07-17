<?php

namespace App\Http\Controllers\front;

use App\Models\Wirausaha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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

        
        return Inertia::render('front/dashboard', [
            'rekomendasi' => $rekomendasi
        ]);
    }

    public function investorIndex() {
        $user = Auth::user();
        $wirausaha = $user->wirausaha;
        $investor = $user->investor;
    }
}
