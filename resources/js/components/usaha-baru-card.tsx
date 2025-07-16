import { MapPin, Calendar, PieChart, DollarSign, FileText, Target, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wirausaha } from "@/types";

interface UsahaBaruCardProps {
    wirausaha: Wirausaha
}

export default function UsahaBaruCard( {wirausaha} : UsahaBaruCardProps) {
    // Function to parse and format allocation data
    const parseAlokasi = (alokasiString: string) => {
        if (!alokasiString) return [];
        
        // Split by comma and parse each allocation
        const allocations = alokasiString.split(',').map(item => {
            const parts = item.trim().split(':');
            if (parts.length === 2) {
                const name = parts[0].trim();
                const percentage = parseFloat(parts[1].trim().replace('%', ''));
                return { name, percentage };
            }
            return null;
        }).filter(Boolean);
        
        return allocations;
    };

    const allocations = parseAlokasi(wirausaha.usaha_baru?.alokasi_dana || '');
    
    // Colors for different allocation categories
    const allocationColors = [
        'bg-orange-500',
        'bg-amber-500', 
        'bg-yellow-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-red-500'
    ];

    return (
        <div className="mt-8">
            <Card className="bg-white shadow-xl border-0 overflow-hidden">
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Target className="text-white" size={24}/>
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-white">Detail Pengusaha</CardTitle>
                            <p className="text-white/80">Informasi lengkap rencana usaha</p>
                        </div>
                    </div>
                </div>

                <CardContent className="p-8">
                    {/* Key Info Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Lokasi */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <MapPin className="text-white" size={20}/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Lokasi Operasional</h4>
                                    <p className="text-gray-600 text-sm">Rencana tempat usaha</p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-orange-700">{wirausaha.usaha_baru?.rencana_lokasi_operasional}</p>
                        </div>

                        {/* Tanggal Mulai */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                                    <Calendar className="text-white" size={20}/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Mulai Usaha</h4>
                                    <p className="text-gray-600 text-sm">Target launching</p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-amber-700">{wirausaha.usaha_baru?.rencana_mulai_usaha}</p>
                        </div>
                    </div>

                    {/* Modal Breakdown */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <PieChart className="text-orange-600" size={18}/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Struktur Modal</h3>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-6">
                            {allocations.length > 0 ? (
                                <>
                                    {/* Progress Bar Visual */}
                                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden flex">
                                        {allocations.map((allocation, index) => (
                                            <div
                                                key={index}
                                                className={`h-full ${allocationColors[index % allocationColors.length]}`}
                                                style={{ width: `${allocation?.percentage}%` }}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Allocation Legend */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {allocations.map((allocation, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded ${allocationColors[index % allocationColors.length]}`} />
                                                <span className="text-sm text-gray-700 flex-1">{allocation?.name}</span>
                                                <span className="text-sm font-semibold text-gray-800">{allocation?.percentage}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-2">Deskripsi Alokasi Dana</p>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-orange-500 h-full rounded-full" style={{ width: '100%' }} />
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Pengembangan aplikasi, server hosting, marketing digital, dan tim developer</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dana Dibutuhkan */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <DollarSign size={24}/>
                                <h3 className="text-lg font-semibold">Perkiraan Dana Dibutuhkan</h3>
                            </div>
                            <p className="text-3xl font-bold mb-1">
                                {wirausaha.usaha_baru?.perkiraan_dana ? 
                                    new Intl.NumberFormat('id-ID', { 
                                        style: 'currency', 
                                        currency: 'IDR' 
                                    }).format(wirausaha.usaha_baru.perkiraan_dana) 
                                    : 'Tidak tersedia'
                                }
                            </p>
                            <p className="text-green-100 text-sm">Estimasi modal awal yang diperlukan</p>
                        </div>
                    </div>

                    {/* Latar Belakang */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                <FileText className="text-amber-600" size={18}/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Latar Belakang</h3>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-xl p-6 border border-gray-100">
                            <p className="text-gray-700 leading-relaxed">
                                {wirausaha.deskripsi || 'Deskripsi belum tersedia'}
                            </p>
                        </div>
                    </div>
                </CardContent>

                {/* Action Footer */}
                <CardFooter className="bg-white p-6">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
                        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <TrendingUp size={20}/>
                            Tertarik Berinvestasi
                        </button>
                   
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}