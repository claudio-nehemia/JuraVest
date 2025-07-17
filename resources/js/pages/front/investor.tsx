import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Search, Filter, MapPin, Star, Users, Target, Briefcase, Heart } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Link } from '@inertiajs/react';

// TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

interface JenisUsaha {
  id: number;
  jenis_usaha: string;
}

interface TargetPasar {
  id: number;
  target_pasar: string;
}

interface Investor {
  id: number;
  nama?: string;
  email?: string;
  target_pasar_invest: number[]; // Array of target pasar IDs
  jenis_usaha_invest: number[]; // Array of jenis usaha IDs
  tujuan_investasi: string;
  match_score: number;
  user?: User;
  // Add other investor properties as needed
  foto_profil?: string;
  deskripsi?: string;
}

interface InvestorPageProps {
  rekomendasi?: Investor[];
  categories?: JenisUsaha[];
  targetPasarList?: TargetPasar[]; // Add this to get target pasar names
}

// Function to generate random color gradients
const generateRandomGradient = (index: number): string => {
  const gradients = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-emerald-500',
    'from-orange-400 to-red-500',
    'from-yellow-400 to-orange-400',
    'from-pink-400 to-rose-500',
    'from-indigo-400 to-blue-500',
    'from-teal-400 to-cyan-500',
    'from-purple-400 to-pink-500',
    'from-amber-400 to-yellow-500',
    'from-red-400 to-orange-500',
    'from-cyan-400 to-teal-500',
    'from-lime-400 to-green-500',
    'from-violet-400 to-purple-500',
    'from-emerald-400 to-teal-500',
    'from-rose-400 to-pink-500',
    'from-sky-400 to-blue-500',
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

const InvestorPage: React.FC<InvestorPageProps> = ({ 
  rekomendasi = [], 
  categories = [], 
  targetPasarList = [] 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Create category options including "Semua"
  const categoryOptions = useMemo(() => {
    return ['Semua', ...categories.map(cat => cat.jenis_usaha)];
  }, [categories]);

  // Helper function to get jenis usaha names from IDs
  const getJenisUsahaNames = (jenisUsahaIds: number[]): string[] => {
    return jenisUsahaIds.map(id => {
      const jenisUsaha = categories.find(cat => cat.id === id);
      return jenisUsaha?.jenis_usaha || 'Unknown';
    });
  };

  // Helper function to get target pasar names from IDs
  const getTargetPasarNames = (targetPasarIds: number[]): string[] => {
    return targetPasarIds.map(id => {
      const targetPasar = targetPasarList.find(target => target.id === id);
      return targetPasar?.target_pasar || 'Unknown';
    });
  };

  const filteredInvestors = useMemo(() => {
    return rekomendasi.filter(investor => {
      const jenisUsahaNames = getJenisUsahaNames(investor.jenis_usaha_invest);
      const targetPasarNames = getTargetPasarNames(investor.target_pasar_invest);
      
      const matchesSearch = 
        (investor.nama || investor.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (investor.email || investor.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.tujuan_investasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jenisUsahaNames.some(nama => nama.toLowerCase().includes(searchTerm.toLowerCase())) ||
        targetPasarNames.some(nama => nama.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Semua' || 
                            jenisUsahaNames.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, rekomendasi, categories, targetPasarList]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-8 fade-in-scale">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
              Galeri Investor 💰
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Temukan investor yang tepat untuk mengembangkan bisnis Anda dengan visi dan misi yang sejalan
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari nama investor, email, atau jenis usaha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
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
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg">
              Menampilkan <span className="text-blue-500 font-bold">{filteredInvestors.length}</span> investor
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="space-y-8">
          {filteredInvestors.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Tidak Ada Hasil</h3>
              <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter kategori</p>
            </div>
          ) : (
            filteredInvestors.map((investor, index) => (
              <Card
                key={`${investor.id}-${index}`}
                className={`
                  group overflow-hidden border-none
                  bg-gradient-to-r ${generateRandomGradient(index)} 
                  shadow-2xl transition-all duration-500 ease-out
                  hover:shadow-blue-500/25 hover:-translate-y-1
                  slide-in-left rounded-3xl
                  ${investor.match_score > 0 ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
                `}
                style={{ 
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Avatar Section */}
                  <div className="relative md:w-80 h-64 md:h-auto flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-black/20 to-black/40 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
                      {investor.foto_profil ? (
                        <img 
                          src={`/storage/${investor.foto_profil}`} 
                          alt={investor.nama || investor.user?.name || 'Investor'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                          <div className="text-8xl">👤</div>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 left-4 glass-effect px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-semibold">
                        {getJenisUsahaNames(investor.jenis_usaha_invest).slice(0, 2).join(', ')}
                        {investor.jenis_usaha_invest.length > 2 && '...'}
                      </span>
                    </div>
                    {investor.match_score > 0 && (
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
                          {investor.nama || investor.user?.name || 'Investor'}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-white/80">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">Indonesia</span>
                        </div>
                      </div>
                      <div className="text-white/70 text-lg mb-2">
                        {investor.email || investor.user?.email}
                      </div>
                      <div className="text-white/90 text-sm leading-relaxed">
                        {investor.tujuan_investasi}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0 mb-6">
                      <div className="flex items-center gap-4 text-white/70 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          <span className="text-sm">
                            Target: {getTargetPasarNames(investor.target_pasar_invest).slice(0, 2).join(', ')}
                            {investor.target_pasar_invest.length > 2 && '...'}
                          </span>
                        </div>
                        <div className="h-4 w-px bg-white/30"></div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span className="text-sm">
                            Fokus: {getJenisUsahaNames(investor.jenis_usaha_invest).slice(0, 2).join(', ')}
                            {investor.jenis_usaha_invest.length > 2 && '...'}
                          </span>
                        </div>
                        <div className="h-4 w-px bg-white/30"></div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm">Aktif Mencari</span>
                        </div>
                        {investor.match_score > 0 && (
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
                        Kontak Investor
                        <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                      </button>

                       <Link 
                        href={`/investor/${investor.id}`}
                        className="group/btn bg-white/20 hover:bg-white/30 px-8 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 text-white font-semibold backdrop-blur-sm border border-white/30"
                      >
                        Lihat Detail
                        <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                      
                      <div className="flex gap-2">
                        <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30">
                          <span className="text-white text-lg">💬</span>
                        </button>
                        <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30">
                          <Heart className="h-5 w-5 text-white" />
                        </button>
                        <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30">
                          <span className="text-white text-lg">📧</span>
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

export default InvestorPage;