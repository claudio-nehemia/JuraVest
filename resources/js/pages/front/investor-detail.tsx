import { Mail, Briefcase, Target, Users, UtensilsCrossed, Star, TrendingUp, Award } from "lucide-react";
import Navbar from "@/components/navbar";

export default function InvestorDetail() {
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
                                        src="/pengusaha.jpg"
                                        alt="Investor"
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-3 border-white">
                                    <Award className="text-white" size={20}/>
                                </div>
                            </div>
                            
                            {/* Profile Info */}
                            <div className="text-center md:text-left text-white flex-1">
                                <h1 className="text-3xl font-bold mb-2">Bang Jago</h1>
                                <p className="text-white/90 text-lg mb-4">Investor Profesional</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-2">
                                        <Mail size={18}/>
                                        <span>aaaaa@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={18}/>
                                        <span>Dokter</span>
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
                            <p className="text-2xl font-bold text-orange-700">Mahasiswa</p>
                            <p className="text-gray-600 text-sm mt-1">Segmen pasar yang diminati untuk investasi</p>
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
                            <p className="text-2xl font-bold text-amber-700">Makanan</p>
                            <p className="text-gray-600 text-sm mt-1">Industri yang menjadi fokus investasi</p>
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
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Sebagai investor profesional yang berpengalaman, tujuan utama saya dalam berinvestasi adalah untuk mencapai pertumbuhan modal yang optimal melalui strategi investasi yang terukur dan berkelanjutan. Saya percaya bahwa dengan memilih peluang investasi yang tepat di sektor makanan yang menargetkan segmen mahasiswa, potensi return yang menguntungkan dapat dicapai sambil tetap mempertahankan profil risiko yang sesuai.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Selain aspek finansial, saya juga memiliki komitmen kuat untuk menciptakan dampak sosial yang positif melalui investasi. Dengan fokus pada pengembangan wirausaha muda, khususnya mahasiswa yang memiliki ide bisnis inovatif di bidang kuliner, saya berharap dapat berkontribusi dalam menciptakan ekosistem kewirausahaan yang sehat dan berkelanjutan. Dukungan yang diberikan tidak hanya berupa modal, tetapi juga mentoring dan akses ke jaringan bisnis yang lebih luas.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Dalam jangka panjang, investasi ini juga bertujuan untuk diversifikasi portofolio dengan memperluas jangkauan ke berbagai sub-sektor dalam industri makanan. Strategi diversifikasi ini memungkinkan mitigasi risiko yang lebih baik sambil membuka peluang untuk eksplorasi model bisnis baru yang sesuai dengan tren pasar terkini, terutama yang berkaitan dengan preferensi konsumen muda dan inovasi teknologi dalam industri F&B.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats & Experience */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center">
                        <h3 className="text-3xl font-bold mb-2">12+</h3>
                        <p className="text-green-100">Investasi Aktif</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white text-center">
                        <h3 className="text-3xl font-bold mb-2">5 Tahun</h3>
                        <p className="text-blue-100">Pengalaman Investasi</p>
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