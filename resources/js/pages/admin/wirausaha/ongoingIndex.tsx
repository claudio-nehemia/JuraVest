import { Button } from '@/components/ui/button';
import React from 'react';
import { Wirausaha, PageProps } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableCaption, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface Props extends PageProps {
    wirausahas : Wirausaha[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Wirausaha Berjalan',
        href: '/admin/wirausaha/ongoingIndex'
    }
];

export default function OngoingIndex({wirausahas}: Props) {
    const {delete: destroy} = useForm();

    function handleDelete(id: number) {
        if(confirm('Yakin Ingin Menghapus?')) {
            destroy(`/admin/wirausaha/${id}`)
        }
    }

    return (
       <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Wirausaha Berjalan" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-2xl font-bold">Data Wirausaha Berjalan</h1>
                        <div className='flex items-center justify-between p-4'>
                        <Link href="/admin/wirausaha/ongoingCreate">
                            <Button className="flex items-center gap-2 ml-2">
                                <PlusCircle className="h-4 w-4" />
                                Tambah Wirausaha Berjalan
                            </Button>
                        </Link>
                        </div>  
                    </div>
                    
                    <Table>
                        {wirausahas && wirausahas.length === 0 && (
                            <TableCaption className='pb-3'>Belum Ada Data Wirausaha</TableCaption>
                        )}
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>Nama Usaha</TableHead>
                                <TableHead className='text-center'>Pemilik Usaha</TableHead>
                                <TableHead className='text-center'>Tahun Berdiri</TableHead>
                                <TableHead className="text-center">Jenis Usaha</TableHead>
                                <TableHead className="text-center">Lokasi</TableHead>
                                <TableHead className="text-center">Jumlah Karyawan</TableHead>
                                <TableHead className='text-center'>Estimasi Omzet</TableHead>
                                <TableHead className='text-center'>Biaya Operasional</TableHead>
                                <TableHead className='text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {wirausahas && wirausahas.length > 0 ? (
                                wirausahas.map((wirausaha) => (
                                    <TableRow key={wirausaha.id}>
                                    <TableCell className='text-center'>{wirausaha.nama_usaha}</TableCell>
                                    <TableCell className='text-center'>{wirausaha.user?.name}</TableCell>
                                    <TableCell className='text-center'>{wirausaha.usaha_ongoing?.tahun_berdiri}</TableCell>
                                    <TableCell className='text-center'>{wirausaha.jenis_usaha?.jenis_usaha}</TableCell>
                                    <TableCell className='text-center'>{wirausaha.usaha_ongoing?.lokasi_operasional}</TableCell>
                                    <TableCell className='text-center'>{wirausaha.usaha_ongoing?.jumlah_karyawan}</TableCell>
                                    <TableCell className='text-center'>{wirausaha.usaha_ongoing?.estimasi_omzet}</TableCell>
                                    <TableCell className='text-center'>{wirausaha.usaha_ongoing?.biaya_operasional}</TableCell>
                                    <TableCell className='text-center'>
                                    <TooltipProvider>
                                    <div className="flex justify-center space-x-2">
                                        <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link href={`/admin/wirausaha/ongoingEdit/${wirausaha.id}/edit`}>
                                            <Button size="icon" variant="outline" className="bg-green-600 text-white hover:bg-green-700">
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
                                            onClick={() => handleDelete(wirausaha.id)}
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
                                ))
                            ) : null}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}