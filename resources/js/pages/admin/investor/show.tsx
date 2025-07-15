import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Briefcase, Edit, FileText, Target, User } from 'lucide-react';

type Investor = {
    id: number;
    nama_investor: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    tujuan_investasi: string;
    foto_profil: string;
    foto_profil_url: string | null;
    jenis_usaha_invest: number[];
    target_pasar_invest: number[];
};

type InvestorShowProps = {
    investor: Investor;
    jenisUsahaLabels: string[];
    targetPasarLabels: string[];
};

export default function InvestorShow({ investor, jenisUsahaLabels, targetPasarLabels }: InvestorShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Investor',
            href: '/admin/investor',
        },
        {
            title: 'Detail Investor',
            href: `/admin/investor/${investor.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Investor - ${investor.nama_investor}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-4">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/investor">
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold">Detail Investor</h1>
                        </div>
                        <Link href={`/admin/investor/${investor.id}/edit`}>
                            <Button className="flex items-center gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Investor
                            </Button>
                        </Link>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Profile Card */}
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Profil Investor
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-col items-center">
                                        {investor.foto_profil_url ? (
                                            <img
                                                src={investor.foto_profil_url}
                                                alt={investor.nama_investor}
                                                className="h-32 w-32 rounded-full border-4 border-gray-200 object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                                                <User className="h-16 w-16 text-gray-400" />
                                            </div>
                                        )}
                                        <h3 className="mt-4 text-center text-xl font-semibold">{investor.nama_investor}</h3>
                                        <p className="text-center text-gray-600">{investor.user?.email}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Details Card */}
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Informasi Detail
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Basic Info */}
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Nama Investor</label>
                                            <p className="mt-1 text-sm text-gray-900">{investor.nama_investor}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Email</label>
                                            <p className="mt-1 text-sm text-gray-900">{investor.user?.email}</p>
                                        </div>
                                    </div>

                                    {/* Investment Purpose */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Tujuan Investasi</label>
                                        <p className="mt-1 text-sm leading-relaxed text-gray-900">{investor.tujuan_investasi}</p>
                                    </div>

                                    {/* Business Types */}
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                                            <Briefcase className="h-4 w-4" />
                                            Jenis Usaha Investasi
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {jenisUsahaLabels && jenisUsahaLabels.length > 0 ? (
                                                jenisUsahaLabels.map((jenis, index) => (
                                                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                                                        {jenis}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-sm text-gray-500">Tidak ada jenis usaha yang dipilih</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Target Markets */}
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                                            <Target className="h-4 w-4" />
                                            Target Pasar Investasi
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {targetPasarLabels && targetPasarLabels.length > 0 ? (
                                                targetPasarLabels.map((target, index) => (
                                                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                                                        {target}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-sm text-gray-500">Tidak ada target pasar yang dipilih</span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
