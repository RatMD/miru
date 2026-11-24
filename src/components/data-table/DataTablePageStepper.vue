<template>
    <div class="flex items-center" :class="full ? 'gap-0' : 'gap-1'">
        <Button
            v-if="full"
            type="button"
            variant="outline"
            size="sm"
            class="size-8 p-0"
            :class="full ? 'rounded-r-none' : ''"
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
            :class="full ? '-ml-px rounded-none' : ''"
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
            :class="full ? '-ml-px rounded-none' : ''"
            :disabled="disabled || !pagination.next_page_url"
            @click="$emit('page', pagination.current_page + 1)">
            <IconChevronRight class="size-4" />
            <span class="sr-only">{{ trans('common.pagination.next') }}</span>
        </Button>
        <Button
            v-if="full"
            type="button"
            variant="outline"
            size="sm"
            class="size-8 p-0"
            :class="full ? '-ml-px rounded-l-none' : ''"
            :disabled="disabled || pagination.current_page >= pagination.last_page"
            @click="$emit('page', pagination.last_page)">
            <IconChevronsRight class="size-4" />
            <span class="sr-only">{{ trans('common.pagination.last') }}</span>
        </Button>
    </div>
</template>

<script setup lang="ts">
import type { ListPagination as Pagination } from './contracts';
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from '@tabler/icons-vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
const { trans, transChoice, locale } = useI18n();

defineProps<{
    pagination: Pagination<unknown>;
    disabled?: boolean;
    full?: boolean;
}>();

defineEmits<{
    (event: 'page', page: number): void;
}>();
</script>
