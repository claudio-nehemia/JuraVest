import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    foto_profil: string;
}

interface PageProps {
    auth: {
        user: User | null;
    };
    [key: string]: any;
}

export default function Navbar() {
    const { auth } = usePage<PageProps>().props;
    const isLoggedIn = auth && auth.user !== null;
    const handleRegister = () => router.visit(route('register'));
    const handleLogin = () => router.visit(route('login'));
    const handleProfile = () => router.visit(route('user.profile'));

    return (
        <header className="flex items-center justify-between bg-white p-5 shadow">
            <div className="my-3 flex scale-125 items-center gap-2">
                <img src="/jura-logo.jpg" alt="Logo" className="ml-10 h-13 w-13 rounded-lg" />
                <h1 className="font-montserrat text-3xl font-bold">JURAVEST</h1>
                {/* monserrat bold*/}
            </div>
            <nav className="font-poppins mr-6 flex items-center gap-6 text-sm">
                <a href="#" className="hover:underline">
                    Beranda
                </a>
                <a href="#" className="hover:underline">
                    Investor
                </a>
                <a href="#" className="hover:underline">
                    Pengusaha
                </a>
                <a href="#" className="hover:underline">
                    Tentang Kami
                </a>
            </nav>
            <div className="font-poppins flex gap-4">
                {isLoggedIn && auth.user ? (
                    <Button
                        className="rounded-3xl bg-orange-400 p-5 pr-3 text-white shadow-[0_1px_4px_rgba(0,0,0,0.5)] hover:bg-orange-500"
                        onClick={handleProfile}
                    >
                        <span>{auth.user.email}</span>
                        <img src={`/storage/${auth.user.foto_profil}`} className="h-7 w-7 rounded-full shadow-[0_0.5px_4px_rgba(0,0,0,0.5)]" />
                    </Button>
                ) : (
                    <div>
                        <Button variant="ghost" className="mx-2 rounded-3xl text-orange-500 shadow" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button className="rounded-3xl bg-orange-400 text-white shadow hover:bg-orange-500" onClick={handleRegister}>
                            Register
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}
