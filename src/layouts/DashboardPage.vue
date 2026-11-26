<template>
    <div
        data-slot="dashboard-page"
        :data-collapsed="collapsed"
        :data-sidebar="sidebar"
        :data-scroll="scroll"
        :data-surface="surface"
        :class="cn('miru-dashboard-page relative min-w-0 bg-muted text-foreground', props.class)"
        :style="layoutStyle">
        <a
            :href="`#${contentId}`"
            class="sr-only z-50 rounded-md bg-background p-3 text-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3">
            {{ trans('common.layout.skip_content') }}
        </a>
        <aside
            v-if="sidebar"
            :id="sidebarId"
            data-slot="dashboard-sidebar"
            :class="cn('miru-dashboard-sidebar min-h-0 flex-col', sidebarClass)">
            <div v-if="$slots.brand" class="flex h-20 shrink-0 items-center justify-center px-4">
                <slot name="brand" :collapsed="collapsed" />
            </div>
            <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                <slot name="navigation" :collapsed="collapsed" :close-mobile="closeMobile">
                    <DashboardNavigation
                        :groups="navigation"
                        :rail="collapsed"
                        :label="resolvedNavigationLabel"
                        :link-component="linkComponent"
                        @navigate="navigate" />
                </slot>
            </div>
            <div v-if="$slots['sidebar-footer']" class="shrink-0 border-t border-border p-3">
                <slot name="sidebar-footer" :collapsed="collapsed" />
            </div>
        </aside>

        <div
            data-slot="dashboard-workspace"
            class="miru-dashboard-workspace flex min-h-0 min-w-0 flex-col bg-background">
            <header
                data-slot="dashboard-header"
                :class="
                    cn(
                        'miru-dashboard-header z-20 flex shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:px-6',
                        stickyHeader && 'sticky top-0',
                        headerSize === 'sm'
                            ? 'min-h-14'
                            : headerSize === 'lg'
                              ? 'min-h-24'
                              : 'min-h-16',
                    )
                ">
                <ButtonAction
                    v-if="sidebar"
                    class="md:hidden"
                    variant="default"
                    borderless="yes"
                    :aria-label="trans('common.layout.open_navigation')"
                    :aria-expanded="mobileOpen"
                    :aria-controls="mobileId"
                    @click="mobileOpen = true">
                    <IconMenu2 />
                </ButtonAction>
                <ButtonAction
                    v-if="sidebar && collapsible"
                    class="hidden md:inline-flex"
                    variant="default"
                    borderless="yes"
                    :aria-label="
                        trans(
                            collapsed
                                ? 'common.layout.expand_sidebar'
                                : 'common.layout.collapse_sidebar',
                        )
                    "
                    :aria-expanded="!collapsed"
                    :aria-controls="sidebarId"
                    @click="collapsed = !collapsed">
                    <IconLayoutSidebar />
                </ButtonAction>
                <div class="min-w-0 flex-1">
                    <slot name="header" :collapsed="collapsed">
                        <h1 v-if="title" class="truncate text-lg font-semibold">{{ title }}</h1>
                        <p v-if="description" class="truncate text-sm text-muted-foreground">
                            {{ description }}
                        </p>
                    </slot>
                </div>
                <slot name="actions" :mobile-open="mobileOpen" />
            </header>
            <div
                v-if="$slots.toolbar"
                data-slot="dashboard-toolbar"
                class="shrink-0 border-b border-border px-4 py-3 md:px-6">
                <slot name="toolbar" />
            </div>
            <div
                data-slot="dashboard-scroll-region"
                :scroll-region="scrollRegion ? '' : undefined"
                class="miru-dashboard-content min-h-0 min-w-0 flex-1"
                :class="$slots['app-bar'] && 'pb-28 lg:pb-0'">
                <div v-if="$slots.banner" class="px-4 pt-4 md:px-6"><slot name="banner" /></div>
                <div
                    :class="
                        cn(
                            'mx-auto w-full min-w-0',
                            padding === 'none'
                                ? ''
                                : padding === 'sm'
                                  ? 'p-3'
                                  : padding === 'lg'
                                    ? 'p-6 md:p-10'
                                    : 'p-4 md:p-6',
                        )
                    "
                    :style="{ maxWidth: cssLength(contentWidth) }">
                    <slot name="breadcrumbs">
                        <Breadcrumb v-if="breadcrumbs.length" class="mb-5">
                            <BreadcrumbList>
                                <template v-for="(entry, index) in breadcrumbs" :key="index">
                                    <BreadcrumbItem>
                                        <BreadcrumbPage v-if="index === breadcrumbs.length - 1">
                                            {{ entry.label }}
                                        </BreadcrumbPage>
                                        <BreadcrumbLink v-else-if="entry.href" as-child>
                                            <component :is="linkComponent" :href="entry.href">
                                                {{ entry.label }}
                                            </component>
                                        </BreadcrumbLink>
                                        <span v-else>{{ entry.label }}</span>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
                                </template>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </slot>
                    <main
                        :id="contentId"
                        tabindex="-1"
                        data-slot="dashboard-content"
                        class="min-w-0 outline-none">
                        <slot />
                    </main>
                </div>
                <footer
                    v-if="$slots.footer"
                    data-slot="dashboard-footer"
                    class="border-t border-border bg-muted/40 px-4 py-5 text-sm text-muted-foreground md:px-6">
                    <slot name="footer" />
                </footer>
            </div>
        </div>
        <slot name="app-bar" />
        <slot name="overlays" />

        <Sheet v-if="sidebar" v-model:open="mobileOpen">
            <SheetContent
                :id="mobileId"
                side="left"
                :class="cn('w-[min(22rem,100vw)]! gap-0 p-0', sidebarClass)">
                <SheetHeader class="shrink-0 border-b border-border px-5 py-5 pe-14">
                    <SheetTitle>{{ resolvedNavigationLabel }}</SheetTitle>
                    <SheetDescription class="sr-only">
                        {{ trans('common.layout.navigation_description') }}
                    </SheetDescription>
                </SheetHeader>
                <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
                    <div v-if="$slots.brand" class="mb-6">
                        <slot name="brand" :collapsed="false" />
                    </div>
                    <slot name="navigation" :collapsed="false" :close-mobile="closeMobile">
                        <DashboardNavigation
                            :groups="navigation"
                            :label="resolvedNavigationLabel"
                            :link-component="linkComponent"
                            @navigate="navigate" />
                    </slot>
                </div>
                <div v-if="$slots['sidebar-footer']" class="border-t border-border p-4">
                    <slot name="sidebar-footer" :collapsed="false" />
                </div>
            </SheetContent>
        </Sheet>
    </div>
</template>

<script setup lang="ts">
import type {
    DashboardBreadcrumb,
    DashboardNavigationGroup,
    DashboardNavigationItem,
} from './types';
import type { Component, CSSProperties, HTMLAttributes } from 'vue';
import { IconLayoutSidebar, IconMenu2 } from '@tabler/icons-vue';
import { computed, useId, watch } from 'vue';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../components/breadcrumb';
import { ButtonAction } from '../components/button-action';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '../components/sheet';
import { useBreakpoint } from '../composables/useBreakpoint';
import { useI18n } from '../composables/useI18n';
import { cn } from '../support/classNames';
import DashboardNavigation from './dashboard/DashboardNavigation.vue';

const props = withDefaults(
    defineProps<{
        title?: string;
        description?: string;
        navigation?: readonly DashboardNavigationGroup[];
        breadcrumbs?: readonly DashboardBreadcrumb[];
        /** Native anchor by default; provide an href-compatible router adapter when needed. */
        linkComponent?: Component | string;
        navigationLabel?: string;
        sidebar?: boolean;
        collapsible?: boolean;
        sidebarWidth?: number | string;
        railWidth?: number | string;
        sidebarTone?: 'surface' | 'muted' | 'dark';
        surface?: 'flush' | 'inset';
        scroll?: 'content' | 'page';
        /** Mark the actual scroll container for host integrations such as Inertia. */
        scrollRegion?: boolean;
        headerSize?: 'sm' | 'default' | 'lg';
        stickyHeader?: boolean;
        padding?: 'none' | 'sm' | 'default' | 'lg';
        contentWidth?: number | string;
        class?: HTMLAttributes['class'];
    }>(),
    {
        navigation: () => [],
        breadcrumbs: () => [],
        linkComponent: 'a',
        sidebar: true,
        collapsible: true,
        sidebarWidth: '18rem',
        railWidth: '5.5rem',
        sidebarTone: 'muted',
        surface: 'inset',
        scroll: 'content',
        scrollRegion: false,
        headerSize: 'default',
        stickyHeader: true,
        padding: 'default',
    },
);

const collapsed = defineModel<boolean>('collapsed', { default: false });
const mobileOpen = defineModel<boolean>('mobileOpen', { default: false });
const emit = defineEmits<{ navigate: [item: DashboardNavigationItem, event: MouseEvent] }>();
const { trans } = useI18n();
const id = useId();
const contentId = `dashboard-content-${id}`;
const sidebarId = `dashboard-sidebar-${id}`;
const mobileId = `dashboard-mobile-${id}`;
const { matches: isDesktop } = useBreakpoint({ min: 'md' });
watch(isDesktop, (desktop) => {
    if (desktop) {
        mobileOpen.value = false;
    }
});
const resolvedNavigationLabel = computed(
    () => props.navigationLabel || trans('common.layout.navigation'),
);
const sidebarClass = computed(() =>
    props.sidebarTone === 'dark'
        ? 'dark bg-neutral-950 text-neutral-100'
        : props.sidebarTone === 'surface'
          ? 'bg-background text-foreground'
          : 'bg-muted text-foreground',
);
const layoutStyle = computed<CSSProperties>(() => ({
    '--dashboard-sidebar-width': cssLength(collapsed.value ? props.railWidth : props.sidebarWidth),
}));

function cssLength(value?: number | string): string | undefined {
    return typeof value === 'number' ? `${value}px` : value;
}
function closeMobile(): void {
    mobileOpen.value = false;
}
function navigate(item: DashboardNavigationItem, event: MouseEvent): void {
    emit('navigate', item, event);
    closeMobile();
}
</script>

<style scoped>
.miru-dashboard-page {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
}
.miru-dashboard-page[data-scroll='content'] {
    height: 100dvh;
    overflow: hidden;
}
.miru-dashboard-page[data-scroll='page'] {
    min-height: 100dvh;
}
.miru-dashboard-sidebar {
    display: none;
}
.miru-dashboard-page[data-scroll='content'] .miru-dashboard-content {
    overflow: auto;
    overscroll-behavior: contain;
}
@media (min-width: 768px) {
    .miru-dashboard-page[data-sidebar='true'] {
        grid-template-columns: var(--dashboard-sidebar-width) minmax(0, 1fr);
    }
    .miru-dashboard-sidebar {
        display: flex;
        position: sticky;
        top: 0;
        height: 100dvh;
    }
    .miru-dashboard-page[data-surface='inset'] .miru-dashboard-workspace {
        margin: 0.75rem;
        border: 1px solid var(--ui-border);
        border-radius: 1rem;
        overflow: clip;
    }
}
</style>
