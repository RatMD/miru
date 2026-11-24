import type { ComputedRef, InjectionKey } from 'vue';
export type ValidationBoolean = boolean | 'true' | 'false';
export interface ValidationProps {
    valid?: ValidationBoolean;
    invalid?: ValidationBoolean;
    ariaValid?: ValidationBoolean;
    ariaInvalid?: ValidationBoolean | 'grammar' | 'spelling';
    dataValid?: ValidationBoolean;
    dataInvalid?: ValidationBoolean;
}
export interface FieldValidationState {
    showValidation?: boolean;
    valid?: boolean;
    invalid?: boolean;
    ariaInvalid?: boolean | 'grammar' | 'spelling';
}
export const fieldValidationKey: InjectionKey<ComputedRef<FieldValidationState>> =
    Symbol('miru-field-validation');
function flag(value: unknown): boolean | undefined {
    return value == null
        ? undefined
        : value === true || value === 'true' || value === 'grammar' || value === 'spelling';
}
/** Accept aria-valid as an input alias, but emit data-valid instead of a nonstandard ARIA attribute. */
export function resolveValidation(
    props: ValidationProps,
    parent?: FieldValidationState,
): FieldValidationState {
    const invalid =
        flag(props.invalid) ??
        flag(props.ariaInvalid) ??
        flag(props.dataInvalid) ??
        parent?.invalid;
    const valid =
        invalid === true
            ? false
            : (flag(props.valid) ??
              flag(props.ariaValid) ??
              flag(props.dataValid) ??
              parent?.valid);
    const ariaInvalid =
        invalid === true
            ? props.ariaInvalid === 'grammar' || props.ariaInvalid === 'spelling'
                ? props.ariaInvalid
                : true
            : invalid === false || valid === true
              ? false
              : undefined;
    return { valid, invalid, ariaInvalid };
}
