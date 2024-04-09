<template>
    <div class="card" :class="[
        props.size ? `card-${props.size}` : '',
        props.shadow ? `card-shadow-${props.shadow}` : ''
    ]">
        <slot name="card" v-bind="props">
            <header class="card-header" v-if="props.title || $slots.header">
                <slot name="header" v-bind="props">
                    <div class="card-title">{{ props.title }}</div>
                </slot>
            </header>

            <slot name="content" v-bind="props">
                <article class="card-content">
                    <slot name="default" v-bind="props" />
                </article>
            </slot>

            <footer class="card-footer" v-if="$slots.footer">
                <slot name="footer" v-bind="props" />
            </footer>
        </slot>
    </div>
</template>

<script lang="ts">
/**
 * CardStd Properties
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

    /**
     * The desired box shadow used for this card container.
     */
    shadow?: null | 'none' | 'sm' | 'md' | 'lg';
}

/**
 * CardStd Slots
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

    /**
     * Replace the whole card slot structure with a custom one.
     * @param props 
     */
    card(props: CardStdProps): any;

    /**
     * Replace the article content structure with a custom one.
     * @param props 
     */
    content(props: CardStdProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'CardStd'
}
</script>

<script lang="ts" setup>
// Define Component
const props = defineProps<CardStdProps>();
const slots = defineSlots<CardStdSlots>();
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

.card :slotted(header.card-header) {
    @apply flex flex-col;

    & .card-title {
        @apply w-full flex flex-row gap-2 items-center uppercase pt-4 px-4;
    }

    & .card-image {
        @apply w-full aspect-video;

        & img {
            @apply w-full h-full object-cover;
        }
    }
}

.card :slotted(article.card-content) {
    @apply flex flex-col p-4;
}

.card :slotted(footer.card-footer) {
    @apply flex flex-col pb-3 px-4 text-sm;
    @apply text-gray-600 dark:text-gray-500;
    
    & .card-bottom {
        @apply py-3 px-4 -mx-4 -mb-3 text-sm;
        @apply text-gray-600 bg-gray-100 dark:text-gray-500 dark:bg-gray-900;
    }
}
</style>
