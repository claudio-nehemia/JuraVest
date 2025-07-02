import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        pertanyaan: 'Bagaimana cara kerja Juravest untuk pengusaha UMKM?',
        jawaban:
            'Pengusaha dapat mendaftar sebagai pengguna, membuat profil usaha, lalu mengunggah proposal pendanaan lengkap dengan deskripsi, target pasar, dan kebutuhan modal. Proposal yang lolos verifikasi akan tampil di marketplace Juravest dan bisa dilirik oleh investor. Jika ada investor yang tertarik, pendanaan akan dikelola secara aman melalui sistem pihak ketiga hingga disalurkan sesuai rencana usaha.',
    },
    {
        pertanyaan: 'Apa saja syarat untuk mengajukan proposal usaha?',
        jawaban:
            'Pengguna harus: - Memiliki ide usaha yang jelas atau usaha yang sudah berjalan - Mengisi data diri dan profil usaha secara lengkap - Mengunggah proposal bisnis dan/atau pitch deck - Bersedia mengikuti proses verifikasi dan skema pengelolaan dana melalui pihak ketiga',
    },
    {
        pertanyaan: 'Apakah Juravest hanya untuk usaha yang sudah berjalan?',
        jawaban:
            'Tidak. Juravest terbuka bagi dua jenis pengusaha: - Pengusaha yang baru akan memulai usaha (early stage) - Pengusaha yang sudah berjalan dan ingin mengembangkan bisnisnya',
    },
    {
        pertanyaan: 'Bagaimana investor memilih proposal usaha?',
        jawaban:
            'Investor dapat menelusuri proposal berdasarkan kategori usaha, lokasi, kebutuhan dana, dan potensi bisnis. Setiap proposal dilengkapi data profil pengusaha, latar belakang, serta dokumentasi pendukung untuk membangun kepercayaan.',
    },
    {
        pertanyaan: 'Bagaimana sistem pengelolaan dana bekerja di Juravest?',
        jawaban:
            'Juravest menggunakan skema pihak ketiga, artinya dana tidak langsung ditransfer ke pengusaha, tapi dikelola dan disalurkan secara bertahap sesuai rencana yang disepakati. Ini untuk menjaga transparansi, keamanan, dan memastikan dana digunakan sebagaimana mestinya.',
    },
    {
        pertanyaan: 'Apakah Juravest mengambil komisi dari pendanaan?',
        jawaban:
            'Ya, Juravest mengenakan biaya layanan (service fee) dalam jumlah tertentu dari dana yang berhasil disalurkan. Besarannya akan diinformasikan secara transparan sebelum pendanaan disepakati.',
    },
    {
        pertanyaan: 'Apakah data saya aman di platform ini?',
        jawaban:
            'Sangat aman. Juravest menerapkan sistem enkripsi dan verifikasi untuk menjaga kerahasiaan data pengguna. Kami tidak akan membagikan informasi pribadi tanpa izin pengguna.',
    },
    {
        pertanyaan: 'Apakah investor bisa berkomunikasi langsung dengan pengusaha?',
        jawaban:
            'Ya, tersedia fitur chat dan komunikasi langsung di dalam platform agar kedua belah pihak bisa bertanya jawab, berdiskusi, dan membangun kesepakatan dengan lebih terbuka.',
    },
    {
        pertanyaan: 'Apa yang terjadi setelah usaha didanai?',
        jawaban:
            'Pengusaha wajib memberikan laporan berkala melalui dashboard Juravest. Investor dapat memantau perkembangan usaha dan hasil penggunaan dana sesuai milestone yang ditentukan.',
    },
];

const formatJawaban = (jawaban: string) => {
    // Cari posisi pertama tanda " - " atau "- "
    const dashIndex = jawaban.indexOf(' - ') !== -1 ? jawaban.indexOf(' - ') : jawaban.indexOf('- ');

    // Kalau tidak ada dash, tampilkan sebagai paragraf biasa
    if (dashIndex === -1) {
        return <p className="text-gray-600">{jawaban}</p>;
    }

    // Ambil kalimat pembuka (sebelum tanda -)
    const pembuka = jawaban.slice(0, dashIndex).trim();

    // Ambil poin-poin setelah tanda -, lalu split jadi list
    const listText = jawaban
        .slice(dashIndex)
        .split(/-\s+/)
        .filter((item) => item.trim() !== '');

    return (
        <>
            <p className="mb-2 text-gray-600">{pembuka}</p>
            <ul className="list-disc space-y-1 pl-5 text-gray-600">
                {listText.map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                ))}
            </ul>
        </>
    );
};

export const PertanyaanDropdown = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleJawaban = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mx-auto max-w-4xl p-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">Pertanyaan yang Sering Diajukan</h2>

            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <button
                            className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                            onClick={() => toggleJawaban(index)}
                        >
                            <span>{faq.pertanyaan}</span>
                            <ChevronDown
                                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                                <p className="leading-relaxed text-gray-600">{formatJawaban(faq.jawaban)}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
