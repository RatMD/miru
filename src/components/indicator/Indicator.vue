<template>
    <span
        ref="host"
        data-slot="indicator"
        :class="
            cn(
                'relative inline-flex shrink-0 items-center justify-center overflow-visible align-middle',
                props.class,
            )
        ">
        <span
            ref="target"
            data-slot="indicator-target"
            class="inline-flex min-w-0 flex-1 items-center justify-center"
            :style="maskStyle">
            <slot />
        </span>
        <span
            ref="bubble"
            v-if="shown"
            data-slot="indicator-bubble"
            :data-color="color"
            :data-position="overlay ? position : undefined"
            :data-content="hasContent || undefined"
            :aria-hidden="!accessible || undefined"
            :aria-label="ariaLabel"
            :role="announce && accessible ? 'status' : ariaLabel ? 'img' : undefined"
            :aria-live="announce && accessible ? 'polite' : undefined"
            :aria-atomic="announce && accessible ? true : undefined"
            :class="
                cn(
                    'pointer-events-none relative inline-flex shrink-0 items-center justify-center rounded-full',
                    overlay && 'absolute z-10',
                    hasContent
                        ? [
                              size === 'sm'
                                  ? 'h-2.5 min-w-2.5 text-[9px]'
                                  : size === 'lg'
                                    ? 'h-4.5 min-w-4.5 text-xs'
                                    : 'h-3.5 min-w-3.5 text-[10px]',
                              'px-1 font-medium leading-none whitespace-nowrap',
                          ]
                        : size === 'sm'
                          ? 'size-1'
                          : size === 'lg'
                            ? 'size-2'
                            : 'size-1.5',
                )
            "
            :style="placement">
            <span
                v-if="ping"
                data-slot="indicator-ping"
                class="absolute inset-0 animate-ping rounded-[inherit] opacity-75 motion-reduce:hidden"
                :style="{ backgroundColor: resolvedColor }" />
            <span
                data-slot="indicator-fill"
                :class="
                    cn(
                        'absolute inset-0 rounded-[inherit]',
                        pulse && 'animate-pulse motion-reduce:animate-none',
                    )
                "
                :style="{ backgroundColor: resolvedColor }" />
            <span
                v-if="hasContent"
                data-slot="indicator-content"
                :style="{ color: resolvedForeground }"
                class="relative inline-flex items-center justify-center gap-0.5">
                <slot name="indicator" :value="value" :display-value="displayValue">
                    <component
                        v-if="icon"
                        :is="icon"
                        :class="size === 'sm' ? 'size-2' : size === 'lg' ? 'size-3' : 'size-2.5'"
                        aria-hidden="true" />
                    <span v-if="displayValue !== undefined">{{ displayValue }}</span>
                </slot>
            </span>
        </span>
    </span>
</template>
<script setup lang="ts">
import type { IndicatorPosition } from './types';
import type { Component, CSSProperties, HTMLAttributes } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { computed, onMounted, ref, shallowRef, useSlots, watch } from 'vue';
import { cn } from '../../support/classNames';
import { indicatorColors } from './colors';
import { indicatorInk, indicatorMask, indicatorValue } from './helpers';
const props = withDefaults(
    defineProps<{
        /** Semantic variant or any CSS color, including hex and var(...). */
        color?: string;
        /** Optional text or count; omitted renders the original status dot. */
        value?: string | number | null;
        icon?: Component;
        /** Numeric cap, e.g. max=99 renders 120 as 99+. Strings are preserved. */
        max?: number;
        showZero?: boolean;
        foreground?: string;
        size?: 'sm' | 'default' | 'lg';
        overlay?: boolean;
        position?: IndicatorPosition;
        offsetX?: number | string;
        offsetY?: number | string;
        visible?: boolean;
        pulse?: boolean;
        ping?: boolean;
        /** Transparently remove the indicator shape from the wrapped content. */
        cutout?: boolean;
        /** Transparent gap around the visible indicator, in pixels. */
        cutoutGap?: number;
        ariaLabel?: string;
        announce?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    {
        color: 'default',
        size: 'default',
        overlay: false,
        position: 'top-right',
        offsetX: 0,
        offsetY: 0,
        visible: true,
        pulse: false,
        ping: false,
        showZero: true,
        announce: false,
        cutout: true,
        cutoutGap: 2,
    },
);
const slots = useSlots();
const host = ref<HTMLElement>();
const target = ref<HTMLElement>();
const bubble = ref<HTMLElement>();
const maskStyle = shallowRef<CSSProperties>();
const displayValue = computed(() => indicatorValue(props.value, props.max));
const hasContent = computed(
    () => displayValue.value !== undefined || !!props.icon || !!slots.indicator,
);
const accessible = computed(
    () => !!props.ariaLabel || displayValue.value !== undefined || !!slots.indicator,
);
const shown = computed(() => props.visible && (props.showZero || props.value !== 0));
function updateMask() {
    if (!props.overlay || !shown.value || !props.cutout || !target.value || !bubble.value) {
        maskStyle.value = undefined;
        return;
    }
    const bounds = target.value.getBoundingClientRect();
    const badge = bubble.value.getBoundingClientRect();
    if (!bounds.width || !bounds.height) {
        maskStyle.value = undefined;
        return;
    }
    const computedStyle = getComputedStyle(target.value);
    const width = parseFloat(computedStyle.width) || bounds.width;
    const height = parseFloat(computedStyle.height) || bounds.height;
    const scaleX = bounds.width / width,
        scaleY = bounds.height / height;
    maskStyle.value = indicatorMask(
        width,
        height,
        (badge.left - bounds.left) / scaleX,
        (badge.top - bounds.top) / scaleY,
        badge.width / scaleX,
        badge.height / scaleY,
        props.cutoutGap,
    );
}
onMounted(updateMask);
useResizeObserver([host, target, bubble], updateMask);
watch(
    () => [
        props.overlay,
        shown.value,
        props.cutout,
        props.cutoutGap,
        props.position,
        props.offsetX,
        props.offsetY,
        props.size,
    ],
    updateMask,
    { flush: 'post' },
);
const neutral = computed(() => ['default', 'outline', 'ghost', 'ghostly'].includes(props.color));
const semantic = computed(() => (indicatorColors as readonly string[]).includes(props.color));
const resolvedColor = computed(() =>
    props.color === 'current'
        ? 'currentColor'
        : neutral.value
          ? 'var(--ui-neutral-400)'
          : semantic.value
            ? `var(--ui-${props.color}${hasContent.value ? '' : '-500'})`
            : props.color,
);
const resolvedForeground = computed(
    () =>
        props.foreground ||
        (neutral.value
            ? 'var(--ui-neutral-950)'
            : props.color === 'current'
              ? 'var(--ui-background)'
              : semantic.value
                ? `var(--ui-${props.color}-foreground)`
                : indicatorInk(props.color)),
);
const length = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const placement = computed<CSSProperties | undefined>(() => {
    if (!props.overlay) return undefined;
    const [vertical, horizontal] =
        props.position === 'center' ? ['center', 'center'] : props.position.split('-');
    const x = horizontal === 'left' ? '-50%' : horizontal === 'right' ? '50%' : '-50%';
    const y = vertical === 'top' ? '-50%' : vertical === 'bottom' ? '50%' : '-50%';
    return {
        ...(vertical === 'center' ? { top: '50%' } : { [vertical!]: 0 }),
        ...(horizontal === 'center' ? { left: '50%' } : { [horizontal!]: 0 }),
        transform: `translate(calc(${x} + ${length(props.offsetX)}), calc(${y} + ${length(props.offsetY)}))`,
    };
});
</script>
