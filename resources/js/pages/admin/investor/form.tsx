import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Briefcase, FileText, Save, Target, User } from 'lucide-react';
import { type FormEventHandler } from 'react';

interface Investor {
    id: number;
    nama_investor: string;
    user_id: number;
    target_pasar_invest: number[];
    jenis_usaha_invest: number[];
    tujuan_investasi: string;
    foto_profil: string | null;
    foto_profil_url: string | null;
}

interface Props {
    investor?: Investor;
    users: Array<{ id: number; name: string }>;
    jenisUsahas: Array<{ id: number; jenis_usaha: string }>;
    targetPasars: Array<{ id: number; target_pasar: string }>;
    mode: 'create' | 'edit';
    [key: string]: any;
}

const InvestorForm = () => {
    const { investor, jenisUsahas, users, targetPasars, mode } = usePage<Props>().props;

    const isEditing = mode === 'edit';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Investor',
            href: '/admin/investor',
        },
        {
            title: isEditing ? 'Edit Investor' : 'Tambah Investor',
            href: isEditing ? `/admin/investor/${investor?.id}/edit` : '/admin/investor/create',
        },
    ];

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
                onSuccess: () => {
                    alert('Data Berhasil Diperbarui');
                },
                onError: () => {
                    alert('Gagal Memperbarui Data');
                },
            });
        } else {
            post('/admin/investor', {
                onSuccess: () => {
                    alert('Data Berhasil Disimpan');
                },
                onError: () => {
                    alert('Gagal Menyimpan Data');
                },
            });
        }
    };

    const pageTitle = isEditing ? 'Edit Investor' : 'Tambah Investor';
    const buttonText = processing ? 'Menyimpan...' : isEditing ? 'Perbarui' : 'Simpan';

    const handleJenisUsahaChange = (itemId: number, checked: boolean) => {
        setData('jenis_usaha_invest', checked ? [...data.jenis_usaha_invest, itemId] : data.jenis_usaha_invest.filter((id: number) => id !== itemId));
    };

    const handleTargetPasarChange = (itemId: number, checked: boolean) => {
        setData(
            'target_pasar_invest',
            checked ? [...data.target_pasar_invest, itemId] : data.target_pasar_invest.filter((id: number) => id !== itemId),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />

            <div style={{ padding: '1rem', height: 'auto', overflow: 'visible' }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <button onClick={() => router.visit('/admin/investor')} className="text-gray-600 hover:text-gray-900">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            {pageTitle}
                        </CardTitle>
                    </CardHeader>

                    <form onSubmit={submit}>
                        <CardContent className="space-y-6">
                            {/* Row 1 - Basic Information and Investment Details */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {/* Left Column - Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        <User className="h-5 w-5" />
                                        Informasi Dasar
                                    </h3>

                                    {/* Nama Investor */}
                                    <div>
                                        <Label htmlFor="nama_investor" className="mb-1 block text-sm font-medium text-gray-700">
                                            Nama Investor <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="nama_investor"
                                            type="text"
                                            value={data.nama_investor}
                                            onChange={(e) => setData('nama_investor', e.target.value)}
                                            placeholder="Masukkan nama investor"
                                            className={errors.nama_investor ? 'border-red-500' : ''}
                                        />
                                        {errors.nama_investor && <p className="mt-1 text-sm text-red-600">{errors.nama_investor}</p>}
                                    </div>

                                    {/* User Selection */}
                                    <div>
                                        <Label htmlFor="user_id" className="mb-1 block text-sm font-medium text-gray-700">
                                            Pilih User <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={data.user_id ? data.user_id.toString() : ''}
                                            onValueChange={(value) => setData('user_id', parseInt(value))}
                                        >
                                            <SelectTrigger className={errors.user_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih user" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map((user) => (
                                                    <SelectItem key={user.id} value={user.id.toString()}>
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
                                    </div>

                                    {/* Foto Profil */}
                                    <div>
                                        <Label htmlFor="foto_profil" className="mb-1 block text-sm font-medium text-gray-700">
                                            Foto Profil
                                        </Label>
                                        {isEditing && investor?.foto_profil_url && (
                                            <div className="mb-3">
                                                <img
                                                    src={investor.foto_profil_url}
                                                    alt={investor.nama_investor}
                                                    className="h-24 w-24 rounded-lg border-2 border-gray-200 object-cover"
                                                />
                                                <p className="mt-1 text-sm text-gray-500">Foto saat ini</p>
                                            </div>
                                        )}
                                        <Input
                                            id="foto_profil"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData('foto_profil', e.target.files?.[0] || null)}
                                            className={`file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 ${errors.foto_profil ? 'border-red-500' : ''}`}
                                        />
                                        {errors.foto_profil && <p className="mt-1 text-sm text-red-600">{errors.foto_profil}</p>}
                                    </div>
                                </div>

                                {/* Right Column - Investment Details */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        <FileText className="h-5 w-5" />
                                        Detail Investasi
                                    </h3>

                                    {/* Tujuan Investasi */}
                                    <div>
                                        <Label htmlFor="tujuan_investasi" className="mb-1 block text-sm font-medium text-gray-700">
                                            Tujuan Investasi <span className="text-red-500">*</span>
                                        </Label>
                                        <textarea
                                            id="tujuan_investasi"
                                            value={data.tujuan_investasi}
                                            onChange={(e) => setData('tujuan_investasi', e.target.value)}
                                            placeholder="Jelaskan tujuan investasi..."
                                            rows={6}
                                            className={`w-full resize-none rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none ${
                                                errors.tujuan_investasi ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.tujuan_investasi && <p className="mt-1 text-sm text-red-600">{errors.tujuan_investasi}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 - Investment Preferences */}
                            <div>
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                    <Target className="h-5 w-5" />
                                    Preferensi Investasi
                                </h3>

                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {/* Jenis Usaha */}
                                    <div>
                                        <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Briefcase className="h-4 w-4" />
                                            Jenis Usaha Investasi <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border border-gray-300 p-3">
                                            {jenisUsahas.map((item) => (
                                                <div key={item.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`jenis_usaha_${item.id}`}
                                                        checked={data.jenis_usaha_invest.includes(item.id)}
                                                        onCheckedChange={(checked) => handleJenisUsahaChange(item.id, checked as boolean)}
                                                    />
                                                    <Label htmlFor={`jenis_usaha_${item.id}`} className="cursor-pointer text-sm font-normal">
                                                        {item.jenis_usaha}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {data.jenis_usaha_invest.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {data.jenis_usaha_invest.map((id) => {
                                                    const item = jenisUsahas.find((j) => j.id === id);
                                                    return item ? (
                                                        <Badge key={id} variant="secondary" className="text-xs">
                                                            {item.jenis_usaha}
                                                        </Badge>
                                                    ) : null;
                                                })}
                                            </div>
                                        )}
                                        {errors.jenis_usaha_invest && <p className="mt-1 text-sm text-red-600">{errors.jenis_usaha_invest}</p>}
                                    </div>

                                    {/* Target Pasar */}
                                    <div>
                                        <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Target className="h-4 w-4" />
                                            Target Pasar Investasi <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border border-gray-300 p-3">
                                            {targetPasars.map((item) => (
                                                <div key={item.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`target_pasar_${item.id}`}
                                                        checked={data.target_pasar_invest.includes(item.id)}
                                                        onCheckedChange={(checked) => handleTargetPasarChange(item.id, checked as boolean)}
                                                    />
                                                    <Label htmlFor={`target_pasar_${item.id}`} className="cursor-pointer text-sm font-normal">
                                                        {item.target_pasar}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {data.target_pasar_invest.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {data.target_pasar_invest.map((id) => {
                                                    const item = targetPasars.find((t) => t.id === id);
                                                    return item ? (
                                                        <Badge key={id} variant="secondary" className="text-xs">
                                                            {item.target_pasar}
                                                        </Badge>
                                                    ) : null;
                                                })}
                                            </div>
                                        )}
                                        {errors.target_pasar_invest && <p className="mt-1 text-sm text-red-600">{errors.target_pasar_invest}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => router.visit('/admin/investor')}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase ring-blue-300 transition duration-150 ease-in-out hover:bg-blue-700 focus:border-blue-900 focus:ring focus:outline-none active:bg-blue-900 disabled:opacity-25"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
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
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            {buttonText}
                                        </>
                                    )}
                                </button>
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
};

export default InvestorForm;
