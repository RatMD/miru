<template>
    <div ref="accordionTab" :id="accordionId" class="accordion-tab" :class="{
        'condensed': props.condensed,
        'is-visible': isVisible,
        'has-icon': props.icon !== null,
        'icon-left': (props.iconPlacement || 'right') == 'left',
        'icon-right': (props.iconPlacement || 'right') == 'right'
    }">
        <button ref="accordionHeader" 
            class="accordion-header"
            :aria-expanded="isVisible ? 'true' : 'false'" 
            :aria-controls="`${accordionId}-pane`" 
            @click="isVisible = !isVisible">
            <slot name="header" v-bind="props">
                <template v-if="(props.icon !== null && (props.iconPlacement || 'right') == 'left')">
                    <component :is="props.icon" v-bind="props.iconProps" class="header-icon" v-if="props.icon" />
                    <LucideChevronDown :stroke-width="1.5" class="header-icon" v-else />
                </template>

                <span class="header-label">{{ props.label }}</span>

                <template v-if="(props.icon !== null && (props.iconPlacement || 'right') == 'right')">
                    <component :is="props.icon" v-bind="props.iconProps" class="header-icon" v-if="props.icon" />
                    <LucideChevronDown :stroke-width="1.5" class="header-icon" v-else />
                </template>
            </slot>
        </button>

        <div ref="accordionPane" :id="`${accordionId}-pane`" class="accordion-pane">
            <CollapseSupport 
                :collapsed="!isVisible" 
                :duration="props.duration || 300"
                :transition="props.transition || 'ease-in-out'"
                @hide="emits('hide')"
                @hidden="emits('hidden')"
                @show="emits('show')"
                @shown="emits('shown')">
                <slot name="default" v-bind="props"></slot>
            </CollapseSupport>
        </div>
    </div>
</template>

<script lang="ts">
import type { Component } from 'vue';
import type { CollapseSupportTransitions } from '../support/CollapseSupport.vue';

/**
 * AccordionTab Properties
 */
export interface AccordionTabProps {
    /**
     * A custom accordion tab id, used for a11y purposes only. Default value is an auto-generated UUID.
     */
    id?: string;

    /**
     * The accordion label to toggle the accordion pane, used within the header slot.
     */
    label?: string;

    /**
     * The accordion toggle icon, uses a Chevron as default. Pass `null` to disable the icon completely.
     */
    icon?: Component | null;

    /**
     * Whether to show the accordion toggle icon on the left or right side of the label.
     */
    iconPlacement?: 'left' | 'right';

    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * The duration until the accordion pane content is fully toggled, you can either pass the time 
     * in milliseconds or a control-value to calculate the duration dynamically based on the amount 
     * of content.
     */
    duration?: number | 'slow' | 'normal' | 'fast';

    /**
     * The desired transition timing function to be used for the collapsing.
     */
    transition?: CollapseSupportTransitions;

    /**
     * The visibility state of the accordion pane content, must be passed as v-model value.
     */
    visible?: boolean;

    /**
     * Whether to apply the condensed stylings or not.
     */
    condensed?: boolean;
}

/**
 * AccordionTab Slots
 */
export interface AccordionTabSlots {
    /**
     * The primary accordion tab content slot.
     * @param props 
     */
    default(props: AccordionTabProps): any;

    /**
     * Additional content slot, used as accordion header instead of the label property.
     * @param props 
     */
    header(props: AccordionTabProps): any;
}

/**
 * AccordionTab Emits
 */
export interface AccordionTabEmits {
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
    name: 'AccordionTab'
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import LucideChevronDown from '../lucide/ChevronDown.vue';
import CollapseSupport from '../support/CollapseSupport.vue';
import uuid from '../../utils/uuid';

// Define Component
const props = defineProps<AccordionTabProps>();
const slots = defineSlots<AccordionTabSlots>();
const emits = defineEmits<AccordionTabEmits>();

// States
const isVisible = computed<boolean>({
    get() {
        return props.visible || false;
    },
    set(value: boolean) {
        emits('update:visible', value);
    }
});
const accordionId = computed<string>(() => props.id || `accordion-tab-${uuid().replace(/-/g, '')}`);
const accordionTab = ref<HTMLElement>();
const accordionHeader = ref<HTMLElement>();
const accordionPane = ref<HTMLElement>();
</script>

<style scoped>
.accordion-tab {
    @apply w-full flex flex-col overflow-hidden;
}

.accordion-header {
    @apply flex flex-row items-center gap-3;

    & :slotted(.header-label) {
        @apply text-lg font-semibold font-header select-none cursor-pointer;
    }

    & :slotted(.header-icon) {
        @apply duration-200 ease-in-out transition-transform;
        @apply -rotate-90;

        .icon-right & {
            @apply ml-auto rotate-90;
        }
        
        .is-visible.icon-left &,
        .is-visible.icon-right & {
            @apply rotate-0;
        }
    }
}

.accordion-pane {
    @apply leading-relaxed;
}

/* Condensed Stylings */
.accordion-tab.condensed {
    & .accordion-header {
        & :slotted(.header-label) {
            @apply text-base;
        }
    }
    & .accordion-pane {
        @apply text-sm;
    }
}
</style>
