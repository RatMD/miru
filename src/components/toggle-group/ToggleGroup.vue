<template>
    <ToggleGroupRoot
        v-slot="slotProps"
        data-slot="toggle-group"
        :data-size="size"
        :data-variant="variant"
        :style="{ gap: Math.max(0, spacing) * 0.25 + 'rem' }"
        v-bind="forwarded"
        :model-value="value"
        :data-readonly="isReadonly || undefined"
        @click.capture="guard"
        @keydown.capture="guard"
        :class="
            cn(
                toggleFrameVariants({ size }),
                'data-[orientation=vertical]:h-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
                props.class,
            )
        "
        @update:model-value="updateValue">
        <slot v-bind="slotProps" />
    </ToggleGroupRoot>
</template>

<script setup lang="ts">
import type { ToggleVariants } from '../toggle';
import type { AcceptableValue, ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit, useVModel } from '@vueuse/core';
import { ToggleGroupRoot, useForwardProps } from 'reka-ui';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { useReadonlyField } from '../field/readonly';
import { toggleFrameVariants } from '../toggle';
import { toggleGroupStyleKey } from './context';

const props = withDefaults(
    defineProps<
        ToggleGroupRootProps & {
            class?: HTMLAttributes['class'];
            variant?: ToggleVariants['variant'];
            size?: ToggleVariants['size'];
            spacing?: number;
            readonly?: boolean;
            /** Keep one option selected for view and filter switches. */
            allowEmpty?: boolean;
        }
    >(),
    { variant: 'default', size: 'default', spacing: 0, allowEmpty: true },
);

const { readonly: isReadonly, guard } = useReadonlyField(() => props.readonly);
const emits = defineEmits<ToggleGroupRootEmits>();
const value = useVModel(props, 'modelValue', emits, {
    defaultValue: props.defaultValue ?? (props.type === 'multiple' ? [] : ''),
    passive: true,
});
provide(
    toggleGroupStyleKey,
    computed(() => ({
        variant: props.variant,
        size: props.size,
        orientation: props.orientation ?? 'horizontal',
    })),
);
const forwarded = useForwardProps(
    reactiveOmit(
        props,
        'readonly',
        'class',
        'size',
        'variant',
        'spacing',
        'allowEmpty',
        'modelValue',
        'defaultValue',
    ),
);

function updateValue(next: AcceptableValue | AcceptableValue[]): void {
    if (props.disabled || isReadonly.value) return;
    if (
        !props.allowEmpty &&
        (next === '' || next == null || (Array.isArray(next) && next.length === 0))
    )
        return;
    value.value = next;
}
</script>
