import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

type Message = {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    created_at: string;
};

type Props = {
    auth: { user: { id: number; name: string } };
    receiverId: number;
    users: User[];
};

export default function Show({ auth, receiverId, users }: Props) {
    const [activeReceiverId, setActiveReceiverId] = useState<number>(receiverId);
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');

    const currentReceiver = users.find((user) => user.id === activeReceiverId);

    useEffect(() => {
        axios.get(`/messages?receiver_id=${activeReceiverId}`).then((res) => {
            setMessages(res.data);
        });

        if (typeof window !== 'undefined' && window.Echo) {
            const channel = window.Echo.private(`chat.${auth.user.id}`);

            channel.listen('MessageSent', (e: any) => {
                if (
                    e.sender_id === activeReceiverId ||
                    e.receiver_id === activeReceiverId
                ) {
                    setMessages((prev) => [...prev, e]);
                }
            });

            return () => {
                channel.stopListening('MessageSent');
                window.Echo.leave(`chat.${auth.user.id}`);
            };
        }
    }, [auth.user.id, activeReceiverId]);

    useEffect(() => {
        const chatBox = document.getElementById('chat-box');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, [messages]);

    const sendMessage = () => {
        if (text.trim() === '') return;

        axios
            .post('/messages', {
                receiver_id: activeReceiverId,
                message: text,
            })
            .then((res) => {
                setMessages((prev) => [...prev, res.data]);
                setText('');
            });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Head title={`Chat dengan ${currentReceiver?.name || 'User'}`} />

            <div className="flex h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
                        <h2 className="text-xl font-bold text-white">Pesan</h2>
                        <p className="text-blue-100 text-sm">
                            Pilih kontak untuk memulai chat
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {users.map((user) => (
                            <button
                                key={user.id}
                                onClick={() => setActiveReceiverId(user.id)}
                                className="w-full text-left"
                            >
                                <div
                                    className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${
                                        user.id === activeReceiverId
                                            ? 'bg-blue-50 border-r-4 border-blue-500'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-sm font-medium truncate ${
                                                    user.id === activeReceiverId
                                                        ? 'text-blue-700'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {user.id === activeReceiverId
                                                    ? 'On Chat'
                                                    : 'Ketuk untuk memulai chat'}
                                            </p>
                                        </div>
                                        {user.id === activeReceiverId && (
                                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Area Chat */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Header Chat */}
                    <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {currentReceiver?.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {currentReceiver?.name || 'Pilih Kontak'}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Pesan */}
                    <div
                        id="chat-box"
                        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white"
                    >
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg
                                            className="w-8 h-8 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                    </div>
                                    <p>Belum ada pesan</p>
                                    <p className="text-sm">
                                        Mulai percakapan dengan mengirim pesan pertama
                                    </p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${
                                        msg.sender_id === auth.user.id
                                            ? 'justify-end'
                                            : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                            msg.sender_id === auth.user.id
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                                : 'bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        <p className="text-sm">{msg.message}</p>
                                        <p
                                            className={`text-xs mt-1 ${
                                                msg.sender_id === auth.user.id
                                                    ? 'text-blue-100'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {formatTime(msg.created_at)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center space-x-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Ketik pesan..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                            <button
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={sendMessage}
                                disabled={text.trim() === ''}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
