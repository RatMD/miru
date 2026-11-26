<template>
    <div
        class="flex items-center gap-1 text-xs tabular-nums"
        :class="
            align === 'left'
                ? 'justify-start'
                : align === 'right'
                  ? 'justify-end'
                  : 'justify-center'
        ">
        <template v-for="(counter, index) in counts" :key="counter.key">
            <span v-if="index > 0" class="text-muted-foreground">/</span>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <strong tabindex="0">{{ count(counter.key) }}</strong>
                    </TooltipTrigger>
                    <TooltipContent>{{ label(counter) }}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { TableAlign, TableCountDefinition } from '../types';
import { toValue } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../tooltip';
const { trans } = useI18n();

const props = defineProps<{ item: unknown; counts: TableCountDefinition[]; align?: TableAlign }>();

function count(key: string): number {
    const value = Number((props.item as Record<string, unknown> | null)?.[key] ?? 0);
    return Number.isFinite(value) ? value : 0;
}
function label(counter: TableCountDefinition): string {
    return counter.label !== undefined
        ? toValue(counter.label)
        : counter.labelKey
          ? trans(counter.labelKey)
          : counter.key;
}
</script>
