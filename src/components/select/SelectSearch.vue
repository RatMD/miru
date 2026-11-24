<template>
    <ComboboxRoot
        :disabled="disabled"
        v-model:open="open"
        :model-value="model"
        ignore-filter
        @update:model-value="select"
        @update:open="search = ''">
        <ComboboxAnchor as-child>
            <ComboboxTrigger as-child :disabled="disabled" :aria-label="label">
                <Button
                    type="button"
                    variant="outline"
                    :size="size"
                    :shape="shape"
                    data-slot="select-search-trigger"
                    class="w-full min-w-0 justify-between font-normal">
                    <span class="truncate">{{ selectedLabel }}</span>
                    <IconChevronDown class="size-4 shrink-0 opacity-50" />
                </Button>
            </ComboboxTrigger>
        </ComboboxAnchor>
        <ComboboxPortal>
            <ComboboxContent
                data-slot="select-search-content"
                position="popper"
                align="start"
                :side-offset="4"
                class="z-50 flex w-(--reka-combobox-trigger-width) max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none"
                :style="{
                    maxHeight: 'min(20rem, var(--reka-combobox-content-available-height, 20rem))',
                }">
                <div class="shrink-0 border-b p-2">
                    <div class="relative">
                        <IconSearch
                            aria-hidden="true"
                            class="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <ComboboxInput
                            data-slot="select-search-input"
                            :disabled="disabled"
                            v-model="search"
                            :display-value="() => ''"
                            :auto-focus="true"
                            :placeholder="trans('common.datatable.search_placeholder')"
                            :aria-label="`${label}: ${trans('common.datatable.search')}`"
                            :class="
                                cn(
                                    inputVariants({ size: 'sm' }),
                                    'pl-8 text-sm md:text-sm',
                                    'focus-visible:border-neutral-400 dark:focus-visible:border-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-400/20',
                                )
                            " />
                    </div>
                </div>
                <ComboboxViewport
                    class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-0 py-1">
                    <ComboboxItem
                        data-slot="select-search-item"
                        v-for="option in filteredOptions"
                        :key="option.value"
                        :value="option.value"
                        :disabled="option.disabled"
                        class="flex cursor-pointer items-center gap-2 rounded-none px-4 py-2.5 text-sm outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-surface-hover-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <span class="min-w-0 flex-1 break-words">{{ option.label }}</span>
                        <IconCheck v-if="model === option.value" class="size-4 shrink-0" />
                    </ComboboxItem>
                    <p
                        v-if="
                            filteredOptions.length === 0 ||
                            (!filteredOptions.some((option) => !option.pinned) && search.trim())
                        "
                        class="px-2 py-3 text-sm text-muted-foreground">
                        {{ trans('common.datatable.no_entries') }}
                    </p>
                </ComboboxViewport>
            </ComboboxContent>
        </ComboboxPortal>
    </ComboboxRoot>
</template>

<script setup lang="ts">
import type { SelectShape, SelectSize } from './context';
import { IconCheck, IconChevronDown, IconSearch } from '@tabler/icons-vue';
import {
    ComboboxAnchor,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxPortal,
    ComboboxRoot,
    ComboboxTrigger,
    ComboboxViewport,
} from 'reka-ui';
import { computed, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import { inputVariants } from '../input';
const { trans, transChoice, locale } = useI18n();

export interface SelectSearchOption {
    value: string;
    label: string;
    disabled?: boolean;
    /** Keep this reset/utility option visible during filtering. */ pinned?: boolean;
}
const props = withDefaults(
    defineProps<{
        options: readonly SelectSearchOption[];
        label: string;
        placeholder?: string;
        disabled?: boolean;
        size?: SelectSize;
        shape?: SelectShape;
    }>(),
    { size: 'default', shape: 'default' },
);
const model = defineModel<string | null>({ default: null });
const open = ref(false);
const search = ref('');
const selectedLabel = computed(
    () =>
        props.options.find((option) => option.value === model.value)?.label ??
        props.placeholder ??
        props.label,
);
const filteredOptions = computed(() => {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/);
    return props.options.filter(
        (option) =>
            option.pinned || terms.every((term) => option.label.toLocaleLowerCase().includes(term)),
    );
});
function select(value: unknown): void {
    if (typeof value === 'string') model.value = value;
}
</script>
