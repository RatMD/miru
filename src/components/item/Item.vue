<template>
    <Primitive
        data-slot="item"
        :as="as"
        :as-child="asChild"
        :class="cn(itemVariants({ variant, size }), props.class)">
        <slot />
    </Primitive>
</template>
<script setup lang="ts">
import type { ItemVariants } from '.';
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { Primitive } from 'reka-ui';
import { cn } from '../../support/classNames';
import { itemVariants } from '.';

const props = withDefaults(
    defineProps<
        PrimitiveProps & {
            class?: HTMLAttributes['class'];
            variant?: ItemVariants['variant'];
            size?: ItemVariants['size'];
        }
    >(),
    {
        as: 'div',
    },
);
</script>
