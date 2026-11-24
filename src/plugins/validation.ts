import type { I18nParameters } from './i18n';
import type { App, ComputedRef, InjectionKey, Plugin } from 'vue';
import type { z } from 'zod';
import { inject } from 'vue';
import { miruOptionsKey } from '../miru';

interface ValidationContext {
    z: typeof z;
    locale: ComputedRef<string>;
    t: (key: string, parameters?: I18nParameters) => string;
    tc: (key: string, count: number, parameters?: I18nParameters) => string;
}

type ValidationFactory = (context: ValidationContext, ...args: any[]) => z.ZodType;
type ValidationFactories = Record<string, ValidationFactory>;

/** Application extension point; augment this interface to type globally registered factories. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Intentionally open for module augmentation.
interface CustomValidationFactories {}

const validationKey: InjectionKey<Readonly<ValidationFactories>> = Symbol('MiruValidation');
const reservedNames = new Set([
    'mailAddress',
    'gtin',
    'iban',
    'creditCard',
    '__proto__',
    'prototype',
    'constructor',
]);

/**
 * Check custom schema factories without changing or executing them.
 * @param factories Factories to register; built-in names are reserved.
 * @returns Nothing; invalid entries throw before installation.
 */
function validateFactories(factories: ValidationFactories): void {
    for (const [name, factory] of Object.entries(factories)) {
        if (!name || reservedNames.has(name)) {
            throw new Error(`Validation factory name '${name}' is reserved or empty.`);
        }

        if (typeof factory !== 'function') {
            throw new TypeError(`Validation factory '${name}' must be a function.`);
        }
    }
}

/**
 * Infer a host factory map while supplying contextual types to its callbacks.
 * @param factories Custom schema factories receiving app-local Zod and translation helpers.
 * @returns The same factory map, with its concrete signatures preserved.
 */
function defineValidators<T extends ValidationFactories>(factories: T): T {
    validateFactories(factories);

    return factories;
}

/**
 * Install an isolated snapshot of custom schema factories in a Vue app.
 * @param factories Explicit factories; omitted values use the installed Miru configuration.
 * @returns A Vue plugin that registers factories without creating schemas or modifying Zod.
 */
function createMiruValidation(factories?: ValidationFactories): Plugin {
    return {
        install(app: App) {
            const config = app.runWithContext(() => inject(miruOptionsKey, {}));
            const entries = factories ?? config.validators ?? {};
            validateFactories(entries);
            app.provide(validationKey, Object.freeze({ ...entries }));
        },
    };
}

// Export module
export { createMiruValidation, defineValidators, validateFactories, validationKey };
export type {
    ValidationContext,
    ValidationFactory,
    ValidationFactories,
    CustomValidationFactories,
};
