<template>
    <div ref="content" class="content" :class="[
        props.transition ? `content-${props.transition}` : null
    ]" :style="styles">
        <slot name="default" v-bind="props" />
    </div>
</template>

<script lang="ts">
export type CollapseSupportTransitions = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end';

/**
 * CollapseSupport Properties
 */
export interface CollapseSupportProps {
    /**
     * Collapsed State
     */
    collapsed: boolean;

    /**
     * The duration until the content is fully toggled, you can either pass the time in milliseconds 
     * or a control-value to calculate the duration dynamically based on the amount of content.
     */
    duration?: number | 'slow' | 'normal' | 'fast';

    /**
     * The desired transition timing function to be used for the collapsing.
     */
    transition?: CollapseSupportTransitions;

    /**
     * Whether to keep an eye on the default content slot or not.
     */
    track?: boolean;
}

/**
 * CollapseSupport Slots
 */
export interface CollapseSupportSlots {
    /**
     * Primary CollapseSupport content.
     * @param props 
     */
    default(props: CollapseSupportProps): any;
}

/**
 * CollapseSupport Emits
 */
export interface CollapseSupportEmits {
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
    name: 'CollapseSupport'
}
</script>

<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from 'vue';
import wait from '../../utils/wait';

// Define Component
const props = defineProps<CollapseSupportProps>();
const slots = defineSlots<CollapseSupportSlots>();
const emits = defineEmits<CollapseSupportEmits>();

// States
const content = ref<HTMLElement>();
const visible = ref<boolean>();
const styles = reactive<{ height: string, transitionDuration: string }>({
    height: '0px',
    transitionDuration: '300ms'
});

/**
 * Watch Property Changes
 */
watch(props, async newValue => {
    if (!(newValue && typeof newValue.collapsed != 'undefined')) {
        return;
    }
    
    if (newValue.collapsed) {
        await hide();
    } else if (!newValue.collapsed) {
        await show();
    }
}, { immediate: true });

/**
 * Watch Property Changes
 */
watch(slots.default, async newValue => {
    if (!visible.value || !props.track) {
        return;
    }
    await wait(10);
    
    const [height, duration] = await calculate();
    if (height == null || duration == null) {
        visible.value = false;
        return;
    }
    styles.height = `${height}px`;
    await wait(duration);
}, { immediate: true });

/**
 * Show collapsed object
 */
async function show() {
    if (visible.value) {
        return;
    }

    // Show start
    emits('show');
    visible.value = true;
    
    // Show transition
    const [height, duration] = await calculate();
    if (height == null || duration == null) {
        visible.value = false;
        return;
    }

    styles.transitionDuration = `${duration}ms`;
    await wait(10);

    styles.height = `${height}px`;
    await wait(duration);

    // Show end
    emits('shown');
}

/**
 * Hide collapsed object
 */
async function hide() {
    if (!visible.value) {
        return;
    }

    // Hide start
    emits('hide');
    visible.value = false;

    // Hide transition
    styles.height = `0px`;
    await wait(parseInt(styles.transitionDuration.slice(0, -2)));

    // Hide end
    emits('hidden');
}

/**
 * Calculate Content height
 * @param content 
 */
async function calculate(): Promise<[null|number, null|number]> {
    if (!content.value) {
        await nextTick();
        if (!content.value) {
            return [null, null];
        }
    }

    const parent = content.value.parentElement;
    if (!parent) {
        return [null, null];
    }

    // Clone Object
    const clone = content.value.cloneNode(true) as HTMLElement;
    clone.style.height = 'auto';
    clone.style.position = 'absolute';
    clone.style.opacity = '0';
    clone.style.overflow = 'visible';

    // Fetch Height
    parent.appendChild(clone);
    const height = clone.offsetHeight;

    // Calculate Duration
    let duration = props.duration;
    if (duration == 'fast') {
        duration = Math.max(Math.ceil(height / 15), 150);
    } else if (duration == 'normal' || (!duration && duration !== 0)) {
        duration = Math.max(Math.ceil(height / 10), 300);
    } else if (duration == 'slow') {
        duration = Math.max(Math.ceil(height / 5), 500);
    }

    // Return
    clone.remove();
    return [height, duration as number];
}
</script>

<style scoped>
.content {
    @apply w-full h-0 overflow-hidden;
    @apply ease-in-out;
    transition-property: height;
}

/* Timing Functions */
.content.content-ease {
    transition-timing-function: ease;
}
.content.content-ease-in {
    @apply ease-in;
}
.content.content-ease-out {
    @apply ease-out;
}
.content.content-ease-in-out {
    @apply ease-in-out;
}
.content.content-linear {
    @apply ease-linear;
}
.content.content-step-start {
    transition-timing-function: step-start;
}
.content.content-step-end {
    transition-timing-function: step-end;
}
</style>
