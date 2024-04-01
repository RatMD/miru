<template>
    <BaseCard :size="props.size || 'md'">
        <header class="card-header" v-if="props.title || $slots.header">
            <slot name="header" v-bind="props">
                <div class="card-title">{{ props.title }}</div>
            </slot>
        </header>

        <article class="card-content">
            <slot name="default" v-bind="props" />
        </article>

        <footer class="card-footer" v-if="$slots.footer">
            <slot name="footer" v-bind="props" />
        </footer>
    </BaseCard>
</template>

<script lang="ts">
/**
 * Card Properties
 */
export interface CardStdProps {
    /**
     * The title of this card element.
     */
    title?: string | null;

    /**
     * The desired size of the card container.
     */
    size?: 'sm' | 'md' | 'lg' | 'full';
}

/**
 * Card Slots
 */
export interface CardStdSlots {
    /**
     * The default Card content slot.
     * @param props 
     */
    default(props: CardStdProps): any;

    /**
     * The header of the card, used instead of the title property.
     * @param props 
     */
    header(props: CardStdProps): any;

    /**
     * The footer of the card.
     * @param props 
     */
    footer(props: CardStdProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'CardStd'
}
</script>

<script lang="ts" setup>
import BaseCard from './BaseCard.vue';

// Define Component
const props = defineProps<CardStdProps>();
const slots = defineSlots<CardStdSlots>();
</script>

<style scoped>
header.card-header {
    @apply flex flex-col;

    & :slotted(.card-title) {
        @apply w-full flex flex-row gap-2 items-center uppercase pt-4 px-4;
    }

    & :slotted(.card-image) {
        @apply w-full aspect-video;

        & img {
            @apply w-full h-full object-cover;
        }
    }
}

article.card-content {
    @apply flex flex-col p-4;
}

footer.card-footer {
    @apply flex flex-col pb-3 px-4 text-sm;
    @apply text-gray-600 dark:text-gray-500;
    
    & :slotted(.card-bottom) {
        @apply py-3 px-4 -mx-4 -mb-3 text-sm;
        @apply text-gray-600 bg-gray-100 dark:text-gray-500 dark:bg-gray-900;
    }
}
</style>
