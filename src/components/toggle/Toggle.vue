<template>
    <span
        :class="cn(toggleFrameVariants({ size }), props.class)"
        data-slot="toggle-container"
        :data-size="size">
        <Toggle
            v-slot="slotProps"
            data-slot="toggle"
            :data-size="size"
            :data-variant="variant"
            v-bind="{ ...forwarded, ...$attrs }"
            :class="toggleVariants({ variant, size, iconOnly })">
            <slot v-bind="slotProps" />
        </Toggle>
    </span>
</template>

<script setup lang="ts">
import type { ToggleVariants } from '.';
import type { ToggleEmits, ToggleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { Toggle, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';
import { toggleFrameVariants, toggleVariants } from '.';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<
        ToggleProps & {
            class?: HTMLAttributes['class'];
            variant?: ToggleVariants['variant'];
            size?: ToggleVariants['size'];
            iconOnly?: boolean;
        }
    >(),
    { variant: 'default', size: 'default', disabled: false, iconOnly: false },
);

const emits = defineEmits<ToggleEmits>();
const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant', 'iconOnly');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
