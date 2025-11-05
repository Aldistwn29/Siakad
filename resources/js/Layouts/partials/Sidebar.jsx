import NavLink from '@/Components/NavLink';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Link } from '@inertiajs/react';
import {
    IconBook,
    IconBuildingSkyscraper,
    IconCalendar,
    IconChalkboard,
    IconCircleKey,
    IconDroplet,
    IconLayout2,
    IconLogout2,
    IconMoneybag,
    IconSchool,
    IconUser,
    IconUsers,
    IconUsersGroup,
} from '@tabler/icons-react';

export default function Sidebar({ url }) {
    return (
        <nav className="flex flex-col flex-1">
            <ul className="flex flex-col flex-1" role="list">
                <li className="-mx-6">
                    <Link
                        href="#"
                        className="flex items-center px-6 py-3 text-sm font-semibold leading-6 text-white gap-x-4 hover:bg-blue-800"
                    >
                        <Avatar>
                            <AvatarFallback>X</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                            <span className="font-bold truncate">Anonim</span>
                            <span className="text-xs truncate">Admin</span>
                        </div>
                    </Link>
                    <li>
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/dashbord')}
                            title="Dashboard"
                            icon={IconLayout2}
                        />

                        <div className="px-3 py-2 text-xs font-medium text-white">Master</div>
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/faculties')}
                            title="Fakultas"
                            icon={IconBuildingSkyscraper}
                        />
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/departments')}
                            title="Departemen"
                            icon={IconSchool}
                        />
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/academic-years')}
                            title="Akademik Year"
                            icon={IconCalendar}
                        />
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/classrooms')}
                            title="Kelas"
                            icon={IconChalkboard}
                        />
                        <NavLink url="#" active={url.startsWith('/admin/roles')} title="Peran" icon={IconCircleKey} />

                        <div className="px-3 py-2 text-xs font-medium text-white">Pengguna</div>
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/students')}
                            title="Mahasiswa"
                            icon={IconUsers}
                        />
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/teachers')}
                            title="Dosen"
                            icon={IconUsersGroup}
                        />
                        <NavLink url="#" active={url.startsWith('/admin/operators')} title="Operator" icon={IconUser} />

                        <div className="px-3 py-2 text-xs font-medium text-white">Jadwal</div>
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/courses')}
                            title="Mata Kuliah"
                            icon={IconBook}
                        />
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/schedules')}
                            title="Jadwal"
                            icon={IconCalendar}
                        />

                        <div className="px-3 py-2 text-xs font-medium text-white">Pembayaran</div>
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/fees')}
                            title="Uang Kuliah Tunggal"
                            icon={IconMoneybag}
                        />
                        <NavLink
                            url="#"
                            active={url.startsWith('/admin/fee-groups')}
                            title="Golongan Uang Kuliah"
                            icon={IconDroplet}
                        />

                        <div className="px-3 py-2 text-xs font-medium text-white">Lainnya</div>
                        <NavLink url={route('logout')} method="post" as="button" active={url.startsWith('/logout')} title="Logout" icon={IconLogout2} />
                    </li>
                </li>
            </ul>
        </nav>
    );
}
