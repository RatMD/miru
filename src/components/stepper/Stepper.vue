<template>
    <StepperRoot
        :id="id"
        :model-value="current"
        :orientation="resolvedOrientation"
        :linear="linear"
        :dir="dir"
        :aria-label="ariaLabel || trans('common.stepper.label')"
        :aria-busy="busy || undefined"
        data-slot="stepper"
        :data-variant="variant"
        :data-size="size"
        :data-color="color"
        :data-inactive-appearance="inactiveAppearance"
        :data-mobile-layout="mobile ? mobileLayout : undefined"
        :data-disabled="disabled || undefined"
        :class="cn('miru-stepper min-w-0', props.class)"
        :style="colorStyle"
        @update:model-value="select">
        <slot v-bind="slotState" />
        <span
            data-slot="stepper-status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            class="sr-only">
            {{
                trans('common.stepper.status', {
                    current: String(current),
                    total: String(ordered.length),
                })
            }}
        </span>
    </StepperRoot>
</template>
<script setup lang="ts">
import type { StepperRegistration } from './context';
import type {
    StepperColor,
    StepperGuard,
    StepperMobileLayout,
    StepperTransition,
    StepperVariant,
} from './types';
import type { HTMLAttributes } from 'vue';
import { StepperRoot } from 'reka-ui';
import { computed, onBeforeUnmount, provide, ref, shallowReactive, useId, watch } from 'vue';
import { useBreakpoint } from '../../composables/useBreakpoint';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { stepperKey } from './context';

const props = withDefaults(
    defineProps<{
        modelValue?: number;
        defaultValue?: number;
        orientation?: 'horizontal' | 'vertical';
        /** Mobile layout follows the viewport below mobileBreakpoint. */
        mobileLayout?: StepperMobileLayout;
        /** Override automatic viewport detection, e.g. for embedded mobile previews. */
        mobile?: boolean;
        mobileBreakpoint?: number;
        variant?: StepperVariant;
        size?: 'sm' | 'default' | 'lg';
        color?: StepperColor;
        completedColor?: StepperColor;
        inactiveAppearance?: 'outline' | 'solid' | 'muted';
        linear?: boolean;
        disabled?: boolean;
        loading?: boolean;
        error?: string;
        /** Runs for every navigation, including returning to previous steps. */
        beforeChange?: StepperGuard;
        /** Validates forward navigation and completion; return false or an error message to stay. */
        beforeNext?: StepperGuard;
        ariaLabel?: string;
        dir?: 'ltr' | 'rtl';
        class?: HTMLAttributes['class'];
    }>(),
    {
        defaultValue: 1,
        orientation: 'horizontal',
        mobileLayout: 'vertical',
        mobile: undefined,
        variant: 'default',
        size: 'default',
        color: 'primary',
        completedColor: 'success',
        inactiveAppearance: 'outline',
        linear: true,
        disabled: false,
        loading: false,
        error: '',
    },
);
const emit = defineEmits<{
    'update:modelValue': [value: number];
    change: [transition: StepperTransition];
    complete: [step: number];
    error: [error: unknown];
}>();
const { trans } = useI18n();
const id = `stepper-${useId()}`;
const internal = ref(props.defaultValue);
const current = computed(() => props.modelValue ?? internal.value);
const pending = ref(false);
const localError = ref('');
const busy = computed(() => props.loading || pending.value);
const error = computed(() => props.error || localError.value);
const colorStyle = computed(() => ({
    '--stepper-active': `var(--ui-${props.color === 'default' ? 'foreground' : props.color})`,
    '--stepper-active-text': `var(--ui-${props.color === 'default' ? 'background' : props.color + '-foreground'})`,
    '--stepper-complete': `var(--ui-${props.completedColor === 'default' ? 'foreground' : props.completedColor})`,
    '--stepper-complete-text': `var(--ui-${props.completedColor === 'default' ? 'background' : props.completedColor + '-foreground'})`,
}));
const { matches: viewportMobile } = useBreakpoint(() => ({ max: props.mobileBreakpoint === undefined ? 'sm' : Math.max(1, props.mobileBreakpoint) }));
const mobile = computed(() => props.mobile ?? viewportMobile.value);
const resolvedOrientation = computed(() =>
    mobile.value && props.mobileLayout === 'vertical' ? 'vertical' : props.orientation,
);
const steps = shallowReactive(new Map<number, StepperRegistration>());
const ordered = computed(() => [...steps.keys()].sort((a, b) => a - b));
const next = computed(() => ordered.value.find((step) => step > current.value));
const previous = computed(() => ordered.value.filter((step) => step < current.value).at(-1));
const clearError = () => {
    localError.value = '';
};
let generation = 0;
let alive = true;
watch(current, () => {
    generation++;
    clearError();
});
onBeforeUnmount(() => {
    alive = false;
    generation++;
});
async function transition(
    to: number | undefined,
    action: StepperTransition['action'],
): Promise<boolean> {
    if (busy.value || props.disabled || !steps.has(current.value)) return false;
    if (action === 'complete' && next.value !== undefined) return false;
    if (
        to !== undefined &&
        (to === current.value || !steps.has(to) || steps.get(to)?.disabled.value)
    )
        return false;
    if (props.linear && to !== undefined && to > current.value && to !== next.value) return false;
    const change: StepperTransition = { from: current.value, to, action };
    const token = ++generation;
    pending.value = true;
    clearError();
    const valid = () =>
        alive &&
        generation === token &&
        current.value === change.from &&
        !props.disabled &&
        !props.loading &&
        (to === undefined || (steps.has(to) && !steps.get(to)?.disabled.value));
    try {
        for (const guard of [
            props.beforeChange,
            to === undefined || to > change.from ? props.beforeNext : undefined,
        ]) {
            if (!guard) continue;
            const result = await guard(change);
            if (!valid()) return false;
            if (result === false || typeof result === 'string') {
                localError.value =
                    typeof result === 'string' && result ? result : trans('common.stepper.invalid');
                return false;
            }
        }
        if (!valid()) return false;
        if (action === 'complete') emit('complete', current.value);
        else if (to !== undefined) {
            internal.value = to;
            emit('update:modelValue', to);
            emit('change', change);
        }
        return true;
    } catch (cause) {
        if (valid()) {
            localError.value = trans('common.stepper.failed');
            emit('error', cause);
        }
        return false;
    } finally {
        pending.value = false;
    }
}
const goToStep = (step: number) => transition(step, 'select');
const nextStep = () =>
    next.value === undefined ? Promise.resolve(false) : transition(next.value, 'next');
const prevStep = () =>
    previous.value === undefined ? Promise.resolve(false) : transition(previous.value, 'previous');
const complete = () => transition(undefined, 'complete');
const select = (step: number | undefined) => {
    if (step !== undefined) void goToStep(step);
};
provide(stepperKey, {
    id,
    current,
    orientation: resolvedOrientation,
    disabled: computed(() => props.disabled),
    busy,
    error,
    steps,
    next,
    previous,
    nextStep,
    prevStep,
    goToStep,
    complete,
    clearError,
});
const slotState = computed(() => ({
    modelValue: current.value,
    totalSteps: ordered.value.length,
    busy: busy.value,
    error: error.value,
    isFirstStep: previous.value === undefined,
    isLastStep: next.value === undefined,
    nextStep,
    prevStep,
    goToStep,
    complete,
    clearError,
}));
defineExpose({ modelValue: current, busy, nextStep, prevStep, goToStep, complete, clearError });
</script>
