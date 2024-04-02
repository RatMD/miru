<template>
    <slot name="default" :show="onShow" :hide="onHide" v-bind="props" />
    <div ref="floating" :style="floatingStyles" v-if="visible">
        <slot name="floating" v-bind="props" />
    </div>
</template>

<script lang="ts">
import { type UseFloatingOptions } from '@floating-ui/vue';

/**
 * FloatingSupport Properties
 */
export interface FloatingSupportProps {
    /**
     * Additional @floating-ui/vue options.
     */
    options?: UseFloatingOptions
}

export interface FloatingSupportSlotProps {
    /**
     * Show Floating Content
     */
    show: (event: Event, target?: HTMLElement | null) => Promise<boolean>; 

    /**
     * Hide Floating Content
     */
    hide: (event: Event, target?: HTMLElement | null) => Promise<boolean>;
}

/**
 * FloatingSupport Slots
 */
export interface FloatingSupportSlots {
    /**
     * Target content.
     * @param props 
     */
    default(props: FloatingSupportSlotProps): any;

    /**
     * The desired floating content.
     * @param props 
     */
    floating(props: FloatingSupportProps): any;
}

/**
 * FloatingSupport Emits
 */
export interface FloatingSupportEmits {
    /**
     * Event fires immediately, when the content starts to get hidden.
     */
    (ev: 'hide'): void;

    /**
     * Event fires after the content is fully hidden.
     */
    (ev: 'hidden'): void;

    /**
     * Event fires immediately, when the content starts to get visible.
     */
    (ev: 'show'): void;

    /**
     * Event fires after the content is fully shown.
     */
    (ev: 'shown'): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'FloatingSupport'
}
</script>

<script lang="ts" setup>
import { useFloating } from '@floating-ui/vue';
import { ref } from 'vue';
import wait from '../../utils/wait';

// Define Component
const props = defineProps<FloatingSupportProps>();
const slots = defineSlots<FloatingSupportSlots>();
const emits = defineEmits<FloatingSupportEmits>();

// States
const reference = ref<HTMLElement|null>(null);
const floating = ref<HTMLElement|null>(null);
const { floatingStyles } = useFloating(reference, floating, props.options || {});

const visible = ref<boolean>(false);

/**
 * On Show Floating Element
 * @param event 
 * @param target 
 * @returns
 */
async function onShow(event: Event, target?: HTMLElement | null) {
    target = target instanceof HTMLElement ? target : event.target as HTMLElement|null;
    if (!target || !(target instanceof HTMLElement)) {
        return false;
    }
    if (visible.value) {
        return false;
    }
    emits('show');
    
    // Set Visibility
    visible.value = true;
    await wait(10);
    
    // Set Reference
    reference.value = target;
    await wait(10);

    // Finish
    emits('shown');
    return true;
}

/**
 * On Hide Floating Element
 * @param event 
 * @param target 
 * @returns
 */
async function onHide(event: Event, target?: HTMLElement | null) {
    target = target instanceof HTMLElement ? target : event.target as HTMLElement|null;
    if (!target || !(target instanceof HTMLElement)) {
        return false;
    }
    if (!visible.value) {
        return false;
    }
    emits('hide');

    // Unset Reference
    reference.value = null;
    await wait(10);

    // Unset Visibility
    visible.value = false;
    await wait(10);

    // Finish
    emits('hidden');
    return true;
}
</script>

<style scoped>
</style>
