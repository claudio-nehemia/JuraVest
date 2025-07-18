import type { JenisUsaha, TargetPasar } from '@/types';
import type { Investor } from '@/types/investor';
import { useForm } from '@inertiajs/react';
import React from 'react';

interface Props {
    investor?: Investor;
    listJenisUsaha: JenisUsaha[];
    listTargetPasar: TargetPasar[];
}

export default function ProfileFormInvestor({
    investor = {
        nama_investor: '',
        user_id: 0,
        tujuan_investasi: '',
        target_pasar_invest: [],
        jenis_usaha_invest: [],
        foto_profil: null as File | null,
    },
    listJenisUsaha,
    listTargetPasar,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tujuan_investasi: investor.tujuan_investasi || '',
        jenis_usaha_invest: investor.jenis_usaha_invest || [],
        target_pasar_invest: investor.target_pasar_invest || [],
        foto_profil: investor.foto_profil || null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('profile.updatePublicProfile'));
    };

    const toggleCheckbox = (field: 'jenis_usaha_invest' | 'target_pasar_invest', id: number) => {
        if (data[field].includes(id)) {
            setData(
                field,
                data[field].filter((item: number) => item !== id),
            );
        } else {
            setData(field, [...data[field], id]);
        }
    };

    // Helper function to safely create object URL
    const createPreviewUrl = (file: File | null): string | null => {
        if (file instanceof File) {
            return URL.createObjectURL(file);
        }
        return null;
    };

    const previewUrl = createPreviewUrl(data.foto_profil);

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
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-4xl font-bold">Profil Investor</h1>
                        <p className="text-lg text-amber-100">Lengkapi informasi preferensi investasi Anda</p>
                        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-white/30"></div>
                    </div>
                </div>

                {/* Foto Profil Section */}
                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="relative">
                                <div className="border-gradient-to-r flex h-40 w-40 items-center justify-center rounded-2xl border-4 bg-gradient-to-br from-amber-50 from-amber-200 to-orange-50 to-orange-200 shadow-2xl">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
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
                                            <span className="text-sm font-medium">Foto Profil</span>
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
                                Pilih Foto Profil
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
                    {/* Tujuan Investasi */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Tujuan Investasi</h2>
                                <p className="text-gray-600">Jelaskan tujuan dan motivasi investasi Anda</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center font-semibold text-gray-700">
                                <svg className="mr-2 h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Tujuan Investasi
                            </label>
                            <textarea
                                value={data.tujuan_investasi}
                                onChange={(e) => setData('tujuan_investasi', e.target.value)}
                                rows={4}
                                className="w-full resize-none rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                placeholder="Contoh: Diversifikasi portofolio, pertumbuhan modal jangka panjang, mendukung usaha lokal, dll"
                            />
                            {errors.tujuan_investasi && (
                                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.tujuan_investasi}</div>
                            )}
                        </div>
                    </div>

                    {/* Jenis Usaha Investasi */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Jenis Usaha Investasi</h2>
                                <p className="text-gray-600">Pilih jenis usaha yang ingin Anda investasikan</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {listJenisUsaha.map((item) => (
                                <label
                                    key={item.id}
                                    className="group cursor-pointer rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 hover:bg-amber-50 hover:shadow-lg"
                                >
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={data.jenis_usaha_invest.includes(item.id)}
                                                onChange={() => toggleCheckbox('jenis_usaha_invest', item.id)}
                                                className="peer sr-only"
                                            />
                                            <div className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-gray-300 bg-white transition-all duration-200 group-hover:border-amber-400 peer-checked:border-amber-500 peer-checked:bg-amber-500">
                                                <svg
                                                    className="h-4 w-4 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="ml-3 font-medium text-gray-700 transition-colors duration-200 group-hover:text-amber-700">
                                            {item.jenis_usaha}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.jenis_usaha_invest && (
                            <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.jenis_usaha_invest}</div>
                        )}
                    </div>

                    {/* Target Pasar Investasi */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center">
                            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Target Pasar Investasi</h2>
                                <p className="text-gray-600">Pilih target pasar yang ingin Anda investasikan</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {listTargetPasar.map((item) => (
                                <label
                                    key={item.id}
                                    className="group cursor-pointer rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-amber-300 hover:bg-amber-50 hover:shadow-lg"
                                >
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={data.target_pasar_invest.includes(item.id)}
                                                onChange={() => toggleCheckbox('target_pasar_invest', item.id)}
                                                className="peer sr-only"
                                            />
                                            <div className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-gray-300 bg-white transition-all duration-200 group-hover:border-amber-400 peer-checked:border-amber-500 peer-checked:bg-amber-500">
                                                <svg
                                                    className="h-4 w-4 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="ml-3 font-medium text-gray-700 transition-colors duration-200 group-hover:text-amber-700">
                                            {item.target_pasar}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.target_pasar_invest && (
                            <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{errors.target_pasar_invest}</div>
                        )}
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
                                        <span className="transition-all duration-200 group-hover:tracking-wide">Simpan Preferensi Investasi</span>
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