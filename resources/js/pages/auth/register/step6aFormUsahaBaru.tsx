import { UsahaBaru } from '@/types/usaha-baru-ongoing/usaha-baru';
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

interface Step6aFormUsahaBaruProps {
    onNext: (data: UsahaBaru) => void;
    onBack: () => void;
    userData: Record<string, any>;
    processing?: boolean;
    errors: any;
    jenisUsahaOptions: JenisUsaha[];
    targetPasarOptions: TargetPasar[];
    initialData?: UsahaBaru;
}

export default function Step6aUsahaBaru({
    onNext,
    onBack,
    initialData,
    userData,
    processing = false,
    jenisUsahaOptions = [],
    targetPasarOptions = [],
}: Step6aFormUsahaBaruProps) {
    const { data, setData, clearErrors } = useForm<UsahaBaru>({
        nama_usaha: initialData?.nama_usaha ?? userData?.step6?.nama_usaha ?? null,
        // pemilik_usaha: null,
        pemilik_usaha: initialData?.pemilik_usaha ?? userData?.step6?.pemilik_usaha ?? userData?.step1?.nama ?? null, //ambil dari prop sebelumnya
        // user_id: userData?.user_id || null,
        tipe_usaha: 'Usaha Baru',
        jenis_usaha_id: initialData?.jenis_usaha_id ?? userData?.step6?.jenis_usaha_id ?? null,
        target_pasar_id: initialData?.target_pasar_id ?? userData?.step6?.target_pasar_id ?? null,
        usaha_baru: {
            rencana_lokasi_operasional:
                initialData?.usaha_baru?.rencana_lokasi_operasional ?? userData?.step6?.usaha_baru?.rencana_lokasi_operasional ?? null,
            rencana_mulai_usaha: initialData?.usaha_baru?.rencana_mulai_usaha ?? userData?.step6?.usaha_baru?.rencana_mulai_usaha ?? null,
            alokasi_dana: initialData?.usaha_baru?.alokasi_dana ?? userData?.step6?.usaha_baru?.alokasi_dana ?? null,
            perkiraan_dana: initialData?.usaha_baru?.perkiraan_dana ?? userData?.step6?.usaha_baru?.perkiraan_dana ?? null,
            latar_belakang: initialData?.usaha_baru?.latar_belakang ?? userData?.step6?.usaha_baru?.latar_belakang ?? null,
        },
    });

    const [errors, setErrors] = useState<{
        nama_usaha?: string;
        pemilik_usaha?: string;
        jenis_usaha_id?: string;
        target_pasar_id?: string;
        'usaha_baru.rencana_lokasi_operasional'?: string;
        'usaha_baru.rencana_mulai_usaha'?: string;
        'usaha_baru.alokasi_dana'?: string;
        'usaha_baru.perkiraan_dana'?: string;
        'usaha_baru.latar_belakang'?: string;
    }>({});

    useEffect(() => {
        if (initialData) {
            setData('nama_usaha', initialData.nama_usaha ?? userData?.step6?.nama_usaha ?? null);
            setData('pemilik_usaha', initialData.pemilik_usaha ?? userData?.step6?.pemilik_usaha ?? userData?.step1?.nama ?? null);
            setData('jenis_usaha_id', initialData.jenis_usaha_id ?? userData?.step6?.jenis_usaha_id ?? null);
            setData('target_pasar_id', initialData.target_pasar_id ?? userData?.step6?.target_pasar_id ?? null);

            setData('usaha_baru', {
                rencana_lokasi_operasional:
                    initialData.usaha_baru?.rencana_lokasi_operasional ?? userData?.step6?.usaha_baru?.rencana_lokasi_operasional ?? null,
                rencana_mulai_usaha: initialData.usaha_baru?.rencana_mulai_usaha ?? userData?.step6?.usaha_baru?.rencana_mulai_usaha ?? null,
                alokasi_dana: initialData.usaha_baru?.alokasi_dana ?? userData?.step6?.usaha_baru?.alokasi_dana ?? null,
                perkiraan_dana: initialData.usaha_baru?.perkiraan_dana ?? userData?.step6?.usaha_baru?.perkiraan_dana ?? null,
                latar_belakang: initialData.usaha_baru?.latar_belakang ?? userData?.step6?.usaha_baru?.latar_belakang ?? null,
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

        // Validasi usaha_baru
        if (!data.usaha_baru.rencana_lokasi_operasional || data.usaha_baru.rencana_lokasi_operasional.trim() === '') {
            newErrors['usaha_baru.rencana_lokasi_operasional'] = 'Rencana lokasi operasional wajib diisi';
        }

        if (!data.usaha_baru.rencana_mulai_usaha || data.usaha_baru.rencana_mulai_usaha.trim() === '') {
            newErrors['usaha_baru.rencana_mulai_usaha'] = 'Rencana mulai usaha wajib diisi';
        }

        const currentYear = new Date().getFullYear();
        const selectedYear = parseInt(data.usaha_baru.rencana_mulai_usaha || '');
        if (selectedYear < currentYear || selectedYear > currentYear + 10) {
            newErrors['usaha_baru.rencana_mulai_usaha'] = `Tahun harus antara ${currentYear} - ${currentYear + 10}`;
        }

        if (!data.usaha_baru.alokasi_dana || data.usaha_baru.alokasi_dana.trim() === '') {
            newErrors['usaha_baru.alokasi_dana'] = 'Alokasi dana wajib dipilih';
        }

        if (!data.usaha_baru.perkiraan_dana || data.usaha_baru.perkiraan_dana <= 0) {
            newErrors['usaha_baru.perkiraan_dana'] = 'Perkiraan dana harus diisi dengan nilai yang valid';
        }

        if (!data.usaha_baru.latar_belakang || data.usaha_baru.latar_belakang.trim() === '') {
            newErrors['usaha_baru.latar_belakang'] = 'Latar belakang wajib diisi';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onNext({
            nama_usaha: data.nama_usaha!,
            pemilik_usaha: data.pemilik_usaha!,
            // user_id: data.user_id!,
            tipe_usaha: data.tipe_usaha,
            jenis_usaha_id: data.jenis_usaha_id!,
            target_pasar_id: data.target_pasar_id!,
            usaha_baru: {
                rencana_lokasi_operasional: data.usaha_baru.rencana_lokasi_operasional!,
                rencana_mulai_usaha: data.usaha_baru.rencana_mulai_usaha!,
                alokasi_dana: data.usaha_baru.alokasi_dana!,
                perkiraan_dana: data.usaha_baru.perkiraan_dana!,
                latar_belakang: data.usaha_baru.latar_belakang!,
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
            <Head title="Daftar - Data Usaha Baru" />

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
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-gray-900">Data Usaha Baru</h2>
                        <p className="text-gray-600">Lengkapi informasi usaha yang akan Anda jalankan</p>
                        {userData?.step1?.nama && (
                            <div className="mt-4 rounded-lg bg-blue-50 p-2">
                                <p className="text-sm text-blue-800">{userData.step1.nama} • Calon Pemilik Usaha</p>
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
                                        // value={data.pemilik_usaha ?? ''}
                                        value={userData?.step1?.nama || data.pemilik_usaha || ''} //ambil dari prop sebelumnya
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

                        {/* Rencana Usaha */}
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
                                Rencana Operasional
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Rencana Lokasi Operasional <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.usaha_baru.rencana_lokasi_operasional ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_baru', {
                                                ...data.usaha_baru,
                                                rencana_lokasi_operasional: e.target.value,
                                            })
                                        }
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_baru.rencana_lokasi_operasional'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                                        disabled={processing}
                                    />
                                    {errors['usaha_baru.rencana_lokasi_operasional'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_baru.rencana_lokasi_operasional']}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Rencana Mulai Usaha (Tahun) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={data.usaha_baru.rencana_mulai_usaha ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_baru', {
                                                ...data.usaha_baru,
                                                rencana_mulai_usaha: e.target.value,
                                            })
                                        }
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_baru.rencana_mulai_usaha'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="2025"
                                        min={new Date().getFullYear()}
                                        max={new Date().getFullYear() + 10}
                                        disabled={processing}
                                    />
                                    {errors['usaha_baru.rencana_mulai_usaha'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_baru.rencana_mulai_usaha']}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Alokasi Dana <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={data.usaha_baru.alokasi_dana ?? ''}
                                        onChange={(e) =>
                                            setData('usaha_baru', {
                                                ...data.usaha_baru,
                                                alokasi_dana: e.target.value,
                                            })
                                        }
                                        rows={2}
                                        className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors['usaha_baru.alokasi_dana'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="Contoh: 50% modal operasional, 30% pemasaran, 20% cadangan"
                                        disabled={processing}
                                    />
                                    {errors['usaha_baru.alokasi_dana'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_baru.alokasi_dana']}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Perkiraan Dana Dibutuhkan <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-gray-500">Rp</span>
                                        <input
                                            type="number"
                                            value={data.usaha_baru.perkiraan_dana ?? ''}
                                            onChange={(e) =>
                                                setData('usaha_baru', {
                                                    ...data.usaha_baru,
                                                    perkiraan_dana: e.target.value ? Number(e.target.value) : null,
                                                })
                                            }
                                            className={`w-full rounded-lg border py-3 pr-4 pl-10 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                                errors['usaha_baru.perkiraan_dana'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                            placeholder="50000000"
                                            min="0"
                                            disabled={processing}
                                        />
                                    </div>
                                    {data.usaha_baru.perkiraan_dana && data.usaha_baru.perkiraan_dana > 0 && (
                                        <p className="mt-1 text-xs text-gray-500">{formatCurrency(data.usaha_baru.perkiraan_dana)}</p>
                                    )}
                                    {errors['usaha_baru.perkiraan_dana'] && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors['usaha_baru.perkiraan_dana']}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Latar Belakang */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <svg className="mr-2 h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Latar Belakang Usaha
                            </h3>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Latar Belakang dan Motivasi <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.usaha_baru.latar_belakang ?? ''}
                                    onChange={(e) =>
                                        setData('usaha_baru', {
                                            ...data.usaha_baru,
                                            latar_belakang: e.target.value,
                                        })
                                    }
                                    rows={4}
                                    className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                        errors['usaha_baru.latar_belakang'] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="Jelaskan latar belakang dan motivasi Anda untuk memulai usaha ini..."
                                    disabled={processing}
                                />
                                {errors['usaha_baru.latar_belakang'] && (
                                    <p className="mt-2 flex items-center text-sm text-red-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors['usaha_baru.latar_belakang']}
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
                                    !data.nama_usaha ||
                                    !data.jenis_usaha_id ||
                                    !data.target_pasar_id ||
                                    !data.usaha_baru.rencana_lokasi_operasional ||
                                    !data.usaha_baru.rencana_mulai_usaha ||
                                    !data.usaha_baru.alokasi_dana ||
                                    !data.usaha_baru.perkiraan_dana ||
                                    !data.usaha_baru.latar_belakang
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
