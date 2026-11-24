<template>
    <DashboardPage
        v-bind="forwarded"
        v-model:collapsed="collapsed"
        :title="selectedLabel"
        :description="copy.subtitle"
        :navigation="navigation"
        :breadcrumbs="breadcrumbs"
        @navigate="navigate">
        <template #brand="{ collapsed: compact }">
            <div class="flex items-center gap-3">
                <span
                    class="flex size-11 items-center justify-center rounded-xl bg-primary-600 text-white">
                    <IconHexagon class="size-7" />
                </span>
                <span v-if="!compact" class="text-base font-semibold">
                    MIRU
                    <span class="font-normal text-muted-foreground">workspace</span>
                </span>
            </div>
        </template>
        <template #header>
            <InputSearch
                v-if="headerSearch"
                v-model="query"
                :placeholder="copy.search"
                :aria-label="copy.search"
                class="max-w-sm" />
            <h1 v-else class="truncate text-lg font-semibold">{{ selectedLabel }}</h1>
        </template>
        <template #actions>
            <ButtonAction
                variant="default"
                borderless="yes"
                :title="copy.notifications"
                @click="notice = copy.noNotifications">
                <IconBell />
            </ButtonAction>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <button
                        type="button"
                        class="flex cursor-pointer items-center gap-2 rounded-full border border-border p-1 pe-3 text-sm"
                        :aria-label="copy.profile">
                        <Avatar size="sm" tone="primary">
                            <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <span class="hidden sm:inline">Sam Morgan</span>
                        <IconChevronDown class="size-3" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-56">
                    <DropdownMenuLabel>Sam Morgan</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @select="notice = copy.profileSelected">
                        {{ copy.profile }}
                    </DropdownMenuItem>
                    <DropdownMenuItem @select="notice = copy.settingsSelected">
                        {{ copy.settings }}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </template>
        <template #sidebar-footer="{ collapsed: compact }">
            <div class="flex items-center gap-3" :class="compact && 'justify-center'">
                <Avatar size="sm"><AvatarFallback>MW</AvatarFallback></Avatar>
                <div v-if="!compact" class="min-w-0">
                    <p class="truncate text-xs font-semibold">MIRU workspace</p>
                    <p class="text-xs text-muted-foreground">{{ copy.workspace }}</p>
                </div>
            </div>
        </template>
        <template #banner>
            <Alert
                v-if="notice"
                variant="info"
                appearance="soft"
                dismissable
                @dismiss="notice = ''">
                <AlertDescription>{{ notice }}</AlertDescription>
            </Alert>
        </template>
        <div class="grid gap-6">
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        WORKSPACE OVERVIEW
                    </p>
                    <h2
                        data-testid="dashboard-selection"
                        class="mt-2 text-2xl font-semibold tracking-tight">
                        {{ selectedLabel }}
                    </h2>
                    <p class="mt-2 text-sm text-muted-foreground">{{ copy.summary }}</p>
                </div>
                <Button variant="primary" @click="notice = copy.createSelected">
                    <IconPlus />
                    {{ copy.create }}
                </Button>
            </div>
            <div class="grid gap-4 sm:grid-cols-3">
                <Card v-for="stat in copy.stats" :key="stat.label">
                    <CardContent class="p-5">
                        <p class="text-xs text-muted-foreground">{{ stat.label }}</p>
                        <p class="mt-3 text-3xl font-semibold">{{ stat.value }}</p>
                        <p class="mt-2 text-xs text-success-700 dark:text-success-300">
                            {{ stat.change }}
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div class="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(16rem,1fr)]">
                <Card>
                    <CardHeader>
                        <CardTitle>{{ copy.activity }}</CardTitle>
                        <CardDescription>{{ copy.activityDescription }}</CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-5">
                        <div
                            v-for="(task, index) in copy.tasks"
                            :key="task"
                            class="flex items-center gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                            <span
                                class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-600/10 text-primary-700 dark:text-primary-300">
                                <IconPackage class="size-4" />
                            </span>
                            <div class="min-w-0 flex-1">
                                <p class="truncate text-sm font-medium">{{ task }}</p>
                                <p class="mt-1 text-xs text-muted-foreground">
                                    {{ index + 1 }}h · Sam Morgan
                                </p>
                            </div>
                            <Badge :variant="index === 1 ? 'warning' : 'success'">
                                {{ index === 1 ? copy.pending : copy.done }}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{{ copy.capacity }}</CardTitle>
                        <CardDescription>{{ copy.capacityDescription }}</CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-5">
                        <div v-for="(label, index) in copy.channels" :key="label">
                            <div class="mb-2 flex justify-between text-xs">
                                <span>{{ label }}</span>
                                <span>{{ 82 - index * 17 }}%</span>
                            </div>
                            <Progress
                                :model-value="82 - index * 17"
                                :variant="index === 1 ? 'accent' : 'primary'" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card v-for="index in extraContent ? 5 : 0" :key="index">
                <CardContent class="p-6">
                    <h3 class="font-semibold">{{ copy.activity }} {{ index }}</h3>
                    <p class="mt-3 text-sm leading-7 text-muted-foreground">
                        {{ copy.summary }} {{ copy.activityDescription }}
                    </p>
                </CardContent>
            </Card>
        </div>
        <template #footer>
            <div class="flex flex-wrap justify-between gap-3">
                <span>MIRU workspace · {{ copy.footer }}</span>
                <Badge variant="outline">v0.1 · Demo</Badge>
            </div>
        </template>
        <template v-if="appBar" #app-bar>
            <div
                class="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center md:hidden">
                <FloatingAppBar
                    :fixed="false"
                    variant="three"
                    shape="rounded-hexagon"
                    appearance="gradient"
                    :bordered="false"
                    :label="copy.actions">
                    <template #left>
                        <ButtonAction
                            variant="default"
                            borderless="yes"
                            :title="copy.notifications"
                            @click="notice = copy.noNotifications">
                            <IconBell />
                        </ButtonAction>
                    </template>
                    <template #primary>
                        <Button
                            variant="primary"
                            size="lg"
                            icon-only
                            :aria-label="copy.create"
                            @click="notice = copy.createSelected">
                            <IconPlus />
                        </Button>
                    </template>
                    <template #right>
                        <ButtonAction
                            variant="default"
                            borderless="yes"
                            :title="copy.profile"
                            @click="notice = copy.profileSelected">
                            <IconUser />
                        </ButtonAction>
                    </template>
                </FloatingAppBar>
            </div>
        </template>
    </DashboardPage>
</template>

<script setup lang="ts">
import type { DashboardNavigationGroup, DashboardNavigationItem } from '../layouts';
import {
    IconBell,
    IconChevronDown,
    IconHexagon,
    IconHome,
    IconPackage,
    IconPlus,
    IconSettings,
    IconShoppingBag,
    IconUsers,
    IconChartBar,
    IconUser,
} from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { Alert, AlertDescription } from '../components/alert';
import { FloatingAppBar } from '../components/app-bar';
import { Avatar, AvatarFallback } from '../components/avatar';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { ButtonAction } from '../components/button-action';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../components/dropdown-menu';
import { InputSearch } from '../components/input-search';
import { Progress } from '../components/progress';
import { DashboardPage } from '../layouts';

const props = withDefaults(
    defineProps<{
        locale?: string;
        collapsed?: boolean;
        sidebar?: boolean;
        surface?: 'flush' | 'inset';
        sidebarTone?: 'surface' | 'muted' | 'dark';
        scroll?: 'content' | 'page';
        headerSize?: 'sm' | 'default' | 'lg';
        padding?: 'none' | 'sm' | 'default' | 'lg';
        sidebarWidth?: number | string;
        railWidth?: number | string;
        contentWidth?: number | string;
        headerSearch?: boolean;
        appBar?: boolean;
        extraContent?: boolean;
    }>(),
    {
        locale: 'en',
        collapsed: false,
        sidebar: true,
        surface: 'inset',
        sidebarTone: 'dark',
        scroll: 'content',
        headerSize: 'default',
        padding: 'default',
        headerSearch: true,
        appBar: false,
        extraContent: false,
    },
);
const forwarded = reactiveOmit(
    props,
    'locale',
    'headerSearch',
    'appBar',
    'extraContent',
    'collapsed',
);
const collapsed = ref(props.collapsed);
watch(
    () => props.collapsed,
    (value) => (collapsed.value = value),
);
const query = ref('');
const selected = ref('overview');
const notice = ref('');
const copy = computed(() =>
    props.locale === 'de'
        ? {
              overview: 'Übersicht',
              orders: 'Aufträge',
              people: 'Kontakte',
              stock: 'Bestand',
              products: 'Produkte',
              reports: 'Berichte',
              administration: 'Administration',
              operations: 'Vorgänge',
              data: 'Daten',
              workspace: 'Team-Arbeitsbereich',
              subtitle: 'Dein Team. Ein gemeinsamer Überblick.',
              search: 'Arbeitsbereich durchsuchen',
              notifications: 'Benachrichtigungen',
              profile: 'Profil',
              settings: 'Einstellungen',
              summary:
                  'Alles im Blick, damit du dich auf den nächsten Schritt konzentrieren kannst.',
              create: 'Neu erstellen',
              activity: 'Letzte Aktivitäten',
              activityDescription: 'Die neuesten Änderungen in deinem Arbeitsbereich.',
              capacity: 'Auslastung',
              capacityDescription: 'Aktuelle Kapazität im Überblick.',
              channels: ['Bearbeitung', 'Versand', 'Support'],
              tasks: [
                  'Neue Lieferung erfasst',
                  'Auftrag zur Prüfung bereit',
                  'Team-Mitglied hinzugefügt',
              ],
              pending: 'Offen',
              done: 'Erledigt',
              stats: [
                  { label: 'Offene Aufträge', value: '128', change: '+12 diese Woche' },
                  { label: 'Aktive Kontakte', value: '2.846', change: '+8,2 % diesen Monat' },
                  { label: 'Abgeschlossen', value: '96,4 %', change: '+2,1 % zum Vormonat' },
              ],
              noNotifications: 'Du bist auf dem neuesten Stand.',
              profileSelected: 'Profilaktion ausgewählt.',
              settingsSelected: 'Einstellungen ausgewählt.',
              createSelected: 'Erstellen-Aktion ausgewählt.',
              footer: 'Gemeinsam weiter.',
              actions: 'Schnellaktionen',
          }
        : {
              overview: 'Overview',
              orders: 'Orders',
              people: 'People',
              stock: 'Inventory',
              products: 'Products',
              reports: 'Reports',
              administration: 'Administration',
              operations: 'Operations',
              data: 'Data',
              workspace: 'Team workspace',
              subtitle: 'Your team. One shared perspective.',
              search: 'Search your workspace',
              notifications: 'Notifications',
              profile: 'Profile',
              settings: 'Settings',
              summary: 'A clear view of what matters, so you can focus on the next step.',
              create: 'Create new',
              activity: 'Recent activity',
              activityDescription: 'The latest changes across your workspace.',
              capacity: 'Capacity',
              capacityDescription: 'A quick look at your available capacity.',
              channels: ['Processing', 'Shipping', 'Support'],
              tasks: ['New delivery registered', 'Order ready for review', 'Team member invited'],
              pending: 'Pending',
              done: 'Done',
              stats: [
                  { label: 'Open orders', value: '128', change: '+12 this week' },
                  { label: 'Active contacts', value: '2,846', change: '+8.2% this month' },
                  { label: 'Completed', value: '96.4%', change: '+2.1% from last month' },
              ],
              noNotifications: 'You are all caught up.',
              profileSelected: 'Profile action selected.',
              settingsSelected: 'Settings action selected.',
              createSelected: 'Create action selected.',
              footer: 'Move forward, together.',
              actions: 'Quick actions',
          },
);
const navigation = computed<DashboardNavigationGroup[]>(() => [
    {
        id: 'workspace',
        items: [
            {
                id: 'overview',
                label: copy.value.overview,
                href: '#overview',
                icon: IconHome,
                active: selected.value === 'overview',
            },
            {
                id: 'orders',
                label: copy.value.orders,
                href: '#orders',
                icon: IconShoppingBag,
                badge: 12,
                active: selected.value === 'orders',
            },
            {
                id: 'people',
                label: copy.value.people,
                href: '#people',
                icon: IconUsers,
                active: selected.value === 'people',
            },
        ],
    },
    {
        id: 'operations',
        label: copy.value.operations,
        boxed: collapsed.value,
        items: [
            {
                id: 'data',
                label: copy.value.data,
                icon: IconPackage,
                children: [
                    {
                        id: 'stock',
                        label: copy.value.stock,
                        href: '#inventory',
                        active: selected.value === 'stock',
                    },
                    {
                        id: 'products',
                        label: copy.value.products,
                        href: '#products',
                        active: selected.value === 'products',
                    },
                ],
            },
            {
                id: 'reports',
                label: copy.value.reports,
                href: '#reports',
                icon: IconChartBar,
                active: selected.value === 'reports',
            },
        ],
    },
    {
        id: 'system',
        items: [
            {
                id: 'administration',
                label: copy.value.administration,
                href: '#administration',
                icon: IconSettings,
                disabled: true,
            },
        ],
    },
]);
const selectedLabel = computed(() => {
    const labels: Record<string, string> = {
        overview: copy.value.overview,
        orders: copy.value.orders,
        people: copy.value.people,
        stock: copy.value.stock,
        products: copy.value.products,
        reports: copy.value.reports,
    };
    return labels[selected.value] || copy.value.overview;
});
const breadcrumbs = computed(() => [
    { label: 'Workspace', href: '#workspace' },
    { label: selectedLabel.value },
]);
function navigate(item: DashboardNavigationItem, event: MouseEvent): void {
    event.preventDefault();
    selected.value = item.id;
}
</script>
