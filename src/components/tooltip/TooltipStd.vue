<template>
    <slot name="default" v-bind="props" :show="show" :hide="hide"></slot>

    <div ref="tooltip" :class="[
        'tooltip',
        `tooltip-${placementClass}`, 
        visible ? `is-visible` : '',
        props.color ? `tooltip-${props.color}` : ''
    ]" :style="floatingStyles">
        <slot name="tooltip" v-bind="props">
            <span>{{ props.label }}</span>
        </slot>
    </div>
</template>

<script lang="ts">
import type { Middleware, Placement, OffsetOptions } from '@floating-ui/vue';

/**
 * TooltipStd Properties
 */
export interface TooltipStdProps {
    /**
     * The desired color used for this tooltip.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

    /**
     * The desired label text for this tooltip, used when no slot is passed.
     */
    label?: string;

    /**
     * The amount of milliseconds until the tooltip starts to get visible.
     */
    delay?: number;

    /**
     * The floating-ui placement option for this tooltip.
     */
    placement?: Placement;

    /**
     * The floating-ui offset option for this tooltip.
     */
    offset?: OffsetOptions;
}

/**
 * TooltipStd Slots
 */
export interface TooltipStdSlots {
    /**
     * Default content slot, used instead of the label property.
     * @param props 
     */
    default(props: TooltipStdProps & { show: (ev: Event) => void, hide: (ev: Event) => void }): any;

    /**
     * Tooltip content slot, used instead of the label property.
     * @param props 
     */
    tooltip(props: TooltipStdProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'TooltipStd'
}
</script>

<script lang="ts" setup>
import { useFloating, offset as offsetPlugin } from '@floating-ui/vue';
import { nextTick, ref, watch } from 'vue';

// Define Component
const props = withDefaults(defineProps<TooltipStdProps>(), {
    placement: 'top',
    offset: 10
});
const slots = defineSlots<TooltipStdSlots>();

// States
const target = ref<HTMLElement>();
const tooltip = ref<HTMLElement>();
const tooltipPlacement = ref<Placement>(props.placement);
const tooltipMiddleware = ref<Middleware[]>([
    offsetPlugin(props.offset || 0)
]);
const timeout = ref<number>();
const visible = ref<boolean>(false);

// Calculate Tooltip Position
const { floatingStyles, placement: placementClass } = useFloating(target, tooltip, {
    placement: tooltipPlacement,
    middleware: tooltipMiddleware
});

/**
 * Watch Property Changes
 */
watch(props, () => {
    tooltipPlacement.value = props.placement || tooltipPlacement.value;
    tooltipMiddleware.value = [
        offsetPlugin(props.offset || 0)
    ];
});

/**
 * Show Tooltip
 * @param ev 
 */
function show(ev: Event | PointerEvent) {
    if (props.delay) {
        timeout.value = setTimeout(() => {
            target.value = ev.target as HTMLElement;
            visible.value = true;
        }, props.delay) as any as number;
    } else {
        target.value = ev.target as HTMLElement;
        visible.value = true;
    }
}

/**
 * Hide Tooltip
 * @param ev 
 */
function hide(ev: Event | PointerEvent) {
    if (props.delay) {
        clearTimeout(timeout.value);
        nextTick(() => {
            target.value = void 0;
            visible.value = false;
        });
    } else {
        target.value = void 0;
        visible.value = false;
    }
}

// Expose Component
defineExpose({
    show,
    hide,
    target,
    tooltip
})
</script>

<style scoped>
.tooltip {
    @apply w-max flex px-3 py-1.5 text-xs font-semibold opacity-100 rounded pointer-events-none;
    @apply bg-gray-800 text-gray-50 dark:bg-gray-200 dark:text-gray-800;
}

/** Colors */
.tooltip.tooltip-primary {
    @apply bg-primary-600 text-primary-50;
}
.tooltip.tooltip-secondary {
    @apply bg-gray-600 text-gray-50;
}
.tooltip.tooltip-success {
    @apply bg-success-600 text-success-50;
}
.tooltip.tooltip-warning {
    @apply bg-warning-600 text-warning-50;
}
.tooltip.tooltip-danger {
    @apply bg-danger-600 text-danger-50;
}
.tooltip.tooltip-info {
    @apply bg-info-600 text-info-50;
}

.tooltip {
    @apply absolute opacity-0 duration-300 ease-in-out;
    z-index: 90;
    transition-property: opacity, margin;

    &.is-visible {
        @apply opacity-100;
    }
    
    &.tooltip-top,
    &.tooltip-top-start,
    &.tooltip-top-end {
        @apply mt-2;

        &.is-visible {
            @apply mt-0;
        }
    }

    &.tooltip-right,
    &.tooltip-right-start,
    &.tooltip-right-end {
        @apply -ml-2;

        &.is-visible {
            @apply ml-0;
        }
    }

    &.tooltip-bottom,
    &.tooltip-bottom-start,
    &.tooltip-bottom-end {
        @apply -mt-2;

        &.is-visible {
            @apply mt-0;
        }
    }
    
    &.tooltip-left,
    &.tooltip-left-start,
    &.tooltip-left-end {
        @apply ml-2;

        &.is-visible {
            @apply ml-0;
        }
    }
}
</style>
