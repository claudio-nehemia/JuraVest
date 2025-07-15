<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pekerjaan;

class PekerjaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pekerjaanData = [
            ['job' => 'Pelajar/Mahasiswa'],
            ['job' => 'Pegawai Negeri (ASN/TNI/Polri)'],
            ['job' => 'Pegawai Swasta'],
            ['job' => 'Wiraswasta/Pengusaha'],
            ['job' => 'Freelancer/Pekerja Lepas'],
            ['job' => 'Tenaga Medis & Kesehatan'],
            ['job' => 'Tenaga Pengajar / Pendidikan'],
            ['job' => 'Pekerja Sektor Pertanian & Perikanan'],
            ['job' => 'Pekerja Industri & Manufaktur'],
            ['job' => 'Pekerja Ritel & Penjualan'],
            ['job' => 'Pekerja Transportasi & Kurir'],
            ['job' => 'Ibu Rumah Tangga'],
            ['job' => 'Pensiunan'],
            ['job' => 'Tidak Bekerja'],
            ['job' => 'Lainnya'],
];

        foreach($pekerjaanData as $pekerjaan) {
            Pekerjaan::firstOrCreate(['job' => $pekerjaan['job']]);
        }
    }
}
