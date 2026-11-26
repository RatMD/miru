<template>
    <div
        data-slot="stepper-actions"
        :data-error="!!group.error.value || undefined"
        :class="cn('miru-stepper-actions', props.class)">
        <div class="min-w-0 flex-1">
            <div
                v-if="group.error.value"
                role="alert"
                class="flex items-start gap-2 text-sm text-danger"
                data-slot="stepper-error">
                <IconAlertTriangle class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{{ group.error.value }}</span>
            </div>
            <slot name="message" :error="group.error.value" />
        </div>
        <div class="flex shrink-0 items-center gap-2" data-slot="stepper-buttons">
            <slot v-bind="controls">
                <Button
                    v-if="showPrevious"
                    variant="outline"
                    :size="size"
                    :disabled="unavailable || previousDisabled"
                    @click="group.prevStep()">
                    <IconArrowLeft class="size-4 rtl:rotate-180" aria-hidden="true" />
                    {{ previousLabel || trans('common.stepper.previous') }}
                </Button>
                <Button
                    v-if="showNext"
                    :variant="variant"
                    :size="size"
                    :loading="group.busy.value"
                    :disabled="unavailable || nextDisabled"
                    @click="group.next.value === undefined ? group.complete() : group.nextStep()">
                    {{
                        group.next.value === undefined
                            ? completeLabel || trans('common.stepper.complete')
                            : nextLabel || trans('common.stepper.next')
                    }}
                    <IconArrowRight class="size-4 rtl:rotate-180" aria-hidden="true" />
                </Button>
            </slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type { HTMLAttributes } from 'vue';
import { IconArrowLeft, IconArrowRight, IconAlertTriangle } from '@tabler/icons-vue';
import { computed, inject } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import { stepperKey } from './context';
const props = withDefaults(
    defineProps<{
        showPrevious?: boolean;
        showNext?: boolean;
        previousLabel?: string;
        nextLabel?: string;
        completeLabel?: string;
        variant?: ButtonVariants['variant'];
        size?: ButtonVariants['size'];
        class?: HTMLAttributes['class'];
    }>(),
    { showPrevious: true, showNext: true, variant: 'primary', size: 'sm' },
);
const group = inject(stepperKey);
if (!group) throw new Error('StepperActions must be inside Stepper.');
const { trans } = useI18n();
const unavailable = computed(
    () => group.disabled.value || group.busy.value || group.steps.size === 0,
);
const nextDisabled = computed(
    () => group.next.value !== undefined && group.steps.get(group.next.value)?.disabled.value,
);
const previousDisabled = computed(
    () =>
        group.previous.value === undefined || group.steps.get(group.previous.value)?.disabled.value,
);
const controls = computed(() => ({
    nextStep: group.nextStep,
    prevStep: group.prevStep,
    complete: group.complete,
    busy: group.busy.value,
    error: group.error.value,
    isLastStep: group.next.value === undefined,
}));
</script>
