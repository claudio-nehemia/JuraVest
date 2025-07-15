<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TargetPasar;

class TargetPasarSeeder extends Seeder
{
    public function run(): void
    {
        $targetPasarList = [
            'Pelajar',
            'Mahasiswa',
            'Ibu Rumah Tangga',
            'Profesional Muda',
            'Karyawan Swasta',
            'Pensiunan',
            'Anak-anak',
            'Remaja',
            'Lansia',
            'Petani',
            'Peternak',
            'Nelayan',
            'Komunitas Muslim',
            'Pekerja Kreatif',
            'Difabel',
            'UMKM',
            'Startup Founder',
            'Investor Pemula',
            'Wirausahawan',
            'Pecinta Lingkungan',
            'Komunitas Hobi',
            'Komunitas Game',
            'Komunitas Otomotif',
            'Content Creator',
            'Influencer',
            'Freelancer',
            'Komunitas Budaya',
            'Orang Tua Anak Usia Dini',
            'Pengusaha Ritel',
            'Komunitas Teknologi',
        ];

        foreach ($targetPasarList as $name) {
            TargetPasar::create([
                'target_pasar' => $name,
                'icon' => 'target_icons/seeds.png',
            ]);
        }
    }
}
