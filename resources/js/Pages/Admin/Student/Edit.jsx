import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import useFlashMessage from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { SelectValue } from '@radix-ui/react-select';
import { IconArrowLeft, IconCheck, IconDoor, IconRefresh, IconUser } from '@tabler/icons-react';
import { Eye, EyeOff } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function Edit(props) {
    const flash = useFlashMessage();
    const inputAvatar = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        fakultas_id: props.student.fakultas_id ?? null,
        departement_id: props.student.departement_id ?? null,
        kelas_id: props.student.kelas_id ?? null,
        fee_group_id: props.student.fee_group_id ?? null,
        name: props.student.user.name ?? "",
        email:props.student.user.email ?? "",
        password: "",
        students_number: props.student.students_number ?? "",
        semester: props.student.semester ?? 1,
        batch: props.student.batch ??"",
        avatar: null,
        _method: props.page_settings.method,
    });
    // handle change
    const onhandleChange = (e) => setData(e.target.name, e.target.value);
    // handle submit
    const onhandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
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
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconUser}
                />
                <Button asChild variant="orange" className="w-full lg:w-auto" size="xl">
                    <Link href={route('admin.students.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="px-6">
                    <form onSubmit={onhandleSubmit}>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:p-3">
                            {/* Name */}
                            <div className="col-span-full">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    placeholder="Masukkan nama untuk mahsiswa baru"
                                    onChange={onhandleChange}
                                />
                                {errors.name && <InputError message={errors.name} />}
                            </div>
                            {/* Email */}
                            <div className="col-span-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    placeholder="Masukkan nama untuk email mahasiswa baru"
                                    onChange={onhandleChange}
                                />
                                {errors.email && <InputError message={errors.email} />}
                            </div>
                            {/* Password */}
                            <div className="col-span-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={data.password}
                                        placeholder="Masukkan password mahasiswa baru"
                                        onChange={onhandleChange}
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                                {errors.password && <InputError message={errors.password} />}
                            </div>
                            {/* nama fakultas */}
                           <div className="col-span-full">
                                <Label htmlFor="fakultas_id">Fakultas</Label>
                                <Select defaultValue={String(data.fakultas_id)}
                                    onValueChange={(value) => setData('fakultas_id', value)}>
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
                            {/* program studi */}
                            <div className="col-span-full">
                                <Label htmlFor="departement_id">Program Studi</Label>
                                <Select defaultValue={String(data.departement_id)}
                                    onValueChange={(value) => setData('departement_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.departements.find((departemen) => departemen.value == data.departement_id)
                                                ?.label ?? 'Pilih program studi'}
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
                            {/* Kelas */}
                            <div className="col-span-full">
                                <Label htmlFor="kelas_id">Kelas</Label>
                                <Select defaultValue={String(data.kelas_id)}
                                    onValueChange={(value) => setData('kelas_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.classroms.find((clasrom) => clasrom.value == data.kelas_id)
                                                ?.label ?? 'Pilih Kelas'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.classroms.map((clasroom, index) => (
                                            <SelectItem key={index} value={clasroom.value}>
                                                {clasroom.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.kelas_id && <InputError message={errors.kelas_id} />}
                            </div>
                            {/* Golongan Ukt */}
                            <div className="col-span-full">
                                <Label htmlFor="fee_group_id">Golongan UKT</Label>
                                <Select defaultValue={String(data.fee_group_id)}
                                    onValueChange={(value) => setData('fee_group_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.feeGroups.find((feeGroup) => feeGroup.value == data.fee_group_id)
                                                ?.label ?? 'Pilih Golongan UKT'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.feeGroups.map((feeGroup, index) => (
                                            <SelectItem key={index} value={feeGroup.value}>
                                                {feeGroup.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.fee_group_id && <InputError message={errors.fee_group_id} />}
                            </div>
                            {/* nomer pokok mahasiswa */}
                            <div className="col-span-full">
                                <Label htmlFor="students_number">Nomor Pokok Mahasiswa</Label>
                                <Input
                                    type="text"
                                    name="students_number"
                                    id="students_number"
                                    value={data.students_number}
                                    placeholder="Masukkan nomor pokok mahasiswa baru"
                                    onChange={onhandleChange}
                                />
                                {errors.students_number && <InputError message={errors.students_number} />}
                            </div>
                            {/* Semester*/}
                            <div className="col-span-full">
                                <Label htmlFor="semester">Semester</Label>
                                <Input
                                    type="number"
                                    name="semester"
                                    id="semester"
                                    value={data.semester}
                                    placeholder="Masukkan nomor pokok mahasiswa baru"
                                    onChange={onhandleChange}
                                />
                                {errors.semester && <InputError message={errors.semester} />}
                            </div>
                            {/* Angkatan*/}
                            <div className="col-span-full">
                                <Label htmlFor="batch">Angkatan</Label>
                                <Input
                                    type="text"
                                    name="batch"
                                    id="batch"
                                    value={data.batch}
                                    placeholder="Masukkan nomor pokok mahasiswa baru"
                                    onChange={onhandleChange}
                                />
                                {errors.batch && <InputError message={errors.batch} />}
                            </div>
                            {/* Avtar*/}
                            <div className="col-span-2">
                                <Label htmlFor="avatar">Avatar</Label>
                                <Input
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    onChange={(e) => setData(e.target.name, e.target.files[0])}
                                    ref={inputAvatar}
                                />
                                {errors.avatar && <InputError message={errors.avatar} />}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-8 lg:flex-row lg:justify-end">
                            <Button variant="red" size="xl" type="button" onClick={handleReset}>
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
