<template>
    <div :id="accordionId" class="accordion" :class="{
        'accordion-condensed': props.condensed,
        'accordion-clean': props.clean,
    }">
        <component v-for="(tab, idx) of accordionTabs" :key="`${accordionId}-tab-${idx}`"
            :is="tab" 
            :id="`${accordionId}-tab-${idx}`"
            :condensed="props.condensed"
            v-bind="props.pass"
            v-model:visible="accordionStates[idx]" 
            @show="() => onShow(idx)" />
    </div>
</template>

<script lang="ts">
import type AccordionTab from './AccordionTab.vue';
import type { AccordionTabProps } from './AccordionTab.vue';

/**
 * Accordion Properties
 */
export interface AccordionProps {
    /**
     * A custom accordion id, used for a11y purposes only, also passed to the single accordion tabs.
     * Default value is an auto-generated UUID.
     */
    id?: string;

    /**
     * Whether to allow multiple accordion tabs to be open at the same time or not.
     */
    multiple?: boolean;

    /**
     * Pass shared properties to the individual AccordionTab components.
     */
    pass?: Omit<AccordionTabProps, 'id' | 'label' | 'visible'>;

    /**
     * Whether to apply the condensed stylings or not.
     */
    condensed?: boolean;

    /**
     * Whether to apply the clean stylings or not.
     */
    clean?: boolean;
}

/**
 * Accordion Slots
 */
export interface AccordionSlots {
    /**
     * Primary accordion content slot, must contain AccordionTab components only.
     * @param props 
     */
    default(props: AccordionProps): InstanceType<typeof AccordionTab>[];
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'AccordionGroup'
}
</script>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import uuid from '../../utils/uuid';

// Define Component
const props = defineProps<AccordionProps>();
const slots = defineSlots<AccordionSlots>();

// States
const accordionId = computed<string>(() => props.id || `accordion-${uuid().replace(/-/g, '')}`);
const accordionTabs = ref<InstanceType<typeof AccordionTab>[]>([]);
const accordionStates = reactive<{ [key: string]: boolean }>({});

/**
 * Watch Slot Content
 */
watch(() => slots.default(props), newValue => {
    newValue.map((tab, idx) => {
        accordionStates[idx] = false;
    });
    accordionTabs.value = newValue;
}, { immediate: true });

/**
 * Show event listener
 * @param idx 
 */
function onShow(idx: number) {
    if (props.multiple) {
        return;
    }
    for (const [key, state] of Object.entries(accordionStates)) {
        if (key != idx.toString() && state) {
            accordionStates[key] = false;
        }
    }
}
</script>

<style scoped>
.accordion {
    @apply flex flex-col overflow-hidden;
}

.accordion:not(.accordion-clean) {
    & :deep(.accordion-tab) {
        @apply border-y border-gray-300 dark:border-gray-500;
    }

    & :deep(.accordion-tab .accordion-header) {
        @apply py-4;
    }

    & :deep(.accordion-tab .accordion-pane) {
        @apply -mt-4 mb-4;
    }

    & :deep(.accordion-tab:not(:first-child)) {
        @apply -mt-px;
    }
}

/* Condensed */
.accordion.accordion-condensed:not(.accordion-clean) {
    & :deep(.accordion-tab .accordion-header) {
        @apply py-2;
    }

    & :deep(.accordion-tab .accordion-pane) {
        @apply -mt-2 mb-2;
    }
}
</style>
