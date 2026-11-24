<template>
    <PaginationRoot
        v-slot="slotProps"
        data-slot="pagination"
        v-bind="forwarded"
        :class="cn('mx-auto flex w-full justify-center', props.class)">
        <slot v-bind="slotProps">
            <PaginationContent v-slot="{ items }">
                <PaginationFirst v-if="mode !== 'simple'" :size="size" />
                <PaginationPrevious :size="size" />
                <template v-if="mode === 'full' || mode === 'compact'">
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationItem
                            v-if="item.type === 'page'"
                            :value="item.value"
                            :is-active="item.value === slotProps.page"
                            :size="size">
                            {{ item.value }}
                        </PaginationItem>
                        <PaginationEllipsis v-else />
                    </template>
                </template>
                <PaginationNext :size="size" />
                <PaginationLast v-if="mode !== 'simple'" :size="size" />
            </PaginationContent>
        </slot>
    </PaginationRoot>
</template>

<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { PaginationMode } from './context';
import type { PaginationRootEmits, PaginationRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { PaginationRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { paginationAppearance } from './context';
import PaginationContent from './PaginationContent.vue';
import PaginationEllipsis from './PaginationEllipsis.vue';
import PaginationFirst from './PaginationFirst.vue';
import PaginationItem from './PaginationItem.vue';
import PaginationLast from './PaginationLast.vue';
import PaginationNext from './PaginationNext.vue';
import PaginationPrevious from './PaginationPrevious.vue';

const props = withDefaults(
    defineProps<
        PaginationRootProps & {
            class?: HTMLAttributes['class'];
            variant?: 'outline' | 'ghost';
            mode?: PaginationMode;
            connected?: boolean;
            size?: ButtonVariants['size'];
        }
    >(),
    { variant: 'ghost', mode: 'full', size: 'default', connected: false },
);
const emits = defineEmits<PaginationRootEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'mode', 'size', 'connected');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
provide(
    paginationAppearance,
    computed(() => ({
        variant: props.variant,
        compact: props.mode !== 'full',
        connected: props.connected,
    })),
);
</script>
