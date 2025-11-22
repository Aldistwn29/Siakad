import { CardState } from '@/Components/CardState';
import HeaderTitle from '@/Components/HeaderTitle';
import AppLayout from '@/Layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import { IconBook, IconBuildingSkyscraper, IconDoor, IconLayout2, IconSchool } from '@tabler/icons-react';

export default function Dahsboard(props) {
    const auth = usePage().props.auth.user;
    return (
        <div className="flex w-full flex-col">
            <div className="px-4 sm:px-6 lg:px-8"></div>
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconLayout2}
                />
            </div>
            <div className="mb-8 flex flex-col">
                <h2 className="text-foreground text-xl leading-relaxed font-medium">Hai, {auth.name}</h2>
                <p className="text-muted-foreground text-sm">Selamat datang di Sistem Informasi Akademik Universitas</p>
            </div>
            <div className="mb-8 grid gap-4 lg:grid-cols-4">
                {/* Total Fakultas */}
                <CardState
                    data={{
                        title: 'Total Fakultas',
                        icon: IconBuildingSkyscraper,
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-600 to-red-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.faculties}</div>
                </CardState>
                {/* Total Program Studi */}
                <CardState
                    data={{
                        title: 'Total Program Studi',
                        icon: IconSchool,
                        background: 'text-white bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.departments}</div>
                </CardState>
                {/* Total Kelas */}
                <CardState
                    data={{
                        title: 'Total Kelas',
                        icon: IconDoor,
                        background: 'text-white bg-gradient-to-r from-lime-400 via-lime-600 to-lime-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.classroms}</div>
                </CardState>
                {/* Total Mata kuliah */}
                <CardState
                    data={{
                        title: 'Total Mata Kuliah',
                        icon: IconBook,
                        background: 'text-white bg-gradient-to-r from-blue-400 via-blue-600 to-blue-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.classroms}</div>
                </CardState>
            </div>
        </div>
    );
}

Dahsboard.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
