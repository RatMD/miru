<template>
    <div class="flex items-center justify-center gap-1 text-xs tabular-nums">
        <template v-for="(counter, index) in counts" :key="counter.key">
            <span v-if="index > 0" class="text-muted-foreground">/</span>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <strong tabindex="0">{{ count(counter.key) }}</strong>
                    </TooltipTrigger>
                    <TooltipContent>{{ trans(counter.labelKey) }}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </template>
    </div>
</template>

<script setup lang="ts" generic="TData extends RowData">
import type { DataTableCountDefinition } from './types';
import type { RowData } from '@tanstack/vue-table';
import { useI18n } from '../../composables/useI18n';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{ item: TData; counts: DataTableCountDefinition[] }>();

function count(key: string): number {
    return Number((props.item as Record<string, unknown>)[key] ?? 0);
}
</script>
