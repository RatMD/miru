<template>
    <teleport :to="props.target ? props.target : '#app'" v-if="visibleBounced">
        <div class="modal" :class="[
            `modal-${props.size || 'md'}`,
            isVisible ? `is-visible` : ''
        ]" ref="modal">
            <div class="modal-dialog" ref="dialog" v-click-outside="onClickOutside">
                <slot name="dialog" v-bind="props">
                    <header class="dialog-header" v-if="$slots.header || props.title">
                        <slot name="header" v-bind="props">
                            <div class="dialog-title" v-if="props.title">{{ props.title }}</div>
                        </slot>
    
                        <button type="button" class="dialog-close" @click="close" v-if="props.closable">
                            <LucideXSign :stroke-width="1.5" />
                        </button>
                    </header>
    
                    <article class="dialog-body" v-if="$slots.default">
                        <slot name="default" v-bind="props"></slot>
                    </article>
    
                    <footer class="dialog-footer" v-if="$slots.footer">
                        <slot name="footer" v-bind="props"></slot>
                    </footer>
                </slot>
            </div>
        </div>
        <BackdropSupport :visible="isVisible" v-if="props.backdrop" />
    </teleport>
</template>

<script lang="ts">
/**
 * DialogStd Props
 */
export interface DialogStdProps {
    /**
     * The desired <teleport> target, default value is `#app`.
     */
    target?: null | string;

    /**
     * The desired dialog title, can be used instead of the header slot.
     */
    title?: string | null;

    /**
     * The desired dialog size.
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
     * The dialog visibility state.
     */
    visible?: boolean;
}

/**
 * DialogStd Slots
 */
export interface DialogStdSlots {
    /**
     * The default dialog content slot.
     * @param props 
     */
    default(props: DialogStdProps): any;

    /**
     * Custom dialog header slot content.
     * @param props 
     */
    header(props: DialogStdProps): any;

    /**
     * Custom dialog footer slot content.
     * @param props 
     */
    footer(props: DialogStdProps): any;

    /**
     * Replace the whole dialog slot structure with a custom one.
     * @param props 
     */
    dialog(props: DialogStdProps): any;
}

/**
 * DialogStd Emits
 */
export interface DialogStdEmits {
    /**
     * Visibility state changed.
     */
    (ev: 'update:visible', value: boolean): void;

    /**
     * Before the modal / dialog is actually shown.
     */
    (ev: 'show'): void;

    /**
     * After the modal / dialog is available, but before the transition has been completed.
     */
    (ev: 'open'): void;

    /**
     * After the modal / dialog is available and fully visible.
     */
    (ev: 'shown'): void;

    /**
     * Before the modal / dialog is actually be removed.
     */
    (ev: 'hide'): void;
    
    /**
     * Before the modal / dialog is actually be removed, but after the transition has been started.
     */
    (ev: 'close'): void;

    /**
     * After the modal / dialog has been fully removed.
     */
    (ev: 'hidden'): void;

    /**
     * When a click outside the modal occurred.
     */
    (ev: 'clickOutside'): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'DialogStd'
}
</script>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import LucideXSign from '../lucide/XSign.vue';
import BackdropSupport from '../support/BackdropSupport.vue';
import wait from '../../utils/wait';

// Define Component
const props = withDefaults(defineProps<DialogStdProps>(), {
    backdrop: true
});
const slots = defineSlots<DialogStdSlots>();
const emits = defineEmits<DialogStdEmits>();

// States
const modal = ref<HTMLElement|null>(null);
const dialog = ref<HTMLElement|null>(null);

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
 * Open Modal
 */
async function open() {
    visibleBounced.value = true;
    await wait(10);
    if (!modal.value || isVisible.value) {
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
    if (!modal.value || !isVisible.value) {
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
    if (!modal.value || props.static) {
        return;
    }

    emits('clickOutside');
    if ((props.backdrop || true) == true) {
        await close();
    }
}

// Expose Methods
defineExpose({
    visible: isVisible,
    open,
    close,
});
</script>

<style scoped>
.modal {
    @apply inset-0 fixed w-full h-full flex justify-center items-center py-10;
    @apply overflow-x-hidden overflow-y-auto outline-none;
    @apply opacity-0;
    @apply duration-300 ease-in-out transition-opacity;
    z-index: 100;
    perspective: 100px;

    &.is-visible {
        @apply mt-0 opacity-100;
    }
}

.modal-dialog {
    @apply relative m-auto w-full rounded-lg shadow-lg opacity-0;
    @apply bg-gray-50 dark:bg-gray-900;
    @apply duration-300 ease-in-out;
    transform: rotateX(20deg) translate(0, -120px) scale(1, 0.2);
    transition-property: transform, opacity;
    
    .is-visible & {
        @apply opacity-100;
        transform: rotateX(0deg) translate(0, 0);
    }
}

/** Modal Sizes */
.modal-xs .modal-dialog {
    max-width: 240px;
}

.modal-sm .modal-dialog {
    max-width: 320px;
}

.modal-md .modal-dialog {
    max-width: 480px;
}

.modal-lg .modal-dialog {
    max-width: 720px;
}

.modal-xl .modal-dialog {
    max-width: 1040px;
}

.modal-dialog :slotted(.dialog-header) {
    @apply w-full flex justify-between items-center;

    & .dialog-title {
        @apply px-5 py-3 text-sm uppercase;
    }

    & .dialog-close {
        @apply w-12 h-12 flex items-center justify-center basis-12 ml-auto rounded-none rounded-tr-xl shadow-none outline-none self-start;
        @apply bg-gray-200 dark:bg-gray-800;
    }
}

.modal-dialog :slotted(.dialog-body) {
    @apply w-full flex text-sm overflow-x-auto;

    & .dialog-content {
        @apply px-5 py-2;

        p:not(:last-child) {
            @apply mb-2;
        }
    }
}

.modal-dialog :slotted(.dialog-footer) {
    @apply w-full flex;

    & .dialog-actions {
        @apply px-2 py-2;

        &.dialog-actions-col {
            @apply flex flex-col w-full;
        }
    }
}
</style>
