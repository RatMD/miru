<template>
    <PaginationLast
        data-slot="pagination-last"
        v-bind="forwarded"
        :aria-label="trans('common.pagination.last')"
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
            <span v-if="!(compact ?? appearance?.compact)" class="hidden sm:block">
                {{ trans('common.pagination.last') }}
            </span>
            <IconChevronsRight aria-hidden="true" />
        </slot>
    </PaginationLast>
</template>
<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { PaginationLastProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconChevronsRight } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { PaginationLast, useForwardProps } from 'reka-ui';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { buttonVariants } from '../button';
import { usePaginationAppearance } from './context';
const props = withDefaults(
    defineProps<
        PaginationLastProps & {
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
