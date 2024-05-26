<template>
    <slot name="default" v-bind="props" :toggle="toggle" :show="show" :hide="hide" :visible="visible"></slot>

    <div ref="popover" :class="[
        'popover',
        `popover-${placementClass}`, 
        visible ? `is-visible` : ''
    ]" :style="floatingStyles" v-click-outside="hide">
        <div ref="popoverArrow" class="popover-arrow" :style="arrowStyles" v-if="props.arrow"></div>

        <slot name="popover" v-bind="props" :toggle="toggle" :show="show" :hide="hide" :visible="visible">
            <div class="popover-content">
                <header v-if="$slots.header || props.title">
                    <slot name="header" v-bind="props" :toggle="toggle" :show="show" :hide="hide" :visible="visible">
                        <div class="popover-title">{{ props.title }}</div>
                    </slot>
                </header>
    
                <article v-if="$slots.content">
                    <slot name="content" v-bind="props" :toggle="toggle" :show="show" :hide="hide" :visible="visible"></slot>
                </article>
                
                <footer v-if="$slots.footer">
                    <slot name="footer" v-bind="props" :toggle="toggle" :show="show" :hide="hide" :visible="visible"></slot>
                </footer>
            </div>
        </slot>
    </div>
</template>

<script lang="ts">
import type { Middleware, Placement, OffsetOptions } from '@floating-ui/vue';

/**
 * PopoverStd Properties
 */
export interface PopoverStdProps {
    /**
     * The desired title shown as popover header unless the header slot is used.
     */
    title?: string;

    /**
     * The floating-ui placement option for this popover.
     */
    placement?: Placement;

    /**
     * The floating-ui offset option for this popover.
     */
    offset?: number | OffsetOptions;

    /**
     * Whether to show an arrow or not.
     */
    arrow?: boolean;
}

/**
 * PopoverStd Slots
 */
export interface PopoverStdSlotProps extends PopoverStdProps {
    /**
     * Visibility State
     */
    visible: boolean;
    
    /**
     * Toggle Popover
     * @param ev 
     */
    toggle: (ev: Event) => void;

    /**
     * Show Popover
     * @param ev 
     */
    show: (ev: Event) => void;

    /**
     * Hide Popover
     * @param ev 
     */
    hide: (ev: Event) => void;
}

export interface PopoverStdSlots {
    /**
     * The default slot is used for the trigger / target element on which the popover relies on.
     * @param props 
     */
    default(props: PopoverStdSlotProps): any;

    /**
     * The popover slot allows to replace the whole inner popover structure with a custom one.
     * @param props 
     */
    popover(props: PopoverStdSlotProps): any;

    /**
     * The header slot is used instead of the title property.
     * @param props 
     */
    header(props: PopoverStdSlotProps): any;

    /**
     * The content slot is shown inside the content area of the popover.
     * @param props 
     */
    content(props: PopoverStdSlotProps): any;

    /**
     * The footer slot is shown inside the footer area of the popover.
     * @param props 
     */
    footer(props: PopoverStdSlotProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'PopoverStd'
}
</script>

<script lang="ts" setup>
import { useFloating, offset as offsetPlugin, arrow as arrowPlugin } from '@floating-ui/vue';
import { computed, ref, watch } from 'vue';

// Define Component
const props = withDefaults(defineProps<PopoverStdProps>(), {
    placement: 'top',
    offset: 10,
    arrow: true
});
const slots = defineSlots<PopoverStdSlots>();

// States
const target = ref<HTMLElement>();
const popover = ref<HTMLElement>();
const popoverArrow = ref<HTMLElement>();
const popoverPlacement = ref<Placement>(props.placement);
const popoverMiddleware = ref<Middleware[]>([
    offsetPlugin(props.offset || 0),
    arrowPlugin({ element: popoverArrow })
]);
const visible = ref<boolean>(false);

// Calculate Popover Position
const { floatingStyles, placement: placementClass, middlewareData } = useFloating(target, popover, {
    placement: popoverPlacement,
    middleware: popoverMiddleware
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
    popoverPlacement.value = props.placement || popoverPlacement.value;
    popoverMiddleware.value = [
        offsetPlugin(props.offset || 0),
        arrowPlugin({ element: popoverArrow })
    ];
});

/**
 * Toggle Popover
 * @param ev 
 */
function toggle(ev: Event | PointerEvent) {
    if (!visible.value) {
        show(ev);
    } else {
        hide(ev);
    }
}

/**
 * Show Popover
 * @param ev 
 */
function show(ev: Event | PointerEvent) {
    if (!visible.value) {
        target.value = ev.target as HTMLElement;
        visible.value = true;
    }
}

/**
 * Hide Popover
 * @param ev 
 */
function hide(ev: Event | PointerEvent) {
    if (visible.value) {
        target.value = void 0;
        visible.value = false;
    }
}

// Expose Component
defineExpose({
    toggle,
    show,
    hide,
    target,
    popover,
    visible
});
</script>

<style scoped>
.popover {
    --popover-background: theme(backgroundColor.white);
}

.popover {
    @apply w-auto h-auto absolute flex flex-col opacity-0;
    @apply duration-300 ease-in-out;
    z-index: 99;
    transition-property: opacity, margin;
    
    &.is-visible {
        @apply opacity-100;
    }
    
    &.popover-top,
    &.popover-top-start,
    &.popover-top-end {
        @apply mt-2;

        &.is-visible {
            @apply mt-0;
        }
    }

    &.popover-right,
    &.popover-right-start,
    &.popover-right-end {
        @apply -ml-2;

        &.is-visible {
            @apply ml-0;
        }
    }

    &.popover-bottom,
    &.popover-bottom-start,
    &.popover-bottom-end {
        @apply -mb-6;

        &.is-visible {
            @apply -mb-0;
        }
    }
    
    &.popover-left,
    &.popover-left-start,
    &.popover-left-end {
        @apply ml-2;

        &.is-visible {
            @apply ml-0;
        }
    }
}

.popover :slotted(.popover-content) {
    @apply w-max flex text-xs font-semibold rounded-md;
    @apply bg-white text-gray-800 shadow-gray-300 dark:bg-gray-100 dark:shadow-gray-900;
    box-shadow: 0 0 0 1px var(--tw-shadow-color), 
                0 4px 2px -2px var(--tw-shadow-color);
}

/** Arrow */
.popover {
    & .popover-arrow {
        @apply absolute w-0 h-0 border-solid;
    }
    
    &.popover-top .popover-arrow,
    &.popover-top-start .popover-arrow,
    &.popover-top-end .popover-arrow {
        @apply top-full;
        border-width: 8px 8px 0 8px;
        border-color: var(--popover-background) transparent transparent transparent;
    }

    &.popover-right .popover-arrow,
    &.popover-right-start .popover-arrow,
    &.popover-right-end .popover-arrow {
        @apply right-full;
        border-width: 8px 8px 8px 0;
        border-color: transparent var(--popover-background) transparent transparent;
    }
    &.popover-right-start .popover-arrow {
        @apply -mt-1;
    }
    &.popover-right-end .popover-arrow {
        @apply mt-1;
    }

    &.popover-bottom .popover-arrow,
    &.popover-bottom-start .popover-arrow,
    &.popover-bottom-end .popover-arrow {
        @apply bottom-full;
        border-width: 0 8px 8px 8px;
        border-color: transparent transparent var(--popover-background) transparent;
    }
    
    &.popover-left .popover-arrow,
    &.popover-left-start .popover-arrow,
    &.popover-left-end .popover-arrow {
        @apply left-full;
        border-width: 8px 0 8px 8px;
        border-color: transparent transparent transparent var(--popover-background);
    }
    &.popover-left-start .popover-arrow {
        @apply -mt-1;
    }
    &.popover-left-end .popover-arrow {
        @apply mt-1;
    }
}
</style>
