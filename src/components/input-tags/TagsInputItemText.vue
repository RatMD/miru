<template>
    <TagsInputItemText
        v-bind="forwardedProps"
        :class="
            cn(
                'rounded-sm bg-transparent px-2 py-0.5 text-sm group-data-[size=lg]/tags-input:text-base group-data-[size=sm]/tags-input:text-xs',
                props.class,
            )
        ">
        <slot />
    </TagsInputItemText>
</template>

<script setup lang="ts">
import type { TagsInputItemTextProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TagsInputItemText, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<TagsInputItemTextProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>
