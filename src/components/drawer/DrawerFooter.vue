<template>
    <div
        data-slot="drawer-footer"
        :class="
            cn(
                'mt-auto flex shrink-0 justify-end gap-2 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]',
                props.class,
            )
        ">
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
