<?php

namespace Database\Seeders;

use App\Models\Investor;
use App\Models\JenisUsaha;
use App\Models\TargetPasar;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;


class InvestorSeeder extends Seeder
{
    public function run(): void
    {
        $jenisUsahaIds = JenisUsaha::pluck('id')->toArray();
        $targetPasarIds = TargetPasar::pluck('id')->toArray();
        $faker = Faker::create();

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
            Investor::create([
                'nama_investor' => $user->name,
                'user_id' => $user->id,
                'tujuan_investasi' => $faker->randomElement($tujuanInvestasiSamples),
                'foto_profil' => null,
                'jenis_usaha_invest' => $faker->randomElements($jenisUsahaIds, rand(2, 3)),
                'target_pasar_invest' => $faker->randomElements($targetPasarIds, rand(2, 3)),
            ]);
        }
    }
}
