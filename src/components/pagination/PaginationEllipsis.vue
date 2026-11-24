<template>
    <PaginationEllipsis
        data-slot="pagination-ellipsis"
        v-bind="delegatedProps"
        :class="cn('flex size-9 items-center justify-center text-muted-foreground', props.class)">
        <slot>
            <IconDots class="size-4" />
            <span class="sr-only">{{ trans('common.accessibility.more_pages') }}</span>
        </slot>
    </PaginationEllipsis>
</template>

<script setup lang="ts">
import type { PaginationEllipsisProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconDots } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { PaginationEllipsis } from 'reka-ui';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>
