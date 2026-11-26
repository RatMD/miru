<template>
    <AutocompleteSeparator
        data-slot="auto-complete-separator"
        v-bind="delegatedProps"
        :class="cn('-mx-1 h-px bg-border', props.class)">
        <slot />
    </AutocompleteSeparator>
</template>

<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AutocompleteSeparator } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>
