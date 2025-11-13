import { cn } from '@/lib/utils';
import { IconFilter } from '@tabler/icons-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export default function ShowFilter({ params, className = '' }) {
    return (
        <div>
            {Object.keys(params).some((key) => params[key]) && (
                <div className={cn('flex w-full flex-wrap items-center gap-2 bg-secondary p-3', className)}>
                    <div className="flex items-center gap-1 text-sm">
                        <IconFilter className="size-4" />
                        <span>Filter:</span>
                    </div>
                    <Separator orientation="vertical" className="h-6 mx-2" />
                    <div className="flex flex-wrap items-center gap-2">
                        {Object.entries(params).map(
                            ([key, value]) =>
                                value && (
                                    <Badge key={key} variant="white" className="mr-2">
                                        {key.charAt(0).toUpperCase() + key.slice(1)} : {value}
                                    </Badge>
                                ),
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
