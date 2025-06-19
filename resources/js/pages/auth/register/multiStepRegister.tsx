import React, { useState, useEffect, useCallback } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Step1BasicInfo from './step1BasicInfo';
import Step2Password from './step2SetPassword';
import Step3RoleSelection from './step3SetRole';
import { RegistrationData } from '@/types/registration';

interface Role {
    id: number;
    role_name: string;
    icon: string
}

interface MultiStepRegisterProps {
    roles?: Role[];
    initialStep?: number;
    registrationData?: RegistrationData;
}

export default function MultiStepRegister({ 
    roles = [], 
    initialStep = 1, 
    registrationData 
}: MultiStepRegisterProps) {
    const { props } = usePage();
    const [currentStep, setCurrentStep] = useState(initialStep);
    
    // Initialize userData with proper default structure
    const [userData, setUserData] = useState<RegistrationData>(() => {
        if (registrationData && typeof registrationData === 'object') {
            return registrationData;
        }
        return {};
    });
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    // Initialize data from props if available - dengan perbaikan logika
    useEffect(() => {
        console.log('Registration data:', registrationData);
        if (registrationData && typeof registrationData === 'object') {
            setUserData(registrationData);
            
            // Perbaikan logika penentuan step
            // Jika step2 completed, maka ke step 3
            if (registrationData.step2?.completed) {
                console.log('Step 2 completed, moving to step 3');
                setCurrentStep(3);
            } 
            // Jika hanya step1 yang ada, maka ke step 2
            else if (registrationData.step1) {
                console.log('Step 1 completed, moving to step 2');
                setCurrentStep(2);
            } 
            // Jika tidak ada data, tetap di step 1
            else {
                console.log('No data, staying at step 1');
                setCurrentStep(1);
            }
        } else {
            // Jika tidak ada registrationData, tetap di step 1
            setCurrentStep(1);
        }
    }, [registrationData]);

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
                        setUserData(prev => ({ ...prev, step1: data }));
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
                    }
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
                        setUserData(prev => ({ 
                            ...prev, 
                            step2: { 
                                password: data.password,
                                password_confirmation: data.password_confirmation,
                                completed: true // Penting: tandai sebagai completed
                            } 
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
                    }
                });
            });
        } catch (error) {
            console.error('Step 2 catch error:', error);
        }
    }, []);

    const handleStep3Next = useCallback(async (data: { role_id: number }) => {
        console.log('handleStep3Next called with:', data);
        setLoading(true);
        setErrors({});
        
        try {
            await new Promise((resolve, reject) => {
                router.post('/register/registration', data, {
                    onSuccess: () => {
                        console.log('Step 3 success:', data);
                        resolve(true);
                    },
                    onError: (serverErrors) => {
                        console.error('Step 3 errors:', serverErrors);
                        setErrors(serverErrors);
                        reject(serverErrors);
                    },
                    onFinish: () => {
                        setLoading(false);
                    }
                });
            });
        } catch (error) {
            console.error('Step 3 catch error:', error);
        }
    }, []);

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

    // Clear registration data
    const clearRegistrationData = useCallback(() => {
        router.delete('/register/clear', {
            preserveState: true,
            onSuccess: () => {
                console.log('Registration data cleared');
                setUserData({});
                setCurrentStep(1);
                setErrors({});
            }
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
            handleStep2Back: typeof handleStep2Back,
            handleStep3Back: typeof handleStep3Back
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
                errors: errors
            });
        }
    }, [currentStep, handleStep1Next, handleStep2Next, handleStep3Next, handleStep2Back, handleStep3Back, userData, loading, errors, registrationData]);

    return (
        <>
            <Head title="Daftar Akun" />
            
            {currentStep === 1 && (
                <Step1BasicInfo 
                    onNext={handleStep1Next}
                    initialData={userData?.step1}
                    processing={loading}
                    errors={errors}
                />
            )}
            
            {currentStep === 2 && (
                <Step2Password 
                    onNext={handleStep2Next}
                    onBack={handleStep2Back}
                    userData={userData}
                    processing={loading}
                    errors={errors}
                />
            )}
            
            {currentStep === 3 && (
                <Step3RoleSelection 
                    onNext={handleStep3Next}
                    onBack={handleStep3Back}
                    userData={userData}
                    roles={roles}
                    processing={loading}
                    errors={errors}
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