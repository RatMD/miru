<template>
    <teleport :to="props.target ? props.target : '#app'" v-if="visibleBounced">
        <div ref="modal" :class="classNames">
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
    
                    <article class="dialog-body" v-if="$slots.default || $slots.body">
                        <slot name="body" v-bind="props">
                            <div class="dialog-content">
                                <slot name="default" v-bind="props"></slot>
                            </div>
                        </slot>
                    </article>
    
                    <footer class="dialog-footer" v-if="$slots.footer">
                        <slot name="footer" v-bind="props" />
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
     * Whether to allow closing a modal by using escape or not.
     */
    escape?: boolean;

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

    /**
     * Replace the inner body slot structure with a custom one.
     * @param props 
     */
    body(props: DialogStdProps): any;
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue';
import LucideXSign from '../lucide/XSign.vue';
import BackdropSupport from '../support/BackdropSupport.vue';
import wait from '../../utils/wait';

// Define Component
const attrs = useAttrs();
const props = withDefaults(defineProps<DialogStdProps>(), {
    escape: true,
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

const classNames = computed<string[]>(() => {
    const result = ['modal', `modal-${props.size || 'md'}`];

    if (isVisible.value) {
        result.push('is-visible');
    }

    if (typeof attrs.class != 'undefined') {
        if (typeof attrs.class == 'string') {
            result.push(attrs.class);
        } else if (Array.isArray(attrs.class)) {
            result.push(...attrs.class);
        }
    }

    return result;
});

// Component mounted
onMounted(() => {
    if (props.escape) {
        document.addEventListener('keyup', onCloseEscape);
    }
});

// Before component unmounted
onBeforeUnmount(() => {
    document.removeEventListener('keyup', onCloseEscape);
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
 * Event Listener - Click Escape
 * @param event 
 */
async function onCloseEscape(event: KeyboardEvent) {
    if (!modal.value) {
        return;
    }
    if (event.key != 'Escape') {
        return;
    }

    if (props.static) {
        modal.value.classList.add('wobble');
        setTimeout(() => {
            if (modal.value) {
                modal.value.classList.remove('wobble');
            }
        }, 550);
        return;
    }
    
    await close();
}

/**
 * Event Listener - Click Outside
 * @param event 
 */
async function onClickOutside(event: Event|PointerEvent) {
    if (!modal.value) {
        return;
    }

    if (props.static) {
        modal.value.classList.add('wobble');
        setTimeout(() => {
            if (modal.value) {
                modal.value.classList.remove('wobble');
            }
        }, 550);
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
@keyframes keyframe-wobble {
    0% {
        transform: none;
    }
    15% {
        transform: translate3d(-10%, 0, 0) rotate3d(0, 0, 1, -5deg);
    }
    30% {
        transform: translate3d(8%, 0, 0) rotate3d(0, 0, 1, 3deg);
    }
    45% {
        transform: translate3d(-6%, 0, 0) rotate3d(0, 0, 1, -3deg);
    }
    60% {
        transform: translate3d(4%, 0, 0) rotate3d(0, 0, 1, 2deg);
    }
    75% {
        transform: translate3d(-2%, 0, 0) rotate3d(0, 0, 1, -1deg);
    }
    100% {
        transform: none;
    }
}

.modal {
    @apply inset-0 fixed w-full h-full flex justify-center items-center py-10;
    @apply overflow-x-hidden overflow-y-auto outline-none;
    @apply opacity-0;
    @apply duration-300 ease-in-out transition-opacity;
    z-index: 1000;
    perspective: 100px;

    &.is-visible {
        @apply mt-0 opacity-100;
    }
}

.modal-dialog {
    @apply relative m-auto w-full flex flex-col rounded-lg shadow-lg overflow-hidden opacity-0;
    @apply bg-gray-50 dark:bg-gray-900;
    @apply duration-300 ease-in-out;
    transform: rotateX(20deg) translate(0, -120px) scale(1, 0.2);
    transition-property: transform, opacity;
    
    .is-visible & {
        @apply opacity-100;
        transform: rotateX(0deg) translate(0, 0);
    }
}

/** Wobble */
.modal.wobble .modal-dialog {
    transition-property: none;
    animation: keyframe-wobble 500ms linear 0ms 1;
}

/** Modal Sizes */
.modal-xs .modal-dialog {
    max-width: 240px;
}
.modal-sm .modal-dialog {
    max-width: calc(100% - 1.5rem);
    
    @media (min-width: 340px) {
        max-width: 420px;
    }
}
.modal-md .modal-dialog {
    max-width: calc(100% - 1.5rem);
    
    @media (min-width: 520px) {
        max-width: 480px;
    }
}
.modal-lg .modal-dialog {
    max-width: calc(100% - 1.5rem);
    
    @screen md {
        max-width: 720px;
    }
}
.modal-xl .modal-dialog {
    max-width: calc(100% - 1.5rem);

    @screen xl {
        max-width: 1040px;
    }
}

/** Modal Header */
.modal-dialog :slotted(.dialog-header) {
    @apply w-full shrink-0 grow-0 basis-full flex items-center self-stretch;

    & .dialog-title {
        @apply w-full px-5 py-3 text-sm uppercase;
        @apply md:text-xl md:font-semibold md:normal-case;
    }

    & .dialog-close {
        @apply w-12 h-12 flex items-center justify-center basis-12 ml-auto rounded-none shadow-none outline-none self-start;
        @apply duration-300 ease-in-out transition-colors;
        @apply bg-gray-100 dark:bg-gray-800;

        &:hover {
            @apply bg-gray-200;
        }

        @screen md {
            @apply absolute top-1 right-1 w-10 h-10 rounded-full
        }
    }
}

/** Modal Body */
.modal-dialog :slotted(.dialog-body) {
    @apply w-full shrink-0 grow-0 basis-full flex text-sm overflow-x-auto;

    @screen md {
        @apply text-base;
    }

    & .dialog-content {
        @apply w-full px-5 py-4;

        & p:not(:last-child) {
            @apply mb-2;
        }
    }
}
.modal-dialog :slotted(.dialog-header + .dialog-body) {
    & .dialog-content {
        @apply pt-2;
    }
}

/** Modal Footer */
.modal-dialog :slotted(.dialog-footer) {
    @apply w-full flex text-sm mt-2;

    & .dialog-actions {
        @apply w-full px-2 py-2 border-t border-solid;
        @apply bg-gray-100 border-gray-200;

        &.dialog-actions-col {
            @apply flex flex-col w-full;
        }
    }
}
</style>
