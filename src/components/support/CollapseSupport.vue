<template>
    <div ref="content" class="content" :style="styles">
        <slot name="default" v-bind="props" />
    </div>
</template>

<script lang="ts">
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
    transitionDuration: `${typeof props.duration == 'number' ? props.duration : 300}ms`
});

/**
 * Watch Property Changes
 */
watch(props, async newValue => {
    if (typeof newValue.duration == 'number') {
        styles.transitionDuration = `${newValue.duration}ms`;
    }

    if (newValue.collapsed && (visible.value || visible.value === void 0)) {
        emits('hide');
        visible.value = false;
        styles.height = `0px`;
        await wait(typeof props.duration == 'number' ? props.duration : 300);
        emits('hidden');
    } else if (!newValue.collapsed && !visible.value) {
        emits('show');
        visible.value = true;
        styles.height = `${(await calculate())}px`;
        await wait(typeof props.duration == 'number' ? props.duration : 300);
        emits('shown');
    }
}, { immediate: true });

/**
 * Calculate Content height
 * @param content 
 */
async function calculate() {
    if (!content.value) {
        await nextTick();
        if (!content.value) {
            return;
        }
    }

    const parent = content.value.parentElement;
    if (!parent) {
        return;
    }

    const clone = content.value.cloneNode(true) as HTMLElement;
    clone.style.height = 'auto';
    clone.style.position = 'absolute';
    clone.style.opacity = '0';
    clone.style.overflow = 'visible';

    parent.appendChild(clone);
    const height = clone.offsetHeight;

    clone.remove();
    return height;
}
</script>

<style scoped>
.content {
    @apply h-0 overflow-hidden;
    @apply duration-300 ease-in-out;
    transition-property: height;
}
</style>
