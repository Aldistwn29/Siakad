import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import useFlashMessage from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconCheck, IconDoor, IconRefresh } from '@tabler/icons-react';
import { toast } from 'sonner';
export default function Edit(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.kelas.name ?? '',
        facultas_id: props.kelas.facultas_id ?? null,
        departemen_id: props.kelas.departemen_id ?? null,
        academic_year_id: props.academic_year.name,
        _method: props.page_settings.method,
    });

    // handle change
    const onhandleChange = (e) => setData(e.target.name, e.target.value);
    // handle submit
    const onhandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            preserveScroll: true,
            preserveScroll: true,
            onSuccess: (success) => {
                const flash = useFlashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };
    // handle reset
    const handleReset = () => reset();
    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconDoor}
                />
                <Button asChild type="button" variant="orange" className="w-full lg:w-auto" size="xl">
                    <Link href={route('admin.kelas.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="px-6">
                    <form onSubmit={onhandleSubmit}>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:p-3">
                            {/* Fakultas */}
                            <div className="col-span-full">
                                <Label htmlFor="facultas_id">Fakultas</Label>
                                <Select
                                    defaultValue={String(data.facultas_id)}
                                    onValueChange={(value) => setData('facultas_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.fakultas.find((faculty) => faculty.value == data.facultas_id)
                                                ?.label ?? 'Pilih fakultas'}
                                        </SelectValue>

                                        <SelectContent>
                                            {props.fakultas.map((faculty, index) => (
                                                <SelectItem key={index} value={faculty.value}>
                                                    {faculty.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </SelectTrigger>
                                </Select>
                                {errors.facultas_id && <Input message={errors.facultas_id} />}
                            </div>
                            {/* Program Studi */}
                            <div className="col-span-full">
                                <Label htmlFor="departemen_id">Program Studi</Label>
                                <Select
                                    defaultValue={String(data.departemen_id)}
                                    onValueChange={(value) => setData('departemen_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.departemens.find(
                                                (departemen) => departemen.value == data.departemen_id,
                                            )?.label ?? 'Pilih fakultas'}
                                        </SelectValue>

                                        <SelectContent>
                                            {props.departemens.map((departemen, index) => (
                                                <SelectItem key={index} value={departemen.value}>
                                                    {departemen.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </SelectTrigger>
                                </Select>
                                {errors.departemen_id && <Input message={errors.departemen_id} />}
                            </div>
                            {/* Tahun Ajaran */}
                            <div className="col-span-full">
                                <Label htmlFor="academic_year_id">Tahun Ajaran</Label>
                                <Input
                                    id="academic_year_id"
                                    name="academic_year_id"
                                    value={data.academic_year_id}
                                    onChange={onhandleChange}
                                    disabled
                                />
                                {errors.academic_year_id && <Input message={errors.academic_year_id} />}
                            </div>
                            <div className="col-span-full">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={onhandleChange}
                                    palceholder="Masukkan nama progrm studi"
                                />
                                {errors.name && <Input message={errors.name} />}
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col gap-2 lg:flex-row lg:justify-end">
                            <Button variant="red" size="xl" type="submit" onClick={handleReset}>
                                <IconRefresh className="size-4" />
                                Reset
                            </Button>
                            <Button variant="blue" size="xl" type="submit" disabled={processing}>
                                <IconCheck className="size-4" />
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
