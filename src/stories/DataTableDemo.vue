<template>
    <div style="width: 100%; max-width: 100%; min-width: 0">
        <DataTable
            :table-key="
                'storybook-demo-' + (compact ? 'compact' : expandable ? 'expandable' : 'default')
            "
            :list="list"
            :columns="columns"
            :actions="actions"
            row-action="edit"
            :query-handler="query"
            :bulk-action-handler="applyBulk"
            :row-expandable="() => true"
            :variant="compact ? 'compact' : (variant ?? 'default')"
            :disabled="disabled"
            :show-toolbar="showToolbar ?? true"
            :show-column-toggle="showColumnToggle ?? true"
            :pagination-position="paginationPosition ?? 'bottom'"
            :embedded="embedded">
            <template v-if="expandable" #expanded-row="{ item }">
                <div class="bg-muted p-4">{{ item.name }} — {{ labels.description }}</div>
            </template>
        </DataTable>
        <output class="mt-3 block text-sm" aria-live="polite">{{ feedback }}</output>
    </div>
</template>
<script setup lang="ts">
import type { ListActionConfiguration } from '../components/data-table';
import type {
    DataTableColumnDef,
    DataTableRowAction,
    ListPayload,
    ListState,
} from '../components/data-table';
import { IconPencil } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import {
    DataTable,
    createSelectionColumn,
    createExpansionColumn,
    createActionsColumn,
    createStatusColumn,
} from '../components/data-table';
const props = withDefaults(
    defineProps<{
        locale?: string;
        initialFilters?: Record<string, unknown>;
        empty?: boolean;
        compact?: boolean;
        expandable?: boolean;
        disabled?: boolean;
        showToolbar?: boolean;
        showColumnToggle?: boolean;
        paginationPosition?: 'top' | 'bottom' | 'both' | 'none';
        variant?: 'default' | 'compact';
        embedded?: boolean;
    }>(),
    { locale: 'en' },
);
const de = computed(() => props.locale === 'de');
const labels = computed(() =>
    de.value
        ? {
              name: 'Name',
              status: 'Status',
              team: 'Team',
              active: 'Aktiv',
              archived: 'Archiviert',
              edit: 'Bearbeiten',
              archive: 'Auswahl archivieren',
              remove: 'Auswahl löschen',
              bulkTitle: 'Mehrere Einträge bearbeiten',
              bulkDescription: 'Die Aktion wird auf alle ausgewählten Einträge angewendet.',
              applied: 'Aktion ausgeführt',
              description: 'Details zum ausgewählten Eintrag',
              feedback: 'Geöffneter Eintrag',
          }
        : {
              name: 'Name',
              status: 'Status',
              team: 'Team',
              active: 'Active',
              archived: 'Archived',
              edit: 'Edit',
              archive: 'Archive selected',
              remove: 'Delete selected',
              bulkTitle: 'Update selected items',
              bulkDescription: 'The action applies to all selected items.',
              applied: 'Action applied',
              description: 'Details about the selected item',
              feedback: 'Opened item',
          },
);
interface Item {
    id: string;
    name: string;
    status: string;
    team: string;
}
const source = ref<Item[]>(
    Array.from({ length: 32 }, (_, i) => ({
        id: String(i + 1),
        name: 'Project ' + String(i + 1).padStart(2, '0'),
        status: i % 3 === 0 ? 'archived' : 'active',
        team: i % 2 ? 'Workspace' : 'MIRU',
    })),
);
const state = ref<ListState>({
    page: 1,
    per_page: 10,
    order_by: 'name',
    order: 'ASC',
    search: null,
});
const filters = ref<Record<string, unknown>>({ ...props.initialFilters });
const feedback = ref('');
function query(next: ListState, nextFilters: Record<string, unknown>): void {
    state.value = next;
    filters.value = nextFilters;
}
const list = computed<ListPayload<Item>>(() => {
    let items = props.empty
        ? []
        : source.value.filter(
              (item) =>
                  (!filters.value.search ||
                      item.name
                          .toLowerCase()
                          .includes(String(filters.value.search).toLowerCase())) &&
                  (!filters.value.status || item.status === filters.value.status) &&
                  (!filters.value.team || item.team === filters.value.team),
          );
    const key = state.value.order_by as keyof Item;
    items = [...items].sort(
        (a, b) =>
            String(a[key]).localeCompare(String(b[key])) * (state.value.order === 'ASC' ? 1 : -1),
    );
    const total = items.length,
        last = Math.max(1, Math.ceil(total / state.value.per_page));
    const current = Math.min(state.value.page, last),
        offset = (current - 1) * state.value.per_page;
    return {
        results: {
            data: items.slice(offset, offset + state.value.per_page),
            current_page: current,
            first_page: 1,
            last_page: last,
            from: total ? offset + 1 : 0,
            to: Math.min(offset + state.value.per_page, total),
            per_page: state.value.per_page,
            total,
            path: '/storybook',
            first_page_url: null,
            last_page_url: null,
            prev_page_url: current > 1 ? '/storybook?page=' + (current - 1) : null,
            next_page_url: current < last ? '/storybook?page=' + (current + 1) : null,
            links: [],
        },
        filters: filters.value,
        state: { ...state.value, page: current },
        config: {
            searchable: ['name'],
            sortable: ['name', 'team', 'status'],
            actions: [
                {
                    key: 'archive',
                    label: labels.value.archive,
                    method: 'post',
                    url: '/storybook/archive',
                    color: 'warning',
                    confirmation: {
                        title: labels.value.bulkTitle,
                        description: labels.value.bulkDescription,
                        confirm_label: labels.value.archive,
                        cancel_label: de.value ? 'Abbrechen' : 'Cancel',
                    },
                },
                {
                    key: 'delete',
                    label: labels.value.remove,
                    method: 'delete',
                    url: '/storybook/delete',
                    color: 'danger',
                    confirmation: {
                        title: labels.value.bulkTitle,
                        description: labels.value.bulkDescription,
                        confirm_label: labels.value.remove,
                        cancel_label: de.value ? 'Abbrechen' : 'Cancel',
                    },
                },
            ],
            filters: {
                status: {
                    label: labels.value.status,
                    type: 'select',
                    searchable: true,
                    options: [
                        { value: 'active', label: labels.value.active },
                        { value: 'archived', label: labels.value.archived },
                    ],
                },
                team: {
                    label: labels.value.team,
                    type: 'select',
                    options: [
                        { value: 'MIRU', label: 'MIRU' },
                        { value: 'Workspace', label: 'Workspace' },
                    ],
                },
            },
        },
    };
});
function applyBulk(action: ListActionConfiguration, selection: (string | number)[]): void {
    if (action.key === 'delete')
        source.value = source.value.filter((item) => !selection.includes(item.id));
    else
        source.value = source.value.map((item) =>
            selection.includes(item.id) ? { ...item, status: 'archived' } : item,
        );
    feedback.value = labels.value.applied + ': ' + selection.length;
}
// Factories run in setup; label getters remain reactive when the locale changes.
const selection = createSelectionColumn<Item>();
const expansion = createExpansionColumn<Item>();
const status = createStatusColumn<Item>({
    accessorKey: 'status',
    label: () => labels.value.status,
    statuses: {
        active: { label: () => labels.value.active, colorClass: 'bg-success' },
        archived: { label: () => labels.value.archived, colorClass: 'bg-muted-foreground' },
    },
});
const actions = computed<DataTableRowAction<Item>[]>(() => [
    {
        key: 'edit',
        label: labels.value.edit,
        priority: 'primary',
        icon: IconPencil,
        execute: (item) => (feedback.value = labels.value.feedback + ': ' + item.name),
    },
]);
const columns = computed<DataTableColumnDef<Item>[]>(() => [
    selection,
    ...(props.expandable ? [expansion] : []),
    {
        accessorKey: 'name',
        header: labels.value.name,
        size: 220,
        meta: { label: labels.value.name },
    },
    {
        accessorKey: 'team',
        header: labels.value.team,
        size: 140,
        meta: { label: labels.value.team },
    },
    status,
    createActionsColumn<Item>(),
]);
</script>
