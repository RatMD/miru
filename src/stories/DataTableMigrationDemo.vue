<template>
    <UiProvider locale="en-GB">
        <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
                <Button @click="disabled = !disabled">Toggle disabled</Button>
                <Button @click="loading = !loading">Toggle loading</Button>
                <Button @click="empty = !empty">Toggle empty</Button>
                <Button @click="reversed = !reversed">Reverse rows</Button>
                <Button @click="selected = []">Clear selection</Button>
            </div>
            <p data-testid="migration-selection">{{ selected.join(',') || 'none' }}</p>
            <p data-testid="migration-visits">{{ visits }}</p>
            <p data-testid="migration-actions">{{ executions }}</p>
            <pre data-testid="migration-filters">{{ JSON.stringify(filters) }}</pre>
            <DataTable
                table-key="lucid-migration-demo"
                data-format="lucid"
                :list="list"
                :columns="columns"
                :actions="actions"
                v-model:selected="selected"
                :disabled="disabled"
                :loading="loading"
                :row-loading="(row: Item) => row.id === 'beta'"
                :query-handler="navigate">
                <template #loading>Fetching records</template>
                <template #empty>No records for this query</template>
            </DataTable>
        </div>
    </UiProvider>
</template>
<script setup lang="ts">
import type {
    ListState,
    LucidListPayload,
    DataTableRowAction,
    DataTableColumnDef,
} from '../components/data-table';
import { IconExternalLink } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { Button } from '../components/button';
import { DataTable, createSelectionColumn, createActionsColumn } from '../components/data-table';
import { UiProvider } from '../components/provider';
interface Item {
    id: string;
    name: string;
}
const disabled = ref(false),
    loading = ref(false),
    empty = ref(false),
    reversed = ref(false);
const selected = ref<string[]>([]);
const visits = ref(0),
    executions = ref(0);
const filters = ref<Record<string, unknown>>({});
const state = ref<ListState>({
    page: 1,
    per_page: 10,
    order_by: 'name',
    order: 'ASC',
    search: null,
});
const items: Item[] = [
    { id: 'alpha', name: 'Alpha' },
    { id: 'beta', name: 'Beta' },
];
const list = computed<LucidListPayload<Item>>(() => ({
    results: {
        data: empty.value ? [] : reversed.value ? [...items].reverse() : items,
        meta: { currentPage: 1, lastPage: 1, perPage: 10, total: empty.value ? 0 : 2 },
    },
    filters: filters.value,
    state: {
        page: state.value.page,
        perPage: state.value.per_page,
        orderBy: state.value.order_by,
        order: state.value.order === 'DESC' ? 'desc' : 'asc',
        search: state.value.search,
    },
    config: {
        searchable: ['name'],
        sortable: ['name'],
        actions: [],
        filters: {
            status: {
                type: 'multiselect',
                label: 'Status',
                searchable: true,
                options: [
                    { value: 'active', label: 'Active' },
                    { value: 'archived', label: 'Archived' },
                    { value: 'blocked', label: 'Blocked', disabled: true },
                ],
            },
            created: { type: 'date-range', label: 'Created', options: [] },
            size: { type: 'number-range', label: 'Size', min: 0, options: [] },
        },
    },
}));
const columns: DataTableColumnDef<Item>[] = [
    createSelectionColumn<Item>(),
    { accessorKey: 'name', header: 'Name' },
    createActionsColumn<Item>(),
];
const actions: DataTableRowAction<Item>[] = [
    {
        key: 'open',
        label: 'Open item',
        icon: IconExternalLink,
        execute: () => {
            executions.value++;
        },
    },
];
function navigate(next: ListState, values: Record<string, unknown>): void {
    visits.value++;
    state.value = next;
    filters.value = values;
}
</script>
