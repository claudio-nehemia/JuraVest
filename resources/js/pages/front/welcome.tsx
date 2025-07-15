import FiturGrid from '@/components/fitur-grid';
import Navbar from '@/components/navbar';
import { PertanyaanDropdown } from '@/components/pertanyaan-dropdown';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <section className="min-h-screen bg-white pb-10">
            <Navbar />

            <div className="ml-25 grid items-center gap-10 md:grid-cols-2">
                <div className="w-150">
                    <h2 className="text-4xl leading-tight font-bold tracking-wide text-slate-900">
                        Bangun Usaha,
                        <br />
                        Kami Bantu Cari <br /> <span className="text-orange-500">Modalnya.</span>
                    </h2>
                    <p className="mt-4 mb-8 text-gray-600">
                        Platform pendanaan usaha yang memudahkan UMKM berkembang dengan dukungan investor terpercaya.
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <img src="/pengusaha.jpg" alt="Pengusaha" className="mx-auto h-20 w-20 rounded-full" />
                            <Button className="mt-2 rounded-3xl bg-orange-400 px-4 text-white hover:bg-orange-500">Jadi Pengusaha</Button>
                        </div>
                        <span className="text-gray-500">Atau</span>
                        <div className="text-center">
                            <img src="/investor.jpg" alt="Investor" className="mx-auto h-20 w-20 rounded-full" />
                            <Button className="mt-2 rounded-3xl bg-orange-400 px-4 text-white hover:bg-orange-500">Jadi Investor</Button>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <img src="/man.png" alt="Investor Man" className="mx-10 h-auto w-[400px] drop-shadow-xl" />
                </div>
            </div>

            <div className="mt-20 mb-20 flex flex-wrap justify-center divide-x divide-black px-50 text-center text-slate-900 md:flex-nowrap">
                <div className="w-1/2 px-4 md:w-1/4">
                    <h3 className="mb-2 text-4xl font-bold">115k+</h3>
                    <p className="text-sm text-gray-500">Active user</p>
                </div>
                <div className="w-1/2 px-4 md:w-1/4">
                    <h3 className="mb-2 text-4xl font-bold">88k</h3>
                    <p className="text-sm text-gray-500">User passive</p>
                </div>
                <div className="w-1/2 px-4 md:w-1/4">
                    <h3 className="mb-2 text-4xl font-bold">30%</h3>
                    <p className="mb-2 text-sm text-gray-500">Increase in user</p>
                </div>
                <div className="w-1/2 px-4 md:w-1/4">
                    <h3 className="mb-2 text-4xl font-bold">&gt;10k</h3>
                    <p className="mb-2 text-sm text-gray-500">Good Testimonials</p>
                </div>
            </div>

            <div>
                <div className="mt-16 mb-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Fitur Unggulan Juravest</h2>
                    <p className="mt-2 text-gray-500">
                        Jelajahi berbagai fitur yang kami sediakan untuk mendukung usahamu dan investasi yang lebih aman.
                    </p>
                </div>
                <FiturGrid />
            </div>

            <div>
                <div className="mt-16 mb-1 text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Pertanyaan yang Sering Diajukan</h2>
                </div>
                <PertanyaanDropdown />
            </div>
        </section>
    );
}
