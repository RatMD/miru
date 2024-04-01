<template>
    <ButtonGroup :gap="props.gap || props.size || 'md'" :reverse="props.reverse || false">
        <template v-if="isIcons">
            <ButtonStd 
                color="secondary" 
                icon-placement="icon"
                :icon="(props.labelPrev as Component)" 
                :icon-props="props.labelPrevProps"
                :size="props.size || 'md'" 
                :disabled="isPrevDisabled" 
                :loading="isPrevLoading" 
                @click="onPrev" />
            <ButtonStd 
                color="secondary" 
                icon-placement="icon"
                :icon="(props.labelNext as Component)" 
                :icon-props="props.labelNextProps"
                :size="props.size || 'md'" 
                :disabled="isNextDisabled" 
                :loading="isNextLoading" 
                @click="onNext" />
        </template>

        <template v-else>
            <ButtonStd 
                color="secondary" 
                :label="props.labelPrev || 'Previous'" 
                :label-props="props.labelPrevProps"
                :size="props.size || 'md'" 
                :disabled="isPrevDisabled" 
                :loading="isPrevLoading" 
                @click="onPrev" />
            <ButtonStd 
                color="secondary" 
                :label="props.labelNext || 'Next'" 
                :label-props="props.labelNextProps"
                :size="props.size || 'md'" 
                :disabled="isNextDisabled" 
                :loading="isNextLoading" 
                @click="onNext" />
        </template>
    </ButtonGroup>
</template>

<script lang="ts">
import type { Component } from 'vue';

/**
 * SimplePagination Properties
 */
export interface SimplePaginationProps {
    /**
     * The desired label text or component for the previous button.
     */
    labelPrev?: string | Component;

    /**
     * Additional properties passed to the previous label component.
     */
    labelPrevProps?: { [key: string]: any };

    /**
     * The desired label text or component for the next button.
     */
    labelNext?: string | Component;

    /**
     * Additional properties passed to the next label component.
     */
    labelNextProps?: { [key: string]: any };

    /**
     * The desired size of the button, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The desired gap-size between the single buttons, note that `md` is the default value.
     */
    gap?: 'sm' | 'md' | 'lg';

    /**
     * Whether to pass the label components as icons or not.
     */
    icons?: boolean;

    /**
     * Set the desired disabled state.
     */
    disabled?: boolean;

    /**
     * Set the desired disabled state for the previous button, used instead of `disabled`.
     */
    disabledPrev?: boolean;

    /**
     * Set the desired disabled state for the next button, used instead of `disabled`.
     */
    disabledNext?: boolean;

    /**
     * Set the desired loading state.
     */
    loading?: boolean;

    /**
     * Set the desired loading state for the previous button, used instead of `loading`.
     */
    loadingPrev?: boolean;

    /**
     * Set the desired loading state for the next button, used instead of `loading`.
     */
    loadingNext?: boolean;

    /**
     * Whether to reverse the button order or not.
     */
    reverse?: boolean;
}

/**
 * SimplePagination Emits
 */
export interface SimplePaginationEmits {
    /**
     * The event triggered when the previous button is clicked.
     * @param ev
     * @param event 
     * @param props 
     */
    (ev: 'prev', event: Event, props: SimplePaginationProps): void;

    /**
     * The event triggered when the next button is clicked.
     * @param ev
     * @param event 
     * @param props 
     */
    (ev: 'next', event: Event, props: SimplePaginationProps): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'SimplePagination'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import ButtonGroup from '../form/ButtonGroup.vue';

// Define Component
const props = defineProps<SimplePaginationProps>();
const emits = defineEmits<SimplePaginationEmits>();

// Check if previous button is disabled
const isPrevDisabled = computed<boolean>(() => {
    return props.disabledPrev === true || props.disabled === true;
});

// Check if next button is disabled
const isNextDisabled = computed<boolean>(() => {
    return props.disabledNext === true || props.disabled === true;
});

// Check if previous button is loading
const isPrevLoading = computed<boolean>(() => {
    return props.loadingPrev === true || props.loading === true;
});

// Check if next button is loading
const isNextLoading = computed<boolean>(() => {
    return props.loadingNext === true || props.loading === true;
});

// Check if button label are icon-styled
const isIcons = computed<boolean>(() => {
    return props.icons && typeof props.labelPrev != 'string' && typeof props.labelNext != 'string';
});

/**
 * Event Listener on previous button
 * @param event
 */
function onPrev(event: Event) {
    if (isPrevDisabled.value || isPrevLoading.value) {
        return;
    }
    emits('prev', event, props);
}

/**
 * Event Listener on next button
 * @param event
 */
function onNext(event: Event) {
    if (isNextDisabled.value || isNextLoading.value) {
        return;
    }
    emits('next', event, props);
}
</script>

<style scoped>
</style>
