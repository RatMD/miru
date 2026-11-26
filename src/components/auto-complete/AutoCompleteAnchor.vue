<template>
    <AutocompleteAnchor
        data-slot="auto-complete-anchor"
        v-bind="forwarded"
        :class="cn('w-[200px]', props.class)">
        <slot />
    </AutocompleteAnchor>
</template>

<script setup lang="ts">
import type { ComboboxAnchorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AutocompleteAnchor, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<ComboboxAnchorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardProps(delegatedProps);
</script>
