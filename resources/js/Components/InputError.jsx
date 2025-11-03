import { cn } from '@/lib/utils';

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={cn('text-xs text-red-500', className)}>
            {message}
        </p>
    ) : null;
}
