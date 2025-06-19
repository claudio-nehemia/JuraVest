import React from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between mb-16">
      <div className="flex items-center gap-2 scale-125">
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
        <a href="/login">
          <Button variant="ghost" className="text-orange-500 shadow-xl rounded-3xl">
            Login
          </Button>
        </a>
        <a href="/register">
          <Button className="bg-orange-400 shadow-xl text-white hover:bg-orange-500 rounded-3xl">
            Register
          </Button>
        </a>

      </div>
    </header>
  );
}
