<template>
    <div :id="accordionId" class="accordion">
        <component v-for="(tab, idx) of accordionTabs" :key="`${accordionId}-tab-${idx}`"
            :is="tab" 
            :id="`${accordionId}-tab-${idx}`"
            v-bind="props.pass"
            v-model:visible="accordionStates[idx]" 
            @show="() => onShow(idx)" />
    </div>
</template>

<script lang="ts">
import type AccordionTab from '@/components/accordion/AccordionTab.vue';
import type { AccordionTabProps } from '@/components/accordion/AccordionTab.vue';

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
    name: 'AccordionStd'
}
</script>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';

// Define Component
const props = defineProps<AccordionProps>();
const slots = defineSlots<AccordionSlots>();

// States
const accordionId = computed<string>(() => props.id || `accordion-${crypto.randomUUID().replace(/\-/g, '')}`);
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

<style>
.accordion {
    @apply flex flex-col gap-2;
}
</style>
