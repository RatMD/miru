<template>
    <DialogTitle v-bind="forwarded" :class="cn('text-lg font-semibold', props.class)">
        <slot />
    </DialogTitle>
</template>

<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DialogTitle, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>();
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
</script>
