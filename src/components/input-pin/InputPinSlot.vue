<template>
    <div
        data-slot="input-pin-cell"
        :class="
            cn(
                'relative flex shrink-0 focus-within:z-10',
                connected &&
                    '-ms-px first:ms-0 first:[&>input]:rounded-s-md last:[&>input]:rounded-e-md',
            )
        ">
        <PinInputInput
            v-bind="$attrs"
            :id="
                ($attrs.id as string | undefined) ??
                (context?.id ? `${context.id}-${index + 1}` : undefined)
            "
            :index="index"
            :disabled="disabled"
            :readonly="readonly ?? context?.readonly"
            :autofocus="context?.autofocus && index === 0"
            :type="resolvedMasked ? 'password' : 'text'"
            :aria-label="
                ($attrs['aria-label'] as string | undefined) ??
                (context?.label ? `${context.label} · ${index + 1} / ${context.length}` : undefined)
            "
            :aria-describedby="context?.describedBy"
            :aria-invalid="context?.invalid"
            :data-valid="context?.valid"
            data-slot="input-pin-slot"
            :data-size="resolvedSize"
            :data-active="active"
            :data-masked="resolvedMasked"
            :class="
                cn(
                    'miru-field relative block border border-input bg-background p-0 text-center text-foreground tabular-nums shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground disabled:cursor-not-allowed focus-visible:z-10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger/20 dark:aria-invalid:focus-visible:ring-danger/40',
                    !connected && 'rounded-md',
                    resolvedSize === 'sm'
                        ? 'size-8 text-xs'
                        : resolvedSize === 'lg'
                          ? 'size-10 text-base'
                          : 'size-9 text-sm',
                    resolvedMasked &&
                        hasValue &&
                        'text-transparent caret-transparent selection:bg-transparent selection:text-transparent',
                    context?.inputClass,
                    props.class,
                )
            "
            @focus="active = true"
            @blur="active = false"
            @keydown.capture="guardReadonly"
            @paste.capture="guardPaste"></PinInputInput>
        <span
            v-if="resolvedMasked && hasValue"
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 flex items-center justify-center text-lg leading-none text-foreground">
            {{ maskCharacter ?? context?.maskCharacter ?? '●' }}
        </span>
    </div>
</template>
<script setup lang="ts">
import type { InputPinSize } from './types';
import type { HTMLAttributes } from 'vue';
import { PinInputInput } from 'reka-ui';
import { computed, inject, ref } from 'vue';
import { cn } from '../../support/classNames';
import { inputPinContextKey, inputPinConnectedKey } from './context';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        index: number;
        masked?: boolean;
        maskCharacter?: string;
        size?: InputPinSize;
        disabled?: boolean;
        readonly?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    { masked: undefined, readonly: undefined },
);
const root = inject(inputPinContextKey, undefined);
const groupConnected = inject(inputPinConnectedKey, undefined);
const context = computed(() => root?.value);
const connected = computed(() => groupConnected?.value ?? context.value?.connected ?? false);
const resolvedSize = computed(() => props.size ?? context.value?.size ?? 'default');
const resolvedMasked = computed(() => props.masked ?? context.value?.masked ?? false);
const hasValue = computed(() => !!context.value?.values[props.index]);
const active = ref(false);
function guardReadonly(event: KeyboardEvent) {
    if (
        (props.readonly ?? context.value?.readonly) &&
        ['Backspace', 'Delete'].includes(event.key)
    ) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }
}
function guardPaste(event: ClipboardEvent) {
    if (props.readonly ?? context.value?.readonly) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }
}
</script>
