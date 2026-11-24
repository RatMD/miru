export interface ListPagination<T> {
    data: T[];
    current_page: number;
    first_page: number;
    last_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    path: string;
    first_page_url: null | string;
    last_page_url: null | string;
    prev_page_url: null | string;
    next_page_url: null | string;
    links: {
        active: boolean;
        label: null | string;
        url: null | string;
    }[];
}

export type ListOrder = 'ASC' | 'DESC';

export interface ListState {
    page: number;
    per_page: number;
    order_by: string;
    order: ListOrder;
    search: string | null;
}

export interface ListFilterOption {
    label?: string;
    label_key?: string;
    value: string;
    emoji?: string | null;
    depth?: number;
    path?: string;
    parent_id?: string | null;
    disabled?: boolean;
}

export interface ListFilterConfiguration {
    label?: string;
    label_key?: string;
    type:
        | 'select'
        | 'multiselect'
        | 'checkbox'
        | 'switch'
        | 'category'
        | 'date-range'
        | 'number-range';
    searchable?: boolean;
    options: ListFilterOption[];
    /** Bounds for number ranges; date ranges use ISO calendar dates. */
    min?: string | number;
    max?: string | number;
    step?: string | number;
}

export type ListActionMethod = 'post' | 'put' | 'patch' | 'delete';

export interface ListActionConfirmationConfiguration {
    title?: string;
    title_key?: string;
    description?: string;
    description_key?: string;
    confirm_label?: string;
    confirm_label_key?: string;
    cancel_label?: string;
    cancel_label_key?: string;
}

export interface ListActionConfiguration {
    key: string;
    label?: string;
    label_key?: string;
    method: ListActionMethod;
    url: string;
    selection_key?: string;
    selection_field?: string;
    min_selection?: number;
    max_selection?: number;
    color?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'success' | 'info';
    confirmation?: ListActionConfirmationConfiguration;
}

export interface ListPayload<T> {
    results: ListPagination<T>;
    filters: Record<string, unknown>;
    config: {
        filters: Record<string, ListFilterConfiguration>;
        actions: ListActionConfiguration[];
        searchable: string[];
        sortable: string[];
    };
    state: ListState;
}

/** A Laravel length-aware paginator, before Miru's extra list configuration. */
export interface LaravelPagination<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    path?: string;
    from?: number | null;
    to?: number | null;
    first_page_url?: string | null;
    last_page_url?: string | null;
    prev_page_url?: string | null;
    next_page_url?: string | null;
    links?: ListPagination<T>['links'];
}

export interface LaravelListPayload<T> {
    results: LaravelPagination<T>;
    filters: Record<string, unknown>;
    config: ListPayload<T>['config'];
    state?: Partial<ListState>;
}

/** Normalize at the host boundary, then pass the regular list and serializer props. */
export interface DataTableAdapter<TSource, TData> {
    normalize: (source: TSource) => ListPayload<TData>;
    serializeQuery?: (
        state: ListState,
        filters: Record<string, unknown>,
    ) => Record<string, unknown>;
}

/** A range stays structured until the host serializes its own query parameters. */
export interface ListFilterRange {
    from?: string | number;
    to?: string | number;
}

/** Lucid pagination is accepted without an Adonis runtime dependency. */
export interface LucidPagination<T> {
    data: T[];
    meta: {
        currentPage: number;
        firstPage?: number;
        lastPage: number;
        perPage: number;
        total: number;
        firstPageUrl?: string | null;
        lastPageUrl?: string | null;
        previousPageUrl?: string | null;
        nextPageUrl?: string | null;
    };
}

export interface LucidListState {
    page?: number;
    perPage?: number;
    orderBy?: string;
    order?: 'asc' | 'desc';
    search?: string | null;
}

export interface LucidListPayload<T> {
    results: LucidPagination<T>;
    filters: Record<string, unknown>;
    config: ListPayload<T>['config'];
    state?: LucidListState;
}

export type DataTableFormat = 'default' | 'lucid';
