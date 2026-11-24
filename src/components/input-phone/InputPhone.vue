<template>
    <div :class="cn('flex w-full min-w-0 gap-2', props.class)">
        <Select
            :model-value="selectedCountry"
            :disabled="disabled"
            @update:model-value="changeCountry(String($event))">
            <SelectTrigger
                :size="size"
                class="w-24 shrink-0 bg-background text-foreground dark:bg-background"
                :class="size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'"
                :aria-invalid="$attrs['aria-invalid']"
                :aria-valid="$attrs['aria-valid']"
                :aria-label="countryCodeLabel">
                <SelectValue :placeholder="countryCodeLabel">
                    {{ selectedCallingCode }}
                </SelectValue>
            </SelectTrigger>
            <SelectContent size="sm">
                <SelectItem
                    v-for="country in countries"
                    :key="country.value"
                    :value="country.value">
                    <span class="flex items-center gap-2">
                        <IconPin v-if="country.pinned" class="size-3.5 text-muted-foreground" />
                        {{ country.label }}
                    </span>
                </SelectItem>
            </SelectContent>
        </Select>
        <Input
            v-bind="$attrs"
            :id="id"
            :size="size"
            :disabled="disabled"
            :model-value="nationalNumber"
            type="tel"
            inputmode="numeric"
            autocomplete="tel-national"
            :placeholder="placeholder"
            @update:model-value="changeNumber(String($event))" />
    </div>
</template>

<script setup lang="ts">
import type { CallingCodeOption } from './types';
import type { HTMLAttributes } from 'vue';
import { IconPin } from '@tabler/icons-vue';
import { computed, ref, watch } from 'vue';
import { cn } from '../../support/classNames';
import { Input } from '../input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        id?: string;
        size?: 'sm' | 'default' | 'lg';
        disabled?: boolean;
        class?: HTMLAttributes['class'];
        modelValue?: string | null;
        countries: CallingCodeOption[];
        countryCodeLabel: string;
        placeholder: string;
        defaultCallingCode?: string;
    }>(),
    { modelValue: null, size: 'default', disabled: false },
);
const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>();
const selectedCountry = ref('');
const nationalNumber = ref('');
const selectedCallingCode = computed(
    () =>
        props.countries.find((country) => country.value === selectedCountry.value)?.callingCode ??
        '',
);

watch(
    [() => props.modelValue, () => props.countries, () => props.defaultCallingCode],
    ([value]) => parseValue(value),
    { immediate: true, deep: true },
);

function parseValue(value: string | null | undefined): void {
    const number = String(value ?? '').trim();
    const matches = props.countries
        .filter((country) => number.startsWith(country.callingCode))
        .sort((left, right) => right.callingCode.length - left.callingCode.length);
    const country =
        matches[0] ??
        props.countries.find((option) => option.callingCode === props.defaultCallingCode) ??
        props.countries.find((option) => option.pinned) ??
        props.countries[0];

    selectedCountry.value = country?.value ?? '';
    nationalNumber.value = digits(
        country && number.startsWith(country.callingCode)
            ? number.slice(country.callingCode.length)
            : number,
    );
}

function changeCountry(value: string): void {
    selectedCountry.value = value;
    emitValue();
}

function changeNumber(value: string): void {
    nationalNumber.value = digits(value);
    emitValue();
}

function emitValue(): void {
    if (nationalNumber.value === '') {
        emit('update:modelValue', null);
        return;
    }

    const callingCode =
        props.countries.find((country) => country.value === selectedCountry.value)?.callingCode ??
        '';
    emit('update:modelValue', callingCode + nationalNumber.value);
}

function digits(value: string): string {
    return value.replace(/\D+/g, '');
}
</script>
