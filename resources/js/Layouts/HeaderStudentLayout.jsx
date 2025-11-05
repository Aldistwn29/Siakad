import AplicationLogo from "@/Components/ApplicationLogo";
import NavigationMenu from "@/Components/NavigationMenu";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { IconChevronDown, IconLayoutSidebar, IconLogout2, IconX } from "@tabler/icons-react";

export default function HeaderStudentLayout({ url }) {
    return (
        <>
            <Disclosure
                as='nav'
                className="py-4 border-b border-blue-300 border-opacity-25 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 lg:border-none">
                {({ open }) => (
                    <>
                        <div className="px-6 lg:px-24">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <AplicationLogo bgLogo='from-orange-600 via-orange-600 to-orange-600' colorLogo='text-white' colorText='text-white' />
                                </div>
                                
                                {/* Mobile */}
                                <div className="flex lg:hidden">
                                    <DisclosureButton
                                        className="relative inline-flex items-center justify-center p-2 text-white rounded-xl hover:text-white focus:outline-none">
                                        <span className="absolute -inset-5" />
                                        {open ? (
                                            <IconX className="block size-6" />
                                        ) : (
                                            <IconLayoutSidebar className="block size-6" />
                                        )}
                                    </DisclosureButton>
                                </div>

                                {/* Desktop */}
                                <div className="hidden lg:ml-4 lg:block">
                                    <div className="flex items-center">
                                        <div className="hidden lg:max-10 lg:block">
                                            <div className="flex space-x-4">
                                                <NavigationMenu
                                                    url='#'
                                                    active={url.startsWith('students/dashbord')}
                                                    title="Dashboard" />
                                                <NavigationMenu
                                                    url='#'
                                                    active={url.startsWith('students/schedules')}
                                                    title="Jadwal" />
                                                <NavigationMenu
                                                    url='#'
                                                    active={url.startsWith('students/study-plans')}
                                                    title="Kartu Rencana Studi" />
                                                <NavigationMenu
                                                    url='#'
                                                    active={url.startsWith('students/study-results')}
                                                    title="Kartu Hasil Studi" />
                                                <NavigationMenu
                                                    url='#'
                                                    active={url.startsWith('students/fees')}
                                                    title="Pembayaran" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile - Desktop Only */}
                                <div className="hidden lg:block">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="blue" size='xl' className="data-[state=open]:bg-orange-500 data-[state=open]:text-white">
                                                <Avatar className="rounded-lg size-8">
                                                    <AvatarFallback className="text-blue-700 rounded-lg">X</AvatarFallback>
                                                </Avatar>
                                                <div className="grid flex-1 text-sm leading-tight text-left">
                                                    <span className="font-semibold truncate">Aldi Setiawan</span>
                                                    <span className="text-xs truncate">Teknik Informatika</span>
                                                </div>
                                                <IconChevronDown className="ml-auto size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent 
                                            className="w-[--radix-dropdown-menu-trigger-width] bg-white min-w-56 rounded-lg"
                                            side="bottom"
                                            align="end"
                                            sideOffset={4}>
                                            <DropdownMenuLabel className="p-0 font-normal">
                                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                                    <Avatar className="rounded-lg size-8">
                                                        <AvatarFallback className="text-blue-600 rounded-lg">
                                                            X
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid flex-1 text-sm leading-tight text-left">
                                                        <span className="font-semibold truncate">Aldi Setiawan</span>
                                                        <span className="font-semibold truncate">aldi.setiawan.com</span>
                                                    </div>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator className="my-1" />
                                            <DropdownMenuItem 
                                                asChild 
                                                className="flex items-center gap-2 text-red-600 transition-colors rounded-md cursor-pointer focus:outline-none focus:bg-red-50 hover:bg-red-50 focus:text-red-700">
                                                <Link href={route('logout')} as="button" method="post" className="flex items-center w-full gap-2">
                                                    <IconLogout2 className="size-4" />
                                                    Logout
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <DisclosurePanel className="lg:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/dashbord')
                                            ? 'bg-blue-500 text-white'
                                            : "text-white hover:bg-blue-500",
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}>
                                    Dashboard
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/schedules')
                                            ? 'bg-blue-500 text-white'
                                            : "text-white hover:bg-blue-500",
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}>
                                    Jadwal
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/study-plans')
                                            ? 'bg-blue-500 text-white'
                                            : "text-white hover:bg-blue-500",
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}>
                                    Kartu Rencana Studi
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/study-results')
                                            ? 'bg-blue-500 text-white'
                                            : "text-white hover:bg-blue-500",
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}>
                                    Kartu Hasil Studi
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/fees')
                                            ? 'bg-blue-500 text-white'
                                            : "text-white hover:bg-blue-500",
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}>
                                    Pembayaran
                                </DisclosureButton>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </>
    );
}