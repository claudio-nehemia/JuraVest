<?php

namespace Database\Seeders;

use App\Models\Wirausaha;
use App\Models\User;
use App\Models\JenisUsaha;
use App\Models\TargetPasar;
use Illuminate\Database\Seeder;

class WirausahaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil user dengan role_id 2 (Wirausaha)
        $users = User::where('role_id', 2)->get()->shuffle()->values();
        
        $totalWirausaha = 30; // total dari $usahaBaru (15) + $usahaOngoing (15)
        if ($users->count() < $totalWirausaha) {
            throw new \Exception("Jumlah user dengan role_id 2 kurang dari $totalWirausaha. Sekarang cuma ada {$users->count()}.");
        }
        // Ambil jenis usaha dan target pasar
        $jenisUsahas = JenisUsaha::all();
        $targetPasars = TargetPasar::all();

        // Data Usaha Baru (15 data)
        $usahaBaru = [
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Warung Makan Sederhana',
                'deskripsi' => 'Warung makan yang menyediakan makanan sehat dan bergizi dengan harga terjangkau, fokus pada menu tradisional Indonesia.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Kuliner')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Karyawan Swasta')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Jakarta Selatan',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Dana akan dialokasikan untuk sewa tempat, peralatan dapur, bahan baku awal, dan modal kerja selama 6 bulan pertama',
                    'perkiraan_dana' => 75000000,
                    'latar_belakang' => 'Memiliki pengalaman memasak sejak kecil dan ingin mengembangkan bisnis kuliner yang fokus pada makanan sehat dan bergizi dengan harga terjangkau',
                    'kebutuhan_dana' => 75000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Boutique Fashion Muslimah',
                'deskripsi' => 'Butik yang menyediakan busana muslim modern yang syar\'i dengan desain elegan dan trendy.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Fashion')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Komunitas Muslim')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Jakarta Selatan',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Modal untuk membeli bahan kain berkualitas, mesin jahit, sewa tempat usaha, dan gaji karyawan',
                    'perkiraan_dana' => 50000000,
                    'latar_belakang' => 'Lulusan fashion design dengan passion di bidang busana muslim modern yang syar\'i dan trendy',
                    'kebutuhan_dana' => 50000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Aplikasi Belajar Online',
                'deskripsi' => 'Platform belajar online interaktif dengan konten pendidikan yang menarik untuk pelajar.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Teknologi Informasi')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Pelajar')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Surabaya',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Pengembangan aplikasi, server hosting, marketing digital, dan tim developer',
                    'perkiraan_dana' => 100000000,
                    'latar_belakang' => 'Background IT dengan pengalaman sebagai software developer, melihat kebutuhan platform belajar yang interaktif',
                    'kebutuhan_dana' => 100000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Toko Sayuran Organik',
                'deskripsi' => 'Toko yang menyediakan sayuran organik segar langsung dari petani lokal dengan kualitas terjamin.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Pertanian')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Ibu Rumah Tangga')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Yogyakarta',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Sewa lahan, bibit organik, pupuk organik, peralatan pertanian, dan packaging',
                    'perkiraan_dana' => 30000000,
                    'latar_belakang' => 'Concern terhadap kesehatan dan lingkungan, ingin menyediakan sayuran organik berkualitas tinggi',
                    'kebutuhan_dana' => 30000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Ternak Ayam Kampung',
                'deskripsi' => 'Peternakan ayam kampung dengan sistem kandang organik untuk menghasilkan telur dan daging berkualitas.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Peternakan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Pengusaha Ritel')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Malang',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Pembangunan kandang, bibit ayam, pakan, vitamin, dan peralatan peternakan',
                    'perkiraan_dana' => 40000000,
                    'latar_belakang' => 'Memiliki lahan kosong yang cocok untuk ternak dan pengalaman dalam bidang peternakan',
                    'kebutuhan_dana' => 40000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Klinik Kecantikan Natural',
                'deskripsi' => 'Klinik kecantikan yang menggunakan bahan alami untuk perawatan wajah dan tubuh.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Kecantikan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Profesional Muda')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Denpasar',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Peralatan kecantikan, produk skincare, sewa tempat, dan training karyawan',
                    'perkiraan_dana' => 80000000,
                    'latar_belakang' => 'Lulusan cosmetology dengan sertifikat internasional, fokus pada perawatan kecantikan alami',
                    'kebutuhan_dana' => 80000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Kerajinan Bambu Unik',
                'deskripsi' => 'Produksi kerajinan bambu ramah lingkungan dengan desain unik untuk dekorasi rumah.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Kerajinan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Pecinta Lingkungan')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Solo',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Bahan baku bambu, peralatan kerajinan, workshop, dan pemasaran online',
                    'perkiraan_dana' => 25000000,
                    'latar_belakang' => 'Seniman lokal dengan keahlian mengolah bambu menjadi produk bernilai tinggi',
                    'kebutuhan_dana' => 25000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Minimarket Digital',
                'deskripsi' => 'Minimarket modern dengan sistem digital untuk pembayaran dan inventarisasi.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Retail')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'UMKM')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Semarang',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Sistem POS, inventory awal, rak-rak, dan sistem pembayaran digital',
                    'perkiraan_dana' => 60000000,
                    'latar_belakang' => 'Pengalaman di retail modern dan melihat peluang digitalisasi minimarket tradisional',
                    'kebutuhan_dana' => 60000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Jasa Konsultasi Bisnis',
                'deskripsi' => 'Layanan konsultasi untuk membantu UMKM dan startup mengembangkan strategi bisnis.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Konsultan Bisnis')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Startup Founder')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Jakarta',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Office setup, marketing, sertifikasi, dan pengembangan metodologi konsultasi',
                    'perkiraan_dana' => 35000000,
                    'latar_belakang' => 'MBA dengan pengalaman 10 tahun di corporate strategy, ingin membantu UMKM berkembang',
                    'kebutuhan_dana' => 35000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Mainan Edukatif Anak',
                'deskripsi' => 'Produksi mainan edukatif berbahan kayu yang aman dan mendukung perkembangan anak.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Mainan Edukatif')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Orang Tua Anak Usia Dini')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Medan',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Bahan baku kayu, cat non-toxic, desain produk, dan packaging ramah lingkungan',
                    'perkiraan_dana' => 45000000,
                    'latar_belakang' => 'Lulusan pendidikan anak usia dini dengan passion membuat mainan edukatif yang aman',
                    'kebutuhan_dana' => 45000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Eco-Friendly Cleaning',
                'deskripsi' => 'Produk pembersih ramah lingkungan yang aman untuk keluarga dan lingkungan.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Lingkungan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Ibu Rumah Tangga')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Bogor',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Riset formula, bahan baku organik, packaging, dan registrasi produk',
                    'perkiraan_dana' => 55000000,
                    'latar_belakang' => 'Ahli kimia yang peduli lingkungan dan ingin menciptakan produk pembersih yang aman',
                    'kebutuhan_dana' => 55000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Wisata Edukasi Desa',
                'deskripsi' => 'Destinasi wisata edukasi yang mengenalkan budaya dan kehidupan desa kepada pengunjung.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Pariwisata')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Mahasiswa')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Magelang',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Pengembangan fasilitas wisata, pelatihan guide, marketing, dan infrastruktur pendukung',
                    'perkiraan_dana' => 70000000,
                    'latar_belakang' => 'Anak desa yang ingin mengembangkan potensi wisata lokal dengan nilai edukasi',
                    'kebutuhan_dana' => 70000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Furniture Minimalis',
                'deskripsi' => 'Produksi furniture minimalis dengan desain modern dan harga terjangkau.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Furniture')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Profesional Muda')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Jepara',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Kayu berkualitas, peralatan woodworking, showroom, dan tim craftsman',
                    'perkiraan_dana' => 90000000,
                    'latar_belakang' => 'Desainer interior dengan visi menciptakan furniture berkualitas tinggi dengan harga terjangkau',
                    'kebutuhan_dana' => 90000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Percetakan Digital Modern',
                'deskripsi' => 'Layanan percetakan digital dengan kualitas tinggi dan waktu pengerjaan cepat.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Percetakan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Content Creator')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Bekasi',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Mesin cetak digital, komputer desain, software, dan bahan cetak berkualitas',
                    'perkiraan_dana' => 65000000,
                    'latar_belakang' => 'Graphic designer dengan pengalaman di industri percetakan, fokus pada layanan digital printing',
                    'kebutuhan_dana' => 65000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Layanan Freelancer Hub',
                'deskripsi' => 'Platform yang menghubungkan freelancer dengan klien untuk berbagai proyek jasa.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Jasa Lainnya')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Freelancer')->first()->id,
                'tipe_usaha' => 'Usaha Baru',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_baru' => [
                    'rencana_lokasi_operasional' => 'Tangerang',
                    'rencana_mulai_usaha' => '2025',
                    'alokasi_dana' => 'Platform development, co-working space, marketing, dan training program',
                    'perkiraan_dana' => 85000000,
                    'latar_belakang' => 'Freelancer berpengalaman yang ingin membangun ekosistem untuk para freelancer Indonesia',
                    'kebutuhan_dana' => 85000000
                ]
            ]
        ];

        // Data Usaha Ongoing (15 data)
        $usahaOngoing = [
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Bakso Malang Asli',
                'deskripsi' => 'Warung bakso khas Malang dengan cita rasa otentik dan pelayanan cepat.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Kuliner')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Karyawan Swasta')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Jakarta Pusat',
                    'tahun_berdiri' => '2020',
                    'jumlah_karyawan' => '8',
                    'estimasi_omzet' => 35000000,
                    'biaya_operasional' => 20000000,
                    'rencana_penggunaan_dana' => 'Ekspansi ke cabang kedua, upgrade peralatan dapur, dan penambahan menu baru',
                    'proyeksi_usaha' => 'Target membuka 3 cabang dalam 2 tahun dengan peningkatan omzet 200%',
                    'media_social' => '@baksomalangasli_jkt',
                    'kebutuhan_dana' => 50000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Distro Streetwear',
                'deskripsi' => 'Toko pakaian streetwear dengan desain unik yang mengikuti tren anak muda.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Fashion')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Remaja')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Bandung',
                    'tahun_berdiri' => '2019',
                    'jumlah_karyawan' => '12',
                    'estimasi_omzet' => 45000000,
                    'biaya_operasional' => 25000000,
                    'rencana_penggunaan_dana' => 'Pengembangan brand sendiri, investasi mesin sablon, dan ekspansi online',
                    'proyeksi_usaha' => 'Menjadi brand lokal terkemuka dengan penjualan online nasional',
                    'media_social' => '@distro_streetwear_bdg',
                    'kebutuhan_dana' => 60000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Software House Digital',
                'deskripsi' => 'Perusahaan pengembangan perangkat lunak yang menyediakan solusi IT untuk UMKM.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Teknologi Informasi')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'UMKM')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Surabaya',
                    'tahun_berdiri' => '2021',
                    'jumlah_karyawan' => '15',
                    'estimasi_omzet' => 80000000,
                    'biaya_operasional' => 50000000,
                    'rencana_penggunaan_dana' => 'Rekrutmen developer senior, upgrade infrastruktur, dan pengembangan produk SaaS',
                    'proyeksi_usaha' => 'Menjadi software house terdepan di Jawa Timur dengan klien korporat',
                    'media_social' => '@softwarehouse_digital',
                    'kebutuhan_dana' => 100000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Hidroponik Modern',
                'deskripsi' => 'Budidaya sayuran hidroponik dengan teknologi modern untuk hasil berkualitas tinggi.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Pertanian')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Ibu Rumah Tangga')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Yogyakarta',
                    'tahun_berdiri' => '2022',
                    'jumlah_karyawan' => '6',
                    'estimasi_omzet' => 25000000,
                    'biaya_operasional' => 15000000,
                    'rencana_penggunaan_dana' => 'Perluasan greenhouse, sistem otomasi, dan pengembangan supply chain',
                    'proyeksi_usaha' => 'Menjadi supplier utama sayuran organik untuk hotel dan restoran',
                    'media_social' => '@hidroponik_modern_yogya',
                    'kebutuhan_dana' => 35000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Peternakan Kambing Etawa',
                'deskripsi' => 'Peternakan kambing Etawa yang menghasilkan susu dan produk olahan berkualitas.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Peternakan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Pecinta Lingkungan')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Malang',
                    'tahun_berdiri' => '2018',
                    'jumlah_karyawan' => '10',
                    'estimasi_omzet' => 40000000,
                    'biaya_operasional' => 22000000,
                    'rencana_penggunaan_dana' => 'Penambahan kandang, pembibitan unggul, dan pengolahan susu modern',
                    'proyeksi_usaha' => 'Ekspansi ke produk olahan susu dan wisata peternakan',
                    'media_social' => '@kambing_etawa_malang',
                    'kebutuhan_dana' => 50000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Budidaya Ikan Lele',
                'deskripsi' => 'Budidaya ikan lele dengan sistem modern untuk memenuhi kebutuhan pasar lokal.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Perikanan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Pengusaha Ritel')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Purwokerto',
                    'tahun_berdiri' => '2020',
                    'jumlah_karyawan' => '5',
                    'estimasi_omzet' => 30000000,
                    'biaya_operasional' => 18000000,
                    'rencana_penggunaan_dana' => 'Upgrade sistem aerasi, penambahan kolam, dan pengolahan pakan mandiri',
                    'proyeksi_usaha' => 'Menjadi supplier utama ikan lele untuk pasar tradisional dan modern',
                    'media_social' => '@budidaya_lele_purwokerto',
                    'kebutuhan_dana' => 40000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Klinik Gigi Keluarga',
                'deskripsi' => 'Klinik gigi dengan layanan lengkap untuk keluarga, termasuk perawatan dan orthodonti.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Kesehatan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Profesional Muda')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Denpasar',
                    'tahun_berdiri' => '2019',
                    'jumlah_karyawan' => '8',
                    'estimasi_omzet' => 60000000,
                    'biaya_operasional' => 35000000,
                    'rencana_penggunaan_dana' => 'Peralatan dental modern, ekspansi layanan orthodonti, dan marketing digital',
                    'proyeksi_usaha' => 'Membuka cabang kedua dan layanan spesialis gigi anak',
                    'media_social' => '@klinik_gigi_keluarga_dps',
                    'kebutuhan_dana' => 70000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Bimbel Online Smart',
                'deskripsi' => 'Platform bimbingan belajar online dengan metode interaktif untuk pelajar SD hingga SMA.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Pendidikan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Pelajar')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Solo',
                    'tahun_berdiri' => '2021',
                    'jumlah_karyawan' => '20',
                    'estimasi_omzet' => 55000000,
                    'biaya_operasional' => 30000000,
                    'rencana_penggunaan_dana' => 'Pengembangan platform AI, konten multimedia, dan ekspansi ke daerah',
                    'proyeksi_usaha' => 'Menjadi platform bimbel online terbesar di Indonesia Tengah',
                    'media_social' => '@bimbel_online_smart',
                    'kebutuhan_dana' => 65000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Salon Kecantikan Alami',
                'deskripsi' => 'Salon yang menggunakan produk alami untuk perawatan rambut dan kulit.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Kecantikan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Ibu Rumah Tangga')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Semarang',
                    'tahun_berdiri' => '2020',
                    'jumlah_karyawan' => '12',
                    'estimasi_omzet' => 38000000,
                    'biaya_operasional' => 22000000,
                    'rencana_penggunaan_dana' => 'Peralatan kecantikan terbaru, produk organik, dan pelatihan staff',
                    'proyeksi_usaha' => 'Franchise ke 5 kota besar dengan standar layanan premium',
                    'media_social' => '@salon_kecantikan_alami',
                    'kebutuhan_dana' => 50000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Kerajinan Kulit Handmade',
                'deskripsi' => 'Produksi kerajinan kulit handmade seperti tas dan dompet dengan kualitas premium.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Kerajinan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Profesional Muda')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Garut',
                    'tahun_berdiri' => '2018',
                    'jumlah_karyawan' => '15',
                    'estimasi_omzet' => 50000000,
                    'biaya_operasional' => 28000000,
                    'rencana_penggunaan_dana' => 'Mesin modern, bahan kulit premium, dan ekspansi ke pasar internasional',
                    'proyeksi_usaha' => 'Menjadi brand kulit Indonesia yang dikenal di ASEAN',
                    'media_social' => '@kerajinan_kulit_garut',
                    'kebutuhan_dana' => 60000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Minimarket Sejahtera',
                'deskripsi' => 'Minimarket yang menyediakan kebutuhan sehari-hari dengan harga kompetitif.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Retail')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Ibu Rumah Tangga')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Bekasi',
                    'tahun_berdiri' => '2019',
                    'jumlah_karyawan' => '7',
                    'estimasi_omzet' => 65000000,
                    'biaya_operasional' => 45000000,
                    'rencana_penggunaan_dana' => 'Upgrade sistem kasir digital, penambahan produk organik, dan ekspansi ke delivery',
                    'proyeksi_usaha' => 'Membuka 2 cabang baru dan mengembangkan sistem franchise',
                    'media_social' => '@minimarket_sejahtera',
                    'kebutuhan_dana' => 70000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Konsultan Bisnis Pro',
                'deskripsi' => 'Layanan konsultasi bisnis profesional untuk membantu UMKM meningkatkan performa.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Konsultan Bisnis')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'UMKM')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Jakarta',
                    'tahun_berdiri' => '2020',
                    'jumlah_karyawan' => '12',
                    'estimasi_omzet' => 70000000,
                    'biaya_operasional' => 40000000,
                    'rencana_penggunaan_dana' => 'Sertifikasi internasional, platform konsultasi online, dan rekrutmen konsultan senior',
                    'proyeksi_usaha' => 'Menjadi konsultan bisnis terkemuka dengan layanan digital di seluruh Indonesia',
                    'media_social' => '@konsultan_bisnis_pro',
                    'kebutuhan_dana' => 80000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Workshop Mainan Kayu',
                'deskripsi' => 'Workshop yang memproduksi mainan kayu edukatif dengan desain kreatif dan aman.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Mainan Edukatif')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Orang Tua Anak Usia Dini')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Medan',
                    'tahun_berdiri' => '2021',
                    'jumlah_karyawan' => '9',
                    'estimasi_omzet' => 42000000,
                    'biaya_operasional' => 25000000,
                    'rencana_penggunaan_dana' => 'Mesin CNC untuk presisi tinggi, sertifikasi SNI, dan ekspansi ke pasar ekspor',
                    'proyeksi_usaha' => 'Menjadi brand mainan edukatif Indonesia yang dikenal di ASEAN',
                    'media_social' => '@workshop_mainan_kayu',
                    'kebutuhan_dana' => 55000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Green Cleaning Solutions',
                'deskripsi' => 'Produk pembersih ramah lingkungan untuk rumah tangga dan bisnis.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Lingkungan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Pecinta Lingkungan')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Bogor',
                    'tahun_berdiri' => '2022',
                    'jumlah_karyawan' => '6',
                    'estimasi_omzet' => 32000000,
                    'biaya_operasional' => 20000000,
                    'rencana_penggunaan_dana' => 'Riset produk baru, sertifikasi organik, dan ekspansi ke hotel dan restoran',
                    'proyeksi_usaha' => 'Menjadi pelopor produk pembersih ramah lingkungan di Indonesia',
                    'media_social' => '@green_cleaning_solutions',
                    'kebutuhan_dana' => 40000000
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'nama_usaha' => 'Percetakan Express 24',
                'deskripsi' => 'Layanan percetakan cepat dengan teknologi digital untuk berbagai kebutuhan.',
                'jenis_usaha_id' => $jenisUsahas->where('jenis_usaha', 'Percetakan')->first()->id,
                'target_pasar_id' => $targetPasars->where('target_pasar', 'Content Creator')->first()->id,
                'tipe_usaha' => 'Usaha Ongoing',
                'foto_profil' => 'wirausahas/seeds.png',
                'usaha_ongoing' => [
                    'lokasi_operasional' => 'Tangerang',
                    'tahun_berdiri' => '2020',
                    'jumlah_karyawan' => '11',
                    'estimasi_omzet' => 48000000,
                    'biaya_operasional' => 28000000,
                    'rencana_penggunaan_dana' => 'Mesin digital printing UV, layanan print on demand, dan sistem order online',
                    'proyeksi_usaha' => 'Menjadi percetakan digital terdepan dengan layanan 24 jam di Jabodetabek',
                    'media_social' => '@percetakan_express24',
                    'kebutuhan_dana' => 60000000
                ]
            ]
        ];

        // Assign user_id ke setiap usahaBaru
        foreach ($usahaBaru as $index => &$data) {
            $data['user_id'] = $users[$index]->id;
        }

        // Assign user_id ke setiap usahaOngoing
        foreach ($usahaOngoing as $index => &$data) {
            $data['user_id'] = $users[$index + count($usahaBaru)]->id;
        }

        // Buat data untuk usaha baru
        foreach ($usahaBaru as $data) {
            Wirausaha::create([
                'user_id' => $data['user_id'],
                'nama_usaha' => $data['nama_usaha'],
                'deskripsi' => $data['deskripsi'],
                'jenis_usaha_id' => $data['jenis_usaha_id'],
                'target_pasar_id' => $data['target_pasar_id'],
                'tipe_usaha' => $data['tipe_usaha'],
                'foto_profil' => $data['foto_profil'],
                'usaha_baru' => $data['usaha_baru'],
                'usaha_ongoing' => null,
            ]);
        }

        // Buat data untuk usaha ongoing
        foreach ($usahaOngoing as $data) {
            Wirausaha::create([
                'user_id' => $data['user_id'],
                'nama_usaha' => $data['nama_usaha'],
                'deskripsi' => $data['deskripsi'],
                'jenis_usaha_id' => $data['jenis_usaha_id'],
                'target_pasar_id' => $data['target_pasar_id'],
                'tipe_usaha' => $data['tipe_usaha'],
                'foto_profil' => $data['foto_profil'],
                'usaha_baru' => null,
                'usaha_ongoing' => $data['usaha_ongoing'],
            ]);
        }
    }
}