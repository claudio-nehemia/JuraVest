import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { Brain, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, TrendingUp, Utensils, Smartphone, Hammer, HeartPulse, Store } from 'lucide-react';
import { Investor } from '@/types';

interface InvestorGridProps {
    investor: Investor[];
    pekerjaan: string;
    jenis_usaha_labels: string[];
    target_pasar_labels: string[];
}

export default function InvestorGrid({
  investor = [], // Add default empty array
  pekerjaan = '', // Add default empty string
  jenis_usaha_labels = [], // Add default empty array
  target_pasar_labels = [] // Add default empty array
} : InvestorGridProps) {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  // Add null check before accessing length
  if (!investor || investor.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="mb-12 px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <Brain className="h-8 w-8 text-orange-600" />
            <h1 className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-4xl font-bold text-transparent">
              Investor Terpilih
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Belum ada data investor yang tersedia
          </p>
        </div>
      </div>
    );
  }

  const slidesData: Investor[][] = [];
  for (let i = 0; i < investor.length; i += 4) {
    slidesData.push(investor.slice(i, i + 4));
  }
  const totalSlides = slidesData.length;

  useEffect(() => {
    if (totalSlides === 0) return; // Prevent interval if no slides
    
    const interval = setInterval(() => {
      if (!autoplayPaused) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [autoplayPaused, totalSlides]);

  const toggleExpand = (i: number) => {
    setExpanded(expanded === i ? null : i);
  };

  const getGradientColor = (kategori: string) => {
    const gradients: Record<string, string> = {
      Kuliner: 'from-orange-400 to-red-500',
      Bangunan: 'from-blue-400 to-purple-500',
      Teknologi: 'from-sky-500 to-indigo-500',
      Kesehatan: 'from-green-200 to-green-500',
      Fashion: 'from-pink-400 to-rose-500',
      Hiburan: 'from-red-400 to-red-600',
      Gadget: 'from-cyan-400 to-teal-500',
      Pendidikan: 'from-indigo-400 to-indigo-600',
      Mainan: 'from-yellow-300 to-orange-500',
      Outdoor: 'from-lime-400 to-lime-600',
      Musik: 'from-purple-300 to-purple-600',
      Material: 'from-yellow-800 to-yellow-600',
      Dekorasi: 'from-gray-200 to-gray-400',
      default: 'from-gray-200 to-gray-400',
    };
    return gradients[kategori] ?? gradients['default'];
  };

  const getUsahaIcon = (kategori: string) => {
    switch (kategori) {
      case 'Kuliner': return <Utensils className="h-5 w-5 text-red-400" />;
      case 'Teknologi': return <Smartphone className="h-5 w-5 text-indigo-500" />;
      case 'Bangunan': return <Hammer className="h-5 w-5 text-gray-600" />;
      case 'Kesehatan': return <HeartPulse className="h-5 w-5 text-green-500" />;
      default: return <Store className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mb-12 px-4 text-center">
        <div className="mb-4 inline-flex items-center gap-2">
          <Brain className="h-8 w-8 text-orange-600" />
          <h1 className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-4xl font-bold text-transparent">
            Investor Terpilih
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Temukan berbagai peluang investasi dari para pengusaha terbaik di Indonesia
        </p>
      </div>

      <div
        className="relative mx-auto max-w-7xl px-8"
        onMouseEnter={() => setAutoplayPaused(true)}
        onMouseLeave={() => setAutoplayPaused(false)}
      >
        {/* Nav buttons */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
          className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:scale-110"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>

        {/* Slides */}
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slidesData.map((slide, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {slide.map((investorItem, cardIndex) => {
                    const globalIndex = slideIndex * 4 + cardIndex;
                    // Add null checks for investor properties
                    const investorJenisUsaha = investorItem.jenis_usaha_labels || jenis_usaha_labels || [];
                    const investorTargetPasar = investorItem.target_pasar_labels || target_pasar_labels || [];
                    
                    const kategori = investorJenisUsaha?.[0] ?? 'default';
                    const gradientColor = getGradientColor(kategori);

                    return (
                      <Card key={globalIndex} className="relative overflow-hidden shadow-lg transition-all duration-500 hover:scale-105">
                        <div
                          onClick={() => window.location.href = `/investor/${investorItem.id}`}
                          className="cursor-pointer"
                        >
                          <div className={`h-48 bg-gradient-to-br ${gradientColor} relative`}>
                            <div className="absolute top-4 right-4 z-10 rounded-full bg-white px-3 py-1 bg-opacity-90">
                              <span className="text-sm font-semibold text-gray-700">{kategori}</span>
                            </div>
                            <img
                              src={`/storage/${investorItem.foto_profil || 'fallback.png'}`}
                              alt={investorItem.nama_investor || 'Investor'}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                              }}
                            />
                          </div>

                          <CardHeader className="pb-4 mt-4">
                            <CardTitle className="text-xl font-bold text-gray-800">
                              {investorItem.nama_investor || 'Nama tidak tersedia'}
                            </CardTitle>
                            <CardDescription className="text-gray-500">
                              {investorTargetPasar.length > 0 ? investorTargetPasar.join(', ') : 'Tidak ada target pasar'}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="pb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                              {getUsahaIcon(kategori)}
                              <span>{investorJenisUsaha.length > 0 ? investorJenisUsaha.join(', ') : 'Tidak ada jenis usaha'}</span>
                            </div>

                            {/* Tampilkan jenis usaha seperti di InvestorDetail */}
                            <div className="mt-4">
                              <h4 className="font-semibold text-gray-800 mb-2">Jenis Usaha:</h4>
                              <div className="flex flex-wrap gap-2">
                                {investorJenisUsaha.map((label, index) => (
                                  <span key={index} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                                    {label}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Tampilkan target pasar seperti di InvestorDetail */}
                            <div className="mt-4">
                              <h4 className="font-semibold text-gray-800 mb-2">Target Pasar:</h4>
                              <div className="flex flex-wrap gap-2">
                                {investorTargetPasar.map((label, index) => (
                                  <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                                    {label}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {expanded === globalIndex && (
                              <div className="animate-fadeIn mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
                                <h4 className="mb-2 font-semibold text-blue-800">Informasi Tambahan:</h4>
                                  <ul className="space-y-1 text-sm text-gray-600 p-2 break-words whitespace-normal w-full">
                                  <li>• Akun: {investorItem.user?.email || 'Tidak tersedia'}</li>
                                  <li>• Pekerjaan: {pekerjaan || 'Tidak tersedia'}</li>
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </div>

                        <CardFooter className="pt-0 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              toggleExpand(globalIndex);
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-white hover:scale-105"
                          >
                            <span>{expanded === globalIndex ? 'Sembunyikan Detail' : 'Lihat Detail'}</span>
                            {expanded === globalIndex ? <ChevronUp /> : <ChevronDown />}
                          </button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicator dots */}
        <div className="mt-8 flex justify-center space-x-3">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'scale-125 bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed right-8 bottom-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-14 w-14 animate-bounce items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
        >
          <TrendingUp className="h-6 w-6" />
        </button>
      </div>

      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}