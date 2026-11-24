<template>
    <div data-slot="form-locale-switcher" :class="cn('space-y-1.5', props.class)">
        <Select :model-value="modelValue" @update:model-value="selectLocale">
            <SelectTrigger
                size="sm"
                :id="selectorId"
                :aria-label="trans('common.form.editing_language')"
                class="min-w-26 rounded-full! text-xs!">
                <IconLanguage aria-hidden="true" class="size-3.5 shrink-0" />
                <SelectValue><FormTextComponent :text="currentLocale" /></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="locale in locales" :key="locale.value" :value="locale.value">
                    <span class="flex items-center gap-2 text-xs">
                        <FormTextComponent :text="locale.label" />
                    </span>
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>

<script setup lang="ts">
import type { FormLocaleOption, FormText } from './types';
import type { HTMLAttributes } from 'vue';
import { IconLanguage } from '@tabler/icons-vue';
import { computed, useId } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import FormTextComponent from './FormText.vue';

export interface ComponentProps {
    modelValue: string;
    locales: FormLocaleOption[];
    baseLocale: string;
    class?: HTMLAttributes['class'];
}

const props = defineProps<ComponentProps>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const { trans } = useI18n();
const selectorId = `form-locale-${useId()}`;
const currentLocale = computed<FormText>(
    () =>
        props.locales.find((item) => item.value === props.modelValue)?.label ?? {
            value: trans('common.form.unknown_locale'),
        },
);
function selectLocale(value: unknown): void {
    emit('update:modelValue', String(value));
}
</script>
