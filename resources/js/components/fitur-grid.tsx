import { X } from 'lucide-react';
import { useState } from 'react';

interface Fitur {
    fitur: string;
    fiturDetail: string;
    foto: string;
    deskripsi: string;
    deskripsiDetail: string;
}

const fiturs: Fitur[] = [
    {
        fitur: 'ProposalMatch',
        fiturDetail: 'Investor yang Tepat untuk Ide yang Hebat',
        foto: 'ProposalMatch.png',
        deskripsi: 'Temukan investor yang cocok dengan proposal usahamu secara otomatis berdasarkan sektor dan minat investasi.',
        deskripsiDetail:
            'ProposalMatch adalah fitur unggulan Juravest yang memungkinkan pencocokan otomatis antara proposal usaha milik pengusaha UMKM dengan investor yang sesuai, berdasarkan sektor bisnis, besaran dana yang dibutuhkan, preferensi investasi, serta tingkat risiko yang siap ditanggung investor. Dengan teknologi pencocokan berbasis filter dan algoritma minat investasi, proses menemukan investor menjadi jauh lebih cepat, relevan, dan efisien. Fitur ini dirancang untuk menghindari pencarian manual yang melelahkan dan tidak terarah. Sebagai pengusaha, kamu cukup fokus menyusun proposal dengan baik — dan sistem kami akan mempertemukanmu dengan investor yang paling potensial. ProposalMatch menjadikan proses fundraising lebih terarah, personal, dan cerdas.',
    },
    {
        fitur: 'PitchReady',
        fiturDetail: 'Panduan Lengkap Menyiapkan Proposal Profesional',
        foto: 'PitchReady.png',
        deskripsi: 'Siapkan proposal usaha dan presentasi terbaikmu dengan bantuan template dan panduan dari Juravest.',
        deskripsiDetail:
            'Banyak pengusaha pemula memiliki ide brilian, namun kesulitan dalam menyusun proposal yang menarik dan layak didanai. Untuk itu, Juravest menghadirkan PitchReady — fitur yang membantu pengguna menyusun proposal usaha dan pitch deck secara sistematis, rapi, dan profesional. Di dalamnya terdapat template siap pakai, petunjuk pengisian langkah demi langkah, contoh pitch sukses, serta panduan visualisasi data dan keuangan yang memudahkan pemahaman investor. Fitur ini sangat ideal bagi pengusaha pemula yang belum familiar dengan dunia pendanaan. Dengan PitchReady, kamu bisa menyampaikan visi bisnis secara meyakinkan, menjelaskan peluang pasar, hingga merinci alokasi dana dengan cara yang mudah dipahami dan menarik bagi investor. PitchReady bukan sekadar template, tapi mentor digital bisnismu.',
    },
    {
        fitur: 'DanaAman',
        fiturDetail: 'Transparansi Dana, Kepercayaan Tanpa Ragu',
        foto: 'DanaAman.png',
        deskripsi: 'Dana dari investor dikelola secara transparan melalui pihak ketiga untuk memastikan penggunaan sesuai rencana.',
        deskripsiDetail:
            'Juravest memahami bahwa salah satu kekhawatiran terbesar investor adalah keamanan dana yang mereka tanamkan. Karena itu, kami menghadirkan DanaAman — sistem pengelolaan dana yang dikelola secara profesional melalui pihak ketiga yang independen dan terpercaya. Investor tidak langsung menyalurkan dana ke tangan pengusaha, melainkan melalui escrow system atau rekening bersama, dan dana akan dicairkan bertahap sesuai progres dan milestone yang telah disepakati dalam proposal. Hal ini bertujuan untuk mencegah penyalahgunaan dana, meningkatkan akuntabilitas pengusaha, serta memberikan rasa aman bagi investor. Selain itu, setiap penggunaan dana tercatat secara digital dan dapat diakses kapan saja melalui dashboard masing-masing. Dengan DanaAman, investasi menjadi lebih transparan, pengusaha tetap bertanggung jawab, dan relasi bisnis berjalan dengan lebih sehat.',
    },
    {
        fitur: 'UMKMBoost',
        fiturDetail: 'Tampil Lebih Menonjol, Raih Perhatian Investor',
        foto: 'UMKMBoost.png',
        deskripsi: 'Tingkatkan visibilitas usahamu dengan promosi khusus bagi UMKM terpilih agar dilirik lebih banyak investor.',
        deskripsiDetail:
            'Di tengah banyaknya proposal yang masuk, tidak mudah bagi setiap pengusaha untuk langsung menonjol. UMKMBoost hadir sebagai solusi bagi proposal dengan potensi tinggi agar mendapatkan sorotan khusus di platform Juravest. Dengan fitur ini, tim kurasi kami akan meninjau proposal yang layak untuk dipromosikan lebih lanjut melalui kanal-kanal unggulan seperti sorotan homepage, kampanye email investor, atau highlight mingguan. UMKMBoost juga memungkinkan pelaku usaha menerima masukan untuk menyempurnakan proposal sebelum tampil lebih luas. Fitur ini sangat berguna bagi pengusaha yang serius mencari pendanaan dan ingin meningkatkan visibilitas mereka di antara ratusan pelamar lainnya. Dengan dukungan promosi yang tepat, usaha kecil bisa lebih cepat mendapat kepercayaan dan pendanaan dari investor strategis.',
    },
    {
        fitur: 'EduVest',
        fiturDetail: 'Literasi Bisnis untuk Semua',
        foto: 'EduVest.png',
        deskripsi: 'Tingkatkan literasi finansial dan kewirausahaan lewat pelatihan daring bagi calon pengusaha dan investor.',
        deskripsiDetail:
            'Juravest tidak hanya menyediakan platform untuk pendanaan, tetapi juga menjadi ruang belajar bagi pengusaha dan investor pemula. Melalui EduVest, pengguna dapat mengakses berbagai konten edukatif seperti video pelatihan, artikel panduan, webinar, hingga studi kasus nyata dari pelaku UMKM sukses. Materi yang disajikan mencakup banyak topik mulai dari dasar-dasar membangun usaha, mengelola keuangan, mempersiapkan proposal investasi, hingga memahami strategi pertumbuhan dan keberlanjutan bisnis. Investor pemula pun dapat belajar mengenali profil risiko, membaca laporan keuangan, dan memilih proyek investasi yang sesuai dengan tujuan mereka. Dengan EduVest, Juravest memastikan seluruh ekosistem pengguna bertumbuh, berkembang, dan memahami tanggung jawabnya dalam dunia usaha dan investasi.',
    },
    {
        fitur: 'Track&Trust',
        fiturDetail: 'Laporan Progres Usaha dalam Genggaman',
        foto: 'Track&Trust.png',
        deskripsi: 'Pantau perkembangan bisnis yang telah didanai dan berikan laporan progres berkala secara langsung melalui dashboard.',
        deskripsiDetail:
            'Track&Trust adalah fitur monitoring yang memungkinkan transparansi penuh antara investor dan pengusaha setelah proses pendanaan berhasil. Melalui fitur ini, pengusaha dapat melaporkan penggunaan dana, pencapaian milestone, perkembangan omzet, hingga dokumentasi aktivitas usaha secara rutin. Semua laporan ditampilkan dalam dashboard interaktif yang dapat diakses oleh investor kapan saja. Investor bisa melihat perkembangan usaha secara real-time, mengajukan pertanyaan, atau memberikan masukan tanpa harus menunggu laporan manual. Fitur ini juga memperkuat akuntabilitas pengusaha karena setiap kegiatan usaha terekam dan terdokumentasi secara digital. Dengan Track&Trust, hubungan antara pengusaha dan investor menjadi lebih transparan, terbuka, dan saling percaya — yang menjadi fondasi penting dalam kemitraan jangka panjang.',
    },
];

export default function FiturGrid() {
    const [selectedFitur, setSelectedFitur] = useState<Fitur | null>(null);

    const openModal = (fitur: Fitur) => {
        setSelectedFitur(fitur);
    };

    const closeModal = () => {
        setSelectedFitur(null);
    };

    return (
        <div className="mx-auto max-w-6xl p-6">
            <div className="grid grid-cols-3 grid-rows-2 gap-6">
                {fiturs.map((fitur, index) => (
                    <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg">
                        {/* Foto */}
                        <div className={`mb-4 flex h-35 w-35 items-center justify-center rounded-lg`}>
                            <img src={fitur.foto} alt={`Foto fitur ${fitur.fitur}`} className="max-h-35 max-w-35 object-contain" />
                        </div>

                        {/* Judul */}
                        <h3 className="mb-3 text-xl font-bold text-gray-900">{fitur.fitur}</h3>

                        {/* Deskripsi */}
                        <p className="mb-4 text-sm leading-relaxed text-gray-600">{fitur.deskripsi}</p>

                        {/* Lihat Selengkapnya */}
                        <button
                            onClick={() => openModal(fitur)}
                            className="flex items-center text-sm font-medium text-teal-600 transition-colors duration-200 hover:text-teal-700"
                        >
                            Lihat Selengkapnya
                            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedFitur && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 p-6">
                            <div className="flex items-center space-x-4">
                                {/* Foto */}
                                <div className={`flex h-16 w-16 items-center justify-center rounded-lg`}>
                                    <img src={selectedFitur.foto} alt={`Foto fitur ${selectedFitur.fitur}`} className="h-16 w-16 object-contain" />
                                </div>
                                {/* Judul, subjudul */}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedFitur.fitur}</h2>
                                    <p className="mt-1 text-lg text-gray-600">{selectedFitur.fiturDetail}</p>
                                </div>
                            </div>

                            <button onClick={closeModal} className="text-gray-400 transition-colors hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <p className="text-base leading-relaxed text-gray-700">{selectedFitur.deskripsiDetail}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
