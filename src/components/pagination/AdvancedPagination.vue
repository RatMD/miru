<template>
    <ButtonGroup :align="props.align || 'center'" :gap="props.connected ? 'none' : (props.gap || props.size || 'md')">
        <ButtonStd color="secondary" size="sm" :icon="ChevronsLeft" :disabled="isPrevDisabled" @click="onFirst" />
        <ButtonStd color="secondary" size="sm" :icon="ChevronLeft" :disabled="isPrevDisabled" @click="onPrev" />
        <div class="pager">
            <span class="pager-cur">{{ props.current }}</span>
            <span class="pager-sep">/</span>
            <span class="pager-max">{{ props.last }}</span>
        </div>
        <ButtonStd color="secondary" size="sm" :icon="ChevronRight" :disabled="isNextDisabled" @click="onNext" />
        <ButtonStd color="secondary" size="sm" :icon="ChevronsRight" :disabled="isNextDisabled" @click="onLast" />
    </ButtonGroup>
</template>

<script lang="ts">
/**
 * AdvancedPagination Properties
 */
export interface AdvancedPaginationProps {
    /**
     * The current navigation page, used for this pagination.
     */
    current: number;

    /**
     * The last available navigation page, used for this pagination.
     */
    last: number;
    
    /**
     * The desired alignment for the buttons within the group.
     */
    align?: 'left' | 'center' | 'right';

    /**
     * The desired size of the button, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The desired gap-size between the single buttons, note that `md` is the default value.
     */
    gap?: 'sm' | 'md' | 'lg';

    /**
     * Whether to connect the single buttons or not.
     */
    connected?: boolean;

    /**
     * The disabled state for this pagination.
     */
    disabled?: boolean;
}

/**
 * AdvancedPagination Emits
 */
 export interface AdvancedPaginationEmits {
    /**
     * The event triggered when the first button is clicked.
     * @param ev
     * @param event 
     * @param props 
     */
    (ev: 'first', event: Event, props: AdvancedPaginationProps): void;

    /**
     * The event triggered when the previous button is clicked.
     * @param ev
     * @param event 
     * @param props 
     */
    (ev: 'prev', event: Event, props: AdvancedPaginationProps): void;

    /**
     * The event triggered when the next button is clicked.
     * @param ev
     * @param event 
     * @param props 
     */
    (ev: 'next', event: Event, props: AdvancedPaginationProps): void;

    /**
     * The event triggered when the last button is clicked.
     * @param ev
     * @param event 
     * @param props 
     */
    (ev: 'last', event: Event, props: AdvancedPaginationProps): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'AdvancedPagination'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import ChevronsLeft from '../lucide/ChevronsLeft.vue';
import ChevronLeft from '../lucide/ChevronLeft.vue';
import ChevronRight from '../lucide/ChevronRight.vue';
import ChevronsRight from '../lucide/ChevronsRight.vue';
import ButtonStd from '../button/ButtonStd.vue';
import ButtonGroup from '../form/ButtonGroup.vue';

// Define Component
const props = defineProps<AdvancedPaginationProps>();
const emits = defineEmits<AdvancedPaginationEmits>();

// Check if previous button is disabled
const isPrevDisabled = computed<boolean>(() => {
    return props.disabled == true || props.current <= 1;
});

// Check if next button is disabled
const isNextDisabled = computed<boolean>(() => {
    return props.disabled == true || props.current >= props.last;
});

/**
 * Event Listener on first button
 * @param event
 */
function onFirst(event: Event) {
    if (isPrevDisabled.value) {
        return;
    }
    emits('first', event, props);
}

/**
 * Event Listener on previous button
 * @param event
 */
function onPrev(event: Event) {
    if (isPrevDisabled.value) {
        return;
    }
    emits('prev', event, props);
}

/**
 * Event Listener on next button
 * @param event
 */
function onNext(event: Event) {
    if (isNextDisabled.value) {
        return;
    }
    emits('next', event, props);
}

/**
 * Event Listener on last button
 * @param event
 */
function onLast(event: Event) {
    if (isPrevDisabled.value) {
        return;
    }
    emits('last', event, props);
}
</script>

<style scoped>
.pager {
    @apply flex flex-row self-center gap-1 mx-3 text-sm font-semibold;
}

.pager-cur {
    @apply text-gray-600 dark:text-gray-300;
}

.pager-sep {
    @apply text-gray-400 dark:text-gray-500;
}

.pager-max {
    @apply text-gray-500 dark:text-gray-400;
}
</style>
