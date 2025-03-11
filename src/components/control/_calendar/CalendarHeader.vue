<template>
    <div class="calendar-header">
        <button class="header-action action-view" @click="onChangeView">
            <span>{{ label }}</span>
        </button>

        <button class="header-action action-prev" @click="onPrev">
            <LucideChevronUp :size="16" />
        </button>
        <button class="header-action action-next" @click="onNext">
            <LucideChevronDown :size="16" />
        </button>
    </div>
</template>

<script lang="ts">
/**
 * CalendarHeader Partial Properties
 */
export interface CalendarHeaderPartialProps {
    /**
     * The desired label used for the 'Change View' button.
     */
    label: string;
}

/**
 * CalendarHeader Partial Events
 */
export interface CalendarHeaderPartialEmits {
    /**
     * The 'Previous' button has been clicked.
     */
    (ev: 'prev', event: Event): void;

    /**
     * The 'Next' button has been clicked.
     */
    (ev: 'next', event: Event): void;

    /**
     * The 'Change View' button has been clicked.
     */
    (ev: 'view', event: Event): void;
}
</script>

<script lang="ts" setup>
import LucideChevronDown from '../../lucide/ChevronDown.vue';
import LucideChevronUp from '../../lucide/ChevronUp.vue';

// Define Component
const props = defineProps<CalendarHeaderPartialProps>();
const emits = defineEmits<CalendarHeaderPartialEmits>();

/**
 * Change View
 * @param event
 */
function onChangeView(event: Event) {
    emits('view', event);
}

/**
 * Previous Page
 * @param event
 */
function onPrev(event: Event) {
    emits('prev', event);
}

/**
 * Next Page
 * @param event
 */
function onNext(event: Event) {
    emits('next', event);
}
</script>

<style scoped>
.calendar-header {
    @apply w-full flex flex-row gap-2 p-1 relative items-center mb-2;
}

.header-action {
    @apply w-8 h-8 flex items-center outline-none shadow-none border-0 rounded-md;
    @apply transition-colors duration-200 ease-in-out;
    @apply text-gray-600 dark:text-gray-300 bg-transparent;
    
    &:hover {
        @apply bg-gray-200 dark:bg-gray-800;
    }
}

.header-action.action-view {
    @apply flex-1 flex px-3;
}

.header-action.action-prev,
.header-action.action-next {
    @apply basis-8 justify-center;
}
</style>
