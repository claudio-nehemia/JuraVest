import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

interface Step1BasicProps {
    onNext: (data: { nama: string; email: string; no_telp: string }) => void;
}

export default function Step1BasicInfo({ onNext } : Step1BasicProps) {
    const { data, setData, errors, processing } = useForm({
        nama: '',
        email: '',
        no_telp: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validasi sederhana
        if (!data.nama || !data.email || !data.no_telp) {
            alert('Semua field harus diisi!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Format email tidak valid!');
            return;
        }
        
        // Phone validation
        if (data.no_telp.length < 10) {
            alert('Nomor telepon minimal 10 digit!');
            return;
        }
        
        onNext(data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <Head title="Daftar - Informasi Dasar" />
            
            <div className="w-full max-w-md">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-600">Langkah 1 dari 4</span>
                        <span className="text-sm text-gray-500">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang!</h2>
                        <p className="text-gray-600">Mari mulai dengan informasi dasar Anda</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                id="nama"
                                type="text"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Masukkan nama lengkap Anda"
                                required
                            />
                            {errors.nama && <p className="mt-1 text-sm text-red-600">{errors.nama}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="nama@email.com"
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="no_telp" className="block text-sm font-medium text-gray-700 mb-2">
                                Nomor Telepon
                            </label>
                            <input
                                id="no_telp"
                                type="tel"
                                value={data.no_telp}
                                onChange={(e) => setData('no_telp', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="08123456789"
                                required
                            />
                            {errors.no_telp && <p className="mt-1 text-sm text-red-600">{errors.no_telp}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Memproses...' : 'Lanjutkan'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Sudah punya akun?{' '}
                            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Masuk di sini
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}