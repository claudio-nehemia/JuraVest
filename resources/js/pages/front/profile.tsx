import React from "react";
import Navbar from "@/components/navbar";
import { Button } from "@headlessui/react";
import { router } from "@inertiajs/react";

export default function Profile() {
    const handleLogout = () => router.post(route('logout'));
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <aside className="w-1/6 ml-5 shadow rounded-2xl text-center bg-white p-5 mt-2">
                <div>
                    <ul className="space-y-3">
                        <li className="p-2 rounded-2xl hover:bg-yellow-100">
                            <Button className="focus:bg-yellow-500">
                                Accounts
                            </Button>
                        </li>
                        <li className="p-2 rounded-2xl hover:bg-yellow-100">
                            <Button className="focus:bg-yellow-500">
                                User Info
                            </Button>
                        </li>
                        <li className="p-2 rounded-2xl hover:bg-red-100 active:bg-red-600">
                            <Button  
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}