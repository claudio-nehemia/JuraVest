import { JenisUsaha, TargetPasar, Wirausaha } from '@/types';
import { useForm } from '@inertiajs/react';
import React from 'react';

interface Props {
    wirausaha?: Wirausaha;
    listJenisUsaha: JenisUsaha[];
    listTargetPasar: TargetPasar[];
}

export default function ProfileFormUsahaBaru({ wirausaha, listJenisUsaha, listTargetPasar }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nama_usaha: wirausaha?.nama_usaha ?? '',
        jenis_usaha_id: wirausaha?.jenis_usaha_id ?? '',
        target_pasar_id: wirausaha?.target_pasar_id ?? '',
        deskripsi: wirausaha?.deskripsi ?? '',
        foto_profil: null as File | null,
        rencana_lokasi_operasional: wirausaha?.usaha_baru?.rencana_lokasi_operasional ?? '',
        rencana_mulai_usaha: wirausaha?.usaha_baru?.rencana_mulai_usaha ?? '',
        alokasi_dana: wirausaha?.usaha_baru?.alokasi_dana ?? '',
        perkiraan_dana: wirausaha?.usaha_baru?.perkiraan_dana ?? 0,
        latar_belakang: wirausaha?.usaha_baru?.latar_belakang ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('profile.updatePublicProfile'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="mx-auto max-w-5xl px-4">
                {/* Header dengan gradient dan pattern */}
                <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white shadow-2xl">
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
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        {/* <h1 className="mb-2 text-4xl font-bold">Profil Usaha Baru</h1>
                        <p className="text-lg text-amber-100">Lengkapi informasi usaha yang akan Anda bangun</p> */}
                        <h1 className="mb-2 text-4xl font-bold">{data.nama_usaha || 'Nama Usaha'}</h1>
                        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-white/30"></div>
                    </div>
                </div>

                {/* Foto Profil Section */}
                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="relative">
                                <div className="border-gradient-to-r flex h-40 w-40 items-center justify-center rounded-2xl border-4 bg-gradient-to-br from-amber-50 from-amber-200 to-orange-50 to-orange-200 shadow-2xl">
                                    {data.foto_profil ? (
                                        <img
                                            src={URL.createObjectURL(data.foto_profil)}
                                            alt="Preview"
                                            className="h-full w-full rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <svg className="mx-auto mb-3 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span className="text-sm font-medium">Foto Usaha</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -right-2 -bottom-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-3 shadow-lg transition-shadow duration-200 hover:shadow-xl">
                                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <label className="cursor-pointer rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl">
                            <span className="flex items-center">
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Pilih Foto Usaha
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => setData('foto_profil', e.target.files?.[0] ?? null)}
                            />
                        </label>
                        {errors.foto_profil && <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.foto_profil}</div>}
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Informasi Dasar */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Informasi Dasar</h2>
                                <p className="text-gray-600">Detail utama tentang usaha Anda</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                        />
                                    </svg>
                                    Nama Usaha
                                </label>
                                <input
                                    value={data.nama_usaha}
                                    onChange={(e) => setData('nama_usaha', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                    placeholder="Masukkan nama usaha Anda"
                                />
                                {errors.nama_usaha && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.nama_usaha}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    Jenis Usaha
                                </label>
                                <select
                                    value={data.jenis_usaha_id}
                                    onChange={(e) => setData('jenis_usaha_id', Number(e.target.value))}
                                    className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                >
                                    <option value="">Pilih jenis usaha</option>
                                    {listJenisUsaha.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.jenis_usaha}
                                        </option>
                                    ))}
                                </select>
                                {errors.jenis_usaha_id && (
                                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.jenis_usaha_id}</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Target Pasar
                                </label>
                                <select
                                    value={data.target_pasar_id}
                                    onChange={(e) => setData('target_pasar_id', Number(e.target.value))}
                                    className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                >
                                    <option value="">Pilih target pasar</option>
                                    {listTargetPasar.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.target_pasar}
                                        </option>
                                    ))}
                                </select>
                                {errors.target_pasar_id && (
                                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.target_pasar_id}</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Rencana Lokasi Operasional
                                </label>
                                <input
                                    value={data.rencana_lokasi_operasional}
                                    onChange={(e) => setData('rencana_lokasi_operasional', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                    placeholder="Lokasi rencana operasional"
                                />
                                {errors.rencana_lokasi_operasional && (
                                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.rencana_lokasi_operasional}</div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <label className="flex items-center font-semibold text-gray-700">
                                <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Deskripsi Usaha
                            </label>
                            <textarea
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                rows={4}
                                className="w-full resize-none rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                placeholder="Jelaskan usaha yang akan Anda bangun secara detail..."
                            />
                            {errors.deskripsi && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.deskripsi}</div>}
                        </div>
                    </div>

                    {/* Perencanaan Usaha */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Perencanaan Usaha</h2>
                                <p className="text-gray-600">Rencana waktu dan finansial usaha</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                                        />
                                    </svg>
                                    Rencana Mulai Usaha
                                </label>
                                <input
                                    type="date"
                                    value={data.rencana_mulai_usaha}
                                    onChange={(e) => setData('rencana_mulai_usaha', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                />
                                {errors.rencana_mulai_usaha && (
                                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.rencana_mulai_usaha}</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center font-semibold text-gray-700">
                                    <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Perkiraan Dana
                                </label>
                                <div className="relative">
                                    <span className="absolute top-1/2 left-4 -translate-y-1/2 transform font-medium text-gray-500">Rp</span>
                                    <input
                                        type="number"
                                        value={data.perkiraan_dana}
                                        onChange={(e) => setData('perkiraan_dana', Number(e.target.value))}
                                        className="w-full rounded-xl border-2 border-gray-200 p-4 pl-12 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                        placeholder="0"
                                    />
                                </div>
                                {errors.perkiraan_dana && (
                                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.perkiraan_dana}</div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <label className="flex items-center font-semibold text-gray-700">
                                <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                                Alokasi Dana
                            </label>
                            <textarea
                                value={data.alokasi_dana}
                                onChange={(e) => setData('alokasi_dana', e.target.value)}
                                rows={4}
                                className="w-full resize-none rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                placeholder="Jelaskan rencana alokasi dana usaha secara detail..."
                            />
                            {errors.alokasi_dana && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.alokasi_dana}</div>}
                        </div>
                    </div>

                    {/* Latar Belakang */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
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
                                <h2 className="text-2xl font-bold text-gray-800">Latar Belakang</h2>
                                <p className="text-gray-600">Cerita dan motivasi di balik usaha Anda</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center font-semibold text-gray-700">
                                <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                                Latar Belakang
                            </label>
                            <textarea
                                value={data.latar_belakang}
                                onChange={(e) => setData('latar_belakang', e.target.value)}
                                rows={5}
                                className="w-full resize-none rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                placeholder="Ceritakan latar belakang Anda dalam memulai usaha ini, pengalaman sebelumnya, dan motivasi Anda..."
                            />
                            {errors.latar_belakang && (
                                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.latar_belakang}</div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="group hover:shadow-3xl relative transform overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-12 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
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
                                        <span className="transition-all duration-200 group-hover:tracking-wide">Simpan Profil Usaha</span>
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
