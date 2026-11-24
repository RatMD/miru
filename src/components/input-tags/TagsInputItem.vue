<template>
    <TagsInputItem
        data-slot="tags-input-item"
        :data-variant="resolvedVariant"
        :style="colors"
        v-bind="forwardedProps"
        :class="
            cn(
                'flex h-6 items-center rounded-[3px] border border-(--tag-border) bg-(--tag-bg) text-(--tag-fg) ring-offset-background group-data-[size=lg]/tags-input:h-7 group-data-[size=sm]/tags-input:h-5 group-data-[size=sm]/tags-input:rounded-[2px] data-[state=active]:ring-2 data-[state=active]:ring-ring data-[state=active]:ring-offset-2',
                props.class,
            )
        ">
        <slot />
    </TagsInputItem>
</template>

<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { TagsInputItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { reactiveOmit } from '@vueuse/core';
import { TagsInputItem, useForwardProps } from 'reka-ui';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { tagsVariantKey } from './context';

const props = defineProps<
    TagsInputItemProps & { class?: HTMLAttributes['class']; variant?: InlineVariant }
>();

const groupVariant = inject(tagsVariantKey, undefined);
const resolvedVariant = computed(() => props.variant ?? groupVariant?.value ?? 'default');
const colors = computed(() => {
    const variant = resolvedVariant.value;
    return {
        '--tag-bg':
            variant === 'default'
                ? 'var(--ui-muted)'
                : `color-mix(in oklab, var(--ui-${variant}) 12%, var(--ui-background))`,
        '--tag-fg': variant === 'default' ? 'var(--ui-foreground)' : `var(--ui-${variant}-text)`,
        '--tag-border':
            variant === 'default'
                ? 'transparent'
                : `color-mix(in oklab, var(--ui-${variant}) 25%, transparent)`,
    };
});
const delegatedProps = reactiveOmit(props, 'class', 'variant');

const forwardedProps = useForwardProps(delegatedProps);
</script>
