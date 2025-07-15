<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JenisUsaha;

class JenisUsahaSeeder extends Seeder
{
    public function run(): void
    {
        $jenisUsahaList = [
            'Kuliner',
            'Fashion',
            'Teknologi Informasi',
            'Pertanian',
            'Peternakan',
            'Perikanan',
            'Kesehatan',
            'Pendidikan',
            'Kecantikan',
            'Kerajinan',
            'Retail',
            'E-commerce',
            'Transportasi',
            'Otomotif',
            'Properti',
            'Energi Terbarukan',
            'Finansial',
            'Startup Digital',
            'Media & Hiburan',
            'Event Organizer',
            'Konsultan Bisnis',
            'Pakaian Anak',
            'Mainan Edukatif',
            'Lingkungan',
            'Pariwisata',
            'Furniture',
            'Konstruksi',
            'Garmen',
            'Percetakan',
            'Jasa Lainnya',
        ];

        foreach ($jenisUsahaList as $nama) {
            JenisUsaha::create([
                'jenis_usaha' => $nama,
                'icon' => 'icons/seeds.png',
            ]);
        }
    }
}
