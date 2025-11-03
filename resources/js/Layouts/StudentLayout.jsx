import Banner from "@/Components/Banner";
import { Card, CardContent } from "@/Components/ui/card";
import useFlashMessage from "@/lib/utils";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Toaster } from "sonner";
import HeaderStudentLayout from "./HeaderStudentLayout";

export default function StudentLayout({ title, children }) {
    const checkFee = usePage().props.checkFee;
    const { url } = usePage();

    const flash = useFlashMessage();
    useEffect(() => {
        if (flash && flash.message && flash.type === 'warning') toast[flash.type](flash.message);
    }, [flash]);

    return (
        <>
            <Head title={title} />
            <Toaster position="top" richColors />
            <div className="min-h-full">
                <div className="pb-32 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                    {/* Headers Layouts */}
                    <HeaderStudentLayout url={url}/>
                </div>

                <main className="pb-12 -mt-32 px-7 lg:px-8">
                    <Card>
                        <CardContent className="px-6">
                            {children}
                        </CardContent>
                    </Card>
                    {checkFee === false && <Banner message=" Harap melakukan pembayaran terlebih dahulu" />}
                </main>
            </div>
        </>
    )
}