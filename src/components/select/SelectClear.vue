<template>
    <Button
        v-if="!context.isEmptyModelValue.value"
        data-slot="select-clear"
        type="button"
        variant="ghost"
        :size="size"
        icon-only
        :disabled="disabled || context.disabled?.value"
        :aria-label="label || trans('common.actions.clear')"
        :class="props.class"
        @click="clear">
        <IconX class="size-4 shrink-0" aria-hidden="true" />
    </Button>
</template>
<script setup lang="ts">
import type { SelectSize } from './context';
import type { HTMLAttributes } from 'vue';
import { IconX } from '@tabler/icons-vue';
import { injectSelectRootContext } from 'reka-ui';
import { nextTick } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
const props = withDefaults(
    defineProps<{
        disabled?: boolean;
        label?: string;
        size?: SelectSize;
        class?: HTMLAttributes['class'];
    }>(),
    { size: 'default' },
);
const context = injectSelectRootContext();
const { trans } = useI18n();
async function clear(): Promise<void> {
    if (props.disabled || context.disabled?.value) return;
    context.modelValue.value = context.multiple.value ? [] : undefined;
    context.onOpenChange(false);
    await nextTick();
    context.triggerElement.value?.focus();
}
</script>
