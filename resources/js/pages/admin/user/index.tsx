import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
    role: {
        id: number;
        role_name: string;
    };
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedUser = {
    data: User[];
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
        title: 'User',
        href: '/admin/user',
    },
];

export default function User() {
    const { props } = usePage<{ users: PaginatedUser }>();
    const { delete: destroy } = useForm();
    const usersPaginated = props.users;
    const users = usersPaginated.data;

    function handleDelete(id: number) {
        if (confirm('Anda yakin ingin menghapus User ini?')) {
            destroy(`/admin/user/${id}`);
        }
    }

        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="User" />
                <div className="flex h-full flex-1 flex-col gap-4 p-4">
                    <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                            <h1 className="text-2xl font-bold">User</h1>
                            <Link href="/admin/user/create">
                                <Button className="flex items-center gap-2">
                                    <PlusCircle className="h-4 w-4" />
                                    Tambah User
                                </Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">ID</TableHead>
                                    <TableHead className="text-center">Nama</TableHead>
                                    <TableHead className="text-center">Email</TableHead>
                                    <TableHead className="text-center">Role</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="text-center">{user.id}</TableCell>
                                        <TableCell className="text-center">{user.name}</TableCell>
                                        <TableCell className="text-center">{user.email}</TableCell>
                                        <TableCell className="text-center">{user.role?.role_name || 'None'}</TableCell>
                                        <TableCell className="text-center">
                                            <TooltipProvider>
                                                <div className="flex justify-center space-x-2">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Link href={`/admin/user/${user.id}/edit`}>
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
                                                                onClick={() => handleDelete(user.id)}
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
                            Menampilkan {usersPaginated.to} dari {usersPaginated.total} user
                        </div>

                        {/* Pagination mirip produk */}
                        <div className="flex items-center justify-center space-x-2 pb-4">
                            {usersPaginated.links.map((link, i) => (
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
