<template>
    <ScrollArea
        orientation="horizontal"
        fit-content
        class="miru-stepper-scroll"
        data-slot="stepper-scroll">
        <div data-slot="stepper-list" :class="cn('miru-stepper-list', props.class)"><slot /></div>
    </ScrollArea>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
import { ScrollArea } from '../scroll-area';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
