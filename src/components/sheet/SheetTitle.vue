<template>
    <DialogTitle
        data-slot="sheet-title"
        :class="cn('font-semibold text-foreground', props.class)"
        v-bind="delegatedProps">
        <slot />
    </DialogTitle>
</template>

<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DialogTitle } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>
