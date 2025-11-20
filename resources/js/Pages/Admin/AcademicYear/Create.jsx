import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import useFlashMessage from '@/lib/utils';
import { Link, useForm, usePage } from '@inertiajs/react';
import { IconArrowLeft, IconBuildingSkyscraper, IconCalendar, IconCheck, IconRefresh } from '@tabler/icons-react';
import { check } from 'prettier';
import { toast } from 'sonner';

export default function Create(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        start_date: '',
        end_date: '',
        semester: null,
        is_active: false,
        _method: props.page_settings.method
    });

    // handle change
    const onhandleChange = (e) => setData(e.target.name, e.target.value);
    const onhandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = useFlashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    // handle reset
    const handleReset = () => reset();

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconCalendar}
                />
                <Button asChild variant="orange" className="w-full lg:w-auto" size="xl">
                    <Link href={route('admin.academic_year.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="px-6">
                    <form onSubmit={onhandleSubmit}>
                        <div className="grid grid-cols-1 gap-4 p-3 lg:p-4 lg:grid-cols-4">

                            {/* NAME */}
                            <div className="col-span-full">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={onhandleChange}
                                    placeholder="Masukan tahun ajaran"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* START DATE */}
                            <div className="col-span-2">
                                <Label htmlFor="start_date">Tanggal Mulai</Label>
                                <Input
                                    type="date"
                                    name="start_date"
                                    id="start_date"
                                    value={data.start_date}
                                    onChange={onhandleChange}
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
                                )}
                            </div>

                            {/* END DATE */}
                            <div className="col-span-2">
                                <Label htmlFor="end_date">Tanggal Berakhir</Label>
                                <Input
                                    type="date"
                                    name="end_date"
                                    id="end_date"
                                    value={data.end_date}
                                    onChange={onhandleChange}
                                />
                                {errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
                                )}
                            </div>

                            {/* SEMESTER */}
                            <div className="col-span-full">
                                <Label htmlFor="semester">Semester</Label>
                                <Select
                                    value={data.semester}
                                    onValueChange={(value) => setData("semester", value)}
                                >
                                    <SelectTrigger id="semester">
                                        <SelectValue placeholder="Pilih semester" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {props.academicYearSemester?.map((semester, idx) => (
                                            <SelectItem key={idx} value={semester.value}>
                                                {semester.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {errors.semester && (
                                    <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
                                )}
                            </div>

                            {/* IS ACTIVE CHECKBOX */}
                            <div className="col-span-full">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData("is_active", checked)}
                                    />
                                    <Label htmlFor="is_active">Apakah aktif?</Label>
                                </div>

                                {errors.is_active && (
                                    <p className="mt-1 text-sm text-red-600">{errors.is_active}</p>
                                )}
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col gap-2 mt-8 lg:flex-row lg:justify-end">

                            {/* RESET — tidak submit form */}
                            <Button
                                variant="red"
                                size="xl"
                                type="button"
                                onClick={handleReset}
                            >
                                <IconRefresh className="size-4" />
                                Reset
                            </Button>

                            {/* SAVE */}
                            <Button
                                variant="blue"
                                size="xl"
                                type="submit"
                                disabled={processing}
                            >
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

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
