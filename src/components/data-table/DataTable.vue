<template>
    <div
        data-slot="data-table"
        class="miru-data-table w-full"
        :aria-busy="loading || bulkActionPending || undefined"
        :class="variant === 'compact' ? 'compact-data-table' : 'space-y-4'">
        <p v-if="loading" role="status" class="sr-only">
            {{ loadingText || trans('common.states.loading') }}
        </p>
        <DataTableToolbar
            v-if="showToolbar"
            :table="table"
            :list="list"
            :selected-count="selectedRows.length"
            :disabled="blocked"
            :variant="variant"
            :sticky-offset="toolbarOffset"
            :show-column-toggle="showColumnToggle"
            :searchable="searchable"
            @reset="resetPreferences"
            @visit="visitFilters"
            @page="visitPage"
            @apply-action="selectBulkAction">
            <template #actions><slot name="toolbar-actions" /></template>
        </DataTableToolbar>

        <Alert v-if="bulkActionFailed" variant="danger">
            <AlertDescription>{{ trans('common.datatable.action_failed') }}</AlertDescription>
        </Alert>

        <DataTablePagination
            v-if="
                variant !== 'compact' &&
                (paginationPosition === 'top' || paginationPosition === 'both')
            "
            :pagination="list.results"
            :disabled="blocked"
            @page="visitPage"
            @per-page="visitPerPage" />

        <slot
            name="content"
            :rows="table.getRowModel().rows"
            :table="table"
            :toggle-sort="toggleSort"
            :disabled="blocked"
            :loading="loading">
            <div
                class="bg-background"
                :inert="blocked || undefined"
                :class="
                    embedded
                        ? ''
                        : [
                              'overflow-x-auto border-border',
                              variant === 'compact' ? 'border-b' : 'rounded-md border',
                          ]
                ">
                <table class="w-full caption-bottom text-sm">
                    <thead class="border-b bg-muted/40">
                        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                            <th
                                v-for="header in headerGroup.headers"
                                :key="header.id"
                                :colspan="header.colSpan"
                                class="text-left align-middle font-medium text-muted-foreground"
                                :class="[
                                    variant === 'compact' ? 'h-9 px-5 sm:px-6' : 'h-11 px-3',
                                    ...columnClass(header.column),
                                ]"
                                :style="
                                    header.subHeaders.length
                                        ? undefined
                                        : columnStyle(header.column)
                                ">
                                <button
                                    v-if="!header.isPlaceholder && isSortable(header.column.id)"
                                    type="button"
                                    class="inline-flex w-full cursor-pointer items-center gap-1.5 transition-colors hover:text-foreground"
                                    :class="alignmentClass(header.column)"
                                    :disabled="blocked"
                                    @click="toggleSort(header.column.id)">
                                    <FlexRender :header="header" />
                                    <IconArrowUp
                                        v-if="isSorted(header.column.id, 'ASC')"
                                        class="size-3.5 shrink-0" />
                                    <IconArrowDown
                                        v-else-if="isSorted(header.column.id, 'DESC')"
                                        class="size-3.5 shrink-0" />
                                    <IconArrowsSort v-else class="size-3.5 shrink-0 opacity-50" />
                                </button>
                                <div
                                    v-else-if="!header.isPlaceholder"
                                    class="flex"
                                    :class="alignmentClass(header.column)">
                                    <FlexRender :header="header" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <slot name="leading-rows" />
                        <tr v-if="loading">
                            <td
                                :colspan="Math.max(1, table.getVisibleLeafColumns().length)"
                                class="h-28 text-center text-muted-foreground">
                                <slot name="loading" :table="table">
                                    {{ loadingText || trans('common.states.loading') }}
                                </slot>
                            </td>
                        </tr>
                        <template v-else-if="table.getRowModel().rows.length">
                            <template v-for="row in table.getRowModel().rows" :key="row.id">
                                <slot
                                    name="before-row"
                                    :item="row.original"
                                    :row="row"
                                    :colspan="table.getVisibleLeafColumns().length" />
                                <tr
                                    class="border-b transition-colors hover:bg-muted/40 data-[selected=true]:bg-muted"
                                    :class="
                                        getRowAction(row.original)
                                            ? 'cursor-pointer focus-visible:outline-2 focus-visible:outline-ring'
                                            : ''
                                    "
                                    :data-selected="row.getIsSelected() || undefined"
                                    :data-loading="rowLoading?.(row.original) || undefined"
                                    :aria-busy="rowLoading?.(row.original) || undefined"
                                    :aria-disabled="rowUnavailable(row.original) || undefined"
                                    :inert="rowUnavailable(row.original) || undefined"
                                    :tabindex="getRowAction(row.original) ? 0 : undefined"
                                    :aria-label="rowActionLabel(row.original)"
                                    @click="activateRow($event, row.original)"
                                    @keydown="activateRow($event, row.original)">
                                    <td
                                        v-for="cell in row.getVisibleCells()"
                                        :key="cell.id"
                                        class="align-middle"
                                        :class="[
                                            variant === 'compact' ? 'px-5 py-2.5 sm:px-6' : 'p-3',
                                            ...columnClass(cell.column),
                                        ]"
                                        :style="columnStyle(cell.column)">
                                        <slot
                                            :name="`cell-${cell.column.id}`"
                                            :item="row.original"
                                            :cell="cell"
                                            :disabled="blocked || rowUnavailable(row.original)"
                                            :loading="rowLoading?.(row.original) ?? false">
                                            <DataTableCellRenderer
                                                :cell="cell"
                                                :actions="actions" />
                                        </slot>
                                    </td>
                                </tr>
                                <tr
                                    v-if="row.getIsExpanded() && $slots['expanded-row']"
                                    class="border-b">
                                    <td :colspan="table.getVisibleLeafColumns().length" class="p-0">
                                        <slot name="expanded-row" :item="row.original" :row="row" />
                                    </td>
                                </tr>
                                <slot
                                    name="after-row"
                                    :item="row.original"
                                    :row="row"
                                    :colspan="table.getVisibleLeafColumns().length" />
                            </template>
                        </template>
                        <tr v-else-if="!hasLeadingRows">
                            <td
                                :colspan="table.getVisibleLeafColumns().length"
                                class="h-28 text-center text-muted-foreground">
                                <slot name="empty" :table="table">
                                    {{ emptyText || trans('common.states.empty') }}
                                </slot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </slot>

        <DataTablePagination
            v-if="
                variant !== 'compact' &&
                (paginationPosition === 'bottom' || paginationPosition === 'both')
            "
            :pagination="list.results"
            :disabled="blocked"
            @page="visitPage"
            @per-page="visitPerPage" />

        <DataTableConfirmation
            v-if="selectedBulkAction?.confirmation"
            v-model:open="bulkConfirmationOpen"
            :title="
                actionText(
                    selectedBulkAction.confirmation.title,
                    selectedBulkAction.confirmation.title_key,
                )
            "
            :description="confirmationDescription(selectedBulkAction)"
            :trigger-label="trans('common.actions.apply')"
            :confirm-label="
                actionText(
                    selectedBulkAction.confirmation.confirm_label,
                    selectedBulkAction.confirmation.confirm_label_key,
                )
            "
            :cancel-label="
                actionText(
                    selectedBulkAction.confirmation.cancel_label,
                    selectedBulkAction.confirmation.cancel_label_key,
                )
            "
            @confirm="executeBulkAction" />
    </div>
</template>

<script setup lang="ts" generic="TData extends RowData">
import type { ListActionConfiguration } from './contracts';
import type { DataTableColumn, DataTableColumnMeta, DataTableProps } from './types';
import type { RowData } from '@tanstack/vue-table';
import { router } from '@inertiajs/vue3';
import { IconArrowDown, IconArrowsSort, IconArrowUp } from '@tabler/icons-vue';
import { FlexRender } from '@tanstack/vue-table';
import { computed, provide, ref, toValue } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Alert, AlertDescription } from '../alert';
import { normalizeDataTableList } from './adapters';
import { dataTableListKey, dataTableInteractionKey } from './context';
import DataTableCellRenderer from './DataTableCellRenderer.vue';
import DataTableConfirmation from './DataTableConfirmation.vue';
import DataTablePagination from './DataTablePagination.vue';
import DataTableToolbar from './DataTableToolbar.vue';
import { useDataTable } from './useDataTable';
import { useDataTableQuery } from './useDataTableQuery';
const { trans, transChoice, locale } = useI18n();

const props = withDefaults(defineProps<DataTableProps<TData>>(), {
    actions: () => [],
    disabled: false,
    loading: false,
    dataFormat: 'default',
    searchable: true,
    hasLeadingRows: false,
    showToolbar: true,
    showColumnToggle: true,
    paginationPosition: 'bottom',
    variant: 'default',
    embedded: false,
    toolbarOffset: '0px',
});

const list = computed(() => normalizeDataTableList(props.list, props.dataFormat));
const selected = defineModel<string[]>('selected');
provide(dataTableListKey, list);

const bulkActionPending = ref(false),
    bulkActionFailed = ref(false);
const emit = defineEmits<{ 'bulk-action-error': [error: unknown] }>();
const blocked = computed(() => props.disabled || props.loading || bulkActionPending.value);
function rowUnavailable(item: TData): boolean {
    return Boolean(props.rowDisabled?.(item) || props.rowLoading?.(item));
}
provide(dataTableInteractionKey, {
    disabled: blocked,
    rowDisabled: (item) => rowUnavailable(item as TData),
});
const selectedBulkAction = ref<ListActionConfiguration>();
const bulkConfirmationOpen = ref(false);

/** Reuse the menu's visibility and availability rules without bypassing confirmation dialogs. */
function getRowAction(item: TData) {
    if (blocked.value || rowUnavailable(item) || !props.rowAction) return undefined;
    const keys = Array.isArray(props.rowAction) ? props.rowAction : [props.rowAction];
    for (const key of keys) {
        const action = props.actions.find((candidate) => candidate.key === key);
        if (
            action &&
            !action.confirmation &&
            action.visible?.(item) !== false &&
            !action.disabled?.(item)
        ) {
            return action;
        }
    }
    return undefined;
}

function rowActionLabel(item: TData): string | undefined {
    const action = getRowAction(item);
    return action ? toValue(action.label) : undefined;
}

/** Leave embedded controls, text selection, and keyboard events on child elements alone. */
function activateRow(event: MouseEvent | KeyboardEvent, item: TData): void {
    if (event.defaultPrevented) return;
    const action = getRowAction(item);
    if (!action || blocked.value || rowUnavailable(item)) return;
    if (event instanceof KeyboardEvent) {
        if (event.target !== event.currentTarget || !['Enter', ' '].includes(event.key)) return;
        event.preventDefault();
    } else {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
            return;
        const target = event.target instanceof Element ? event.target : null;
        if (
            target?.closest(
                'a, button, input, select, textarea, label, summary, [role="button"], [role="link"], [role="checkbox"], [role="menuitem"], [contenteditable]:not([contenteditable="false"]), [data-row-click-ignore]',
            )
        )
            return;
        const selection = window.getSelection();
        if (
            selection?.toString() &&
            event.currentTarget instanceof Node &&
            selection.anchorNode &&
            event.currentTarget.contains(selection.anchorNode)
        )
            return;
    }
    action.execute(item);
}

const { clearSelection, resetPreferences, selectedRows, table } = useDataTable({
    tableKey: computed(() => props.tableKey),
    data: computed(() => list.value.results.data),
    rowKey: computed(() => props.rowKey),
    selected: computed(() => selected.value),
    onSelectionChange: (keys) => {
        selected.value = keys;
    },
    disabled: blocked,
    columns: computed(() => props.columns),
    rowSelectable: computed(
        () => (item: TData) => !rowUnavailable(item) && (props.rowSelectable?.(item) ?? true),
    ),
    rowExpandable: computed(() => props.rowExpandable),
});
const { toggleSort, visitFilters, visitPage, visitPerPage } = useDataTableQuery({
    list,
    disabled: blocked,
    dataFormat: computed(() => props.dataFormat),
    queryProps: computed(() => props.queryProps),
    querySerializer: computed(() => props.querySerializer),
    additionalQuery: computed(() => props.additionalQuery),
    onNavigate: clearSelection,
    queryHandler: computed(() => props.queryHandler),
});

function meta(column: DataTableColumn<TData>): DataTableColumnMeta {
    return column.columnDef.meta ?? {};
}

function columnClass(column: DataTableColumn<TData>): string[] {
    const value = meta(column);
    return [
        'dt-column',
        value.align === 'center' ? 'text-center' : '',
        value.align === 'right' ? 'text-right' : '',
        value.mobileHidden ? 'hidden md:table-cell' : '',
        value.sticky ? 'sticky z-20 bg-background' : '',
        value.sticky === 'left' ? 'left-0' : '',
        value.sticky === 'right' ? 'right-0 border-l' : '',
    ];
}

function columnStyle(column: DataTableColumn<TData>): Record<string, string | undefined> {
    const columnMeta = meta(column);
    const size = column.getSize();
    const minSize = column.columnDef.minSize;
    const maxSize = column.columnDef.maxSize;
    const mobileSize = columnMeta.mobileSize;

    if (('size' in column.columnDef ? column.columnDef.size : size) === 0) {
        return { '--dt-column-width': 'auto' };
    }

    return {
        '--dt-column-width': size ? `${size}px` : undefined,
        '--dt-column-min-width': minSize ? `${minSize}px` : size ? `${size}px` : undefined,
        '--dt-column-max-width': maxSize ? `${maxSize}px` : size ? `${size}px` : undefined,
        '--dt-column-mobile-width': mobileSize ? `${mobileSize}px` : undefined,
    };
}

function alignmentClass(column: DataTableColumn<TData>): string {
    return meta(column).align === 'center'
        ? 'justify-center'
        : meta(column).align === 'right'
          ? 'justify-end'
          : 'justify-start';
}

function isSortable(id: string): boolean {
    return list.value.config.sortable.includes(id);
}

function isSorted(id: string, order: 'ASC' | 'DESC'): boolean {
    return list.value.state.order_by === id && list.value.state.order === order;
}

function selectBulkAction(action: ListActionConfiguration): void {
    if (blocked.value) return;
    selectedBulkAction.value = action;
    if (action.confirmation) {
        bulkConfirmationOpen.value = true;
        return;
    }
    void executeBulkAction();
}

async function executeBulkAction(): Promise<void> {
    const action = selectedBulkAction.value;
    if (!action || blocked.value) return;

    const selectionField = action.selection_field ?? 'id';
    const selection = selectedRows.value
        .filter((item) => !rowUnavailable(item) && (props.rowSelectable?.(item) ?? true))
        .map((row) => (row as Record<string, unknown>)[selectionField])
        .filter(
            (value): value is string | number =>
                typeof value === 'string' || typeof value === 'number',
        );

    // Eligibility can change while a confirmation is open or a row starts loading.
    if (
        selection.length < Math.max(1, action.min_selection ?? 1) ||
        (action.max_selection !== undefined && selection.length > action.max_selection)
    )
        return;
    bulkActionFailed.value = false;
    if (props.bulkActionHandler) {
        bulkActionPending.value = true;
        try {
            await props.bulkActionHandler(action, selection);
            clearSelection();
            selectedBulkAction.value = undefined;
        } catch (error) {
            bulkActionFailed.value = true;
            emit('bulk-action-error', error);
        } finally {
            bulkActionPending.value = false;
        }
        return;
    }
    bulkActionPending.value = true;
    router.visit(action.url, {
        method: action.method,
        data: {
            action: action.key,
            [action.selection_key ?? 'ids']: selection,
        },
        preserveScroll: true,
        onError: (error) => {
            bulkActionFailed.value = true;
            emit('bulk-action-error', error);
        },
        onFinish: () => {
            bulkActionPending.value = false;
        },
        onSuccess: () => {
            clearSelection();
            selectedBulkAction.value = undefined;
        },
    });
}

function actionText(value?: string, translationKey?: string): string {
    return translationKey ? trans(translationKey) : (value ?? '');
}

function confirmationDescription(action: ListActionConfiguration): string {
    const confirmation = action.confirmation;
    if (!confirmation) return '';

    return confirmation.description_key
        ? transChoice(confirmation.description_key, selectedRows.value.length, {
              count: selectedRows.value.length.toString(),
          })
        : (confirmation.description ?? '');
}
</script>

<style scoped>
.dt-column {
    width: var(--dt-column-mobile-width, var(--dt-column-width));
    min-width: var(--dt-column-mobile-width, var(--dt-column-min-width));
    max-width: var(--dt-column-mobile-width, var(--dt-column-max-width));
}

@media (min-width: 768px) {
    .dt-column {
        width: var(--dt-column-width, auto);
        min-width: var(--dt-column-min-width, auto);
        max-width: var(--dt-column-max-width, auto);
    }
}
</style>
