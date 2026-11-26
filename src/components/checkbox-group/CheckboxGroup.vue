<template>
    <div
        role="group"
        data-slot="checkbox-group"
        :data-variant="variant"
        :data-orientation="orientation"
        :aria-disabled="disabled || undefined"
        @click.capture="guard"
        @keydown.capture="guard"
        :class="
            cn(
                'flex gap-3',
                orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
                props.wrapperClass,
            )
        ">
        <input
            v-if="required"
            type="text"
            class="sr-only"
            tabindex="-1"
            aria-hidden="true"
            :value="value?.length ? 'selected' : ''"
            :required="!isReadonly"
            :disabled="disabled"
            @invalid.prevent="
                ($event.currentTarget as HTMLInputElement).parentElement
                    ?.querySelector<HTMLButtonElement>('[role=checkbox]')
                    ?.focus()
            " />
        <slot :model-value="value" :toggle="toggle">
            <Checkbox
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :variant="option.variant"
                :model-value="(value ?? []).includes(option.value)"
                :value="option.value"
                :name="name"
                :size="size"
                :class="props.class"
                :readonly="isReadonly"
                :disabled="disabled || option.disabled"
                :aria-invalid="$attrs['aria-invalid']"
                @update:model-value="toggle(option, $event)" />
        </slot>
    </div>
</template>
<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { Checkbox } from '../checkbox';
import { checkboxVariantKey } from '../checkbox/context';
import { useReadonlyField } from '../field/readonly';

export interface CheckboxOption {
    variant?: InlineVariant;
    value: string;
    label: string;
    disabled?: boolean;
}
const props = withDefaults(
    defineProps<{
        variant?: InlineVariant;
        modelValue?: string[];
        defaultValue?: string[];
        options?: CheckboxOption[];
        orientation?: 'vertical' | 'horizontal';
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        wrapperClass?: HTMLAttributes['class'];
        size?: 'sm' | 'default' | 'lg';
        name?: string;
        class?: HTMLAttributes['class'];
    }>(),
    { options: () => [], orientation: 'vertical', size: 'default', variant: 'default' },
);
provide(
    checkboxVariantKey,
    computed(() => props.variant),
);
const { readonly: isReadonly, guard } = useReadonlyField(() => props.readonly);
const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>();
const value = useVModel(props, 'modelValue', emit, {
    passive: true,
    defaultValue: props.defaultValue ?? [],
});
function toggle(option: CheckboxOption, checked: boolean | 'indeterminate'): void {
    if (props.disabled || isReadonly.value || option.disabled) return;
    const selected = value.value ?? [];
    value.value =
        checked === true
            ? [...new Set([...selected, option.value])]
            : selected.filter((item) => item !== option.value);
}
</script>
