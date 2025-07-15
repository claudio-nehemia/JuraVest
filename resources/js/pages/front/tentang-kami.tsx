import Navbar from '@/components/navbar';
import { ArrowRight, CheckCircle, Heart, Lightbulb, Shield, Target, TrendingUp, Users } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
            <Navbar />
            <div className="relative overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"></div>
                <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="text-center lg:text-left">
                            <h1 className="mb-6 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
                                Tentang Kami
                            </h1>
                            <p className="text-xl leading-relaxed text-gray-600">
                                Juravest hadir sebagai ruang kolaborasi bagi para pelaku UMKM yang memiliki mimpi besar dan para investor yang ingin
                                memberikan dampak nyata. Kami percaya setiap ide usaha layak mendapatkan kesempatan untuk berkembang, dan setiap
                                investasi dapat menjadi motor penggerak pertumbuhan ekonomi. Dengan inovasi teknologi, pendampingan, dan transparansi,
                                kami membantu mewujudkan perjalanan bisnis yang lebih aman, terarah, dan berkelanjutan.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="flex aspect-square items-center justify-center rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-100 to-orange-100 p-8 shadow-2xl">
                                <img src="/proposal-investor.webp" className="h-full w-full rounded-xl object-contain" />
                            </div>

                            <div className="absolute -top-4 -right-4 rounded-full bg-amber-500 p-3 shadow-lg">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 rounded-full bg-orange-500 p-3 shadow-lg">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <Users className="h-8 w-8 text-amber-500" />
                            <h2 className="text-3xl font-bold text-gray-900">Siapa Kami</h2>
                        </div>
                        <div className="space-y-4 leading-relaxed text-gray-700">
                            <p>
                                Di tengah pertumbuhan pesat sektor UMKM di Indonesia, masih banyak pengusaha potensial yang kesulitan mendapatkan
                                akses permodalan dan pendampingan strategis untuk mengembangkan usahanya.
                            </p>
                            <p>
                                Di sisi lain, banyak individu dan institusi yang siap berinvestasi namun belum menemukan platform yang aman,
                                transparan, dan terpercaya.
                            </p>
                            <div className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 p-4 font-semibold text-white">
                                <strong>Juravest hadir sebagai jembatan</strong> yang mempertemukan kebutuhan kedua belah pihak melalui teknologi
                                digital yang cerdas, profesional, dan berlandaskan kepercayaan.
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 p-8 shadow-lg">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white p-4 shadow-md">
                                        <TrendingUp className="h-8 w-8 text-amber-500" />
                                    </div>
                                    <h4 className="mb-2 font-semibold text-gray-900">Pertumbuhan</h4>
                                    <p className="text-sm text-gray-600">Membantu UMKM berkembang pesat</p>
                                </div>
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white p-4 shadow-md">
                                        <Shield className="h-8 w-8 text-orange-500" />
                                    </div>
                                    <h4 className="mb-2 font-semibold text-gray-900">Keamanan</h4>
                                    <p className="text-sm text-gray-600">Platform investasi terpercaya</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="order-2 lg:order-1">
                            <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-lg">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 rounded-full bg-amber-500 p-2">
                                            <CheckCircle className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-semibold text-gray-900">Setiap Ide Berharga</h4>
                                            <p className="text-gray-600">Kami percaya setiap ide usaha memiliki potensi besar untuk tumbuh</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 rounded-full bg-orange-500 p-2">
                                            <Heart className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-semibold text-gray-900">Dampak Positif</h4>
                                            <p className="text-gray-600">Membantu investor menemukan kesempatan investasi yang berdampak</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="mb-6 flex items-center gap-3">
                                <Lightbulb className="h-8 w-8 text-orange-500" />
                                <h2 className="text-3xl font-bold text-gray-900">Mengapa Ada Juravest</h2>
                            </div>
                            <div className="space-y-4 leading-relaxed text-gray-700">
                                <p>
                                    Juravest lahir dari kepedulian kami terhadap kesenjangan besar antara potensi bisnis di sektor UMKM dan sulitnya
                                    akses permodalan.
                                </p>
                                <p>
                                    Kami percaya, setiap ide usaha memiliki potensi besar untuk tumbuh — asalkan mendapat dukungan dan kepercayaan
                                    yang tepat.
                                </p>
                                <p>
                                    Kami ingin membuka jalan bagi para pengusaha kecil yang bermimpi besar, sekaligus membantu investor menemukan
                                    kesempatan investasi yang aman dan berdampak positif.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-amber-50 py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Bagaimana Kami Bekerja</h2>
                        <p className="mx-auto max-w-3xl text-gray-600">
                            Sistem yang cerdas dan komprehensif untuk mempertemukan pengusaha dengan investor yang tepat
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 p-3">
                                <Target className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">Pencocokan Otomatis</h3>
                            <p className="text-gray-600">
                                Sistem AI yang mempertemukan proposal bisnis dengan preferensi investor secara akurat dan efisien
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 p-3">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">Edukasi & Pendampingan</h3>
                            <p className="text-gray-600">
                                Fitur pembelajaran komprehensif dan mentoring untuk memastikan kedua belah pihak dapat tumbuh bersama
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 p-3">
                                <Shield className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">Transparansi & Akuntabilitas</h3>
                            <p className="text-gray-600">
                                Dana investasi dikelola melalui pihak ketiga independen untuk menjamin keamanan dan kesesuaian rencana
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-lg">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 p-2">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Visi</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Menjadi platform investasi UMKM terpercaya yang mendorong pertumbuhan ekonomi inklusif dan berkelanjutan di Indonesia.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-8 shadow-lg">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-2">
                                    <CheckCircle className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Misi</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                                    <p className="text-gray-700">Mempermudah akses permodalan bagi UMKM potensial</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                                    <p className="text-gray-700">Menciptakan proses investasi yang aman, transparan, dan akuntabel</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                                    <p className="text-gray-700">Memberdayakan UMKM melalui edukasi dan pendampingan bisnis</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                                    <p className="text-gray-700">Menumbuhkan kepercayaan antara pengusaha dan investor melalui teknologi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-white">Bergabunglah dengan Ekosistem Juravest</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-amber-100">
                        Wujudkan impian bisnis Anda atau temukan peluang investasi terbaik bersama komunitas yang saling mendukung
                    </p>
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
        </div>
    );
};

export default AboutUs;
