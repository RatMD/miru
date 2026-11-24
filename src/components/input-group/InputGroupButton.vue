<template>
    <Button
        :data-size="props.size"
        :variant="props.variant"
        size="xs"
        :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)">
        <slot />
    </Button>
</template>

<script setup lang="ts">
import type { InputGroupButtonVariants } from '.';
import type { ButtonVariants } from '../button';
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import { inputGroupButtonVariants } from '.';

interface InputGroupButtonProps {
    variant?: ButtonVariants['variant'];
    size?: InputGroupButtonVariants['size'];
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
    size: 'xs',
    variant: 'ghost',
});
</script>
