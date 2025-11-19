import AlertAction from "@/Components/AlertAction";
import EmptyState from "@/Components/EmptyState";
import HeaderTitle from "@/Components/HeaderTitle";
import PaginationTable from "@/Components/PaginationTable";
import ShowFilter from "@/Components/ShowFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import UseFilter from "@/hooks/useFilter";
import AppLayout from "@/Layouts/AppLayout";
import { deleteAction, formatDateIndo } from "@/lib/utils";
import { Link, router } from "@inertiajs/react";
import { IconArrowsDownUp, IconBuildingSkyscraper, IconPencil, IconPlus, IconRefresh, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function Index(props) {
    const { data: departemen, meta, links } = props.departements;
    const [params, setParams] = useState(props.state);
     // --- Hooks Filter (debounce 300ms)
        UseFilter({
            route: route("admin.departemen.index"),
            values: params,
            only: ["departemen"],
        });

    const onSortable = (field) => {
        const direction = params.field === field && params.direction === 'asc' ? 'desc' : 'asc';
        const updated = {...params, field, direction};

        router.get(route('admin.departemen.index'), updated, {only:['departemen'], preserveScroll: true, preserveState: true, replace: true})
    };
    // --- Reset filter
    const handleReset = () => {
        const reset = { ...props.state, search: "", field: "", direction: "", load: 10 };
        setParams(reset);
        router.get(route("admin.departemen.index"), reset, {
            only: ["departemen"],
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
                <HeaderTitle title={props.page_settings.title} subtitle={props.page_settings.subtitle} icon={IconBuildingSkyscraper} />
                <Button asChild variant="orange" size="xl" className="w-full lg:w-auto">
                    <Link href={route('admin.departemen.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>
            {/* Cardh */}
            <Card>
                <CardHeader className="p-0 mb-4">
                    <div className="flex flex-col items-center w-full gap-4 px-6 py-4 lg:flex-row">
                        <Input
                            className="w-full sm:w-1/3"
                            placeholder="Cari berdasarkan program studi..."
                            value={params?.search || ""}
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
                    {departemen.length === 0 ? (
                        <EmptyState
                            title="Data kosong"
                            subtitle="Silahkan untuk menambahkan data baru"
                            icon={IconBuildingSkyscraper}
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead><Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable("fakultas_id")}
                                        >
                                            Fakultas
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button></TableHead>
                                    <TableHead>
                                        Name
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable("name")}
                                        >
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        Code
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable("code")}
                                        >
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        Dibuat pada
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable("created_at")}
                                        >
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {departemen.map((departemen, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {index + 1 + (meta.current_page - 1) * meta.per_page}
                                        </TableCell>
                                        <TableCell>{departemen.faculty.name}</TableCell>
                                        <TableCell>{departemen.name}</TableCell>
                                        <TableCell>{departemen.code}</TableCell>
                                        <TableCell>{formatDateIndo(departemen.created_at)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button variant="blue" size="sm" asChild>
                                                    <Link href={route("admin.departemen.edit", [departemen])}>
                                                        <IconPencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <AlertAction
                                                    trigger={
                                                        <Button variant="red" size="sm">
                                                            <IconTrash className="size-4" />
                                                        </Button>
                                                    }
                                                    action={() => deleteAction(route('admin.departemen.destroy', [departemen]))}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col items-center justify-between w-full py-3 border-t gap-y-2 lg:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan{" "}
                        <span className="font-medium text-blue-600">
                            {meta.from ?? 0}
                        </span>{" "}
                        dari {meta.total} Program studi
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && <PaginationTable meta={meta} links={links} />}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />