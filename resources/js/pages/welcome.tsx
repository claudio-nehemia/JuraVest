import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';

export default function Welcome() {
  return (
    <section className="bg-white min-h-screen px-8 py-12">
      <Navbar />

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-slate-900">
            Bangun Usaha,<br />
            Kami Bantu Cari <span className="text-orange-500">Modalnya.</span>
          </h2>
          <p className="text-gray-600 mt-4 mb-8">
            Platform pendanaan usaha yang memudahkan UMKM berkembang dengan dukungan investor terpercaya.
          </p>

          <div className="flex gap-4 items-center">
            <div className="text-center">
              <img src="/pengusaha.jpg" alt="Pengusaha" className="w-20 h-20 rounded-full mx-auto" />
              <Button className="mt-2 bg-orange-400 hover:bg-orange-500 text-white px-4">Jadi Pengusaha</Button>
            </div>
            <span className="text-gray-500">Atau</span>
            <div className="text-center">
              <img src="/investor.jpg" alt="Investor" className="w-20 h-20 rounded-full mx-auto" />
              <Button className="mt-2 bg-orange-400 hover:bg-orange-500 text-white px-4">Jadi Investor</Button>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <img src="/man.png" alt="Investor Man" className="w-[400px] h-auto drop-shadow-xl" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-20 text-slate-900">
        <div>
          <h3 className="text-2xl font-bold">115k+</h3>
          <p className="text-gray-500 text-sm">Active user</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">88k</h3>
          <p className="text-gray-500 text-sm">User passive</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">30%</h3>
          <p className="text-gray-500 text-sm">Increase in user</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">&gt;10k</h3>
          <p className="text-gray-500 text-sm">Good Testimonials</p>
        </div>
      </div>
    </section>
  );
}
