import { MapPin, Calendar, PieChart, DollarSign, FileText, Target, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UsahaBaruCard() {
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
                            <p className="text-lg font-semibold text-orange-700">Surabaya</p>
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
                            <p className="text-lg font-semibold text-amber-700">8 Agustus 2025</p>
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
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg border-l-4 border-orange-500">
                                    <span className="font-medium text-gray-700">Modal Properti</span>
                                    <span className="text-2xl font-bold text-orange-600">50%</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg border-l-4 border-amber-500">
                                    <span className="font-medium text-gray-700">Modal Makanan</span>
                                    <span className="text-2xl font-bold text-amber-600">50%</span>
                                </div>
                            </div>
                            
                            {/* Progress Bar Visual */}
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                <div className="h-3 rounded-full flex">
                                    <div className="w-1/2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-l-full"></div>
                                    <div className="w-1/2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-r-full"></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Properti</span>
                                <span>Makanan</span>
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
                            <p className="text-3xl font-bold mb-1">Rp 10.000.000</p>
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
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, eaque! Culpa dicta adipisci, eveniet totam dolorum tenetur eum provident dolore optio rem accusantium tempora animi eius reiciendis! Culpa, magni corrupti.
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