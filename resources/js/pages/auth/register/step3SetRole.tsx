import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { RegistrationData } from '@/types/registration';

interface Role {
    id: number;
    role_name: string;
    icon: string;
}

interface Step3RoleProps {
    onNext: (data: { role_id: number }) => void;
    onBack: () => void;
    userData?: RegistrationData;
    roles: Role[];
    processing?: boolean;
    errors: any;
}

export default function Step3RoleSelection({ 
    onNext, 
    onBack, 
    userData = {},
    roles, 
    processing = false, 
    errors = {} 
}: Step3RoleProps) {
    const { data, setData, clearErrors } = useForm({
        role_id: 0,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();

        if (data.role_id === 0) {
            alert('Silakan pilih peran Anda!');
            return;
        }

        onNext({ role_id: data.role_id });
    };

    const handleRoleChange = (roleId: number) => {
        setData('role_id', roleId);
        clearErrors('role_id');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Head title="Daftar - Pilih Peran" />
            
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-600">DAFTAR AKUN</span>
                        <span className="text-sm text-gray-500">Langkah 3 dari 4</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Hampir Selesai!</h2>
                        <p className="text-gray-600">Pilih peran yang sesuai dengan Anda</p>
                        {userData?.step1?.nama && userData?.step1?.email && (
                            <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    {userData.step1.nama} • {userData.step1.email}
                                </p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Saya adalah: <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-3">
                                {roles?.map(role => (
                                    <label 
                                        key={role.id} 
                                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                            data.role_id === role.id 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role_id"
                                            value={role.id}
                                            checked={data.role_id === role.id}
                                            onChange={() => handleRoleChange(role.id)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            disabled={processing}
                                        />
                                        <div className="ml-3 flex items-center">
                                            <img
                                                src={`/storage/${role.icon}`}
                                                alt={`${role.role_name} icon`}
                                                className="w-6 h-6 mr-2"
                                            />
                                            <div>
                                                <span className="text-base font-medium text-gray-900">{role.role_name}</span>
                                                {role.id === 1 && (
                                                    <p className="text-sm text-gray-500">Saya tertarik untuk berinvestasi</p>
                                                )}
                                                {role.id === 2 && (
                                                    <p className="text-sm text-gray-500">Saya memiliki usaha dan mencari modal</p>
                                                )}
                                            </div>
                                        </div>
                                    </label>
                                )) || (
                                    <div className="text-center text-gray-500 py-2">
                                        Tidak ada peran yang tersedia
                                    </div>
                                )}
                            </div>
                            {errors?.role_id && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.role_id}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                type="button"
                                onClick={onBack}
                                disabled={processing}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Kembali
                            </button>
                            <button
                                type="submit"
                                disabled={processing || data.role_id === 0}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {processing ? 'Mendaftar...' : 'Selesaikan Pendaftaran'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-gray-600">
                                <p className="font-medium mb-1">Informasi:</p>
                                <p>Peran yang Anda pilih akan menentukan fitur dan akses yang tersedia di platform. Anda dapat mengubah peran nanti melalui pengaturan profil.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}