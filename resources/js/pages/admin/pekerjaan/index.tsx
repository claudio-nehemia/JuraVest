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

interface Pekerjaan {
    id: number;
    job: string;
}

interface PekerjaanProps {
    pekerjaans: Pekerjaan[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role',
        href: 'admin/pekerjaan'
    }
];

export default function Pekerjaan({ pekerjaans }: PekerjaanProps) {
    const {delete:destroy} = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus pekerjaan ini?')){
            destroy(`admin/pekerjaan/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title = 'Daftar Job'/>
            <div className='flex h-full flex-1 flex-col gap-4 p-4'>
                <div className='rounded lg-border'>
                    <div className='flex items-center justify-between p-4'>
                        <h1 className='text-2x1 font-bold'>
                            Jobs
                        </h1>
                        <Link href='/admin/pekerjaan/create'>
                            <Button className='flex items-center gap-2'>
                                <PlusCircle className='h-4 w-4'/>
                                    Tambah Job
                            </Button>
                        </Link>
                    </div>

                    <Table>
                        {pekerjaans && pekerjaans.length === 0 && (
                            <TableCaption>Belum ada data pekerjaan</TableCaption>
                        )}
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>ID</TableHead>
                                <TableHead className='text-center'>Nama Job</TableHead>
                                <TableHead className='text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pekerjaans && pekerjaans.length > 0 ? (
                                pekerjaans.map((pekerjaan) => (
                                    <TableRow key={pekerjaan.id}>
                                        <TableCell className='text-center'>{pekerjaan.id}</TableCell>
                                        <TableCell className='text-center'>{pekerjaan.job}</TableCell>
                                        <TableCell className='text-center'>
                                        <TooltipProvider>
                                        <div className='flex justify-center space-x-2'>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/admin/pekerjaan/${pekerjaan.id}/edit`}>
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
                                                    onClick={() => handleDelete(pekerjaan.id)}>
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