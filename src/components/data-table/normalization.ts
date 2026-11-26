import type {
    DataTableFormat,
    DataTableBackendAdapter,
    DataTableSource,
    LaravelPagination,
    LaravelListPayload,
    ListPayload,
    ListState,
    LucidPagination,
    LucidListPayload,
} from './contracts';

/** Keep pager availability consistent even when a JSON endpoint omits navigation URLs. */
export function normalizePagination<T>(
    pagination: LucidPagination<T>,
    path = '',
): ListPayload<T>['results'] {
    const { data, meta } = pagination;
    const pageUrl = (page: number): string => {
        const [pathname, query = ''] = path.split('?');
        const parameters = new URLSearchParams(query);
        parameters.set('page', String(page));
        return pathname + '?' + parameters.toString();
    };
    const from = meta.total === 0 ? 0 : (meta.currentPage - 1) * meta.perPage + 1;
    return {
        data,
        current_page: meta.currentPage,
        first_page: meta.firstPage ?? 1,
        last_page: Math.max(1, meta.lastPage),
        per_page: meta.perPage,
        total: meta.total,
        from,
        to: meta.total === 0 ? 0 : Math.min(meta.currentPage * meta.perPage, meta.total),
        path,
        first_page_url: meta.firstPageUrl ?? pageUrl(1),
        last_page_url: meta.lastPageUrl ?? pageUrl(Math.max(1, meta.lastPage)),
        prev_page_url:
            meta.currentPage > 1 ? meta.previousPageUrl || pageUrl(meta.currentPage - 1) : null,
        next_page_url:
            meta.currentPage < meta.lastPage
                ? meta.nextPageUrl || pageUrl(meta.currentPage + 1)
                : null,
        links: [],
    };
}

/** Accept Laravel's paginator without requiring first_page or non-null ranges. */
export function adaptLaravelPagination<T>(
    pagination: LaravelPagination<T>,
    path = '',
): ListPayload<T>['results'] {
    const normalized = normalizePagination(
        {
            data: pagination.data,
            meta: {
                currentPage: pagination.current_page,
                lastPage: pagination.last_page,
                perPage: pagination.per_page,
                total: pagination.total,
                firstPageUrl: pagination.first_page_url,
                lastPageUrl: pagination.last_page_url,
                previousPageUrl: pagination.prev_page_url,
                nextPageUrl: pagination.next_page_url,
            },
        },
        pagination.path || path,
    );
    return {
        ...normalized,
        from: pagination.data.length ? (pagination.from ?? normalized.from) : 0,
        to: pagination.data.length ? (pagination.to ?? normalized.to) : 0,
        links: pagination.links ?? normalized.links,
    };
}

export function adaptLaravelList<T>(list: LaravelListPayload<T>, path = ''): ListPayload<T> {
    const results = adaptLaravelPagination(list.results, path);
    const search =
        list.state?.search ??
        (typeof list.filters.search === 'string' ? list.filters.search : null);
    return {
        results,
        config: list.config,
        filters: { ...list.filters, search: list.filters.search ?? search ?? undefined },
        state: {
            page: list.state?.page ?? results.current_page,
            per_page: list.state?.per_page ?? results.per_page,
            order_by: list.state?.order_by ?? '',
            order: list.state?.order ?? 'ASC',
            search,
        },
    };
}

export const adaptLucidPagination = normalizePagination;

/** Normalize once at the boundary; rendering and all column factories use the same contract. */
export function adaptLucidList<T>(list: LucidListPayload<T>, path = ''): ListPayload<T> {
    const results = adaptLucidPagination(list.results, path);
    return {
        results,
        config: list.config,
        filters: {
            ...list.filters,
            search: list.filters.search ?? list.state?.search ?? undefined,
        },
        state: {
            page: list.state?.page ?? results.current_page,
            per_page: list.state?.perPage ?? results.per_page,
            order_by: list.state?.orderBy ?? '',
            order: list.state?.order === 'desc' ? 'DESC' : 'ASC',
            search:
                list.state?.search ??
                (typeof list.filters.search === 'string' ? list.filters.search : null),
        },
    };
}

export interface LucidQueryOptions {
    /** Applications choose their endpoint's page-size parameter, e.g. perPage or limit. */
    perPageKey?: string;
    /** Flatten ranges, encode multi-values or apply domain-specific names in the host. */
    serializeFilters?: (filters: Record<string, unknown>) => Record<string, unknown>;
}

/** Lucid supplies pagination metadata, not an endpoint query convention; these defaults are configurable. */
export function serializeLucidQuery(
    state: ListState,
    filters: Record<string, unknown>,
    options: LucidQueryOptions = {},
): Record<string, unknown> {
    return {
        ...(options.serializeFilters?.(filters) ?? filters),
        page: state.page,
        [options.perPageKey ?? 'perPage']: state.per_page,
        orderBy: state.order_by,
        order: state.order.toLowerCase(),
        search: state.search,
    };
}

export function serializeMiruQuery(state: ListState, filters: Record<string, unknown>) {
    return {
        page: state.page,
        per_page: state.per_page,
        order_by: state.order_by,
        order: state.order,
        filters,
    };
}

/** Resolve component data conventions without importing any transport integration. */
export function resolveDataTableAdapter(
    format: DataTableFormat,
    options: LucidQueryOptions = {},
): DataTableBackendAdapter {
    if (format === 'lucid')
        return {
            format,
            normalize: <T>(source: DataTableSource<T>, path?: string) =>
                adaptLucidList(source as LucidListPayload<T>, path),
            serializeQuery: (state, filters) => serializeLucidQuery(state, filters, options),
        };
    if (format === 'laravel')
        return {
            format,
            normalize: <T>(source: DataTableSource<T>, path?: string) =>
                adaptLaravelList(source as LaravelListPayload<T>, path),
            serializeQuery: serializeMiruQuery,
            queryProps: ['list'],
        };
    return {
        format: 'default',
        normalize: <T>(source: DataTableSource<T>) => source as ListPayload<T>,
        serializeQuery: serializeMiruQuery,
        queryProps: ['list'],
    };
}
export function normalizeDataTableList<T>(
    source: DataTableSource<T>,
    format: DataTableFormat,
): ListPayload<T> {
    return resolveDataTableAdapter(format).normalize(source);
}
