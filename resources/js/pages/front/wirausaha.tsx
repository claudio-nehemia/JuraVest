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

// TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

interface JenisUsaha {
  id: number;
  nama: string;
}

interface TargetPasar {
  id: number;
  nama: string;
}

interface Wirausaha {
  id: number;
  nama_usaha: string;
  foto_profil?: string;
  jenis_usaha_id: number;
  target_pasar_id: number;
  tipe_usaha: string;
  match_score: number;
  user?: User;
  jenis_usaha?: JenisUsaha;
  target_pasar?: TargetPasar;
}

interface JenisUsaha {
  id: number;
  jenis_usaha: string;
}

interface WirausahaProps {
  rekomendasi?: Wirausaha[];
  categories?: JenisUsaha[];
}

// Function to generate random color gradients
const generateRandomGradient = (index: number): string => {
  const gradients = [
    'from-orange-400 to-red-500',
    'from-blue-400 to-purple-500',
    'from-green-400 to-emerald-500',
    'from-yellow-400 to-orange-400',
    'from-green-200 to-green-500',
    'from-amber-600 to-yellow-700',
    'from-sky-500 to-indigo-500',
    'from-pink-400 to-rose-500',
    'from-yellow-300 to-orange-500',
    'from-indigo-400 to-indigo-600',
    'from-gray-200 to-gray-400',
    'from-lime-400 to-lime-600',
    'from-purple-300 to-purple-600',
    'from-cyan-400 to-teal-500',
    'from-red-400 to-red-600',
    'from-pink-300 to-red-400',
    'from-green-300 to-lime-400',
    'from-red-500 to-yellow-500',
    'from-amber-300 to-orange-600',
    'from-purple-800 to-indigo-900',
  ];
  
  return gradients[index % gradients.length];
};

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

const WirausahaPage: React.FC<WirausahaProps> = ({ rekomendasi = [], categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Create category options including "Semua"
  const categoryOptions = useMemo(() => {
    return ['Semua', ...categories.map(cat => cat.jenis_usaha)]; // ✅ Correct - using jenis_usaha property
  }, [categories]);

  const filteredWirausaha = useMemo(() => {
    return rekomendasi.filter(wirausaha => {
      const matchesSearch = wirausaha.nama_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          wirausaha.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          wirausaha.jenis_usaha?.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          wirausaha.tipe_usaha?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // ✅ Fixed - now comparing with the correct property from categories
      const matchesCategory = selectedCategory === 'Semua' || 
                            selectedCategory === categories.find(cat => cat.id === wirausaha.jenis_usaha_id)?.jenis_usaha;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, rekomendasi, categories]);

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
                placeholder="Cari nama usaha, pemilik, atau jenis usaha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Filter className="text-gray-400 h-5 w-5 mt-2" />
              {categoryOptions.map((category) => (
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
              Menampilkan <span className="text-purple-400 font-bold">{filteredWirausaha.length}</span> wirausaha
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="space-y-8">
          {filteredWirausaha.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">Tidak Ada Hasil</h3>
              <p className="text-gray-400">Coba ubah kata kunci pencarian atau filter kategori</p>
            </div>
          ) : (
            filteredWirausaha.map((wirausaha, index) => (
              <Card
                key={`${wirausaha.id}-${index}`}
                className={`
                  group overflow-hidden border-none
                  bg-gradient-to-r ${generateRandomGradient(index)} 
                  shadow-2xl transition-all duration-500 ease-out
                  hover:shadow-purple-500/25 hover:-translate-y-1
                  slide-in-left rounded-3xl
                  ${wirausaha.match_score > 0 ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
                `}
                style={{ 
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative md:w-80 h-64 md:h-auto flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-black/20 to-black/40 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
                      {wirausaha.foto_profil ? (
                        <img 
                          src={`/storage/${wirausaha.foto_profil}`} 
                          alt={wirausaha.nama_usaha}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                          <div className="text-6xl">🏪</div>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 left-4 glass-effect px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-semibold">
                        {wirausaha.jenis_usaha?.nama || 'Umum'}
                      </span>
                    </div>
                    {wirausaha.match_score > 0 && (
                      <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-bold">Match</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-3xl font-bold text-white group-hover:text-yellow-200 transition-colors">
                          {wirausaha.nama_usaha}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-white/80">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{wirausaha.tipe_usaha || 'Online'}</span>
                        </div>
                      </div>
                      <div className="text-white/70 text-lg">
                        oleh {wirausaha.user?.name || 'Anonim'}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0 mb-6">
                      <div className="flex items-center gap-4 text-white/70">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">Target: {wirausaha.target_pasar?.nama || 'Semua kalangan'}</span>
                        </div>
                        <div className="h-4 w-px bg-white/30"></div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm">Aktif</span>
                        </div>
                        {wirausaha.match_score > 0 && (
                          <>
                            <div className="h-4 w-px bg-white/30"></div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm">Rekomendasi</span>
                            </div>
                          </>
                        )}
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
};

export default WirausahaPage;