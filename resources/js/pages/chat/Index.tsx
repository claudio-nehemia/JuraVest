import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';

export default function Index({ users }: { users: User[] }) {
    const getRandomColor = (name: string) => {
        const colors = [
            'from-blue-400 to-blue-600',
            'from-purple-400 to-purple-600',
            'from-green-400 to-green-600',
            'from-pink-400 to-pink-600',
            'from-indigo-400 to-indigo-600',
            'from-red-400 to-red-600',
            'from-yellow-400 to-yellow-600',
            'from-teal-400 to-teal-600'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const getLastSeen = () => {
        const times = ['2 menit lalu', '5 menit lalu', '1 jam lalu', '3 jam lalu', 'Kemarin', '2 hari lalu'];
        return times[Math.floor(Math.random() * times.length)];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <Head title="Chat - Pilih Kontak" />
            
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Pesan</h1>
                    <p className="text-gray-600">Pilih kontak untuk memulai percakapan</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Cari kontak..." 
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        />
                    </div>
                </div>

                {/* Users List */}
                {users.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Kontak</h3>
                        <p className="text-gray-500">Tambahkan teman untuk memulai chat</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {users.map((user, index) => (
                            <div key={user.id} className={`${index !== users.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                <Link 
                                    href={`/chat/${user.id}`}
                                    className="block hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4">
                                            {/* Avatar */}
                                            <div className="relative">
                                                <div className={`w-14 h-14 bg-gradient-to-br ${getRandomColor(user.name)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                {/* Online indicator */}
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                                            </div>

                                            {/* User Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                        {user.name}
                                                    </h3>
                                                        
                                                </div>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    Mulai percakapan dengan {user.name}
                                                </p>
                                                <div className="flex items-center mt-2 space-x-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Arrow Icon */}
                                            <div className="text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}