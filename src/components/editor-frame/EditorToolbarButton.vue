<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger as-child>
                <Button
                    v-bind="$attrs"
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon-only
                    :aria-label="label"
                    class="size-8 p-0">
                    <slot />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top" :side-offset="6">{{ label }}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>
<script setup lang="ts">
import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
defineOptions({ inheritAttrs: false });
defineProps<{ label: string }>();
</script>
