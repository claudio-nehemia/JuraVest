<?php

namespace App\Http\Controllers\front;

use Inertia\Inertia;
use App\Models\Investor;
use App\Models\Wirausaha;
use App\Models\JenisUsaha;
use App\Models\TargetPasar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class InvestorFrontController extends Controller
{
    public function index() {
        $user = Auth::user();
        $investor = $user->investor;
        $wirausaha = $user->wirausaha;
        $category = JenisUsaha::all();
        $targetPasarList = TargetPasar::all();
        
        // Eager load untuk optimasi
        $listInvestor = Investor::with([
            'user',
            'user.dataDiri',
            'user.dataDiri.pekerjaan'
        ])->get();

        if ($wirausaha) {
            $jenisUsaha = $wirausaha->jenis_usaha_id;
            $targetPasar = $wirausaha->target_pasar_id;
            
            $scored = $listInvestor->map(function($item) use($jenisUsaha, $targetPasar) {
                $score = 0;

                if(in_array($jenisUsaha, $item->jenis_usaha_invest)) {
                    $score += 1;
                }

                if(in_array($targetPasar, $item->target_pasar_invest)) {
                    $score += 1;
                }

                $item->match_score = $score;
                // Tambahkan pekerjaan langsung ke object
                $item->pekerjaan = $item->user?->dataDiri?->pekerjaan?->job ?? 'Tidak diketahui';

                return $item;
            });
        } elseif($investor) {
            $jenisUsaha = $investor->jenis_usaha_invest;
            $targetPasar = $investor->target_pasar_invest;

            $scored = $listInvestor->map(function($item) use($jenisUsaha, $targetPasar) {
                $score = 0;

                if(count(array_intersect($jenisUsaha,$item->jenis_usaha_invest)) > 0) {
                    $score += 1;
                }

                if(count(array_intersect($targetPasar,$item->target_pasar_invest)) > 0) {
                    $score += 1;
                }

                $item->match_score = $score;
                $item->pekerjaan = $item->user?->dataDiri?->pekerjaan?->job ?? 'Tidak diketahui';

                return $item;
            });
        } else {
            $scored = $listInvestor->map(function ($item) {
                $item->match_score = 0;
                $item->pekerjaan = $item->user?->dataDiri?->pekerjaan?->job ?? 'Tidak diketahui';
                return $item;
            });
        }

        $sorted = $scored->sortByDesc('match_score')->values();

        Log::info('Urutan:', ['data' => $sorted]);
        
        return Inertia::render('front/investor', [
            'rekomendasi' => $sorted,
            'categories' => $category,
            'targetPasarList' => $targetPasarList
        ]);
    }

    public function detail(Investor $investor) {
        // Eager load semua relasi yang dibutuhkan
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

        return Inertia::render('front/investor-detail', [
            'investor' => $investorData,
            'pekerjaan' => $pekerjaan,
            'jenis_usaha_labels' => $jenisUsahaLabels,
            'target_pasar_labels' => $targetPasarLabels
        ]);
    }

    // Method tambahan untuk mendapatkan statistik investor
    public function getInvestorStats(Investor $investor) {
        $totalInvestments = $investor->investments()->count() ?? 0;
        $activeInvestments = $investor->investments()->where('status', 'active')->count() ?? 0;
        $successRate = $totalInvestments > 0 ? ($activeInvestments / $totalInvestments) * 100 : 0;

        return [
            'total_investments' => $totalInvestments,
            'active_investments' => $activeInvestments,
            'success_rate' => round($successRate, 2),
            'experience_years' => $investor->created_at->diffInYears(now())
        ];
    }
}