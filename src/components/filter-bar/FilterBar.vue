<template>
    <div
        ref="container"
        data-slot="filter-bar"
        :data-size="size"
        :class="cn('relative flex flex-1 items-center gap-2', props.class)"
        :style="{ minWidth: moreWidth + 'px' }">
        <FilterBadge
            v-for="item in visible"
            :key="item.key"
            :label="text(item)"
            :count="item.count"
            :size="size"
            :selected="item.selected"
            :removable="item.removable"
            :disabled="disabled"
            @remove="activate(item)"
            @select="activate(item)" />
        <Popover v-if="overflow" v-model:open="open">
            <PopoverTrigger as-child>
                <Badge
                    as="button"
                    type="button"
                    data-slot="filter-bar-more"
                    variant="ghostly"
                    :class="moreClass"
                    :style="{
                        height: metrics.height + 'px',
                        minWidth: metrics.more + 'px',
                    }"
                    :disabled="disabled"
                    :aria-label="trans('common.accessibility.more') + ' (+' + hiddenCount + ')'">
                    +{{ hiddenCount }}
                </Badge>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                class="w-max max-w-[calc(100vw-2rem)] p-2"
                @escape-key-down.stop>
                <PopoverArrow />
                <div
                    ref="popup"
                    data-slot="filter-bar-list"
                    class="flex max-h-64 flex-col items-start gap-2 overflow-y-auto">
                    <FilterBadge
                        v-for="item in items"
                        :key="item.key"
                        :label="text(item)"
                        :count="item.count"
                        :size="size"
                        :selected="item.selected"
                        :removable="item.removable"
                        :disabled="disabled"
                        :style="{ minHeight: metrics.height + 'px' }"
                        class="h-auto max-w-full whitespace-normal [&>span]:break-words"
                        @remove="activate(item)"
                        @select="activate(item)" />
                </div>
            </PopoverContent>
        </Popover>
        <div
            aria-hidden="true"
            inert
            class="pointer-events-none invisible absolute inset-0 overflow-hidden">
            <div ref="measurement" class="flex w-max gap-2">
                <FilterBadge
                    v-for="item in items"
                    :key="item.key"
                    data-measure
                    :label="text(item)"
                    :count="item.count"
                    :size="size"
                    :selected="item.selected"
                    :removable="item.removable" />
            </div>
            <div ref="moreMeasurement" class="flex w-max gap-2">
                <Badge
                    v-for="remaining in items.length"
                    :key="remaining"
                    data-measure-more
                    variant="ghostly"
                    :class="moreClass"
                    :style="{ height: metrics.height + 'px', minWidth: metrics.more + 'px' }">
                    +{{ remaining }}
                </Badge>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { FilterBadgeSize } from './types';
import type { HTMLAttributes } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Badge } from '../badge';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '../popover';
import FilterBadge from './FilterBadge.vue';
import { filterBadgeMetrics } from './types';
export interface FilterBarItem {
    key: string;
    label: string;
    value?: string;
    count?: number | string;
    selected?: boolean;
    removable?: boolean;
}
const props = withDefaults(
    defineProps<{
        items: readonly FilterBarItem[];
        size?: FilterBadgeSize;
        disabled?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    { disabled: false, size: 'default' },
);
const emit = defineEmits<{ remove: [key: string]; select: [key: string] }>();
const { trans } = useI18n();
const container = ref<HTMLElement>(),
    measurement = ref<HTMLElement>(),
    moreMeasurement = ref<HTMLElement>(),
    popup = ref<HTMLElement>();
const count = ref(0),
    open = ref(false);
const metrics = computed(() => filterBadgeMetrics[props.size]);
const moreWidth = ref<number>(filterBadgeMetrics[props.size].more);
const moreClass = computed(() =>
    cn(
        'shrink-0 justify-center rounded-full border-border px-2.5! py-0! tabular-nums',
        { sm: 'text-[11px]', default: 'text-xs', lg: 'text-sm' }[props.size],
    ),
);
const hiddenCount = computed(() => props.items.length - count.value);
const visible = computed(() => props.items.slice(0, count.value));
const overflow = computed(() => count.value < props.items.length);
function text(item: FilterBarItem): string {
    return item.value ? item.label + ': ' + item.value : item.label;
}
async function activate(item: FilterBarItem): Promise<void> {
    if (props.disabled) return;
    if (item.removable !== false) emit('remove', item.key);
    else emit('select', item.key);
    await nextTick();
    if (open.value && document.activeElement === document.body)
        popup.value?.querySelector<HTMLButtonElement>('button')?.focus();
}
function measure(): void {
    const width = container.value?.clientWidth ?? 0,
        row = measurement.value;
    if (!row) return;
    const widths = [...row.querySelectorAll<HTMLElement>('[data-measure]')].map(
            (el) => el.getBoundingClientRect().width,
        ),
        total = widths.reduce((a, b) => a + b, 0) + Math.max(0, widths.length - 1) * 8;
    if (total <= width) {
        count.value = props.items.length;
        return;
    }
    const moreWidths = [
        ...(moreMeasurement.value?.querySelectorAll<HTMLElement>('[data-measure-more]') ?? []),
    ].map((el) => el.getBoundingClientRect().width);
    let used = 0;
    let visibleCount = 0;
    for (let n = 1; n < widths.length; n++) {
        used += (n > 1 ? 8 : 0) + widths[n - 1];
        const remainingWidth = moreWidths[widths.length - n - 1] ?? metrics.value.more;
        if (used + 8 + remainingWidth <= width) visibleCount = n;
    }
    count.value = visibleCount;
    moreWidth.value = moreWidths[props.items.length - visibleCount - 1] ?? metrics.value.more;
}
useResizeObserver(container, measure);
useResizeObserver(measurement, measure);
useResizeObserver(moreMeasurement, measure);
watch(
    () => [props.items, props.size],
    () => {
        void nextTick(measure);
        if (!props.items.length) open.value = false;
    },
    { deep: true, immediate: true, flush: 'post' },
);
onMounted(() => {
    measure();
    void document.fonts?.ready.then(measure);
});
</script>
