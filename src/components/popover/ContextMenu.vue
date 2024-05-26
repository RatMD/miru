<template>
    <PopoverStd v-bind="pass">
        <template #default="params">
            <slot name="default" v-bind="params" />
        </template>

        <template #content>
            <div class="context-menu">
                <ul class="context-actions" v-if="props.actions.length > 0">
                    <li v-for="(action, idx) of props.actions" :key="idx"
                        class="action-item">
                        <button 
                            type="button" 
                            class="item-btn"
                            :class="[
                                action.color ? `btn-${action.color}` : '',
                                toValue(action.disabled || false) ? 'btn-disabled' : '',
                                toValue(action.loading || false) ? 'btn-loading' : ''
                            ]"
                            :title="props.title || void 0"
                            :disabled="toValue(action.disabled || false) || toValue(action.loading || false)"
                            @click="(ev) => onClick(ev, action)">
                            <component :is="action.icon" class="btn-icon" v-bind="action.iconProps" v-if="action.icon" />
                            <span class="btn-text">{{ action.label }}</span>
                        </button>
                    </li>
                </ul>
                <p v-else>
                    No actions available.
                </p>
            </div>
        </template>
    </PopoverStd>
</template>

<script lang="ts">
import type { Component, MaybeRef } from 'vue';
import type { PopoverStdProps, PopoverStdSlotProps } from './PopoverStd.vue';

export interface ContextMenuAction {
    /**
     * The desired color used for this action.
     */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | null;

    /**
     * The desired action label.
     */
    label: string;

    /**
     * Show a custom icon component next to the action label.
     */
    icon?: Component;

    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * The desired action handler, when the context menu action is clicked.
     */
    onClick?: (ev: Event, action: ContextMenuAction) => void;

    /**
     * The loading state for this action.
     */
    loading?: MaybeRef<boolean> | boolean;

    /**
     * The disabled state for this action.
     */
    disabled?: MaybeRef<boolean> | boolean;
}

/**
 * ContextMenu Properties
 */
export interface ContextMenuProps extends PopoverStdProps {
    /**
     * The desired context menu actions to show.
     */
    actions: ContextMenuAction[];
}

/**
 * ContextMenu Slots
 */
export interface ContextMenuSlots {
    /**
     * The default slot is used for the trigger / target element on which the popover relies on.
     * @param props 
     */
    default(props: PopoverStdSlotProps): any;
}

/**
 * ContextMenu Events
 */
export interface ContextMenuEvents {
    /**
     * An context menu action has been clicked.
     */
    (ev: 'click', event: Event, action: ContextMenuAction): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'ContextMenu'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import PopoverStd from './PopoverStd.vue';

// Define Component
const props = withDefaults(defineProps<ContextMenuProps>(), {
    placement: 'bottom',
    offset: 10,
    arrow: true
});
const slots = defineSlots<ContextMenuSlots>();
const emits = defineEmits<ContextMenuEvents>();

// States
const pass = computed<PopoverStdProps>(() => {
    return {
        title: props.title,
        placement: props.placement,
        offset: props.offset,
        arrow: props.arrow,
    }
});

/**
 * Handle click on action menu item.
 * @param action 
 */
function onClick(ev: Event, action: ContextMenuAction) {
    if (typeof action.onClick == 'function') {
        action.onClick(ev, action);
    } else {
        emits('click', ev, action);
    }
}
</script>

<style scoped>
.context-menu {
    @apply flex flex-col py-2;
}

.context-actions {
    @apply flex flex-col;

    & .action-item {
        @apply flex flex-col;
        
    }
    
    & .item-btn {
        @apply flex flex-row gap-2 px-4 py-2;
        @apply duration-300 ease-in-out transition-colors;

        &:not(:disabled):hover {
            @apply bg-gray-200;
        }

        & .btn-icon {
            
        }

        & .btn-text {
            
        }
    }

}
</style>
