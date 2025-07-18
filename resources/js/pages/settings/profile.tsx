import Navbar from '@/components/navbar';
import type { JenisUsaha, TargetPasar, Wirausaha } from '@/types';
import type { DataDiri } from '@/types/data-diri';
import type { Investor } from '@/types/investor';
import { Button } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import ProfileTab from './profile/ProfileTab';
import UserInfoTab from './profile/UserInfo';

interface Props {
    role: string;
    investor?: Investor;
    wirausaha?: Wirausaha;
    listJenisUsaha: JenisUsaha[];
    listTargetPasar: TargetPasar[];
    user: any;
    data_diri: DataDiri;
    pendidikan_terakhir_options: string[];
    jenis_kelamin_options: string[];
    listPekerjaan: { id: number; job: string }[];
}

export default function Profile(props: Props) {
    const [activeTab, setActiveTab] = useState<'profile' | 'userInfo'>('profile');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    const handleLogout = () => router.post(route('logout'));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <div className="mt-2 flex gap-6 p-6">
                {/* Sidebar */}
                <aside
                    className={`group transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'w-80' : 'w-20 md:w-80'} overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl hover:shadow-2xl`}
                >
                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                        className="absolute top-4 right-4 z-10 rounded-lg bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white md:hidden"
                    >
                        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Header Section */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg className="h-full w-full" viewBox="0 0 60 60" fill="currentColor">
                                <circle cx="30" cy="30" r="2" />
                                <circle cx="10" cy="10" r="1" />
                                <circle cx="50" cy="10" r="1" />
                                <circle cx="10" cy="50" r="1" />
                                <circle cx="50" cy="50" r="1" />
                            </svg>
                        </div>

                        <div className="relative flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/20 backdrop-blur-sm">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className={`transition-all duration-300 ${isSidebarExpanded ? 'block' : 'hidden md:block'}`}>
                                <h3 className="text-lg font-bold">Profile Menu</h3>
                                <p className="text-sm text-orange-100">Manage your account</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="p-4">
                        <ul className="space-y-3">
                            <li>
                                <Button
                                    onClick={() => setActiveTab('profile')}
                                    className={`group flex w-full items-center space-x-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                                        activeTab === 'profile'
                                            ? 'scale-[1.02] bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                                            : 'text-gray-700 hover:scale-[1.01] hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-600'
                                    }`}
                                >
                                    <div
                                        className={`rounded-lg p-1.5 transition-all duration-200 ${activeTab === 'profile' ? 'bg-white/20' : 'bg-amber-100 group-hover:bg-amber-200'} `}
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <span className={`font-medium transition-all duration-300 ${isSidebarExpanded ? 'block' : 'hidden md:block'}`}>
                                        Profile
                                    </span>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    onClick={() => setActiveTab('userInfo')}
                                    className={`group flex w-full items-center space-x-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                                        activeTab === 'userInfo'
                                            ? 'scale-[1.02] bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                                            : 'text-gray-700 hover:scale-[1.01] hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-600'
                                    }`}
                                >
                                    <div
                                        className={`rounded-lg p-1.5 transition-all duration-200 ${activeTab === 'userInfo' ? 'bg-white/20' : 'bg-amber-100 group-hover:bg-amber-200'} `}
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <span className={`font-medium transition-all duration-300 ${isSidebarExpanded ? 'block' : 'hidden md:block'}`}>
                                        User Info
                                    </span>
                                </Button>
                            </li>
                        </ul>
                    </nav>

                    {/* Divider with decorative element */}
                    <div className="mx-6 my-4 flex items-center">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <div className="px-3">
                            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                        </div>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Logout Section */}
                    <div className="p-4">
                        <Button
                            onClick={handleLogout}
                            className="group flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-4 py-3.5 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:from-red-600 hover:to-pink-600 hover:shadow-lg"
                        >
                            <div className="rounded-lg bg-white/20 p-1 transition-all duration-200 group-hover:bg-white/30">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </div>
                            <span className={`transition-all duration-300 ${isSidebarExpanded ? 'block' : 'hidden md:block'}`}>Logout</span>
                        </Button>
                    </div>

                    {/* Footer */}
                    <div
                        className={`bg-gradient-to-r from-gray-50 to-gray-100 p-4 text-center transition-all duration-300 ${isSidebarExpanded ? 'block' : 'hidden md:block'}`}
                    >
                        <p className="text-xs font-medium text-gray-500">© 2025 JuraVest</p>
                        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                    <div className="p-8">
                        {activeTab === 'profile' && (
                            <ProfileTab
                                role={props.role}
                                tipeUsaha={props.wirausaha?.tipe_usaha}
                                investor={props.investor}
                                wirausaha={props.wirausaha}
                                listJenisUsaha={props.listJenisUsaha}
                                listTargetPasar={props.listTargetPasar}
                            />
                        )}

                        {activeTab === 'userInfo' && (
                            <UserInfoTab
                                data_diri={props.data_diri}
                                pendidikan_terakhir_options={props.pendidikan_terakhir_options}
                                jenis_kelamin_options={props.jenis_kelamin_options}
                                listPekerjaan={props.listPekerjaan}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
