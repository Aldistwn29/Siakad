import NavLink from '@/Components/NavLink';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Link } from '@inertiajs/react';
import {
    IconBook,
    IconBook2,
    IconBuildingSkyscraper,
    IconCalendar,
    IconCircleKey,
    IconDoor,
    IconDroplet,
    IconLayout2,
    IconLogout2,
    IconMoneybag,
    IconSchool,
    IconSchoolOff,
    IconUser,
    IconUsers,
    IconUsersGroup,
} from '@tabler/icons-react';

export default function Sidebar({ auth, url }) {
    // hasrole
    const hasRole = (roleName) => {
        if (!auth?.roles) return false;
        return auth.roles.includes(roleName);
    };

    const getRoleName = () => auth?.roles?.[0] || 'User';

    return (
        <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col" role="list">
                <li className="-mx-6">
                    <Link
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-sm leading-6 font-semibold text-white hover:bg-blue-800"
                    >
                        <Avatar>
                            <AvatarImage src={auth.avatar} />
                            <AvatarFallback>{auth.name.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                            <span className="truncate font-bold">{auth.name}</span>
                            <span className="truncate text-xs">{getRoleName()}</span>
                        </div>
                    </Link>

                    {/* Menu items */}
                    {/* Role:Admin */}
                    {hasRole('Admin') && (
                        <>
                            <NavLink
                                url={route('admin.dashbord')}
                                active={url.startsWith('/admin/dashbord')}
                                title="Dashboard"
                                icon={IconLayout2}
                            />

                            <div className="px-3 py-2 text-xs font-medium text-white">Master</div>
                            <NavLink
                                url={route('admin.fakultas.index')}
                                active={url.startsWith('/admin/fakultas')}
                                title="Fakultas"
                                icon={IconBuildingSkyscraper}
                            />
                            <NavLink
                                url={route('admin.departemen.index')}
                                active={url.startsWith('/admin/departments')}
                                title="Departemen"
                                icon={IconSchool}
                            />
                            <NavLink
                                url={route('admin.academic_year.index')}
                                active={url.startsWith('/admin/academic-years')}
                                title="Akademik Year"
                                icon={IconCalendar}
                            />
                            <NavLink
                                url={route('admin.kelas.index')}
                                active={url.startsWith('/admin/classrooms')}
                                title="Kelas"
                                icon={IconDoor}
                            />
                            <NavLink
                                url={route('admin.roles.index')}
                                active={url.startsWith('/admin/roles')}
                                title="Peran"
                                icon={IconCircleKey}
                            />

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
                            <NavLink
                                url="#"
                                active={url.startsWith('/admin/operators')}
                                title="Operator"
                                icon={IconUser}
                            />

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
                        </>
                    )}
                    {/* Role:Teacher */}
                    {hasRole('Teacher') && (
                        <>
                            <NavLink
                                url={route('teachers.dashbord')}
                                active={url.startsWith('/teachers/dashbord')}
                                title="Dashboard"
                                icon={IconLayout2}
                            />
                            <div className="px-3 py-2 text-xs font-medium text-white">Akademik</div>
                            <NavLink
                                url="#"
                                active={url.startsWith('/teachers/courses')}
                                title="Mata Kuliah"
                                icon={IconBook2}
                            />
                            <NavLink
                                url="#"
                                active={url.startsWith('/teachers/schedules')}
                                title="Jadwal Kelas"
                                icon={IconCalendar}
                            />
                        </>
                    )}
                    {/* Role:Students */}
                    {hasRole('Operator') && (
                        <>
                            <NavLink
                                url={route('operators.dashbord')}
                                active={url.startsWith('/operators/dashbord')}
                                title="Dashboard"
                                icon={IconLayout2}
                            />
                            <div className="px-3 py-2 text-xs font-medium text-white">Pengguna</div>
                            <NavLink
                                url="#"
                                active={url.startsWith('/students/dashbord')}
                                title="Mahasiswa"
                                icon={IconSchool}
                            />
                            <NavLink
                                url="#"
                                active={url.startsWith('/teachers/dashbord')}
                                title="Dosen"
                                icon={IconSchoolOff}
                            />
                            <div className="px-3 py-2 text-xs font-medium text-white">Akademik</div>
                            <NavLink
                                url="#"
                                active={url.startsWith('/operators/courses')}
                                title="Mata Kuliah"
                                icon={IconBook2}
                            />
                            <NavLink
                                url="#"
                                active={url.startsWith('/operators/classrooms')}
                                title="Kelas"
                                icon={IconDoor}
                            />
                            <NavLink
                                url="#"
                                active={url.startsWith('/operators/schedules')}
                                title="Jadwal Kuliah"
                                icon={IconCalendar}
                            />
                        </>
                    )}
                    <div className="px-3 py-2 text-xs font-medium text-white">Lainnya</div>
                    <NavLink
                        url={route('logout')}
                        method="post"
                        as="button"
                        active={url.startsWith('/logout')}
                        title="Logout"
                        className="w-full"
                        icon={IconLogout2}
                    />
                </li>
            </ul>
        </nav>
    );
}
