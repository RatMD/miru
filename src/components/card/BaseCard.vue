<template>
    <div class="card" :class="[
        props.size ? `card-${props.size}` : '',
        props.shadow ? `card-shadow-${props.shadow}` : ''
    ]">
        <slot v-bind="props" />
    </div>
</template>

<script lang="ts">
/**
 * BaseCard Properties
 */
export interface BaseCardProps {
    /**
     * The desired size of the card container.
     */
    size?: 'sm' | 'md' | 'lg' | 'full';

    /**
     * The desired box shadow used for this card container.
     */
    shadow?: null | 'none' | 'sm' | 'md' | 'lg';
}

/**
 * BaseCard Slots
 */
export interface BaseCardSlots {
    /**
     * The default Card content slot.
     * @param props 
     */
    default(props: BaseCardProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'BaseCard'
}
</script>

<script lang="ts" setup>
// Define Component
const props = defineProps<BaseCardProps>();
const slots = defineSlots<BaseCardSlots>();
</script>

<style scoped>
.card {
    @apply w-full flex flex-col rounded-lg border border-solid overflow-hidden;
    @apply bg-white border-black/25 shadow-gray-200;
    @apply dark:bg-gray-800 dark:border-gray-600 dark:shadow-none;

    &.card-sm {
        @apply max-w-xs;
    }

    &.card-md {
        @apply max-w-md;
    }

    &.card-lg {
        @apply max-w-xl;
    }
    
    &.card-full {
        @apply max-w-none w-full;
    }

    &.card-shadow-none {
        box-shadow: none;
    }

    &.card-shadow-sm {
        box-shadow: 0 1px 3px rgba(0,0,0,0.08), 
                    0 1px 2px rgba(0,0,0,0.12);
    }
    
    &.card-shadow-md {
        box-shadow: 0 3px 6px rgba(0,0,0,0.10), 
                    0 3px 6px rgba(0,0,0,0.16);
    }
    
    &.card-shadow-lg {
        box-shadow: 0 10px 20px rgba(0,0,0,0.12), 
                    0 6px 6px rgba(0,0,0,0.20);
    }
}
</style>
