import AlertAction from '@/Components/AlertAction';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import PaginationTable from '@/Components/PaginationTable';
import ShowFilter from '@/Components/ShowFilter';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import UseFilter from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { deleteAction, formatDateIndo } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import {
    IconArrowsDownUp,
    IconBuildingSkyscraper,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: fakulties, meta, links } = props.fakulties;
    const [params, setParams] = useState({ ...props.state });
    // --- Hooks Filter (debounce 300ms)
    UseFilter({
        route: route('admin.fakultas.index'),
        values: params,
        only: ['fakultas'],
    });

    // --- Sorting handler
    const onSortable = (field) => {
        const direction = params.field === field && params.direction === 'asc' ? 'desc' : 'asc';
        const updated = { ...params, field, direction };

        setParams(updated);

        // langsung reload, skip debounce
        router.get(route('admin.fakultas.index'), updated, {
            only: ['fakultas'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    // onSortable
    const onSortTable = (field) => {
        const direction = params.field == field && params.direction === 'asc' ? 'desc' : 'asc';
        const updated = { ...params, field, direction };
        router.get(route('admin.fakultas.index'), updated, {
            only: ['fakultas'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    // --- Reset filter
    const handleReset = () => {
        const reset = { ...props.state, search: '', field: '', direction: '', load: 10 };
        setParams(reset);
        router.get(route('admin.fakultas.index'), reset, {
            only: ['fakultas'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    // --- On typing search (biarkan debounce dari UseFilter yang jalan)
    const handleSearch = (e) => {
        const value = e.target.value;
        setParams((prev) => ({ ...prev, search: value }));
    };

    return (
        <>
            <div className="flex w-full flex-col pb-32">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={props.page_settings.title}
                        subtitle={props.page_settings.subtitle}
                        icon={IconBuildingSkyscraper}
                    />
                    <Button asChild variant="orange" className="w-full lg:w-auto" size="xl">
                        <Link href={route('admin.fakultas.create')}>
                            <IconPlus className="size-4" />
                            Tambah
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="mb-4 p-0">
                        <div className="flex w-full flex-col items-center gap-4 px-6 py-4 lg:flex-row">
                            <Input
                                className="w-full sm:w-1/3"
                                placeholder="Cari berdasarkan fakultas..."
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
                        {fakulties.length === 0 ? (
                            <EmptyState
                                title="Data kosong"
                                subtitle="Silahkan untuk menambahkan data baru"
                                icon={IconBuildingSkyscraper}
                            />
                        ) : (
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            #
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex"
                                                onClick={() => onSortTable('id')}
                                            >
                                                <span className="ml-2 flex-none rounded text-muted-foreground">
                                                    <IconArrowsDownUp className="size-4" />
                                                </span>
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            Name
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex"
                                                onClick={() => onSortTable('name')}
                                            >
                                                <span className="ml-2 flex-none rounded text-muted-foreground">
                                                    <IconArrowsDownUp className="size-4" />
                                                </span>
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            Code
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex"
                                                onClick={() => onSortTable('code')}
                                            >
                                                <span className="ml-2 flex-none rounded text-muted-foreground">
                                                    <IconArrowsDownUp className="size-4" />
                                                </span>
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            Logo
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex"
                                                onClick={() => onSortTable('logo')}
                                            >
                                                <span className="ml-2 flex-none rounded text-muted-foreground">
                                                    <IconArrowsDownUp className="size-4" />
                                                </span>
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            Dibuat pada
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex"
                                                onClick={() => onSortTable('created_at')}
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
                                    {fakulties.map((faculty, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                            <TableCell>{faculty.name}</TableCell>
                                            <TableCell>{faculty.code}</TableCell>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage src={faculty.logo} />
                                                    <AvatarFallback>{faculty.name.substring(0, 1)}</AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{formatDateIndo(faculty.created_at)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-x-1">
                                                    <Button variant="blue" size="sm" asChild>
                                                        <Link href={route('admin.fakultas.edit', [faculty])}>
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
                                                            deleteAction(route('admin.fakultas.destroy', [faculty]))
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
                            {meta.total} fakultas
                        </p>
                        <div className="overflow-x-auto">
                            {meta.has_pages && <PaginationTable meta={meta} links={links} />}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page) => <AppLayout title={page.props.page_settings.title}>{page}</AppLayout>;
