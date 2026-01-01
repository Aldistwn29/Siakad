import HeaderTitle from "@/Components/HeaderTitle";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import AppLayout from "@/Layouts/AppLayout";
import useFlashMessage from "@/lib/utils";
import { Link, useForm } from "@inertiajs/react";
import { IconArrowLeft, IconCalendar, IconCheck, IconRefresh } from "@tabler/icons-react";
import { toast } from "sonner";

export default function Create(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        fakultas_id: null,
        departemen_id: null,
        kelas_id: null,
        course_id: null,
        start_time: '',
        end_time: '',
        day_of_week: null,
        qoute: 0,
        _method: props.page_settings.method
    });

    // handle change
    const handleChange = (e) => setData(e.target.name, e.target.value);

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (success) => {
                const flash = useFlashMessage(success);
                if (flash) toast[flash.type](flash.message);
            }
        });
    };

    // handle reset
    const handleReset = () => reset();
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex items-center justify-between mb-8 felx-col gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title={props.page_settings.title} subtitle={props.page_settings.subtitle} icon={IconCalendar} />
                <Button asChild variant="orange" className="w-full lg:w-auto" size="xl">
                    <Link href={route('admin.schedules.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="px-6">
                    <form onSubmit={handleSubmit}>
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
                            {/* Program Studi */}
                            <div className="col-span-full">
                                <label htmlFor="departemen_id">Program Studi</label>
                                <Select
                                    defaultValue={String(data.departemen_id)}
                                    onValueChange={(value) => setData('departemen_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.departemens.find((departemen) => departemen.value == data.departemen_id)
                                                ?.label ?? 'Pilih Program Studi'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.departemens.map((departemen, index) => (
                                            <SelectItem key={index} value={departemen.value}>
                                                {departemen.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.departemen_id && <InputError message={errors.departemen_id} />}
                            </div>
                            {/* mata kuliah */}
                            <div className="col-span-full">
                                <label htmlFor="course_id">Nama mata kuliah</label>
                                <Select defaultValue={String(data.course_id)} onValueChange={(value) => setData('course_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.courses.find((course) => course.value == data.course_id)
                                                ?.label ?? 'Pilih mata kuliah'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.courses.map((course, index) => (
                                            <SelectItem key={index} value={course.value}>
                                                {course.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.course_id && <InputError message={errors.course_id} />}
                            </div>
                            {/* kelas */}
                            <div className="col-span-full">
                                <label htmlFor="kelas_id">Kelas</label>
                                <Select defaultValue={String(data.kelas_id)} onValueChange={(value) => setData('kelas_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.clasrooms.find((kelas) => kelas.value == data.kelas_id)
                                                ?.label ?? 'Pilih Kelas'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.clasrooms.map((kelas, index) => (
                                            <SelectItem key={index} value={kelas.value}>
                                                {kelas.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.kelas_id && <InputError message={errors.kelas_id} />}
                            </div>
                            {/* waktu mulai*/}
                            <div className="col-span">
                                <Label htmlFor="start_time">Waktu mulai</Label>
                                <Input
                                    type="time"
                                    name="start_time"
                                    id="start_time"
                                    value={data.start_time}
                                    placeholder="Masukkan waktu mulai"
                                    onChange={handleChange}
                                />
                                {errors.start_time && <InputError message={errors.start_time} />}
                            </div>
                            {/* waktu berakhir*/}
                            <div className="col-span">
                                <Label htmlFor="end_time">Waktu berakhir</Label>
                                <Input
                                    type="time"
                                    name="end_time"
                                    id="end_time"
                                    value={data.end_time}
                                    placeholder="Masukkan waktu berakhir"
                                    onChange={handleChange}
                                />
                                {errors.end_time && <InputError message={errors.end_time} />}
                            </div>
                            {/* hari */}
                            <div className="col-span-full">
                                <label htmlFor="day_of_week">Hari</label>
                                <Select defaultValue={String(data.day_of_week)} onValueChange={(value) => setData('day_of_week', value)}>
                                    <SelectTrigger>
                                        <SelectValue>
                                            {props.days.find((day) => day.value == data.day_of_week)
                                                ?.label ?? 'Pilih Hari'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.days.map((day, index) => (
                                            <SelectItem key={index} value={day.value}>
                                                {day.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.day_of_week && <InputError message={errors.day_of_week} />}
                            </div>
                            {/* kuota*/}
                            <div className="col-span-full">
                                <Label htmlFor="qoute">Kuota</Label>
                                <Input
                                    type="text"
                                    name="qoute"
                                    id="qoute"
                                    value={data.qoute}
                                    placeholder="Masukkan Kuota"
                                    onChange={handleChange}
                                />
                                {errors.qoute && <InputError message={errors.qoute} />}
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

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />