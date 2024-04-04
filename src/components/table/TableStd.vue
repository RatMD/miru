<template>
    <div class="data-table-header">
        <div class="data-actions">
            <div class="action-handle">
                <form v-if="props.searchable">
                    <InputField id="search-input" size="sm" placeholder="Search..." v-model.lazy="($parent as any).query.search" />
                </form>
            </div>

            <div class="action-pagination" v-if="$slots.pagination">
                <slot name="pagination" />
            </div>
        </div>
    </div>

    <div class="data-table-container">
        <div class="data-table" :style="props.minWidth ? { 'min-width': `${props.minWidth}${typeof props.minWidth == 'number' ? 'px' : ''}` } : {}">
            <div class="data-table-section section-head">
                <div class="data-cell head-cell cell-checkbox" width="1%" v-if="props.selectable">
                    <CheckboxField id="item-all"
                        :model-value="selected && props.items && props.items.length > 0 && Object.values(selected).indexOf(false) < 0" 
                        :disabled="!selected || props.loading || (props.items && props.items.length <= 0)"
                        @change="onToggleAll" />
                </div>

                <div v-for="(column, cdx) of columns" :key="cdx"
                    :class="[
                        'data-cell head-cell',
                        `cell-align-${(column.props as any).align || 'left'}`,
                        `cell-valign-${(column.props as any).valign || 'auto'}`,
                        (column.props as any)?.column ? `cell-${(column.props as any).column}` : ``,
                        (column.props as any)?.sortable ? `cell-sortable` : ``,
                    ]"
                    :style="`
                        --data-column-basis: ${formatColumnWidth((column.props as any)?.width)};
                        --data-column-resize: ${((column.props as any)?.width || false) ? '0' : '1'};
                    `">
                    <component :is="column" type="header" />
                </div>
            </div>

            <div class="data-table-section section-loading" v-if="loading">
                <slot name="loading">
                    <div class="loading-cell">
                        <LoadingSpinner />
                    </div>
                </slot>
            </div>

            <div class="data-table-section section-empty" v-else="(props.items || []).length == 0">
                <slot name="empty">
                    <div class="empty-cell">
                        No entries available.
                    </div>
                </slot>
            </div>

            <div class="data-table-section section-body" v-else="(props.items || []).length == 0">
                <div class="body-row" v-for="(item, idx) of props.items" :key="idx" 
                    :class="[
                        selected && selected[(item as any).id || idx] ? 'row-selected' : ''
                    ]"
                >
                    <div class="data-cell body-cell cell-checkbox" width="1%" v-if="props.selectable">
                        <CheckboxField id="item-all"
                            :model-value="selected && props.items && props.items.length > 0 && Object.values(selected).indexOf(false) < 0" 
                            :disabled="!selected || props.loading || (props.items && props.items.length <= 0)"
                            @change="onToggleAll" />
                    </div>

                    <div v-for="(column, cdx) of columns" :key="cdx"
                        :class="[
                            'data-cell body-cell',
                            `cell-${(idx+1) % 2 == 0 ? 'even' : 'odd'}`,
                            `cell-idx-${(idx+1)}`,
                            `cell-align-${(column.props as any).align || 'left'}`,
                            `cell-valign-${(column.props as any).valign || 'auto'}`,
                            (column.props as any)?.column ? `cell-${(column.props as any).column}` : ``,
                        ]"
                        :style="`
                            --data-column-basis: ${formatColumnWidth((column.props as any)?.width)};
                            --data-column-resize: ${((column.props as any)?.width || false) ? '0' : '1'};
                        `">
                        <component :is="column" type="content" :item="item" :index="idx == 0 ? idx.toString() : idx" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { PseudoComponent } from '../../types';

export type PseudoTableColumn<T> = PseudoComponent<typeof TableColumn<T>>;

/**
 * TableStd Props
 */
export interface TableStdProps<T> {
    /**
     * The desired items / entries to be visualized within the table.
     */
    items?: T[];

    /**
     * Loading state of the items result.
     */
    loading?: boolean;

    /**
     * The minimum width of the table, adds a scrollbar on smaller breakpoints.
     */
    minWidth?: number | string;

    /**
     * Whether to provide a search field or not.
     */
    searchable?: boolean;

    /**
     * Whether to provide a checkbox field for each row or not.
     */
    selectable?: boolean;
}

/**
 * TableStd Slots
 */
export interface TableStdSlots<T> {
    /**
     * The default content slot, supports TableColumn types only.
     */
    default(): InstanceType<PseudoTableColumn<T>>[];

    /**
     * Additional slot for adding a custom pagination component on the top right above the table.
     */
    pagination(): any;

    /**
     * Additional slot for providing custom loading state content.
     */
    loading(): any;

    /**
     * Additional slot for providing custom empty state content.
     */
    empty(): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'TableStd'
}
</script>

<script lang="ts" generic="T" setup>
import { ref, watch } from 'vue';

import TableColumn from './TableColumn.vue';
import CheckboxField from '../control/CheckboxField.vue';
import InputField from '../control/InputField.vue';
import LoadingSpinner from '../loading/LoadingSpinner.vue';


// Define Component
const props = defineProps<TableStdProps<T>>();
const slots = defineSlots<TableStdSlots<T>>();

// States
const columns = ref<InstanceType<PseudoTableColumn<T>>[]>([]);
const selected = ref<{ [key: string | number] : boolean } | null>(null); 

/**
 * Watch Slot Changes
 */
watch(slots.default, newValue => {
    columns.value = newValue;
}, { immediate: true });

/**
 * Watch Item Changes
 */
watch(() => props.items, newValue => {
    if (newValue) {
        selected.value = Object.fromEntries([...newValue].map((item: any, idx: number) => {
            return [item.id || idx, false]
        }));
    } else {
        selected.value = null;
    }
}, { immediate: true });

/**
 * Format column width value.
 * @param width 
 * @returns
 */
function formatColumnWidth(width?: string | number | null): string {
    if (typeof width == 'undefined' || width === null || (typeof width == 'string' && width.trim().length == 0)) {
        return '0%';
    }
    
    if (typeof width == 'number' || /^[0-9.]+$/.test(width)) {
        return `${width}px`;
    } else {
        return width;
    }
}

/**
 * Change all selection
 */
function onToggleAll() {
    if (!selected.value) {
        return;
    }
    
    const keys = Object.keys(selected.value);
    if (Object.values(selected.value).indexOf(false) < 0) {
        keys.forEach(key => (selected.value as any)[key] = false);
    } else {
        keys.forEach(key => (selected.value as any)[key] = true);
    }
}
</script>

<style scoped>
.data-table-container {
    @apply overflow-y-hidden overflow-x-auto;
    @apply bg-white dark:bg-zinc-800;
}

/** Header Stylings */
.data-table-header {
    &.data-actions {
        @apply flex flex-row items-center justify-between px-1 mb-4;

        & .action-handle {
            
        }

        & .action-pagination {

        }
    }
}

/** Table Stylings */
.data-table {
    @apply w-full flex flex-col;

    & .data-cell {
        flex: 1 var(--data-column-resize, 1) var(--data-column-basis, 0%);
        min-width: var(--data-column-basis, 0%);
    }

    & .cell-align-left {
        @apply justify-start text-left;
    }
    
    & .cell-align-right {
        @apply justify-end text-right;
    }
    
    & .cell-align-center {
        @apply justify-center text-center;
    }
    
    & .cell-align-justify {
        @apply justify-start text-justify;
    }

    & .cell-valign-top {
        @apply items-start self-start;
        vertical-align: top;
    }
    
    & .cell-valign-middle {
        @apply items-center self-center;
        vertical-align: middle;
    }
    
    & .cell-valign-bottom {
        @apply items-end self-end;
        vertical-align: bottom;
    }
}

/** Checkbox Stylings */
&.data-table .cell-checkbox {
    @apply px-4;

    & .field-checkbox {
        margin-top: 6px;
    }
}

/** Header Section */
.data-table-section.section-head {
    @apply w-full flex flex-row;
    
    & .head-cell {
        @apply font-semibold text-sm px-2 pt-3 pb-1.5;
        @apply text-zinc-500;
    }
}

/** Body Stylings */
.data-table-section.section-body {
    @apply w-full flex flex-col;
    
    & .body-row {
        @apply w-full flex flex-row;
        @apply border-t border-solid;
        @apply duration-300 ease-in-out transition-colors;
        @apply border-zinc-200 dark:border-zinc-700;

        &:last-child {
            @apply border-y;
        }
        
        &:hover {
            @apply bg-indigo-50 border-indigo-200 dark:bg-indigo-900/25 dark:border-indigo-800;

            & + .body-row {
                @apply border-t-indigo-200 dark:border-t-indigo-800;
            }
        }

        &.row-selected {
            @apply bg-indigo-50 border-indigo-300 dark:bg-indigo-900/25 dark:border-indigo-700;

            & + .body-row {
                @apply border-t-indigo-300 dark:border-t-indigo-700;
            }
        }
    }

    & .body-cell {
        @apply px-2 py-1.5;
    }
}
</style>
