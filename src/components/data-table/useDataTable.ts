import type { DataTableFeatures } from './features';
import type { DataTableColumnDef } from './types';
import type {
    ColumnOrderState,
    ColumnVisibilityState,
    RowData,
    RowSelectionState,
} from '@tanstack/vue-table';
import type { MaybeRef, MaybeRefOrGetter } from 'vue';
import { useTable } from '@tanstack/vue-table';
import { computed, ref, toValue, unref, watch } from 'vue';
import { dataTableFeatures } from './features';
import { dataTableRowId } from './selection';

interface DataTablePreferences {
    columnOrder: ColumnOrderState;
    columnVisibility: ColumnVisibilityState;
}

interface UseDataTableOptions<TData extends RowData> {
    tableKey: MaybeRefOrGetter<string>;
    data: MaybeRefOrGetter<readonly TData[]>;
    columns: MaybeRefOrGetter<DataTableColumnDef<TData>[]>;
    rowKey?: MaybeRef<string | ((item: TData, index: number) => string | number) | undefined>;
    selected?: MaybeRefOrGetter<readonly string[] | undefined>;
    onSelectionChange?: (keys: string[]) => void;
    disabled?: MaybeRefOrGetter<boolean>;
    rowSelectable?: MaybeRef<((row: TData) => boolean) | undefined>;
    rowExpandable?: MaybeRef<((row: TData) => boolean) | undefined>;
}

function columnId<TData extends RowData>(column: DataTableColumnDef<TData>): string {
    return column.id ?? ('accessorKey' in column ? String(column.accessorKey) : '');
}

/** Persist preferences for rendered leaf columns, including grouped/subcolumn definitions. */
function leafColumns<TData extends RowData>(
    columns: readonly DataTableColumnDef<TData>[],
): DataTableColumnDef<TData>[] {
    return columns.flatMap((column) =>
        'columns' in column && column.columns?.length ? leafColumns(column.columns) : [column],
    );
}

function loadPreferences(key: string, defaults: DataTablePreferences): DataTablePreferences {
    if (typeof window === 'undefined') return defaults;

    try {
        const stored = window.localStorage.getItem(`miru:datatable:${key}`);
        if (!stored) return defaults;

        const parsed = JSON.parse(stored) as Partial<DataTablePreferences>;
        return {
            columnOrder: parsed.columnOrder ?? defaults.columnOrder,
            columnVisibility: {
                ...defaults.columnVisibility,
                ...(parsed.columnVisibility ?? {}),
            },
        };
    } catch {
        return defaults;
    }
}

/**
 * Create a Vue Table v9 instance and own its persisted UI state.
 */
export function useDataTable<TData extends RowData>(options: UseDataTableOptions<TData>) {
    const columns = computed(() => toValue(options.columns));
    const data = computed(() => toValue(options.data));
    const defaultPreferences = computed<DataTablePreferences>(() => ({
        columnOrder: leafColumns(columns.value).map(columnId).filter(Boolean),
        columnVisibility: Object.fromEntries(
            leafColumns(columns.value)
                .map((column) => {
                    const id = columnId(column);
                    return id && column.meta?.defaultHidden ? [id, false] : null;
                })
                .filter((entry): entry is [string, boolean] => entry !== null),
        ),
    }));
    const initialPreferences = loadPreferences(toValue(options.tableKey), defaultPreferences.value);
    const columnOrder = ref<ColumnOrderState>(initialPreferences.columnOrder);
    const columnVisibility = ref<ColumnVisibilityState>(initialPreferences.columnVisibility);
    const internalSelection = ref<RowSelectionState>({});
    const rowSelection = computed<RowSelectionState>(() => {
        const selected = toValue(options.selected);
        return selected === undefined
            ? internalSelection.value
            : Object.fromEntries(selected.map((key) => [key, true]));
    });
    function updateSelection(next: RowSelectionState): void {
        internalSelection.value = next;
        options.onSelectionChange?.(Object.keys(next).filter((key) => next[key]));
    }
    const state = computed(() => ({
        columnOrder: columnOrder.value,
        columnVisibility: columnVisibility.value,
        rowSelection: rowSelection.value,
    }));

    const table = useTable<DataTableFeatures, TData>({
        features: dataTableFeatures,
        columns,
        data,
        state,
        getRowId: (item, index) => dataTableRowId(item, index, unref(options.rowKey)),
        enableRowSelection: (row) =>
            !toValue(options.disabled) && (unref(options.rowSelectable)?.(row.original) ?? true),
        getRowCanExpand: (row) =>
            unref(options.rowExpandable)?.(row.original) ?? row.subRows.length > 0,
        onColumnOrderChange: (updater) => {
            columnOrder.value =
                typeof updater === 'function' ? updater(columnOrder.value) : updater;
        },
        onColumnVisibilityChange: (updater) => {
            columnVisibility.value =
                typeof updater === 'function' ? updater(columnVisibility.value) : updater;
        },
        onRowSelectionChange: (updater) => {
            if (toValue(options.disabled)) return;
            updateSelection(typeof updater === 'function' ? updater(rowSelection.value) : updater);
        },
    });

    const selectedRows = computed(() =>
        table.getSelectedRowModel().rows.map((row) => row.original),
    );

    watch(
        [columnOrder, columnVisibility],
        () => {
            if (typeof window === 'undefined') return;
            window.localStorage.setItem(
                `miru:datatable:${toValue(options.tableKey)}`,
                JSON.stringify({
                    columnOrder: columnOrder.value,
                    columnVisibility: columnVisibility.value,
                }),
            );
        },
        { deep: true },
    );

    function clearSelection(): void {
        updateSelection({});
    }

    function resetPreferences(): void {
        columnOrder.value = [...defaultPreferences.value.columnOrder];
        columnVisibility.value = { ...defaultPreferences.value.columnVisibility };
    }

    return {
        clearSelection,
        resetPreferences,
        selectedRows,
        table,
    };
}
