<template>
    <TabsRoot
        data-slot="tabs"
        :data-variant="variant"
        v-model="model"
        class="w-full max-w-full min-w-0 overflow-hidden"
        :class="{ 'flex min-h-0': isVertical }"
        :default-value="defaultValue"
        :orientation="orientation">
        <div
            ref="tabBar"
            class="relative min-w-0 border-border"
            :class="[
                isVertical ? 'w-52 shrink-0 border-r' : 'shrink-0 border-b',
                inset && !isVertical ? 'px-4 md:px-6' : '',
            ]">
            <TabsList
                class="relative flex min-w-0 flex-nowrap gap-1 overflow-hidden"
                :class="{ 'flex-col py-3': isVertical }"
                :aria-label="ariaLabel">
                <TabsTrigger
                    data-slot="tabs-trigger"
                    :data-variant="tabVariant(tab)"
                    v-for="tab in visibleTabs"
                    :key="tab.value"
                    :value="tab.value"
                    :disabled="tab.disabled"
                    :data-line-tab-value="tab.value"
                    class="relative inline-flex shrink-0 cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors duration-200 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-muted-foreground"
                    :class="[
                        { 'w-full text-left': isVertical },
                        activeTextClass(tab),
                        tab.class,
                        !isVertical && tab.separatorBefore
                            ? 'ml-6 before:absolute before:top-1/2 before:-left-3 before:h-5 before:-translate-y-1/2 before:border-l before:border-border'
                            : '',
                    ]">
                    <span v-if="tab.icon" class="relative inline-flex shrink-0">
                        <component :is="tab.icon" class="size-4 shrink-0" aria-hidden="true" />
                        <span
                            v-if="tab.attention && tab.attentionPosition === 'icon'"
                            class="absolute -top-1 -right-1 size-2 rounded-full bg-danger-600 ring-2 ring-background"
                            role="img"
                            :aria-label="tab.attention"
                            :title="tab.attention" />
                    </span>
                    {{ tab.label }}
                    <span
                        v-if="tab.attention && (tab.attentionPosition !== 'icon' || !tab.icon)"
                        class="size-2 shrink-0 rounded-full bg-danger"
                        role="img"
                        :aria-label="tab.attention"
                        :title="tab.attention" />
                    <Badge
                        v-if="tab.badge !== undefined"
                        variant="ghostly"
                        class="-ml-1 rounded-full px-1.5 text-xs">
                        {{ tab.badge }}
                    </Badge>
                </TabsTrigger>

                <Popover v-if="hiddenTabs.length > 0 && isDesktop" v-model:open="overflowOpen">
                    <PopoverTrigger as-child>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            class="ml-auto size-10 shrink-0 p-0"
                            :aria-label="trans('common.accessibility.more')">
                            <IconDots class="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" class="w-56 p-1">
                        <Button
                            v-for="tab in hiddenTabs"
                            :key="tab.value"
                            type="button"
                            variant="ghost"
                            class="w-full justify-start"
                            :class="[
                                tab.class,
                                tab.value === model
                                    ? inlineTextVariants({ variant: tabVariant(tab) })
                                    : '',
                            ]"
                            :disabled="tab.disabled"
                            @click="selectOverflowTab(tab)">
                            <span v-if="tab.icon" class="relative inline-flex shrink-0">
                                <component
                                    :is="tab.icon"
                                    class="size-4 shrink-0"
                                    aria-hidden="true" />
                                <span
                                    v-if="tab.attention && tab.attentionPosition === 'icon'"
                                    class="absolute -top-1 -right-1 size-2 rounded-full bg-danger-600 ring-2 ring-background"
                                    role="img"
                                    :aria-label="tab.attention"
                                    :title="tab.attention" />
                            </span>
                            {{ tab.label }}
                            <span
                                v-if="
                                    tab.attention && (tab.attentionPosition !== 'icon' || !tab.icon)
                                "
                                class="size-2 shrink-0 rounded-full bg-danger"
                                role="img"
                                :aria-label="tab.attention"
                                :title="tab.attention" />
                            <Badge
                                v-if="tab.badge !== undefined"
                                variant="ghostly"
                                class="ml-auto rounded-full">
                                {{ tab.badge }}
                            </Badge>
                        </Button>
                    </PopoverContent>
                </Popover>

                <Drawer v-else-if="hiddenTabs.length > 0" v-model:open="overflowOpen">
                    <DrawerTrigger as-child>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            class="ml-auto size-10 shrink-0 p-0"
                            :aria-label="trans('common.accessibility.more')">
                            <IconDots class="size-5" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent class="md:hidden">
                        <DrawerHeader class="border-b pr-12">
                            <DrawerTitle>{{ trans('common.accessibility.more') }}</DrawerTitle>
                            <DrawerDescription>{{ ariaLabel }}</DrawerDescription>
                        </DrawerHeader>
                        <div class="overflow-y-auto p-2">
                            <Button
                                v-for="tab in hiddenTabs"
                                :key="tab.value"
                                type="button"
                                variant="ghost"
                                class="w-full justify-start"
                                :class="tab.class"
                                :disabled="tab.disabled"
                                @click="selectOverflowTab(tab)">
                                <span v-if="tab.icon" class="relative inline-flex shrink-0">
                                    <component
                                        :is="tab.icon"
                                        class="size-4 shrink-0"
                                        aria-hidden="true" />
                                    <span
                                        v-if="tab.attention && tab.attentionPosition === 'icon'"
                                        class="absolute -top-1 -right-1 size-2 rounded-full bg-danger-600 ring-2 ring-background"
                                        role="img"
                                        :aria-label="tab.attention"
                                        :title="tab.attention" />
                                </span>
                                {{ tab.label }}
                                <span
                                    v-if="
                                        tab.attention &&
                                        (tab.attentionPosition !== 'icon' || !tab.icon)
                                    "
                                    class="size-2 shrink-0 rounded-full bg-danger"
                                    role="img"
                                    :aria-label="tab.attention"
                                    :title="tab.attention" />
                                <Badge
                                    v-if="tab.badge !== undefined"
                                    variant="ghostly"
                                    class="ml-auto rounded-full">
                                    {{ tab.badge }}
                                </Badge>
                            </Button>
                        </div>
                    </DrawerContent>
                </Drawer>
            </TabsList>

            <span
                aria-hidden="true"
                data-slot="tabs-indicator"
                class="pointer-events-none absolute bg-current opacity-0 transition-[transform,width,height,opacity,color] duration-300 ease-out"
                :class="[
                    tabs.find((tab) => tab.value === model)?.indicatorClass ??
                        inlineTextVariants({
                            variant: tabVariant(tabs.find((tab) => tab.value === model)),
                        }),
                    isVertical
                        ? 'top-0 -right-px w-[3px] rounded-l-full'
                        : '-bottom-px left-0 h-[3px] rounded-t-full',
                    { 'opacity-100': indicator.visible },
                ]"
                :style="
                    isVertical
                        ? {
                              transform: `translateY(${indicator.top}px)`,
                              height: `${indicator.height}px`,
                          }
                        : {
                              transform: `translateX(${indicator.left}px)`,
                              width: `${indicator.width}px`,
                          }
                " />

            <div
                ref="measurementList"
                aria-hidden="true"
                class="invisible absolute top-0 left-0 flex h-0 flex-nowrap gap-1 overflow-hidden whitespace-nowrap">
                <span
                    v-for="tab in tabs"
                    :key="tab.value"
                    :data-line-tab-measure="tab.value"
                    :style="tab.separatorBefore ? { paddingLeft: '40px' } : undefined"
                    class="inline-flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium">
                    <span v-if="tab.icon" class="relative inline-flex shrink-0">
                        <component :is="tab.icon" class="size-4 shrink-0" aria-hidden="true" />
                        <span
                            v-if="tab.attention && tab.attentionPosition === 'icon'"
                            class="absolute -top-1 -right-1 size-2 rounded-full bg-danger-600 ring-2 ring-background"
                            role="img"
                            :aria-label="tab.attention"
                            :title="tab.attention" />
                    </span>
                    {{ tab.label }}
                    <span
                        v-if="tab.attention && (tab.attentionPosition !== 'icon' || !tab.icon)"
                        class="size-2 shrink-0 rounded-full bg-danger"
                        role="img"
                        :aria-label="tab.attention"
                        :title="tab.attention" />
                    <Badge
                        v-if="tab.badge !== undefined"
                        variant="ghostly"
                        class="-ml-1 rounded-full px-1.5 text-xs">
                        {{ tab.badge }}
                    </Badge>
                </span>
            </div>
        </div>

        <template v-if="content">
            <TabsContent
                v-for="tab in tabs"
                :key="tab.value"
                :value="tab.value"
                :force-mount="!unmountOnHide"
                v-show="unmountOnHide || tab.value === model"
                :class="
                    cn(
                        'w-full max-w-full min-w-0 overflow-hidden pt-6 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        isVertical && 'min-h-0 flex-1 px-6 pt-3 pb-3',
                        contentClass,
                    )
                ">
                <slot :name="tab.value" />
            </TabsContent>
        </template>
    </TabsRoot>
</template>

<script lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { Component, HTMLAttributes } from 'vue';

export interface TabItem {
    value: string;
    label: string;
    icon?: Component;
    disabled?: boolean;
    badge?: number;
    separatorBefore?: boolean;
    attention?: string;
    attentionPosition?: 'label' | 'icon';
    /** Override the Tabs variant for this item. */
    variant?: InlineVariant;
    tone?: 'default' | 'warning' | 'success' | 'danger';
    /** Optional presentation for a distinct tab, including end alignment. */
    class?: HTMLAttributes['class'];
    /** Optional color for the animated indicator when this tab is selected. */
    indicatorClass?: HTMLAttributes['class'];
}
</script>

<script setup lang="ts">
import { IconDots } from '@tabler/icons-vue';
import { useMediaQuery } from '@vueuse/core';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Badge } from '../badge';
import { Button } from '../button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../drawer';
import { inlineActiveTextVariants, inlineTextVariants } from '../inline-variants';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
const { trans, transChoice, locale } = useI18n();

/** Prefer an item's explicit variant, then its legacy status tone, then the root variant. */
function tabVariant(tab?: TabItem): InlineVariant {
    return tab?.variant ?? (tab?.tone && tab.tone !== 'default' ? tab.tone : props.variant);
}
function activeTextClass(tab: TabItem): string {
    return inlineActiveTextVariants({ variant: tabVariant(tab) });
}

const TAB_GAP = 4;
const OVERFLOW_TRIGGER_WIDTH = 40;

const props = withDefaults(
    defineProps<{
        tabs: TabItem[];
        variant?: InlineVariant;
        modelValue?: string;
        defaultValue?: string;
        ariaLabel?: string;
        content?: boolean;
        /** Preserve editors and upload state when switching panes. */
        unmountOnHide?: boolean;
        /** Inset the tab group while preserving a full-width divider. */
        inset?: boolean;
        orientation?: 'horizontal' | 'vertical';
        /** Keep every tab visible when the caller reserves enough space. */
        collapseOverflow?: boolean;
        contentClass?: HTMLAttributes['class'];
    }>(),
    {
        variant: 'primary',
        content: true,
        unmountOnHide: true,
        orientation: 'horizontal',
        collapseOverflow: true,
    },
);
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const tabBar = ref<HTMLElement>();
const measurementList = ref<HTMLElement>();
const visibleValues = ref<string[]>(props.tabs.map((tab) => tab.value));
const overflowOpen = ref(false);
const isDesktop = useMediaQuery('(min-width: 768px)');
const indicator = reactive({ left: 0, top: 0, width: 0, height: 0, visible: false });
const isVertical = computed(() => props.orientation === 'vertical');
let resizeObserver: ResizeObserver | undefined;

const model = computed<string>({
    get: () => props.modelValue ?? props.defaultValue ?? props.tabs[0]?.value ?? '',
    set: (value) => emit('update:modelValue', String(value)),
});
const visibleTabs = computed(() =>
    props.collapseOverflow
        ? props.tabs.filter((tab) => visibleValues.value.includes(tab.value))
        : props.tabs,
);
const hiddenTabs = computed(() =>
    props.collapseOverflow
        ? props.tabs.filter((tab) => !visibleValues.value.includes(tab.value))
        : [],
);

onMounted(() => {
    resizeObserver = new ResizeObserver(updateLayout);

    if (tabBar.value) {
        resizeObserver.observe(tabBar.value);
    }
    if (measurementList.value) {
        resizeObserver.observe(measurementList.value);
    }

    updateLayout();
});

onBeforeUnmount(() => resizeObserver?.disconnect());

watch(
    () => props.tabs,
    () => nextTick(updateLayout),
    { deep: true },
);
watch(model, updateLayout);
watch(
    () => [isVertical.value, props.collapseOverflow],
    () => {
        overflowOpen.value = false;
        void nextTick(updateLayout);
    },
);
watch(isDesktop, () => {
    overflowOpen.value = false;
});

function updateLayout(): void {
    if (isVertical.value || !props.collapseOverflow) {
        visibleValues.value = props.tabs.map((tab) => tab.value);
        void nextTick(updateIndicator);
        return;
    }

    const barStyle = tabBar.value ? getComputedStyle(tabBar.value) : null;
    const availableWidth =
        (tabBar.value?.clientWidth ?? 0) -
        parseFloat(barStyle?.paddingLeft ?? '0') -
        parseFloat(barStyle?.paddingRight ?? '0');
    const measuredTabs = Array.from(
        measurementList.value?.querySelectorAll<HTMLElement>('[data-line-tab-measure]') ?? [],
    );

    if (availableWidth === 0 || measuredTabs.length !== props.tabs.length) {
        void nextTick(updateIndicator);
        return;
    }

    const widths = new Map(
        measuredTabs.map((element) => [element.dataset.lineTabMeasure ?? '', element.offsetWidth]),
    );
    const totalWidth = props.tabs.reduce(
        (width, tab, index) => width + (widths.get(tab.value) ?? 0) + (index > 0 ? TAB_GAP : 0),
        0,
    );

    if (totalWidth <= availableWidth) {
        visibleValues.value = props.tabs.map((tab) => tab.value);
        void nextTick(updateIndicator);
        return;
    }

    const availableTabWidth = Math.max(0, availableWidth - OVERFLOW_TRIGGER_WIDTH - TAB_GAP);
    const nextVisibleValues: string[] = [];
    let usedWidth = 0;

    for (const tab of props.tabs) {
        const tabWidth = widths.get(tab.value) ?? 0;
        const requiredWidth = tabWidth + (nextVisibleValues.length > 0 ? TAB_GAP : 0);

        if (nextVisibleValues.length > 0 && usedWidth + requiredWidth > availableTabWidth) {
            break;
        }

        nextVisibleValues.push(tab.value);
        usedWidth += requiredWidth;
    }

    if (!nextVisibleValues.includes(model.value)) {
        const activeWidth = widths.get(model.value) ?? 0;

        while (
            nextVisibleValues.length > 0 &&
            visibleWidth(nextVisibleValues, widths) + TAB_GAP + activeWidth > availableTabWidth
        ) {
            nextVisibleValues.pop();
        }

        nextVisibleValues.push(model.value);
    }

    visibleValues.value = nextVisibleValues;
    void nextTick(updateIndicator);
}

function visibleWidth(values: string[], widths: Map<string, number>): number {
    return values.reduce(
        (width, value, index) => width + (widths.get(value) ?? 0) + (index > 0 ? TAB_GAP : 0),
        0,
    );
}

function updateIndicator(): void {
    const activeTab = Array.from(
        tabBar.value?.querySelectorAll<HTMLElement>('[data-line-tab-value]') ?? [],
    ).find((element) => element.dataset.lineTabValue === model.value);

    if (!activeTab) {
        indicator.visible = false;
        return;
    }

    const barBounds = tabBar.value?.getBoundingClientRect();
    const activeBounds = activeTab.getBoundingClientRect();
    indicator.left = activeBounds.left - (barBounds?.left ?? 0);
    indicator.top = activeBounds.top - (barBounds?.top ?? 0);
    indicator.width = activeTab.offsetWidth;
    indicator.height = activeTab.offsetHeight;
    indicator.visible = true;
}

function selectOverflowTab(tab: TabItem): void {
    overflowOpen.value = false;
    model.value = tab.value;
}
</script>
