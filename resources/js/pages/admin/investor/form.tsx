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

interface Investor {
    id: number;
    nama_investor: string;
    user_id: number;
    target_pasar_invest: number[];
    jenis_usaha_invest: number[];
    tujuan_investasi: string;
    foto_profil: string | null;
    foto_profil_url: string | null
}

interface Props {
    investor?: Investor;
    users: Array<{ id: number, name: string}>;
    jenisUsahas: Array<{ id: number; jenis_usaha: string }>;
    targetPasars: Array<{ id: number; target_pasar: string}>;
    mode: 'create' | 'edit';
    [key: string]: any;
}

const InvestorForm = () => {
    const { investor, jenisUsahas, users, targetPasars, mode } = usePage<Props>().props;
    
    const isEditing = mode === 'edit';

    const { data, setData, post, processing, errors } = useForm({
        ...(isEditing ? { _method: 'put' } : {}),
        nama_investor: investor?.nama_investor || '',
        user_id: investor?.user_id || '',
        target_pasar_invest: investor?.target_pasar_invest || [],
        jenis_usaha_invest: investor?.jenis_usaha_invest || [],
        tujuan_investasi: investor?.tujuan_investasi || '',
        foto_profil: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (isEditing && investor) {
            post(`/admin/investor/${investor.id}`, {
                preserveScroll: true,
            });
        } else {
            post('/admin/investor', {
                preserveScroll: true,
            });
        }
    };

    const pageTitle = isEditing ? "Edit Investor" : "Tambah Investor";
    const buttonText = processing ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Simpan');

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
                                    <Label>Nama Investor</Label>
                                    <Input
                                        type="text"
                                        value={data.nama_investor}
                                        onChange={(e) => setData('nama_investor', e.target.value)}
                                    />
                                    <div className="min-h-[1rem]">
                                        {errors.nama_investor && <InputError message={errors.nama_investor} />}
                                    </div>
                                </div>

                                {/* User */}
                                <div className="flex flex-col space-y-0.5 mb-2">
                                    <Label>Role</Label>
                                    <select
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', parseInt(e.target.value) || '')}
                                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="">Pilih User</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="min-h-[1rem]">
                                        {errors.user_id && <InputError message={errors.user_id} />}
                                    </div>
                                </div>

                                {/* Checkboxes side-by-side */}
                                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                    {/* TARGET PASAR */}
                                    <div className="flex flex-col space-y-0.5 mb-2">
                                        <Label>Target Pasar Invest</Label>
                                        <div className="flex flex-wrap gap-4">
                                            {targetPasars.map((item) => (
                                                <label key={item.id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        value={item.id}
                                                        checked={data.target_pasar_invest.includes(item.id)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            const itemId = parseInt(e.target.value); // Convert to integer
                                                            setData(
                                                                'target_pasar_invest',
                                                                checked
                                                                    ? [...data.target_pasar_invest, itemId]
                                                                    : data.target_pasar_invest.filter((id: number) => id !== itemId)
                                                            );
                                                        }}
                                                        className="form-checkbox accent-yellow-500"
                                                    />
                                                    <span>{item.target_pasar}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="min-h-[1rem]">
                                            {errors.target_pasar_invest && <InputError message={errors.target_pasar_invest} />}
                                        </div>
                                    </div>

                                    {/* JENIS USAHA */}
                                    <div className="flex flex-col space-y-0.5 mb-2">
                                        <Label>Jenis Usaha Invest</Label>
                                        <div className="flex flex-wrap gap-4">
                                            {jenisUsahas.map((item) => (
                                                <label key={item.id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        value={item.id}
                                                        checked={data.jenis_usaha_invest.includes(item.id)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            const itemId = parseInt(e.target.value); // Convert to integer
                                                            setData(
                                                                'jenis_usaha_invest',
                                                                checked
                                                                    ? [...data.jenis_usaha_invest, itemId]
                                                                    : data.jenis_usaha_invest.filter((id: number) => id !== itemId)
                                                            );
                                                        }}
                                                        className="form-checkbox accent-yellow-500"
                                                    />
                                                    <span>{item.jenis_usaha}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="min-h-[1rem]">
                                            {errors.jenis_usaha_invest && <InputError message={errors.jenis_usaha_invest} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 flex flex-col space-y-0.5 mb-2">
                                    <Label>Tujuan Investasi</Label>
                                    <textarea
                                        value={data.tujuan_investasi}
                                        onChange={(e) => setData('tujuan_investasi', e.target.value)}
                                        rows={6}
                                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    <div className="min-h-[1rem]">
                                        {errors.tujuan_investasi && <InputError message={errors.tujuan_investasi} />}
                                    </div>
                                </div>

                                {/* Foto Profil */}
                                <div className="col-span-2 space-y-0.5">
                                    <Label>Foto Profil</Label>
                                    {isEditing && investor?.foto_profil_url && (
                                        <img src={investor.foto_profil_url} alt={investor.nama_investor} className="mb-2 h-32 w-32 rounded object-cover border" />
                                    )}
                                    <Input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => setData('foto_profil', e.target.files?.[0] || null)} 
                                    />
                                    <div className="min-h-[1rem]">
                                        {errors.foto_profil && <InputError message={errors.foto_profil} />}
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
                                onClick={() => router.visit('/admin/investor')}
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

export default InvestorForm;