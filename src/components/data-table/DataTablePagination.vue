<template>
    <div
        class="flex flex-col items-center gap-3 px-1 text-center md:flex-row md:justify-between md:text-left">
        <p class="text-sm text-muted-foreground">
            <template v-if="pagination.total">
                {{
                    trans('common.datatable.range', {
                        from: formatNumber(pagination.from),
                        to: formatNumber(pagination.to),
                        total: formatNumber(pagination.total),
                    })
                }}
            </template>
            <template v-else>{{ trans('common.datatable.no_entries') }}</template>
        </p>
        <div class="flex flex-col items-center gap-3 md:flex-row">
            <div class="flex items-center gap-3">
                <span class="text-sm font-medium">
                    {{ trans('common.datatable.entries_per_page') }}
                </span>
                <Select
                    :model-value="String(pagination.per_page)"
                    :disabled="disabled"
                    @update:model-value="changePerPage(Number($event))">
                    <SelectTrigger size="sm" class="w-20"><SelectValue /></SelectTrigger>
                    <SelectContent side="top">
                        <SelectItem v-for="size in pageSizes" :key="size" :value="String(size)">
                            {{ formatNumber(size) }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <span class="min-w-28 text-center text-sm font-medium">
                {{
                    trans('common.datatable.page', {
                        current: formatNumber(pagination.current_page),
                        last: formatNumber(pagination.last_page),
                    })
                }}
            </span>
            <div class="flex justify-center gap-1">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    class="size-8 p-0"
                    :disabled="disabled || pagination.current_page <= 1"
                    @click="$emit('page', 1)">
                    <IconChevronsLeft class="size-4" />
                    <span class="sr-only">{{ trans('common.pagination.first') }}</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    class="size-8 p-0"
                    :disabled="disabled || !pagination.prev_page_url"
                    @click="$emit('page', pagination.current_page - 1)">
                    <IconChevronLeft class="size-4" />
                    <span class="sr-only">{{ trans('common.pagination.previous') }}</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    class="size-8 p-0"
                    :disabled="disabled || !pagination.next_page_url"
                    @click="$emit('page', pagination.current_page + 1)">
                    <IconChevronRight class="size-4" />
                    <span class="sr-only">{{ trans('common.pagination.next') }}</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    class="size-8 p-0"
                    :disabled="disabled || pagination.current_page >= pagination.last_page"
                    @click="$emit('page', pagination.last_page)">
                    <IconChevronsRight class="size-4" />
                    <span class="sr-only">{{ trans('common.pagination.last') }}</span>
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="TData">
import type { ListPagination as Pagination } from './contracts';
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from '@tabler/icons-vue';
import { useI18n } from '../../composables/useI18n';
import { formatCounterValue } from '../badge-counter/formatCounterValue';
import { Button } from '../button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
const { trans, transChoice, locale } = useI18n();

withDefaults(
    defineProps<{ pagination: Pagination<TData>; disabled?: boolean; pageSizes?: number[] }>(),
    {
        pageSizes: () => [10, 15, 25, 50, 100],
    },
);
const emit = defineEmits<{
    (event: 'page', page: number): void;
    (event: 'per-page', value: number): void;
}>();
/** Format pagination numbers using the active interface language. */
function formatNumber(value: number): string {
    return formatCounterValue(value, locale.value, 0);
}

function changePerPage(value: number): void {
    emit('per-page', value);
}
</script>
