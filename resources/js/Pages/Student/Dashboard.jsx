import { CardState } from '@/Components/CardState';
import StudentLayout from '@/Layouts/StudentLayout';
import { usePage } from '@inertiajs/react';
import { IconCheck, IconCreditCard, IconX } from '@tabler/icons-react';

export default function Dashbord(props) {
    const auth = usePage().props.auth.user;

    return (
        <div className="flex flex-col gap-5 p-6">
            <div>
                <h3 className="text-foreground text-xl leading-relaxed font-semibold tracking-tight">
                    {props.page_settings.title}
                </h3>
                <p className="text-muted-foreground text-sm">{props.page_settings.subtitle}</p>
            </div>

            <div className="mb-8 flex flex-col">
                <h2 className="text-foreground text-xl leading-relaxed font-medium">Hai, {auth.name}</h2>
                <p className="text-muted-foreground text-sm">Selamat datang di Sistem Informasi Akademik Universitas</p>
            </div>
            <div className="mb-8 grid gap-4 lg:grid-cols-3">
                {/* kartu Rencana Studi diterima */}
                <CardState
                    data={{
                        title: 'kartu Rencana Studi diterima',
                        icon: IconCheck,
                        background: 'text-white bg-gradient-to-r from-green-400 via-green-600 to-green-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.study_plans_approved}</div>
                </CardState>
                {/* kartu Rencana Studi ditolak */}
                <CardState
                    data={{
                        title: 'kartu Rencana Studi ditolak',
                        icon: IconX,
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-600 to-red-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.study_plans_rejected}</div>
                </CardState>
                {/* Jumlah Pembayaran */}
                <CardState
                    data={{
                        title: 'Jumlah Pembayaran',
                        icon: IconCreditCard,
                        background: 'text-white bg-gradient-to-r from-blue-400 via-blue-600 to-blue-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.count.total_payments}</div>
                </CardState>
            </div>
        </div>
    );
}

Dashbord.layout = (page) => <StudentLayout title={page.props.page_settings.title} children={page} />;
