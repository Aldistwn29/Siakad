import HeaderTitle from "@/Components/HeaderTitle";
import StudentLayout from "@/Layouts/StudentLayout";
import { IconLayout2 } from "@tabler/icons-react";

export default function Dashbord(props) {

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center justify-between gap-y-4 lg:flex-row">
                <div>
                    <h3 className="text-xl font-semibold leading-relaxed tracking-tight text-foreground">{props.page_settings.title}</h3>
                    <p className="text-sm text-muted-foreground">{props.page_settings.subtitle}</p>
                </div>
            </div>
        </div>
    );
}

Dashbord.layout = (page) => <StudentLayout title={page.props.page_settings.title} children={page} />