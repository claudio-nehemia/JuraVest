import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';
import HeroSlidder from '@/components/hero-slider';
import useInView from '@/hooks/useInView'; // pastikan path-nya sesuai

export default function Dashboard() {
const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <section className="bg-white min-h-screen pb-10">
      <Head title="Home" />
      <Navbar />
      <HeroSlidder />

      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative mt-20">
        <p
          className={`text-5xl text-yellow-600 font-bold text-center transition-all duration-700 ease-out
          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          Rekomendasi Untuk Anda
        </p>
      </div>
    </section>
  );
}
