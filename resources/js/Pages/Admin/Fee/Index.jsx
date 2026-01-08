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
    IconMoneybag,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
    IconUser,
    IconUsers,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: fees, meta, links } = props.fees;
    // console.log(operators);
    const [params, setParams] = useState(props.state);
    // --- Hooks Filter (debounce 300ms)
    UseFilter({
        route: route('admin.fees.index'),
        values: params,
        only: ['fees'],
    });

    const onSortable = (field) => {
        const direction = params.field === field && params.direction === 'asc' ? 'desc' : 'asc';
        const updated = { ...params, field, direction };

        router.get(route('admin.fees.index'), updated, {
            only: ['fees'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };
    // --- Reset filter
    const handleReset = () => {
        const reset = { ...props.state, search: '', field: '', direction: '', load: 10 };
        setParams(reset);
        router.get(route('admin.fees.index'), reset, {
            only: ['fees'],
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
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconMoneybag}
                />
            </div>
            {/* Card */}
            <Card>
                <CardHeader className="p-0 mb-4">
                    <div className="flex flex-col items-center w-full gap-4 px-6 py-4 lg:flex-row">
                        <Input
                            className="w-full sm:w-1/3"
                            placeholder="Cari berdasarkan nama mahasiswa.."
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
                    {fees.length === 0 ? (
                        <EmptyState
                            title="Tidak ada data uang kuliah tunggal"
                            subtitle="Mulailah dengan membuat uang kuliah tunggal baru."
                            icon={IconMoneybag}
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    {/* id */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable('id')}
                                        >
                                            #
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Fakultas */}
                                    <TableHead>Fakultas</TableHead>
                                    {/* Program Studi */}
                                    <TableHead>Program Studi</TableHead>
                                     {/* Nama */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable('name')}
                                        >
                                            Nama
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Nomor Pokok Mahasiswa */}
                                    <TableHead>Nomor Pokok Mahasiswa</TableHead>
                                    {/* Semester */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable('semester')}
                                        >
                                            Semester
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Status */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable('status')}
                                        >
                                            Status
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Tanggal dibuat */}
                                    <TableHead>
                                        Dibuat pada
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable('created_at')}
                                        >
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fees.map((fee, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                        {/* Nama */}
                                        <TableCell className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src={fee.user.avtar} />
                                                <AvatarFallback>{fee.user.name.substring(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            <span>{fee.user.name}</span>
                                        </TableCell>
                                       {/* Fakultas */}
                                       <TableCell>{fee.student.fakultas}</TableCell>
                                        {/* Program Studi */}
                                       <TableCell>{fee.student.departement}</TableCell>
                                        {/* Nomor induk Mahasiswa */}
                                       <TableCell>{fee.student.student_number}</TableCell>
                                        {/* Semester */}
                                       <TableCell>{fee.semester}</TableCell>
                                        {/* status */}
                                       <TableCell>{fee.status}</TableCell>
                                        <TableCell>{formatDateIndo(fee.created_at)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col items-center justify-between w-full py-3 border-t gap-y-2 lg:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-blue-600">{meta.from ?? 0}</span> dari{' '}
                        {meta.total} operator
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
