<template>
    <span
        :class="cn(toggleFrameVariants({ size }), props.wrapperClass)"
        data-slot="toggle-container"
        :data-size="size">
        <Toggle
            :data-readonly="isReadonly || undefined"
            @click.capture="guardReadonly"
            @keydown.capture="guardReadonly"
            @beforeinput.capture="guardReadonly"
            @paste.capture="guardReadonly"
            v-slot="slotProps"
            data-slot="toggle"
            :data-size="size"
            :data-variant="variant"
            v-bind="{ ...forwarded, ...$attrs }"
            :class="cn(toggleVariants({ variant, size, iconOnly }), props.class)">
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
import { useReadonlyField } from '../field/readonly';
import { toggleFrameVariants, toggleVariants } from '.';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<
        ToggleProps & {
            class?: HTMLAttributes['class'];
            readonly?: boolean;
            wrapperClass?: HTMLAttributes['class'];
            variant?: ToggleVariants['variant'];
            size?: ToggleVariants['size'];
            iconOnly?: boolean;
        }
    >(),
    { variant: 'default', size: 'default', disabled: false, iconOnly: false },
);

const { readonly: isReadonly, guard: guardReadonly } = useReadonlyField(() => props.readonly);
const emits = defineEmits<ToggleEmits>();
const delegatedProps = reactiveOmit(
    props,
    'readonly',
    'class',
    'wrapperClass',
    'size',
    'variant',
    'iconOnly',
);
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
