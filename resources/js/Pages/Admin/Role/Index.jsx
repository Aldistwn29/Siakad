import AlertAction from '@/Components/AlertAction';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import PaginationTable from '@/Components/PaginationTable';
import ShowFilter from '@/Components/ShowFilter';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import UseFilter from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { deleteAction, formatDateIndo } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { IconArrowsDownUp, IconCircleKey, IconPencil, IconPlus, IconRefresh, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: roles, meta, links } = props.roles;

    const [params, setParams] = useState({ ...props.state });
    const [instantReload, setInstantReload] = useState(false);

    // --- Hooks Filter (debounce 300ms)
    UseFilter({
        route: route('admin.roles.index'),
        values: params,
        only: ['role'],
    });

    // --- Sorting handler
    const onSortable = (field) => {
        const direction = params.field === field && params.direction === 'asc' ? 'desc' : 'asc';
        const updated = { ...params, field, direction };

        setParams(updated);

        // langsung reload, skip debounce
        router.get(route('admin.roles.index'), updated, {
            only: ['roles'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    // --- Reset filter
    const handleReset = () => {
        const reset = { ...props.state, search: '', field: '', direction: '', load: 10 };
        setParams(reset);
        router.get(route('admin.roles.index'), reset, {
            only: ['roles'],
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
                        icon={IconCircleKey}
                    />
                    <Button asChild variant="orange" className="w-full lg:w-auto" size="xl">
                        <Link href={route('admin.roles.create')}>
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
                                placeholder="Cari berdasarkan peran..."
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

                    <CardContent className="pb-0 [&-td]:px-6 [&-td]:whitespace-nowrap [&-th]:px-6">
                        {roles.length === 0 ? (
                            <EmptyState
                                title="Peran koson"
                                subtitle="Silahkan untuk menambahkan data peran baru"
                                icon={IconCircleKey}
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
                                                onClick={() => onSortable('id')}
                                            >
                                                <span className="text-muted-foreground ml-2 flex-none rounded">
                                                    <IconArrowsDownUp className="size-4" />
                                                </span>
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            Name
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex"
                                                onClick={() => onSortable('name')}
                                            >
                                                <span className="text-muted-foreground ml-2 flex-none rounded">
                                                    <IconArrowsDownUp className="size-4" />
                                                </span>
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            Name Guard
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex"
                                                onClick={() => onSortable('guard_name')}
                                            >
                                                <span className="text-muted-foreground ml-2 flex-none rounded">
                                                    <IconArrowsDownUp className="size-4" />
                                                </span>
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            Dibuat pada
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex"
                                                onClick={() => onSortable('created_at')}
                                            >
                                                <span className="text-muted-foreground ml-2 flex-none rounded">
                                                    <IconArrowsDownUp className="size-4" />
                                                </span>
                                            </Button>
                                        </TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.map((role, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                            <TableCell>{role.name}</TableCell>
                                            <TableCell>{role.guard_name}</TableCell>
                                            <TableCell>{formatDateIndo(role.created_at)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-x-1">
                                                    <Button variant="blue" size="sm" asChild>
                                                        <Link href={route('admin.roles.edit', [role])}>
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
                                                            deleteAction(route('admin.roles.destroy', [role]))
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
                        <p className="text-muted-foreground text-sm">
                            Menampilkan <span className="font-medium text-blue-600">{meta.from ?? 0}</span> dari{' '}
                            {meta.total} Peran
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

Index.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
