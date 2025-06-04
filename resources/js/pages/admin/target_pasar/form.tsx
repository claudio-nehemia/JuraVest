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

interface TargetPasar {
    id?: number;
    target_pasar: string;
    icon: string | null;    
    icon_url: string | null;
}

interface Props {
    target_pasar?: TargetPasar;
    mode: 'create' | 'edit';
    [key: string]: any;
}

const TargetPasarForm = () => {
    const { targetPasar, mode } = usePage<Props>().props;

    const isEditing = mode === 'edit';

    const { data, setData, post, put, processing, errors } = useForm({
        ...(isEditing ? { _method: 'put' } : {}),
        target_pasar: targetPasar?.target_pasar || '',
        icon: null as File | null,

    }); 

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && targetPasar?.id) {
            post(`/admin/target_pasar/${targetPasar.id}`, {
                preserveScroll: true,
            });
        } else {
            post('/admin/target_pasar', {
                preserveScroll: true,
            });
        }
    };

    const pageTitle = mode === 'edit' ? 'Edit Target Pasar' : 'Tambah Target Pasar';

    return (
        <AppLayout>
            <Head title={pageTitle} />

            <div className="p-4 lg:max-w-[50%] sm:max-w-[100%]">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {pageTitle}
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <CardContent>
                            <div>
                                <Label className="block mb-1">Target Pasar</Label>
                                <Input
                                    type='text'
                                    className='mb-4'
                                    value={data.target_pasar}
                                    onChange={(e) => setData('target_pasar', e.target.value)}
                                />
                                {errors.target_pasar && <div className="text-red-500 text-sm">{errors.target_pasar}</div>}
                            </div>
                            <div className="flex flex-col space-y-0.5 mb-2">
                                <Label>Icon</Label>
                                    {isEditing && targetPasar?.icon_url && (
                                    <img src={targetPasar.icon_url} alt={targetPasar.target_pasar} className="mb-2 h-32 w-32 rounded object-cover border" />
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
                        <CardFooter>
                            <Button
                                type='submit'
                                disabled={processing}
                                className="px-4 py-2 mr-2">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.visit('/admin/target_pasar')}
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

export default TargetPasarForm;