import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { RegistrationData } from '@/types/registration';

interface Role {
    id: number;
    role_name: string;
}

interface Step3RoleProps {
    onNext: (data: { role_id: number }) => void;
    onBack: () => void;
    userData?: RegistrationData; // Make it optional
    roles: Role[];
    processing?: boolean;
    errors: any;
}

export default function Step3RoleSelection({ 
    onNext, 
    onBack, 
    userData = {}, // Provide default empty object
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

        // Validasi sisi klien
        if (data.role_id === 0) {
            // Bisa menggunakan setError jika tersedia atau alert
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <Head title="Daftar - Pilih Peran" />
            
            <div className="w-full max-w-md">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-600">Langkah 3 dari 3</span>
                        <span className="text-sm text-gray-500">Pilih Peran</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{width: '100%'}}></div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hampir Selesai!</h2>
                        <p className="text-gray-600">Pilih peran yang sesuai dengan Anda</p>
                        
                        {/* Tampilkan info user - dengan pengecekan yang aman */}
                        {userData?.step1?.nama && userData?.step1?.email && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <strong>{userData.step1.nama}</strong> • {userData.step1.email}
                                </p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                Saya adalah: <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-3">
                                {roles?.map(role => (
                                    <label 
                                        key={role.id} 
                                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                            data.role_id === role.id 
                                                ? 'border-blue-500 bg-blue-50 shadow-md' 
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role_id"
                                            value={role.id}
                                            checked={data.role_id === role.id}
                                            onChange={() => handleRoleChange(role.id)}
                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            disabled={processing}
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center">
                                                <span className="text-lg font-medium text-gray-900">{role.role_name}</span>
                                                {data.role_id === role.id && (
                                                    <svg className="ml-2 w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            {/* Tambahkan deskripsi role jika diperlukan */}
                                            {role.id === 1 && (
                                                <p className="text-sm text-gray-500 mt-1">Saya tertarik untuk berinvestasi</p>
                                            )}
                                            {role.id === 2 && (
                                                <p className="text-sm text-gray-500 mt-1">Saya memiliki usaha dan mencari modal</p>
                                            )}
                                        </div>
                                    </label>
                                )) || (
                                    <div className="text-center text-gray-500 py-4">
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

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                            <button
                                type="button"
                                onClick={onBack}
                                disabled={processing}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Kembali
                            </button>
                            <button
                                type="submit"
                                disabled={processing || data.role_id === 0}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mendaftar...
                                    </>
                                ) : (
                                    <>
                                        Selesaikan Pendaftaran
                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Tips untuk user */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
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