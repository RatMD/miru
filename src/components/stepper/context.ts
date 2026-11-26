import type { ComputedRef, InjectionKey } from 'vue';
export interface StepperRegistration {
    disabled: ComputedRef<boolean>;
    titleId: string;
}
export interface StepperContext {
    id: string;
    current: ComputedRef<number>;
    orientation: ComputedRef<'horizontal' | 'vertical'>;
    disabled: ComputedRef<boolean>;
    busy: ComputedRef<boolean>;
    error: ComputedRef<string>;
    steps: Map<number, StepperRegistration>;
    next: ComputedRef<number | undefined>;
    previous: ComputedRef<number | undefined>;
    nextStep: () => Promise<boolean>;
    prevStep: () => Promise<boolean>;
    goToStep: (step: number) => Promise<boolean>;
    complete: () => Promise<boolean>;
    clearError: () => void;
}
export interface StepperItemContext {
    step: ComputedRef<number>;
    completed: ComputedRef<boolean>;
    error: ComputedRef<string | boolean>;
    titleId: string;
}
export const stepperKey: InjectionKey<StepperContext> = Symbol('Stepper');
export const stepperItemKey: InjectionKey<StepperItemContext> = Symbol('StepperItem');
