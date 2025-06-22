import { UsahaOngoing } from '@/types/usaha-baru-ongoing/usaha-ongoing';
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

interface Step6bFormUsahaOngoingProps {
    onNext: (data: UsahaOngoing) => void;
    onBack: () => void;
    userData: Record<string, any>;
    processing?: boolean;
    errors: any;
    jenisUsahaOptions: JenisUsaha[];
    targetPasarOptions: TargetPasar[];
    initialData?: UsahaOngoing;
}

export default function Step6bUsahaOngoing({
    onNext,
    onBack,
    initialData,
    userData,
    processing = false,
    jenisUsahaOptions = [],
    targetPasarOptions = [],
}: Step6bFormUsahaOngoingProps) {
    const { data, setData, clearErrors } = useForm<UsahaOngoing>({
        nama_usaha: initialData?.nama_usaha ?? userData?.step6?.nama_usaha ?? null,
        pemilik_usaha: initialData?.pemilik_usaha ?? userData?.step6?.pemilik_usaha ?? userData?.step1?.nama ?? null,
        // user_id: userData?.user_id || null,
        tipe_usaha: 'Usaha Ongoing',
        jenis_usaha_id: initialData?.jenis_usaha_id ?? userData?.step6?.jenis_usaha_id ?? null,
        target_pasar_id: initialData?.target_pasar_id ?? userData?.step6?.target_pasar_id ?? null,
        usaha_ongoing: {
            lokasi_operasional: initialData?.usaha_ongoing?.lokasi_operasional ?? userData?.step6?.usaha_ongoing?.lokasi_operasional ?? null,
            tahun_berdiri: initialData?.usaha_ongoing?.tahun_berdiri ?? userData?.step6?.usaha_ongoing?.tahun_berdiri ?? null,
            jumlah_karyawan: initialData?.usaha_ongoing?.jumlah_karyawan ?? userData?.step6?.usaha_ongoing?.jumlah_karyawan ?? null,
            estimasi_omzet: initialData?.usaha_ongoing?.estimasi_omzet ?? userData?.step6?.usaha_ongoing?.estimasi_omzet ?? null,
            biaya_operasional: initialData?.usaha_ongoing?.biaya_operasional ?? userData?.step6?.usaha_ongoing?.biaya_operasional ?? null,
            rencana_penggunaan_dana:
                initialData?.usaha_ongoing?.rencana_penggunaan_dana ?? userData?.step6?.usaha_ongoing?.rencana_penggunaan_dana ?? null,
            proyeksi_usaha: initialData?.usaha_ongoing?.proyeksi_usaha ?? userData?.step6?.usaha_ongoing?.proyeksi_usaha ?? null,
            media_social: initialData?.usaha_ongoing?.media_social ?? userData?.step6?.usaha_ongoing?.media_social ?? null,
        },
    });

    const [errors, setErrors] = useState<{
        nama_usaha?: string;
        pemilik_usaha?: string;
        jenis_usaha_id?: string;
        target_pasar_id?: string;
        'usaha_ongoing.lokasi_operasional'?: string;
        'usaha_ongoing.tahun_berdiri'?: string;
        'usaha_ongoing.jumlah_karyawan'?: string;
        'usaha_ongoing.estimasi_omzet'?: string;
        'usaha_ongoing.biaya_operasional'?: string;
        'usaha_ongoing.rencana_penggunaan_dana'?: string;
        'usaha_ongoing.proyeksi_usaha'?: string;
        'usaha_ongoing.media_social'?: string;
    }>({});

    useEffect(() => {
        if (initialData) {
            setData('nama_usaha', initialData.nama_usaha ?? null);
            setData('pemilik_usaha', initialData.pemilik_usaha ?? userData?.step1?.nama ?? null);
            setData('jenis_usaha_id', initialData.jenis_usaha_id ?? null);
            setData('target_pasar_id', initialData.target_pasar_id ?? null);
            setData('usaha_ongoing', {
                lokasi_operasional: initialData.usaha_ongoing?.lokasi_operasional ?? null,
                tahun_berdiri: initialData.usaha_ongoing?.tahun_berdiri ?? null,
                jumlah_karyawan: initialData.usaha_ongoing?.jumlah_karyawan ?? null,
                estimasi_omzet: initialData.usaha_ongoing?.estimasi_omzet ?? null,
                biaya_operasional: initialData.usaha_ongoing?.biaya_operasional ?? null,
                rencana_penggunaan_dana: initialData.usaha_ongoing?.rencana_penggunaan_dana ?? null,
                proyeksi_usaha: initialData.usaha_ongoing?.proyeksi_usaha ?? null,
                media_social: initialData.usaha_ongoing?.media_social ?? null,
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();

        const newErrors: typeof errors = {};

        // Validasi field utama
        if (!data.nama_usaha || data.nama_usaha.trim() === '') {
            newErrors.nama_usaha = 'Nama usaha wajib diisi';
        }

        if (!data.pemilik_usaha || data.pemilik_usaha.trim() === '') {
            newErrors.pemilik_usaha = 'Pemilik usaha wajib diisi';
        }

        if (!data.jenis_usaha_id) {
            newErrors.jenis_usaha_id = 'Jenis usaha wajib dipilih';
        }

        if (!data.target_pasar_id) {
            newErrors.target_pasar_id = 'Target pasar wajib dipilih';
        }

        // Validasi usaha_ongoing
        if (!data.usaha_ongoing.lokasi_operasional || data.usaha_ongoing.lokasi_operasional.trim() === '') {
            newErrors['usaha_ongoing.lokasi_operasional'] = 'Lokasi operasional wajib diisi';
        }

        if (!data.usaha_ongoing.tahun_berdiri || data.usaha_ongoing.tahun_berdiri.trim() === '') {
            newErrors['usaha_ongoing.tahun_berdiri'] = 'Tahun berdiri wajib diisi';
        }

        const currentYear = new Date().getFullYear();
        const foundedYear = parseInt(data.usaha_ongoing.tahun_berdiri || '');
        if (foundedYear > currentYear || foundedYear < 1900) {
            newErrors['usaha_ongoing.tahun_berdiri'] = `Tahun harus antara 1900 - ${currentYear}`;
        }

        if (!data.usaha_ongoing.jumlah_karyawan || data.usaha_ongoing.jumlah_karyawan.trim() === '') {
            newErrors['usaha_ongoing.jumlah_karyawan'] = 'Jumlah karyawan wajib diisi';
        }

        if (!data.usaha_ongoing.estimasi_omzet || data.usaha_ongoing.estimasi_omzet <= 0) {
            newErrors['usaha_ongoing.estimasi_omzet'] = 'Estimasi omzet harus diisi dengan nilai yang valid';
        }

        if (!data.usaha_ongoing.biaya_operasional || data.usaha_ongoing.biaya_operasional <= 0) {
            newErrors['usaha_ongoing.biaya_operasional'] = 'Biaya operasional harus diisi dengan nilai yang valid';
        }

        if (!data.usaha_ongoing.rencana_penggunaan_dana || data.usaha_ongoing.rencana_penggunaan_dana.trim() === '') {
            newErrors['usaha_ongoing.rencana_penggunaan_dana'] = 'Rencana penggunaan dana wajib diisi';
        }

        if (!data.usaha_ongoing.proyeksi_usaha || data.usaha_ongoing.proyeksi_usaha.trim() === '') {
            newErrors['usaha_ongoing.proyeksi_usaha'] = 'Proyeksi usaha wajib diisi';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onNext({
            nama_usaha: data.nama_usaha!,
            pemilik_usaha: data.pemilik_usaha!,
            user_id: data.user_id!,
            tipe_usaha: data.tipe_usaha,
            jenis_usaha_id: data.jenis_usaha_id!,
            target_pasar_id: data.target_pasar_id!,
            usaha_ongoing: {
                lokasi_operasional: data.usaha_ongoing.lokasi_operasional!,
                tahun_berdiri: data.usaha_ongoing.tahun_berdiri!,
                jumlah_karyawan: data.usaha_ongoing.jumlah_karyawan!,
                estimasi_omzet: data.usaha_ongoing.estimasi_omzet!,
                biaya_operasional: data.usaha_ongoing.biaya_operasional!,
                rencana_penggunaan_dana: data.usaha_ongoing.rencana_penggunaan_dana!,
                proyeksi_usaha: data.usaha_ongoing.proyeksi_usaha!,
                media_social: data.usaha_ongoing.media_social,
            },
        });
    };

    const formatCurrency = (value: number | null) => {
        if (value === null || value === 0) return '';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Head title="Daftar - Data Usaha Ongoing" />

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
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-gray-900">Data Usaha Ongoing</h2>
                        <p className="text-gray-600">Lengkapi informasi usaha yang sedang Anda jalankan</p>
                        {userData?.step1?.nama && (
                            <div className="mt-4 rounded-lg bg-blue-50 p-2">
                                <p className="text-sm text-blue-800">{userData.step1.nama} • Pemilik Usaha</p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informasi Dasar Usaha */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <svg className="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Informasi Dasar
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nama Usaha <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nama_usaha ?? ''}
                                        onChange={(e) => setData('nama_usaha', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors.nama_usaha ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="Contoh: Warung Makan Sederhana"
                                        disabled={processing}
                                    />
                                    {errors.nama_usaha && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.nama_usaha}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Pemilik Usaha <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={userData?.step1?.nama || data.pemilik_usaha || ''}
                                        onChange={(e) => setData('pemilik_usaha', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors.pemilik_usaha ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="Nama lengkap pemilik"
                                        disabled={processing}
                                    />
                                    {errors.pemilik_usaha && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.pemilik_usaha}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Jenis Usaha <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.jenis_usaha_id ?? ''}
                                        onChange={(e) => setData('jenis_usaha_id', e.target.value ? Number(e.target.value) : null)}
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors.jenis_usaha_id ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        disabled={processing}
                                    >
                                        <option value="">Pilih Jenis Usaha</option>
                                        {jenisUsahaOptions.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.jenis_usaha_id && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.jenis_usaha_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Target Pasar <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.target_pasar_id ?? ''}
                                        onChange={(e) => setData('target_pasar_id', e.target.value ? Number(e.target.value) : null)}
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors.target_pasar_id ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        disabled={processing}
                                    >
                                        <option value="">Pilih Target Pasar</option>
                                        {targetPasarOptions.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.target_pasar_id && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.target_pasar_id}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Informasi Usaha Saat Ini */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <svg className="mr-2 h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                                Status Usaha Saat Ini
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Lokasi Operasional <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.usaha_ongoing.lokasi_operasional ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_ongoing', {
                                                ...data.usaha_ongoing,
                                                lokasi_operasional: e.target.value,
                                            })
                                        }
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_ongoing.lokasi_operasional'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                                        disabled={processing}
                                    />
                                    {errors['usaha_ongoing.lokasi_operasional'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_ongoing.lokasi_operasional']}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tahun Berdiri <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={data.usaha_ongoing.tahun_berdiri ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_ongoing', {
                                                ...data.usaha_ongoing,
                                                tahun_berdiri: e.target.value,
                                            })
                                        }
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_ongoing.tahun_berdiri'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="2020"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        disabled={processing}
                                    />
                                    {errors['usaha_ongoing.tahun_berdiri'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_ongoing.tahun_berdiri']}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Jumlah Karyawan <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.usaha_ongoing.jumlah_karyawan ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_ongoing', {
                                                ...data.usaha_ongoing,
                                                jumlah_karyawan: e.target.value,
                                            })
                                        }
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_ongoing.jumlah_karyawan'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        disabled={processing}
                                    >
                                        <option value="">Pilih Jumlah Karyawan</option>
                                        <option value="1">1 orang (sendiri)</option>
                                        <option value="2-5">2 - 5 orang</option>
                                        <option value="6-10">6 - 10 orang</option>
                                        <option value="11-20">11 - 20 orang</option>
                                        <option value="21-50">21 - 50 orang</option>
                                        <option value="51-100">51 - 100 orang</option>
                                        <option value="100+">Lebih dari 100 orang</option>
                                    </select>
                                    {errors['usaha_ongoing.jumlah_karyawan'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_ongoing.jumlah_karyawan']}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Media Sosial <span className="text-gray-400">(Opsional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.usaha_ongoing.media_social ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_ongoing', {
                                                ...data.usaha_ongoing,
                                                media_social: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: @warungmakan_sederhana"
                                        disabled={processing}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Informasi Keuangan */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <svg className="mr-2 h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v13m0-13V6a2 2 0 112 2v2m-2 4.5V20m-2-4.5a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012 2v8.5a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Informasi Keuangan
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Estimasi Omzet per Bulan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={data.usaha_ongoing.estimasi_omzet ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_ongoing', {
                                                ...data.usaha_ongoing,
                                                estimasi_omzet: e.target.value ? Number(e.target.value) : null,
                                            })
                                        }
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_ongoing.estimasi_omzet'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="10000000"
                                        min="0"
                                        disabled={processing}
                                    />
                                    {data.usaha_ongoing.estimasi_omzet && (
                                        <p className="mt-1 text-sm text-gray-600">{formatCurrency(data.usaha_ongoing.estimasi_omzet)}</p>
                                    )}
                                    {errors['usaha_ongoing.estimasi_omzet'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_ongoing.estimasi_omzet']}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Biaya Operasional per Bulan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={data.usaha_ongoing.biaya_operasional ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_ongoing', {
                                                ...data.usaha_ongoing,
                                                biaya_operasional: e.target.value ? Number(e.target.value) : null,
                                            })
                                        }
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_ongoing.biaya_operasional'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="5000000"
                                        min="0"
                                        disabled={processing}
                                    />
                                    {data.usaha_ongoing.biaya_operasional && (
                                        <p className="mt-1 text-sm text-gray-600">{formatCurrency(data.usaha_ongoing.biaya_operasional)}</p>
                                    )}
                                    {errors['usaha_ongoing.biaya_operasional'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_ongoing.biaya_operasional']}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Profit Margin Display */}
                            {data.usaha_ongoing.estimasi_omzet && data.usaha_ongoing.biaya_operasional && (
                                <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                    <h4 className="mb-2 text-sm font-medium text-blue-800">Analisis Keuangan</h4>
                                    <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
                                        <div>
                                            <span className="text-blue-600">Estimasi Keuntungan:</span>
                                            <p className="font-semibold text-blue-800">
                                                {formatCurrency(data.usaha_ongoing.estimasi_omzet - data.usaha_ongoing.biaya_operasional)}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-blue-600">Margin Keuntungan:</span>
                                            <p className="font-semibold text-blue-800">
                                                {(
                                                    ((data.usaha_ongoing.estimasi_omzet - data.usaha_ongoing.biaya_operasional) /
                                                        data.usaha_ongoing.estimasi_omzet) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-blue-600">Status:</span>
                                            <p
                                                className={`font-semibold ${
                                                    data.usaha_ongoing.estimasi_omzet > data.usaha_ongoing.biaya_operasional
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}
                                            >
                                                {data.usaha_ongoing.estimasi_omzet > data.usaha_ongoing.biaya_operasional ? 'Untung' : 'Rugi'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rencana Pengembangan */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <svg className="mr-2 h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Rencana Pengembangan
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Rencana Penggunaan Dana <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={data.usaha_ongoing.rencana_penggunaan_dana ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_ongoing', {
                                                ...data.usaha_ongoing,
                                                rencana_penggunaan_dana: e.target.value,
                                            })
                                        }
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_ongoing.rencana_penggunaan_dana'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        rows={4}
                                        placeholder="Jelaskan bagaimana dana akan digunakan untuk mengembangkan usaha Anda..."
                                        disabled={processing}
                                    />
                                    {errors['usaha_ongoing.rencana_penggunaan_dana'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_ongoing.rencana_penggunaan_dana']}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Proyeksi Usaha <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={data.usaha_ongoing.proyeksi_usaha ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_ongoing', {
                                                ...data.usaha_ongoing,
                                                proyeksi_usaha: e.target.value,
                                            })
                                        }
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_ongoing.proyeksi_usaha'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        rows={4}
                                        placeholder="Jelaskan proyeksi dan target pengembangan usaha Anda ke depan..."
                                        disabled={processing}
                                    />
                                    {errors['usaha_ongoing.proyeksi_usaha'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_ongoing.proyeksi_usaha']}
                                        </p>
                                    )}
                                </div>
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
                                    !data.nama_usaha ||
                                    !data.jenis_usaha_id ||
                                    !data.target_pasar_id ||
                                    !data.usaha_ongoing.lokasi_operasional ||
                                    !data.usaha_ongoing.tahun_berdiri ||
                                    !data.usaha_ongoing.jumlah_karyawan ||
                                    !data.usaha_ongoing.estimasi_omzet ||
                                    !data.usaha_ongoing.biaya_operasional ||
                                    !data.usaha_ongoing.rencana_penggunaan_dana ||
                                    !data.usaha_ongoing.proyeksi_usaha
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
