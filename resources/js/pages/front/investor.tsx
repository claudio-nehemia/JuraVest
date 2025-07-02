import Navbar from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const investors = [
  {
    nama: 'Alfred',
    email: 'alfred@gmail.com',
    target_pasar_invest: 'Mahasiswa',
    jenis_usaha_invest: 'Makanan',
    tujuan_investasi: 'Memperkaya diri'
  },
  {
    nama: 'Bella',
    email: 'bella@example.com',
    target_pasar_invest: 'Ibu Rumah Tangga',
    jenis_usaha_invest: 'Fashion',
    tujuan_investasi: 'Membantu usaha lokal'
  },
  {
    nama: 'Charles',
    email: 'charles@domain.com',
    target_pasar_invest: 'Remaja',
    jenis_usaha_invest: 'Teknologi',
    tujuan_investasi: 'Inovasi jangka panjang'
  },
  {
    nama: 'Dina',
    email: 'dina@investmail.com',
    target_pasar_invest: 'Pelajar',
    jenis_usaha_invest: 'Edukasi',
    tujuan_investasi: 'Meningkatkan kualitas pendidikan'
  },
  {
    nama: 'Evan',
    email: 'evan@techfund.com',
    target_pasar_invest: 'Pekerja Kantoran',
    jenis_usaha_invest: 'Aplikasi Produktivitas',
    tujuan_investasi: 'Return on investment tinggi'
  },
  {
    nama: 'Fiona',
    email: 'fiona@support.id',
    target_pasar_invest: 'UMKM',
    jenis_usaha_invest: 'Kerajinan Tangan',
    tujuan_investasi: 'Pemberdayaan perempuan'
  },
  {
    nama: 'Gilang',
    email: 'gilang@smartfund.com',
    target_pasar_invest: 'Pelajar dan Mahasiswa',
    jenis_usaha_invest: 'Platform Edukasi',
    tujuan_investasi: 'Misi sosial jangka panjang'
  },
  {
    nama: 'Hana',
    email: 'hana@richlife.org',
    target_pasar_invest: 'Umum',
    jenis_usaha_invest: 'Kesehatan',
    tujuan_investasi: 'Impact investing'
  },
  {
    nama: 'Ivan',
    email: 'ivan@globalventure.com',
    target_pasar_invest: 'Kelas Menengah',
    jenis_usaha_invest: 'Transportasi Online',
    tujuan_investasi: 'Ekspansi internasional'
  },
  {
    nama: 'Julia',
    email: 'julia@greenfuture.net',
    target_pasar_invest: 'Komunitas Hijau',
    jenis_usaha_invest: 'Energi Terbarukan',
    tujuan_investasi: 'Kontribusi untuk lingkungan'
  },
  {
    nama: 'Kevin',
    email: 'kevin@smartinvest.com',
    target_pasar_invest: 'Startup Digital',
    jenis_usaha_invest: 'AI dan Machine Learning',
    tujuan_investasi: 'Mengembangkan teknologi'
  },
  {
    nama: 'Lina',
    email: 'lina@creativemind.com',
    target_pasar_invest: 'Seniman Muda',
    jenis_usaha_invest: 'Kreatif & Digital',
    tujuan_investasi: 'Menghidupkan karya lokal'
  },
  {
    nama: 'Michael',
    email: 'michael@investasia.co',
    target_pasar_invest: 'Pasar Asia Tenggara',
    jenis_usaha_invest: 'E-commerce',
    tujuan_investasi: 'Dominasi pasar'
  },
  {
    nama: 'Nina',
    email: 'nina@eduimpact.org',
    target_pasar_invest: 'Sekolah Dasar',
    jenis_usaha_invest: 'Pendidikan Anak',
    tujuan_investasi: 'Impact jangka panjang'
  },
  {
    nama: 'Oscar',
    email: 'oscar@cryptoangel.io',
    target_pasar_invest: 'Investor Kripto',
    jenis_usaha_invest: 'Web3 & Blockchain',
    tujuan_investasi: 'Explorasi teknologi baru'
  },
  {
    nama: 'Putri',
    email: 'putri@beautyangel.com',
    target_pasar_invest: 'Wanita Usia 20-35',
    jenis_usaha_invest: 'Kosmetik',
    tujuan_investasi: 'Mendorong kecantikan lokal'
  }
];

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-16">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-orange-600">
            Cari Investor Yang Cocok Denganmu
        </h1>

        <div className="space-y-6">
          {investors.map((investor, index) => (
            <Card
              key={investor.email}
              className="group w-full border-none bg-gradient-to-r from-orange-100 to-amber-200 shadow-md rounded-2xl hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="flex-1">
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-2xl font-bold text-orange-800">
                      {investor.nama}
                    </CardTitle>
                    <CardDescription className="text-orange-600">
                      {investor.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 text-gray-700 text-sm space-y-2">
                    <p>
                      <strong className="text-orange-700">🎯 Target Pasar:</strong> {investor.target_pasar_invest}
                    </p>
                    <p>
                      <strong className="text-orange-700">🏬 Jenis Usaha:</strong> {investor.jenis_usaha_invest}
                    </p>
                    <p>
                      <strong className="text-orange-700">💡 Tujuan Investasi:</strong> {investor.tujuan_investasi}
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
