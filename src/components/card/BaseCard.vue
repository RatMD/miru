<template>
    <div class="card">
        <header class="card-header" v-if="$slots.header || props.title">
            <slot name="header" v-bind="props">
                <div class="card-title">{{ props.title }}</div>
            </slot>
        </header>

        <article class="card-content">
            <slot v-bind="props" />
        </article>
    </div>
</template>

<script lang="ts">
/**
 * BaseCard Properties
 */
export interface BaseCardProps {
    /**
     * Card title, used when no header slot is present.
     */
    title?: string | null;

}

/**
 * BaseCard Slots
 */
export interface BaseCardSlots {
    /**
     * Header Card slot, rendered instead of title property.
     * @param props 
     */
    header(props: BaseCardProps): any;

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
    @apply flex flex-col;
}

.card-header {
    &:slotted(.card-title) {
        @apply font-semibold;
    }
}

.card-content {
    @apply rounded-lg shadow flex flex-col border border-solid p-4;
    @apply bg-white border-gray-300 shadow-gray-200;
    @apply dark:bg-gray-800 dark:border-gray-600 dark:shadow-none;
}
</style>
