<template>
    <Combobox
        v-model="value"
        v-model:open="open"
        :name="name"
        :required="required"
        :disabled="disabled"
        open-on-focus
        open-on-click
        :reset-model-value-on-clear="false">
        <ComboboxAnchor :class="cn('relative w-full', props.class)">
            <ComboboxInput
                v-bind="$attrs"
                :id="id"
                :disabled="disabled"
                :placeholder="placeholder"
                :aria-label="label || placeholder"
                :aria-invalid="invalid || undefined"
                :display-value="displayValue"
                :disable-icon="false"
                :wrapper-class="size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : undefined"
                :class="
                    cn(
                        'bg-background pl-9 pr-16 text-left text-foreground',
                        size === 'sm' && 'h-8 text-xs',
                        size === 'lg' && 'h-12 text-base',
                        invalid && 'border-danger',
                    )
                "
                @blur="emit('blur')" />
            <Button
                v-if="clearable && value"
                data-slot="combobox-clear"
                variant="ghost"
                size="xs"
                icon-only
                :aria-label="trans('common.actions.clear')"
                class="absolute top-1/2 right-8 -translate-y-1/2"
                :disabled="disabled"
                @click="value = null">
                <IconX />
            </Button>
            <ComboboxTrigger as-child>
                <Button
                    variant="ghost"
                    size="xs"
                    icon-only
                    :disabled="disabled"
                    :aria-label="trans('common.actions.open')"
                    class="absolute top-1/2 right-1.5 -translate-y-1/2">
                    <IconChevronDown class="size-4 shrink-0 opacity-50" aria-hidden="true" />
                </Button>
            </ComboboxTrigger>
        </ComboboxAnchor>
        <ComboboxList
            class="w-(--reka-combobox-trigger-width) min-w-48 max-w-[calc(100vw-2rem)]"
            align="start">
            <ComboboxViewport>
                <ComboboxEmpty>
                    {{ emptyLabel || trans('common.datatable.no_entries') }}
                </ComboboxEmpty>
                <ComboboxGroup>
                    <ComboboxItem
                        v-for="option in options"
                        :key="option.value"
                        :value="option.value"
                        :disabled="option.disabled"
                        :text-value="option.label">
                        <slot name="option" :option="option">{{ option.label }}</slot>
                        <ComboboxItemIndicator><IconCheck class="size-4" /></ComboboxItemIndicator>
                    </ComboboxItem>
                </ComboboxGroup>
            </ComboboxViewport>
        </ComboboxList>
    </Combobox>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { IconCheck, IconChevronDown, IconX } from '@tabler/icons-vue';
import { ComboboxTrigger } from 'reka-ui';
import { computed, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import Combobox from './Combobox.vue';
import ComboboxAnchor from './ComboboxAnchor.vue';
import ComboboxEmpty from './ComboboxEmpty.vue';
import ComboboxGroup from './ComboboxGroup.vue';
import ComboboxInput from './ComboboxInput.vue';
import ComboboxItem from './ComboboxItem.vue';
import ComboboxItemIndicator from './ComboboxItemIndicator.vue';
import ComboboxList from './ComboboxList.vue';
import ComboboxViewport from './ComboboxViewport.vue';
export interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        modelValue?: string | null;
        options: ComboboxOption[];
        id?: string;
        name?: string;
        label?: string;
        placeholder?: string;
        emptyLabel?: string;
        disabled?: boolean;
        required?: boolean;
        invalid?: boolean;
        clearable?: boolean;
        size?: 'sm' | 'default' | 'lg';
        class?: HTMLAttributes['class'];
    }>(),
    { modelValue: null, size: 'default', disabled: false, clearable: false },
);
const emit = defineEmits<{ 'update:modelValue': [value: string | null]; blur: [] }>();
const { trans } = useI18n();
const open = ref(false);
const value = computed({
    get: () => props.modelValue ?? null,
    set: (next: unknown) =>
        emit('update:modelValue', next == null || next === '' ? null : String(next)),
});
const displayValue = (value: unknown) =>
    props.options.find((option) => option.value === value)?.label ?? '';
</script>
