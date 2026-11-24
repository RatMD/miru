<template>
    <div class="space-y-3">
        <Input
            v-model="search"
            :size="size"
            :placeholder="trans('common.form.search_relationships')"
            :disabled="disabled" />
        <div class="max-h-80 space-y-1 overflow-y-auto rounded-md border p-2">
            <button
                v-for="option in filteredOptions"
                :key="option.value"
                type="button"
                class="flex w-full cursor-pointer items-center gap-3 rounded px-2 py-2 text-left text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="disabled || option.disabled"
                :aria-pressed="modelValue.includes(option.value)"
                @click="toggle(option.value, !modelValue.includes(option.value))">
                <Checkbox
                    as="span"
                    aria-hidden="true"
                    class="pointer-events-none"
                    :model-value="modelValue.includes(option.value)"
                    :disabled="disabled || option.disabled" />
                <FormText :text="option.label" />
            </button>
            <p
                v-if="filteredOptions.length === 0"
                class="px-2 py-8 text-center text-sm text-muted-foreground">
                {{ trans('common.states.empty') }}
            </p>
        </div>
        <p class="text-xs text-muted-foreground">
            {{ trans('common.form.selected_count', { count: modelValue.length }) }}
        </p>
    </div>
</template>

<script setup lang="ts">
import type { FormOption } from './types';
import { computed, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Checkbox } from '../checkbox';
import { Input } from '../input';
import FormText from './FormText.vue';
const props = defineProps<{
    modelValue: string[];
    options: FormOption[];
    disabled?: boolean;
    size?: 'default' | 'sm';
}>();
const emit = defineEmits<{
    (event: 'update:modelValue', value: string[]): void;
}>();
const search = ref('');
const filteredOptions = computed(() => {
    const query = search.value.trim().toLocaleLowerCase();
    if (query === '') return props.options;

    return props.options.filter((option) => optionText(option).toLocaleLowerCase().includes(query));
});

function optionText(option: FormOption): string {
    return 'translation' in option.label
        ? trans(option.label.translation, stringReplacements(option.label.replacements))
        : option.label.value;
}

function stringReplacements(
    replacements?: Record<string, string | number>,
): Record<string, string> | undefined {
    return replacements === undefined
        ? undefined
        : Object.fromEntries(
              Object.entries(replacements).map(([key, value]) => [key, String(value)]),
          );
}

function toggle(value: string, selected: boolean): void {
    emit(
        'update:modelValue',
        selected
            ? [...new Set([...props.modelValue, value])]
            : props.modelValue.filter((current) => current !== value),
    );
}

const { trans } = useI18n();
</script>
