import AplicationLogo from '@/Components/ApplicationLogo';
import NavigationMenu from '@/Components/NavigationMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { IconChevronDown, IconLayoutSidebar, IconLogout2, IconX } from '@tabler/icons-react';

export default function HeaderStudentLayout({ url, auth }) {
    return (
        <>
            <Disclosure
                as="nav"
                className="border-b border-blue-300 border-opacity-25 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 py-4 lg:border-none"
            >
                {({ open }) => (
                    <>
                        <div className="px-6 lg:px-24">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <AplicationLogo
                                        bgLogo="from-orange-600 via-orange-600 to-orange-600"
                                        colorLogo="text-white"
                                        colorText="text-white"
                                    />
                                </div>

                                {/* Mobile */}
                                <div className="flex lg:hidden">
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-xl p-2 text-white hover:text-white focus:outline-none">
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
                                        <div className="lg:max-10 hidden lg:block">
                                            <div className="flex space-x-4">
                                                <NavigationMenu
                                                    url="#"
                                                    active={url.startsWith('students/dashbord')}
                                                    title="Dashboard"
                                                />
                                                <NavigationMenu
                                                    url="#"
                                                    active={url.startsWith('students/schedules')}
                                                    title="Jadwal"
                                                />
                                                <NavigationMenu
                                                    url="#"
                                                    active={url.startsWith('students/study-plans')}
                                                    title="Kartu Rencana Studi"
                                                />
                                                <NavigationMenu
                                                    url="#"
                                                    active={url.startsWith('students/study-results')}
                                                    title="Kartu Hasil Studi"
                                                />
                                                <NavigationMenu
                                                    url="#"
                                                    active={url.startsWith('students/fees')}
                                                    title="Pembayaran"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile - Desktop Only */}
                                <div className="hidden lg:block">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="blue"
                                                size="xl"
                                                className="data-[state=open]:bg-orange-500 data-[state=open]:text-white"
                                            >
                                                <Avatar className="size-8 rounded-lg">
                                                    <AvatarImage src={auth.avatar} />
                                                    <AvatarFallback className="rounded-lg text-blue-700">
                                                        {auth.name.substring(0, 1)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="grid flex-1 text-left text-sm leading-tight">
                                                    <span className="truncate font-semibold">{auth.name}</span>
                                                    {/* <span className="truncate text-xs">
                                                        ({auth.student.departemen.name})
                                                    </span> */}
                                                    <span className="truncate text-xs">
                                                        {auth.student.students_number} ({auth.student.classroom.name})
                                                    </span>
                                                </div>
                                                <IconChevronDown className="ml-auto size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white"
                                            side="bottom"
                                            align="end"
                                            sideOffset={4}
                                        >
                                            <DropdownMenuLabel className="p-0 font-normal">
                                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                                    <Avatar className="size-8 rounded-lg">
                                                        <AvatarImage src={auth.avatar} />
                                                        <AvatarFallback className="rounded-lg text-blue-600">
                                                            {auth.name.substring(0, 1)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                                        <span className="truncate font-semibold">{auth.name}</span>
                                                        <span className="truncate font-semibold">{auth.student.students_number} ({auth.student.classroom.name})</span>
                                                    </div>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator className="my-1" />
                                            <DropdownMenuItem
                                                asChild
                                                className="flex cursor-pointer items-center gap-2 rounded-md text-red-600 transition-colors hover:bg-red-50 focus:bg-red-50 focus:text-red-700 focus:outline-none"
                                            >
                                                <Link
                                                    href={route('logout')}
                                                    as="button"
                                                    method="post"
                                                    className="flex w-full items-center gap-2"
                                                >
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
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/dashbord')
                                            ? 'bg-blue-500 text-white'
                                            : 'text-white hover:bg-blue-500',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    Dashboard
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/schedules')
                                            ? 'bg-blue-500 text-white'
                                            : 'text-white hover:bg-blue-500',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    Jadwal
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/study-plans')
                                            ? 'bg-blue-500 text-white'
                                            : 'text-white hover:bg-blue-500',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    Kartu Rencana Studi
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/study-results')
                                            ? 'bg-blue-500 text-white'
                                            : 'text-white hover:bg-blue-500',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    Kartu Hasil Studi
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="#"
                                    className={cn(
                                        url.startsWith('/students/fees')
                                            ? 'bg-blue-500 text-white'
                                            : 'text-white hover:bg-blue-500',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
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
