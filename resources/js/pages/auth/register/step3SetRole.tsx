import { Head } from '@inertiajs/react';
import { useState } from 'react';
// debug umkm_status
// import { useState, useEffect } from 'react';

interface Role {
    id: number;
    role_name: string;
    image: string;
}

interface Step2RoleProps {
    onNext: (data: { role_id: number; umkm_status?: string | null }) => void;
    onBack: () => void;
    userData: Record<string, any>;
}
export default function Step2RoleSelection({ onNext, onBack, userData }: Step2RoleProps) {
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
    const [processing, setProcessing] = useState(false);
    const [umkmStatus, setUmkmStatus] = useState<string | null>(null);

    const roles: Role[] = [
        {
            id: 1,
            role_name: 'UMKM',
            image: '/favicon.svg',
            //dummy image//
        },
        {
            id: 2,
            role_name: 'Investor',
            image: '/favicon.svg',
        },
    ];

    const handleSubmit = () => {
        // tanpa umkm_status
        // if (selectedRoleId !== null) {
        //     setProcessing(true);
        //     onNext({ role_id: selectedRoleId });
        // } else {
        //     alert('Silahkan pilih jenis pengguna terlebih dahulu');
        // }

        if (selectedRoleId === null) {
            alert('Silakan pilih jenis pengguna terlebih dahulu');
            return;
        }

        if (selectedRoleId === 1 && umkmStatus === null) {
            alert('Silakan pilih status UMKM terlebih dahulu');
            return;
        }

        setProcessing(true);

        const payload: any = {
            role_id: selectedRoleId,
        };

        if (selectedRoleId === 1) {
            payload.umkm_status = umkmStatus;
        }

        onNext(payload);
    };

    // debug umkm_status
    // useEffect(() => {
    //     console.log('Status UMKM sekarang:', umkmStatus);
    // }, [umkmStatus]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
            <Head title="Daftar - Buat Password" />

            <div className="w-full max-w-md">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">Langkah 3 dari 4</span>
                        <span className="text-sm text-gray-500">75%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600" style={{ width: '75%' }}></div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                    <div className="mb-4 text-center">
                        {/* LOGO */}
                        {/* <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div> */}
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Jenis Pengguna</h2>
                        <p className="text-gray-600">Tentukan Peran Anda di JuraVest</p>
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {roles.map((role) => (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRoleId(role.id)}
                                className={`cursor-pointer rounded-2xl border p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md ${
                                    selectedRoleId === role.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                                }`}
                            >
                                <img src={role.image} alt={role.role_name} className="mx-auto mb-4 h-35 w-20 object-contain" />
                                <p className="text-xl font-semibold text-gray-800">{role.role_name}</p>
                            </div>
                        ))}
                    </div>

                    {selectedRoleId === 1 && (
                        <div className="mt-4 mb-4">
                            <p className="mb-2 text-center font-medium">Apakah UMKM anda sudah berjalan?</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setUmkmStatus('berjalan')}
                                    className={`rounded-lg border px-4 py-2 font-semibold ${
                                        umkmStatus === 'berjalan' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
                                    }`}
                                >
                                    Sudah Berjalan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUmkmStatus('baru')}
                                    className={`rounded-lg border px-4 py-2 font-semibold ${
                                        umkmStatus === 'baru' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
                                    }`}
                                >
                                    Baru Mulai
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-1 rounded-lg bg-gray-100 px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-200"
                        >
                            Kembali
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Memproses...' : 'Lanjutkan'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
