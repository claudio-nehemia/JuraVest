import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import {
  Store, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, TrendingUp,
} from "lucide-react";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { workerData } from "worker_threads";
import { Wirausaha } from "@/types";

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
      Kuliner: "from-orange-400 to-red-500",
      Bangunan: "from-blue-400 to-purple-500",
      Teknologi: "from-sky-500 to-indigo-500",
      Kesehatan: "from-green-200 to-green-500",
      Fashion: "from-pink-400 to-rose-500",
      Hiburan: "from-red-400 to-red-600",
      Gadget: "from-cyan-400 to-teal-500",
      Pendidikan: "from-indigo-400 to-indigo-600",
      Mainan: "from-yellow-300 to-orange-500",
      Outdoor: "from-lime-400 to-lime-600",
      Musik: "from-purple-300 to-purple-600",
      Material: "from-yellow-800 to-yellow-600",
      Dekorasi: "from-gray-200 to-gray-400",
      default: "from-gray-200 to-gray-400",
    };
    return gradients[kategori] ?? gradients["default"];
  };

  return (
    <div className="min-h-screen bg-white py-12">
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

      <div
        className="relative max-w-7xl mx-auto px-8"
        onMouseEnter={() => setAutoplayPaused(true)}
        onMouseLeave={() => setAutoplayPaused(false)}
      >
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:scale-110">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:scale-110">
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slidesData.map((slide, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {slide.map((wirausaha: any, cardIndex: number) => {
                    const globalIndex = slideIndex * 4 + cardIndex;
                    const kategori = wirausaha.jenis_usaha?.jenis_usaha || "default";
                    const gradientColor = getGradientColor(kategori);

                    return (
                      <Card
                        key={globalIndex}
                        className={`shadow-lg overflow-hidden transition-all duration-500 hover:scale-105 ${
                          hoveredCard === globalIndex ? "ring-4 ring-blue-200" : ""
                        } ${expanded === globalIndex ? "h-auto" : "h-[480px]"}`}
                        onMouseEnter={() => setHoveredCard(globalIndex)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className={`h-48 bg-gradient-to-br ${gradientColor} relative`}>
                          <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full z-10">
                            <span className="text-sm font-semibold text-gray-700">{kategori}</span>
                          </div>
                          <img
                            src={`/storage/${wirausaha.foto_profil}`}
                            alt={"fallback.png"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = "none";
                            }}
                          />
                        </div>

                        <CardHeader className="pb-4">
                          <CardTitle className="text-xl font-bold text-gray-800">{wirausaha.nama_usaha}</CardTitle>
                        </CardHeader>

                        <CardContent className="pb-4">
                          <CardDescription className={`text-gray-600 transition-all duration-300 ${expanded === globalIndex ? "max-h-none" : "line-clamp-3"}`}>
                            {wirausaha.tipe_usaha === "Usaha Baru"
                              ? wirausaha.usaha_baru?.latar_belakang ?? "Lokasi belum tersedia"
                              : wirausaha.usaha_ongoing?.proyeksi_usaha ?? "Proyeksi belum tersedia"}
                          </CardDescription>
                          {expanded === globalIndex && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-fadeIn">
                              <h4 className="font-semibold text-blue-800 mb-2">Informasi Tambahan:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Pemilik: {wirausaha.user?.name}</li>
                                <li>• Status: {wirausaha.tipe_usaha === "Usaha Ongoing"
                                                ? "Usaha Berjalan" : "Usaha Baru"}</li>
                                <li>{wirausaha.tipe_usaha === "Usaha Ongoing"
                                                ? `• Lokasi: ${wirausaha.usaha_ongoing.lokasi_operasional}` 
                                                : `• Rencana Lokasi: ${wirausaha.usaha_baru.rencana_lokasi_operasional}`}</li>
                              </ul>
                            </div>
                          )}
                        </CardContent>

                        <CardFooter className="pt-0">
                          <button
                            onClick={() => toggleExpand(globalIndex)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:scale-105"
                          >
                            <span>{expanded === globalIndex ? "Sembunyikan Detail" : "Lihat Detail"}</span>
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

        <div className="flex justify-center mt-8 space-x-3">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center animate-bounce shadow-lg">
          <TrendingUp className="w-6 h-6" />
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
