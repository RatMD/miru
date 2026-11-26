import type { DataTableFormat, ListPayload, ListState } from './contracts';
import type { MaybeRef, MaybeRefOrGetter } from 'vue';
import { toValue, unref } from 'vue';
import { useDataTableAdapter } from '../../composables/useDataTableAdapter';
import { useNavigation } from '../../composables/useNavigation';

interface UseDataTableQueryOptions<TData> {
    list: MaybeRefOrGetter<ListPayload<TData>>;
    additionalQuery?: MaybeRefOrGetter<Record<string, unknown> | undefined>;
    onNavigate?: () => void;
    disabled?: MaybeRefOrGetter<boolean>;
    dataFormat?: MaybeRefOrGetter<DataTableFormat | undefined>;
    queryProps?: MaybeRefOrGetter<string[] | undefined>;
    querySerializer?: MaybeRef<
        | ((state: ListState, filters: Record<string, unknown>) => Record<string, unknown>)
        | undefined
    >;
    queryHandler?: MaybeRef<
        ((state: ListPayload<TData>['state'], filters: Record<string, unknown>) => void) | undefined
    >;
}

/**
 * Coordinate server-owned search, filtering, sorting and pagination via host navigation.
 * Advanced search can later be added at this serialization boundary.
 */
export function useDataTableQuery<TData>(options: UseDataTableQueryOptions<TData>) {
    const navigation = useNavigation();
    const backend = useDataTableAdapter(options.dataFormat);
    function visit(
        overrides: Partial<ListPayload<TData>['state']>,
        filters = toValue(options.list).filters,
        replace = true,
    ): void {
        if (toValue(options.disabled)) return;
        const list = toValue(options.list);
        options.onNavigate?.();
        const state: ListState = {
            ...list.state,
            ...overrides,
            search: String(filters.search ?? '') || null,
        };
        const queryHandler = unref(options.queryHandler);
        if (queryHandler) {
            queryHandler(state, filters);
            return;
        }
        const serializer = unref(options.querySerializer) ?? backend.value.serializeQuery;
        const payload = {
            ...serializer(state, filters),
            ...toValue(options.additionalQuery),
        };

        navigation.visit(window.location.pathname, {
            method: 'get',
            data: payload,
            preserveScroll: true,
            preserveState: true,
            replace,
            only: toValue(options.queryProps) ?? backend.value.queryProps,
        });
    }

    function visitPage(page: number): void {
        visit({ page }, toValue(options.list).filters, false);
    }

    function visitPerPage(per_page: number): void {
        visit({ page: 1, per_page });
    }

    function visitFilters(filters: Record<string, unknown>): void {
        visit({ page: 1 }, filters);
    }

    function toggleSort(id: string): void {
        const list = toValue(options.list);
        if (!list.config.sortable.includes(id)) return;
        visit({
            page: 1,
            order_by: id,
            order: list.state.order_by === id && list.state.order === 'ASC' ? 'DESC' : 'ASC',
        });
    }

    return {
        toggleSort,
        visitFilters,
        visitPage,
        visitPerPage,
    };
}
