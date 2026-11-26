<template>
    <Tooltip>
        <TooltipTrigger as-child>
            <component
                :is="disabled ? 'span' : trigger"
                class="inline-flex items-center"
                v-bind="disabled ? {} : { asChild: true }"
                :aria-label="label">
                <component
                    :is="buttonStyle === 'shadow' ? ButtonShadow : ButtonAction"
                    :size="size"
                    :variant="
                        action === 'cancel' ? 'danger' : action === 'submit' ? 'success' : 'default'
                    "
                    :muted="action === 'edit' && muted"
                    v-bind="buttonStyle === 'action' ? { borderless: 'yes' as const } : {}"
                    :aria-label="label"
                    :disabled="disabled"
                    :loading="action === 'submit' && loading">
                    <component
                        :is="
                            action === 'edit' ? IconPencil : action === 'cancel' ? IconX : IconCheck
                        "
                        :class="size === 'xs' ? 'size-3' : 'size-3.5'" />
                </component>
            </component>
        </TooltipTrigger>
        <TooltipContent>{{ label }}</TooltipContent>
    </Tooltip>
</template>
<script setup lang="ts">
import { IconPencil, IconX, IconCheck } from '@tabler/icons-vue';
import { EditableEditTrigger, EditableCancelTrigger, EditableSubmitTrigger } from 'reka-ui';
import { computed } from 'vue';
import { ButtonAction } from '../button-action';
import { ButtonShadow } from '../button-shadow';
import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';
const props = defineProps<{
    action: 'edit' | 'cancel' | 'submit';
    size: 'xs' | 'sm';
    buttonStyle: 'action' | 'shadow';
    label: string;
    disabled: boolean;
    loading: boolean;
    muted: boolean;
}>();
const trigger = computed(() =>
    props.action === 'edit'
        ? EditableEditTrigger
        : props.action === 'cancel'
          ? EditableCancelTrigger
          : EditableSubmitTrigger,
);
</script>
