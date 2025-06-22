import { DataDiri } from '@/types/data-diri';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface Pekerjaan {
    id: number;
    nama: string;
}

interface Step3DataDiriProps {
    onNext: (data: DataDiri) => void;
    onBack: () => void;
    userData: Record<string, any>;
    processing?: boolean;
    errors: any;
    pekerjaanOptions: Pekerjaan[];
    initialData?: DataDiri;
}

export default function Step3DataDiri({
    onNext,
    onBack,
    initialData,
    userData,
    processing = false,
    errors = {},
    pekerjaanOptions = [],
}: Step3DataDiriProps) {
    const { data, setData, clearErrors } = useForm<DataDiri>({
        nama_lengkap: initialData?.nama_lengkap ?? userData?.step3?.nama_lengkap ?? userData?.step1?.nama ?? null,
        tanggal_lahir: initialData?.tanggal_lahir ?? userData?.step3?.tanggal_lahir ?? null,
        alamat: initialData?.alamat ?? userData?.step3?.alamat ?? null,
        pendidikan_terakhir: initialData?.pendidikan_terakhir ?? userData?.step3?.pendidikan_terakhir ?? null,
        jenis_kelamin: initialData?.jenis_kelamin ?? userData?.step3?.jenis_kelamin ?? null,
        pekerjaan_id: initialData?.pekerjaan_id ?? userData?.step3?.pekerjaan_id ?? null,
    });

    const [localErrors, setLocalErrors] = useState<{
        nama_lengkap?: string;
        tanggal_lahir?: string;
        alamat?: string;
        pendidikan_terakhir?: string;
        jenis_kelamin?: string;
        pekerjaan_id?: string;
    }>({});

    useEffect(() => {
        if (initialData) {
            setData('nama_lengkap', initialData.nama_lengkap ?? userData?.step1?.nama ?? null);
            setData('tanggal_lahir', initialData.tanggal_lahir ?? null);
            setData('alamat', initialData.alamat ?? null);
            setData('pendidikan_terakhir', initialData.pendidikan_terakhir ?? null);
            setData('jenis_kelamin', initialData.jenis_kelamin ?? null);
            setData('pekerjaan_id', initialData.pekerjaan_id ?? null);
        }
    }, [initialData]);

    const pendidikanOptions = ['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'];
    const jenisKelaminOptions = ['Laki-Laki', 'Perempuan'];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();

        const newErrors: typeof localErrors = {};

        // Validasi field utama
        if (!data.nama_lengkap || data.nama_lengkap.trim() === '') {
            newErrors.nama_lengkap = 'Nama lengkap wajib diisi';
        }

        if (!data.tanggal_lahir) {
            newErrors.tanggal_lahir = 'Tanggal lahir wajib diisi';
        }

        if (!data.alamat || data.alamat.trim() === '') {
            newErrors.alamat = 'Alamat wajib diisi';
        }

        if (!data.pendidikan_terakhir) {
            newErrors.pendidikan_terakhir = 'Pendidikan terakhir wajib dipilih';
        }

        if (!data.jenis_kelamin) {
            newErrors.jenis_kelamin = 'Jenis kelamin wajib dipilih';
        }

        if (!data.pekerjaan_id) {
            newErrors.pekerjaan_id = 'Pekerjaan wajib dipilih';
        }

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        setLocalErrors({});
        onNext({
            nama_lengkap: data.nama_lengkap!,
            tanggal_lahir: data.tanggal_lahir!,
            alamat: data.alamat!,
            pendidikan_terakhir: data.pendidikan_terakhir!,
            jenis_kelamin: data.jenis_kelamin!,
            pekerjaan_id: data.pekerjaan_id!,
        });
    };

    const handleInputChange = (field: keyof DataDiri, value: any) => {
        setData(field, value);
        // Clear error when user starts typing
        if (localErrors[field as keyof typeof localErrors]) {
            setLocalErrors((prev) => ({ ...prev, [field]: undefined }));
        }
        clearErrors(field);
    };

    const currentErrors = { ...errors, ...localErrors };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Head title="Daftar - Data Diri" />

            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">DAFTAR AKUN</span>
                        <span className="text-sm text-gray-500">Langkah 7 dari 7</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600" style={{ width: '100%' }}></div>
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
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-gray-900">Lengkapi Data Diri</h2>
                        <p className="text-gray-600">Langkah terakhir untuk menyelesaikan pendaftaran</p>
                        {userData?.step1?.nama && userData?.step1?.email && (
                            <div className="mt-4 rounded-lg bg-blue-50 p-2">
                                <p className="text-sm text-blue-800">
                                    {userData.step1.nama} • {userData.step1.email}
                                </p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama Lengkap */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.nama_lengkap || ''}
                                onChange={(e) => handleInputChange('nama_lengkap', e.target.value)}
                                className={`w-full rounded-lg border-2 px-3 py-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                                    currentErrors?.nama_lengkap ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                                }`}
                                placeholder="Masukkan nama lengkap Anda"
                                disabled={processing}
                            />
                            {currentErrors?.nama_lengkap && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {currentErrors.nama_lengkap}
                                </p>
                            )}
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tanggal Lahir <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={data.tanggal_lahir || ''}
                                onChange={(e) => handleInputChange('tanggal_lahir', e.target.value)}
                                className={`w-full rounded-lg border-2 px-3 py-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                                    currentErrors?.tanggal_lahir ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                                }`}
                                disabled={processing}
                            />
                            {currentErrors?.tanggal_lahir && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {currentErrors.tanggal_lahir}
                                </p>
                            )}
                        </div>

                        {/* Alamat */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Alamat <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.alamat || ''}
                                onChange={(e) => handleInputChange('alamat', e.target.value)}
                                rows={3}
                                className={`w-full rounded-lg border-2 px-3 py-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                                    currentErrors?.alamat ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                                }`}
                                placeholder="Masukkan alamat lengkap Anda"
                                disabled={processing}
                            />
                            {currentErrors?.alamat && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {currentErrors.alamat}
                                </p>
                            )}
                        </div>

                        {/* Jenis Kelamin */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Jenis Kelamin <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {jenisKelaminOptions.map((jenis) => (
                                    <label
                                        key={jenis}
                                        className={`flex cursor-pointer items-center rounded-lg border-2 p-3 transition-all duration-200 ${
                                            data.jenis_kelamin === jenis ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="jenis_kelamin"
                                            value={jenis}
                                            checked={data.jenis_kelamin === jenis}
                                            onChange={() => handleInputChange('jenis_kelamin', jenis)}
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                            disabled={processing}
                                        />
                                        <span className="ml-3 text-base font-medium text-gray-900">{jenis}</span>
                                    </label>
                                ))}
                            </div>
                            {currentErrors?.jenis_kelamin && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {currentErrors.jenis_kelamin}
                                </p>
                            )}
                        </div>

                        {/* Pendidikan Terakhir */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Pendidikan Terakhir <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.pendidikan_terakhir || ''}
                                onChange={(e) => handleInputChange('pendidikan_terakhir', e.target.value)}
                                className={`w-full rounded-lg border-2 px-3 py-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                                    currentErrors?.pendidikan_terakhir ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                                }`}
                                disabled={processing}
                            >
                                <option value="">Pilih pendidikan terakhir</option>
                                {pendidikanOptions.map((pendidikan) => (
                                    <option key={pendidikan} value={pendidikan}>
                                        {pendidikan}
                                    </option>
                                ))}
                            </select>
                            {currentErrors?.pendidikan_terakhir && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {currentErrors.pendidikan_terakhir}
                                </p>
                            )}
                        </div>

                        {/* Pekerjaan */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Pekerjaan <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.pekerjaan_id || ''}
                                onChange={(e) => handleInputChange('pekerjaan_id', parseInt(e.target.value))}
                                className={`w-full rounded-lg border-2 px-3 py-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                                    currentErrors?.pekerjaan_id ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                                }`}
                                disabled={processing}
                            >
                                <option value="">Pilih pekerjaan</option>
                                {pekerjaanOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.nama}
                                    </option>
                                ))}
                            </select>
                            {currentErrors?.pekerjaan_id && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {currentErrors.pekerjaan_id}
                                </p>
                            )}
                        </div>

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
                                disabled={processing}
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

                    <div className="mt-4 rounded-lg bg-gray-50 p-3">
                        <div className="flex items-start">
                            <svg className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-sm text-gray-600">
                                <p className="mb-1 font-medium">Informasi:</p>
                                <p>
                                    Data yang Anda masukkan akan digunakan untuk verifikasi identitas dan keperluan administrasi. Pastikan semua data
                                    yang diisi sudah benar dan sesuai dengan dokumen resmi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
