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
import { IconArrowLeft, IconRefresh, IconUsersGroup } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const inputAvatar = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        fakultas_id: '',
        departement_id: '',
        name: '',
        email: '',
        password: '',
        avatar: null,
        teachers_number: '',
        academic_title: '',
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
        inputAvatar.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconUsersGroup}
                />
                <Button variant="orange" className="w-full lg:w-auto" size="xl" asChild>
                    <Link href={route('admin.teachers.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="px-6">
                    <form onSubmit={onHandleSumbit}>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:p-3">
                            {/* Name */}
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
                            {/* Email */}
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    placeholder="Masukkan Email Anda"
                                    onChange={onHandleChange}
                                />
                                {errors.email && <InputError message={errors.email} />}
                            </div>
                            {/* Password */}
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="text"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="Masukkan password Anda"
                                    onChange={onHandleChange}
                                />
                                {errors.password && <InputError message={errors.password} />}
                            </div>
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
                            {/* Nama Departemen */}
                            <div className="col-span-full">
                                <Label htmlFor="departement_id">Nama Program Studi</Label>
                                <Select
                                    defaultValue={String(data.departement_id)}
                                    onValueChange={(value) => setData('departement_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.departements.find(
                                                (departemen) => departemen.value == data.departement_id,
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
                                {errors.departement_id && <InputError message={errors.departement_id} />}
                            </div>
                            {/* Nomer Pokok Dosen Nasional */}
                            <div>
                                <Label htmlFor="teachers_number">Nomer Pokok Dosen Nasional</Label>
                                <Input
                                    type="text"
                                    id="teachers_number"
                                    name="teachers_number"
                                    value={data.teachers_number}
                                    placeholder="Masukkan nomer Pokok Dosen Nasional Anda"
                                    onChange={onHandleChange}
                                />
                                {errors.teachers_number && <InputError message={errors.teachers_number} />}
                            </div>
                            {/* Jabatan Akademik */}
                            <div>
                                <Label htmlFor="academic_title">Jabatan Akademik</Label>
                                <Input
                                    type="text"
                                    id="academic_title"
                                    name="academic_title"
                                    value={data.academic_title}
                                    placeholder="Masukkan gelas akademik anda"
                                    onChange={onHandleChange}
                                />
                                {errors.academic_title && <InputError message={errors.academic_title} />}
                            </div>
                            {/* Avatar */}
                            <div className="col-span-full">
                                <Label htmlFor="avatar">Avatar</Label>
                                <Input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    placeholder="Masukkan gelas akademik anda"
                                    onChange={(e) => setData(e.target.name, e.target.files[0])}
                                    ref={inputAvatar}
                                />
                                {errors.avatar && <InputError message={errors.avatar} />}
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

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
