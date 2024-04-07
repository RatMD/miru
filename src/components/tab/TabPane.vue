<template>
    <slot name="header" v-bind="props" v-if="(props.type || 'content') == 'header'">
        {{ props.label }}
    </slot>
    <div :id="paneId" class="tab-pane" :class="{
        'is-visible': isVisible,
    }" v-else>
        <slot name="default" v-bind="props" />
    </div>
</template>

<script lang="ts">
/**
 * TabPane Properties
 */
export interface TabPaneProps {
    /**
     * A custom accordion tab id, used for a11y purposes only. Default value is an auto-generated UUID.
     */
    id?: string;

    /**
     * The pane label, used within the header slot.
     */
    label?: string;

    /**
     * The visibility state of the tab pane content, must be passed as v-model value.
     */
    visible?: boolean;

    /**
     * The desired render type should be set exclusively by TabGroup component.
     */
    type?: 'header' | 'content';
}

/**
 * TabPane Slots
 */
export interface TabPaneSlots {
    /**
     * The primary accordion tab content slot.
     * @param props 
     */
    default(props: TabPaneProps): any;

    /**
     * Additional header content slot, only used within a TabGroup.
     * @param props 
     */
    header(props: TabPaneProps): any;
}

/**
 * TabPane Emits
 */
export interface TabPaneEmits {
    /**
     * Change visibility state.
     */
    (ev: 'update:visible', value: boolean): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'TabPane'
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import uuid from '../../utils/uuid';

// Define Component
const props = defineProps<TabPaneProps>();
const slots = defineSlots<TabPaneSlots>();
const emits = defineEmits<TabPaneEmits>();

// States
const isVisible = computed<boolean>({
    get() {
        return props.visible || false;
    },
    set(value: boolean) {
        emits('update:visible', value);
    }
});
const paneId = computed<string>(() => props.id || `tab-pane-${uuid().replace(/-/g, '')}`);
</script>

<style scoped>
.tab-pane {
    @apply p-3;

    &:not(.is-visible) {
        @apply hidden;
    }
}
</style>
