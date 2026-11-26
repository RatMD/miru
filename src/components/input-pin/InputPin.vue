<template>
    <PinInputRoot
        v-bind="$attrs"
        :id="id"
        :model-value="values"
        :type="type"
        :mask="masked"
        :otp="otp"
        :disabled="disabled"
        :dir="dir"
        :name="name"
        :required="required"
        :placeholder="placeholder"
        role="group"
        data-slot="input-pin"
        :data-connected="connected"
        :aria-invalid="validation.ariaInvalid"
        :data-valid="validation.valid"
        :class="cn('flex w-fit max-w-full items-center gap-2 has-disabled:opacity-50', props.wrapperClass)"
        @update:model-value="updateValue"
        @complete="complete"
        @focusin="onFocus"
        @focusout="onBlur"
        @paste="emit('paste', $event)">
        <slot :value="values.join('')">
            <InputPinGroup>
                <InputPinSlot v-for="index in resolvedLength" :key="index" :index="index - 1" />
            </InputPinGroup>
        </slot>
    </PinInputRoot>
</template>
<script setup lang="ts">
import type { InputPinSize, InputPinType } from './types';
import type { HTMLAttributes } from 'vue';
import { PinInputRoot } from 'reka-ui';
import { computed, inject, provide, ref, useAttrs, watch } from 'vue';
import { cn } from '../../support/classNames';
import { fieldValidationKey, resolveValidation } from '../field/validation';
import { inputPinContextKey } from './context';
import InputPinGroup from './InputPinGroup.vue';
import InputPinSlot from './InputPinSlot.vue';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        modelValue?: string;
        defaultValue?: string;
        maxlength?: number;
        type?: InputPinType;
        masked?: boolean;
        maskCharacter?: string;
        connected?: boolean;
        size?: InputPinSize;
        disabled?: boolean;
        readonly?: boolean;
        otp?: boolean;
        autofocus?: boolean;
        id?: string;
        name?: string;
        required?: boolean;
        placeholder?: string;
        dir?: 'ltr' | 'rtl';
        invalid?: boolean;
        valid?: boolean;
        class?: HTMLAttributes['class'];
        wrapperClass?: HTMLAttributes['class'];
    }>(),
    {
        maxlength: 6,
        type: 'number',
        masked: false,
        maskCharacter: '●',
        connected: false,
        size: 'default',
        disabled: false,
        readonly: false,
        otp: true,
        autofocus: false,
        invalid: undefined,
        valid: undefined,
    },
);
const emit = defineEmits<{
    'update:modelValue': [value: string];
    complete: [value: string];
    input: [value: string];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
    paste: [event: ClipboardEvent];
}>();
const attrs = useAttrs();
const parentValidation = inject(fieldValidationKey, undefined);
const validation = computed(() =>
    resolveValidation(
        {
            invalid: props.invalid,
            valid: props.valid,
            ariaInvalid: attrs['aria-invalid'] as
                boolean | 'true' | 'false' | 'grammar' | 'spelling' | undefined,
            ariaValid: attrs['aria-valid'] as boolean | 'true' | 'false' | undefined,
            dataValid: attrs['data-valid'] as boolean | 'true' | 'false' | undefined,
        },
        parentValidation?.value,
    ),
);
const resolvedLength = computed(() =>
    Number.isFinite(props.maxlength) ? Math.max(1, Math.floor(props.maxlength)) : 6,
);
function characters(value: string) {
    return Array.from(props.type === 'number' ? value.replace(/\D/g, '') : value).slice(
        0,
        resolvedLength.value,
    );
}
const values = ref<string[]>(characters(props.modelValue ?? props.defaultValue ?? ''));
let lastEmitted: string | undefined;
provide(
    inputPinContextKey,
    computed(() => ({
        size: props.size,
        connected: props.connected,
        masked: props.masked,
        maskCharacter: Array.from(props.maskCharacter)[0] || '●',
        values: values.value,
        length: resolvedLength.value,
        id: props.id,
        label: attrs['aria-label'] as string | undefined,
        describedBy: attrs['aria-describedby'] as string | undefined,
        invalid: validation.value.ariaInvalid,
        valid: validation.value.valid,
        readonly: props.readonly,
        inputClass: props.class,
        autofocus: props.autofocus,
    })),
);
function updateValue(value: readonly (string | number | undefined)[]) {
    if (props.disabled || props.readonly) return;
    values.value = value
        .slice(0, resolvedLength.value)
        .map((char) => (char === undefined ? '' : String(char)));
    const next = values.value.join('');
    lastEmitted = next;
    emit('update:modelValue', next);
    emit('input', next);
}
function complete(value: readonly (string | number | undefined)[]) {
    if (
        props.disabled ||
        props.readonly ||
        value.length !== resolvedLength.value ||
        value.some((char) => char === undefined || char === '')
    )
        return;
    emit('complete', value.join(''));
}
function isWithin(event: FocusEvent) {
    return (
        event.relatedTarget instanceof Node &&
        (event.currentTarget as HTMLElement).contains(event.relatedTarget)
    );
}
function onFocus(event: FocusEvent) {
    if (!isWithin(event)) emit('focus', event);
}
function onBlur(event: FocusEvent) {
    if (!isWithin(event)) emit('blur', event);
}
watch(
    () => props.modelValue,
    (value) => {
        const isEcho = value === lastEmitted;
        lastEmitted = undefined;
        if (isEcho) return;
        values.value = characters(value ?? '');
    },
);
watch([resolvedLength, () => props.type], () => {
    const next = characters(values.value.join(''));
    const previous = values.value.join('');
    values.value = next;
    if (next.join('') !== previous) {
        lastEmitted = next.join('');
        emit('update:modelValue', lastEmitted);
    }
});
</script>
