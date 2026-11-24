import type {
    DataTableColumnDef,
    DataTableColumnMeta,
    DataTableCountDefinition,
    DataTableStatusDefinition,
    DataTableSortOrderRow,
    DataTableMoveHandler,
    DataTableText,
} from './types';
import type { AccessorFn, RowData } from '@tanstack/vue-table';
import type { Component } from 'vue';
import { IconSortAscendingNumbers } from '@tabler/icons-vue';
import { computed } from 'vue';
import { h, toValue } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Checkbox } from '../checkbox';
import DataTableActionsCell from './DataTableActionsCell.vue';
import DataTableAddressCell from './DataTableAddressCell.vue';
import DataTableBadgeCell from './DataTableBadgeCell.vue';
import DataTableCountCell from './DataTableCountCell.vue';
import DataTableDateTimeCell from './DataTableDateTimeCell.vue';
import DataTableExpandCell from './DataTableExpandCell.vue';
import DataTableMultiCountsCell from './DataTableMultiCountsCell.vue';
import DataTableMultiCountsHeader from './DataTableMultiCountsHeader.vue';
import DataTableSortOrderCell from './DataTableSortOrderCell.vue';
import DataTableStatusCell from './DataTableStatusCell.vue';

interface DataTableValueColumnOptions<TData extends RowData> {
    accessorKey: (string & {}) | keyof TData;
    id?: string;
    label: DataTableText;
    size?: number;
    enableHiding?: boolean;
    align?: 'left' | 'center' | 'right';
    mobileHidden?: boolean;
    mobileSize?: number;
    defaultHidden?: boolean;
}

type DataTableDerivedValueColumnOptions<TData extends RowData> = Omit<
    DataTableValueColumnOptions<TData>,
    'accessorKey'
> & {
    id: string;
    accessorFn: AccessorFn<TData>;
};

export function createSelectionColumn<TData extends RowData>(): DataTableColumnDef<TData> {
    const { trans } = useI18n();
    const selectAll = computed(() => trans('common.datatable.select_all'));
    const selectRow = computed(() => trans('common.datatable.select_row'));

    return {
        id: 'select',
        size: 42,
        enableHiding: false,
        header: ({ table }) =>
            h(Checkbox, {
                modelValue:
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate'),
                'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                    table.toggleAllPageRowsSelected(Boolean(value)),
                'aria-label': selectAll.value,
                disabled: !table.getRowModel().rows.some((row) => row.getCanSelect()),
            }),
        cell: ({ row }) =>
            h(Checkbox, {
                modelValue: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                    row.toggleSelected(Boolean(value)),
                'aria-label': selectRow.value,
            }),
    };
}

export function createExpansionColumn<TData extends RowData>(
    options: { icon?: Component; label?: DataTableText } = {},
): DataTableColumnDef<TData> {
    return {
        id: 'expand',
        size: 42,
        enableHiding: false,
        header: '',
        cell: ({ row }) =>
            h(DataTableExpandCell, {
                row,
                icon: options.icon,
                label: options.label ? toValue(options.label) : undefined,
            }),
        meta: { align: 'center', mobileSize: 42 },
    };
}

export function createActionsColumn<TData extends RowData>(
    options: {
        size?: number;
        mobileSize?: number;
    } = {},
): DataTableColumnDef<TData> {
    return {
        id: 'actions',
        header: '',
        size: options.size ?? 96,
        enableHiding: false,
        meta: {
            component: DataTableActionsCell,
            sticky: 'right',
            align: 'right',
            mobileSize: options.mobileSize ?? 56,
        },
    };
}

export function createDateTimeColumn<TData extends RowData>(
    options: DataTableValueColumnOptions<TData> & {
        display?: 'date' | 'time' | 'date-time';
    },
): DataTableColumnDef<TData> {
    return valueColumn(options, DataTableDateTimeCell, {
        align: options.align ?? 'right',
        dateTimeDisplay: options.display ?? 'date-time',
    });
}

export function createCountColumn<TData extends RowData>(
    options: DataTableValueColumnOptions<TData>,
): DataTableColumnDef<TData> {
    return valueColumn(options, DataTableCountCell, { align: options.align ?? 'center' });
}

export function createBadgeColumn<TData extends RowData>(
    options: DataTableValueColumnOptions<TData> & { translationPrefix?: string },
): DataTableColumnDef<TData> {
    return valueColumn(options, DataTableBadgeCell, {
        translationPrefix: options.translationPrefix,
    });
}

export function createSortOrderColumn<TData extends RowData & DataTableSortOrderRow>(options: {
    labelKey: string;
    moveUrl?: (item: TData) => string;
    /** Overrides the Inertia PATCH endpoint for local data or another transport. */
    moveHandler?: DataTableMoveHandler<TData>;
}): DataTableColumnDef<TData> {
    const { trans } = useI18n();
    return {
        id: 'sort_order',
        accessorKey: 'sort_order',
        size: 120,
        header: () =>
            h(DataTableMultiCountsHeader, {
                counts: [
                    {
                        key: 'sort_order',
                        labelKey: options.labelKey,
                        icon: IconSortAscendingNumbers,
                    },
                ],
            }),
        cell: ({ row }) =>
            h(DataTableSortOrderCell, {
                item: row.original,
                moveUrl: options.moveUrl?.(row.original),
                moveHandler: options.moveHandler
                    ? (direction) => options.moveHandler!(row.original, direction)
                    : undefined,
            }),
        meta: { label: () => trans(options.labelKey), align: 'center', mobileHidden: true },
    };
}

export function createStatusColumn<TData extends RowData>(
    options: (DataTableValueColumnOptions<TData> | DataTableDerivedValueColumnOptions<TData>) & {
        statuses?: Record<string, DataTableStatusDefinition>;
        translationPrefix?: string;
    },
): DataTableColumnDef<TData> {
    return valueColumn(options, DataTableStatusCell, {
        align: options.align ?? 'center',
        statuses: options.statuses,
        translationPrefix: options.translationPrefix,
    });
}

export function createAddressColumn<TData extends RowData>(
    options: DataTableValueColumnOptions<TData>,
): DataTableColumnDef<TData> {
    return valueColumn(options, DataTableAddressCell);
}

export function createMultiCountsColumn<TData extends RowData>(
    options: Omit<DataTableValueColumnOptions<TData>, 'accessorKey' | 'id'> & {
        id: string;
        counts: DataTableCountDefinition[];
    },
): DataTableColumnDef<TData> {
    return {
        id: options.id,
        header: () => h(DataTableMultiCountsHeader, { counts: options.counts }),
        size: options.size,
        meta: {
            component: DataTableMultiCountsCell,
            label: options.label,
            align: options.align ?? 'center',
            mobileHidden: options.mobileHidden,
            mobileSize: options.mobileSize,
            defaultHidden: options.defaultHidden,
            counts: options.counts,
        },
    };
}

function valueColumn<TData extends RowData>(
    options: DataTableValueColumnOptions<TData> | DataTableDerivedValueColumnOptions<TData>,
    component: DataTableColumnMeta['component'],
    meta: Record<string, unknown> = {},
): DataTableColumnDef<TData> {
    return {
        id: options.id ?? ('accessorKey' in options ? String(options.accessorKey) : options.id),
        ...('accessorFn' in options
            ? { accessorFn: options.accessorFn }
            : { accessorKey: options.accessorKey }),
        header: () => toValue(options.label),
        size: options.size,
        enableHiding: options.enableHiding,
        meta: {
            component,
            label: options.label,
            align: options.align,
            mobileHidden: options.mobileHidden,
            mobileSize: options.mobileSize,
            defaultHidden: options.defaultHidden,
            ...meta,
        },
    };
}
