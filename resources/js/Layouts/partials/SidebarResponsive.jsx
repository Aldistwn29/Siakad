import NavLink from '@/Components/NavLink';
import {
    IconBook,
    IconBook2,
    IconBuildingSkyscraper,
    IconCalendar,
    IconChalkboard,
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
export default function SidebarResponsive({ auth, url }) {
    const hasRole = (roleName) => {
        // normalisasi user object dari berbagai struktur auth
        const user = auth?.data ?? auth;
        const roles = user?.roles ?? user?.role;

        if (!roles) return false;

        const normalizeRoleName = roleName.toLowerCase();

        // helper untuk ekstrak nama role dari berbagai format
        const extractRoleName = (role) => {
            if (typeof role === 'string') return role.toLowerCase();
            if (typeof role === 'object') return (role.name ?? role.title ?? '').toLowerCase();
            return '';
        };

        // handle string role
        if (typeof roles === 'string') {
            return roles.toLowerCase() === normalizeRoleName;
        }

        // Handle array roles
        if (Array.isArray(roles)) {
            return roles.some((role) => role && extractRoleName(role) === normalizeRoleName);
        }
        // Handle object role (String role dengan property name/title)
        if (typeof roles === 'object') {
            return extractRoleName(roles) === normalizeRoleName;
        }

        return false;
    };
    return (
        <div className="flex flex-col flex-1 mt-4">
            <ul className="flex flex-col flex-1" role="list">
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
                    icon={IconLogout2}
                />
            </ul>
        </div>
    );
}
