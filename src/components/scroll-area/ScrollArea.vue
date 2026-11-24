<template>
    <ScrollAreaRoot
        data-slot="scroll-area"
        v-bind="delegatedProps"
        :class="cn('relative overflow-hidden', props.class)">
        <ScrollAreaViewport
            data-slot="scroll-area-viewport"
            :class="
                cn(
                    'w-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1',
                    props.fitContent ? 'max-h-[inherit]' : 'h-full',
                    props.viewportClass,
                )
            ">
            <slot />
        </ScrollAreaViewport>

        <ScrollBar v-if="orientation !== 'horizontal'" />
        <ScrollBar v-if="orientation !== 'vertical'" orientation="horizontal" />
        <ScrollAreaCorner />
    </ScrollAreaRoot>
</template>

<script lang="ts" setup>
import type { ScrollAreaRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from 'reka-ui';
import { cn } from '../../support/classNames';
import ScrollBar from './ScrollBar.vue';

const props = withDefaults(
    defineProps<
        ScrollAreaRootProps & {
            class?: HTMLAttributes['class'];
            fitContent?: boolean;
            orientation?: 'vertical' | 'horizontal' | 'both';
            viewportClass?: HTMLAttributes['class'];
        }
    >(),
    {
        fitContent: false,
        orientation: 'vertical',
    },
);

const delegatedProps = reactiveOmit(props, 'class', 'fitContent', 'orientation', 'viewportClass');
</script>
