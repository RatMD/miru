<template>
    <Table :variant="variant" :embedded="embedded">
        <TableCaption class="sr-only">{{ text[scenario] }}</TableCaption>
        <TableHeader>
            <TableRow :hover="false">
                <TableHead>{{ text.position }}</TableHead>
                <template v-if="scenario === 'values'">
                    <TableHead align="right">{{ text.amount }}</TableHead>
                    <TableHead align="right">{{ text.created }}</TableHead>
                    <TableHead align="right">{{ text.date }}</TableHead>
                </template>
                <template v-else-if="scenario === 'statuses'">
                    <TableHead>{{ text.badge }}</TableHead>
                    <TableHead align="center">{{ text.status }}</TableHead>
                </template>
                <template v-else-if="scenario === 'counts'">
                    <TableHead align="center">{{ text.count }}</TableHead>
                    <TableHead align="center">
                        <TableMultiCountsHeader :counts="counts" />
                    </TableHead>
                </template>
                <TableHead v-else-if="scenario === 'addresses'">{{ text.address }}</TableHead>
                <TableHead v-else align="center">{{ text.enabled }}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="item in items" :key="item.id">
                <TableCell class="font-medium">{{ item.name }}</TableCell>
                <template v-if="scenario === 'values'">
                    <TableCellMoney :value="item.amount" :currency="item.currency" />
                    <TableCellDateTime :value="item.created" />
                    <TableCellDateTime :value="item.created" display="date" />
                </template>
                <template v-else-if="scenario === 'statuses'">
                    <TableCellBadge :value="item.status" :statuses="statuses" />
                    <TableCellStatus :value="item.status" :statuses="statuses" />
                </template>
                <template v-else-if="scenario === 'counts'">
                    <TableCellCount :value="item.quantity" />
                    <TableCellMultiCounts :item="item" :counts="counts" />
                </template>
                <TableCellAddress v-else-if="scenario === 'addresses'" :value="item.address" />
                <TableCellBoolean
                    v-else
                    v-model="item.enabled"
                    :label="`${text.toggle} ${item.name}`"
                    :disabled="item.locked" />
            </TableRow>
        </TableBody>
    </Table>
</template>

<script setup lang="ts">
import type {
    TableAddressLike,
    TableCountDefinition,
    TableStatusDefinition,
    TableVariant,
} from '../components/table';
import { IconBan, IconCheck, IconClock, IconPackage, IconTruck } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
    TableCellMoney,
    TableCellDateTime,
    TableCellBadge,
    TableCellStatus,
    TableCellCount,
    TableCellMultiCounts,
    TableMultiCountsHeader,
    TableCellAddress,
    TableCellBoolean,
} from '../components/table';

const props = withDefaults(
    defineProps<{
        locale?: string;
        scenario?: 'values' | 'statuses' | 'counts' | 'addresses' | 'booleans';
        variant?: TableVariant;
        embedded?: boolean;
    }>(),
    { locale: 'en', scenario: 'values', variant: 'default' },
);
const text = computed(() =>
    props.locale === 'de'
        ? {
              position: 'Position',
              amount: 'Betrag',
              created: 'Erstellt',
              date: 'Datum',
              badge: 'Badge',
              status: 'Status',
              count: 'Anzahl',
              address: 'Adresse',
              enabled: 'Aktiv',
              toggle: 'Aktivierung umschalten für',
              active: 'Aktiv',
              pending: 'Ausstehend',
              blocked: 'Gesperrt',
              ordered: 'Bestellt',
              shipped: 'Versendet',
              values: 'Geld und Datum',
              statuses: 'Badges und Status',
              counts: 'Zähler',
              addresses: 'Adressen',
              booleans: 'Boolean-Schalter',
          }
        : {
              position: 'Position',
              amount: 'Amount',
              created: 'Created',
              date: 'Date',
              badge: 'Badge',
              status: 'Status',
              count: 'Count',
              address: 'Address',
              enabled: 'Enabled',
              toggle: 'Toggle activation for',
              active: 'Active',
              pending: 'Pending',
              blocked: 'Blocked',
              ordered: 'Ordered',
              shipped: 'Shipped',
              values: 'Money and dates',
              statuses: 'Badges and status',
              counts: 'Counters',
              addresses: 'Addresses',
              booleans: 'Boolean toggles',
          },
);
const counts = computed<TableCountDefinition[]>(() => [
    { key: 'quantity', label: text.value.ordered, icon: IconPackage },
    { key: 'shipped', label: text.value.shipped, icon: IconTruck },
]);
const statuses = computed<Record<string, TableStatusDefinition>>(() => ({
    active: {
        label: text.value.active,
        icon: IconCheck,
        containerClass: 'bg-success/10',
        colorClass: 'text-success',
    },
    pending: {
        label: text.value.pending,
        icon: IconClock,
        containerClass: 'bg-warning/10',
        colorClass: 'text-warning',
    },
    blocked: {
        label: text.value.blocked,
        icon: IconBan,
        containerClass: 'bg-danger/10',
        colorClass: 'text-danger',
    },
}));
interface Item {
    id: number;
    name: string;
    amount: number | string;
    currency: string;
    created: string | null;
    quantity: number;
    shipped: number;
    status: string;
    enabled: boolean;
    locked: boolean;
    address: TableAddressLike | null;
}
const items = ref<Item[]>([
    {
        id: 1,
        name: 'Hosting',
        amount: 29.9,
        currency: 'EUR',
        created: '2026-11-24T10:30:00+01:00',
        quantity: 12,
        shipped: 8,
        status: 'active',
        enabled: true,
        locked: false,
        address: {
            company_name: 'MIRU Studio',
            street: 'Musterstraße',
            house_number: '12',
            postal_code: '10115',
            city: 'Berlin',
            state: { name: 'Berlin' },
            country: { name: 'Deutschland' },
        },
    },
    {
        id: 2,
        name: 'Design',
        amount: 120,
        currency: 'USD',
        created: '2026-11-23T15:45:00+01:00',
        quantity: 3,
        shipped: 0,
        status: 'pending',
        enabled: false,
        locked: false,
        address: {
            recipient_name: 'Alex Morgan',
            street: 'Market Street',
            house_number: '24',
            address_addition: 'Floor 2',
            postal_code: 'SW1A 1AA',
            city: 'London',
            country: 'United Kingdom',
        },
    },
    {
        id: 3,
        name: 'Support',
        amount: 'invalid',
        currency: 'EUR',
        created: null,
        quantity: 0,
        shipped: 0,
        status: 'blocked',
        enabled: false,
        locked: true,
        address: null,
    },
]);
</script>
