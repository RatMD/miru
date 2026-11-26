<template>
    <div class="grid gap-4">
        <DataTable
            :table-key="'backend-' + backend"
            :list="list"
            :columns="columns"
            :query-handler="query" />
        <p class="text-sm text-muted-foreground">
            Local adapter demo. Search, sort or change pages; no backend request is sent.
        </p>
        <pre
            class="overflow-auto rounded-lg bg-muted p-4 text-xs"
            aria-label="Serialized backend query"
            >{{ JSON.stringify(lastQuery, null, 2) }}</pre>
    </div>
</template>

<script setup lang="ts">
import type {
    DataTableAdapter,
    DataTableColumnDef,
    ListPayload,
    ListState,
} from '../components/data-table';
import { computed, ref } from 'vue';
import { adaptLucidList, serializeLucidQuery } from '../adapters/adonis';
import { adaptLaravelList, adaptLaravelPagination } from '../adapters/laravel';
import { DataTable } from '../components/data-table';
const props = defineProps<{ backend: 'laravel' | 'lucid' | 'custom' }>();
type Item = { id: string; name: string };
const source = Array.from({ length: 17 }, (_, index) => ({
    id: String(index + 1),
    name: `Project ${String(index + 1).padStart(2, '0')}`,
}));
const state = ref<ListState>({
    page: 1,
    per_page: 5,
    order_by: 'name',
    order: 'ASC',
    search: null,
});
const filters = ref<Record<string, unknown>>({});
const lastQuery = ref<Record<string, unknown>>({});
const config: ListPayload<Item>['config'] = {
    searchable: ['name'],
    sortable: ['name'],
    filters: {},
    actions: [],
};
const columns: DataTableColumnDef<Item>[] = [{ accessorKey: 'name', header: 'Project', size: 0 }];
type CustomPage = { records: Item[]; count: number; pageIndex: number; limit: number };
const customAdapter = {
    normalize(value: CustomPage): ListPayload<Item> {
        return {
            results: adaptLaravelPagination({
                data: value.records,
                total: value.count,
                current_page: value.pageIndex + 1,
                per_page: value.limit,
                last_page: Math.max(1, Math.ceil(value.count / value.limit)),
            }),
            config,
            filters: filters.value,
            state: state.value,
        };
    },
    serializeQuery(next, values) {
        return {
            pageIndex: next.page - 1,
            limit: next.per_page,
            sort: next.order_by,
            descending: next.order === 'DESC',
            query: values.search ?? '',
        };
    },
} satisfies DataTableAdapter<CustomPage, Item>;
const list = computed<ListPayload<Item>>(() => {
    const current = state.value;
    const rows = source
        .filter((item) =>
            item.name.toLowerCase().includes(String(filters.value.search ?? '').toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name) * (current.order === 'ASC' ? 1 : -1));
    const data = rows.slice((current.page - 1) * current.per_page, current.page * current.per_page);
    const lastPage = Math.max(1, Math.ceil(rows.length / current.per_page));
    if (props.backend === 'custom')
        return customAdapter.normalize({
            records: data,
            count: rows.length,
            pageIndex: current.page - 1,
            limit: current.per_page,
        });
    if (props.backend === 'lucid')
        return adaptLucidList({
            results: {
                data,
                meta: {
                    currentPage: current.page,
                    lastPage,
                    perPage: current.per_page,
                    total: rows.length,
                },
            },
            config,
            filters: filters.value,
            state: {
                page: current.page,
                perPage: current.per_page,
                orderBy: current.order_by,
                order: current.order === 'DESC' ? 'desc' : 'asc',
                search: current.search,
            },
        });
    return adaptLaravelList({
        results: {
            data,
            current_page: current.page,
            last_page: lastPage,
            per_page: current.per_page,
            total: rows.length,
        },
        config,
        filters: filters.value,
        state: current,
    });
});
function query(next: ListState, values: Record<string, unknown>) {
    state.value = next;
    filters.value = values;
    lastQuery.value =
        props.backend === 'lucid'
            ? serializeLucidQuery(next, values)
            : props.backend === 'custom'
              ? customAdapter.serializeQuery(next, values)
              : {
                    page: next.page,
                    per_page: next.per_page,
                    order_by: next.order_by,
                    order: next.order,
                    filters: values,
                };
}
</script>
