<template>
    <PaginationNext
        data-slot="pagination-next"
        v-bind="forwarded"
        :aria-label="trans('common.pagination.next')"
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
                {{ trans('common.pagination.next') }}
            </span>
            <IconChevronRight aria-hidden="true" />
        </slot>
    </PaginationNext>
</template>
<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { PaginationNextProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconChevronRight } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { PaginationNext, useForwardProps } from 'reka-ui';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { buttonVariants } from '../button';
import { usePaginationAppearance } from './context';
const props = withDefaults(
    defineProps<
        PaginationNextProps & {
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
