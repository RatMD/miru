<template>
    <Primitive
        :as="element"
        :href="href"
        data-slot="badge"
        :data-interactive="
            interactive ||
            !!href ||
            asChild ||
            ['a', 'button', 'link'].includes(String(asTag ?? as))
        "
        :data-size="size ?? 'default'"
        :data-variant="variant ?? 'default'"
        :data-appearance="appearance ?? 'auto'"
        :class="cn(badgeVariants({ variant, size, appearance }), props.class)"
        v-bind="delegatedProps">
        <slot />
    </Primitive>
</template>

<script lang="ts" setup>
import type { BadgeVariants } from '.';
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'reka-ui';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { badgeSizeKey } from './context';
import { badgeVariants } from '.';

const props = defineProps<
    Omit<PrimitiveProps, 'as'> & {
        as?: PrimitiveProps['as'] | 'link';
        asTag?: PrimitiveProps['as'] | 'link';
        href?: HTMLAnchorElement['href'];
        interactive?: boolean;
        variant?: BadgeVariants['variant'];
        appearance?: BadgeVariants['appearance'];
        size?: BadgeVariants['size'];
        class?: HTMLAttributes['class'];
    }
>();

const element = computed(() => {
    const tag = props.asTag ?? props.as ?? (props.href ? 'a' : 'span');
    return tag === 'link' ? 'a' : tag;
});
provide(
    badgeSizeKey,
    computed(() => props.size ?? 'default'),
);
const delegatedProps = reactiveOmit(
    props,
    'class',
    'as',
    'asTag',
    'href',
    'variant',
    'appearance',
    'size',
    'interactive',
);
</script>
