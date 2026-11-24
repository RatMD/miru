<template>
    <TooltipProvider v-if="row.getCanExpand()" :delay-duration="300">
        <Tooltip>
            <TooltipTrigger as-child>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    class="mx-auto size-8 p-0"
                    :class="
                        row.getIsExpanded() ? 'bg-surface-hover text-surface-hover-foreground' : ''
                    "
                    :aria-label="tooltipLabel"
                    :aria-expanded="row.getIsExpanded()"
                    @click.stop="row.toggleExpanded()">
                    <component
                        :is="icon ?? IconChevronRight"
                        class="size-4 transition-transform"
                        :class="!icon && row.getIsExpanded() ? 'rotate-90' : ''" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>{{ tooltipLabel }}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { IconChevronRight } from '@tabler/icons-vue';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
const { trans, transChoice, locale } = useI18n();

interface DataTableExpandableRow {
    getCanExpand: () => boolean;
    getIsExpanded: () => boolean;
    toggleExpanded: (expanded?: boolean) => void;
}

const props = defineProps<{ row: DataTableExpandableRow; icon?: Component; label?: string }>();
const tooltipLabel = computed(
    () =>
        props.label ||
        trans(props.row.getIsExpanded() ? 'common.actions.collapse' : 'common.actions.expand'),
);
</script>
