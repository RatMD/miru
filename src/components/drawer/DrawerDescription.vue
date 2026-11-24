<template>
    <RekaDrawerDescription
        data-slot="drawer-description"
        :class="cn('text-sm leading-relaxed text-foreground/80', props.class)">
        <slot />
    </RekaDrawerDescription>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DrawerDescription as RekaDrawerDescription } from 'reka-ui';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
