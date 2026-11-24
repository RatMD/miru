<template>
    <NumberFieldRoot v-slot="slotProps" v-bind="forwarded" :class="cn('grid gap-1.5', props.class)">
        <slot v-bind="slotProps" />
    </NumberFieldRoot>
</template>

<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { inputGroupSizeKey } from '../input-group';

const props = defineProps<
    NumberFieldRootProps & { class?: HTMLAttributes['class']; size?: 'sm' | 'default' | 'lg' }
>();
provide(
    inputGroupSizeKey,
    computed(() => props.size ?? 'default'),
);
const emits = defineEmits<NumberFieldRootEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'size');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
