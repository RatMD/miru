<template>
    <div
        data-slot="table-demo"
        class="w-full min-w-0"
        :class="embedded ? 'overflow-x-auto rounded-md border border-border bg-background' : ''">
        <div v-if="embedded" class="border-b border-border px-3 py-4">
            <h3 class="font-medium">{{ text.title }}</h3>
            <p class="mt-1 text-sm text-muted-foreground">{{ text.subtitle }}</p>
        </div>
        <Table :variant="variant" :embedded="embedded">
            <TableCaption :class="caption ? undefined : 'sr-only'">{{ text.caption }}</TableCaption>
            <TableHeader>
                <TableRow :hover="false">
                    <TableHead
                        :sortable="sortable"
                        :sort="directionFor('name')"
                        :disabled="disabled"
                        @sort="sortBy('name')">
                        {{ text.position }}
                    </TableHead>
                    <TableHead>{{ text.status }}</TableHead>
                    <TableHead align="center">{{ text.quantity }}</TableHead>
                    <TableHead align="right">{{ text.date }}</TableHead>
                    <TableHead
                        align="right"
                        :sortable="sortable"
                        :sort="directionFor('amount')"
                        :disabled="disabled"
                        @sort="sortBy('amount')">
                        {{ text.amount }}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-if="empty" :hover="false">
                    <TableCell :colspan="5" class="h-28 text-center text-muted-foreground">
                        {{ text.empty }}
                    </TableCell>
                </TableRow>
                <TableRow v-for="item in empty ? [] : sortedRows" :key="item.id">
                    <TableCell class="font-medium">{{ item.name }}</TableCell>
                    <TableCell>
                        <Badge :variant="item.paid ? 'success' : 'secondary'">
                            {{ item.paid ? text.paid : text.open }}
                        </Badge>
                    </TableCell>
                    <TableCellCount :value="item.quantity" />
                    <TableCellDateTime :value="item.date" display="date" />
                    <TableCell align="right" class="tabular-nums">
                        {{ money(item.amount) }}
                    </TableCell>
                </TableRow>
            </TableBody>
            <TableFooter v-if="!empty">
                <TableRow :hover="false">
                    <TableCell :colspan="4">{{ text.total }}</TableCell>
                    <TableCell align="right" class="tabular-nums">{{ money(total) }}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
</template>
<script setup lang="ts">
import type { TableVariant } from '../components/table';
import { computed } from 'vue';
import { Badge } from '../components/badge';
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    TableCaption,
    TableCellCount,
    TableCellDateTime,
} from '../components/table';
import { useTableSort } from '../composables/useTableSort';

const props = withDefaults(
    defineProps<{
        locale?: string;
        variant?: TableVariant;
        embedded?: boolean;
        sortable?: boolean;
        disabled?: boolean;
        empty?: boolean;
        caption?: boolean;
    }>(),
    { locale: 'en', variant: 'default' },
);
const text = computed(() =>
    props.locale === 'de'
        ? {
              caption: 'Monatliche Leistungen · Alle Beträge in EUR',
              title: 'Monatliche Leistungen',
              subtitle: 'Eine Tabelle direkt innerhalb einer bestehenden Karte.',
              position: 'Position',
              status: 'Status',
              quantity: 'Menge',
              date: 'Datum',
              amount: 'Betrag',
              paid: 'Bezahlt',
              open: 'Offen',
              total: 'Gesamt',
              empty: 'Keine Positionen vorhanden.',
          }
        : {
              caption: 'Monthly services · All amounts in EUR',
              title: 'Monthly services',
              subtitle: 'A table placed directly inside an existing card.',
              position: 'Position',
              status: 'Status',
              quantity: 'Quantity',
              date: 'Date',
              amount: 'Amount',
              paid: 'Paid',
              open: 'Open',
              total: 'Total',
              empty: 'No items available.',
          },
);
const items = computed(() => [
    {
        id: 'hosting',
        name: 'Hosting',
        amount: 29,
        paid: true,
        quantity: 1,
        date: '2026-11-24T12:00:00Z',
    },
    {
        id: 'design',
        name: 'Design',
        amount: 120,
        paid: false,
        quantity: 3,
        date: '2026-11-25T12:00:00Z',
    },
    {
        id: 'support',
        name: 'Support',
        amount: 9,
        paid: true,
        quantity: 2,
        date: '2026-11-26T12:00:00Z',
    },
]);
const { sortedRows, sortBy, directionFor } = useTableSort(items);
const total = computed(() => items.value.reduce((sum, item) => sum + item.amount, 0));
const money = (value: number) =>
    new Intl.NumberFormat(props.locale, { style: 'currency', currency: 'EUR' }).format(value);
</script>
