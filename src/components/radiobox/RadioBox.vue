<template>
    <component
        :is="group ? 'div' : RadioGroupRoot"
        v-bind="rootProps"
        data-slot="radiobox"
        :class="cn('flex items-center gap-2', props.class)">
        <RadioGroupItem
            v-bind="$attrs"
            :id="inputId"
            :value="value"
            :size="resolvedSize"
            :variant="variant"
            :disabled="disabled" />
        <Label
            v-if="label || $slots.default"
            :for="inputId"
            :class="
                cn(resolvedSize === 'sm' && 'text-xs', disabled && 'cursor-not-allowed opacity-50')
            ">
            <slot>{{ label }}</slot>
        </Label>
    </component>
</template>
<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { HTMLAttributes } from 'vue';
import { RadioGroupRoot } from 'reka-ui';
import { computed, inject, useId } from 'vue';
import { cn } from '../../support/classNames';
import { Label } from '../label';
import { RadioGroupItem, radioGroupSizeKey } from '../radio-group';

defineOptions({ inheritAttrs: false });
const props = defineProps<{
    variant?: InlineVariant;
    value: string;
    modelValue?: string;
    label?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    size?: 'sm' | 'default' | 'lg';
    class?: HTMLAttributes['class'];
}>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const group = inject(radioGroupSizeKey, undefined);
const resolvedSize = computed(() => props.size ?? group?.value ?? 'default');
const generatedId = useId();
const inputId = computed(() => props.id || generatedId);
const rootProps = computed(() =>
    group
        ? {}
        : {
              modelValue: props.modelValue,
              name: props.name,
              disabled: props.disabled,
              required: props.required,
              'onUpdate:modelValue': (value: unknown) => emit('update:modelValue', String(value)),
          },
);
</script>
