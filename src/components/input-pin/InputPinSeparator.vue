<template>
    <span
        data-slot="input-pin-separator"
        aria-hidden="true"
        :class="cn('flex shrink-0 items-center justify-center text-muted-foreground', props.class)">
        <slot><IconMinus class="size-4" /></slot>
    </span>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { IconMinus } from '@tabler/icons-vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
