import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Toaster } from '@/Components/ui/sonner';
import useFlashMessage from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { IconLayoutSidebar, IconX } from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Sidebar from './partials/Sidebar';
import SidebarResponsive from './partials/SidebarResponsive';

export default function AppLayout({ title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { url } = usePage();

    const auth = usePage().props.auth.user;

    const flash = useFlashMessage();
    useEffect(() => {
        if (!flash || !flash.message) return;
        // debug
        console.log('Flash received:', flash);

        const type = flash.type ?? 'success';
        if (typeof toast[type] === 'function') {
            toast[type](flash.message);
        } else {
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
                            <Dialog.Panel className="relative flex w-72 flex-col overflow-hidden rounded-r-2xl bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 shadow-xl">
                                {/* Tombol Close */}
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="rounded-full p-2 transition hover:bg-white/10"
                                    >
                                        <IconX className="size-5 text-white" />
                                    </button>
                                </div>

                                {/* Isi Sidebar */}
                                <div className="flex h-full flex-col justify-between p-6 pt-12 text-white">
                                    <div className="space-y-6">
                                        <SidebarResponsive auth={auth} url={url} />
                                    </div>

                                    <div className="border-t border-white/20 pt-4 text-sm">
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
                <div className="scrollbar-hide flex h-full flex-col justify-between overflow-y-auto rounded-r-2xl border-r bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 px-6 py-8 text-white shadow-lg transition-all duration-300 hover:overflow-y-auto">
                    <Sidebar auth={auth} url={url} />
                </div>
            </div>

            {/* ===== Header (Mobile) ===== */}
            <div className="sticky top-0 z-40 flex items-center justify-between bg-white p-4 shadow-sm sm:px-6 lg:hidden">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <IconLayoutSidebar className="size-6" />
                    </button>
                    <h1 className="text-base leading-6 font-semibold text-gray-900">{title}</h1>
                </div>
                <Link href="#">
                    <Avatar>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </Link>
            </div>

            {/* ===== Main Content ===== */}
            <main className="min-h-screen bg-gray-50 py-6 lg:pl-72">
                <div className="px-4 sm:px-6">{children}</div>
            </main>
        </>
    );
}
