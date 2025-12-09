import { ComboBox } from "@/Components/ComboBox";
import EmptyState from "@/Components/EmptyState";
import HeaderTitle from '@/Components/HeaderTitle';
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Layouts/AppLayout";
import useFlashMessage from "@/lib/utils";
import { Link, useForm } from "@inertiajs/react";
import { IconArrowLeft, IconCheck, IconDoor } from "@tabler/icons-react";
import { toast } from "sonner";

export default function Index(props){
    const {data:classroomStudents} = props.classroomStudents;
    console.log(props.students);
    const { data, setData, post, processing, errors} = useForm({
        student : null,
        _method : props.page_settings.method,
    });

    const onHandleSumbit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = useFlashMessage(success);
                if(flash) toast[flash.type](flash.message);
            }
        })
    }
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle 
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconDoor}
                />
                <Button size="xl" variant="orange" className="w-full lg:w-auto" asChild>
                    <Link href={route('admin.kelas.index')}>
                        <IconArrowLeft className="size-4"/>
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader className="mb-4">
                    <form onSubmit={onHandleSumbit}>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols4">
                            <div className="col-span-full">
                                <Label htmlFor="student">Mahasiswa</Label>
                                <ComboBox 
                                    items={props.students}
                                    selectedItem={data.student}
                                    placeholder="Pilih Mahasiswa"
                                    onSelect={(currentValue) => setData('student', currentValue)}
                                />
                                {/* Errors */}
                                {errors.student && <InputError message={errors.student}/>}
                        <div className="flex flex-col gap-2 mt-8 lg:flex-row lg:justify-end">
                            <Button variant="blue" size="xl" type="submit" disabled={processing}>
                                <IconCheck className="size-4"/>
                                Save
                            </Button>
                        </div>
                            </div>
                        </div>
                        <Card>
                            <CardHeader className="mb-4">
                                <CardContent>
                                    {classroomStudents.length === 0 ? (
                                        <EmptyState icon={IconDoor} title="Tidak ada mahasiswa" subtitle="Mulai dengan memasukkan mahasiswa ke dalam kelas"/>
                                    ) : ( 
                                        <div className="grid grid-cols-4 gap-4">

                                        </div>
                                    )}
                                </CardContent>
                            </CardHeader>
                        </Card>
                    </form>
                </CardHeader>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page}/>