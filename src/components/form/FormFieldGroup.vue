<template>
    <div class="field-group" :class="{ 'group-row': props.row }">
        <slot v-bind="props" />
    </div>
</template>

<script lang="ts">
/**
 * FormFieldGroup Properties
 */
export interface FormFieldGroupProps {
    /**
     * Whether to force a flex-row behavior (even on mobile devices) or not.
     */
    row?: boolean;
}

/**
 * FormFieldGroup Slots
 */
export interface FormFieldGroupSlots {
    /**
     * The desired control an other components and elements.
     */
    default(props: FormFieldGroupProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'FormFieldGroup'
}
</script>

<script lang="ts" setup>
// Define Component
const props = defineProps<FormFieldGroupProps>();
const slots = defineSlots<FormFieldGroupSlots>();
</script>

<style scoped>
.field-group {
    @apply flex flex-col;

    @screen md {
        @apply flex-row;
    }

    @media (max-width: 767px) {
        &:not(.group-row) :slotted(> *:not(:first-child)) {
            @apply -mt-px;
        }
        &:not(.group-row) :slotted(> *:first-child:not(:last-child)) {
            @apply !rounded-b-none;
        }
        &:not(.group-row) :slotted(> *:last-child:not(:first-child)) {
            @apply !rounded-t-none;
        }
        &:not(.group-row) :slotted(> *:not(:first-child):not(:last-child)) {
            @apply !rounded-none;
        }
    }

    @media (min-width: 768px) {
        &:not(.group-row) :slotted(> *:not(:first-child)) {
            @apply -ml-px;
        }
        &:not(.group-row) :slotted(> *:first-child:not(:last-child)) {
            @apply !rounded-r-none;
        }
        &:not(.group-row) :slotted(> *:last-child:not(:first-child)) {
            @apply !rounded-l-none;
        }
        &:not(.group-row) :slotted(> *:not(:first-child):not(:last-child)) {
            @apply !rounded-none;
        }
    }

    &.group-row {
        @apply flex-row;
        
        & :slotted(> *:first-child:not(:last-child)) {
            @apply !rounded-r-none;
        }
        & :slotted(> *:last-child:not(:first-child)) {
            @apply !rounded-l-none;
        }
        & :slotted(> *:not(:first-child):not(:last-child)) {
            @apply !rounded-none;
        }
    }
}
</style>
