import { router, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import {Head} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface Role {
    id?: number;
    role_name: string;
    icon: string | null;
    icon_url: string | null
}

interface Props {
    role?: Role;
    mode: 'create' | 'edit';
    [key: string]:any;
}

const RoleForm = () => {
    const { role, mode } = usePage<Props>().props;

    // ✅ FIXED: Ubah field name menjadi role_name
    const { data, setData, post, put, processing, errors } = useForm({
        ...(mode==='edit' ? { _method: 'put' } : {}),
        role_name: role?.role_name ?? '',
        icon: null as File | null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'edit' && role?.id) {
            post(`/admin/role/${role.id}`, {
                preserveScroll: true,
            });
        } else {
            post('/admin/role', {
                preserveScroll: true,
            });
        }
    };

    const pageTitle = mode === 'edit' ? 'Edit Roles' : 'Tambah Roles'

    return (
        <AppLayout>
            <Head title={pageTitle}/>
            <div className="p-4 max-w-2xl ml-6">
            <Card className="shadow-md rounded-xl">
                <CardHeader>
                    <CardTitle>{mode === 'edit' ? 'Edit Role' : 'Tambah Role'}</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="role_name">Nama Role</Label>
                            <Input
                                id="role_name"
                                type="text"
                                className='mb-4'
                                value={data.role_name}
                                onChange={(e) => setData('role_name', e.target.value)}
                            />
                            {errors.role_name && <div className="text-sm text-red-600">{errors.role_name}</div>}
                        </div>
                        <div className="flex flex-col space-y-0.5 mb-2">
                        <Label>Icon</Label>
                            {mode==='edit' && role?.icon_url && (
                            <img src={role.icon_url} alt={role.role_name} className="mb-2 h-32 w-32 rounded object-cover border" />
                                )}
                                <Input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setData('icon', e.target.files?.[0] || null)} 
                                />
                                <div className="min-h-[1rem]">
                                    {errors.icon && <InputError message={errors.icon} />}
                                </div>
                    </div>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => router.visit('/admin/role')}
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

export default RoleForm;