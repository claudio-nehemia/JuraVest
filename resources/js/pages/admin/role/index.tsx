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

interface Role {
    id: number;
    role_name: string;
    users_count: number;
}

interface RoleListProps {
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role',
        href: 'admin/role'
    }
];

export default function RoleList({ roles }: RoleListProps) {
    const {delete:destroy} = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus role ini?')){
            destroy(`/admin/role/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title = 'Daftar Role'/>
            <div className='flex h-full flex-1 flex-col gap-4 p-4'>
                <div className='rounded lg-border'>
                    <div className='flex items-center justify-between p-4'>
                        <h1 className='text-2x1 font-bold'>
                            Roles
                        </h1>
                        <Link href='/admin/role/create'>
                            <Button className='flex items-center gap-2'>
                                <PlusCircle className='h-4 w-4'/>
                                    Tambah Role
                            </Button>
                        </Link>
                    </div>

                    <Table>
                        {roles && roles.length === 0 && (
                            <TableCaption>Tidak ada data Roles</TableCaption>
                        )}
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>ID</TableHead>
                                <TableHead className='text-center'>Nama Role</TableHead>
                                <TableHead className='text-center'>Jumlah User</TableHead>
                                <TableHead className='text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles && roles.length > 0 ? (
                                roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className='text-center'>{role.id}</TableCell>
                                        <TableCell className='text-center'>{role.role_name}</TableCell>
                                        <TableCell className='text-center'>{role.users_count}</TableCell>
                                        <TableCell className='text-center'>
                                        <TooltipProvider>
                                        <div className='flex justify-center space-x-2'>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/admin/role/${role.id}/edit`}>
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
                                                    onClick={() => handleDelete(role.id)}>
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