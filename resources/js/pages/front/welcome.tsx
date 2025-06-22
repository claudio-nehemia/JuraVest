import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';


export default function Welcome() {
  return (
    <section className="bg-white min-h-screen pb-10">
      <Navbar />

      <div className="grid md:grid-cols-2 gap-10 items-center ml-25">
        <div className='w-150'>
          <h2 className="text-4xl font-bold tracking-wide leading-tight text-slate-900">
            Bangun Usaha,<br />
            Kami Bantu Cari <br/> <span className="text-orange-500">Modalnya.</span>
          </h2>
          <p className="text-gray-600 mt-4 mb-8">
            Platform pendanaan usaha yang memudahkan UMKM berkembang dengan dukungan investor terpercaya.
          </p>

          <div className="flex gap-4 items-center">
            <div className="text-center">
              <img src="/pengusaha.jpg" alt="Pengusaha" className="w-20 h-20 rounded-full mx-auto " />
              <Button className="rounded-3xl mt-2 bg-orange-400 hover:bg-orange-500 text-white px-4">Jadi Pengusaha</Button>
            </div>
            <span className="text-gray-500">Atau</span>
            <div className="text-center">
              <img src="/investor.jpg" alt="Investor" className="w-20 h-20 rounded-full mx-auto" />
              <Button className="mt-2 rounded-3xl bg-orange-400  hover:bg-orange-500 text-white px-4">Jadi Investor</Button>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <img src="/man.png" alt="Investor Man" className="w-[400px] h-auto drop-shadow-xl mx-10" />
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center mt-20 text-center text-slate-900 divide-x divide-black px-50">
        <div className="w-1/2 md:w-1/4 px-4">
          <h3 className="font-bold text-4xl mb-2">115k+</h3>
          <p className="text-gray-500 text-sm">Active user</p>
        </div>
        <div className="w-1/2 md:w-1/4 px-4">
          <h3 className="font-bold text-4xl mb-2">88k</h3>
          <p className="text-gray-500 text-sm">User passive</p>
        </div>
        <div className="w-1/2 md:w-1/4 px-4">
          <h3 className="font-bold text-4xl mb-2">30%</h3>
          <p className="text-gray-500 text-sm mb-2">Increase in user</p>
        </div>
        <div className="w-1/2 md:w-1/4 px-4">
          <h3 className="font-bold text-4xl mb-2">&gt;10k</h3>
          <p className="text-gray-500 text-sm mb-2">Good Testimonials</p>
        </div>
      </div>

    </section>
  );
}
