import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Pencil, Trash2, Plus } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

type JenisUsahaProps = {
    jenisUsahas: Array<{
        id: number;
        jenis_usaha: string;
        icon: string
    }>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jenis Usaha',
        href: '/admin/jenis_usaha'
    }
];

export default function JenisUsaha({ jenisUsahas }: JenisUsahaProps) {
    const {delete: destroy} = useForm();

    function handleDelete(id: number) {
        if(confirm('Yakin Ingin Menghapus?')) {
            destroy(`/admin/jenisUsaha/${id}`)
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jenis Usaha" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-2xl font-bold">Jenis Usaha</h1>
                        <Link href="/admin/jenis_usaha/create">
                            <Button className="flex items-center gap-2">
                                <PlusCircle className="h-4 w-4" />
                                Tambah Jenis Usaha
                            </Button>
                        </Link>
                    </div>
                    
                    <Table>
                        {jenisUsahas && jenisUsahas.length === 0 && (
                            <TableCaption>Belum Ada Data Jenis Usaha</TableCaption>
                        )}
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>ID</TableHead>
                                <TableHead className='text-center'>Jenis Usaha</TableHead>
                                <TableHead className='text-center'>Icon</TableHead>
                                <TableHead className="text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jenisUsahas && jenisUsahas.length > 0 ? (
                                jenisUsahas.map((jenisUsaha) => (
                                    <TableRow key={jenisUsaha.id}>
                                    <TableCell className='text-center'>{jenisUsaha.id}</TableCell>
                                        <TableCell className='text-center'>{jenisUsaha.jenis_usaha}</TableCell>
                                        <TableCell className='flex justify-center items-center h-20'>
                                            {jenisUsaha.icon ? (
                                                <div className="flex justify-center items-center w-full">
                                                    <img 
                                                        src={`/storage/${jenisUsaha.icon}`} 
                                                        alt={jenisUsaha.jenis_usaha} 
                                                        className='h-16 w-16 rounded object-cover'
                                                    />
                                                </div>
                                            ):(
                                                <span>-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className='text-center'>
                                        <TooltipProvider>
                                        <div className="flex justify-center space-x-2">
                                            <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link href={`/admin/jenis_usaha/${jenisUsaha.id}/edit`}>
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
                                                onClick={() => handleDelete(jenisUsaha.id)}
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