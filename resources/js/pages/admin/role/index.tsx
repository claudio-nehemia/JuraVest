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
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

interface Role {
    id: number;
    role_name: string;
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
            destroy(`admin/role/${id}`);
        }
    };

    
}