<template>
    <component :is="component" />
</template>

<script lang="ts">
/**
 * DeferredSupport Properties
 */
export interface DeferredSupportProps {
    /**
     * Custom delay state, before deferred component gets loaded.
     */
    delay?: number;

    /**
     * Custom timeout state, before timeout error occurres.
     */
    timeout?: number;
}

/**
 * DeferredSupport Slots
 */
export interface DeferredSupportSlots {
    /**
     * The primary deferred content slot.
     * @param props 
     */
    default(props: DeferredSupportProps): Promise<any>|any;

    /**
     * The temporary loading content slot.
     * @param props 
     */
    loading(props: DeferredSupportProps): any;

    /**
     * The error slot, when something went horrible wrong.
     * @param props 
     */
    error(props: DeferredSupportProps): any;
}

/**
 * DeferredSupport Emits
 */
export interface DeferredSupportEmits {
    /**
     * Deferred Component has been fully loaded.
     * @param ev 
     */
    (ev: 'loaded'): void;

    /**
     * An error occurred while loading the Deferred Component.
     * @param ev 
     * @param error 
     */
    (ev: 'error', error: Error): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'DeferredSupport'
}
</script>

<script lang="ts" setup>
import { computed, defineAsyncComponent, defineComponent, h } from 'vue';

// Define Component
const props = defineProps<DeferredSupportProps>();
const slots = defineSlots<DeferredSupportSlots>();
const emits = defineEmits<DeferredSupportEmits>();

// States
const component = computed(() => {
    const loadingComponent = defineComponent({
        setup(props, ctx) {
            return () => h('div', slots.loading(props)[0]);
        },
    });
    
    const errorComponent = defineComponent({
        setup(props, ctx) {
            return () => h('div', slots.error(props)[0]);
        },
    });

    return defineAsyncComponent({
        loader: async () => {
            const result = await slots.default(props);
            return h('div', result);
        },
        loadingComponent: loadingComponent,
        errorComponent: errorComponent,
        delay: props.delay || 10,
        timeout: props.timeout || 5000,
        onError(error, retry, fail, attempts) {
            emits('error', error);
        }
    });
});
</script>

<style scoped>
</style>
