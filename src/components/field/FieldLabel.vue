<template>
    <Label
        data-slot="field-label"
        v-bind="delegatedProps"
        :class="
            cn(
                'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
                'group-has-[[data-slot=checkbox]]/field:cursor-pointer group-has-[[data-slot=radio-group-item]]/field:cursor-pointer group-has-[[data-slot=switch]]/field:cursor-pointer',
                'group-has-[[data-slot=checkbox]]/field:font-semibold group-has-[[data-slot=radio-group-item]]/field:font-semibold group-has-[[data-slot=switch]]/field:font-semibold',
                'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4',
                'has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10',
                props.class,
            )
        ">
        <slot />
    </Label>
</template>

<script setup lang="ts">
import type { UiLabelProps } from '../label';
import { reactiveOmit } from '@vueuse/core';
import { cn } from '../../support/classNames';
import { Label } from '../label';

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
const delegatedProps = reactiveOmit(props, 'class');
</script>
