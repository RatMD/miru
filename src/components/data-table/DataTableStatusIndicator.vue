<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger as-child>
                <span
                    v-if="definition?.icon"
                    class="inline-flex size-7 items-center justify-center rounded-full"
                    :class="definition?.containerClass"
                    tabindex="0"
                    :aria-label="label">
                    <component :is="definition?.icon" class="size-4" :class="colorClass" />
                </span>
                <span
                    v-else
                    class="inline-flex size-2 rounded-full"
                    :class="colorClass"
                    tabindex="0"
                    :aria-label="label" />
            </TooltipTrigger>
            <TooltipContent>{{ label }}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script setup lang="ts">
import type { DataTableStatusDefinition } from './types';
import { computed, toValue } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{
    value: unknown;
    statuses?: Record<string, DataTableStatusDefinition>;
    translationPrefix?: string;
}>();
const value = computed(() => String(props.value ?? ''));
const definition = computed<DataTableStatusDefinition | undefined>(
    () => props.statuses?.[value.value],
);
const label = computed(() => {
    if (definition.value?.label) return toValue(definition.value.label);
    if (definition.value?.labelKey) return trans(definition.value.labelKey);
    return props.translationPrefix
        ? trans(`${props.translationPrefix}.${value.value}`)
        : value.value;
});
const colorClass = computed(() => definition.value?.colorClass ?? defaultStatusColor(value.value));

function defaultStatusColor(status: string): string {
    if (['deleted', 'cancelled', 'failed', 'blocked', 'inactive'].includes(status)) {
        return 'bg-danger text-danger';
    }
    if (['active', 'paid', 'completed', 'released', 'confirmed'].includes(status)) {
        return 'bg-green-500 text-green-600';
    }
    if (['pending', 'draft', 'open', 'processing'].includes(status)) {
        return 'bg-yellow-500 text-yellow-600';
    }
    return 'bg-muted-foreground text-muted-foreground';
}
</script>
