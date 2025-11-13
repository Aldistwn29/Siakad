import HeaderTitle from "@/Components/HeaderTitle"
import InputError from "@/Components/InputError"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import AppLayout from "@/Layouts/AppLayout"
import useFlashMessage from "@/lib/utils"
import { Link, useForm } from "@inertiajs/react"
import { IconArrowLeft, IconBuildingSkyscraper, IconCheck, IconRefresh } from "@tabler/icons-react"
import { useRef } from "react"
import { toast } from "sonner"

export default function Create(props) {
    const fileInputLogo = useRef(null);
    // from data
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        logo: null,
        _method: props.page_settings.method,
    });
    // HandleReset
    const onHandleReset = () => {
        reset();
        fileInputLogo.current.value = null;
    }
    // HandleSubmit
    const handleSumit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            preserveScroll:true,
            preserveState:true,
            onSuccess: () => {
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
                    icon={IconBuildingSkyscraper}
                />
                <Button asChild variant="orange" className="w-full lg:w-auto" size="xl">
                    <Link href={route("admin.fakultas.index")}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSumit}>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols4">
                            {/* Name */}
                            <div className="col-span-full">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Masukan Nama Fakultas"
                                value={data.name}
                                onChange={(e) => setData(e.target.name, e.target.value)}
                                />
                                {errors.name && <InputError message={errors.name}/>}
                            </div>
                            {/* Logo */}
                            <div className="col-span-full">
                            <Label htmlFor="logo">Logo</Label>
                            <Input 
                                type="file"
                                name="logo"
                                id="logo"
                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                ref={fileInputLogo}
                                />
                                {errors.logo && <InputError message={errors.logo}/>}
                            </div>
                            <div className="flex flex-col gap-2 mt-8 lg:flex-row lg:justify-end">
                                <Button variant="red" size="xl" type="submit" onClick={onHandleReset}>
                                    <IconRefresh className="size-4" />
                                    Reset
                                </Button>
                                <Button variant="blue" size="xl" type="submit" disabled={processing}>
                                    <IconCheck className="size-4" />
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />