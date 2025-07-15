<?php

namespace App\Http\Controllers\front;

use Inertia\Inertia;
use App\Models\Wirausaha;
use App\Models\JenisUsaha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class WirausahaFrontController extends Controller
{
    
    public function index() {
        $user = Auth::user();
        $investor = $user->investor;
        $wirausaha = $user->wirausaha;
        $category = JenisUsaha::all();

        $listWirausaha = Wirausaha::with(['jenis_usaha', 'target_pasar', 'user'])->get();

        if ($investor) {
            $jenisUsaha = $investor->jenis_usaha_invest;
            $targetPasar = $investor->target_pasar_invest;

            $scored = $listWirausaha->map(function ($item) use($jenisUsaha, $targetPasar) {
                $score = 0;

                if (in_array($item->jenis_usaha_id, $jenisUsaha)) {
                    $score += 1;
                }

                if (in_array($item->target_pasar_id, $targetPasar)) {
                    $score += 1;
                }

                $item->match_score = $score;

                return $item;
            });

        } elseif ($wirausaha) {
            $jenisUsaha = $wirausaha->jenis_usaha_id;
            $targetPasar = $wirausaha->target_pasar_id;

            $scored = $listWirausaha->map(function ($item) use($jenisUsaha, $targetPasar) {
                $score = 0;

                if ($item->jenis_usaha_id == $jenisUsaha) {
                    $score += 1;
                }

                if ($item->target_pasar_id == $targetPasar) {
                    $score += 1;
                }

                $item->match_score = $score;

                return $item;
            });
        } else {
            // default tanpa skor
            $scored = $listWirausaha->map(function ($item) {
                $item->match_score = 0;
                return $item;
            });
        }

        $sorted = $scored->sortByDesc('match_score')->values();

        return Inertia::render('front/wirausaha', [
            'rekomendasi' => $sorted,
            'categories' => $category
        ]);
    }

}
