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

interface Pekerjaan {
    id?: number;
    job: string;
}

interface Props {
    pekerjaan?: Pekerjaan;
    mode: 'create' | 'edit';
    [key: string]:any;
}

const PekerjaanForm = () => {
    const { pekerjaan, mode } = usePage<Props>().props;

    // ✅ FIXED: Ubah field name menjadi role_name
    const { data, setData, post, put, processing, errors } = useForm({
        job: pekerjaan?.job ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'edit' && pekerjaan?.id) {
            put(`/admin/pekerjaan/${pekerjaan.id}`, {
                preserveScroll: true,
            });
        } else {
            post('/admin/pekerjaan', {
                preserveScroll: true,
            });
        }
    };

    const pageTitle = mode === 'edit' ? 'Edit Job' : 'Tambah Job'

    return (
        <AppLayout>
            <Head title={pageTitle}/>
            <div className="p-4 max-w-2xl ml-6">
            <Card className="shadow-md rounded-xl">
                <CardHeader>
                    <CardTitle>{mode === 'edit' ? 'Edit Job' : 'Tambah Job'}</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="job">Nama Job</Label>
                            <Input
                                id="role_name"
                                type="text"
                                className='mb-4'
                                value={data.job}
                                onChange={(e) => setData('job', e.target.value)}
                            />
                            {errors.job && <div className="text-sm text-red-600">{errors.job}</div>}
                        </div>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => router.visit('/admin/pekerjaan')}
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

export default PekerjaanForm;