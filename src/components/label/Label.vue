<template>
    <Label
        data-slot="label"
        :data-required="required || undefined"
        :data-valid="state.valid"
        :data-invalid="state.invalid"
        :aria-invalid="state.ariaInvalid"
        v-bind="delegatedProps"
        :class="
            cn(
                'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                'peer-data-[slot=checkbox]:cursor-pointer peer-data-[slot=radio-group-item]:cursor-pointer peer-data-[slot=switch]:cursor-pointer has-[[data-slot=checkbox]]:cursor-pointer has-[[data-slot=radio-group-item]]:cursor-pointer has-[[data-slot=switch]]:cursor-pointer',
                'peer-data-[slot=checkbox]:font-semibold peer-data-[slot=radio-group-item]:font-semibold peer-data-[slot=switch]:font-semibold has-[[data-slot=checkbox]]:font-semibold has-[[data-slot=radio-group-item]]:font-semibold has-[[data-slot=switch]]:font-semibold',
                props.class,
            )
        ">
        <template v-if="showStatus && (state.invalid || state.valid)">
            <IconX
                v-if="state.invalid"
                data-slot="label-invalid-icon"
                aria-hidden="true"
                class="size-4 shrink-0 text-danger" />
            <IconCheck
                v-else
                data-slot="label-valid-icon"
                aria-hidden="true"
                class="size-4 shrink-0 text-success" />
            <span class="sr-only">
                {{ trans(state.invalid ? 'common.form.field_invalid' : 'common.form.field_valid') }}
            </span>
        </template>
        <slot />
        <template v-if="required">
            <span data-slot="label-required" aria-hidden="true" class="-ml-1 text-danger">*</span>
            <span class="sr-only">{{ trans('common.form.field_required') }}</span>
        </template>
    </Label>
</template>

<script setup lang="ts">
import type { UiLabelProps } from './types';
import { IconCheck, IconX } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { Label } from 'reka-ui';
import { computed, inject } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { fieldValidationKey, resolveValidation } from '../field/validation';

const props = withDefaults(defineProps<UiLabelProps>(), {
    required: false,
    showValidation: undefined,
    valid: undefined,
    invalid: undefined,
    ariaValid: undefined,
    ariaInvalid: undefined,
    dataValid: undefined,
    dataInvalid: undefined,
});
const parent = inject(fieldValidationKey, undefined);
const showStatus = computed(() => props.showValidation ?? parent?.value.showValidation ?? false);
const state = computed(() => resolveValidation(props, parent?.value));
const { trans } = useI18n();

const delegatedProps = reactiveOmit(
    props,
    'class',
    'required',
    'showValidation',
    'valid',
    'invalid',
    'ariaValid',
    'ariaInvalid',
    'dataValid',
    'dataInvalid',
);
</script>
