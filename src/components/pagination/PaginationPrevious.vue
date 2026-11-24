<template>
    <PaginationPrev
        data-slot="pagination-previous"
        v-bind="forwarded"
        :aria-label="trans('common.pagination.previous')"
        :class="
            cn(
                buttonVariants({
                    variant: variant ?? appearance?.variant ?? 'ghost',
                    size,
                    iconOnly: compact ?? appearance?.compact ?? false,
                }),
                'gap-1',
                props.class,
            )
        ">
        <slot>
            <IconChevronLeft aria-hidden="true" />
            <span v-if="!(compact ?? appearance?.compact)" class="hidden sm:block">
                {{ trans('common.pagination.previous') }}
            </span>
        </slot>
    </PaginationPrev>
</template>
<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { PaginationPrevProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconChevronLeft } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { PaginationPrev, useForwardProps } from 'reka-ui';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { buttonVariants } from '../button';
import { usePaginationAppearance } from './context';
const props = withDefaults(
    defineProps<
        PaginationPrevProps & {
            size?: ButtonVariants['size'];
            class?: HTMLAttributes['class'];
            variant?: 'outline' | 'ghost';
            compact?: boolean;
        }
    >(),
    { size: 'default', compact: undefined },
);
const { trans } = useI18n();
const appearance = usePaginationAppearance();
const forwarded = useForwardProps(reactiveOmit(props, 'size', 'class', 'variant', 'compact'));
</script>
