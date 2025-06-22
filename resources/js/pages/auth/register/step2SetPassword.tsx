import { RegistrationData } from '@/types/registration';
import { Head, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface Step2PasswordProps {
    onNext?: (data: { password: string; password_confirmation: string }) => void;
    onBack?: () => void;
    userData?: RegistrationData;
    processing?: boolean;
    errors?: any;
}

export default function Step2Password({ onNext, onBack, userData = {} as RegistrationData, processing = false, errors = {} }: Step2PasswordProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localProcessing, setLocalProcessing] = useState(false);

    // Menggunakan state lokal yang konsisten dengan parent
    const [data, setData] = useState({
        password: '',
        password_confirmation: '',
    });

    const [localErrors, setLocalErrors] = useState<any>({});

    // Debug logging untuk memeriksa props
    useEffect(() => {
        console.log('Step2Password Debug Props:', {
            onNext: onNext,
            onNextType: typeof onNext,
            onBack: onBack,
            onBackType: typeof onBack,
            userData: userData,
            processing: processing,
            errors: errors,
        });
    }, [onNext, onBack, userData, processing, errors]);

    // Update local errors ketika server errors datang
    useEffect(() => {
        setLocalErrors(errors);
    }, [errors]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocalErrors({});

        console.log('handleSubmit called, checking onNext:', {
            onNext: onNext,
            onNextType: typeof onNext,
            onNextDefined: onNext !== undefined,
            onNextIsFunction: typeof onNext === 'function',
        });

        // Validasi sisi klien
        const newErrors: Record<string, string> = {};

        if (!data.password.trim()) {
            newErrors.password = 'Password harus diisi';
        } else if (data.password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter';
        }

        if (!data.password_confirmation.trim()) {
            newErrors.password_confirmation = 'Konfirmasi password harus diisi';
        } else if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password tidak sesuai';
        }

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        // Jika parent handler tersedia, gunakan itu
        if (onNext && typeof onNext === 'function') {
            console.log('Calling parent onNext with data:', data);
            onNext(data);
        } else {
            // Fallback: handle langsung dengan router
            console.log('Parent onNext not available, handling directly with router');
            setLocalProcessing(true);

            try {
                await new Promise<void>((resolve, reject) => {
                    router.post('/register/set-password', data, {
                        preserveState: true,
                        preserveScroll: true,
                        onSuccess: () => {
                            console.log('Password set successfully');
                            // Redirect ke step 3 atau halaman selanjutnya
                            router.visit('/register?step=3');
                            resolve();
                        },
                        onError: (serverErrors) => {
                            console.error('Password set errors:', serverErrors);
                            setLocalErrors(serverErrors);
                            reject(serverErrors);
                        },
                        onFinish: () => {
                            setLocalProcessing(false);
                        },
                    });
                });
            } catch (error) {
                console.error('Error during password submission:', error);
                setLocalErrors({
                    general: 'Terjadi kesalahan saat menyimpan password. Silakan coba lagi.',
                });
            }
        }
    };

    const handleInputChange = (field: keyof typeof data, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
        // Clear error untuk field ini ketika user mulai mengetik
        if (localErrors[field]) {
            setLocalErrors((prev: any) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleBackClick = () => {
        console.log('handleBackClick called, checking onBack:', {
            onBack: onBack,
            onBackType: typeof onBack,
            onBackDefined: onBack !== undefined,
            onBackIsFunction: typeof onBack === 'function',
        });

        if (onBack && typeof onBack === 'function') {
            console.log('Calling parent onBack');
            onBack();
        } else {
            // Fallback: redirect ke step 1
            console.log('Parent onBack not available, redirecting to step 1');
            router.visit('/register?step=1');
        }
    };

    // Fungsi untuk menghitung kekuatan password
    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        return strength;
    };

    const passwordStrength = getPasswordStrength(data.password);

    const getStrengthColor = () => {
        if (passwordStrength < 50) return 'bg-red-500';
        if (passwordStrength < 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getStrengthText = () => {
        if (passwordStrength < 50) return 'Lemah';
        if (passwordStrength < 75) return 'Sedang';
        return 'Kuat';
    };

    const getStrengthTextColor = () => {
        if (passwordStrength < 50) return 'text-red-500';
        if (passwordStrength < 75) return 'text-yellow-500';
        return 'text-green-500';
    };

    // Determine if we're processing (either from parent or local)
    const isProcessing = processing || localProcessing;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
            <Head title="Daftar - Buat Password" />

            <div className="w-full max-w-md">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">Langkah 2 dari 3</span>
                        <span className="text-sm text-gray-500">Buat Password</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600 transition-all duration-300" style={{ width: '66%' }}></div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Keamanan Akun</h2>
                        <p className="text-gray-600">Buat password yang kuat untuk melindungi akun Anda</p>

                        {/* Tampilkan info user dari step 1 - dengan pengecekan yang aman */}
                        {userData && userData.step1 && userData.step1.nama && userData.step1.email && (
                            <div className="mt-4 rounded-lg bg-blue-50 p-3">
                                <p className="text-sm text-blue-800">
                                    <strong>{userData.step1.nama}</strong> • {userData.step1.email}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Error umum jika ada masalah sistem */}
                    {localErrors.general && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                            <p className="flex items-center text-sm text-red-600">
                                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {localErrors.general}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-3 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                        localErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    placeholder="Minimal 8 karakter"
                                    disabled={isProcessing}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    tabIndex={-1}
                                >
                                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {showPassword ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>

                            {/* Indikator Kekuatan Password */}
                            {data.password && (
                                <div className="mt-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                                                style={{ width: `${passwordStrength}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-xs font-medium ${getStrengthTextColor()}`}>{getStrengthText()}</span>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-600">
                                        <p>Password harus mengandung:</p>
                                        <ul className="mt-1 space-y-1">
                                            <li className={`flex items-center ${data.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                                                <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Minimal 8 karakter
                                            </li>
                                            <li className={`flex items-center ${/[a-z]/.test(data.password) ? 'text-green-600' : 'text-gray-400'}`}>
                                                <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Huruf kecil
                                            </li>
                                            <li className={`flex items-center ${/[A-Z]/.test(data.password) ? 'text-green-600' : 'text-gray-400'}`}>
                                                <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Huruf besar
                                            </li>
                                            <li className={`flex items-center ${/[0-9]/.test(data.password) ? 'text-green-600' : 'text-gray-400'}`}>
                                                <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Angka
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {localErrors.password && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {localErrors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium text-gray-700">
                                Konfirmasi Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-3 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                        localErrors.password_confirmation ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    placeholder="Ulangi password Anda"
                                    disabled={isProcessing}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    tabIndex={-1}
                                >
                                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {showConfirmPassword ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>

                            {/* Indikator Kecocokan Password */}
                            {data.password_confirmation && (
                                <div className="mt-2">
                                    {data.password === data.password_confirmation ? (
                                        <p className="flex items-center text-sm text-green-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Password cocok
                                        </p>
                                    ) : (
                                        <p className="flex items-center text-sm text-red-600">
                                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Password tidak cocok
                                        </p>
                                    )}
                                </div>
                            )}

                            {localErrors.password_confirmation && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {localErrors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <button
                                type="button"
                                onClick={handleBackClick}
                                disabled={isProcessing}
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
                                disabled={isProcessing || !data.password.trim() || !data.password_confirmation.trim()}
                                className="group flex flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {isProcessing ? (
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

                    {/* Tips untuk user */}
                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
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
                                <p className="mb-1 font-medium">Tips Keamanan:</p>
                                <p>
                                    Gunakan kombinasi huruf besar, huruf kecil, angka untuk password yang lebih aman. Hindari menggunakan informasi
                                    pribadi yang mudah ditebak.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Debug info untuk development
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
                            <p className="font-semibold text-yellow-800 mb-1">Step2 Debug:</p>
                            <p className="text-yellow-700">onNext: {typeof onNext} | onBack: {typeof onBack}</p>
                            <p className="text-yellow-700">Props defined: onNext={onNext ? 'YES' : 'NO'} | onBack={onBack ? 'YES' : 'NO'}</p>
                            <p className="text-yellow-700">Local Processing: {localProcessing ? 'YES' : 'NO'}</p>
                            <p className="text-yellow-700">Parent Processing: {processing ? 'YES' : 'NO'}</p>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
