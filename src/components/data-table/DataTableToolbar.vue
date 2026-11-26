<template>
    <div
        v-if="variant === 'compact'"
        class="sticky z-30 flex min-h-14 flex-wrap items-center gap-2 border-b border-border bg-background px-5 py-2 sm:px-6"
        :style="{ top: stickyOffset }">
        <Transition name="bulk-actions">
            <div
                v-if="selectedCount > 0 && list.config.actions.length > 0"
                class="bulk-actions-group flex shrink-0 items-center gap-2 overflow-hidden">
                <DataTableBulkActions
                    :actions="list.config.actions"
                    :selected-count="selectedCount"
                    :disabled="disabled"
                    @apply="$emit('apply-action', $event)" />
                <Separator orientation="vertical" class="h-8" />
            </div>
        </Transition>

        <TooltipProvider v-if="searchable" :delay-duration="400">
            <Tooltip>
                <TooltipTrigger as-child>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        class="size-8 p-0"
                        :disabled="disabled"
                        @click="searchOpen = true">
                        <IconSearch class="size-4" />
                        <span class="sr-only">{{ trans('common.datatable.search') }}</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{{ trans('common.datatable.search') }}</TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <ButtonGroup
            size="sm"
            v-if="hasFilters || canClear"
            :label="trans('common.datatable.filters')">
            <DataTableFilterSheet
                v-if="hasFilters"
                compact
                :list="list"
                :active-count="activeFilterCount"
                :disabled="disabled"
                @apply="$emit('visit', $event)"
                @clear="clear" />
            <TooltipProvider v-if="canClear">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            icon-only
                            data-slot="data-table-clear-filters"
                            :disabled="disabled"
                            :aria-label="trans('common.datatable.clear')"
                            @click="clear">
                            <IconFilterOff class="size-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                        {{ trans('common.datatable.clear') }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </ButtonGroup>

        <p class="ml-1 text-sm font-semibold tabular-nums">
            <template v-if="list.results.total">
                {{
                    trans('common.datatable.range', {
                        from: formatNumber(list.results.from),
                        to: formatNumber(list.results.to),
                        total: formatNumber(list.results.total),
                    })
                }}
            </template>
            <template v-else>{{ trans('common.datatable.no_entries') }}</template>
        </p>

        <FilterBar
            v-if="activeFilters.length"
            :items="activeFilters"
            :disabled="disabled"
            @remove="removeFilter" />

        <div class="ml-auto flex items-center gap-2">
            <slot name="actions" />
            <DataTableColumnToggle
                v-if="showColumnToggle"
                :table="table"
                :disabled="disabled"
                @reset="$emit('reset')" />
            <span class="hidden min-w-24 text-center text-sm font-semibold tabular-nums sm:inline">
                {{
                    trans('common.datatable.page', {
                        current: formatNumber(list.results.current_page),
                        last: formatNumber(list.results.last_page),
                    })
                }}
            </span>
            <DataTablePageStepper
                full
                :pagination="list.results"
                :disabled="disabled"
                @page="$emit('page', $event)" />
        </div>

        <Dialog v-if="searchable" v-model:open="searchOpen">
            <DialogContent :close-label="trans('common.actions.close')" class="sm:max-w-md">
                <DialogTitle>{{ trans('common.datatable.search') }}</DialogTitle>
                <form class="flex gap-2" @submit.prevent="submitSearch">
                    <Input
                        v-model="search"
                        autofocus
                        :disabled="disabled"
                        :placeholder="trans('common.datatable.search_placeholder')"
                        :aria-label="trans('common.datatable.search')" />
                    <Button type="submit" :disabled="disabled">
                        <IconSearch class="size-4" />
                        {{ trans('common.datatable.search') }}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    </div>

    <div v-else class="flex flex-col gap-3 lg:flex-row lg:items-center">
        <Transition name="bulk-actions">
            <div
                v-if="selectedCount > 0 && list.config.actions.length > 0"
                class="bulk-actions-group flex shrink-0 items-center gap-3 overflow-hidden">
                <DataTableBulkActions
                    :actions="list.config.actions"
                    :selected-count="selectedCount"
                    :disabled="disabled"
                    @apply="$emit('apply-action', $event)" />
                <Separator orientation="vertical" class="h-8" />
            </div>
        </Transition>

        <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <form
                v-if="searchable"
                class="flex w-full min-w-0 items-center gap-2 md:w-auto"
                @submit.prevent="submitSearch">
                <Input
                    v-model="search"
                    size="sm"
                    class="min-w-0 flex-1 md:w-52 md:flex-none"
                    :disabled="disabled"
                    :placeholder="trans('common.datatable.search_placeholder')"
                    :aria-label="trans('common.datatable.search')" />
                <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    class="size-8 p-0 md:w-auto md:px-3"
                    :aria-label="trans('common.datatable.search')"
                    :disabled="disabled">
                    <IconSearch class="size-4" />
                    <span class="hidden md:inline">{{ trans('common.datatable.search') }}</span>
                </Button>
            </form>
            <ButtonGroup
                size="sm"
                v-if="hasFilters || canClear"
                :label="trans('common.datatable.filters')">
                <DataTableFilterSheet
                    v-if="hasFilters"
                    :list="list"
                    :active-count="activeFilterCount"
                    :disabled="disabled"
                    @apply="$emit('visit', $event)"
                    @clear="clear" />
                <TooltipProvider v-if="canClear">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                icon-only
                                data-slot="data-table-clear-filters"
                                :disabled="disabled"
                                :aria-label="trans('common.datatable.clear')"
                                @click="clear">
                                <IconFilterOff class="size-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            {{ trans('common.datatable.clear') }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </ButtonGroup>
            <DataTablePageStepper
                class="md:hidden"
                :pagination="list.results"
                :disabled="disabled"
                @page="$emit('page', $event)" />
            <FilterBar
                v-if="activeFilters.length"
                :items="activeFilters"
                :disabled="disabled"
                @remove="removeFilter" />

            <div class="ml-auto flex items-center gap-2">
                <slot name="actions" />
                <DataTableColumnToggle
                    v-if="showColumnToggle"
                    :table="table"
                    :disabled="disabled"
                    @reset="$emit('reset')" />
                <DataTablePageStepper
                    class="hidden md:flex"
                    :pagination="list.results"
                    :disabled="disabled"
                    @page="$emit('page', $event)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="TData extends RowData">
import type { ListActionConfiguration, ListPayload } from './contracts';
import type { DataTableInstance } from './types';
import type { RowData } from '@tanstack/vue-table';
import { IconSearch, IconFilterOff } from '@tabler/icons-vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { ButtonGroup } from '../button-group';
import { Dialog, DialogContent, DialogTitle } from '../dialog';
import { FilterBar } from '../filter-bar';
import { Input } from '../input';
import { Separator } from '../separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import DataTableBulkActions from './DataTableBulkActions.vue';
import DataTableColumnToggle from './DataTableColumnToggle.vue';
import DataTableFilterSheet from './DataTableFilterSheet.vue';
import DataTablePageStepper from './DataTablePageStepper.vue';
import { filterValueLabel, hasFilterValue } from './filter-values';
const { trans, transChoice, locale } = useI18n();

const props = withDefaults(
    defineProps<{
        table: DataTableInstance<TData>;
        list: ListPayload<TData>;
        selectedCount: number;
        disabled?: boolean;
        variant?: 'default' | 'compact';
        stickyOffset?: string;
        showColumnToggle?: boolean;
        searchable?: boolean;
    }>(),
    { variant: 'default', stickyOffset: '0px', showColumnToggle: true, searchable: true },
);
const numberFormatter = computed(() => new Intl.NumberFormat(locale.value));
const emit = defineEmits<{
    (event: 'reset'): void;
    (event: 'visit', filters: Record<string, unknown>): void;
    (event: 'page', page: number): void;
    (event: 'apply-action', action: ListActionConfiguration): void;
}>();

const search = ref(String(props.list.filters.search ?? ''));
const searchOpen = ref(false);
const filterKeys = computed(() => Object.keys(props.list.config.filters));
const hasFilters = computed(() => filterKeys.value.length > 0);
const activeFilterCount = computed(
    () => filterKeys.value.filter((key) => hasFilterValue(props.list.filters[key])).length,
);
const configuredFilters = computed(() =>
    filterKeys.value
        .filter((key) => hasFilterValue(props.list.filters[key]))
        .map((key) => {
            const configuration = props.list.config.filters[key];
            return {
                key,
                label: configuration?.label_key
                    ? trans(configuration.label_key)
                    : (configuration?.label ?? key),
                value: configuration
                    ? filterValueLabel(configuration, props.list.filters[key], trans)
                    : String(props.list.filters[key]),
            };
        }),
);
const activeFilters = computed(() => [
    ...(hasFilterValue(props.list.filters.search) && !filterKeys.value.includes('search')
        ? [
              {
                  key: 'search',
                  label: trans('common.datatable.search'),
                  value: String(props.list.filters.search),
              },
          ]
        : []),
    ...configuredFilters.value,
]);
const canClear = computed(() => activeFilters.value.length > 0);

watch(
    () => props.list.filters.search,
    (value) => {
        search.value = String(value ?? '');
    },
);
function formatNumber(value: number | null): string {
    return numberFormatter.value.format(value ?? 0);
}
function submitSearch(): void {
    if (props.disabled || !props.searchable) return;
    emit('visit', { ...props.list.filters, search: search.value.trim() || undefined });
    searchOpen.value = false;
}
function clear(): void {
    if (props.disabled) return;
    search.value = '';
    emit('visit', {});
}
function removeFilter(key: string): void {
    if (props.disabled) return;
    emit('visit', { ...props.list.filters, [key]: undefined });
}
</script>

<style scoped>
.bulk-actions-enter-active,
.bulk-actions-leave-active {
    max-width: 30rem;
    transition:
        max-width 200ms ease,
        opacity 150ms ease,
        transform 200ms ease;
}
.bulk-actions-enter-from,
.bulk-actions-leave-to {
    max-width: 0;
    opacity: 0;
    transform: translateX(-0.5rem);
}
</style>
