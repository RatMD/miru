<template>
    <Overlay
        v-model:open="open"
        :title="title"
        :description="description"
        :variant="danger ? 'danger' : 'default'"
        :icon="icon === undefined ? (danger ? IconAlertTriangle : null) : icon"
        :loading="loading"
        :dismissible="dismissible"
        :width-class="widthClass"
        :size="size">
        <template v-if="$slots.trigger" #trigger><slot name="trigger" /></template>
        <template v-if="$slots.description" #description><slot name="description" /></template>
        <template v-if="$slots.default || error" #default>
            <slot />
            <Alert v-if="error" variant="danger">
                <AlertDescription>{{ error }}</AlertDescription>
            </Alert>
        </template>
        <template #footer>
            <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    :variant="secondary?.variant ?? 'outline'"
                    :size="secondary?.size ?? 'default'"
                    :disabled="loading || secondary?.disabled"
                    @click="cancel">
                    <component :is="secondaryIcon" v-if="secondaryIcon" />
                    {{ secondary?.label ?? trans('common.actions.cancel') }}
                </Button>
                <Button
                    type="button"
                    :variant="primary?.variant ?? (danger ? 'danger' : 'success')"
                    :size="primary?.size ?? 'default'"
                    :disabled="disabled || primary?.disabled"
                    :loading="loading"
                    @click="confirm">
                    <slot name="confirm-icon">
                        <component :is="primaryIcon" v-if="primaryIcon" />
                    </slot>
                    {{ primary?.label ?? trans('common.dialogs.confirm') }}
                </Button>
            </div>
        </template>
    </Overlay>
</template>
<script setup lang="ts">
import type { DialogSize } from '../dialog';
import type { OverlayAction } from '../overlay/action-types';
import type { Component } from 'vue';
import { IconAlertTriangle, IconX } from '@tabler/icons-vue';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Alert, AlertDescription } from '../alert';
import { Button } from '../button';
import { Overlay } from '../overlay';
import { resolveOverlayActionIcon } from './actionIcon';
const { trans, transChoice, locale } = useI18n();

const props = withDefaults(
    defineProps<{
        title: string;
        description: string;
        variant?: 'default' | 'danger';
        icon?: Component | null;
        primary?: OverlayAction;
        triggerLabel?: string;
        secondary?: OverlayAction;
        disabled?: boolean;
        loading?: boolean;
        dismissible?: boolean;
        error?: string;
        closeOnConfirm?: boolean;
        size?: DialogSize;
        widthClass?: string;
    }>(),
    {
        variant: 'default',
        size: 'lg',
        dismissible: true,
        disabled: false,
        loading: false,
        error: '',
        closeOnConfirm: false,
    },
);
const open = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{ confirm: []; cancel: [] }>();
const danger = computed(() => props.variant === 'danger' || !!props.error);
const primaryIcon = computed(() =>
    resolveOverlayActionIcon(
        props.primary?.icon,
        props.triggerLabel ?? props.primary?.label ?? trans('common.dialogs.confirm'),
        trans('common.actions.delete'),
        props.variant === 'danger' || props.primary?.variant === 'danger',
    ),
);
const secondaryIcon = computed(() =>
    props.secondary?.icon === undefined ? IconX : props.secondary.icon,
);
/** Keep async confirmations open by default so validation errors can be displayed in place. */
function confirm(): void {
    if (props.loading || props.disabled || props.primary?.disabled) return;
    emit('confirm');
    if (props.closeOnConfirm) open.value = false;
}
function cancel(): void {
    if (props.loading || props.secondary?.disabled) return;
    open.value = false;
    emit('cancel');
}
</script>
