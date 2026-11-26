<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger as-child>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    class="mx-auto size-8 cursor-pointer p-0 transition-colors disabled:cursor-wait"
                    :class="active ? activeClass : 'text-muted-foreground'"
                    :disabled="disabled"
                    :aria-label="label"
                    :aria-pressed="active"
                    @click="$emit('toggle')">
                    <slot :active="active" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{{ label }}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script setup lang="ts">
import { Button } from '../../button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../tooltip';

withDefaults(
    defineProps<{
        active: boolean;
        label: string;
        disabled?: boolean;
        activeClass?: string;
    }>(),
    {
        disabled: false,
        activeClass: 'text-green-600',
    },
);

defineEmits<{
    (event: 'toggle'): void;
}>();
</script>
