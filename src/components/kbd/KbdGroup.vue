<template>
    <kbd
        data-slot="kbd-group"
        :class="
            cn(
                'inline-flex flex-wrap items-center gap-1 bg-transparent align-middle font-sans text-xs leading-none text-muted-foreground',
                props.class,
            )
        ">
        <slot />
    </kbd>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
