import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Step5StatusUsahaProps {
    onNext: (data: { status_usaha?: string | null }) => void;
    onBack: () => void;
    userData: Record<string, any>;
}
export default function Step5UsahaStatus({ onNext, onBack, userData }: Step5StatusUsahaProps) {
    const [processing, setProcessing] = useState(false);
    const [selectedStatusUsaha, setSelectedStatusUsaha] = useState<'usaha_baru' | 'usaha_ongoing' | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedStatusUsaha !== null) {
            setProcessing(true);
            onNext({ status_usaha: selectedStatusUsaha });
        } else {
            alert('Silahkan pilih status usaha terlebih dahulu');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
            <Head title="Daftar - Pilih Role" />

            <div className="w-full max-w-md">
                {/* Progress Bar */}
                <div className="mb-8">
                    <span className="justify-center text-sm font-medium text-blue-600">DAFTAR AKUN</span>
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">Langkah 3 dari 4</span>
                        <span className="text-sm text-gray-500">75%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600" style={{ width: '75%' }}></div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                    <div className="mb-4 text-center">
                        {/* LOGO */}
                        {/* <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div> */}
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Status Usaha</h2>
                        <p className="text-gray-600">Apakah usaha Anda sudah berjalan atau baru akan dimulai</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div
                                className={`cursor-pointer rounded-lg border p-4 ${
                                    selectedStatusUsaha === 'usaha_baru' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                                }`}
                                onClick={() => setSelectedStatusUsaha('usaha_baru')}
                            >
                                <p className="text-lg font-semibold">Usaha Baru</p>
                                <p className="text-sm text-gray-600">Saya baru akan memulai usaha</p>
                            </div>

                            <div
                                className={`cursor-pointer rounded-lg border p-4 ${
                                    selectedStatusUsaha === 'usaha_ongoing' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                                }`}
                                onClick={() => setSelectedStatusUsaha('usaha_ongoing')}
                            >
                                <p className="text-lg font-semibold">Usaha Sudah Berjalan</p>
                                <p className="text-sm text-gray-600">Saya sudah memiliki usaha yang berjalan</p>
                            </div>
                        </div>

                        <div className="mt-6 flex space-x-4">
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex-1 rounded-lg bg-gray-100 px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-200"
                            >
                                Kembali
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Lanjutkan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
