<?php

namespace Database\Seeders;

use App\Models\Investor;
use App\Models\JenisUsaha;
use App\Models\TargetPasar;
use App\Models\User;
use Illuminate\Database\Seeder;

class InvestorSeeder extends Seeder
{
    public function run(): void
    {
        $jenisUsahaIds = JenisUsaha::pluck('id')->toArray();
        $targetPasarIds = TargetPasar::pluck('id')->toArray();

        $tujuanInvestasiSamples = [
            'Mendukung UMKM lokal',
            'Diversifikasi portofolio',
            'Investasi jangka panjang',
            'Mendukung pertumbuhan bisnis anak muda',
            'Mencari peluang bisnis inovatif',
            'Menanamkan modal di sektor strategis',
            'Mendorong digitalisasi UMKM',
        ];

        // Ambil 15 user pertama yang role-nya "Investor"
        $investorUsers = User::whereHas('role', function ($q) {
            $q->where('role_name', 'Investor');
        })->take(15)->get();

        foreach ($investorUsers as $user) {
            // Random tujuan investasi tanpa faker
            $randomTujuan = $tujuanInvestasiSamples[array_rand($tujuanInvestasiSamples)];
            
            // Random jenis usaha (2-3 item)
            $randomJenisUsaha = [];
            if (!empty($jenisUsahaIds)) {
                $shuffledJenis = $jenisUsahaIds;
                shuffle($shuffledJenis);
                $count = mt_rand(2, min(3, count($jenisUsahaIds)));
                $randomJenisUsaha = array_slice($shuffledJenis, 0, $count);
            }
            
            // Random target pasar (2-3 item)
            $randomTargetPasar = [];
            if (!empty($targetPasarIds)) {
                $shuffledTarget = $targetPasarIds;
                shuffle($shuffledTarget);
                $count = mt_rand(2, min(3, count($targetPasarIds)));
                $randomTargetPasar = array_slice($shuffledTarget, 0, $count);
            }

            Investor::create([
                'nama_investor' => $user->name,
                'user_id' => $user->id,
                'tujuan_investasi' => $randomTujuan,
                'foto_profil' => null,
                'jenis_usaha_invest' => $randomJenisUsaha,
                'target_pasar_invest' => $randomTargetPasar,
            ]);
        }
    }
}