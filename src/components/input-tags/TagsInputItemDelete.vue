<template>
    <TagsInputItemDelete
        v-bind="forwardedProps"
        :class="
            cn(
                'flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center rounded-l-none rounded-r-[3px] bg-transparent transition-colors group-data-[size=sm]/tags-input:rounded-r-[2px] hover:bg-danger hover:text-default-foreground focus-visible:bg-danger focus-visible:text-default-foreground focus-visible:outline-none disabled:cursor-not-allowed',
                props.class,
            )
        ">
        <slot>
            <IconX class="h-4 w-4" />
        </slot>
    </TagsInputItemDelete>
</template>

<script setup lang="ts">
import type { TagsInputItemDeleteProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconX } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { TagsInputItemDelete, useForwardProps } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>
