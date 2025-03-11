<template>
    <teleport :to="props.target ? props.target : $miru('root')" v-if="visibleBounced">
        <div ref="offcanvas" class="offcanvas" :class="[
            `offcanvas-${props.size || 'md'}`,
            `offcanvas-${props.placement || 'right'}`,
            isVisible ? `is-visible` : ''
        ]" v-click-outside="onClickOutside">
            <slot name="offcanvas" v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle">
                <header class="offcanvas-header" v-if="$slots.header || props.title">
                    <slot name="header" v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle">
                        <div class="offcanvas-title">{{ props.title }}</div>
                    </slot>
                    <ShadowButton :icon="LucideXSign" @click="close" class="mr-5" v-if="props.closable" />
                </header>

                <article ref="offcanvasContent" class="offcanvas-article">
                    <slot name="article" v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle">
                        <div class="offcanvas-content">
                            <slot name="default" v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle"></slot>
                        </div>
                    </slot>
                </article>

                <header class="offcanvas-footer" v-if="$slots.footer">
                    <slot name="footer" v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle" />
                </header>
            </slot>
        </div>
        <BackdropSupport :visible="isVisible" v-if="props.backdrop" />
    </teleport>
</template>

<script lang="ts">
/**
 * OffcanvasStd Props
 */
export interface OffcanvasStdProps {
    /**
     * The desired <teleport> target, default value is `#app`.
     */
    target?: null | string;

    /**
     * Offcanvas title, used when no header slot is present.
     */
    title?: string | null;

    /**
     * Offcanvas placement, uses right as default.
     */
    placement?: 'top' | 'left' | 'right' | 'bottom';

    /**
     * Offcanvas size, uses md as default.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * Whether to use the additional backdrop or not.
     */
    backdrop?: boolean;

    /**
     * Whether to use a backdrop (don't close on click outside) or not.
     */
    static?: boolean;

    /**
     * Whether to display an x-close button inside the header or not.
     */
    closable?: boolean;

    /**
     * Whether to allow closing a modal by using escape or not.
     */
    escape?: boolean;

    /**
     * v-model visible ref.
     */
    visible?: boolean;
}

/**
 * OffcanvasStd Props
 */
export interface OffcanvasStdSlotProps extends OffcanvasStdProps {
    /**
     * Visible State
     */
    visible: boolean;
    
    /**
     * Open Offcanvas
     */
    open: () => void;
    
    /**
     * Close Offcanvas
     */
    close: () => void; 
    
    /**
     * Toggle Offcanvas
     */
    toggle: () => void; 
}

/**
 * OffcanvasStd Slots
 */
export interface OffcanvasStdSlots {
    /**
     * The default offcanvas content slot.
     * @param props 
     */
    default(props: OffcanvasStdSlotProps): any;

    /**
     * Header Offcanvas slot, rendered instead of title property.
     * @param props 
     */
    header(props: OffcanvasStdSlotProps): any;

    /**
     * Footer Offcanvas slot
     * @param props 
     */
    footer(props: OffcanvasStdSlotProps): any;

    /**
     * Footer Offcanvas slot
     * @param props 
     */
    article(props: OffcanvasStdSlotProps): any;

    /**
     * Replace the whole offcanvas slot structure with a custom one.
     * @param props 
     */
    offcanvas(props: OffcanvasStdSlotProps): any;
}

/**
 * OffcanvasStd Emits
 */
export interface OffcanvasStdEmits {
    /**
     * Visibility state changed.
     */
    (ev: 'update:visible', value: boolean): void;

    /**
     * Before the offcanvas is actually shown.
     */
    (ev: 'show'): void;

    /**
     * After the offcanvas is available, but before the transition has been completed.
     */
    (ev: 'open'): void;

    /**
     * After the offcanvas is available and fully visible.
     */
    (ev: 'shown'): void;

    /**
     * Before the offcanvas is actually be removed.
     */
    (ev: 'hide'): void;
    
    /**
     * Before the offcanvas is actually be removed, but after the transition has been started.
     */
    (ev: 'close'): void;

    /**
     * After the offcanvas has been fully removed.
     */
    (ev: 'hidden'): void;

    /**
     * When a click outside the offcanvas occurred.
     */
    (ev: 'clickOutside'): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'OffcanvasStd'
}
</script>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import LucideXSign from '../lucide/XSign.vue';
import ShadowButton from '../button/ShadowButton.vue';
import BackdropSupport from '../support/BackdropSupport.vue';
import wait from '../../utils/wait';

// Define Component
const props = withDefaults(defineProps<OffcanvasStdProps>(), {
    backdrop: true
});
const slots = defineSlots<OffcanvasStdSlots>();
const emits = defineEmits<OffcanvasStdEmits>();

// States
const offcanvas = ref<HTMLElement>();
const offcanvasContent = ref<HTMLDivElement>();

const visibleState = ref<boolean>(false);
const visibleBounced = ref<boolean>(false);
const isVisible = ref<boolean>(false);

// Component mounted
onMounted(() => {
    if (props.escape) {
        document.addEventListener('keyup', onCloseEscape);
    }
});

// Component unmounted
onBeforeUnmount(() => {
    close();
});

// Watch property changes
watch(props, newValue => {
    if (visibleState.value != newValue.visible) {
        visibleState.value = newValue.visible;
    }
}, { immediate: true });

// Watch visibility changes
watch(visibleState, async newValue => {
    if (newValue && !visibleBounced.value) {
        await nextTick();
        await open();
    } else if (!newValue && visibleBounced.value) {
        await close();
        await nextTick();
    }
}, { immediate: true });

/**
 * Toggle Offcanvas
 */
async function toggle() {
    if (isVisible.value) {
        await close();
    } else {
        await open();
    }
}

/**
 * Open Offcanvas
 */
async function open() {
    visibleBounced.value = true;
    await wait(10);
    if (!offcanvas.value || isVisible.value) {
        return;
    }
    
    // Show
    emits('show');
    await wait(10);
    isVisible.value = true;
    
    // Opened
    emits('open');
    await wait(300);

    // Shown
    emits('shown');

    // v-model handling
    emits('update:visible', true);
}

/**
 * Close Modal
 */
async function close() {
    if (!offcanvas.value || !isVisible.value) {
        return;
    }
    
    // Hide
    emits('hide');
    await wait(10);
    isVisible.value = false;

    // Closing
    emits('close');
    await wait(300);

    // Hidden
    emits('hidden');
    await wait(10);
    visibleBounced.value = false;

    // v-model handling
    emits('update:visible', false);
}

/**
 * Event Listener - Click Escape
 * @param event 
 */
 async function onCloseEscape(event: KeyboardEvent) {
    if (!offcanvas.value) {
        return;
    }
    if (event.key != 'Escape') {
        return;
    }
    if (props.static) {
        return;
    }
    
    await close();
}

/**
 * Event Listener - Click Outside
 * @param event 
 */
async function onClickOutside(event: Event|PointerEvent) {
    if (!offcanvas.value || props.static) {
        return;
    }

    emits('clickOutside');
    if ((props.backdrop || true) == true) {
        await close();
    }
}

// Expose Component
defineExpose({
    visible: isVisible,
    open,
    close
});
</script>

<style scoped>
.offcanvas {
    @apply fixed flex flex-col max-h-full;
    @apply duration-200 ease-in-out transition-transform;
    @apply bg-white dark:bg-gray-800;
    width: 250px;
    z-index: 1000;
}

/* Placements */
.offcanvas.offcanvas-top {
    @apply w-full top-0 left-0 right-0 -translate-y-full;

    &.is-visible {
        @apply translate-y-0;
    }
}

.offcanvas.offcanvas-bottom {
    @apply w-full left-0 right-0 bottom-0 translate-y-full;

    &.is-visible {
        @apply translate-y-0;
    }
}

.offcanvas.offcanvas-left {
    @apply top-0 left-0 bottom-0 -translate-x-full;
    
    &.is-visible {
        @apply translate-x-0;
    }
}

.offcanvas.offcanvas-right {
    @apply top-0 right-0 bottom-0 translate-x-full;

    &.is-visible {
        @apply translate-x-0;
    }
}

/* Sizes */
.offcanvas.offcanvas-sm {
    &.offcanvas-top,
    &.offcanvas-bottom {
        height: 100%;
        
        @screen sm {
            height: 250px;
        }
    }
    
    &.offcanvas-left,
    &.offcanvas-right {
        width: 100%;

        @screen sm {
            width: 250px;
        }
    }
}

.offcanvas.offcanvas-md {
    &.offcanvas-top,
    &.offcanvas-bottom {
        height: 100%;
        
        @screen sm {
            height: 400px;
        }
    }

    &.offcanvas-left,
    &.offcanvas-right {
        width: 100%;
        
        @screen sm {
            width: 400px;
        }
    }
}

.offcanvas.offcanvas-lg {
    &.offcanvas-top,
    &.offcanvas-bottom {
        height: 100%;
        
        @screen md {
            height: 560px;
        }
    }

    &.offcanvas-left,
    &.offcanvas-right {
        width: 100%;
        
        @screen md {
            width: 560px;
        }
    }
}

/* Offcanvas Header */
.offcanvas :slotted(.offcanvas-header) {
    @apply sticky top-0 flex w-full justify-between items-center;

    & .offcanvas-title {
        @apply text-lg px-5 py-3 font-semibold font-header;
    }
}

/* Offcanvas Article */
.offcanvas :slotted(.offcanvas-article) {
    @apply flex-1 flex flex-col overflow-x-auto;
}
.offcanvas :slotted(.offcanvas-content) {
    @apply px-5 py-2;
}
</style>
