import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Store, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pengusahas = [
  {
    nama: 'Toko Pak Bejo',
    foto: 'bejo.png',
    deskripsi: 'Toko ini adalah toko makanan enak nomor 1 di Indonesia, namun sedang membutuhkan dana darurat',
    kategori: 'Kuliner',
    color: 'from-orange-400 to-red-500'
  },
  {
    nama: 'Toko Ibu Nani',
    foto: 'nani.png',
    deskripsi: 'Toko ini adalah toko bangunan nomor 1 di Indonesia, tetapi barang-barang material bangunannya hilang dimakan harimau',
    kategori: 'Bangunan',
    color: 'from-blue-400 to-purple-500'
  },
  {
    nama: 'Toko Bapak Solihin',
    foto: 'solihin.png',
    deskripsi: 'Toko ini adalah toko buah terbaik di Samarinda, namun buah-buah yang dijual dicuri oleh monyet sehingga dia kehilangan aset',
    kategori: 'Buah-buahan',
    color: 'from-green-400 to-emerald-500'
  },
  {
    nama: 'Toko Amerika',
    foto: 'amerika.png',
    deskripsi: 'Toko ini adalah toko senjata terbaik di jagat raya, pernah menghancurkan bulan di planet Mars',
    kategori: 'Persenjataan',
    color: 'from-gray-400 to-gray-600'
  },
  {
    nama: 'Toko Kopi Mas Rian',
    foto: 'kopi.png',
    deskripsi: 'Toko kopi legendaris yang kabarnya bisa bikin kamu sadar dari mantan',
    kategori: 'Minuman',
    color: 'from-yellow-400 to-orange-400'
  },
  {
    nama: 'Toko Jamu Jeng Dewi',
    foto: 'jamu.png',
    deskripsi: 'Jual jamu dengan resep turun-temurun, bisa menyembuhkan patah hati katanya',
    kategori: 'Kesehatan',
    color: 'from-green-200 to-green-500'
  },
  {
    nama: 'Toko Kayu Mbah Slamet',
    foto: 'kayu.png',
    deskripsi: 'Menjual berbagai jenis kayu tua mistis yang katanya bisa usir tuyul',
    kategori: 'Material',
    color: 'from-brown-400 to-yellow-700'
  },
  {
    nama: 'Toko Elektronik Pak Elon',
    foto: 'elon.png',
    deskripsi: 'Menjual barang elektronik bekas luar angkasa, katanya bekas satelit jatuh',
    kategori: 'Teknologi',
    color: 'from-sky-500 to-indigo-500'
  },
  {
    nama: 'Toko Fashion Mbak Cici',
    foto: 'fashion.png',
    deskripsi: 'Fashion kekinian untuk kamu yang ingin tampil kece saat rebahan',
    kategori: 'Fashion',
    color: 'from-pink-400 to-rose-500'
  },
  {
    nama: 'Toko Mainan Pak Toy',
    foto: 'toys.png',
    deskripsi: 'Jual mainan edukatif dari masa kecil generasi 90-an hingga generasi sekarang',
    kategori: 'Mainan',
    color: 'from-yellow-300 to-orange-500'
  },
  {
    nama: 'Toko Buku Bang Rizal',
    foto: 'buku.png',
    deskripsi: 'Toko buku langka yang menyimpan buku-buku dari dimensi lain',
    kategori: 'Pendidikan',
    color: 'from-indigo-400 to-indigo-600'
  },
  {
    nama: 'Toko Keramik Tante Meli',
    foto: 'keramik.png',
    deskripsi: 'Menjual keramik antik dari peradaban kuno yang bisa ngobrol kalau malam',
    kategori: 'Dekorasi',
    color: 'from-gray-200 to-gray-400'
  },
  {
    nama: 'Toko Petualangan Pak Rimba',
    foto: 'rimba.png',
    deskripsi: 'Jual perlengkapan survival yang katanya dipakai waktu ekspedisi Atlantis',
    kategori: 'Outdoor',
    color: 'from-lime-400 to-lime-600'
  },
  {
    nama: 'Toko Musik Bang Reza',
    foto: 'musik.png',
    deskripsi: 'Toko alat musik lengkap, dari ukulele hingga harpa mistik',
    kategori: 'Musik',
    color: 'from-purple-300 to-purple-600'
  },
  {
    nama: 'Toko Gadget Kak Nova',
    foto: 'gadget.png',
    deskripsi: 'Tempat nongkrongnya gadget-gadget canggih yang belum rilis di Bumi',
    kategori: 'Gadget',
    color: 'from-cyan-400 to-teal-500'
  },
  {
    nama: 'Toko Game Pak Developer',
    foto: 'game.png',
    deskripsi: 'Jual game legal dan ilegal, bahkan ada game simulasi dunia nyata',
    kategori: 'Hiburan',
    color: 'from-red-400 to-red-600'
  }
];

export default function WirausahaSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState<boolean>(false);

  // Group cards into slides of 4
  const slidesData = [];
  for (let i = 0; i < pengusahas.length; i += 4) {
    slidesData.push(pengusahas.slice(i, i + 4));
  }

  const totalSlides = slidesData.length;

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoplayPaused) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [autoplayPaused, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleExpand = (cardIndex: number) => {
    setExpanded(expanded === cardIndex ? null : cardIndex);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      {/* Header Section */}
      <div className="text-center mb-12 px-4">
        <div className="inline-flex items-center gap-2 mb-4">
          <Store className="w-8 h-8 text-orange-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Wirausaha Terpilih
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Temukan berbagai peluang investasi dari para pengusaha terbaik di Indonesia
        </p>
      </div>

      {/* Slider Container */}
      <div 
        className="relative max-w-7xl mx-auto px-8"
        onMouseEnter={() => setAutoplayPaused(true)}
        onMouseLeave={() => setAutoplayPaused(false)}
      >
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Slides Container */}
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slidesData.map((slide, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 h-130 lg:grid-cols-4 gap-6">
                  {slide.map((pengusaha, cardIndex) => {
                    const globalCardIndex = slideIndex * 4 + cardIndex;
                    return (
                      <Card 
                        key={globalCardIndex}
                        className={`bg-white shadow-lg border-0 overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl ${
                          hoveredCard === globalCardIndex ? 'ring-4 ring-blue-200' : ''
                        } ${
                          expanded === globalCardIndex ? 'h-auto' : 'h-[480px]'
                        }`}
                        onMouseEnter={() => setHoveredCard(globalCardIndex)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {/* Header with Gradient Background */}
                        <div className={`h-48 bg-gradient-to-br ${pengusaha.color} relative overflow-hidden`}>
                          <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full z-10">
                            <span className="text-sm font-semibold text-gray-700">{pengusaha.kategori}</span>
                          </div>
                          
                          {/* Actual Image with fallback */}
                          <img
                            src={pengusaha.foto}
                            alt={pengusaha.nama}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const nextSibling = target.nextElementSibling as HTMLElement;
                              if (nextSibling) {
                                nextSibling.style.display = 'flex';
                              }
                            }}
                          />
                          
                          {/* Fallback placeholder */}
                          <div 
                            className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                            style={{ display: 'none' }}
                          >
                            <div className="text-center">
                              <Store className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500 text-sm font-medium">{pengusaha.nama}</p>
                            </div>
                          </div>
                          
                          {/* Floating Animation Elements */}
                          <div className="absolute top-8 left-8 w-2 h-2 bg-white bg-opacity-60 rounded-full animate-ping z-10"></div>
                          <div className="absolute bottom-16 right-8 w-3 h-3 bg-white bg-opacity-40 rounded-full animate-pulse z-10"></div>
                        </div>

                        <CardHeader className="pb-4">
                          <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {pengusaha.nama}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pb-4">
                          <CardDescription 
                            className={`text-gray-600 leading-relaxed transition-all duration-300 ${
                              expanded === globalCardIndex ? 'max-h-none' : 'line-clamp-3'
                            }`}
                          >
                            {pengusaha.deskripsi}
                          </CardDescription>
                          
                          {expanded === globalCardIndex && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 animate-fadeIn">
                              <h4 className="font-semibold text-blue-800 mb-2">Informasi Tambahan:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Kategori: {pengusaha.kategori}</li>
                                <li>• Status: Membutuhkan investasi</li>
                              </ul>
                            </div>
                          )}
                        </CardContent>

                        <CardFooter className="pt-0">
                          <button
                            onClick={() => toggleExpand(globalCardIndex)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg"
                          >
                            <span className="font-medium">
                              {expanded === globalCardIndex ? 'Sembunyikan Detail' : 'Lihat Detail'}
                            </span>
                            {expanded === globalCardIndex ? (
                              <ChevronUp className="w-4 h-4 transition-transform duration-300" />
                            ) : (
                              <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                            )}
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

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce">
          <TrendingUp className="w-6 h-6" />
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}