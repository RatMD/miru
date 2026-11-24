<template>
    <Popover>
        <InputGroup
            :size="size"
            :data-disabled="disabled"
            class="w-full max-w-60"
            :class="props.class">
            <InputGroupAddon class="h-full shrink-0 self-stretch p-0!">
                <PopoverTrigger as-child>
                    <button
                        type="button"
                        data-slot="color-picker-trigger"
                        class="group/color-swatch aspect-square h-full shrink-0 cursor-pointer rounded-l-[max(0px,calc(var(--ui-radius)-3px))] border-r border-border bg-background p-1 transition-colors enabled:hover:border-muted-foreground enabled:hover:bg-ghostly focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        :class="size === 'sm' ? 'rounded-l-[3px]' : undefined"
                        :disabled="disabled"
                        :aria-label="ariaLabel"
                        :aria-invalid="
                            invalid ||
                            $attrs['aria-invalid'] === true ||
                            $attrs['aria-invalid'] === 'true'
                        "
                        :aria-valid="$attrs['aria-valid']">
                        <span
                            data-slot="color-picker-swatch"
                            aria-hidden="true"
                            class="block size-full rounded-[max(0px,calc(var(--ui-radius)-5px))] border border-black/10 transition-[filter] group-[:enabled:hover]/color-swatch:brightness-90 dark:border-white/15"
                            :style="{ backgroundColor: modelValue || 'transparent' }" />
                        <span class="sr-only">{{ ariaLabel }}</span>
                    </button>
                </PopoverTrigger>
            </InputGroupAddon>
            <InputGroupInput
                v-bind="$attrs"
                class="font-mono"
                :id="id"
                :model-value="modelValue ?? ''"
                :disabled="disabled"
                :aria-invalid="
                    invalid || $attrs['aria-invalid'] === true || $attrs['aria-invalid'] === 'true'
                "
                :aria-label="ariaLabel"
                :placeholder="placeholder"
                maxlength="7"
                autocomplete="off"
                spellcheck="false"
                @update:model-value="updateHex"
                @blur="emit('blur', $event)" />
        </InputGroup>
        <PopoverContent
            align="start"
            class="miru-color-picker w-auto max-w-[calc(100vw-2rem)] bg-popover p-2">
            <Vue3ColorPicker
                :model-value="modelValue"
                mode="solid"
                type="HEX"
                :show-alpha="false"
                :show-picker-mode="false"
                :show-color-list="false"
                :show-buttons="false"
                :disabled="disabled"
                @update:model-value="emit('update:modelValue', $event)" />
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        id?: string;
        modelValue: string | null;
        ariaLabel: string;
        placeholder?: string;
        disabled?: boolean;
        invalid?: boolean;
        size?: 'sm' | 'default' | 'lg';
        class?: HTMLAttributes['class'];
    }>(),
    { disabled: false, invalid: false, size: 'default' },
);

const emit = defineEmits<{
    'update:modelValue': [value: string | null];
    blur: [event: FocusEvent];
}>();

function updateHex(value: string | number): void {
    emit('update:modelValue', String(value) || null);
}
</script>
