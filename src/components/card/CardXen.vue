<template>
    <CardStd v-bind="cardProps" class="card-xen">
        <template #card>
            <article class="card-content">
                <div class="card-inner">
                    <slot name="default" v-bind="props" />
                </div>
            </article>

            <div class="card-corner" :class="props.color ? `corner-${props.color}` : ''" v-if="$slots.actions || props.actions">
                <div class="corner-content">
                    <slot name="actions" v-bind="props">
                        <template v-if="props.actions">
                            <button v-for="(action, idx) of props.actions" :key="idx"
                                type="button" 
                                :title="action.label || void 0"
                                :disabled="action.disabled || false"
                                @click="action.onClick || void 0">
                                <component :is="action.icon" v-bind="action.iconProps" />
                            </button>
                        </template>
                    </slot>
                </div>
            </div>
        </template>
    </CardStd>
</template>

<script lang="ts">
import type { Component } from 'vue';
import type { CardStdProps } from './CardStd.vue';

export interface ActionItem {
    /**
     * The desired action icon to show.
     */
    icon: Component;

    /**
     * Additional action icon properties to pass to the icon component.
     */
    iconProps?: { [key: string]: any };

    /**
     * The disabled state of this action item.
     */
    disabled?: boolean;

    /**
     * Additional label, used for a11y purposes.
     */
    label?: string;

    /**
     * Click handler, used for this action.
     */
    onClick?: () => void;
}

/**
 * CardXen Properties
 */
export interface CardXenProps extends CardStdProps {
    /**
     * The desired color used for this card corner.
     */
    color?: null | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

    /**
     * The desired actions, shown in the corner of the CardXen component.
     */
    actions?: ActionItem[];
}

/**
 * Card Slots
 */
export interface CardXenSlots {
    /**
     * The default CardXen content slot.
     * @param props 
     */
    default(props: CardXenProps): any;

    /**
     * The default CardXen content slot.
     * @param props 
     */
    actions(props: CardXenProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'CardXen'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import CardStd from './CardStd.vue';

// Define Component
const props = defineProps<CardXenProps>();
const slots = defineSlots<CardXenSlots>();

// States
const cardProps = computed<CardStdProps>(() => ({
    title: props.title,
    size: props.size,
    shadow: props.shadow,
}));
</script>

<style scoped>
.card-xen {
    @apply relative;
}

.card-corner {
    @apply absolute -right-px -bottom-px rounded-tl-lg rounded-br-lg h-9;
    @apply bg-gray-300 text-gray-800;
    @apply dark:bg-gray-600 dark:text-gray-950;
    
    &::before {
        @apply absolute w-9 h-9 top-0 -left-2 rounded-tl-lg -skew-x-12 z-10;
        @apply bg-gray-300 dark:bg-gray-600;
        content: "";
    }

    & .corner-content {
        @apply w-full gap-1 relative p-0.5 px-2.5 z-20 flex items-center justify-end;
        
        & :slotted(button) {
            @apply w-8 h-8 relative rounded-lg flex items-center justify-center outline-none shadow-none;
            @apply transition-colors duration-300 ease-in-out;
            @apply text-current;
            
            &:first-child {
                @apply -ml-2;
            }

            &::before {
                @apply absolute inset-0 rounded-full z-10 scale-0;
                @apply duration-300 ease-in-out transition-transform;
                @apply bg-black/10;
                content: "";
            }

            & > * {
                @apply relative z-20;
            }
        }

        & :slotted(button:not(:disabled):hover) {
            @apply text-black;

            &::before {
                @apply scale-100;
            }
        }
    }
}

/** Corner Colors */
.card-corner.corner-primary {
    @apply bg-primary-600 text-primary-100;
    @apply dark:bg-primary-600 dark:text-primary-950;
    
    &::before {
        @apply bg-primary-600 dark:bg-primary-600;
    }

    & :slotted(button:not(:disabled):hover) {
        @apply text-white;
    }
}

.card-corner.corner-secondary {
    @apply bg-gray-600 text-gray-100;
    @apply dark:bg-gray-600 dark:text-gray-950;
    
    &::before {
        @apply bg-gray-600 dark:bg-gray-600;
    }

    & :slotted(button:not(:disabled):hover) {
        @apply text-white;
    }
}

.card-corner.corner-success {
    @apply bg-success-600 text-success-100;
    @apply dark:bg-success-600 dark:text-success-950;
    
    &::before {
        @apply bg-success-600 dark:bg-success-600;
    }

    & :slotted(button:not(:disabled):hover) {
        @apply text-white;
    }
}

.card-corner.corner-warning {
    @apply bg-warning-600 text-warning-100;
    @apply dark:bg-warning-600 dark:text-warning-950;
    
    &::before {
        @apply bg-warning-600 dark:bg-warning-600;
    }

    & :slotted(button:not(:disabled):hover) {
        @apply text-white;
    }
}

.card-corner.corner-danger {
    @apply bg-danger-600 text-danger-100;
    @apply dark:bg-danger-600 dark:text-danger-950;
    
    &::before {
        @apply bg-danger-600 dark:bg-danger-600;
    }

    & :slotted(button:not(:disabled):hover) {
        @apply text-white;
    }
}

.card-corner.corner-info {
    @apply bg-info-600 text-info-100;
    @apply dark:bg-info-600 dark:text-info-950;
    
    &::before {
        @apply bg-info-600 dark:bg-info-600;
    }

    & :slotted(button:not(:disabled):hover) {
        @apply text-white;
    }
}
</style>
