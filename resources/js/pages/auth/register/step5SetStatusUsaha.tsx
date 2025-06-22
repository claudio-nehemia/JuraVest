import { Head, useForm } from '@inertiajs/react';
// import { useState } from 'react';

interface Step5StatusUsahaProps {
    onNext: (data: { status_usaha: 'usaha_baru' | 'usaha_ongoing' }) => void;
    onBack: () => void;
    userData: Record<string, any>;
    processing?: boolean;
    errors: any;
    initialData?: {
        status_usaha: 'usaha_baru' | 'usaha_ongoing';
    };
}

export default function Step5StatusUsaha({ onNext, onBack, initialData, userData, processing = false, errors = {} }: Step5StatusUsahaProps) {
    const { data, setData } = useForm<{
        status_usaha: 'usaha_baru' | 'usaha_ongoing' | null;
    }>({
        status_usaha: initialData?.status_usaha ?? userData?.step5?.status_usaha ?? null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.status_usaha !== null) {
            onNext({ status_usaha: data.status_usaha });
        } else {
            alert('Silahkan pilih status usaha terlebih dahulu');
        }
    };

    // debug umkm_status
    // useEffect(() => {
    //     console.log('Status usaha sekarang:', data.status_usaha);
    // }, [data.status_usaha]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
            <Head title="Daftar - Status Usaha" />

            <div className="w-full max-w-md">
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">Langkah 4 dari 5</span>
                        <span className="text-sm text-gray-500">80%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600 transition-all duration-300" style={{ width: '80%' }}></div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-2xl font-bold text-gray-900">Status Usaha</h1>
                        <p className="text-gray-600">Pilih status usaha Anda saat ini</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Status Options */}
                        <div className="space-y-3">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Status Usaha Anda</label>

                            {/* Usaha Baru Option */}
                            <div
                                className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md ${
                                    data.status_usaha === 'usaha_baru'
                                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                                onClick={() => setData('status_usaha', 'usaha_baru')}
                            >
                                <div className="flex items-start space-x-3">
                                    <div
                                        className={`mt-1 h-4 w-4 rounded-full border-2 transition-colors ${
                                            data.status_usaha === 'usaha_baru' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                        }`}
                                    >
                                        {data.status_usaha === 'usaha_baru' && <div className="h-full w-full scale-50 rounded-full bg-white"></div>}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">Usaha Baru</h3>
                                        <p className="text-sm text-gray-600">Saya baru akan memulai usaha atau masih dalam tahap perencanaan</p>
                                    </div>
                                </div>
                            </div>

                            {/* Usaha Ongoing Option */}
                            <div
                                className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md ${
                                    data.status_usaha === 'usaha_ongoing'
                                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                                onClick={() => setData('status_usaha', 'usaha_ongoing')}
                            >
                                <div className="flex items-start space-x-3">
                                    <div
                                        className={`mt-1 h-4 w-4 rounded-full border-2 transition-colors ${
                                            data.status_usaha === 'usaha_ongoing' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                        }`}
                                    >
                                        {data.status_usaha === 'usaha_ongoing' && (
                                            <div className="h-full w-full scale-50 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">Usaha Sudah Berjalan</h3>
                                        <p className="text-sm text-gray-600">Saya sudah memiliki usaha yang aktif dan beroperasi</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {errors?.status_usaha && (
                            <div className="rounded-lg bg-red-50 p-3">
                                <div className="flex items-center">
                                    <svg className="mr-2 h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm text-red-600">{errors.status_usaha}</span>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <button
                                type="button"
                                onClick={onBack}
                                disabled={processing}
                                className="group flex flex-1 items-center justify-center rounded-lg bg-gray-100 px-4 py-3 font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <svg
                                    className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Kembali
                            </button>
                            <button
                                type="submit"
                                disabled={processing || data.status_usaha === null}
                                className="group flex flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {processing ? (
                                    <>
                                        <svg
                                            className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        Lanjutkan
                                        <svg
                                            className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
