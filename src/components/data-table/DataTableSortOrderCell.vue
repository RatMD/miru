<template>
    <div class="flex items-center justify-center gap-1">
        <Button
            type="button"
            variant="ghost"
            size="default"
            icon-only
            class="size-7"
            :disabled="
                unavailable ||
                moving ||
                (!moveHandler && !moveUrl) ||
                !item.can_reorder ||
                !item.can_move_up
            "
            :aria-label="trans('common.actions.move_up')"
            :title="trans('common.actions.move_up')"
            @click="move('up')">
            <IconChevronUp class="size-4" />
        </Button>
        <span
            class="inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full border bg-muted/40 px-1.5 text-xs tabular-nums">
            {{ item.sort_order }}
        </span>
        <Button
            type="button"
            variant="ghost"
            size="default"
            icon-only
            class="size-7"
            :disabled="
                unavailable ||
                moving ||
                (!moveHandler && !moveUrl) ||
                !item.can_reorder ||
                !item.can_move_down
            "
            :aria-label="trans('common.actions.move_down')"
            :title="trans('common.actions.move_down')"
            @click="move('down')">
            <IconChevronDown class="size-4" />
        </Button>
        <span v-if="failed" role="alert" class="text-xs text-danger">
            {{ trans('common.datatable.reorder_failed') }}
        </span>
    </div>
</template>

<script setup lang="ts">
import type { ListPayload } from './contracts';
import type { DataTableSortOrderRow, DataTableMoveDirection } from './types';
import { router } from '@inertiajs/vue3';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-vue';
import { computed, inject, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { dataTableInteractionKey, dataTableListKey } from './context';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{
    item: DataTableSortOrderRow;
    moveUrl?: string;
    moveHandler?: (direction: DataTableMoveDirection) => void | Promise<void>;
}>();
const listContext = inject(dataTableListKey, undefined);
const interaction = inject(dataTableInteractionKey, undefined);
const unavailable = computed(() =>
    Boolean(interaction?.disabled.value || interaction?.rowDisabled(props.item)),
);
const moving = ref(false);
const failed = ref(false);

async function move(direction: DataTableMoveDirection): Promise<void> {
    if (
        unavailable.value ||
        moving.value ||
        !props.item.can_reorder ||
        !(direction === 'up' ? props.item.can_move_up : props.item.can_move_down)
    )
        return;
    failed.value = false;
    if (props.moveHandler) {
        moving.value = true;
        try {
            await props.moveHandler(direction);
        } catch {
            failed.value = true;
        } finally {
            moving.value = false;
        }
        return;
    }
    if (!props.moveUrl) return;
    const list = listContext?.value;
    if (!list) return;
    const filters: Record<string, string | boolean | null> = {};
    for (const key of Object.keys(list.filters)) {
        const value = list.filters[key];
        if (value === undefined) continue;
        if (value === null) filters[key] = null;
        else if (typeof value === 'boolean') filters[key] = value;
        else if (typeof value === 'string' || typeof value === 'number')
            filters[key] = String(value);
    }
    router.patch(
        props.moveUrl,
        {
            direction,
            page: list.state.page,
            per_page: list.state.per_page,
            filters,
        },
        {
            preserveScroll: true,
            preserveState: true,
            onStart: () => {
                moving.value = true;
            },
            onError: () => {
                failed.value = true;
            },
            onFinish: () => {
                moving.value = false;
            },
        },
    );
}
</script>
