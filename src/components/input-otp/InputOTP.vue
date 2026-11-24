<template>
    <OTPInput
        v-model="modelValue"
        v-slot="slotProps"
        v-bind="forwarded"
        :maxlength="resolvedLength"
        :container-class="cn('flex items-center gap-2 has-disabled:opacity-50', props.class)"
        data-slot="input-otp"
        class="disabled:cursor-not-allowed">
        <slot v-bind="slotProps">
            <InputOTPGroup>
                <InputOTPSlot v-for="index in resolvedLength" :key="index" :index="index - 1" />
            </InputOTPGroup>
        </slot>
    </OTPInput>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { OTPInputEmits, OTPInputProps } from 'vue-input-otp';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'reka-ui';
import { computed, provide } from 'vue';
import { OTPInput } from 'vue-input-otp';
import { cn } from '../../support/classNames';
import InputOTPGroup from './InputOTPGroup.vue';
import InputOTPSlot from './InputOTPSlot.vue';
import { inputOtpSizeKey, inputOtpMaskKey } from '.';

const props = withDefaults(
    defineProps<
        Omit<OTPInputProps, 'size' | 'maxlength'> & {
            class?: HTMLAttributes['class'];
            size?: 'sm' | 'default' | 'lg';
            maxlength?: number;
            masked?: boolean;
            maskCharacter?: string;
        }
    >(),
    { size: 'default', maxlength: 6, masked: false, maskCharacter: '*' },
);
provide(
    inputOtpSizeKey,
    computed(() => props.size),
);

const resolvedLength = computed(() =>
    Number.isFinite(props.maxlength) ? Math.max(1, Math.floor(props.maxlength)) : 6,
);
provide(
    inputOtpMaskKey,
    computed(() => ({ masked: props.masked, maskCharacter: props.maskCharacter })),
);
const emits = defineEmits<OTPInputEmits>();
const modelValue = defineModel<string>({ default: '' });

const delegatedProps = reactiveOmit(props, 'class', 'size', 'maxlength', 'masked', 'maskCharacter');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
