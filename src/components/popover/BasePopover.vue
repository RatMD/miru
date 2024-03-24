<template>
    <div ref="popover" class="popover" :class="[
        props.arrow != false ? 'has-arrow' : null,
        props.size ? `popover-${props.size}` : null
    ]">
        <slot name="popover" v-bind="props">
            <div v-if="props.arrow != false" ref="arrowElement" 
                class="popover-arrow" 
                :class="[typeof props.arrow == 'string' ? `arrow-${props.arrow}` : '']" 
                :style="arrowStyles" />

            <div class="popover-content">
                <slot name="content" v-bind="props">
                    <header v-if="$slots.header || props.title">
                        <slot name="header" v-bind="props">
                            <div class="popover-title">{{ props.title }}</div>
                        </slot>
                    </header>
        
                    <article v-if="$slots.default">
                        <slot name="default" v-bind="props"></slot>
                    </article>
                    
                    <footer v-if="$slots.footer">
                        <slot name="footer" v-bind="props"></slot>
                    </footer>
                </slot>
            </div>
        </slot>
    </div>
</template>

<script lang="ts">
/**
 * Popover Properties
 */
export interface BasePopoverProps {
    /**
     * The desired title shown as popover header unless the header slot is used.
     */
    title?: string;

    /**
     * Whether to use the popover arrow or not, or the desired location where the arrow should be shown.
     */
    arrow?: boolean | 'top' | 'right' | 'bottom' | 'left';

    /**
     * Additional stylings which should be applied to the arrow.
     */
    arrowStyles?: { [key: string]: any };

    /**
     * Force a desired size for this popover instead to adapt the width to the content.
     */
    size?: null | 'sm' | 'md' | 'lg';
}

/**
 * Popover Slots
 */
export interface BasePopoverSlots {
    /**
     * Overwrite the whole popover inner including the arrow.
     * @param props 
     */
    popover(props: BasePopoverProps): any;

    /**
     * Overwrite the popover content, excluding the arrow and main div container.
     * @param props 
     */
    content(props: BasePopoverProps): any;

    /**
     * Custom popover header, preferred over the title property.
     * @param props 
     */
    header(props: BasePopoverProps): any;

    /**
     * Default popover content slot.
     * @param props
     */
    default(props: BasePopoverProps): any;

    /**
     * Custom popover footer, optional use.
     * @param props 
     */
    footer(props: BasePopoverProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'BasePopover'
}
</script>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

// Define Component
const props = defineProps<BasePopoverProps>();
const slots = defineSlots<BasePopoverSlots>();

// States
const popover = ref<HTMLElement>();
const arrowElement = ref<HTMLElement>();

// Expose Component
defineExpose({
    popover,
    arrowElement,
});
</script>

<style scoped>
.popover {
    @apply w-max flex text-xs font-semibold rounded-md;
    @apply bg-white text-gray-800 shadow-gray-300 dark:bg-gray-100 dark:shadow-gray-900;
    box-shadow: 0 0 0 1px var(--tw-shadow-color), 
                0 4px 2px -2px var(--tw-shadow-color);
}

.popover-content {
    @apply flex flex-col;
}

.popover .popover-arrow {
    @apply absolute w-0 h-0 border-solid border-transparent -translate-y-full;
    @apply border-b-white dark:border-b-gray-100;
    border-width: 0 8px 8px 8px;

    &::before,
    &::after {
        @apply absolute w-0 h-0 border-solid border-transparent left-0 -translate-x-1/2 dark:hidden;
        content: "";
    }

    &::before {
        @apply border-b-gray-300;
        top: -2px;
        z-index: 10;
        border-width: 0 10px 10px 10px;
    }
    
    &::after {
        @apply -top-0 border-b-white dark:border-b-gray-100;
        z-index: 20;
        border-width: 0 8px 8px 8px;
    }
}
</style>
