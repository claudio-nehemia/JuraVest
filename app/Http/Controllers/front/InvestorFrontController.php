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
        $targetPasarList = TargetPasar::all(); // Add this line to get target pasar list
        $listInvestor = Investor::with('user')->get();

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

                return $item;
            });
        } else {
            $scored = $listInvestor->map(function ($item) {
                $item->match_score = 0;
                return $item;
            });
        }

        $sorted = $scored->sortByDesc('match_score')->values();

        Log::info('Urutan:', ['data' => $sorted]);
        

        // Fix: Change the render path to 'front/investor' instead of 'front/wirausaha'
        return Inertia::render('front/investor', [
            'rekomendasi' => $sorted,
            'categories' => $category,
            'targetPasarList' => $targetPasarList // Add this line
        ]);
    }

    public function detail() {
        
    }
}