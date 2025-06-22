import React from 'react';
import { Button } from '@/components/ui/button';
import { usePage, router } from '@inertiajs/react';
import { Link } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  foto_profil: string
}

interface PageProps {
  auth: {
    user: User | null
  };
  [key: string]:any
}

export default function Navbar() {
    const {auth} = usePage<PageProps>().props;
    const isLoggedIn = auth && auth.user !== null;
    const handleRegister = () => router.visit(route('register'));
    const handleLogin = () => router.visit(route('login'));
    const handleProfile = () => router.visit(route('user.profile'));

  return (
    <header className="flex items-center justify-between bg-white p-5 shadow">
      <div className="flex items-center gap-2 scale-125 my-3">
        <img src="/jura-logo.jpg" alt="Logo" className="w-13 h-13 rounded-lg ml-10" />
        <h1 className="font-montserrat text-3xl font-bold ">JURAVEST</h1> 
        {/* monserrat bold*/}
      </div>
      <nav className="flex gap-6 items-center font-poppins text-sm mr-6">
        <a href="#" className="hover:underline">Beranda</a>
        <a href="#" className="hover:underline">Investor</a>
        <a href="#" className="hover:underline">Pengusaha</a>
        <a href="#" className="hover:underline">Tentang Kami</a>
      </nav>
      <div className="flex gap-4 font-poppins">
        {isLoggedIn && auth.user? (
          <Button 
            className='bg-orange-400 p-5 pr-3 shadow-[0_1px_4px_rgba(0,0,0,0.5)] text-white hover:bg-orange-500 rounded-3xl'
            onClick={handleProfile}>
            <span>{auth.user.email}</span>
            <img 
              src={`/storage/${auth.user.foto_profil}`}
              className='h-7 w-7 rounded-full shadow-[0_0.5px_4px_rgba(0,0,0,0.5)]'
            />
            </Button>
          ) : (

          <div>
          <Button variant="ghost" className="text-orange-500 shadow rounded-3xl mx-2" onClick={handleLogin}>
            Login
          </Button>
          <Button className="bg-orange-400 shadow text-white hover:bg-orange-500 rounded-3xl" onClick={handleRegister}>
            Register
          </Button>
          </div>
        )}
        

      </div>
    </header>
  );
}
