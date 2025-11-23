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
import { IconArrowLeft, IconCheck, IconDoor, IconDroplet, IconRefresh } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Create(props) {
    const flash = useFlashMessage();

    const { data, setData, post, processing, errors, reset } = useForm({
        group: 1,
        amount: 0,
        _method: props.page_settings.method,
    });

    // menggunakan useEffect untuk menangani flash message

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
                    icon={IconDroplet}
                />
                <Button asChild variant="orange" className="w-full lg:w-auto" size="xl">
                    <Link href={route('admin.fee-groups.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="px-6">
                    <form onSubmit={onhandleSubmit}>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:p-3">
                            {/* Golongan */}
                            <div className="col-span-full">
                                <Label htmlFor="group">Golongan</Label>
                               <Input
                                    type="number"
                                    name="group"
                                    id="group"
                                    value={data.group}
                                    placeholder="Masukkan golongan ukt baru"
                                    onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                {errors.group && <InputError message={errors.group} />}
                            </div>
                            {/* Jumlah */}
                            <div className="col-span-full">
                                <Label htmlFor="amount">Jumlah</Label>
                                <Input 
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    value={data.amount}
                                    placeholder="Masukkan jumlah nominal ukt baru"
                                    onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                {errors.amount && <InputError message={errors.amount} />}
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

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
