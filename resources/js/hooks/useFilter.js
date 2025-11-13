import { router } from '@inertiajs/react';
import pkg from 'lodash';
import { useCallback, useEffect } from 'react';

export default function UseFilter({ route, values, only, wait = 300 }) {
    const { debounce, pickBy } = pkg;

    const reload = useCallback(
        debounce((query) => {
            router.get(route, pickBy(query), {
                only: only,
                preserveScroll: true,
                preserveState: true,
                replace:true,
            });
        }, wait),
        [route, only, wait],
    );

    useEffect(() => reload(values), [values]);
    return { values };
}
