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
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
    IconUser,
    IconUsers,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: operators, meta, links } = props.operators;
    console.log(operators);
    const [params, setParams] = useState(props.state);
    // --- Hooks Filter (debounce 300ms)
    UseFilter({
        route: route('admin.operators.index'),
        values: params,
        only: ['operators'],
    });

    const onSortable = (field) => {
        const direction = params.field === field && params.direction === 'asc' ? 'desc' : 'asc';
        const updated = { ...params, field, direction };

        router.get(route('admin.operators.index'), updated, {
            only: ['operators'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };
    // --- Reset filter
    const handleReset = () => {
        const reset = { ...props.state, search: '', field: '', direction: '', load: 10 };
        setParams(reset);
        router.get(route('admin.operators.index'), reset, {
            only: ['operators'],
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
                    icon={IconUsers}
                />
                <Button asChild variant="orange" size="xl" className="w-full lg:w-auto">
                    <Link href={route('admin.operators.create')}>
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
                            placeholder="Cari berdasarkan nama operator.."
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
                    {operators.length === 0 ? (
                        <EmptyState
                            title="Tidak ada data ma"
                            subtitle="Silahkan untuk menambahkan data ma baru"
                            icon={IconUser}
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
                                    {/* Nama */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('name')}
                                        >
                                            Nama
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Email */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('email')}
                                        >
                                            Email
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
                                            onClick={() => onSortable('departement_id')}
                                        >
                                            Program studi
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Nomor Induk Karyawan */}
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortable('employee_number')}
                                        >
                                            Nomor Induk Karyawan
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
                                {operators.map((operator, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                        {/* Nama */}
                                        <TableCell className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src={operator.user.avtar} />
                                                <AvatarFallback>{operator.user.name.substring(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            <span>{operator.user.name}</span>
                                        </TableCell>
                                        {/* Email */}
                                        <TableCell>{operator.user.email}</TableCell>
                                        {/* Nama fakultas */}
                                        <TableCell>{operator.faculty?.name}</TableCell>
                                        {/* Nama program studi */}
                                        <TableCell>{operator.departemen?.name}</TableCell>
                                        {/* Nomor poko mahasiswa */}
                                        <TableCell>{operator.employee_number}</TableCell>
                                        {/* Dibuat pada */}
                                        <TableCell>{formatDateIndo(operator.created_at)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button variant="blue" size="sm" asChild>
                                                    <Link href={route('admin.operators.edit', [operator])}>
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
                                                        deleteAction(route('admin.operators.destroy', [operator]))
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
