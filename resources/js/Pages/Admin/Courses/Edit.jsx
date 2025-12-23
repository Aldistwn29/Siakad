import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import useFlashMessage from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconBook, IconRefresh } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Edit(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        fakultas_id: props.course.fakultas_id ?? null,
        departemen_id: props.course.departemen_id ?? null,
        teacher_id: props.course.teacher_id ?? null,
        name: props.course.name ?? '',
        code: props.course.code ?? '',
        credit: props.course.credit ?? 1,
        semester: props.course.semester ?? 1,
        _method: props.page_settings.method,
    });

    // handle change
    const onHandleChange = (e) => setData(e.target.name, e.target.value);

    // handle submit
    const onHandleSumbit = (e) => {
        e.preventDefault();
        console.log(data);
        post(props.page_settings.action, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (success) => {
                const flash = useFlashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    // handle reset
    const handleReset = () => {
        reset();
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconBook}
                />
                <Button variant="orange" className="w-full lg:w-auto" size="xl" asChild>
                    <Link href={route('admin.courses.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="px-6">
                    <form onSubmit={onHandleSumbit}>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:p-3">
                            {/* Nama fakultas */}
                            <div className="col-span-full">
                                <Label htmlFor="fakultas_id">Nama Fakultas</Label>
                                <Select
                                    defaultValue={String(data.fakultas_id)}
                                    onValueChange={(value) => setData('fakultas_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.faculties.find((fakultas) => fakultas.value == data.fakultas_id)
                                                ?.label ?? 'Pilih Fakultas'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.faculties.map((fakultas, index) => (
                                            <SelectItem key={index} value={fakultas.value}>
                                                {fakultas.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.fakultas_id && <InputError message={errors.fakultas_id} />}
                            </div>
                            {/* Nama Program studi */}
                            <div className="col-span-full">
                                <Label htmlFor="departemen_id">Nama Program Studi</Label>
                                <Select
                                    defaultValue={String(data.departemen_id)}
                                    onValueChange={(value) => setData('departemen_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.departements.find(
                                                (departemen) => departemen.value == data.departemen_id,
                                            )?.label ?? 'Pilih Program Studi'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.departements.map((departemen, index) => (
                                            <SelectItem key={index} value={departemen.value}>
                                                {departemen.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.departemen_id && <InputError message={errors.departemen_id} />}
                            </div>
                            {/* Nama Dosen */}
                            <div className="col-span-full">
                                <Label htmlFor="teacher_id">Nama Dosen</Label>
                                <Select
                                    defaultValue={String(data.teacher_id)}
                                    onValueChange={(value) => setData('teacher_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.teachers.find((teacher) => teacher.value == data.teacher_id)
                                                ?.label ?? 'Pilih Dosen'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.teachers.map((teacher, index) => (
                                            <SelectItem key={index} value={teacher.value}>
                                                {teacher.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.teacher_id && <InputError message={errors.teacher_id} />}
                            </div>
                            {/* code mata kuliah */}
                            <div className="col-span-full">
                                <Label htmlFor="code">Nomor mata kuliah</Label>
                                <Input
                                    type="text"
                                    name="code"
                                    id="code"
                                    value={data.code}
                                    placeholder="Masukkan code matakuliah"
                                    onChange={onHandleChange}
                                />
                                {errors.code && <InputError message={errors.code} />}
                            </div>
                            {/* Nama mata kuliah */}
                            <div className="col-span-full">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    placeholder="Masukkan Nama Anda"
                                    onChange={onHandleChange}
                                />
                                {errors.name && <InputError message={errors.name} />}
                            </div>
                            {/* Satuan kredit semester */}
                            <div className="col-span-full">
                                <Label htmlFor="credit">Satuan kredit semester(SKS)</Label>
                                <Input
                                    type="number"
                                    name="credit"
                                    id="credit"
                                    value={data.credit}
                                    placeholder="Masukkan Satuan kredit semester(SKS)"
                                    onChange={onHandleChange}
                                />
                                {errors.credit && <InputError message={errors.credit} />}
                            </div>
                            {/* Semester */}
                            <div className="col-span-full">
                                <Label htmlFor="semester">Semester</Label>
                                <Input
                                    type="number"
                                    name="semester"
                                    id="semester"
                                    value={data.semester}
                                    placeholder="Masukkan Semester"
                                    onChange={onHandleChange}
                                />
                                {errors.semester && <InputError message={errors.semester} />}
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col gap-2 lg:flex-row lg:justify-end">
                            <Button variant="red" size="xl" type="button" onClick={handleReset}>
                                <IconRefresh className="size-4" />
                                Reset
                            </Button>
                            <Button variant="blue" size="xl" type="submit" disabled={processing}>
                                <IconRefresh className="size-4" />
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
