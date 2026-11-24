<template>
    <span
        data-slot="breadcrumb-ellipsis"
        role="presentation"
        aria-hidden="true"
        :class="cn('flex size-9 items-center justify-center', props.class)">
        <slot>
            <IconDots class="size-4" />
        </slot>
        <span class="sr-only">{{ trans('common.accessibility.more') }}</span>
    </span>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { IconDots } from '@tabler/icons-vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>
