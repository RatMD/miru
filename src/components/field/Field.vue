<template>
    <div
        role="group"
        data-slot="field"
        :data-orientation="orientation"
        :data-valid="state.valid"
        :data-invalid="state.invalid"
        :aria-invalid="state.ariaInvalid"
        :class="cn(fieldVariants({ orientation }), props.class)">
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { FieldVariants } from '.';
import type { ValidationProps } from './validation';
import type { HTMLAttributes } from 'vue';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { fieldValidationKey, resolveValidation } from './validation';
import { fieldVariants } from '.';

const props = withDefaults(
    defineProps<
        ValidationProps & {
            class?: HTMLAttributes['class'];
            showValidation?: boolean;
            orientation?: FieldVariants['orientation'];
        }
    >(),
    {
        showValidation: false,
        valid: undefined,
        invalid: undefined,
        ariaValid: undefined,
        ariaInvalid: undefined,
        dataValid: undefined,
        dataInvalid: undefined,
    },
);
const state = computed(() => ({
    ...resolveValidation(props),
    showValidation: props.showValidation,
}));
provide(fieldValidationKey, state);
</script>
