<template>
    <DialogStd ref="dialog" v-bind="dialogProps" v-model:visible="isVisible">
        <template #default>
            <slot name="default" v-bind="props" />
        </template>
        
        <template #footer>
            <div class="dialog-actions">
                <ButtonGroup>
                    <ButtonStd v-if="props.cancelLabel != false"
                        :label="props.cancelLabel" 
                        :color="props.cancelColor || 'secondary'" 
                        :size="client.screen.width < BREAKPOINT_MD ? 'sm' : 'md'"
                        :loading="props.loading"
                        @click="onCancel" />
                    <ButtonStd v-if="props.submitLabel != false"
                        :label="props.submitLabel" 
                        :color="props.submitColor || 'primary'" 
                        :size="client.screen.width < BREAKPOINT_MD ? 'sm' : 'md'"
                        :loading="props.loading"
                        @click="onSubmit" />
                </ButtonGroup>
            </div>
        </template>
    </DialogStd>
</template>

<script lang="ts">
import type { ButtonStdProps } from '../button/ButtonStd.vue';
import type { DialogStdEmits, DialogStdProps } from './DialogStd.vue';

/**
 * ConfirmDialog Properties
 */
export interface ConfirmDialogProps extends DialogStdProps {
    /**
     * The desired label used for the Cancel button, or false to remove the button.
     */
    cancelLabel?: string | false;

    /**
     * The desired color used for the Cancel button.
     */
    cancelColor?: ButtonStdProps['color'];
    
    /**
     * The desired label used for the Submit button, or false to remove the button.
     */
    submitLabel?: string | false;

    /**
     * The desired color used for the Submit button.
     */
    submitColor?: ButtonStdProps['color'];

    /**
     * Loading State, passed to both buttons.
     */
    loading?: boolean;
}

/**
 * ConfirmDialog Slots
 */
 export interface ConfirmDialogSlots {
    /**
     * The default confirm dialog content slot.
     * @param props 
     */
    default(props: ConfirmDialogProps): any;
}

/**
 * ConfirmDialog Events
 */
export interface ConfirmDialogEmits extends DialogStdEmits {
    /**
     * When the confirmation has been submitted.
     */
    (ev: 'submit'): void;
    
    /**
     * When the confirmation has been canceled.
     */
    (ev: 'cancel'): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'ConfirmDialog'
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import DialogStd from './DialogStd.vue';
import ButtonGroup from '../button/ButtonGroup.vue';
import ButtonStd from '../button/ButtonStd.vue';
import { useClient } from '../../composables/use-client';
import { BREAKPOINT_MD } from '../../constants/breakpoints';

// Define Component
const props = withDefaults(defineProps<ConfirmDialogProps>(), {
    cancelLabel: 'Cancel',
    submitLabel: 'Submit',
    backdrop: true
});
const slots = defineSlots<ConfirmDialogSlots>();
const emits = defineEmits<ConfirmDialogEmits>();

// Stores
const client = useClient();

// States
const dialog = ref<InstanceType<typeof DialogStd>>();
const isVisible = computed<boolean>({
    get() {
        return props.visible || false;
    },
    set(value: boolean) {
        emits('update:visible', value);
    }
});
const dialogProps = computed<DialogStdProps>(() => Object.fromEntries(
    Object.entries({ ...props }).filter(
        ([key, val]) => !['cancelLabel', 'cancelColor', 'submitLabel', 'submitColor', 'loading'].includes(key)
    )
));

/**
 * Handle Cancel Action
 * @param event
 */
function onCancel(event: Event) {
    emits('cancel');
}

/**
 * Handle Submit Action
 * @param event
 */
function onSubmit(event: Event) {
    emits('submit');
}

// Expose Component
defineExpose({
    visible: isVisible,
    dialog: dialog,
    open: dialog.value?.open,
    close: dialog.value?.close,
});
</script>

<style scoped>
</style>
