import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import useFlashMessage from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { IconLayoutSidebar, IconX } from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Sidebar from './partials/Sidebar';
import SidebarResponsive from './partials/SidebarResponsive';
import { Toaster } from '@/Components/ui/sonner';

export default function AppLayout({ title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { url } = usePage();

    const auth = usePage().props.auth.user;

    const flash = useFlashMessage();
    useEffect(() => {
        if(!flash || !flash.message) return;
        // debug
        console.log('Flash received:', flash);

        const type = flash.type ?? 'success';
        if(typeof toast[type] === 'function'){
            toast[type](flash.message);
        }else {
            toast(flash.message);
        }
    }, [flash]);

    return (
        <>
            <Head title={title} />
            <Toaster position="top-center" richColors />

            {/* ===== Mobile Sidebar (Transition) ===== */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setSidebarOpen}>
                    {/* Overlay background */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                    </Transition.Child>

                    {/* Sidebar panel */}
                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition-transform ease-in-out duration-300"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition-transform ease-in-out duration-300"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex flex-col overflow-hidden shadow-xl w-72 rounded-r-2xl bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700">
                                {/* Tombol Close */}
                                <div className="absolute right-4 top-4">
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-2 transition rounded-full hover:bg-white/10"
                                    >
                                        <IconX className="text-white size-5" />
                                    </button>
                                </div>

                                {/* Isi Sidebar */}
                                <div className="flex flex-col justify-between h-full p-6 pt-12 text-white">
                                    <div className="space-y-6">
                                        <SidebarResponsive auth={auth} url={url} />
                                    </div>

                                    <div className="pt-4 text-sm border-t border-white/20">
                                        <p className="text-white/80">© 2025 Dashboard Kamu</p>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* ===== Desktop Sidebar ===== */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex flex-col justify-between h-full px-6 py-8 overflow-y-auto text-white transition-all duration-300 border-r shadow-lg rounded-r-2xl bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 scrollbar-hide hover:overflow-y-auto">
                    <Sidebar auth={auth} url={url} />
                </div>
            </div>

            {/* ===== Header (Mobile) ===== */}
            <div className="sticky top-0 z-40 flex items-center justify-between p-4 bg-white shadow-sm sm:px-6 lg:hidden">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="p-2 text-gray-700 rounded-lg hover:bg-gray-100"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <IconLayoutSidebar className="size-6" />
                    </button>
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
                </div>
                <Link href="#">
                    <Avatar>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </Link>
            </div>

            {/* ===== Main Content ===== */}
            <main className="min-h-screen py-6 bg-gray-50 lg:pl-72">
                <div className="px-4 sm:px-6">{children}</div>
            </main>
        </>
    );
}
