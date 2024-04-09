<template>
    <CardStd :size="props.size || 'md'" :class="['card-collapse', isVisible ? 'is-visible' : '']">
        <template v-slot:header>
            <div class="card-title">
                <button type="button" class="card-btn" @click="isVisible = !isVisible">
                    <LucideChevronRight :size="16" class="title-icon" />
                    <span class="title-text">{{ props.title }}</span>
                </button>
            </div>
        </template>

        <template v-slot:default>
            <CollapseSupport 
                :collapsed="!isVisible" 
                :duration="props.duration || 300"
                @hide="emits('hide')"
                @hidden="emits('hidden')"
                @show="emits('show')"
                @shown="emits('shown')">
                <div class="card-collapsed-content">
                    <slot name="default" v-bind="props" />
                </div>
            </CollapseSupport>
        </template>
    </CardStd>
</template>

<script lang="ts">
import type { CardStdProps } from './CardStd.vue';

/**
 * CardCollapse Properties
 */
export interface CardCollapseProps extends CardStdProps {
    /**
     * The duration until the content is fully toggled, you can either pass the time in milliseconds 
     * or a control-value to calculate the duration dynamically based on the amount of content.
     */
    duration?: number | 'slow' | 'normal' | 'fast';
    
    /**
     * The visibility state of the card content, must be passed as v-model value.
     */
    visible?: boolean;
}

/**
 * CardCollapse Slots
 */
export interface CardCollapseSlots {
    /**
     * The default Card content slot.
     * @param props 
     */
    default(props: CardCollapseProps): any;

    /**
     * The header of the card, used instead of the title property.
     * @param props 
     */
    header(props: CardCollapseProps): any;
}

/**
 * CardCollapse Events
 */
export interface CardCollapseEmits {
    /**
     * Change visibility state.
     */
    (ev: 'update:visible', value: boolean): void;

    /**
     * Event fires immediately, when the accordion pane starts to get hidden.
     */
    (ev: 'hide'): void;

    /**
     * Event fires after the accordion pane is fully hidden.
     */
    (ev: 'hidden'): void;

    /**
     * Event fires immediately, when the accordion pane starts to get visible.
     */
    (ev: 'show'): void;

    /**
     * Event fires after the accordion pane is fully shown.
     */
    (ev: 'shown'): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'CardCollapse'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import CardStd from './CardStd.vue';
import LucideChevronRight from '../lucide/ChevronRight.vue';
import CollapseSupport from '../support/CollapseSupport.vue';

// Define Component
const props = defineProps<CardCollapseProps>();
const slots = defineSlots<CardCollapseSlots>();
const emits = defineEmits<CardCollapseEmits>();

// States
const isVisible = computed<boolean>({
    get() {
        return props.visible || false;
    },
    set(value: boolean) {
        emits('update:visible', value);
    }
});
</script>

<style scoped>
.card-collapse {
    & :deep(.card-title) {
        @apply py-4;
    }

    & .card-btn {
        @apply flex flex-row items-center px-3 py-1.5 gap-2 rounded;
        @apply duration-300 ease-in-out transition-colors;
        @apply text-gray-500;
        
        &:hover {
            @apply bg-gray-100 text-gray-900;
        }

        & .title-icon {
            @apply duration-300 ease-in-out transition-transform;
        }

        & .title-text {
            @apply text-sm font-semibold;
        }
    }
    &.is-visible .card-btn .title-icon {
        @apply rotate-90;
    }

    & :deep(article.card-content) {
        @apply p-0;  
    }

    & .card-collapsed-content {
        @apply pb-4 px-4;
    }
}
</style>
