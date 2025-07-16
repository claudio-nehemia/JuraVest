import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wirausaha } from '@/types';
import { usePage, Link } from '@inertiajs/react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Store, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WirausahaSlider() {
    const { props } = usePage<{ rekomendasi: Wirausaha[] }>();
    const pengusahas = props.rekomendasi ?? [];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [expanded, setExpanded] = useState<number | null>(null);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [autoplayPaused, setAutoplayPaused] = useState(false);

    const slidesData = [];
    for (let i = 0; i < pengusahas.length; i += 4) {
        slidesData.push(pengusahas.slice(i, i + 4));
    }

    const totalSlides = slidesData.length;

    useEffect(() => {
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

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="mb-12 px-4 text-center">
                <div className="mb-4 inline-flex items-center gap-2">
                    <Store className="h-8 w-8 text-orange-600" />
                    <h1 className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-4xl font-bold text-transparent">
                        Wirausaha Terpilih
                    </h1>
                </div>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">Temukan berbagai peluang investasi dari para pengusaha terbaik di Indonesia</p>
            </div>

            <div
                className="relative mx-auto max-w-7xl px-8"
                onMouseEnter={() => setAutoplayPaused(true)}
                onMouseLeave={() => setAutoplayPaused(false)}
            >
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

                <div className="overflow-hidden rounded-2xl">
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slidesData.map((slide, slideIndex) => (
                            <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                    {slide.map((wirausaha: any, cardIndex: number) => {
                                        const globalIndex = slideIndex * 4 + cardIndex;
                                        const kategori = wirausaha.jenis_usaha?.jenis_usaha || 'default';
                                        const gradientColor = getGradientColor(kategori);

                                        return (
                                    
                                            <Card key={globalIndex} className="relative overflow-hidden shadow-lg transition-all duration-500 hover:scale-105">
                                                <div
                                                    onClick={() => window.location.href = `/wirausaha/${wirausaha.id}`}
                                                    className="cursor-pointer"
                                                >
                                                    <div className={`h-48 bg-gradient-to-br ${gradientColor} relative`}>
                                                    <div className="bg-opacity-90 absolute top-4 right-4 z-10 rounded-full bg-white px-3 py-1">
                                                        <span className="text-sm font-semibold text-gray-700">{kategori}</span>
                                                    </div>
                                                    <img
                                                        src={`/storage/${wirausaha.foto_profil}`}
                                                        alt={'fallback.png'}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                        const target = e.currentTarget;
                                                        target.style.display = 'none';
                                                        }}
                                                    />
                                                    </div>

                                                    <CardHeader className="pb-4 mt-4">
                                                    <CardTitle className="text-xl font-bold text-gray-800">{wirausaha.nama_usaha}</CardTitle>
                                                    </CardHeader>

                                                    <CardContent className="pb-4">
                                                    <CardDescription className={`text-gray-600 transition-all duration-300 ${expanded === globalIndex ? 'max-h-none' : 'line-clamp-3'}`}>
                                                        {wirausaha.tipe_usaha === 'Usaha Baru'
                                                        ? (wirausaha.usaha_baru?.latar_belakang ?? 'Lokasi belum tersedia')
                                                        : (wirausaha.usaha_ongoing?.proyeksi_usaha ?? 'Proyeksi belum tersedia')}
                                                    </CardDescription>

                                                    {expanded === globalIndex && (
                                                        <div className="animate-fadeIn mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
                                                        <h4 className="mb-2 font-semibold text-blue-800">Informasi Tambahan:</h4>
                                                        <ul className="space-y-1 text-sm text-gray-600">
                                                            <li>• Pemilik: {wirausaha.user?.name}</li>
                                                            <li>• Status: {wirausaha.tipe_usaha === 'Usaha Ongoing' ? 'Usaha Berjalan' : 'Usaha Baru'}</li>
                                                            <li>
                                                            {wirausaha.tipe_usaha === 'Usaha Ongoing'
                                                                ? `• Lokasi: ${wirausaha.usaha_ongoing.lokasi_operasional}`
                                                                : `• Rencana Lokasi: ${wirausaha.usaha_baru.rencana_lokasi_operasional}`}
                                                            </li>
                                                        </ul>
                                                        </div>
                                                    )}
                                                    </CardContent>
                                                </div>

                                                <CardFooter className="pt-0 z-10">
                                                    <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // cegah bubbling
                                                        e.preventDefault();  // cegah link default
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

                <div className="mt-8 flex justify-center space-x-3">
                    {slidesData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                currentSlide === index ? 'scale-125 bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            </div>

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
