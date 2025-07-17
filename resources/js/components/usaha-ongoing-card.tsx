import { MapPin, Calendar, PieChart, DollarSign, FileText, Target, TrendingUp, DollarSignIcon, PersonStanding, PersonStandingIcon, PhoneIcon, InstagramIcon, NotebookPen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wirausaha } from "@/types";
import { router, Link } from "@inertiajs/react";

interface UsahaOngoingCardProps {
    wirausaha: Wirausaha
}

export default function UsahaOngoingCard( {wirausaha} : UsahaOngoingCardProps) {
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
                            <p className="text-white/80">Informasi Lengkap Usaha</p>
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
                                    <p className="text-gray-600 text-sm">Lokasi Usaha Saat Ini</p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-orange-700">{wirausaha.usaha_ongoing?.lokasi_operasional}</p>
                        </div>

                        {/* Tanggal Mulai */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                                    <Calendar className="text-white" size={20}/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Tahun Mulai Usaha</h4>
                                    <p className="text-gray-600 text-sm">Tahun launching</p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-amber-700">{wirausaha.usaha_ongoing?.tahun_berdiri}</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                                    <DollarSignIcon className="text-white" size={20}/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Biaya Operasional</h4>
                                    <p className="text-gray-600 text-sm">Biaya Operasional Bulanan</p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-amber-700">{wirausaha.usaha_ongoing?.biaya_operasional}</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                                    <PersonStandingIcon className="text-white" size={20}/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Jumlah Karyawan</h4>
                                    <p className="text-gray-600 text-sm">Jumlah Pekerja</p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-amber-700">{wirausaha.usaha_ongoing?.jumlah_karyawan} orang</p>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100 w-full max-w-md">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                                <InstagramIcon className="text-white" size={20}/>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">Media Social</h4>
                                <p className="text-gray-600 text-sm">Hubungi Wirausaha</p>
                              </div>
                            </div>
                            <p className="text-lg font-semibold text-amber-700">
                              {wirausaha.usaha_ongoing?.media_social ?? 'Belum Diisi'}
                            </p>
                          </div>
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
                                {wirausaha.usaha_ongoing?.kebutuhan_dana ? 
                                    new Intl.NumberFormat('id-ID', { 
                                        style: 'currency', 
                                        currency: 'IDR' 
                                    }).format(wirausaha.usaha_ongoing.kebutuhan_dana) 
                                    : 'Tidak tersedia'
                                }
                            </p>
                            <p className="text-green-100 text-sm">Estimasi dana tambahan yang diperlukan</p>
                        </div>
                    </div>

                    {/* Latar Belakang */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                <FileText className="text-amber-600" size={18}/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Deskripsi</h3>
                        </div>
                        
                        <div className="mb-4 bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-xl p-6 border border-gray-100">
                            <p className="text-gray-700 leading-relaxed">
                                {wirausaha.deskripsi || 'Deskripsi belum tersedia'}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-amber-600" size={18}/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Proyeksi Usaha</h3>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-xl p-6 border border-gray-100">
                            <p className="mb-4 text-gray-700 leading-relaxed">
                                {wirausaha.usaha_ongoing?.proyeksi_usaha|| 'Deskripsi belum tersedia'}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                <NotebookPen className="text-amber-600" size={18}/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Rencana Penggunaan Dana</h3>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-xl p-6 border border-gray-100">
                            <p className="mb-4 text-gray-700 leading-relaxed">
                                {wirausaha.usaha_ongoing?.rencana_penggunaan_dana|| 'Deskripsi belum tersedia'}
                            </p>
                        </div>
                    </div>
                </CardContent>

                {/* Action Footer */}
                <CardFooter className="bg-white p-6">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">

                    <Link href={`/chat/${3}`}   
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <TrendingUp size={20} />
                        Tertarik Berinvestasi
                    </Link>


                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}