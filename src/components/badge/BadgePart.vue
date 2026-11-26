<template>
    <span
        data-slot="badge-part"
        :class="
            cn(
                'inline-flex items-center justify-center self-stretch gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0',
                size === 'lg' ? 'gap-1.5 px-3 py-1 [&_svg]:size-4' : 'px-2 py-0.5 [&_svg]:size-3',
                props.class,
            )
        ">
        <slot />
    </span>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { badgeSizeKey } from './context';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
const size = inject(
    badgeSizeKey,
    computed(() => 'default' as const),
);
</script>
