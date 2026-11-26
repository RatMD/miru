<template>
    <span
        data-slot="badge-separator"
        aria-hidden="true"
        :class="
            cn(
                'self-stretch border-l border-current/25 [.miru-badge[data-appearance=soft]:not([data-variant=ghost]):not([data-variant=ghostly])>&]:border-inherit [.miru-badge[data-variant=outline]>&]:border-inherit dark:[.miru-badge[data-appearance=auto]:not([data-variant=ghost])>&]:border-inherit dark:[.miru-badge[data-variant=ghostly]>&]:border-inherit',
                props.class,
            )
        " />
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
