import { LargeNumberLike } from 'crypto';
import AppLogoIcon from './app-logo-icon';
import { usePage } from '@inertiajs/react';

interface User {
    id: number;
    email: string;
    role: {
        id: number;
        name: string
    }
}

interface PageProps {
    auth: {
        user: User|null
    }
    [key: string]:any
}

export default function AppLogo() {
    const { auth } = usePage<PageProps>().props;
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm pt-2">
                <span className="mb-0.5 truncate leading-none font-semibold">Admin</span>
                {auth.user ? (
                    <span>{auth.user.email}</span>
                ) : 
                <span></span>
                }            
                </div>
        </>
    );
}
