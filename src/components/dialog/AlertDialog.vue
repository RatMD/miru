<template>
    <DialogStd ref="dialog" 
        v-bind="dialogProps" 
        v-model:visible="isVisible"
        @show="() => emits('show')"
        @open="() => emits('open')"
        @shown="() => emits('shown')"
        @hide="() => emits('hide')"
        @close="() => emits('close')"
        @hidden="() => emits('hidden')"
        @clickOutside="() => emits('clickOutside')">
        <template #default>
            <slot name="default" v-bind="props" />
        </template>
        
        <template #footer>
            <div class="dialog-actions">
                <ButtonStd v-if="props.buttonLabel != false"
                    :label="props.buttonLabel" 
                    :color="props.buttonColor || 'danger'" 
                    :size="client.screen.width < BREAKPOINT_MD ? 'sm' : 'md'"
                    :loading="props.loading"
                    @click="onCancel" />
            </div>
        </template>
    </DialogStd>
</template>

<script lang="ts">
import type { ButtonStdProps } from '../button/ButtonStd.vue';
import type { DialogStdEmits, DialogStdProps } from './DialogStd.vue';

/**
 * AlertDialog Properties
 */
export interface AlertDialogProps extends DialogStdProps {
    /**
     * The desired label used for the primary button.
     */
    buttonLabel?: string | false;

    /**
     * The desired color used for the primary button.
     */
    buttonColor?: ButtonStdProps['color'];

    /**
     * Loading State, passed to the primary button.
     */
    loading?: boolean;
}

/**
 * AlertDialog Slots
 */
 export interface AlertDialogSlots {
    /**
     * The default confirm dialog content slot.
     * @param props 
     */
    default(props: AlertDialogProps): any;
}

/**
 * AlertDialog Events
 */
export interface AlertDialogEmits extends DialogStdEmits {
    /**
     * When the confirmation has been canceled.
     */
    (ev: 'cancel'): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'AlertDialog'
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import DialogStd from './DialogStd.vue';
import ButtonStd from '../button/ButtonStd.vue';
import { useClient } from '../../composables/use-client';
import { BREAKPOINT_MD } from '../../constants/breakpoints';

// Define Component
const props = withDefaults(defineProps<AlertDialogProps>(), {
    buttonLabel: 'Close',
    buttonColor: 'danger',
    backdrop: true
});
const slots = defineSlots<AlertDialogSlots>();
const emits = defineEmits<AlertDialogEmits>();

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
        ([key, val]) => !['buttonLabel', 'buttonColor', 'loading'].includes(key)
    )
));

/**
 * Handle Cancel Action
 * @param event
 */
function onCancel(event: Event) {
    emits('cancel');
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
.dialog-actions {
    @apply text-end
}
</style>
