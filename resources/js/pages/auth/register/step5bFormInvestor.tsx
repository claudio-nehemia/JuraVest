import { Investor } from '@/types/investor';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface JenisUsaha {
    id: number;
    nama: string;
}

interface TargetPasar {
    id: number;
    nama: string;
}

interface Step5bFormInvestorProps {
    onNext: (data: Investor) => void;
    onBack: () => void;
    userData: Record<string, any>;
    processing?: boolean;
    errors: any;
    jenisUsahaOptions: JenisUsaha[];
    targetPasarOptions: TargetPasar[];
    initialData?: Investor;
}

export default function Step5bInvestor({
    onNext,
    onBack,
    initialData,
    userData,
    processing = false,
    jenisUsahaOptions = [],
    targetPasarOptions = [],
}: Step5bFormInvestorProps) {
    const { data, setData, clearErrors } = useForm<Investor>({
        nama_investor: initialData?.nama_investor ?? userData?.step1?.nama ?? null,
        user_id: userData?.user_id || null,
        tujuan_investasi: initialData?.tujuan_investasi ?? userData?.step5?.tujuan_investasi ?? null,
        target_pasar_ids: initialData?.target_pasar_ids ?? userData?.step5?.target_pasar_ids ?? [],
        jenis_usaha_ids: initialData?.jenis_usaha_ids ?? userData?.step5?.jenis_usaha_ids ?? [],
    });

    const [errors, setErrors] = useState<{
        nama_investor?: string;
        tujuan_investasi?: string;
        target_pasar_ids?: string;
        jenis_usaha_ids?: string;
    }>({});

    useEffect(() => {
        if (initialData) {
            setData('nama_investor', initialData.nama_investor ?? userData?.step1?.nama ?? null);
            setData('tujuan_investasi', initialData.tujuan_investasi ?? userData?.step5?.tujuan_investasi ?? null);
            setData('target_pasar_ids', initialData.target_pasar_ids ?? userData?.step5?.target_pasar_ids ?? []);
            setData('jenis_usaha_ids', initialData.jenis_usaha_ids ?? userData?.step5?.jenis_usaha_ids ?? []);
        }
    }, [initialData]);

    const handleTargetPasarChange = (targetPasarId: number) => {
        const currentIds = data.target_pasar_ids || [];
        const newIds = currentIds.includes(targetPasarId) ? currentIds.filter((id) => id !== targetPasarId) : [...currentIds, targetPasarId];

        setData('target_pasar_ids', newIds);
    };

    const handleJenisUsahaChange = (jenisUsahaId: number) => {
        const currentIds = data.jenis_usaha_ids || [];
        const newIds = currentIds.includes(jenisUsahaId) ? currentIds.filter((id) => id !== jenisUsahaId) : [...currentIds, jenisUsahaId];

        setData('jenis_usaha_ids', newIds);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();

        const newErrors: typeof errors = {};

        // Validasi nama investor
        if (!data.nama_investor || data.nama_investor.trim() === '') {
            newErrors.nama_investor = 'Nama investor wajib diisi';
        }

        // Validasi tujuan investasi
        if (!data.tujuan_investasi || data.tujuan_investasi.trim() === '') {
            newErrors.tujuan_investasi = 'Tujuan investasi wajib diisi';
        }

        // Validasi target pasar (minimal 1)
        if (!data.target_pasar_ids || data.target_pasar_ids.length === 0) {
            newErrors.target_pasar_ids = 'Pilih minimal satu target pasar investasi';
        }

        // Validasi jenis usaha (minimal 1)
        if (!data.jenis_usaha_ids || data.jenis_usaha_ids.length === 0) {
            newErrors.jenis_usaha_ids = 'Pilih minimal satu jenis usaha investasi';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onNext({
            nama_investor: data.nama_investor!,
            user_id: data.user_id!,
            tujuan_investasi: data.tujuan_investasi!,
            target_pasar_ids: data.target_pasar_ids!,
            jenis_usaha_ids: data.jenis_usaha_ids!,
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Head title="Daftar - Data Investor" />

            <div className="w-full max-w-3xl">
                <div className="mb-8">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">DAFTAR AKUN</span>
                        <span className="text-sm text-gray-500">Langkah 5 dari 6</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600" style={{ width: '83%' }}></div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-gray-900">Data Investor</h2>
                        <p className="text-gray-600">Lengkapi informasi investasi Anda</p>
                        {userData?.step1?.nama && (
                            <div className="mt-4 rounded-lg bg-blue-50 p-2">
                                <p className="text-sm text-blue-800">{userData.step1.nama} • Calon Investor</p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informasi Dasar Investor */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <svg className="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Informasi Dasar
                            </h3>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Nama Investor <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userData?.step1?.nama || data.nama_investor || ''}
                                    readOnly
                                    className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700"
                                    placeholder="Nama lengkap investor"
                                />
                                <p className="mt-1 text-xs text-gray-500">Nama diambil dari data registrasi sebelumnya</p>
                                {errors.nama_investor && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.nama_investor}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Target Pasar Investasi */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <svg className="mr-2 h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                Target Pasar Investasi
                            </h3>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    Pilih Target Pasar <span className="text-red-500">*</span>
                                    <span className="mt-1 block text-xs text-gray-500">Anda dapat memilih lebih dari satu target pasar</span>
                                </label>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {targetPasarOptions.map((option) => (
                                        <label
                                            key={option.id}
                                            className={`flex cursor-pointer items-center rounded-lg border-2 p-3 transition-all duration-200 ${
                                                data.target_pasar_ids?.includes(option.id)
                                                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.target_pasar_ids?.includes(option.id) || false}
                                                onChange={() => handleTargetPasarChange(option.id)}
                                                className="sr-only"
                                                disabled={processing}
                                            />
                                            <div
                                                className={`mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                                                    data.target_pasar_ids?.includes(option.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                                }`}
                                            >
                                                {data.target_pasar_ids?.includes(option.id) && (
                                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium">{option.nama}</span>
                                        </label>
                                    ))}
                                </div>
                                {data.target_pasar_ids && data.target_pasar_ids.length > 0 && (
                                    <div className="mt-3 rounded-lg bg-blue-50 p-2">
                                        <p className="text-xs text-blue-800">Terpilih: {data.target_pasar_ids.length} target pasar</p>
                                    </div>
                                )}
                                {errors.target_pasar_ids && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.target_pasar_ids}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Jenis Usaha Investasi */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <svg className="mr-2 h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                                Jenis Usaha Investasi
                            </h3>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    Pilih Jenis Usaha <span className="text-red-500">*</span>
                                    <span className="mt-1 block text-xs text-gray-500">Anda dapat memilih lebih dari satu jenis usaha</span>
                                </label>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {jenisUsahaOptions.map((option) => (
                                        <label
                                            key={option.id}
                                            className={`flex cursor-pointer items-center rounded-lg border-2 p-3 transition-all duration-200 ${
                                                data.jenis_usaha_ids?.includes(option.id)
                                                    ? 'border-purple-500 bg-purple-50 text-purple-900'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.jenis_usaha_ids?.includes(option.id) || false}
                                                onChange={() => handleJenisUsahaChange(option.id)}
                                                className="sr-only"
                                                disabled={processing}
                                            />
                                            <div
                                                className={`mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                                                    data.jenis_usaha_ids?.includes(option.id) ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                                                }`}
                                            >
                                                {data.jenis_usaha_ids?.includes(option.id) && (
                                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium">{option.nama}</span>
                                        </label>
                                    ))}
                                </div>
                                {data.jenis_usaha_ids && data.jenis_usaha_ids.length > 0 && (
                                    <div className="mt-3 rounded-lg bg-purple-50 p-2">
                                        <p className="text-xs text-purple-800">Terpilih: {data.jenis_usaha_ids.length} jenis usaha</p>
                                    </div>
                                )}
                                {errors.jenis_usaha_ids && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.jenis_usaha_ids}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Tujuan Investasi */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <svg className="mr-2 h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Tujuan Investasi
                            </h3>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Tujuan dan Motivasi Investasi <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.tujuan_investasi ?? ''}
                                    onChange={(e) => setData('tujuan_investasi', e.target.value)}
                                    rows={4}
                                    className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                        errors.tujuan_investasi ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="Jelaskan tujuan dan motivasi Anda dalam berinvestasi. Contoh: Saya ingin berinvestasi untuk mendiversifikasi portofolio dan mendukung perkembangan UMKM di Indonesia..."
                                    disabled={processing}
                                />
                                {errors.tujuan_investasi && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.tujuan_investasi}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col space-y-3 pt-6 sm:flex-row sm:space-y-0 sm:space-x-4">
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
                                disabled={
                                    processing ||
                                    !data.nama_investor ||
                                    !data.tujuan_investasi ||
                                    !data.target_pasar_ids?.length ||
                                    !data.jenis_usaha_ids?.length
                                }
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
                                        Simpan
                                        <svg
                                            className="ml-2 h-4 w-4 transition-all duration-200 group-hover:scale-110 group-hover:text-green-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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
