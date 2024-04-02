<template>
    <teleport :to="props.target ? props.target : '#app'" v-if="visibleBounced">
        <div ref="offcanvas" class="offcanvas" :class="[
            `offcanvas-${props.size || 'md'}`,
            `offcanvas-${props.placement || 'right'}`,
            isVisible ? `is-visible` : ''
        ]" v-click-outside="onClickOutside">
            <header class="offcanvas-header" :class="{ 'header-title': !$slots.header && props.title }" v-if="$slots.header || props.title">
                <slot name="header" v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle">
                    <div class="offcanvas-title">{{ props.title }}</div>
                </slot>
                <ShadowButton :icon="LucideXSign" @click="close" />
            </header>

            <article ref="offcanvasContent" class="offcanvas-content">
                <slot v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle" />
            </article>

            <header class="offcanvas-footer" v-if="$slots.footer">
                <slot name="footer" v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle" />
            </header>
        </div>
        <BackdropSupport :visible="isVisible" v-if="props.backdrop" />
    </teleport>
</template>

<script lang="ts">
/**
 * BaseOffcanvas Props
 */
export interface BaseOffcanvasProps {
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
     * v-model visible ref.
     */
    visible?: boolean;
}

/**
 * BaseOffcanvas Props
 */
export interface BaseOffcanvasSlotsProps extends BaseOffcanvasProps {
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
 * BaseOffcanvas Slots
 */
export interface BaseOffcanvasSlots {
    /**
     * Header Offcanvas slot, rendered instead of title property.
     * @param props 
     */
    header(props: BaseOffcanvasSlotsProps): any;

    /**
     * The default offcanvas content slot.
     * @param props 
     */
    default(props: BaseOffcanvasSlotsProps): any;

    /**
     * Footer Offcanvas slot
     * @param props 
     */
    footer(props: BaseOffcanvasSlotsProps): any;
}

/**
 * BaseOffcanvas Emits
 */
export interface BaseOffcanvasEmits {
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
    name: 'BaseOffcanvas'
}
</script>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import LucideXSign from '../lucide/XSign.vue';
import ShadowButton from '../button/ShadowButton.vue';
import BackdropSupport from '../support/BackdropSupport.vue';
import wait from '../../utils/wait';

// Define Component
const props = withDefaults(defineProps<BaseOffcanvasProps>(), {
    backdrop: true
});
const slots = defineSlots<BaseOffcanvasSlots>();
const emits = defineEmits<BaseOffcanvasEmits>();

// States
const offcanvas = ref<HTMLElement>();
const offcanvasContent = ref<HTMLDivElement>();

const visibleState = ref<boolean>(false);
const visibleBounced = ref<boolean>(false);
const isVisible = ref<boolean>(false);

/**
 * Component before unmount
 */
onBeforeUnmount(() => {
    close();
});

/**
 * Handle property changes
 */
watch(props, newValue => {
    if (visibleState.value != newValue.visible) {
        visibleState.value = newValue.visible;
    }
}, { immediate: true });

/**
 * Handle visibility changes
 */
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
    @apply duration-300 ease-in-out transition-transform;
    @apply bg-white dark:bg-gray-800;
    width: 250px;
    z-index: 100;

    /* Position */
    &.offcanvas-top {
        @apply w-full top-0 left-0 right-0 -translate-y-full;

        &.is-visible {
            @apply translate-y-0;
        }
    }
    
    &.offcanvas-bottom {
        @apply w-full left-0 right-0 bottom-0 translate-y-full;

        &.is-visible {
            @apply translate-y-0;
        }
    }
    
    &.offcanvas-left {
        @apply top-0 left-0 bottom-0 -translate-x-full;
        
        &.is-visible {
            @apply translate-x-0;
        }
    }
    
    &.offcanvas-right {
        @apply top-0 right-0 bottom-0 translate-x-full;

        &.is-visible {
            @apply translate-x-0;
        }
    }

    /* Sizes */
    &.offcanvas-sm {
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

    &.offcanvas-md {
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

    &.offcanvas-lg {
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
}

.offcanvas-header {
    @apply sticky top-0 flex w-full justify-between items-center;

    &.header-title {
        @apply p-4;
    }

    & :slotted(.offcanvas-title) {
        @apply text-lg font-semibold font-header;
    }

}

.offcanvas-content {
    @apply flex-1 overflow-x-auto;
}
</style>
