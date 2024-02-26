<template>
    <teleport :to="props.target ? props.target : '#app'" v-if="visibleBounced">
        <div class="modal" :class="[
            `modal-${props.size || 'md'}`
        ]" ref="modal" @click="onClickOutside">
            <div class="modal-dialog" ref="dialog">
                <header class="dialog-header" v-if="$slots.header || props.title">
                    <slot name="header" v-if="$slots.header"></slot>
                    <div class="dialog-title" v-else-if="props.title">{{ props.title }}</div>

                    <button type="button" class="dialog-close" @click="close" v-if="props.closable">
                        <X :stroke-width="1.5" />
                    </button>
                </header>

                <article class="dialog-body" v-if="$slots.default">
                    <slot name="default"></slot>
                </article>

                <footer class="dialog-footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
export interface BaseDialogProps {
    /**
     * The desired dialog title, can be used instead of the header slot.
     */
    title?: string | null;

    /**
     * The desired dialog size.
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * Includes a modal-backdrop element. Using 'static' adds a backdrop modal which does not 
     * close the modal when clicked.
     */
    backdrop?: boolean | 'status';

    /**
     * The dialog visibility state.
     */
    visible?: boolean;

    target?: string;

    /**
     * Shows an X-button inside the header, which closes the modal.
     */
    closable?: boolean;
}

export interface BaseDialogSlots {
    /**
     * The default dialog content slot.
     */
    default(): any;

    /**
     * Custom dialog header slot content.
     */
    header(): any;

    /**
     * Custom dialog footer slot content.
     */
    footer(): any;
}

export interface BaseDialogEmits {
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
    name: 'BaseDialog'
}
</script>

<script lang="ts" setup>
import { X } from 'lucide-vue-next';
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import wait from '@/utils/wait';

// Define Component
const props = defineProps<BaseDialogProps>();
defineSlots<BaseDialogSlots>();
const emits = defineEmits<BaseDialogEmits>();

// States
const modal = ref<HTMLElement|null>(null);
const dialog = ref<HTMLElement|null>(null);
const visibleState = ref<boolean>(false);
const visibleBounced = ref<boolean>(false);

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
    if (!modal.value || modal.value.classList.contains('visible')) {
        return;
    }
    
    // Show
    emits('show');
    await wait(10);
    modal.value.classList.add('visible');
    
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
    if (!modal.value || !modal.value.classList.contains('visible')) {
        return;
    }
    
    // Hide
    emits('hide');
    await wait(10);
    modal.value.classList.remove('visible');

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
function onClickOutside(event: Event|PointerEvent) {
    if (!dialog.value || !dialog.value) {
        return;
    }

    let target = event.target as HTMLElement;
    if (dialog.value == target || dialog.value.contains(target)) {
        return;
    }

    emits('clickOutside');
    if ((props.backdrop || true) == true) {
        close();
    }
}

// Expose Methods
defineExpose({
    open,
    close,
});
</script>

<style>
.modal {
    @apply inset-0 fixed w-full h-full flex justify-center items-center py-10;
    @apply overflow-x-hidden overflow-y-auto outline-none;
    @apply opacity-0 bg-gray-950/70;
    @apply duration-300 ease-in-out transition-opacity;
    z-index: 100;
    perspective: 100px;

    &.visible {
        @apply mt-0 opacity-100;
    }
}

.modal-dialog {
    @apply relative m-auto w-full rounded-lg shadow-lg opacity-0;
    @apply bg-gray-50 dark:bg-gray-900;
    @apply duration-300 ease-in-out;
    transform: rotateX(20deg) translate(0, -120px) scale(1, 0.2);
    transition-property: transform, opacity;
    
    .visible & {
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

.dialog-header {
    @apply w-full flex justify-between items-center;

    .dialog-title {
        @apply px-5 py-3 text-sm uppercase;
    }

    .dialog-close {
        @apply w-12 h-12 flex items-center justify-center basis-12 ml-auto rounded-none rounded-tr-xl shadow-none outline-none self-start;
        @apply bg-gray-200 dark:bg-gray-800;
    }
}

.dialog-body {
    @apply w-full flex text-sm overflow-x-auto;

    .dialog-content {
        @apply px-5 py-2;

        p:not(:last-child) {
            @apply mb-2;
        }
    }
}

.dialog-footer {
    @apply w-full flex;

    & .dialog-actions {
        @apply px-2 py-2;

        &.dialog-actions-col {
            @apply flex flex-col w-full;
        }
    }
}
</style>
