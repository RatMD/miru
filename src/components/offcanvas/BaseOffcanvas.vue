<template>
    <teleport :to="props.target ? props.target : '#app'">
        <div ref="offcanvas" class="offcanvas" :class="[
            props.placement ? `offcanvas-${placement}`: 'offcanvas-right',
            props.size  ? `offcanvas-${size}`: 'offcanvas-md'
            ]">
            <header class="offcanvas-header" :class="{ 'header-title': !$slots.header && props.title }" v-if="$slots.header || props.title">
                <slot name="header" v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle">
                    <div class="offcanvas-title">{{ props.title }}</div>
                </slot>
                <ShadowButton :icon="X" @click="close" />
            </header>

            <article ref="offcanvasContent" class="offcanvas-content">
                <slot v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle" />
            </article>

            <header class="offcanvas-footer" v-if="$slots.footer">
                <slot name="footer" v-bind="props" :visible="isVisible" :open="open" :close="close" :toggle="toggle" />
            </header>
        </div>
        <div ref="backdrop" class="offcanvas-backdrop" @click="onClickOutside" v-if="props.backdrop"></div>
    </teleport>
</template>

<script lang="ts">
export interface BaseOffcanvasProps {
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
     * Use additional Popover Backdrop.
     */
    backdrop?: boolean;

    target?: string;

    /**
     * v-model visible ref.
     */
    visible?: boolean;
}

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

export interface BaseOffcanvasEmits {
    /**
     * Update v-model value.
     */
    (ev: 'update:visible', value: boolean): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'BaseOffcanvas'
}
</script>

<script lang="ts" setup>
import {
    X
} from 'lucide-vue-next';
import Scrollbar from 'smooth-scrollbar';
import { computed, nextTick, ref, watch } from 'vue';

import ShadowButton from '@/components/button/ShadowButton.vue';

// Define Component
const props = defineProps<BaseOffcanvasProps>();
const slots = defineSlots<BaseOffcanvasSlots>();
const emits = defineEmits<BaseOffcanvasEmits>();

// States
const visibleDelay = ref<boolean>(false);
const backdrop = ref<HTMLElement>();
const offcanvas = ref<HTMLElement>();
const offcanvasContent = ref<HTMLDivElement>();
const isVisible = computed({
    get() {
        return props.visible;
    },
    set(value: boolean) {
        emits('update:visible', value);
    }
});

/**
 * Watch Visible State
 */
 watch(isVisible, async newValue => {
    if (newValue) {
        visibleDelay.value = true;
        await nextTick();

        if (offcanvas.value) {
            offcanvas.value.classList.add('offcanvas-visible');
        }
        if (backdrop.value) {
            backdrop.value.classList.add('backdrop-visible');
        }
    } else {
        if (backdrop.value) {
            backdrop.value.classList.remove('backdrop-visible');
        }
        if (offcanvas.value) {
            offcanvas.value.classList.remove('offcanvas-visible');
        }

        setTimeout(() => {
            visibleDelay.value = false;
        }, 300);
    }
});

/**
 * Watch Offcanvas Content
 */
watch(offcanvasContent, () => {
    if (offcanvasContent.value) {
        Scrollbar.init(offcanvasContent.value);
    }
});

/**
 * Toggle Popover
 */
function toggle() {
}

/**
 * Open Popover
 */
 function open() {
    isVisible.value = true;
}

/**
 * Close Popover
 */
function close() {
    isVisible.value = false;
}

/**
 * Click outside event handler
 * @param ev
 */
function onClickOutside() {
    close();
}

// Expose Component
defineExpose({
    visible: isVisible,
    open,
    close,
    toggle
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

        &.offcanvas-visible {
            @apply translate-y-0;
        }
    }
    
    &.offcanvas-bottom {
        @apply w-full left-0 right-0 bottom-0 -translate-y-full;

        &.offcanvas-visible {
            @apply translate-y-0;
        }
    }
    
    &.offcanvas-left {
        @apply top-0 left-0 bottom-0 -translate-x-full;
        
        &.offcanvas-visible {
            @apply translate-x-0;
        }
    }
    
    &.offcanvas-right {
        @apply top-0 right-0 bottom-0 translate-x-full;

        &.offcanvas-visible {
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

.offcanvas-backdrop {
    @apply inset-0 fixed pointer-events-none;
    @apply duration-300 ease-in-out;
    @apply bg-gray-950/0;
    z-index: 99;
    transition-property: background-color, backdrop-filter;
    
    &.backdrop-visible {
        @apply pointer-events-auto;
        @apply bg-gray-950/25 dark:bg-gray-950/80;
        backdrop-filter: blur(5px);
    }
}
</style>
