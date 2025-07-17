import HeroSlidder from '@/components/hero-slider';
import Navbar from '@/components/navbar';
import WirausahaGrid from '@/components/wirausaha-grid';
import useInView from '@/hooks/useInView'; // pastikan path-nya sesuai
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import InvestorGrid from '@/components/investor-grid';
import { Investor } from '@/types';

// Define the page props interface
interface DashboardPageProps {
    investor: Investor[];
    pekerjaan: string;
    jenis_usaha_labels: string[];
    target_pasar_labels: string[];
    [key: string]: any; // Add index signature to satisfy PageProps constraint
}

export default function Dashboard() {
    const [ref, isInView] = useInView<HTMLDivElement>();
    const { 
        investor = [], 
        pekerjaan = '', 
        jenis_usaha_labels = [], 
        target_pasar_labels = [] 
    } = usePage<DashboardPageProps>().props;

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
            <InvestorGrid
                investor={investor}
                pekerjaan={pekerjaan}
                jenis_usaha_labels={jenis_usaha_labels}
                target_pasar_labels={target_pasar_labels}
            />
            <a href="/investor" className='text-black text-center text-orange-400 font-bold mt-2 hover:text-orange-600'>
            <p>
                Lihat lebih banyak....
            </p>
            </a>

            {/* <FiturGrid /> */}
            {/* <PertanyaanDropdown /> */}
        </section>
    );
}