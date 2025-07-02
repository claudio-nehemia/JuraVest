import FiturGrid from '@/components/fitur-grid';
import HeroSlidder from '@/components/hero-slider';
import Navbar from '@/components/navbar';
import { PertanyaanDropdown } from '@/components/pertanyaan-dropdown';
import WirausahaGrid from '@/components/wirausaha-grid';
import useInView from '@/hooks/useInView'; // pastikan path-nya sesuai
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard() {
    const [ref, isInView] = useInView<HTMLDivElement>();

    return (
        <section className="min-h-screen bg-white pb-10">
            <Head title="Home" />
            <Navbar />
            <HeroSlidder />

            <div ref={ref as React.RefObject<HTMLDivElement>} className="relative mt-20">
                <p
                    className={`text-center text-5xl font-bold text-yellow-600 transition-all duration-700 ease-out ${isInView ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
                >
                    Rekomendasi Untuk Anda
                </p>
            </div>
            <WirausahaGrid />
            <FiturGrid />
            <PertanyaanDropdown />
        </section>
    );
}
