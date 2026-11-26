<template>
    <div class="flex items-center justify-center gap-1">
        <template v-for="(counter, index) in counts" :key="counter.key">
            <span v-if="index > 0" class="text-muted-foreground">/</span>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <span class="inline-flex" tabindex="0" :aria-label="label(counter)">
                            <component
                                :is="counter.icon"
                                v-if="counter.icon"
                                class="size-4 shrink-0 text-muted-foreground"
                                aria-hidden="true" />
                            <span v-else class="text-xs">{{ label(counter) }}</span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>{{ label(counter) }}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { TableCountDefinition } from '../types';
import { toValue } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../tooltip';
const { trans } = useI18n();

defineProps<{ counts: TableCountDefinition[] }>();
function label(counter: TableCountDefinition): string {
    return counter.label !== undefined
        ? toValue(counter.label)
        : counter.labelKey
          ? trans(counter.labelKey)
          : counter.key;
}
</script>
