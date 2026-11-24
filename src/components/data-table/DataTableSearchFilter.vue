<template>
    <SelectSearch
        :model-value="model"
        @update:model-value="model = $event ?? '__all__'"
        :options="options"
        :label="label"
        :disabled="disabled"
        size="sm" />
</template>
<script setup lang="ts">
import type { ListFilterOption } from './contracts';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { SelectSearch } from '../select';
const props = defineProps<{ options: ListFilterOption[]; label: string; disabled?: boolean }>();
const model = defineModel<string>({ required: true });
const { trans } = useI18n();
const options = computed(() => [
    { value: '__all__', label: trans('common.datatable.all'), pinned: true },
    ...props.options.map((option) => ({
        value: option.value,
        label: option.label_key ? trans(option.label_key) : (option.label ?? ''),
        disabled: option.disabled,
    })),
]);
</script>
