<template>
    <caption
        data-slot="table-caption"
        :class="
            cn(
                'caption-top border-b border-border bg-muted/40 p-3 text-left text-sm font-semibold text-muted-foreground',
                props.class,
            )
        ">
        <slot />
    </caption>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
