import HeroSlidder from '@/components/hero-slider';
import Navbar from '@/components/navbar';
import WirausahaGrid from '@/components/wirausaha-grid';
import useInView from '@/hooks/useInView';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import InvestorGrid from '@/components/investor-grid';
import { Investor } from '@/types';

// Define the page props interface
interface DashboardPageProps {
    investor: Investor[];
    [key: string]: any;
}

export default function Dashboard() {
    const [ref, isInView] = useInView<HTMLDivElement>();
    const { investor = [] } = usePage<DashboardPageProps>().props;

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
            <a href="/wirausaha" className='text-black text-center text-orange-400 font-bold mt-2 hover:text-orange-600'>
                <p>
                    Lihat lebih banyak....
                </p>
            </a> 
            <InvestorGrid investor={investor} />
            <a href="/investor" className='text-black text-center text-orange-400 font-bold mt-2 hover:text-orange-600'>
                <p>
                    Lihat lebih banyak....
                </p>
            </a>
        </section>
    );
}