import { Mail, Briefcase, Target, Users, UtensilsCrossed, Star, TrendingUp, Award } from "lucide-react";
import Navbar from "@/components/navbar";
import { Investor } from "@/types";

interface User {
  id: number;
  nama: string;
  email: string;
  pekerjaan: string;
}

interface InvestorDetailProps {
    investor: Investor;
    pekerjaan: string;
    jenis_usaha_labels: string[];
    target_pasar_labels: string[];
}

// Props dari Laravel controller

export default function InvestorDetail({ investor, pekerjaan, jenis_usaha_labels, target_pasar_labels }: InvestorDetailProps) {

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 mb-4">
            <Navbar/>
            <div className="max-w-4xl mx-auto mt-6 px-4">
                {/* Header Card with Profile */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Profile Picture */}
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                                    <img
                                        src={`/storage/${investor.foto_profil}`}
                                        alt="/pengusaha.jpg"
                                        className="rounded-full w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-3 border-white">
                                    <Award className="text-white" size={20}/>
                                </div>
                            </div>
                            
                            {/* Profile Info */}
                            <div className="text-center md:text-left text-white flex-1">
                                <h1 className="text-3xl font-bold mb-2">{investor.nama_investor}</h1>
                                <p className="text-white/90 text-lg mb-4">Investor Profesional</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-2">
                                        <Mail size={18}/>
                                        <span>{investor.user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={18}/>
                                        <span>{pekerjaan}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="flex flex-col gap-2">
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                                    <p className="text-white font-semibold text-lg">Active</p>
                                    <p className="text-white/80 text-sm">Investor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Investment Preferences */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Users className="text-orange-600" size={24}/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Target Pasar</h3>
                                <p className="text-gray-500 text-sm">Fokus investasi</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100">
                            <p className="text-lg font-bold text-orange-700 mb-2">{target_pasar_labels.join(", ")}</p>
                            <p className="text-gray-600 text-sm">Segmen pasar yang diminati untuk investasi</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {target_pasar_labels.map((label, index) => (
                                    <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <UtensilsCrossed className="text-amber-600" size={24}/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Jenis Usaha</h3>
                                <p className="text-gray-500 text-sm">Sektor investasi</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
                            <p className="text-lg font-bold text-amber-700 mb-2">{jenis_usaha_labels.join(", ")}</p>
                            <p className="text-gray-600 text-sm">Industri yang menjadi fokus investasi</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {jenis_usaha_labels.map((label, index) => (
                                    <span key={index} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Investment Goals */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                            <Target className="text-white" size={24}/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Tujuan Investasi</h2>
                            <p className="text-gray-500">Motivasi dan target investasi</p>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-xl p-6 border border-gray-100">
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {investor.tujuan_investasi}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats & Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center">
                        <h3 className="text-3xl font-bold mb-2">ID: {investor.nama_investor}</h3>
                        <p className="text-green-100">Investor ID</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white text-center">
                        <h3 className="text-3xl font-bold mb-2">{jenis_usaha_labels.length + target_pasar_labels.length}</h3>
                        <p className="text-blue-100">Total Preferensi</p>
                    </div>
                </div>

                {/* Contact Action */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Tertarik untuk Berkolaborasi?</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                <Mail size={20}/>
                                Hubungi Investor
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold border-2 border-orange-500 hover:bg-orange-50 transition-all duration-300">
                                <Target size={20}/>
                                Lihat Portofolio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
