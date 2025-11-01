import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { cn } from "@/lib/utils";

export function CardState({ data, childern }) {
    const { title, background, className = '', icon: Icon, iconClassName = '' } = data
    return (
        <Card className={cn(background, className)}/>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {Icon && <Icon className={cn('size-5', iconClassName)} />}
        </CardHeader>
        <CardContent>{childern}</CardContent>
    )
}