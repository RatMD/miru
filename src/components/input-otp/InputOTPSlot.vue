<template>
    <div
        v-bind="forwarded"
        data-slot="input-otp-slot"
        :data-active="slot?.isActive"
        :data-size="resolvedSize"
        :class="
            cn(
                'relative flex items-center justify-center border-y border-r border-input bg-background text-foreground shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-danger data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-danger data-[active=true]:aria-invalid:ring-danger/20 dark:data-[active=true]:aria-invalid:ring-danger/40',
                resolvedSize === 'sm'
                    ? 'size-8 text-xs'
                    : resolvedSize === 'lg'
                      ? 'size-10 text-base'
                      : 'size-9 text-sm',
                props.class,
            )
        ">
        {{
            resolvedMasked && slot?.char !== null && slot?.char !== undefined
                ? resolvedMaskCharacter
                : slot?.char
        }}
        <div
            v-if="slot?.hasFakeCaret"
            class="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div class="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'reka-ui';
import { computed, inject } from 'vue';
import { useVueOTPContext } from 'vue-input-otp';
import { cn } from '../../support/classNames';
import { inputOtpSizeKey, inputOtpMaskKey } from '.';

const props = withDefaults(
    defineProps<{
        index: number;
        masked?: boolean;
        size?: 'sm' | 'default' | 'lg';
        maskCharacter?: string;
        class?: HTMLAttributes['class'];
    }>(),
    { masked: undefined },
);

const delegatedProps = reactiveOmit(props, 'class', 'masked', 'maskCharacter', 'size');
const groupSize = inject(inputOtpSizeKey, undefined);
const mask = inject(inputOtpMaskKey, undefined);
const resolvedMasked = computed(() => props.masked ?? mask?.value.masked ?? false);
const resolvedMaskCharacter = computed(
    () => props.maskCharacter ?? mask?.value.maskCharacter ?? '*',
);
const resolvedSize = computed(() => props.size ?? groupSize?.value ?? 'default');

const forwarded = useForwardProps(delegatedProps);

const context = useVueOTPContext();

const slot = computed(() => context?.value.slots[props.index]);
</script>
