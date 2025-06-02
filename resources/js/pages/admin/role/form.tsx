import { router, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import {Head} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
        role_name: role?.role_name ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'edit' && role?.id) {
            put(`/admin/role/${role.id}`, {
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