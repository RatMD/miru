import type {
    DataTableFormat,
    LucidListPayload,
    ListPayload,
    ListActionConfiguration,
    ListState,
} from './contracts';
import type { DataTableFeatures } from './features';
import type { Cell, CellData, Column, ColumnDef, Row, RowData, Table } from '@tanstack/vue-table';
import type { Component, MaybeRefOrGetter } from 'vue';

export type DataTableText = MaybeRefOrGetter<string>;
export type DataTableRowData = RowData;

export type DataTableActionColor =
    'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'success' | 'info';
export type DataTableActionPriority = 'primary' | 'secondary' | 'accent';

export interface DataTableConfirmation<TData extends RowData> {
    title: DataTableText;
    description: (rows: TData[]) => string;
    confirmLabel: DataTableText;
    cancelLabel: DataTableText;
    option?: {
        label: DataTableText;
        execute: (rows: TData[]) => void;
    };
}

export interface DataTableRowAction<TData extends RowData> {
    key: string;
    label: DataTableText;
    icon?: Component;
    color?: DataTableActionColor;
    priority?: DataTableActionPriority;
    disabled?: (row: TData) => boolean;
    visible?: (row: TData) => boolean;
    confirmation?: DataTableConfirmation<TData>;
    execute: (row: TData) => void;
}

export interface DataTableCountDefinition {
    key: string;
    labelKey: string;
    icon?: Component;
}

export type DataTableMoveDirection = 'up' | 'down';
export type DataTableMoveHandler<TData extends DataTableSortOrderRow> = (
    item: TData,
    direction: DataTableMoveDirection,
) => void | Promise<void>;

export interface DataTableSortOrderRow {
    can_reorder: boolean;
    id: string;
    sort_order: number;
    can_move_up: boolean;
    can_move_down: boolean;
}

export interface DataTableAddressLike {
    company_name?: string | null;
    recipient_name?: string | null;
    street?: string | null;
    house_number?: string | null;
    address_addition?: string | null;
    postal_code?: string | null;
    city?: string | null;
    state?: string | { name?: string | null } | null;
    country?: string | { name?: string | null } | null;
}

export interface DataTableStatusDefinition {
    label?: DataTableText;
    labelKey?: string;
    containerClass?: string;
    colorClass?: string;
    icon?: Component;
}

export interface DataTableColumnMeta {
    component?: Component;
    label?: DataTableText;
    align?: 'left' | 'center' | 'right';
    sticky?: 'left' | 'right';
    mobileHidden?: boolean;
    defaultHidden?: boolean;
    mobileSize?: number;
    translationPrefix?: string;
    currencyKey?: string;
    dateTimeDisplay?: 'date' | 'time' | 'date-time';
    counts?: DataTableCountDefinition[];
    statuses?: Record<string, DataTableStatusDefinition>;
}

export type DataTableColumnDef<
    TData extends RowData,
    TValue extends CellData = CellData,
> = ColumnDef<DataTableFeatures, TData, TValue>;

export type DataTableInstance<TData extends RowData> = Table<DataTableFeatures, TData>;

export type DataTableColumn<TData extends RowData, TValue extends CellData = CellData> = Column<
    DataTableFeatures,
    TData,
    TValue
>;

export type DataTableCell<TData extends RowData, TValue extends CellData = CellData> = Cell<
    DataTableFeatures,
    TData,
    TValue
>;

export type DataTableRow<TData extends RowData> = Row<DataTableFeatures, TData>;

export interface DataTableProps<TData extends RowData> {
    tableKey: string;
    list: ListPayload<TData> | LucidListPayload<TData>;
    /** Existing MIRU lists remain the default; Lucid metadata is normalized internally. */
    dataFormat?: DataTableFormat;
    rowKey?: string | ((item: TData, index: number) => string | number);
    rowDisabled?: (row: TData) => boolean;
    rowLoading?: (row: TData) => boolean;
    loading?: boolean;
    loadingText?: string;
    emptyText?: string;
    /** Hide search for endpoints that only support configured filters. */
    searchable?: boolean;
    columns: DataTableColumnDef<TData>[];
    actions?: DataTableRowAction<TData>[];
    /** Action key(s) to execute on row activation, in priority order; confirmation actions are excluded. */
    rowAction?: string | string[];
    rowSelectable?: (row: TData) => boolean;
    rowExpandable?: (row: TData) => boolean;
    disabled?: boolean;
    hasLeadingRows?: boolean;
    showToolbar?: boolean;
    showColumnToggle?: boolean;
    paginationPosition?: 'top' | 'bottom' | 'both' | 'none';
    variant?: 'default' | 'compact';
    /** Render flush inside an existing surface whose container owns scrolling. */
    embedded?: boolean;
    toolbarOffset?: string;
    additionalQuery?: Record<string, unknown>;
    /** Override query serialization while retaining Inertia navigation. */
    querySerializer?: (
        state: ListState,
        filters: Record<string, unknown>,
    ) => Record<string, unknown>;
    /** Partial-reload props; defaults to ['list'] for MIRU and a full response for Lucid. */
    queryProps?: string[];
    /** Override server bulk-action submission; selection contains values of selection_field (id by default). */
    bulkActionHandler?: (
        action: ListActionConfiguration,
        selection: (string | number)[],
    ) => void | Promise<void>;
    queryHandler?: (state: ListPayload<TData>['state'], filters: Record<string, unknown>) => void;
}
