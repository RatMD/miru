<template>
    <TagsInputInput
        v-bind="forwardedProps"
        :class="
            cn(
                'min-h-5 min-w-16 flex-1 bg-transparent px-1 text-sm group-data-[size=lg]/tags-input:text-base group-data-[size=sm]/tags-input:text-xs focus:outline-none',
                props.class,
            )
        " />
</template>

<script setup lang="ts">
import type { TagsInputInputProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TagsInputInput, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<TagsInputInputProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>
