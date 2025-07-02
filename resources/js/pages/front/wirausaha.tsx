import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Search, Filter, MapPin, Star, Users } from 'lucide-react';
import Navbar from '@/components/navbar';

const pengusahas = [
  {
    nama: 'Toko Pak Bejo',
    foto: 'bejo.png',
    deskripsi: 'Toko ini adalah toko makanan enak nomor 1 di Indonesia, namun sedang membutuhkan dana darurat',
    kategori: 'Kuliner',
    color: 'from-orange-400 to-red-500',
    rating: 4.8,
    lokasi: 'Jakarta'
  },
  {
    nama: 'Toko Ibu Nani',
    foto: 'nani.png',
    deskripsi: 'Toko ini adalah toko bangunan nomor 1 di Indonesia, tetapi barang-barang material bangunannya hilang dimakan harimau',
    kategori: 'Bangunan',
    color: 'from-blue-400 to-purple-500',
    rating: 4.5,
    lokasi: 'Surabaya'
  },
  {
    nama: 'Toko Bapak Solihin',
    foto: 'solihin.png',
    deskripsi: 'Toko ini adalah toko buah terbaik di Samarinda, namun buah-buah yang dijual dicuri oleh monyet sehingga dia kehilangan aset',
    kategori: 'Buah-buahan',
    color: 'from-green-400 to-emerald-500',
    rating: 4.7,
    lokasi: 'Samarinda'
  },
  {
    nama: 'Toko Amerika',
    foto: 'amerika.png',
    deskripsi: 'Toko ini adalah toko senjata terbaik di jagat raya, pernah menghancurkan bulan di planet Mars',
    kategori: 'Persenjataan',
    color: 'from-gray-400 to-gray-600',
    rating: 4.9,
    lokasi: 'Mars'
  },
  {
    nama: 'Toko Kopi Mas Rian',
    foto: 'kopi.png',
    deskripsi: 'Toko kopi legendaris yang kabarnya bisa bikin kamu sadar dari mantan',
    kategori: 'Minuman',
    color: 'from-yellow-400 to-orange-400',
    rating: 4.6,
    lokasi: 'Bandung'
  },
  {
    nama: 'Toko Jamu Jeng Dewi',
    foto: 'jamu.png',
    deskripsi: 'Jual jamu dengan resep turun-temurun, bisa menyembuhkan patah hati katanya',
    kategori: 'Kesehatan',
    color: 'from-green-200 to-green-500',
    rating: 4.4,
    lokasi: 'Yogyakarta'
  },
  {
    nama: 'Toko Kayu Mbah Slamet',
    foto: 'kayu.png',
    deskripsi: 'Menjual berbagai jenis kayu tua mistis yang katanya bisa usir tuyul',
    kategori: 'Material',
    color: 'from-amber-600 to-yellow-700',
    rating: 4.3,
    lokasi: 'Solo'
  },
  {
    nama: 'Toko Elektronik Pak Elon',
    foto: 'elon.png',
    deskripsi: 'Menjual barang elektronik bekas luar angkasa, katanya bekas satelit jatuh',
    kategori: 'Teknologi',
    color: 'from-sky-500 to-indigo-500',
    rating: 4.8,
    lokasi: 'Batam'
  },
  {
    nama: 'Toko Fashion Mbak Cici',
    foto: 'fashion.png',
    deskripsi: 'Fashion kekinian untuk kamu yang ingin tampil kece saat rebahan',
    kategori: 'Fashion',
    color: 'from-pink-400 to-rose-500',
    rating: 4.5,
    lokasi: 'Jakarta'
  },
  {
    nama: 'Toko Mainan Pak Toy',
    foto: 'toys.png',
    deskripsi: 'Jual mainan edukatif dari masa kecil generasi 90-an hingga generasi sekarang',
    kategori: 'Mainan',
    color: 'from-yellow-300 to-orange-500',
    rating: 4.7,
    lokasi: 'Malang'
  },
  {
    nama: 'Toko Buku Bang Rizal',
    foto: 'buku.png',
    deskripsi: 'Toko buku langka yang menyimpan buku-buku dari dimensi lain',
    kategori: 'Pendidikan',
    color: 'from-indigo-400 to-indigo-600',
    rating: 4.9,
    lokasi: 'Medan'
  },
  {
    nama: 'Toko Keramik Tante Meli',
    foto: 'keramik.png',
    deskripsi: 'Menjual keramik antik dari peradaban kuno yang bisa ngobrol kalau malam',
    kategori: 'Dekorasi',
    color: 'from-gray-200 to-gray-400',
    rating: 4.2,
    lokasi: 'Bali'
  },
  {
    nama: 'Toko Petualangan Pak Rimba',
    foto: 'rimba.png',
    deskripsi: 'Jual perlengkapan survival yang katanya dipakai waktu ekspedisi Atlantis',
    kategori: 'Outdoor',
    color: 'from-lime-400 to-lime-600',
    rating: 4.6,
    lokasi: 'Balikpapan'
  },
  {
    nama: 'Toko Musik Bang Reza',
    foto: 'musik.png',
    deskripsi: 'Toko alat musik lengkap, dari ukulele hingga harpa mistik',
    kategori: 'Musik',
    color: 'from-purple-300 to-purple-600',
    rating: 4.8,
    lokasi: 'Semarang'
  },
  {
    nama: 'Toko Gadget Kak Nova',
    foto: 'gadget.png',
    deskripsi: 'Tempat nongkrongnya gadget-gadget canggih yang belum rilis di Bumi',
    kategori: 'Gadget',
    color: 'from-cyan-400 to-teal-500',
    rating: 4.9,
    lokasi: 'Jakarta'
  },
  {
    nama: 'Toko Game Pak Developer',
    foto: 'game.png',
    deskripsi: 'Jual game legal dan ilegal, bahkan ada game simulasi dunia nyata',
    kategori: 'Hiburan',
    color: 'from-red-400 to-red-600',
    rating: 4.7,
    lokasi: 'Tangerang'
  },
  {
    nama: 'Toko Kue Tante Rara',
    foto: 'kue.png',
    deskripsi: 'Kue buatan tangan langsung dari oven neraka, tapi manis banget kok!',
    kategori: 'Kuliner',
    color: 'from-pink-300 to-red-400',
    rating: 4.5,
    lokasi: 'Bogor'
  },
  {
    nama: 'Toko Tanaman Mas Ucup',
    foto: 'tanaman.png',
    deskripsi: 'Tanaman hias yang bisa gerak sendiri kalau dikasih lagu dangdut',
    kategori: 'Hobi',
    color: 'from-green-300 to-lime-400',
    rating: 4.4,
    lokasi: 'Depok'
  },
  {
    nama: 'Toko Motor Pak Rossi',
    foto: 'motor.png',
    deskripsi: 'Menjual motor bekas balapan MotoGP, lengkap dengan bekas bannya',
    kategori: 'Otomotif',
    color: 'from-red-500 to-yellow-500',
    rating: 4.8,
    lokasi: 'Bekasi'
  },
  {
    nama: 'Toko Furniture Bang Jack',
    foto: 'furniture.png',
    deskripsi: 'Furniture handmade dari kayu langka yang katanya bisa bicara saat hujan',
    kategori: 'Perabot',
    color: 'from-amber-300 to-orange-600',
    rating: 4.6,
    lokasi: 'Cirebon'
  },
  {
    nama: 'Toko Sihir Bu Maya',
    foto: 'sihir.png',
    deskripsi: 'Jual ramuan, mantra, dan sapu terbang edisi terbatas',
    kategori: 'Mistis',
    color: 'from-purple-800 to-indigo-900',
    rating: 4.9,
    lokasi: 'Dimensi Lain'
  }
];

const categories = ['Semua', ...Array.from(new Set(pengusahas.map(p => p.kategori)))];

const animationStyles = `
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .slide-in-left {
    animation: slideInLeft 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .fade-in-scale {
    animation: fadeInScale 0.4s ease-out forwards;
  }
  
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

export default function Wirausaha() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredPengusahas = useMemo(() => {
    return pengusahas.filter(usaha => {
      const matchesSearch = usaha.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           usaha.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           usaha.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || usaha.kategori === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
    <Navbar/>
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-8 fade-in-scale">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent mb-6">
              Galeri Wirausaha 🚀
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Temukan dan dukung para pengusaha dengan ide-ide unik dan cerita menakjubkan di seluruh nusantara
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari toko, kategori, atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Filter className="text-gray-400 h-5 w-5 mt-2" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-400 text-lg">
              Menampilkan <span className="text-purple-400 font-bold">{filteredPengusahas.length}</span> wirausaha
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="space-y-8">
          {filteredPengusahas.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">Tidak Ada Hasil</h3>
              <p className="text-gray-400">Coba ubah kata kunci pencarian atau filter kategori</p>
            </div>
          ) : (
            filteredPengusahas.map((usaha, index) => (
              <Card
                key={`${usaha.nama}-${index}`}
                className={`
                  group overflow-hidden border-none
                  bg-gradient-to-r ${usaha.color} 
                  shadow-2xl transition-all duration-500 ease-out
                  hover:shadow-purple-500/25 hover:-translate-y-1
                  slide-in-left rounded-3xl
                `}
                style={{ 
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative md:w-80 h-64 md:h-auto flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-black/20 to-black/40 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                        <div className="text-6xl">🏪</div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 glass-effect px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-semibold">{usaha.kategori}</span>
                    </div>
                    <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-bold">{usaha.rating}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-3xl font-bold text-white group-hover:text-yellow-200 transition-colors">
                          {usaha.nama}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-white/80">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{usaha.lokasi}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0 mb-6">
                      <p className="text-white/90 text-lg leading-relaxed mb-4">
                        {usaha.deskripsi}
                      </p>
                      
                      <div className="flex items-center gap-4 text-white/70">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">100+ Pelanggan</span>
                        </div>
                        <div className="h-4 w-px bg-white/30"></div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm">Aktif Hari Ini</span>
                        </div>
                      </div>
                    </CardContent>

                    <div className="flex items-center justify-between">
                      <button className="group/btn bg-white/20 hover:bg-white/30 px-8 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 text-white font-semibold backdrop-blur-sm border border-white/30">
                        Lihat Detail
                        <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                      
                      <div className="flex gap-2">
                        <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30">
                          <span className="text-white text-lg">💬</span>
                        </button>
                        <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30">
                          <span className="text-white text-lg">❤️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}