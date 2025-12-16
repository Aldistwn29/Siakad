import AlertAction from "@/Components/AlertAction";
import EmptyState from "@/Components/EmptyState";
import HeaderTitle from "@/Components/HeaderTitle";
import PaginationTable from "@/Components/PaginationTable";
import ShowFilter from "@/Components/ShowFilter";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import UseFilter from "@/hooks/useFilter";
import AppLayout from "@/Layouts/AppLayout";
import { deleteAction, formatDateIndo } from "@/lib/utils";
import { Link, router } from "@inertiajs/react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { IconArrowsDownUp, IconPencil, IconPlus, IconRefresh, IconTrash, IconUsersGroup } from "@tabler/icons-react";
import { replace } from "lodash";
import { useState } from "react";

export default function Index(props) {
    const { data: teachers = [], meta = {}, links = {} } = props.teachers || {};
    const [params, setParams] = useState(props.state);
    // --- Hooks Filter
    UseFilter({
        route: route('admin.teachers.index'),
        values: params,
        only: ['teachers'],
    });

    const onSortTable = (field) => {
        const direction = params.field == field && params.direction === 'asc' ? 'desc' : 'asc';
        const updated = { ...params, field, direction };

        router.get(route('admin.teachers.index'), updated, {
            only: ['teachers'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    // reset filter
    const handleReset = () => {
        const reset = { search: '', field: '', direction: '', load: '10', page: 1};
        setParams(reset);
        router.get(route('admin.teachers.index'), reset, {
            only: ['teachers'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    // handle serching
    const handleSearch = (e) => {
        const value = e.target.value;
        const updated = { ...params, search: value, page: 1};
        setParams(updated);
    };

    // handle change
    const handleLoadChange = (value) => {
        const updated  = { ...params, load: value, page: 1};
        setParams(updated);
    };

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconUsersGroup}
                />
                <Button asChild variant="orange" size="xl" className="w-full lg:w-auto">
                    <Link href={route('admin.teachers.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>
            {/* card */}
            <Card>
                {/* Header */}
                <CardHeader className="pb-0 mb-4">
                    <div className="flex flex-col items-center w-full gap-4 px-6 py-4 lg:flex-row">
                        <Input
                            className="w-full sm:w-1/3"
                            placeholder="cari berdasarkan dosen ..."
                            value={params?.search || ''}
                            onChange={handleSearch}
                        />
                        <Select
                            value={String(params?.load || '10')}
                            onValueChange={handleLoadChange}
                        >
                            <SelectTrigger className="w-full sm:w-24">
                                <SelectValue placeholder="load" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 25, 30, 40].map((number) => (
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
                {/* Content */}
                <CardContent className="pb-0 overflow-x-auto">
                    {teachers.length === 0 ? (
                        <EmptyState
                            title="Tidak ada data"
                            subtitle="Silahkan untuk manambahkan data baru"
                            icon={IconUsersGroup}
                        />
                    ) : (
                        <Table className="w-full [&_td]:px-6 [&_th]:px-6">
                            <TableHeader>
                                <TableRow>
                                    {/* id */}
                                    <TableHead>
                                        <Button variant="ghost" className="inline-flex group" onClick={() => onSortTable('id')}>
                                            #
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Nama */}
                                    <TableHead>
                                        <Button variant="ghost" className="inline-flex group" onClick={() => onSortTable('name')}>
                                            Nama
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Email */}
                                    <TableHead>
                                        <Button variant="ghost" className="inline-flex group" onClick={() => onSortTable('email')}>
                                            Email
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Fakultas */}
                                    <TableHead>
                                        <Button variant="ghost" className="inline-flex group" onClick={() => onSortTable('fakultas_id')}>
                                            Nama Fakultas
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Departemen */}
                                    <TableHead>
                                        <Button variant="ghost" className="inline-flex group" onClick={() => onSortTable('departemen_id')}>
                                            Nama Jurusan
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Nomer Pokok Nasional Dosen */}
                                    <TableHead>
                                        <Button variant="ghost" className="inline-flex group" onClick={() => onSortTable('teachers_number')}>
                                            Nomor Pokok Nasional Dosen
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* jabatan akademik */}
                                    <TableHead>
                                        <Button variant="ghost" className="inline-flex group" onClick={() => onSortTable('academic_title')}>
                                            Jabatan Akademik
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Tanggal dibuat */}
                                    <TableHead>
                                        <Button variant="ghost" className="inline-flex group" onClick={() => onSortTable('created_at')}>
                                            Dibuat pada
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    {/* Aksi */}
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teachers.map((teacher, index) => {
                                    const rowNumber = index + 1 + ((meta.current_page || 1) - 1) * (meta.per_page || 10);
                                    const userName = teacher.user?.name || 'Tidak ada nama';
                                    const userEmail = teacher.user?.email || '-';
                                    const facultyName = teacher.faculty?.name || '-';
                                    const departemenName = teacher.departemen?.name || '-';
                                    const teachersNumber = teacher.teachers_number || '-';
                                    const academicTitle = teacher.academic_title || '-';
                                    const createdAt = teacher.created_at ? formatDateIndo(teacher.created_at) : '-';
                                    const userInitial = userName !== 'Tidak ada nama' ? userName.substring(0, 1).toUpperCase() : '?';

                                    return (
                                        <TableRow key={teacher.id}>
                                            <TableCell className="font-medium text-center w-16">{rowNumber}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 min-w-[200px]">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={teacher.user?.avatar} alt={userName} />
                                                        <AvatarFallback className="text-xs">{userInitial}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium truncate">{userName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="min-w-[180px]">
                                                <span className="text-muted-foreground truncate block">{userEmail}</span>
                                            </TableCell>
                                            <TableCell className="min-w-[150px]">
                                                {facultyName === '-' ? (
                                                    <span className="text-muted-foreground italic">-</span>
                                                ) : (
                                                    <span>{facultyName}</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="min-w-[150px]">
                                                {departemenName === '-' ? (
                                                    <span className="text-muted-foreground italic">-</span>
                                                ) : (
                                                    <span>{departemenName}</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="min-w-[140px]">
                                                {teachersNumber === '-' ? (
                                                    <span className="text-muted-foreground italic">-</span>
                                                ) : (
                                                    <span className="font-mono text-sm">{teachersNumber}</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="min-w-[130px]">
                                                {academicTitle === '-' ? (
                                                    <span className="text-muted-foreground italic">-</span>
                                                ) : (
                                                    <span>{academicTitle}</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="min-w-[120px]">
                                                <span className="text-muted-foreground text-sm">{createdAt}</span>
                                            </TableCell>
                                            <TableCell className="w-24">
                                                <div className="flex items-center gap-x-1">
                                                    <Button variant="blue" size="sm" asChild>
                                                        <Link href={route('admin.teachers.edit', [teacher.teachers_number])}>
                                                            <IconPencil className="size-4" />
                                                        </Link>
                                                    </Button>
                                                    <AlertAction
                                                        trigger={
                                                            <Button variant="red" size="sm">
                                                                <IconTrash className="size-4" />
                                                            </Button>
                                                        }
                                                        action={() => deleteAction(route('admin.teachers.destroy', [teacher.teachers_number]))}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col items-center justify-between w-full py-3 border-t gap-y-2 lg:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-blue-600">{meta.from ?? 0}</span>
                        dari {' '} {meta.total} Dosen
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && <PaginationTable meta={meta} links={links} />}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
