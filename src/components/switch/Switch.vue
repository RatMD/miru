<template>
    <SwitchRoot
        :aria-readonly="isReadonly || undefined"
        @click.capture="guardReadonly"
        @keydown.capture="guardReadonly"
        v-slot="slotProps"
        data-slot="switch"
        :data-size="size"
        :data-variant="variant"
        :style="trackStyle"
        v-bind="forwarded"
        :required="!isReadonly && required"
        :class="
            cn(
                'miru-switch peer box-border inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-[background-color,box-shadow] outline-none enabled:hover:shadow-[0_0_0_3px_rgb(0_0_0/0.08)] dark:enabled:hover:shadow-[0_0_0_3px_rgb(255_255_255/0.12)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
                size === 'sm' ? 'h-4 w-7' : size === 'lg' ? 'h-6 w-11' : 'h-[1.15rem] w-8',
                'aria-invalid:border-danger aria-invalid:ring-danger/20',
                'aria-invalid:border-danger! aria-invalid:shadow-[0_0_0_3px_rgb(220_38_38/0.15)]! data-[state=checked]:aria-invalid:bg-danger! data-[state=checked]:aria-invalid:hover:bg-danger-hover!',
                props.class,
            )
        ">
        <SwitchThumb
            data-slot="switch-thumb"
            :class="
                cn(
                    'pointer-events-none block rounded-full shadow-sm ring-0 transition-transform data-[state=unchecked]:translate-x-0',
                    size === 'sm'
                        ? 'size-3.5 data-[state=checked]:translate-x-3'
                        : size === 'lg'
                          ? 'size-5 data-[state=checked]:translate-x-[22px]'
                          : 'size-4 data-[state=checked]:translate-x-[14px]',
                )
            ">
            <slot name="thumb" v-bind="slotProps" />
        </SwitchThumb>
    </SwitchRoot>
</template>

<script setup lang="ts">
import type { SwitchVariant } from './index';
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';
import { cn } from '../../support/classNames';
import { useReadonlyField } from '../field/readonly';

const props = withDefaults(
    defineProps<
        SwitchRootProps & {
            class?: HTMLAttributes['class'];
            readonly?: boolean;
            size?: 'sm' | 'default' | 'lg';
            variant?: SwitchVariant;
            /** Extra track inset in pixels; preserves thumb size and travel. */
            trackPadding?: number;
        }
    >(),
    { size: 'default', trackPadding: 0, variant: 'default' },
);

const trackStyle = computed(() => {
    const padding = Number.isFinite(props.trackPadding) ? Math.max(0, props.trackPadding) : 0;
    if (padding === 0) return undefined;
    const [width, height] =
        props.size === 'sm' ? [1.75, 1] : props.size === 'lg' ? [2.75, 1.5] : [2, 1.15];
    return {
        padding: padding + 'px',
        width: 'calc(' + width + 'rem + ' + padding * 2 + 'px)',
        height: 'calc(' + height + 'rem + ' + padding * 2 + 'px)',
    };
});

const { readonly: isReadonly, guard: guardReadonly } = useReadonlyField(() => props.readonly);
const emits = defineEmits<SwitchRootEmits>();

const delegatedProps = reactiveOmit(props, 'readonly', 'class', 'size', 'trackPadding', 'variant');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<style scoped>
.miru-switch {
    --switch-on: var(--ui-default);
    --switch-on-hover: var(--ui-default-hover);
    --switch-off: var(--ui-neutral-300);
    --switch-off-hover: var(--ui-neutral-400);
    --switch-thumb-on: var(--ui-default-foreground);
}
.miru-switch:where(.dark, .dark *, [data-theme='dark'], [data-theme='dark'] *) {
    --switch-off: var(--ui-neutral-700);
    --switch-off-hover: var(--ui-neutral-600);
}
.miru-switch[data-variant='success'],
.miru-switch[data-variant='danger-success'] {
    --switch-on: var(--ui-success-600);
    --switch-on-hover: var(--ui-success-700);
    --switch-thumb-on: var(--ui-switch-thumb-checked, #ffffff);
}
.miru-switch[data-variant='danger-success'] {
    --switch-off: var(--ui-danger-600);
    --switch-off-hover: var(--ui-danger-700);
}
.miru-switch[data-state='unchecked'] {
    background-color: var(--switch-off);
}
.miru-switch[data-state='checked'] {
    background-color: var(--switch-on);
}
.miru-switch:not(:disabled):not([data-disabled])[data-state='unchecked']:hover {
    background-color: var(--switch-off-hover);
}
.miru-switch:not(:disabled):not([data-disabled])[data-state='checked']:hover {
    background-color: var(--switch-on-hover);
}
.miru-switch :deep([data-slot='switch-thumb']) {
    background-color: #ffffff;
}
.miru-switch :deep([data-slot='switch-thumb'][data-state='checked']) {
    background-color: var(--switch-thumb-on);
}
</style>
