<template>
    <tr
        data-slot="table-row"
        :class="
            cn(
                'border-b transition-colors data-[selected=true]:bg-muted',
                hover && 'hover:bg-muted/40',
                props.class,
            )
        ">
        <slot />
    </tr>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = withDefaults(defineProps<{ class?: HTMLAttributes['class']; hover?: boolean }>(), {
    hover: true,
});
</script>
