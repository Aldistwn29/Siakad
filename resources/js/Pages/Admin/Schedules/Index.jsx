import AlertAction from '@/Components/AlertAction';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import PaginationTable from '@/Components/PaginationTable';
import ShowFilter from '@/Components/ShowFilter';
import { AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import UseFilter from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { deleteAction, formatDateIndo } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { Avatar } from '@radix-ui/react-avatar';
import {
    IconArrowsDownUp,
    IconCalendar,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
    IconUser,
    IconUsers,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: schedules, meta, links } = props.schedules;
    const [params, setParams] = useState(props.state);
    // --- Hooks Filter (debounce 300ms)
    UseFilter({
        route: route('admin.schedules.index'),
        values: params,
        only: ['schedule'],
    });

    const onSortable = (field) => {
        const direction = params.field === field && params.direction === 'asc' ? 'desc' : 'asc';
        const updated = { ...params, field, direction };

        router.get(route('admin.schedules.index'), updated, {
            only: ['schedule'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };
    // --- Reset filter
    const handleReset = () => {
        const reset = { ...props.state, search: '', field: '', direction: '', load: 10 };
        setParams(reset);
        router.get(route('admin.schedules.index'), reset, {
            only: ['schedule'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };
    // Hndle searching
    const handleSearch = (e) => {
        const value = e.target.value;
        setParams((prev) => ({ ...prev, search: value }));
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconCalendar}
                />
                <Button asChild variant="orange" size="xl" className="w-full lg:w-auto">
                    <Link href={route('admin.schedules.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>
            {/* Card */}
            <Card>
                <CardHeader className="mb-4 p-0">
                    <div className="flex w-full flex-col items-center gap-4 px-6 py-4 lg:flex-row">
                        <Input
                            className="w-full sm:w-1/3"
                            placeholder="Cari berdasarkan nama Jadwal mata kuliah.."
                            value={params?.search || ''}
                            onChange={handleSearch}
                        />
                        <Select
                            value={String(params?.load || 10)}
                            onValueChange={(e) => {
                                setParams({ ...params, load: e });
                                setInstantReload(true);
                            }}
                        >
                            <SelectTrigger className="w-full sm:w-24">
                                <SelectValue placeholder="Load" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 20, 30, 40].map((number) => (
                                    <SelectItem key={number} value={String(number)}>
                                        {number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="red" size="xl" onClick={handleReset}>
                            <IconRefresh className="size-4" />
                            Bersihkan
                        </Button>
                    </div>
                    <ShowFilter params={params} />
                </CardHeader>

                <CardContent className="pb-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {schedules.length === 0 ? (
                        <EmptyState
                            title="Tidak ada data jadwal mata kuliah"
                            subtitle="Silahkan untuk menambahkan data baru"
                            icon={IconCalendar}
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    {/* id */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('id')}
                                        >
                                            #
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Fakultas */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('fakultas_id')}
                                        >
                                            Fakultas
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Nama program Studi*/}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('departemen_id')}
                                        >
                                            Program studi
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Kelas*/}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('kelas_id')}
                                        >
                                            Kelas
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* course*/}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('course_id')}
                                        >
                                            Mata kuliah
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* academic year*/}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('academic_year_id')}
                                        >
                                            Tahun akademik
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* start time*/}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('start_time')}
                                        >
                                            Jam mulai
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* end time*/}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('end_time')}
                                        >
                                            Jam berakhir
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                     {/* daya of week*/}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('day_of_week')}
                                        >
                                            Hari
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Kuota */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('quote')}
                                        >
                                            Kuota
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Tanggal dibuat */}
                                    <TableHead>
                                        Dibuat pada
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('created_at')}
                                        >
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schedules.map((schedule, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                        {/* nama fakultas */}
                                        <TableCell>{schedule.faculty?.name}</TableCell>
                                        {/* Nama program studi */}
                                        <TableCell>{schedule.departemen?.name}</TableCell>
                                        {/* Nama kelas */}
                                        <TableCell>{schedule.classroom?.name}</TableCell>
                                         {/* Nama mata kuliah */}
                                        <TableCell>{schedule.course?.name}</TableCell>
                                        {/*  tahun ajaran  */}
                                        <TableCell>{schedule.academicYear?.name}</TableCell>
                                        {/*  jam mulai  */}
                                        <TableCell>{schedule.start_time}</TableCell>
                                         {/*  jam berakhir  */}
                                        <TableCell>{schedule.end_time}</TableCell>
                                        {/*  Hari  */}
                                        <TableCell>{schedule.day_of_week}</TableCell>
                                        {/*  Kuota  */}
                                        <TableCell>{schedule.qoute}</TableCell>
                                        {/* Dibuat pada */}
                                        <TableCell>{formatDateIndo(schedule.created_at)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button variant="blue" size="sm" asChild>
                                                    <Link href={route('admin.schedules.edit', [schedule])}>
                                                        <IconPencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <AlertAction
                                                    trigger={
                                                        <Button variant="red" size="sm">
                                                            <IconTrash className="size-4" />
                                                        </Button>
                                                    }
                                                    action={() =>
                                                        deleteAction(route('admin.schedules.destroy', [schedule]))
                                                    }
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>

                <CardFooter className="flex w-full flex-col items-center justify-between gap-y-2 border-t py-3 lg:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-blue-600">{meta.from ?? 0}</span> dari{' '}
                        {meta.total} jadwal
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && <PaginationTable meta={meta} links={links} />}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
