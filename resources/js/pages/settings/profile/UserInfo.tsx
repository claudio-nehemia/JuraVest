import type { DataDiri } from '@/types/data-diri';
import { useForm } from '@inertiajs/react';
import React from 'react';

interface Props {
    data_diri: DataDiri | null; // null kalau belum ada
    pendidikan_terakhir_options: string[];
    jenis_kelamin_options: string[];
    listPekerjaan: { id: number; job: string }[];
}

export default function UserInfoTab({ data_diri, pendidikan_terakhir_options, jenis_kelamin_options, listPekerjaan }: Props) {
    console.log('DATA DIRI:', data_diri);

    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: data_diri?.nama_lengkap ?? '',
        tanggal_lahir: data_diri?.tanggal_lahir ?? '',
        alamat: data_diri?.alamat ?? '',
        pendidikan_terakhir: data_diri?.pendidikan_terakhir ?? '',
        jenis_kelamin: data_diri?.jenis_kelamin ?? '',
        pekerjaan_id: data_diri?.pekerjaan_id ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('profile.updateUserInfo'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="mx-auto max-w-5xl px-4">
                {/* Header dengan gradient dan pattern */}
                <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="h-full w-full" viewBox="0 0 100 100" fill="currentColor">
                            <circle cx="20" cy="20" r="2" />
                            <circle cx="80" cy="20" r="2" />
                            <circle cx="20" cy="80" r="2" />
                            <circle cx="80" cy="80" r="2" />
                            <circle cx="50" cy="50" r="3" />
                            <circle cx="50" cy="20" r="1" />
                            <circle cx="50" cy="80" r="1" />
                            <circle cx="20" cy="50" r="1" />
                            <circle cx="80" cy="50" r="1" />
                        </svg>
                    </div>

                    <div className="relative text-center">
                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/20 backdrop-blur-sm">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-4xl font-bold">Informasi Pribadi</h1>
                        <p className="text-lg text-blue-100">Lengkapi data diri Anda untuk profil yang lebih lengkap</p>
                        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-white/30"></div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Nama Lengkap */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Identitas Diri</h2>
                                <p className="text-gray-600">Masukkan nama lengkap sesuai dokumen resmi</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center font-semibold text-gray-700">
                                <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                                Nama Lengkap
                            </label>
                            <input
                                value={data.nama_lengkap}
                                onChange={(e) => setData('nama_lengkap', e.target.value)}
                                className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                placeholder="Masukkan nama lengkap Anda"
                            />
                            {errors.nama_lengkap && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.nama_lengkap}</div>}
                        </div>
                    </div>

                    {/* Tanggal Lahir & Jenis Kelamin */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Informasi Kelahiran</h2>
                                <p className="text-gray-600">Tanggal lahir dan jenis kelamin</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Tanggal Lahir
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                                {errors.tanggal_lahir && (
                                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.tanggal_lahir}</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                        />
                                    </svg>
                                    Jenis Kelamin
                                </label>
                                <select
                                    value={data.jenis_kelamin}
                                    onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="">Pilih jenis kelamin</option>
                                    {jenis_kelamin_options.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                {errors.jenis_kelamin && (
                                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.jenis_kelamin}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Alamat */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Alamat Domisili</h2>
                                <p className="text-gray-600">Masukkan alamat tempat tinggal saat ini</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center font-semibold text-gray-700">
                                <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Alamat Lengkap
                            </label>
                            <textarea
                                value={data.alamat}
                                onChange={(e) => setData('alamat', e.target.value)}
                                rows={4}
                                className="w-full resize-none rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                placeholder="Masukkan alamat lengkap beserta kode pos"
                            />
                            {errors.alamat && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.alamat}</div>}
                        </div>
                    </div>

                    {/* Pendidikan & Pekerjaan */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Pendidikan & Karier</h2>
                                <p className="text-gray-600">Informasi pendidikan dan pekerjaan</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                    Pendidikan Terakhir
                                </label>
                                <select
                                    value={data.pendidikan_terakhir}
                                    onChange={(e) => setData('pendidikan_terakhir', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="">Pilih pendidikan terakhir</option>
                                    {pendidikan_terakhir_options.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                {errors.pendidikan_terakhir && (
                                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.pendidikan_terakhir}</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0v2a2 2 0 002 2h4a2 2 0 002-2V6"
                                        />
                                    </svg>
                                    Pekerjaan Saat Ini
                                </label>
                                <select
                                    value={data.pekerjaan_id ?? ''}
                                    onChange={(e) => setData('pekerjaan_id', Number(e.target.value))}
                                    className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="">Pilih pekerjaan</option>
                                    {listPekerjaan.map((pekerjaan) => (
                                        <option key={pekerjaan.id} value={pekerjaan.id}>
                                            {pekerjaan.job}
                                        </option>
                                    ))}
                                </select>
                                {errors.pekerjaan_id && (
                                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.pekerjaan_id}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="group hover:shadow-3xl relative transform overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-12 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <span className="relative z-10 flex items-center">
                                {processing ? (
                                    <>
                                        <div className="mr-3 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                                        <span className="animate-pulse">Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="transition-all duration-200 group-hover:tracking-wide">Simpan Data Pribadi</span>
                                    </>
                                )}
                            </span>

                            {/* Shimmer effect */}
                            <div className="absolute inset-0 -top-2 flex h-full w-full justify-center">
                                <div className="h-full w-1/3 rotate-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
