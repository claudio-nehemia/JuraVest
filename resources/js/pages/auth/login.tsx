import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Head title="Log in" />

        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang!</h2>
                    <p className="text-gray-600">Masukkan email dan kata sandi Anda untuk masuk</p>
                </div>

                <form className="space-y-6" onSubmit={submit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 border-gray-300 hover:border-gray-400"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <div className="flex items-center">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 border-gray-300 hover:border-gray-400"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing || !data.email.trim() || !data.password.trim()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        tabIndex={4}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="animate-spin h-5 w-5 mr-2" />
                                Memproses...
                            </>
                        ) : (
                            <>Masuk</>
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Belum punya akun?{' '}
                            <TextLink href={route('register')} tabIndex={5}>
                                Daftar di sini
                            </TextLink>
                        </p>
                    </div>
                </form>

                {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}
            </div>
        </div>
    </div>
);

}
