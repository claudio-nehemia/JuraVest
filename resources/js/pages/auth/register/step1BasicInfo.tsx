import { Head, Link } from '@inertiajs/react';
import React, { useEffect } from 'react';

interface Step1BasicProps {
    onNext: (data: { nama: string; email: string; no_telp: string }) => void;
    initialData?: { nama: string; email: string; no_telp: string };
    processing?: boolean;
    errors?: any;
}

export default function Step1BasicInfo({ onNext, initialData, processing = false, errors = {} }: Step1BasicProps) {
    const [data, setData] = React.useState({
        nama: initialData?.nama || '',
        email: initialData?.email || '',
        no_telp: initialData?.no_telp || '',
    });

    const [localErrors, setLocalErrors] = React.useState<any>({});

    // Update data when initialData changes
    useEffect(() => {
        if (initialData) {
            setData({
                nama: initialData.nama,
                email: initialData.email,
                no_telp: initialData.no_telp,
            });
        }
    }, [initialData]);

    // Update local errors when server errors come in
    useEffect(() => {
        setLocalErrors(errors);
    }, [errors]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocalErrors({});

        // Basic client-side validation
        const newErrors: Record<string, string> = {};

        if (!data.nama.trim()) {
            newErrors.nama = 'Nama harus diisi';
        }

        if (!data.email.trim()) {
            newErrors.email = 'Email harus diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!data.no_telp.trim()) {
            newErrors.no_telp = 'Nomor telepon harus diisi';
        } else if (data.no_telp.length < 10) {
            newErrors.no_telp = 'Nomor telepon minimal 10 digit';
        }

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        // Call parent handler
        onNext(data);
    };

    const handleInputChange = (field: keyof typeof data, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field when user starts typing
        if (localErrors[field]) {
            setLocalErrors((prev: any) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
            <Head title="Daftar - Informasi Dasar" />

            <div className="w-full max-w-md">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">Langkah 1 dari 3</span>
                        <span className="text-sm text-gray-500">Informasi Dasar</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600 transition-all duration-300" style={{ width: '33%' }}></div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Selamat Datang!</h2>
                        <p className="text-gray-600">Mari mulai dengan informasi dasar Anda</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nama" className="mb-2 block text-sm font-medium text-gray-700">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="nama"
                                type="text"
                                value={data.nama}
                                onChange={(e) => handleInputChange('nama', e.target.value)}
                                className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                    localErrors.nama ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                                placeholder="Masukkan nama lengkap Anda"
                                disabled={processing}
                                autoComplete="name"
                            />
                            {localErrors.nama && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {localErrors.nama}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                    localErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                                placeholder="nama@email.com"
                                disabled={processing}
                                autoComplete="email"
                            />
                            {localErrors.email && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {localErrors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="no_telp" className="mb-2 block text-sm font-medium text-gray-700">
                                Nomor Telepon <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="no_telp"
                                type="tel"
                                value={data.no_telp}
                                onChange={(e) => handleInputChange('no_telp', e.target.value)}
                                className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                    localErrors.no_telp ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                                placeholder="08123456789"
                                disabled={processing}
                                autoComplete="tel"
                            />
                            {localErrors.no_telp && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {localErrors.no_telp}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <button
                            type="submit"
                            disabled={processing || !data.nama.trim() || !data.email.trim() || !data.no_telp.trim()}
                            className="group flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Sudah punya akun?{' '}
                            <Link href="/login" className="font-medium text-blue-600 transition-colors hover:text-blue-500">
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
