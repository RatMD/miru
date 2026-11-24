<template>
    <OverlayChoice
        :open="open"
        :title="title"
        :description="description"
        :variant="
            !confirmVariant || ['danger', 'danger'].includes(confirmVariant) ? 'danger' : 'default'
        "
        :primary="{ label: confirmLabel, variant: confirmVariant ?? 'danger', icon: confirmIcon }"
        :trigger-label="triggerLabel"
        :secondary="{ label: cancelLabel }"
        close-on-confirm
        @update:open="$emit('update:open', $event)"
        @confirm="$emit('confirm', optionEnabled)">
        <template v-if="$slots.description" #description><slot name="description" /></template>
        <template v-if="optionLabel" #default>
            <div class="flex items-start gap-3 rounded-md border border-danger/30 bg-danger/5 p-3">
                <Checkbox
                    :id="optionId"
                    :model-value="optionEnabled"
                    class="mt-0.5 bg-white dark:bg-white"
                    @update:model-value="optionEnabled = $event === true" />
                <label :for="optionId" class="cursor-pointer text-sm leading-5">
                    {{ optionLabel }}
                </label>
            </div>
        </template>
        <template v-if="$slots['confirm-icon']" #confirm-icon>
            <slot name="confirm-icon" />
        </template>
    </OverlayChoice>
</template>

<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { Component } from 'vue';
import { ref, useId, watch } from 'vue';
import { Checkbox } from '../checkbox';
import { OverlayChoice } from '../overlay-choice';

const props = defineProps<{
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    optionLabel?: string;
    confirmVariant?: ButtonVariants['variant'];
    confirmIcon?: Component | null;
    triggerLabel?: string;
}>();

defineEmits<{
    (event: 'update:open', value: boolean): void;
    (event: 'confirm', optionEnabled: boolean): void;
}>();

const optionId = `data-table-confirmation-option-${useId()}`;
const optionEnabled = ref(false);

watch(
    () => props.open,
    (open) => {
        if (open) {
            optionEnabled.value = false;
        }
    },
);
</script>
