import type { TableSortDirection } from '../components/table/context';
import type { MaybeRefOrGetter } from 'vue';
import { computed, shallowRef, toValue } from 'vue';

export interface TableSort<T> {
    key: keyof T;
    direction: 'asc' | 'desc';
}

/** Optional local single-column sorting; never changes the source array or performs requests. */
export function useTableSort<T>(
    rows: MaybeRefOrGetter<readonly T[]>,
    initialSort: TableSort<T> | null = null,
) {
    const sort = shallowRef<TableSort<T> | null>(initialSort);
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    const sortedRows = computed(() => {
        const result = [...toValue(rows)];
        const current = sort.value;
        if (!current) return result;
        return result.sort((a, b) => {
            const left = a[current.key];
            const right = b[current.key];
            // Missing values stay at the end in either direction.
            if (left == null) return right == null ? 0 : 1;
            if (right == null) return -1;
            const order =
                typeof left === 'number' && typeof right === 'number'
                    ? left - right
                    : left instanceof Date && right instanceof Date
                      ? left.getTime() - right.getTime()
                      : collator.compare(String(left), String(right));
            return current.direction === 'asc' ? order : -order;
        });
    });
    function directionFor(key: keyof T): TableSortDirection {
        return sort.value?.key === key ? sort.value.direction : false;
    }
    function sortBy(key: keyof T): void {
        const direction = directionFor(key);
        sort.value =
            direction === 'desc' ? null : { key, direction: direction === 'asc' ? 'desc' : 'asc' };
    }
    return { sortedRows, sort, sortBy, directionFor };
}
