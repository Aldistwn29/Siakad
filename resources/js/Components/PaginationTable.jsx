import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';

export default function PaginationTable({ meta, links }) {
    if (!meta || !links) return null;

    const handleNavigate = (url) => {
        if (url) router.visit(url);
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Tombol Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handleNavigate(links.prev)}
                        className={cn('mb-1', !links.prev && 'cursor-not-allowed opacity-50')}
                    />
                </PaginationItem>

                {/* Tombol Nomor Halaman */}
                {meta.links.slice(1, -1).map((link, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href={link.url || '#'}
                            isActive={link.active}
                            className="mx-1 mb-1"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigate(link.url);
                            }}
                        >
                            {link.label}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Tombol Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handleNavigate(links.next)}
                        className={cn('mb-1', !links.next && 'cursor-not-allowed opacity-50')}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
