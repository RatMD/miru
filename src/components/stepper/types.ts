export type StepperVariant = 'default' | 'bordered';
export type StepperColor =
    'default' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
export type StepperMobileLayout = 'vertical' | 'compact' | 'scroll' | 'same';
export interface StepperTransition {
    from: number;
    to: number | undefined;
    action: 'next' | 'previous' | 'select' | 'complete';
}
export type StepperGuard = (
    transition: StepperTransition,
) => boolean | string | void | Promise<boolean | string | void>;
export interface StepperApi {
    nextStep: () => Promise<boolean>;
    prevStep: () => Promise<boolean>;
    goToStep: (step: number) => Promise<boolean>;
    complete: () => Promise<boolean>;
    clearError: () => void;
    readonly modelValue: number;
    readonly busy: boolean;
}
