<template>
    <slot name="default" v-bind="props" :show="show" :hide="hide"></slot>

    <div ref="tooltip" :class="[
        'tooltip',
        `tooltip-${placementClass}`, 
        visible ? `is-visible` : '',
        props.color ? `tooltip-${props.color}` : '',
        props.center ? `text-center` : ''
    ]" :style="floatingStyles">
        <div ref="tooltipArrow" class="tooltip-arrow" :style="arrowStyles" v-if="props.arrow"></div>
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

    /**
     * Whether to show an arrow or not.
     */
    arrow?: boolean;

    /**
     * Whether to center the tooltip text or not.
     */
    center?: boolean;
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
import { useFloating, offset as offsetPlugin, arrow as arrowPlugin } from '@floating-ui/vue';
import { computed, nextTick, ref, watch } from 'vue';

// Define Component
const props = withDefaults(defineProps<TooltipStdProps>(), {
    placement: 'top',
    offset: 10
});
const slots = defineSlots<TooltipStdSlots>();

// States
const target = ref<HTMLElement>();
const tooltip = ref<HTMLElement>();
const tooltipArrow = ref<HTMLElement>();
const tooltipPlacement = ref<Placement>(props.placement);
const tooltipMiddleware = ref<Middleware[]>([
    offsetPlugin(props.offset || 0),
    arrowPlugin({ element: tooltipArrow })
]);
const timeout = ref<number>();
const visible = ref<boolean>(false);

// Calculate Tooltip Position
const { floatingStyles, placement: placementClass, middlewareData } = useFloating(target, tooltip, {
    placement: tooltipPlacement,
    middleware: tooltipMiddleware
});
const arrowStyles = computed(() => {
    const { x, y } = middlewareData.value.arrow || { x: null, y: null };
    return {
        top: y != null ? `${y}px`: '',
        left: x != null ? `${x}px`: '',
    }
})

/**
 * Watch Property Changes
 */
watch(props, () => {
    tooltipPlacement.value = props.placement || tooltipPlacement.value;
    tooltipMiddleware.value = [
        offsetPlugin(props.offset || 0),
        arrowPlugin({ element: tooltipArrow })
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
    max-width: 300px;
    --tooltip-background: theme(colors.gray.800);
    
    .dark & {
        --tooltip-background: theme(colors.gray.200);
    }
}

/** Colors */
.tooltip.tooltip-primary {
    @apply bg-primary-600 text-primary-50;
    --tooltip-background: theme(colors.primary.600);
}
.tooltip.tooltip-secondary {
    @apply bg-gray-600 text-gray-50;
    --tooltip-background: theme(colors.gray.600);
}
.tooltip.tooltip-success {
    @apply bg-success-600 text-success-50;
    --tooltip-background: theme(colors.success.600);
}
.tooltip.tooltip-warning {
    @apply bg-warning-600 text-warning-50;
    --tooltip-background: theme(colors.warning.600);
}
.tooltip.tooltip-danger {
    @apply bg-danger-600 text-danger-50;
    --tooltip-background: theme(colors.danger.600);
}
.tooltip.tooltip-info {
    @apply bg-info-600 text-info-50;
    --tooltip-background: theme(colors.info.600);
}

/** Placement */
.tooltip {
    @apply absolute flex gap-2 opacity-0 duration-300 ease-in-out;
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

/** Arrow */
.tooltip {
    & .tooltip-arrow {
        @apply absolute w-0 h-0 border-solid;
    }
    
    &.tooltip-top .tooltip-arrow,
    &.tooltip-top-start .tooltip-arrow,
    &.tooltip-top-end .tooltip-arrow {
        @apply top-full;
        border-width: 8px 8px 0 8px;
        border-color: var(--tooltip-background) transparent transparent transparent;
    }

    &.tooltip-right .tooltip-arrow,
    &.tooltip-right-start .tooltip-arrow,
    &.tooltip-right-end .tooltip-arrow {
        @apply right-full;
        border-width: 8px 8px 8px 0;
        border-color: transparent var(--tooltip-background) transparent transparent;
    }
    &.tooltip-right-start .tooltip-arrow {
        @apply -mt-1;
    }
    &.tooltip-right-end .tooltip-arrow {
        @apply mt-1;
    }

    &.tooltip-bottom .tooltip-arrow,
    &.tooltip-bottom-start .tooltip-arrow,
    &.tooltip-bottom-end .tooltip-arrow {
        @apply bottom-full;
        border-width: 0 8px 8px 8px;
        border-color: transparent transparent var(--tooltip-background) transparent;
    }
    
    &.tooltip-left .tooltip-arrow,
    &.tooltip-left-start .tooltip-arrow,
    &.tooltip-left-end .tooltip-arrow {
        @apply left-full;
        border-width: 8px 0 8px 8px;
        border-color: transparent transparent transparent var(--tooltip-background);
    }
    &.tooltip-left-start .tooltip-arrow {
        @apply -mt-1;
    }
    &.tooltip-left-end .tooltip-arrow {
        @apply mt-1;
    }
}
</style>
