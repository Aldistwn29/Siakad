export default function EmptyState({
    title = 'Tidak ada data',
    subtitle = 'Silahkan mulai dengan data baru',
    icon: Icon,
}) {
    return (
        <>
            <div className="border-secondary flex flex-col items-center border border-dashed p-4">
                <Icon className="size-12 text-blue-600" />
                <h3 className="text-foreground mt-2 text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
            </div>
        </>
    );
}
