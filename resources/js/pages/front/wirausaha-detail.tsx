import Navbar from "@/components/navbar";
import UsahaBaruCard from "@/components/usaha-baru-card";
import { MessageCircle, MapPin, Users, Briefcase, TrendingUp } from "lucide-react";

export default function WirausahaDetail() {
    return (
        <div className="min-h-screen bg-gradient-to-br pb-4 from-orange-50 to-amber-50">
            <Navbar/>
            
            {/* Hero Image Section */}
            <div className="relative">
                <img 
                    src="/amerika.png"
                    alt="Toko Amerika"
                    className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
                {/* Business Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            {/* Business Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                                    <h1 className="text-3xl font-bold text-gray-800">Toko Senjata</h1>
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odio ea libero cum quibusdam recusandae asperiores ipsum velit odit minus dolor quasi eaque veritatis architecto, fugiat adipisci error deserunt explicabo.
                                </p>
                                
                                {/* Owner Info */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-lg">AH</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Agus Hermanto</p>
                                        <p className="text-sm text-gray-500">Pemilik Usaha</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 md:w-48">
                                <a 
                                    href="/chat"
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <MessageCircle size={20}/>
                                    Chat Sekarang
                                </a>
                                <a 
                                    href="/transaksi"
                                    className="flex items-center justify-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold border-2 border-orange-500 hover:bg-orange-50 transition-all duration-300"
                                >
                                    <TrendingUp size={20}/>
                                    Lihat Transaksi
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Details */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Briefcase className="text-orange-600" size={20}/>
                            </div>
                            <h3 className="font-semibold text-gray-800">Jenis Usaha</h3>
                        </div>
                        <p className="text-gray-600 font-medium">Makanan</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <Users className="text-amber-600" size={20}/>
                            </div>
                            <h3 className="font-semibold text-gray-800">Target Pasar</h3>
                        </div>
                        <p className="text-gray-600 font-medium">Mahasiswa</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-orange-600" size={20}/>
                            </div>
                            <h3 className="font-semibold text-gray-800">Tipe Usaha</h3>
                        </div>
                        <p className="text-gray-600 font-medium">Usaha Baru</p>
                    </div>
                </div>           
                <UsahaBaruCard/>
            </div>
        </div>
    );
}