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

type TargetUsahaProps = {
    targetPasars: Array<{
        id: number;
        target_pasar: string;
        icon: string
    }>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Target Pasar',
        href: '/admin/target_pasar'
    }
];

export default function TargetPasar({ targetPasars }: TargetUsahaProps) {
    const {delete: destroy} = useForm();

    function handleDelete(id: number) {
        if(confirm('Yakin Ingin Menghapus?')) {
            destroy(`/admin/target_usaha/${id}`)
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Target Pasar" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-2xl font-bold">Target Pasar</h1>
                        <Link href="/admin/target_pasar/create">
                            <Button className="flex items-center gap-2">
                                <PlusCircle className="h-4 w-4" />
                                Tambah Target Pasar
                            </Button>
                        </Link>
                    </div>
                    
                    <Table>
                        {targetPasars && targetPasars.length === 0 && (
                            <TableCaption className='pb-3'>Belum Ada Data Target Pasar</TableCaption>
                        )}
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>ID</TableHead>
                                <TableHead className='text-center'>Target Pasar</TableHead>
                                <TableHead className='text-center'>Icon</TableHead>
                                <TableHead className="text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {targetPasars && targetPasars.length > 0 ? (
                                targetPasars.map((targetPasar) => (
                                    <TableRow key={targetPasar.id}>
                                    <TableCell className='text-center'>{targetPasar.id}</TableCell>
                                        <TableCell className='text-center'>{targetPasar.target_pasar}</TableCell>
                                        <TableCell className='flex justify-center items-center h-20'>
                                            {targetPasar.icon ? (
                                                <div className="flex justify-center items-center w-full">
                                                    <img 
                                                        src={`/storage/${targetPasar.icon}`} 
                                                        alt={targetPasar.target_pasar} 
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
                                                <Link href={`/admin/target_pasar/${targetPasar.id}/edit`}>
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
                                                onClick={() => handleDelete(targetPasar.id)}
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