import { RegistrationData } from '@/types/registration';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';

interface Role {
    id: number;
    role_name: string;
    icon: string;
}

interface Step4RoleProps {
    onNext: (data: { role_id: number }) => void;
    onBack: () => void;
    userData?: RegistrationData;
    roles: Role[];
    processing?: boolean;
    errors: any;
    initialData?: Role;
}

export default function Step4RoleSelection({ onNext, onBack, initialData, userData = {}, roles, processing = false, errors = {} }: Step4RoleProps) {
    const { data, setData, clearErrors } = useForm({
        role_id: initialData?.id ?? userData?.step4?.role_id ?? 0,
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

    useEffect(() => {
        if (initialData) {
            setData('role_id', initialData?.id ?? userData?.step4?.role_id ?? 0);
        }
    }, [initialData]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Head title="Daftar - Pilih Peran" />

            <div className="w-full max-w-md">
                <div className="mb-8">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">DAFTAR AKUN</span>
                        <span className="text-sm text-gray-500">Langkah 3 dari 3</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600" style={{ width: '75%' }}></div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-gray-900">Hampir Selesai!</h2>
                        <p className="text-gray-600">Pilih peran yang sesuai dengan Anda</p>
                        {userData?.step1?.nama && userData?.step1?.email && (
                            <div className="mt-4 rounded-lg bg-blue-50 p-2">
                                <p className="text-sm text-blue-800">
                                    {userData.step1.nama} • {userData.step1.email}
                                </p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Saya adalah: <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-3">
                                {roles?.map((role) => (
                                    <label
                                        key={role.id}
                                        className={`flex cursor-pointer items-center rounded-lg border-2 p-3 transition-all duration-200 ${
                                            data.role_id === role.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role_id"
                                            value={role.id}
                                            checked={data.role_id === role.id}
                                            onChange={() => handleRoleChange(role.id)}
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                            disabled={processing}
                                        />
                                        <div className="ml-3 flex items-center">
                                            <img src={`/storage/${role.icon}`} alt={`${role.role_name} icon`} className="mr-2 h-6 w-6" />
                                            <div>
                                                <span className="text-base font-medium text-gray-900">{role.role_name}</span>
                                                {role.id === 1 && <p className="text-sm text-gray-500">Saya tertarik untuk berinvestasi</p>}
                                                {role.id === 2 && <p className="text-sm text-gray-500">Saya memiliki usaha dan mencari modal</p>}
                                            </div>
                                        </div>
                                    </label>
                                )) || <div className="py-2 text-center text-gray-500">Tidak ada peran yang tersedia</div>}
                            </div>
                            {errors?.role_id && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.role_id}
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
                                disabled={processing || data.role_id === 0}
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
                            <svg className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-sm text-gray-600">
                                <p className="mb-1 font-medium">Informasi:</p>
                                <p>
                                    Peran yang Anda pilih akan menentukan fitur dan akses yang tersedia di platform. Anda dapat mengubah peran nanti
                                    melalui pengaturan profil.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
