<template>
    <NumberFieldInput
        data-slot="input-group-control"
        :data-size="resolvedSize"
        :class="
            cn(
                inputVariants({ size: resolvedSize }),
                'h-full min-w-0 flex-1 rounded-none border-0 bg-transparent text-center shadow-none focus-visible:ring-0 dark:bg-transparent',
                props.class,
            )
        " />
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { NumberFieldInput } from 'reka-ui';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { inputVariants } from '../input';
import { inputGroupSizeKey } from '../input-group';
const props = defineProps<{ class?: HTMLAttributes['class']; size?: 'sm' | 'default' | 'lg' }>();
const groupSize = inject(inputGroupSizeKey, undefined);
const resolvedSize = computed(() => props.size ?? groupSize?.value ?? 'default');
</script>
