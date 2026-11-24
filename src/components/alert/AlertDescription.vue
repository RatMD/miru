<template>
    <div
        data-slot="alert-description"
        :class="
            cn(
                'col-start-2 grid gap-1 text-xs/[17px] font-semibold text-gray-600 dark:text-gray-300',
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
