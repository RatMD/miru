<template>
    <div data-slot="data-table-filter-field" class="space-y-2">
        <label
            v-if="configuration.type === 'checkbox' || configuration.type === 'switch'"
            class="flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 text-sm font-medium">
            <component
                :is="configuration.type === 'switch' ? Switch : Checkbox"
                :model-value="modelValue === 'true'"
                :disabled="disabled"
                @update:model-value="
                    emit('update:modelValue', $event === true ? 'true' : '__all__')
                " />
            {{ label }}
        </label>
        <template v-else>
            <Label :for="id">{{ label }}</Label>
            <Popover v-if="configuration.type === 'multiselect'">
                <PopoverTrigger as-child>
                    <Button
                        :id="id"
                        type="button"
                        variant="outline"
                        size="sm"
                        class="w-full justify-between"
                        :disabled="disabled"
                        :aria-label="label">
                        <span class="truncate">
                            {{ selectedLabel || trans('common.datatable.all') }}
                        </span>
                        <IconChevronDown class="size-4 shrink-0" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-(--reka-popover-trigger-width) min-w-56 p-2" align="start">
                    <Input
                        v-if="configuration.searchable"
                        v-model="search"
                        size="sm"
                        class="mb-2"
                        :disabled="disabled"
                        :placeholder="trans('common.datatable.search')"
                        :aria-label="trans('common.datatable.search')" />
                    <div
                        class="max-h-64 space-y-1 overflow-y-auto"
                        role="group"
                        :aria-label="label">
                        <Checkbox
                            v-for="option in matchingOptions"
                            :key="option.value"
                            :model-value="selected.includes(option.value)"
                            :label="optionLabel(option)"
                            :disabled="disabled || option.disabled"
                            class="rounded px-2 py-1.5"
                            @update:model-value="toggle(option.value, $event === true)" />
                        <p v-if="!matchingOptions.length" class="p-2 text-sm text-muted-foreground">
                            {{ trans('common.datatable.no_entries') }}
                        </p>
                    </div>
                </PopoverContent>
            </Popover>
            <div
                v-else-if="
                    configuration.type === 'date-range' || configuration.type === 'number-range'
                "
                class="grid grid-cols-2 gap-3">
                <div v-for="bound in bounds" :key="bound" class="space-y-1">
                    <Label :for="id + '-' + bound" class="text-xs text-muted-foreground">
                        {{ trans('common.datatable.range_' + bound) }}
                    </Label>
                    <Input
                        :id="id + '-' + bound"
                        :type="configuration.type === 'date-range' ? 'date' : 'number'"
                        :model-value="range[bound]"
                        :min="
                            bound === 'to'
                                ? range.from === '' || range.from == null
                                    ? configuration.min
                                    : range.from
                                : configuration.min
                        "
                        :max="
                            bound === 'from'
                                ? range.to === '' || range.to == null
                                    ? configuration.max
                                    : range.to
                                : configuration.max
                        "
                        :step="
                            configuration.step ??
                            (configuration.type === 'number-range' ? 'any' : undefined)
                        "
                        :disabled="disabled"
                        :aria-invalid="invalid || undefined"
                        :aria-describedby="invalid ? id + '-error' : undefined"
                        :aria-label="label + ': ' + trans('common.datatable.range_' + bound)"
                        @update:model-value="
                            emit('update:modelValue', { ...range, [bound]: $event })
                        " />
                </div>
            </div>
            <FormHierarchySelect
                v-else-if="configuration.type === 'category'"
                :id="id"
                :model-value="single"
                :options="categoryOptions"
                :aria-label="label"
                :searchable="configuration.searchable"
                :disabled="disabled"
                empty-value="__all__"
                clearable
                @update:model-value="emit('update:modelValue', $event)" />
            <DataTableSearchFilter
                v-else-if="configuration.searchable"
                :model-value="single"
                :options="configuration.options"
                :label="label"
                :disabled="disabled"
                @update:model-value="emit('update:modelValue', $event)" />
            <Select
                v-else
                :model-value="single"
                :disabled="disabled"
                @update:model-value="emit('update:modelValue', $event)">
                <SelectTrigger :id="id" size="sm" class="w-full" :aria-label="label">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="__all__">{{ trans('common.datatable.all') }}</SelectItem>
                    <SelectItem
                        v-for="option in configuration.options"
                        :key="option.value"
                        :value="option.value"
                        :disabled="option.disabled">
                        {{ optionLabel(option) }}
                    </SelectItem>
                </SelectContent>
            </Select>
            <p v-if="invalid" :id="id + '-error'" role="alert" class="text-sm text-danger">
                {{ trans('common.datatable.invalid_range') }}
            </p>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { ListFilterConfiguration, ListFilterOption } from './contracts';
import { IconChevronDown } from '@tabler/icons-vue';
import { computed, ref, useId } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import FormHierarchySelect from '../form/FormHierarchySelect.vue';
import { Input } from '../input';
import { Label } from '../label';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Switch } from '../switch';
import DataTableSearchFilter from './DataTableSearchFilter.vue';
import { filterRangeInvalid, filterValueLabel, isFilterRange } from './filter-values';

const props = defineProps<{
    configuration: ListFilterConfiguration;
    modelValue: unknown;
    disabled?: boolean;
}>();
const emit = defineEmits<{ 'update:modelValue': [value: unknown] }>();
const { trans, locale } = useI18n();
const id = 'table-filter-' + useId();
const invalid = computed(() => filterRangeInvalid(props.configuration, props.modelValue));
const bounds = ['from', 'to'] as const;
const search = ref('');
const label = computed(() =>
    props.configuration.label_key
        ? trans(props.configuration.label_key)
        : (props.configuration.label ?? ''),
);
const single = computed(() =>
    typeof props.modelValue === 'string' ? props.modelValue : '__all__',
);
const selected = computed<string[]>(() =>
    Array.isArray(props.modelValue) ? props.modelValue.map(String) : [],
);
const range = computed(() =>
    isFilterRange(props.modelValue) ? props.modelValue : { from: '', to: '' },
);
const categoryOptions = computed(() =>
    props.configuration.options.map((option) => ({ ...option, label: optionLabel(option) })),
);
const selectedLabel = computed(() => filterValueLabel(props.configuration, selected.value, trans));
const matchingOptions = computed(() =>
    props.configuration.options.filter((option) =>
        optionLabel(option)
            .toLocaleLowerCase(locale.value)
            .includes(search.value.trim().toLocaleLowerCase(locale.value)),
    ),
);
function optionLabel(option: ListFilterOption): string {
    return option.label_key ? trans(option.label_key) : (option.label ?? '');
}
function toggle(value: string, checked: boolean): void {
    if (
        props.disabled ||
        props.configuration.options.find((option) => option.value === value)?.disabled
    )
        return;
    emit(
        'update:modelValue',
        checked
            ? [...new Set([...selected.value, value])]
            : selected.value.filter((item) => item !== value),
    );
}
</script>
