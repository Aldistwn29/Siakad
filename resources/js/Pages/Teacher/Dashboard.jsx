import { CardState } from '@/Components/CardState';
import HeaderTitle from '@/Components/HeaderTitle';
import AppLayout from '@/Layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import { IconBook, IconCalendarCancel, IconDoor, IconLayout2 } from '@tabler/icons-react';

export default function Dashboard(props) {
    const auth = usePage().props.auth.user;
    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconLayout2}
                />
            </div>
            <div className="mb-8 flex flex-col">
                <h2 className="text-xl font-medium leading-relaxed text-foreground">Hai, {auth.name}</h2>
                <p className="text-sm text-muted-foreground">Selamat datang di Sistem Informasi Akademik Universitas</p>
            </div>
            <div className="mb-8 grid gap-4 lg:grid-cols-3">
                {/* Total Mata Kuliah */}
                <CardState
                    data={{
                        title: 'Total Mata Kuliah',
                        icon: IconBook,
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-600 to-red-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.courses}</div>
                </CardState>
                {/* Total Kelas */}
                <CardState
                    data={{
                        title: 'Total Kelas',
                        icon: IconDoor,
                        background: 'text-white bg-gradient-to-r from-orange-400 via-orange-600 to-orange-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.classroms}</div>
                </CardState>
                {/* Total Jadwal */}
                <CardState
                    data={{
                        title: 'Total jadwal',
                        icon: IconCalendarCancel,
                        background: 'text-white bg-gradient-to-r from-lime-400 via-lime-600 to-lime-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.schedules}</div>
                </CardState>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;

// Dashboard.layout = (page) => <AppLayout title={page.props.page_settings} children={page}/>
