<template>
    <AutocompleteGroup
        data-slot="auto-complete-group"
        v-bind="delegatedProps"
        :class="cn('overflow-hidden p-1 text-foreground', props.class)">
        <AutocompleteLabel
            v-if="heading"
            class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            {{ heading }}
        </AutocompleteLabel>
        <slot />
    </AutocompleteGroup>
</template>

<script setup lang="ts">
import type { ComboboxGroupProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AutocompleteGroup, AutocompleteLabel } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<
    ComboboxGroupProps & {
        class?: HTMLAttributes['class'];
        heading?: string;
    }
>();

const delegatedProps = reactiveOmit(props, 'class', 'heading');
</script>
