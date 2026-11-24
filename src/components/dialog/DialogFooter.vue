<template>
    <footer
        data-slot="dialog-footer"
        :data-border="border"
        :class="
            cn(
                'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
                border && '-mx-6 -mb-6 border-t border-border px-6 pt-4 pb-6',
                props.class,
            )
        ">
        <slot />
    </footer>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = withDefaults(defineProps<{ border?: boolean; class?: HTMLAttributes['class'] }>(), {
    border: false,
});
</script>
