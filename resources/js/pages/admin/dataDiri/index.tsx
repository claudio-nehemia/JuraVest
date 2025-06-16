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

interface DataDiriItem {
    id: number;
    nama_lengkap: string;
    tanggal_lahir: string;
    alamat: string;
    pendidikan_terakhir: string;
    jenis_kelamin: string;
    pekerjaan: {
        id: number;
        job: string
    };
    user: {
        id: number;
        name: string;
        email: string;
        role: {
            id: number;
            role_name: string;
        }
    }
}

interface PageProps {
    dataDiris: DataDiriItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role',
        href: 'admin/Data Diri'
    }
];

export default function Pekerjaan({ dataDiris }: PageProps) {
    const {delete:destroy} = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus data ini?')){
            destroy(`/admin/dataDiri/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title = 'Daftar Data Pribadi User'/>
            <div className='flex h-full flex-1 flex-col gap-4 p-4'>
                <div className='rounded lg-border'>
                    <div className='flex items-center justify-between p-4'>
                        <h1 className='text-2x1 font-bold'>
                            Identitas User
                        </h1>
                        <Link href='/admin/dataDiri/create'>
                            <Button className='flex items-center gap-2'>
                                <PlusCircle className='h-4 w-4'/>
                                    Tambah Data Pribadi User
                            </Button>
                        </Link>
                    </div>

                    <Table>
                        {dataDiris && dataDiris.length === 0 && (
                            <TableCaption>Belum ada data Identitas</TableCaption>
                        )}
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>User</TableHead>
                                <TableHead className='text-center'>Nama Lengkap</TableHead>
                                <TableHead className='text-center'>Jenis Kelamin</TableHead>
                                <TableHead className='text-center'>Tanggal Lahir</TableHead>
                                <TableHead className='text-center'>Pendidikan</TableHead>
                                <TableHead className='text-center'>Pekerjaan</TableHead>
                                <TableHead className='text-center'>Role</TableHead>
                                <TableHead className='text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataDiris && dataDiris.length > 0 ? (
                                dataDiris.map((data) => (
                                    <TableRow key={data.id}>
                                        <TableCell className='text-center'>{data.user?.email}</TableCell>
                                        <TableCell className='text-center'>{data.nama_lengkap}</TableCell>
                                        <TableCell className='text-center'>{data.jenis_kelamin}</TableCell>
                                        <TableCell className='text-center'>{data.tanggal_lahir}</TableCell>
                                        <TableCell className='text-center'>{data.pendidikan_terakhir}</TableCell>
                                        <TableCell className='text-center'>{data.pekerjaan?.job}</TableCell>
                                        <TableCell className='text-center'>{data.user?.role?.role_name}</TableCell>
                                        <TableCell className='text-center'>
                                        <TooltipProvider>
                                        <div className='flex justify-center space-x-2'>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/admin/dataDiri/${data.id}/edit`}>
                                                    <Button size="icon" variant="outline" className="bg-green-600 text-white hover:bg-green-700">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Edit
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button 
                                                    size='icon'
                                                    variant='outline'
                                                    className='bg-red-400 text-white hover:bg-red-600'
                                                    onClick={() => handleDelete(data.id)}>
                                                        <Trash2 className='h-4 w-4'/>
                                                    </Button>
                                                </TooltipTrigger>
                                            </Tooltip>
                                        </div> 
                                        </TooltipProvider>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ):null}
                        </TableBody>
                    </Table>


                </div>
            </div>
        </AppLayout>
    )

    
}