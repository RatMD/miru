<template>
    <div class="input-group" :class="{ 'group-row': props.row }">
        <slot v-bind="props" />
    </div>
</template>

<script lang="ts">
/**
 * InputGroup Properties
 */
export interface InputGroupProps {
    /**
     * Whether to force a flex-row behavior (even on mobile devices) or not.
     */
    row?: boolean;
}

/**
 * InputGroup Slots
 */
export interface InputGroupSlots {
    /**
     * The desired control an other components and elements.
     */
    default(props: InputGroupProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'InputGroup'
}
</script>

<script lang="ts" setup>
// Define Component
const props = defineProps<InputGroupProps>();
const slots = defineSlots<InputGroupSlots>();
</script>

<style>
.input-group {
    @apply flex flex-col;

    @screen md {
        @apply flex-row;
    }

    @media (max-width: 767px) {
        &:not(.group-row) > *:not(:first-child) {
            @apply -mt-px;
        }
        &:not(.group-row) > *:first-child:not(:last-child) {
            @apply !rounded-b-none;
        }
        &:not(.group-row) > *:last-child:not(:first-child) {
            @apply !rounded-t-none;
        }
        &:not(.group-row) > *:not(:first-child):not(:last-child) {
            @apply !rounded-none;
        }
    }

    @media (min-width: 768px) {
        &:not(.group-row) > *:not(:first-child) {
            @apply -ml-px;
        }
        &:not(.group-row) > *:first-child:not(:last-child) {
            @apply !rounded-r-none;
        }
        &:not(.group-row) > *:last-child:not(:first-child) {
            @apply !rounded-l-none;
        }
        &:not(.group-row) > *:not(:first-child):not(:last-child) {
            @apply !rounded-none;
        }
    }

    &.group-row {
        @apply flex-row;
        
        & > *:first-child:not(:last-child) {
            @apply !rounded-r-none;
        }
        & > *:last-child:not(:first-child) {
            @apply !rounded-l-none;
        }
        & > *:not(:first-child):not(:last-child) {
            @apply !rounded-none;
        }
    }
}
</style>
