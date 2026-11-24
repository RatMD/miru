<template>
    <span
        data-slot="marker-icon"
        aria-hidden="true"
        :class="
            cn(
                'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground [&_svg]:size-4',
                props.class,
            )
        ">
        <slot />
    </span>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
