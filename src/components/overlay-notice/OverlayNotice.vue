<template>
    <Overlay
        v-model:open="open"
        :title="title"
        :description="description"
        :variant="variant"
        :icon="icon"
        :loading="loading"
        :dismissible="dismissible"
        :width-class="widthClass"
        :size="size">
        <template v-if="$slots.trigger" #trigger><slot name="trigger" /></template>
        <template v-if="$slots.description" #description><slot name="description" /></template>
        <template v-if="$slots.default" #default><slot /></template>
        <template #footer>
            <div class="flex flex-wrap justify-end gap-2">
                <slot name="actions" />
                <Button
                    type="button"
                    class="w-full sm:w-auto"
                    :variant="closeButton?.variant ?? 'outline'"
                    :size="closeButton?.size ?? 'default'"
                    :disabled="loading || closeButton?.disabled"
                    @click="close">
                    <component :is="closeIcon" v-if="closeIcon" />
                    {{ closeButton?.label ?? trans('common.actions.close') }}
                </Button>
            </div>
        </template>
    </Overlay>
</template>
<script setup lang="ts">
import type { DialogSize } from '../dialog';
import type { OverlayAction } from '../overlay/action-types';
import type { Component } from 'vue';
import { IconInfoCircle, IconX } from '@tabler/icons-vue';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Overlay } from '../overlay';
const { trans, transChoice, locale } = useI18n();

const props = withDefaults(
    defineProps<{
        title: string;
        description: string;
        variant?: 'default' | 'danger';
        icon?: Component | null;
        closeButton?: OverlayAction;
        loading?: boolean;
        dismissible?: boolean;
        size?: DialogSize;
        widthClass?: string;
    }>(),
    {
        variant: 'default',
        size: 'lg',
        dismissible: true,
        icon: () => IconInfoCircle,
        loading: false,
    },
);
const open = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{ close: [] }>();
const closeIcon = computed(() =>
    props.closeButton?.icon === undefined ? IconX : props.closeButton.icon,
);
function close(): void {
    if (props.loading || props.closeButton?.disabled) return;
    open.value = false;
    emit('close');
}
</script>
