<template>
    <UiProvider :locale="locale" :translate="translate">
        <div
            class="w-full min-w-0 space-y-4"
            data-slot="data-table-showcase"
            :data-scenario="scenario">
            <div>
                <h3 class="font-semibold">{{ copy.headings[scenario] }}</h3>
                <p class="mt-1 text-sm text-muted-foreground">{{ copy.hints[scenario] }}</p>
            </div>
            <div
                :class="
                    scenario === 'embedded' || embedded
                        ? 'overflow-x-auto rounded-md border bg-background'
                        : undefined
                ">
                <DataTable
                    :table-key="'storybook-advanced-' + scenario"
                    :list="list"
                    :columns="columns"
                    :actions="actions"
                    :row-action="scenario === 'actions' ? 'view' : undefined"
                    :row-selectable="(item) => !disabled && item.id !== '3'"
                    :row-expandable="(item) => !disabled && item.units.length > 0"
                    :query-handler="query"
                    :disabled="disabled"
                    :show-toolbar="showToolbar ?? true"
                    :show-column-toggle="showColumnToggle ?? true"
                    :pagination-position="paginationPosition ?? 'bottom'"
                    :has-leading-rows="scenario === 'slots'"
                    :embedded="scenario === 'embedded' || embedded"
                    :variant="scenario === 'embedded' ? 'compact' : (variant ?? 'default')">
                    <template v-if="scenario === 'subcolumns'" #cell-name="{ item }">
                        <div class="space-y-1">
                            <div class="font-medium">{{ item.name }}</div>
                            <div
                                class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <span class="font-mono">{{ item.code }}</span>
                                <span>{{ item.team }}</span>
                                <Badge variant="ghostly">
                                    {{ copy[item.status as 'active' | 'pending' | 'archived'] }}
                                </Badge>
                            </div>
                        </div>
                    </template>
                    <template
                        v-if="scenario === 'values' || scenario === 'actions'"
                        #cell-enabled="{ item }">
                        <DataTableBooleanToggle
                            :active="item.enabled"
                            :disabled="disabled"
                            :label="copy.enabled"
                            @toggle="item.enabled = !item.enabled">
                            <IconCheck v-if="item.enabled" />
                            <IconBox v-else />
                        </DataTableBooleanToggle>
                    </template>
                    <template v-if="scenario === 'subtables'" #expanded-row="{ item }">
                        <section
                            class="border-l-2 border-primary bg-muted/20 p-3 sm:p-4"
                            data-slot="data-table-subtable">
                            <h4 class="mb-3 text-sm font-semibold">
                                {{ item.name }} — {{ copy.details }}
                            </h4>
                            <div class="overflow-x-auto rounded-md border bg-background">
                                <DataTable
                                    :table-key="'storybook-subtable-' + item.id"
                                    :list="
                                        payload(item.units, {
                                            page: 1,
                                            per_page: 10,
                                            order_by: 'name',
                                            order: 'ASC',
                                            search: null,
                                        })
                                    "
                                    :columns="childColumns"
                                    embedded
                                    :show-toolbar="false"
                                    pagination-position="none"
                                    :query-handler="noop" />
                            </div>
                        </section>
                    </template>
                    <template v-if="scenario === 'slots'" #leading-rows>
                        <tr class="border-b bg-muted/30" data-slot="data-table-leading-summary">
                            <td :colspan="columns.length" class="px-3 py-2 text-sm">
                                {{ copy.summary }}: {{ total }}
                            </td>
                        </tr>
                    </template>
                    <template v-if="scenario === 'slots'" #before-row="{ item, colspan }">
                        <tr v-if="isFirstInTeam(item)" class="border-b bg-muted/40">
                            <th
                                :colspan="colspan"
                                scope="rowgroup"
                                class="px-3 py-2 text-left text-xs font-semibold">
                                {{ item.team }}
                            </th>
                        </tr>
                    </template>
                    <template v-if="scenario === 'slots'" #after-row="{ item, colspan }">
                        <tr
                            v-if="isLast(item)"
                            class="bg-muted/30"
                            data-slot="data-table-closing-summary">
                            <td :colspan="colspan" class="px-3 py-3 font-semibold">
                                {{ copy.total }}: {{ total }}
                            </td>
                        </tr>
                    </template>
                    <template v-if="scenario === 'cards'" #content="{ rows }">
                        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <Card v-for="row in rows" :key="row.id">
                                <CardHeader border>
                                    <CardTitle>{{ row.original.name }}</CardTitle>
                                    <template #badges>
                                        <Badge variant="ghostly">{{ row.original.team }}</Badge>
                                    </template>
                                </CardHeader>
                                <CardContent>
                                    <p class="text-sm">
                                        {{ copy.quantity }}: {{ row.original.quantity }}
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        class="mt-3"
                                        @click="
                                            feedback = copy.selected + ': ' + row.original.name
                                        ">
                                        <IconEye />
                                        {{ copy.view }}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </template>
                </DataTable>
            </div>
            <output aria-live="polite" class="block text-sm">{{ feedback }}</output>
        </div>
    </UiProvider>
</template>
<script setup lang="ts">
import type {
    DataTableColumnDef,
    DataTableRowAction,
    DataTableSortOrderRow,
    DataTableMoveDirection,
    DataTableAddressLike,
    ListPayload,
    ListState,
} from '../components/data-table';
import { IconBox, IconCheck, IconEye, IconPackage, IconTrash, IconUsers } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/card';
import {
    DataTable,
    DataTableBooleanToggle,
    DataTableMoneyCell,
    createSelectionColumn,
    createExpansionColumn,
    createActionsColumn,
    createCountColumn,
    createMultiCountsColumn,
    createSortOrderColumn,
    createStatusColumn,
    createBadgeColumn,
    createDateTimeColumn,
    createAddressColumn,
} from '../components/data-table';
import { UiProvider } from '../components/provider';
import { dataTableShowcaseCopy } from './data-table-showcase-copy';
type Scenario = keyof typeof dataTableShowcaseCopy.en.headings;
interface Unit {
    id: string;
    name: string;
    quantity: number;
    status: string;
}
interface Item extends DataTableSortOrderRow {
    name: string;
    code: string;
    team: string;
    quantity: number;
    ready: number;
    reserved: number;
    status: string;
    price: number;
    currency: string;
    created: string;
    enabled: boolean;
    address: DataTableAddressLike;
    units: Unit[];
}
const props = withDefaults(
    defineProps<{
        scenario: Scenario;
        locale?: string;
        variant?: 'default' | 'compact';
        embedded?: boolean;
        disabled?: boolean;
        showToolbar?: boolean;
        showColumnToggle?: boolean;
        paginationPosition?: 'top' | 'bottom' | 'both' | 'none';
    }>(),
    { locale: 'en', disabled: false },
);
const copy = computed(() => dataTableShowcaseCopy[props.locale.startsWith('de') ? 'de' : 'en']);
const feedback = ref('');
const source = ref<Item[]>(
    Array.from({ length: 6 }, (_, i) => ({
        id: String(i + 1),
        name: ['MIRU', 'Workspace', 'Example App', 'MIRU Core', 'Workspace API', 'Example App API'][
            i
        ]!,
        code: 'PRJ-' + String(i + 1).padStart(3, '0'),
        team: i < 3 ? 'MIRU' : 'Workspace',
        quantity: i * 3,
        ready: i * 2,
        reserved: i,
        status: ['active', 'pending', 'archived'][i % 3]!,
        price: 149.5 + i * 20,
        currency: 'EUR',
        created: '2026-11-' + String(10 + i) + 'T14:30:00Z',
        enabled: i % 2 === 0,
        sort_order: i + 1,
        can_reorder: true,
        can_move_up: i > 0,
        can_move_down: i < 5,
        address: {
            company_name: 'MIRU',
            street: 'Example Street',
            house_number: String(i + 1),
            postal_code: '46282',
            city: 'Dorsten',
            country: 'Germany',
        },
        units: Array.from({ length: 2 }, (_, n) => ({
            id: String(i + 1) + '-' + n,
            name: 'UNIT-' + (i + 1) + '-' + (n + 1),
            quantity: n + 1,
            status: n ? 'pending' : 'active',
        })),
    })),
);
const state = ref<ListState>({
    page: 1,
    per_page: 10,
    order_by: props.scenario === 'sort' ? 'sort_order' : 'name',
    order: 'ASC',
    search: null,
});
const filters = ref<Record<string, unknown>>({});
function query(next: ListState, nextFilters: Record<string, unknown>): void {
    state.value = next;
    filters.value = nextFilters;
}
function payload<T>(items: T[], queryState: ListState): ListPayload<T> {
    const total = items.length,
        last = Math.max(1, Math.ceil(total / queryState.per_page)),
        page = Math.min(queryState.page, last),
        offset = (page - 1) * queryState.per_page;
    return {
        results: {
            data: items.slice(offset, offset + queryState.per_page),
            current_page: page,
            first_page: 1,
            last_page: last,
            from: total ? offset + 1 : 0,
            to: Math.min(offset + queryState.per_page, total),
            per_page: queryState.per_page,
            total,
            path: '/storybook',
            first_page_url: null,
            last_page_url: null,
            prev_page_url: null,
            next_page_url: null,
            links: [],
        },
        filters: {},
        config: {
            filters: {},
            actions: [],
            searchable: ['name'],
            sortable: ['name', 'team', 'quantity', 'created', 'price'],
        },
        state: { ...queryState, page },
    };
}
const list = computed(() => {
    let items = source.value.filter(
        (item) =>
            !filters.value.search ||
            item.name.toLowerCase().includes(String(filters.value.search).toLowerCase()),
    );
    const key = state.value.order_by as keyof Item;
    items = [...items].sort((a, b) => {
        const av = a[key],
            bv = b[key];
        return (
            (typeof av === 'number' && typeof bv === 'number'
                ? av - bv
                : String(av).localeCompare(String(bv))) * (state.value.order === 'ASC' ? 1 : -1)
        );
    });
    return { ...payload(items, state.value), filters: filters.value };
});
const nameColumn = computed<DataTableColumnDef<Item>>(() => ({
    accessorKey: 'name',
    header: copy.value.name,
    size: 0,
    enableHiding: false,
    meta: { label: copy.value.name },
}));
const teamColumn = computed<DataTableColumnDef<Item>>(() => ({
    accessorKey: 'team',
    header: copy.value.team,
    size: 140,
    meta: { label: copy.value.team, mobileHidden: props.scenario === 'fill' },
}));
const quantityColumn = createCountColumn<Item>({
    accessorKey: 'quantity',
    label: () => copy.value.quantity,
    size: 96,
});
const statusColumn = createStatusColumn<Item>({
    accessorKey: 'status',
    label: () => copy.value.status,
    size: 84,
    statuses: {
        active: { label: () => copy.value.active, colorClass: 'bg-success' },
        pending: { label: () => copy.value.pending, colorClass: 'bg-warning' },
        archived: { label: () => copy.value.archived, colorClass: 'bg-muted-foreground' },
    },
});
const nativeCounts = createMultiCountsColumn<Item>({
    id: 'counts',
    label: () => copy.value.counts,
    size: 128,
    counts: [
        { key: 'ready', labelKey: 'demo.ready', icon: IconCheck },
        { key: 'reserved', labelKey: 'demo.reserved', icon: IconBox },
        { key: 'quantity', labelKey: 'demo.quantity', icon: IconPackage },
    ],
});
const sortColumn = createSortOrderColumn<Item>({ labelKey: 'demo.order', moveHandler: reorder });
sortColumn.meta = { ...sortColumn.meta, label: () => copy.value.order };
function reorder(item: Item, direction: DataTableMoveDirection): void {
    const items = [...source.value].sort((a, b) => a.sort_order - b.sort_order),
        index = items.findIndex((row) => row.id === item.id),
        next = index + (direction === 'up' ? -1 : 1);
    if (index < 0 || next < 0 || next >= items.length) return;
    [items[index], items[next]] = [items[next]!, items[index]!];
    source.value = items.map((row, n) => ({
        ...row,
        sort_order: n + 1,
        can_move_up: n > 0,
        can_move_down: n < items.length - 1,
    }));
    feedback.value = copy.value.changed + ': ' + item.name;
}
const columns = computed<DataTableColumnDef<Item>[]>(() => {
    switch (props.scenario) {
        case 'counters':
            return [nameColumn.value, quantityColumn, nativeCounts, statusColumn];
        case 'sort':
            return [sortColumn, nameColumn.value, teamColumn.value];
        case 'groups':
            return [
                {
                    id: 'identity',
                    header: copy.value.identity,
                    columns: [nameColumn.value, teamColumn.value],
                },
                {
                    id: 'inventory',
                    header: copy.value.inventory,
                    columns: [quantityColumn, nativeCounts],
                },
            ];
        case 'values':
            return [
                nameColumn.value,
                statusColumn,
                createBadgeColumn<Item>({
                    accessorKey: 'status',
                    id: 'badge',
                    label: () => copy.value.status,
                    translationPrefix: 'demo.status',
                    size: 110,
                }),
                createDateTimeColumn<Item>({
                    accessorKey: 'created',
                    label: () => copy.value.created,
                    size: 150,
                }),
                {
                    accessorKey: 'price',
                    header: copy.value.price,
                    size: 110,
                    meta: {
                        component: DataTableMoneyCell,
                        label: copy.value.price,
                        align: 'right',
                    },
                },
                createAddressColumn<Item>({
                    accessorKey: 'address',
                    label: () => copy.value.address,
                    size: 240,
                }),
                {
                    accessorKey: 'enabled',
                    header: copy.value.enabled,
                    size: 96,
                    meta: { label: copy.value.enabled, align: 'center' },
                },
            ];
        case 'subtables':
            return [
                createExpansionColumn<Item>({ icon: IconUsers, label: () => copy.value.details }),
                nameColumn.value,
                quantityColumn,
                statusColumn,
            ];
        case 'actions':
            return [
                createSelectionColumn<Item>(),
                nameColumn.value,
                {
                    accessorKey: 'enabled',
                    header: copy.value.enabled,
                    size: 96,
                    meta: { label: copy.value.enabled },
                },
                createActionsColumn<Item>(),
            ];
        case 'subcolumns':
            return [nameColumn.value, quantityColumn, statusColumn];
        default:
            return [nameColumn.value, teamColumn.value, quantityColumn];
    }
});
const actions = computed<DataTableRowAction<Item>[]>(() => [
    {
        key: 'view',
        label: copy.value.view,
        icon: IconEye,
        priority: 'primary',
        disabled: () => props.disabled,
        execute: (item) => (feedback.value = copy.value.selected + ': ' + item.name),
    },
    {
        key: 'toggle',
        label: copy.value.enabled,
        icon: IconCheck,
        priority: 'primary',
        disabled: () => props.disabled,
        execute: (item) => {
            item.enabled = !item.enabled;
        },
    },
    {
        key: 'details',
        label: copy.value.details,
        icon: IconBox,
        priority: 'secondary',
        visible: (item) => item.id !== '2',
        disabled: () => props.disabled,
        execute: (item) => (feedback.value = copy.value.details + ': ' + item.code),
    },
    {
        key: 'archive',
        label: copy.value.archive,
        icon: IconPackage,
        priority: 'secondary',
        disabled: (item) => props.disabled || item.status === 'archived',
        execute: (item) => {
            item.status = 'archived';
        },
    },
    {
        key: 'delete',
        label: copy.value.remove,
        icon: IconTrash,
        color: 'danger',
        priority: 'secondary',
        disabled: (item) => props.disabled || item.id === '1',
        confirmation: {
            title: () => copy.value.confirmTitle,
            description: () => copy.value.confirmDescription,
            confirmLabel: () => copy.value.remove,
            cancelLabel: () => copy.value.cancel,
        },
        execute: (item) => (source.value = source.value.filter((row) => row.id !== item.id)),
    },
]);
const childColumns: DataTableColumnDef<Unit>[] = [
    {
        accessorKey: 'name',
        header: () => copy.value.child,
        size: 0,
        meta: { label: () => copy.value.child },
    },
    createCountColumn<Unit>({
        accessorKey: 'quantity',
        label: () => copy.value.quantity,
        size: 100,
    }),
    createBadgeColumn<Unit>({
        accessorKey: 'status',
        label: () => copy.value.status,
        translationPrefix: 'demo.status',
        size: 120,
    }),
];
function translate(key: string): string | undefined {
    const map: Record<string, string> = {
        'demo.ready': copy.value.ready,
        'demo.reserved': copy.value.reserved,
        'demo.quantity': copy.value.quantity,
        'demo.order': copy.value.order,
        'demo.status.active': copy.value.active,
        'demo.status.pending': copy.value.pending,
        'demo.status.archived': copy.value.archived,
    };
    return map[key];
}
function noop(): void {}
function isFirstInTeam(item: Item): boolean {
    const rows = list.value.results.data,
        index = rows.findIndex((row) => row.id === item.id);
    return index === 0 || rows[index - 1]?.team !== item.team;
}
function isLast(item: Item): boolean {
    return list.value.results.data.at(-1)?.id === item.id;
}
const total = computed(() => list.value.results.data.reduce((sum, item) => sum + item.quantity, 0));
</script>
