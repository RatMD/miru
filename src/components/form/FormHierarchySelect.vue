<template>
    <Select
        v-if="!searchable && !multiple"
        :name="name"
        :required="required"
        :readonly="readonly"
        :model-value="
            selectedValues[0] ?? (clearable ? allValue : allowNone ? noneValue : undefined)
        "
        :disabled="disabled"
        @update:model-value="updateSelection">
        <SelectTrigger
            :id="id"
            :size="size"
            :aria-label="ariaLabel ?? trans('common.form.hierarchy.label')"
            :aria-invalid="invalid"
            :class="cn('w-full min-w-0', triggerClass)"
            @blur="$emit('blur')">
            <SelectValue>{{ selectedLabel }}</SelectValue>
        </SelectTrigger>
        <SelectContent>
            <SelectItem v-if="clearable" :value="allValue">
                {{ allLabel ?? trans('common.datatable.all') }}
            </SelectItem>
            <SelectItem v-if="allowNone" :value="noneValue">
                {{ noneLabel ?? trans('common.form.hierarchy.none') }}
            </SelectItem>
            <SelectGroup v-for="group in optionGroups" :key="group.key">
                <SelectLabel v-if="group.label">{{ group.label }}</SelectLabel>
                <SelectItem
                    v-for="option in group.options"
                    :key="option.value"
                    :value="option.value"
                    :disabled="option.disabled"
                    :text-value="option.label"
                    :title="option.path ?? option.label"
                    :aria-label="option.path ?? option.label"
                    :style="{ paddingInlineStart: `${0.5 + (option.depth ?? 0) * 1.25}rem` }"
                    :class="option.depth === 0 ? 'font-semibold' : 'font-normal'">
                    <span v-if="option.depth" aria-hidden="true" class="text-muted-foreground">
                        ↳
                    </span>
                    {{ optionLabel(option) }}
                    <span v-if="option.count !== undefined" class="text-muted-foreground">
                        ({{ option.count }})
                    </span>
                </SelectItem>
            </SelectGroup>
            <p v-if="!options.length" class="px-2 py-3 text-sm text-muted-foreground">
                {{ trans('common.datatable.no_entries') }}
            </p>
        </SelectContent>
    </Select>
    <ComboboxRoot
        v-else
        ref="combobox"
        :open="readonly ? false : open"
        :model-value="selection"
        :name="name"
        :required="required"
        :readonly="readonly"
        :multiple="multiple"
        @click.capture="guard"
        @keydown.capture="guard"
        :disabled="disabled"
        ignore-filter
        @update:model-value="updateSelection"
        @update:open="
            (value) => {
                if (!readonly) open = value;
                search = '';
            }
        ">
        <ComboboxAnchor as-child>
            <ComboboxTrigger
                as-child
                tabindex="0"
                :aria-label="ariaLabel ?? trans('common.form.hierarchy.label')"
                @keydown.down.prevent="openPicker"
                @keydown.up.prevent="openPicker">
                <Button
                    :id="id"
                    type="button"
                    variant="outline"
                    :size="size === 'sm' ? 'sm' : 'default'"
                    :disabled="disabled"
                    :aria-label="ariaLabel ?? trans('common.form.hierarchy.label')"
                    :aria-invalid="invalid"
                    :class="cn('w-full min-w-0 justify-between font-normal', triggerClass)"
                    @blur="$emit('blur')">
                    <span class="truncate">{{ selectedLabel }}</span>
                    <IconChevronDown class="size-4 shrink-0 text-muted-foreground" />
                </Button>
            </ComboboxTrigger>
        </ComboboxAnchor>
        <ComboboxPortal>
            <ComboboxContent
                position="popper"
                align="start"
                :side-offset="4"
                class="z-50 flex w-(--reka-combobox-trigger-width) max-w-[calc(100vw-2rem)] min-w-56 flex-col overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
                :style="{
                    maxHeight: 'min(24rem, var(--reka-combobox-content-available-height, 24rem))',
                }">
                <div v-if="searchable" class="shrink-0 border-b p-2">
                    <div class="relative">
                        <IconSearch
                            aria-hidden="true"
                            class="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <ComboboxInput
                            v-model="search"
                            :display-value="() => ''"
                            :auto-focus="true"
                            :placeholder="trans('common.datatable.search_placeholder')"
                            :aria-label="trans('common.datatable.search')"
                            :class="cn(inputVariants({ size: 'sm' }), 'pl-8 text-xs')" />
                    </div>
                </div>
                <ComboboxViewport class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1">
                    <ComboboxItem
                        v-if="clearable"
                        :value="allValue"
                        class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-surface-hover">
                        <span class="flex-1">{{ allLabel ?? trans('common.datatable.all') }}</span>
                        <IconCheck v-if="!selectedValues.length" class="size-4 shrink-0" />
                    </ComboboxItem>
                    <ComboboxItem
                        v-if="allowNone && !multiple"
                        :value="noneValue"
                        class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-surface-hover">
                        <span class="flex-1">
                            {{ noneLabel ?? trans('common.form.hierarchy.none') }}
                        </span>
                        <IconCheck v-if="!selectedValues.length" class="size-4 shrink-0" />
                    </ComboboxItem>
                    <ComboboxGroup v-for="group in optionGroups" :key="group.key">
                        <ComboboxLabel
                            v-if="group.label"
                            class="px-2 pt-3 pb-1 text-xs font-semibold text-muted-foreground">
                            {{ group.label }}
                        </ComboboxLabel>
                        <ComboboxItem
                            v-for="option in group.options"
                            :key="option.value"
                            :value="option.value"
                            :disabled="option.disabled"
                            :title="option.path ?? option.label"
                            :aria-label="option.path ?? option.label"
                            :style="{
                                paddingInlineStart: `${0.5 + (option.depth ?? 0) * 1.25}rem`,
                            }"
                            :class="[
                                'flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-surface-hover data-[highlighted]:text-surface-hover-foreground',
                                option.depth === 0 ? 'font-semibold' : 'font-normal',
                            ]">
                            <span
                                v-if="option.depth"
                                aria-hidden="true"
                                class="text-muted-foreground">
                                ↳
                            </span>
                            <span class="min-w-0 flex-1">{{ optionLabel(option) }}</span>
                            <span v-if="option.count !== undefined" class="text-muted-foreground">
                                ({{ option.count }})
                            </span>
                            <IconCheck
                                v-if="selectedValues.includes(option.value)"
                                class="size-4 shrink-0" />
                        </ComboboxItem>
                    </ComboboxGroup>
                    <p
                        v-if="!visibleOptions.length"
                        class="px-2 py-3 text-sm text-muted-foreground">
                        {{ trans('common.datatable.no_entries') }}
                    </p>
                </ComboboxViewport>
            </ComboboxContent>
        </ComboboxPortal>
    </ComboboxRoot>
</template>

<script setup lang="ts" generic="TValue extends string | string[] = string">
import type { CategoryOption } from './hierarchy';
import type { HTMLAttributes } from 'vue';
import { IconCheck, IconChevronDown, IconSearch } from '@tabler/icons-vue';
import {
    ComboboxAnchor,
    ComboboxContent,
    ComboboxInput,
    ComboboxGroup,
    ComboboxLabel,
    ComboboxItem,
    ComboboxPortal,
    ComboboxRoot,
    ComboboxTrigger,
    ComboboxViewport,
} from 'reka-ui';
import { computed, nextTick, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import { useReadonlyField } from '../field/readonly';
import { inputVariants } from '../input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../select';

const props = withDefaults(
    defineProps<{
        modelValue?: TValue | null;
        options: CategoryOption[];
        displayOptions?: CategoryOption[];
        allowNone?: boolean;
        searchable?: boolean;
        multiple?: boolean;
        clearable?: boolean;
        noneLabel?: string;
        allLabel?: string;
        placeholder?: string;
        emptyValue?: string;
        disabled?: boolean;
        readonly?: boolean;
        name?: string;
        required?: boolean;
        id?: string;
        ariaLabel?: string;
        invalid?: boolean;
        size?: 'sm' | 'default';
        triggerClass?: HTMLAttributes['class'];
    }>(),
    {
        allowNone: false,
        searchable: false,
        multiple: false,
        clearable: false,
        emptyValue: '',
        size: 'sm',
    },
);
const { guard } = useReadonlyField(() => props.readonly);
const emit = defineEmits<{ 'update:modelValue': [value: TValue]; blur: [] }>();
const open = ref(false);
const combobox = ref<{ highlightSelected: () => void } | null>(null);
const search = ref('');
const noneValue = '__category_none__';
const allValue = '__category_all__';
const selectedValues = computed<string[]>(() => {
    const value = props.modelValue;
    if (Array.isArray(value)) return value;
    return value && value !== props.emptyValue ? [value] : [];
});
const selection = computed(() =>
    props.multiple
        ? selectedValues.value
        : (selectedValues.value[0] ??
          (props.clearable ? allValue : props.allowNone ? noneValue : undefined)),
);
const selectedLabel = computed(() => {
    if (!selectedValues.value.length) {
        if (props.clearable) return props.allLabel ?? trans('common.datatable.all');
        if (props.allowNone && !props.multiple)
            return props.noneLabel ?? trans('common.form.hierarchy.none');
        return props.placeholder ?? trans('common.form.hierarchy.placeholder');
    }
    return selectedValues.value
        .map((value) => {
            const option =
                props.options.find((option) => option.value === value) ??
                props.displayOptions?.find((option) => option.value === value);
            return option ? optionLabel(option) : value;
        })
        .join(', ');
});
/** Keep ancestor rows around matching categories so search retains hierarchy context. */
const visibleOptions = computed(() => {
    const terms = normalize(search.value).split(/\s+/).filter(Boolean);
    if (!terms.length || !props.searchable) return props.options;
    const visible = new Set<string>();
    const ancestors: CategoryOption[] = [];
    for (const option of props.options) {
        while (ancestors.length && (ancestors.at(-1)?.depth ?? 0) >= (option.depth ?? 0))
            ancestors.pop();
        if (terms.every((term) => normalize(option.path ?? option.label).includes(term))) {
            visible.add(option.value);
            for (const ancestor of ancestors) visible.add(ancestor.value);
        }
        ancestors.push(option);
    }
    return props.options.filter((option) => visible.has(option.value));
});
const optionGroups = computed(() => {
    const groups = new Map<string, { key: string; label?: string; options: CategoryOption[] }>();
    for (const option of visibleOptions.value) {
        const key = option.group_id ?? option.group ?? '';
        if (!groups.has(key)) groups.set(key, { key, label: option.group, options: [] });
        groups.get(key)!.options.push(option);
    }
    return [...groups.values()];
});
function optionLabel(option: CategoryOption): string {
    return [option.emoji, option.label].filter(Boolean).join(' ');
}
function normalize(value: string): string {
    return value
        .toLocaleLowerCase()
        .normalize('NFKD')
        .replace(/\p{Diacritic}/gu, '')
        .trim();
}
async function openPicker(): Promise<void> {
    open.value = true;
    await nextTick();
    combobox.value?.highlightSelected();
}
function updateSelection(value: unknown): void {
    if (props.multiple) {
        if (!Array.isArray(value)) return;
        emit(
            'update:modelValue',
            (value.includes(allValue)
                ? []
                : value.filter(
                      (item): item is string => typeof item === 'string' && item !== noneValue,
                  )) as TValue,
        );
    } else if (typeof value === 'string') {
        emit(
            'update:modelValue',
            (value === noneValue || value === allValue ? props.emptyValue : value) as TValue,
        );
    }
}

const { trans } = useI18n();
</script>
