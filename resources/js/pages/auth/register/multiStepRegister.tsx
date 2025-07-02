import { Investor } from '@/types/investor';
import { RegistrationData } from '@/types/registration';
import { UsahaBaru, UsahaOngoing } from '@/types/usaha-baru-ongoing';
import { Head, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import Step1BasicInfo from './step1BasicInfo';
import Step2Password from './step2SetPassword';
import Step3DataDiri from './step3FormDataDiri';
import Step4RoleSelection from './step4SetRole';
import Step5StatusUsaha from './step5SetStatusUsaha';
import Step5bFormInvestor from './step5bFormInvestor';
import Step6aFormUsahaBaru from './step6aFormUsahaBaru';
import Step6bFormUsahaOngoing from './step6bFormUsahaOngoing';

interface Role {
    id: number;
    role_name: string;
    icon: string;
}

interface MultiStepRegisterProps {
    roles?: Role[];
    initialStep?: number;
    registrationData?: RegistrationData;
}
// const { props } = usePage<any>();
// const jenisUsahaOptions = props.jenisUsahaOptions;
// const targetPasarOptions = props.targetPasarOptions;

export default function MultiStepRegister({ roles = [], initialStep = 1, registrationData }: MultiStepRegisterProps) {
    const { props } = usePage<any>();
    const jenisUsahaOptions = props.jenisUsahaOptions;
    const targetPasarOptions = props.targetPasarOptions;
    const pekerjaanOptions = props.pekerjaanOptions;

    const [userData, setUserData] = useState<RegistrationData>(() => {
        return registrationData ?? {};
    });

    const [currentStep, setCurrentStep] = useState<number>(() => {
        if (registrationData?.step5?.completed) return 6;
        if (registrationData?.step4?.completed) return 5;
        if (registrationData?.step3?.completed) return 4;
        if (registrationData?.step2?.completed) return 3;
        if (registrationData?.step1) return 2;
        return 1;
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    // Use useCallback to ensure functions are stable references
    const handleStep1Next = useCallback(async (data: { nama: string; email: string; no_telp: string }) => {
        console.log('handleStep1Next called with:', data);
        setLoading(true);
        setErrors({});

        try {
            await new Promise((resolve, reject) => {
                router.post('/register/basic-info', data, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        console.log('Step 1 success:', data);
                        setUserData((prev) => ({
                            ...prev,
                            step1: data,
                            step3: prev.step3
                                ? {
                                      ...prev.step3,
                                      nama_lengkap: data.nama, // update nama_lengkap hanya kalau step3 sudah pernah ada
                                  }
                                : prev.step3,
                        }));
                        setCurrentStep(2);
                        resolve(true);
                    },
                    onError: (serverErrors) => {
                        console.error('Step 1 errors:', serverErrors);
                        setErrors(serverErrors);
                        reject(serverErrors);
                    },
                    onFinish: () => {
                        setLoading(false);
                    },
                });
            });
        } catch (error) {
            console.error('Step 1 catch error:', error);
        }
    }, []);

    const handleStep2Next = useCallback(async (data: { password: string; password_confirmation: string }) => {
        console.log('handleStep2Next called with:', data);
        setLoading(true);
        setErrors({});

        try {
            await new Promise((resolve, reject) => {
                router.post('/register/set-password', data, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: (page) => {
                        console.log('Step 2 success - page data:', page);

                        // Update userData dengan step2 completed
                        setUserData((prev) => ({
                            ...prev,
                            step2: {
                                password: data.password,
                                password_confirmation: data.password_confirmation,
                                completed: true, // Penting: tandai sebagai completed
                            },
                        }));

                        // Pindah ke step 3
                        setCurrentStep(3);
                        resolve(true);
                    },
                    onError: (serverErrors) => {
                        console.error('Step 2 errors:', serverErrors);
                        setErrors(serverErrors);
                        reject(serverErrors);
                    },
                    onFinish: () => {
                        setLoading(false);
                    },
                });
            });
        } catch (error) {
            console.error('Step 2 catch error:', error);
        }
    }, []);

    const handleStep3Next = useCallback(async (data: any) => {
        console.log('handleStep3Next called with:', data);
        setLoading(true);
        setErrors({});

        try {
            await new Promise((resolve, reject) => {
                router.post('/register/set-data-diri', data, {
                    preserveState: true,
                    onSuccess: () => {
                        console.log('Step 3 success:', data);

                        setUserData((prev) => ({
                            ...prev,
                            step3: {
                                ...data,
                                completed: true,
                            },
                            step1: {
                                ...prev.step1,
                                nama: data.nama_lengkap,
                                email: prev.step1?.email ?? '',
                                no_telp: prev.step1?.no_telp ?? '',
                            },
                        }));

                        setCurrentStep(4);

                        resolve(true);
                    },
                    onError: (serverErrors) => {
                        console.error('Step 3 errors:', serverErrors);
                        setErrors(serverErrors);
                        reject(serverErrors);
                    },
                    onFinish: () => {
                        setLoading(false);
                    },
                });
            });
        } catch (error) {
            console.error('Step 3 catch error:', error);
        }
    }, []);

    const handleStep4Next = useCallback(
        async (data: { role_id: number }) => {
            console.log('handleStep4Next called with:', data);
            setLoading(true);
            setErrors({});

            try {
                await new Promise((resolve, reject) => {
                    router.post('/register/set-role', data, {
                        preserveState: true,
                        onSuccess: () => {
                            console.log('Step 4 success:', data);

                            setUserData((prev) => ({
                                ...prev,
                                step4: {
                                    role_id: data.role_id,
                                    completed: true,
                                },
                            }));

                            setCurrentStep(5);

                            resolve(true);
                        },
                        onError: (serverErrors) => {
                            console.error('Step 4 errors:', serverErrors);
                            setErrors(serverErrors);
                            reject(serverErrors);
                        },
                        onFinish: () => {
                            setLoading(false);
                        },
                    });
                });
            } catch (error) {
                console.error('Step 4 catch error:', error);
            }
        },
        [userData, registrationData],
    );

    const handleStep5Next = useCallback(
        async (data: { status_usaha: 'usaha_baru' | 'usaha_ongoing' } | Investor) => {
            console.log('handleStep5Next called with:', data);
            setLoading(true);
            setErrors({});

            const isInvestor = userData?.step4?.role_id === 1;

            try {
                if (isInvestor) {
                    await new Promise((resolve, reject) => {
                        router.post('/register/show-form-investor', data, {
                            preserveState: true,
                            onSuccess: () => {
                                console.log('Registrasi investor berhasil.');

                                setUserData((prev) => ({
                                    ...prev,
                                    step5: {
                                        type: 'investor',
                                        investor: data as Investor,
                                        completed: true,
                                    },
                                }));

                                resolve(true);
                            },
                            onError: (serverErrors) => {
                                console.error('Step5b registrasi investor error:', serverErrors);
                                setErrors(serverErrors);
                                reject(serverErrors);
                            },
                            onFinish: () => setLoading(false),
                        });
                    });

                    return;
                }

                const statusData = data as { status_usaha: 'usaha_baru' | 'usaha_ongoing' };

                await new Promise((resolve, reject) => {
                    router.post('/register/set-status-usaha', statusData, {
                        preserveState: true,
                        onSuccess: () => {
                            setUserData((prev) => {
                                const statusBerubah = prev.step5?.type === 'umkm' && prev.step5.status_usaha !== data.status_usaha;

                                const updated = {
                                    ...prev,
                                    step5: {
                                        type: 'umkm' as const,
                                        status_usaha: statusData.status_usaha,
                                        completed: true,
                                    },
                                };

                                if (statusBerubah) {
                                    console.log('Status usaha berubah, data step6 dihapus');
                                    delete updated.step6;
                                }

                                return updated;
                            });
                            setCurrentStep(6);
                            resolve(true);
                        },
                        onError: (serverErrors) => {
                            console.error('Step 5 errors:', serverErrors);
                            setErrors(serverErrors);
                            reject(serverErrors);
                        },
                        onFinish: () => setLoading(false),
                    });
                });
            } catch (error) {
                console.error('Step 5 catch error:', error);
            }
        },
        [userData, registrationData],
    );

    const handleStep6Next = useCallback(
        async (data: any) => {
            console.log('handleStep6Next called with:', data);
            setLoading(true);
            setErrors({});

            // const statusUsaha = userData?.step5?.status_usaha;
            const statusUsaha = userData?.step5?.type === 'umkm' && userData.step5.status_usaha;

            const endpoint = statusUsaha === 'usaha_baru' ? '/register/store-form-usaha-baru' : '/register/store-form-usaha-ongoing';

            try {
                await new Promise((resolve, reject) => {
                    router.post(endpoint, data, {
                        preserveState: true,
                        onSuccess: () => {
                            setUserData((prev) => ({
                                ...prev,
                                step6: {
                                    ...data,
                                    completed: true,
                                },
                            }));
                            resolve(true);
                        },
                        onError: (serverErrors) => {
                            console.error('Step 6 errors:', serverErrors);
                            setErrors(serverErrors);
                            reject(serverErrors);
                        },
                        onFinish: () => setLoading(false),
                    });
                });
            } catch (error) {
                console.error('Step 6 error:', error);
            }
        },
        [userData, registrationData],
    );

    const handleStep2Back = useCallback(() => {
        console.log('handleStep2Back called');
        setCurrentStep(1);
        setErrors({});
    }, []);

    const handleStep3Back = useCallback(() => {
        console.log('handleStep3Back called');
        setCurrentStep(2);
        setErrors({});
    }, []);

    const handleStep4Back = useCallback(() => {
        console.log('handleStep4Back called');
        setCurrentStep(3);
        setErrors({});
    }, []);

    const handleStep5Back = useCallback(() => {
        console.log('handleStep5Back called');
        setCurrentStep(4);
        setErrors({});
    }, []);

    const handleStep6Back = useCallback(() => {
        console.log('handleStep6Back called');
        setCurrentStep(5);
        setErrors({});
    }, []);

    // Clear registration data
    const clearRegistrationData = useCallback(() => {
        router.delete('/register/clear', {
            preserveState: true,
            onSuccess: () => {
                console.log('Registration data cleared');
                setUserData({});
                setCurrentStep(1);
                setErrors({});
            },
        });
    }, []);

    // Debugging current step
    useEffect(() => {
        console.log('Current Step:', currentStep);
        console.log('UserData:', userData);
        console.log('Registration Data from Props:', registrationData);
        console.log('Handler functions:', {
            handleStep1Next: typeof handleStep1Next,
            handleStep2Next: typeof handleStep2Next,
            handleStep3Next: typeof handleStep3Next,
            handleStep4Next: typeof handleStep4Next,
            handleStep5Next: typeof handleStep5Next,
            handleStep6Next: typeof handleStep6Next,
            handleStep2Back: typeof handleStep2Back,
            handleStep3Back: typeof handleStep3Back,
            handleStep4Back: typeof handleStep4Back,
            handleStep5Back: typeof handleStep5Back,
            handleStep6Back: typeof handleStep6Back,
        });

        // Additional debugging for Step 2
        if (currentStep === 2) {
            console.log('Step 2 Debug:', {
                onNext: handleStep2Next,
                onBack: handleStep2Back,
                onNextType: typeof handleStep2Next,
                onBackType: typeof handleStep2Back,
                userData: userData,
                processing: loading,
                errors: errors,
            });
        }
    }, [
        currentStep,
        handleStep1Next,
        handleStep2Next,
        handleStep3Next,
        handleStep4Next,
        handleStep5Next,
        handleStep6Next,
        handleStep2Back,
        handleStep3Back,
        handleStep4Back,
        handleStep5Back,
        handleStep6Back,
        userData,
        loading,
        errors,
        registrationData,
    ]);

    //DEBUG STEP 5
    useEffect(() => {
        console.log('✅ step5 completed:', userData?.step5?.completed);
        console.log('✅ status usaha:', userData?.step5?.type === 'umkm' && userData?.step5?.status_usaha);
        console.log('✅ current step:', currentStep);
        console.log('⏳ Reloaded! props.registrationData:', registrationData);
    }, [userData, currentStep]);

    //initial data step 4
    const selectedRole = roles.find((role) => role.id === userData?.step4?.role_id);

    return (
        <>
            <Head title="Daftar Akun" />

            {currentStep === 1 && <Step1BasicInfo onNext={handleStep1Next} initialData={userData?.step1} processing={loading} errors={errors} />}

            {currentStep === 2 && (
                <Step2Password onNext={handleStep2Next} onBack={handleStep2Back} userData={userData} processing={loading} errors={errors} />
            )}

            {currentStep === 3 && (
                <Step3DataDiri
                    onNext={handleStep3Next}
                    onBack={handleStep3Back}
                    userData={userData}
                    processing={loading}
                    errors={errors}
                    pekerjaanOptions={pekerjaanOptions}
                    initialData={userData?.step3}
                />
            )}

            {currentStep === 4 && (
                <Step4RoleSelection
                    onNext={handleStep4Next}
                    onBack={handleStep4Back}
                    userData={userData}
                    roles={roles}
                    processing={loading}
                    errors={errors}
                    initialData={selectedRole}
                />
            )}

            {/* {currentStep === 5 && (
                <Step5StatusUsaha
                    onNext={handleStep5Next}
                    onBack={handleStep5Back}
                    userData={userData}
                    processing={loading}
                    errors={errors}
                    initialData={userData?.step5}
                />
            )} */}

            {currentStep === 5 && (
                <>
                    {userData?.step4?.role_id === 1 ? (
                        <Step5bFormInvestor
                            onNext={handleStep5Next}
                            onBack={handleStep5Back}
                            userData={userData}
                            processing={loading}
                            errors={errors}
                            jenisUsahaOptions={jenisUsahaOptions}
                            targetPasarOptions={targetPasarOptions}
                            initialData={userData?.step5?.type === 'investor' ? userData.step5.investor : undefined}
                        />
                    ) : (
                        <Step5StatusUsaha
                            onNext={handleStep5Next}
                            onBack={handleStep5Back}
                            userData={userData}
                            processing={loading}
                            errors={errors}
                            initialData={userData?.step5?.type === 'umkm' ? { status_usaha: userData.step5.status_usaha } : undefined}
                        />
                    )}
                </>
            )}

            {currentStep === 6 && userData?.step5?.type === 'umkm' && userData?.step5?.status_usaha === 'usaha_baru' && (
                <Step6aFormUsahaBaru
                    onNext={handleStep6Next}
                    onBack={handleStep6Back}
                    userData={userData}
                    processing={loading}
                    errors={errors}
                    jenisUsahaOptions={jenisUsahaOptions}
                    targetPasarOptions={targetPasarOptions}
                    initialData={
                        userData?.step5?.type === 'umkm' && userData?.step5?.status_usaha === 'usaha_baru' ? (userData.step6 as UsahaBaru) : undefined
                    }
                />
            )}

            {currentStep === 6 && userData?.step5?.type === 'umkm' && userData?.step5?.status_usaha === 'usaha_ongoing' && (
                <Step6bFormUsahaOngoing
                    onNext={handleStep6Next}
                    onBack={handleStep6Back}
                    userData={userData}
                    processing={loading}
                    errors={errors}
                    jenisUsahaOptions={jenisUsahaOptions}
                    targetPasarOptions={targetPasarOptions}
                    initialData={
                        userData?.step5?.type === 'umkm' && userData?.step5?.status_usaha === 'usaha_ongoing'
                            ? (userData.step6 as UsahaOngoing)
                            : undefined
                    }
                />
            )}

            {/* Enhanced Debug info in development
            {process.env.NODE_ENV === 'development' && (
                <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded text-sm max-w-xs">
                    <p className="font-semibold mb-2">Debug Info:</p>
                    <p>Current Step: {currentStep}</p>
                    <p>Has Step 1: {userData?.step1 ? 'Yes' : 'No'}</p>
                    <p>Has Step 2: {userData?.step2 ? 'Yes' : 'No'}</p>
                    <p>Step 2 Completed: {userData?.step2?.completed ? 'Yes' : 'No'}</p>
                    <p>Loading: {loading ? 'Yes' : 'No'}</p>
                    <p>Step2 onNext: {typeof handleStep2Next}</p>
                    <p>Step2 onBack: {typeof handleStep2Back}</p>
                    <p>onNext defined: {handleStep2Next ? 'Yes' : 'No'}</p>
                    <p>onBack defined: {handleStep2Back ? 'Yes' : 'No'}</p>
                    <p>UserData valid: {userData && typeof userData === 'object' ? 'Yes' : 'No'}</p>
                    <p>RegistrationData from Props: {registrationData ? 'Yes' : 'No'}</p>
                    {Object.keys(errors).length > 0 && (
                        <div className="mt-2">
                            <p className="text-red-400">Errors:</p>
                            <pre className="text-xs overflow-auto max-h-20">
                                {JSON.stringify(errors, null, 1)}
                            </pre>
                        </div>
                    )}
                    <button 
                        onClick={clearRegistrationData}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs w-full"
                    >
                        Clear Data
                    </button>
                </div>
            )} */}
        </>
    );
}
