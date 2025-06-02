import { router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader, 
    CardTitle,
} from "@/components/ui/card";

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
}

interface Props {
    user?: User;
    roles: Array<{ id: number; role_name: string }>;
    mode: 'create' | 'edit';
    [key: string]: any;
}

const UserForm = () => {
    const { user, roles, mode } = usePage<Props>().props;
    
    const isEditing = mode === 'edit';

    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        role_id: user?.role_id || '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (isEditing && user) {
            put(`/admin/user/${user.id}`, {
                preserveScroll: true,
            });
        } else {
            post('/admin/user', {
                preserveScroll: true,
            });
        }
    };

    const pageTitle = isEditing ? "Edit User" : "Tambah User";
    const buttonText = processing ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Simpan');
    const passwordLabel = isEditing ? "Password (Opsional)" : "Password";
    const passwordPlaceholder = isEditing ? "Kosongkan jika tidak diubah" : "Enter Strong Password";

    return (
        <AppLayout>
            <Head title={pageTitle} />

            <div className="p-4 w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>{pageTitle}</CardTitle>
                    </CardHeader>
                    <form onSubmit={submit}>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 items-start">
                                {/* Nama */}
                                <div className="flex flex-col space-y-0.5">
                                    <Label>Nama</Label>
                                    <Input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama User"
                                    />
                                    <div className="min-h-[1rem]">
                                        {errors.name && <InputError message={errors.name} />}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col space-y-0.5">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                        disabled={isEditing && processing}
                                    />
                                    <div className="min-h-[1rem]">
                                        {errors.email && <InputError message={errors.email} />}
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="flex flex-col space-y-0.5">
                                    <Label>{passwordLabel}</Label>
                                    <Input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder={passwordPlaceholder}
                                        disabled={isEditing && processing}
                                    />
                                    <div className="min-h-[1rem]">
                                        {errors.password && <InputError message={errors.password} />}
                                    </div>
                                </div>

                                {/* Konfirmasi Password */}
                                <div className="flex flex-col space-y-0.5">
                                    <Label htmlFor="password_confirmation">
                                        {isEditing ? "Konfirmasi Password" : "Confirm password"}
                                    </Label>
                                    <Input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder={isEditing ? "Ulangi password" : "Confirm password"}
                                        disabled={isEditing && processing}
                                    />
                                    <div className="min-h-[1rem]">
                                        {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="col-span-2 flex flex-col space-y-0.5 mb-2">
                                    <Label>Role</Label>
                                    <select
                                        value={data.role_id}
                                        onChange={(e) => setData('role_id', isEditing ? parseInt(e.target.value) : e.target.value)}
                                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="">Pilih Role</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.role_name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="min-h-[1rem]">
                                        {errors.role_id && <InputError message={errors.role_id} />}
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button type="submit" disabled={processing} className="mr-2">
                                {buttonText}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.visit('/admin/user')}
                            >
                                Batal
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
};

export default UserForm;