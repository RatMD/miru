<template>
    <TagsInputRoot
        data-slot="tags-input"
        :data-size="size"
        :data-variant="variant"
        v-slot="slotProps"
        v-bind="forwarded"
        :class="
            cn(
                'miru-field group/tags-input flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2 py-1 text-foreground shadow-xs transition-[color,box-shadow] outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
                size === 'sm'
                    ? 'min-h-8 rounded text-xs'
                    : size === 'lg'
                      ? 'min-h-10 text-base'
                      : 'min-h-9 text-sm',
                'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
                'aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40',
                props.class,
            )
        ">
        <slot v-bind="slotProps" />
    </TagsInputRoot>
</template>

<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { TagsInputRootEmits, TagsInputRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TagsInputRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { tagsVariantKey } from './context';

const props = withDefaults(
    defineProps<
        TagsInputRootProps & {
            class?: HTMLAttributes['class'];
            size?: 'sm' | 'default' | 'lg';
            variant?: InlineVariant;
        }
    >(),
    { size: 'default', variant: 'default' },
);
provide(
    tagsVariantKey,
    computed(() => props.variant),
);
const emits = defineEmits<TagsInputRootEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
