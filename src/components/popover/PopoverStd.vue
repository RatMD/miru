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
                <header class="popover-header" v-if="$slots.header || props.title">
                    <slot name="header" v-bind="props" :toggle="toggle" :show="show" :hide="hide" :visible="visible">
                        <div class="popover-title">{{ props.title }}</div>
                    </slot>
                </header>
    
                <article class="popover-article" v-if="$slots.content">
                    <slot name="content" v-bind="props" :toggle="toggle" :show="show" :hide="hide" :visible="visible"></slot>
                </article>
                
                <footer class="popover-footer" v-if="$slots.footer">
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
    placement: 'bottom',
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
    --popover-shadow: 212 212 216;
}

.popover {
    @apply w-auto h-auto max-w-64 absolute flex flex-col opacity-0 pointer-events-none;
    @apply duration-300 ease-in-out;
    z-index: 99;
    transition-property: opacity, margin;
    
    &.is-visible {
        @apply opacity-100 pointer-events-auto;
    }
}

/* Popover Position */
.popover {
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

/* Popover Arrow */
.popover {
    & .popover-arrow {
        @apply absolute border-solid;

        &::before,
        &::after {
            @apply absolute top-0 left-0 inline-block w-0 h-0 border-solid border-transparent;
            content: "";
        }
    }

    &.popover-top,
    &.popover-top-start,
    &.popover-top-end {
        & .popover-arrow {
            @apply w-4 h-2 top-full;
        }
        & .popover-arrow::before {
            @apply -mt-px -ml-px;
            border-width: 10px 9px 0 9px;
            border-top-color: rgb(var(--popover-shadow));
        }
        & .popover-arrow::after {
            @apply -mt-px;
            border-width: 8px 8px 0 8px;
            border-top-color: var(--popover-background);
        }
    }
    
    &.popover-left,
    &.popover-left-start,
    &.popover-left-end {
        & .popover-arrow {
            @apply w-2 h-4 left-full;
        }
        & .popover-arrow::before {
            @apply -mt-px -ml-px;
            border-width: 9px 0 9px 10px;
            border-left-color: rgb(var(--popover-shadow));
        }
        & .popover-arrow::after {
            @apply -ml-px;
            border-width: 8px 0 8px 8px;
            border-left-color: var(--popover-background);
        }
    }
    
    &.popover-bottom,
    &.popover-bottom-start,
    &.popover-bottom-end {
        & .popover-arrow {
            @apply w-4 h-2 -translate-y-full;
        }
        & .popover-arrow::before {
            @apply -mt-px -ml-px;
            border-width: 0 9px 10px 9px;
            border-bottom-color: rgb(var(--popover-shadow));
        }
        & .popover-arrow::after {
            @apply mt-px;
            border-width: 0 8px 8px 8px;
            border-bottom-color: var(--popover-background);
        }
    }
    
    &.popover-right,
    &.popover-right-start,
    &.popover-right-end {
        & .popover-arrow {
            @apply w-2 h-4 -translate-x-full;
        }
        & .popover-arrow::before {
            @apply -ml-px -mt-px;
            border-width: 9px 10px 9px 0;
            border-right-color: rgb(var(--popover-shadow));
        }
        & .popover-arrow::after {
            @apply ml-px;
            border-width: 8px 8px 8px 0;
            border-right-color: var(--popover-background);
        }
    }
}

/* Popover Slots */
.popover :slotted(.popover-content) {
    @apply w-full flex flex-col rounded;
    @apply bg-white text-gray-800 shadow-gray-300;
    @apply dark:bg-gray-100 dark:shadow-gray-900;
    box-shadow: 0 0 0 1px rgb(var(--popover-shadow)), 
                0 4px 2px -2px rgb(var(--popover-shadow) / 0.5);
}

.popover :slotted(.popover-header) {
    @apply px-3 pt-4 pb-1 border-b;
    @apply border-gray-300;
}

.popover :slotted(.popover-title) {
    @apply uppercase text-xs tracking-wider;
    @apply text-gray-400 dark:text-gray-700;    
}

.popover :slotted(.popover-article) {
    @apply p-3;
}
</style>
