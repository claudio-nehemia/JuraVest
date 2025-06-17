import React from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between mb-16">
      <div className="flex items-center gap-2">
        <img src="/jura-logo.jpg" alt="Logo" className="w-10 h-10 rounded-lg" />
        <h1 className="text-xl font-bold">JURAVEST</h1>
      </div>
      <nav className="flex gap-6 items-center text-sm">
        <a href="#" className="hover:underline">Beranda</a>
        <a href="#" className="hover:underline">Investor</a>
        <a href="#" className="hover:underline">Pengusaha</a>
        <a href="#" className="hover:underline">Tentang Kami</a>
      </nav>
      <div className="flex gap-4">
        <a href="/login">
          <Button variant="ghost" className="text-orange-500 shadow-xl rounded-3xl">
            Masuk
          </Button>
        </a>
        <a href="/register">
          <Button className="bg-orange-400 shadow-xl text-white hover:bg-orange-500 rounded-3xl">
            Daftar
          </Button>
        </a>
      </div>
    </header>
  );
}
