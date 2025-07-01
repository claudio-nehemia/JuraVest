import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';

type Investor = {
    id: number;
    nama_investor: string;
    user: {
        id: number,
        name: string,
        email: string
    };
    target_pasar: {
        id: number,
        target_pasar: string
    };
    jenis_usaha: {
        id: number;
        jenis_usaha: string
    }
    foto_profil: string
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedUser = {
    data: Investor[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Investor',
        href: '/admin/investor',
    },
];

export default function Investor() {
    const { props } = usePage<{ investors: PaginatedUser }>();
    const { delete: destroy } = useForm();
    const investorsPaginated = props.investors;
    const investors = investorsPaginated.data;

    function handleDelete(id: number) {
        if (confirm('Anda yakin ingin menghapus Investor ini?')) {
            destroy(`/admin/investor/${id}`);
        }
    }

        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Investor" />
                <div className="flex h-full flex-1 flex-col gap-4 p-4">
                    <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                            <h1 className="text-2xl font-bold">Investor</h1>
                            <Link href="/admin/investor/create">
                                <Button className="flex items-center gap-2">
                                    <PlusCircle className="h-4 w-4" />
                                    Tambah Investor
                                </Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Nama Investor</TableHead>
                                    <TableHead className="text-center">Email</TableHead>
                                    <TableHead className='text-center'>Target Pasar Investasi</TableHead>
                                    <TableHead className="text-center">Jenis Usaha Investasi</TableHead>
                                    <TableHead className='text-center'>Foto Profil</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {investors.map((investor) => (
                                    <TableRow key={investor.id}>
                                        <TableCell className="text-center">{investor.nama_investor}</TableCell>
                                        <TableCell className="text-center">{investor.user?.email}</TableCell>
                                        <TableCell className="text-center">{investor.target_pasar?.target_pasar}</TableCell>
                                        <TableCell className="text-center">{investor.jenis_usaha?.jenis_usaha}</TableCell>
                                        <TableCell className='text-center'>
                                            {investor.foto_profil ? (
                                                <div className="flex justify-center items-center w-full">
                                                    <img 
                                                        src={`/storage/${investor.foto_profil}`} 
                                                        alt={investor.nama_investor} 
                                                        className='h-16 w-16 rounded-full object-cover'
                                                    />
                                                </div>
                                            ):(
                                                <span>-</span>
                                            )}</TableCell>
                                        <TableCell className="text-center">
                                            <TooltipProvider>
                                                <div className="flex justify-center space-x-2">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Link href={`/admin/investor/${investor.id}/edit`}>
                                                                <Button
                                                                    size="icon"
                                                                    variant="outline"
                                                                    className="bg-green-600 text-white hover:bg-green-700"
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Edit</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                className="bg-red-600 text-white hover:bg-red-700"
                                                                onClick={() => handleDelete(investor.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Hapus</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </TooltipProvider>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Info jumlah */}
                        <div className="px-4 py-2 text-sm text-gray-600">
                            Menampilkan {investorsPaginated.to} dari {investorsPaginated.total} user
                        </div>

                        {/* Pagination mirip produk */}
                        <div className="flex items-center justify-center space-x-2 pb-4">
                            {investorsPaginated.links?.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url ?? '#'}
                                className={`rounded border px-3 py-1 text-sm transition ${
                                link.active ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                            ))}
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
}
