<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button type="button" variant="outline" size="sm" :disabled="disabled">
                <IconColumns3 class="size-4" />
                {{ trans('common.datatable.modify') }}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-64 overflow-visible p-0">
            <div class="border-b p-1">
                <DropdownMenuLabel>{{ trans('common.datatable.columns') }}</DropdownMenuLabel>
            </div>
            <ScrollArea
                fit-content
                class="max-h-[min(24rem,calc(var(--reka-dropdown-menu-content-available-height)-5.5rem))]"
                viewport-class="p-1 pr-3">
                <div
                    v-for="column in configurableColumns"
                    :key="column.id"
                    class="flex items-center gap-1 px-2 py-1">
                    <DropdownMenuCheckboxItem
                        class="min-w-0 flex-1 cursor-pointer pl-2 [&>span:first-child]:hidden"
                        :model-value="column.getIsVisible()"
                        @select.prevent
                        @update:model-value="column.toggleVisibility(Boolean($event))">
                        <IconEye v-if="column.getIsVisible()" class="size-4" aria-hidden="true" />
                        <IconEyeOff v-else class="size-4" aria-hidden="true" />
                        <span class="truncate">{{ label(column.id) }}</span>
                    </DropdownMenuCheckboxItem>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0"
                        :disabled="isFirst(column.id)"
                        @click.stop="move(column.id, -1)">
                        <IconArrowUp class="size-3" />
                        <span class="sr-only">{{ trans('common.datatable.move_up') }}</span>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        class="size-7 p-0"
                        :disabled="isLast(column.id)"
                        @click.stop="move(column.id, 1)">
                        <IconArrowDown class="size-3" />
                        <span class="sr-only">{{ trans('common.datatable.move_down') }}</span>
                    </Button>
                </div>
            </ScrollArea>
            <div class="border-t py-1">
                <DropdownMenuItem
                    class="cursor-pointer rounded-none px-3 py-2"
                    @click="$emit('reset')">
                    <IconRestore class="size-4" />
                    {{ trans('common.datatable.reset_columns') }}
                </DropdownMenuItem>
            </div>
            <DropdownMenuArrow />
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts" generic="TData extends RowData">
import type { DataTableInstance } from './types';
import type { RowData } from '@tanstack/vue-table';
import {
    IconArrowDown,
    IconArrowUp,
    IconColumns3,
    IconEye,
    IconEyeOff,
    IconRestore,
} from '@tabler/icons-vue';
import { computed, toValue } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import {
    DropdownMenu,
    DropdownMenuArrow,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../dropdown-menu';
import { ScrollArea } from '../scroll-area';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{ table: DataTableInstance<TData>; disabled?: boolean }>();
defineEmits<{ (event: 'reset'): void }>();

const configurableColumns = computed(() =>
    props.table.getAllLeafColumns().filter((column) => column.getCanHide()),
);
const order = computed(() => props.table.atoms.columnOrder.get());

function label(id: string): string {
    const column = props.table.getColumn(id);
    const meta = column?.columnDef.meta;
    if (meta?.label) return toValue(meta.label);
    return typeof column?.columnDef.header === 'string' ? column.columnDef.header : id;
}

function isFirst(id: string): boolean {
    return order.value.indexOf(id) <= 0;
}

function isLast(id: string): boolean {
    return order.value.indexOf(id) === order.value.length - 1;
}

function move(id: string, offset: number): void {
    const next = [...order.value];
    const from = next.indexOf(id);
    const to = from + offset;
    if (from < 0 || to < 0 || to >= next.length) return;
    [next[from], next[to]] = [next[to], next[from]];
    props.table.setColumnOrder(next);
}
</script>
