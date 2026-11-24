import type {
    CustomValidationFactories,
    ValidationContext,
    ValidationFactories,
    ValidationFactory,
} from '../plugins/validation';
import { inject } from 'vue';
import { z } from 'zod';
import { validateFactories, validationKey } from '../plugins/validation';
import { isValidCreditCard } from '../support/creditCard';
import { isValidMailAddress } from '../support/emailAddress';
import { isValidGtin } from '../support/gtin';
import { isValidIban } from '../support/iban';
import { useI18n } from './useI18n';

interface ValidationSchemaOptions {
    /** A fixed message or a callback evaluated for each failed validation. */
    error?: string | (() => string);
}

type BoundValidationFactories<T> = {
    [Key in keyof T]: T[Key] extends (
        context: ValidationContext,
        ...args: infer Args
    ) => infer Schema
        ? (...args: Args) => Schema
        : never;
};

/**
 * Bind a string predicate to a standard Zod schema with a localized error.
 * @param context Current app/tree translations and Zod instance.
 * @param check Pure string predicate to run after the type check.
 * @param key Translation key for the default error.
 * @param options Optional message override.
 * @returns A chainable Zod string schema.
 */
function stringSchema(
    context: ValidationContext,
    check: (value: string) => boolean,
    key: string,
    options: ValidationSchemaOptions = {},
): z.ZodString {
    const error = options.error ?? (() => context.t(key));

    return z.string({ error }).refine(check, { error });
}

/**
 * Create schema factories for Miru's built-in string validators.
 * @param context Current app/tree validation context.
 * @returns Chainable factories that evaluate translations at validation time.
 */
function createBuiltinValidators(context: ValidationContext) {
    return {
        mailAddress: (options?: ValidationSchemaOptions) =>
            stringSchema(context, isValidMailAddress, 'common.validation.mail_address', options),
        gtin: (options?: ValidationSchemaOptions) =>
            stringSchema(context, isValidGtin, 'common.validation.gtin', options),
        iban: (options?: ValidationSchemaOptions) =>
            stringSchema(context, isValidIban, 'common.validation.iban', options),
        creditCard: (options?: ValidationSchemaOptions) =>
            stringSchema(context, isValidCreditCard, 'common.validation.credit_card', options),
    };
}

type BuiltinValidators = ReturnType<typeof createBuiltinValidators>;
type ValidationResult<T> = {
    validators: BuiltinValidators &
        BoundValidationFactories<Omit<CustomValidationFactories, keyof T> & T>;
};

/**
 * Access built-in, app-registered and optional local Zod schema factories.
 * @param factories Local factories, overriding matching custom app factories for this call.
 * @returns Typed factories bound to the current app and nearest i18n provider.
 */
function useValidation<T extends ValidationFactories>(factories: T): ValidationResult<T>;
function useValidation<T extends ValidationFactories = Record<never, never>>(): ValidationResult<T>;
function useValidation<T extends ValidationFactories = Record<never, never>>(
    factories?: T,
): ValidationResult<T> {
    const registered = inject(validationKey, {});
    const local = factories ?? {};
    validateFactories(local);
    const i18n = useI18n();
    const context: ValidationContext = { z, locale: i18n.locale, t: i18n.t, tc: i18n.tc };
    const validators: Record<string, unknown> = { ...createBuiltinValidators(context) };

    for (const [name, factory] of Object.entries({ ...registered, ...local }) as [
        string,
        ValidationFactory,
    ][]) {
        validators[name] = (...args: unknown[]) => {
            const schema = factory(context, ...args);

            if (!schema || typeof schema.safeParseAsync !== 'function') {
                throw new TypeError(
                    `Validation factory '${name}' must return a Zod schema synchronously.`,
                );
            }

            return schema;
        };
    }

    return { validators: Object.freeze(validators) as ValidationResult<T>['validators'] };
}

// Export module
export { useValidation };
export type { BuiltinValidators, BoundValidationFactories, ValidationSchemaOptions };
export type {
    ValidationContext,
    ValidationFactory,
    ValidationFactories,
    CustomValidationFactories,
} from '../plugins/validation';
