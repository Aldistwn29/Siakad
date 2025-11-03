import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';
import { cn } from '@/lib/utils';

export default function PaginationTable({ meta, links }) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className={cn('mb-1', !links.prev && 'cursor-not-allowed')} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className={cn('mb-1', !links.prev && 'cursor-not-allowed')} />
                </PaginationItem>
                <PaginationItem>
                    {meta.links.slice(1, -1).map((link, index) => (
                        <PaginationLink key={index} className="lb:mb-0 mx-1 mb-1">
                            <PaginationLink href={url} isActive={link.active}>
                                {links.label}
                            </PaginationLink>
                        </PaginationLink>
                    ))}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
