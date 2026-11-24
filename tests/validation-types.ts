import type { z } from 'zod';
import { useValidation } from '@rat.md/miru/composables/useValidation';
import { defineValidators } from '@rat.md/miru/plugins/validation';

const custom = defineValidators({
    customerId: ({ z }, prefix: string) => z.string().startsWith(prefix),
    amount: ({ z }) => z.string().transform((value) => Number(value)),
});

declare module '@rat.md/miru/plugins/validation' {
    interface CustomValidationFactories {
        customerId: typeof custom.customerId;
    }
}

const { validators } = useValidation<typeof custom>();
const customer: string = validators.customerId('CUS-').parse('CUS-1');
const amount: number = validators.amount().parse('12');
const optional: string | undefined = validators.iban().optional().parse(undefined);
const output: z.output<ReturnType<typeof validators.amount>> = 12;
const registered: string = useValidation().validators.customerId('CUS-').parse('CUS-2');

const local = useValidation({
    integer: ({ z }, minimum: number) => z.number().int().min(minimum),
});
const integer: number = local.validators.integer(1).parse(2);

// @ts-expect-error Unknown factories must not become an untyped string index.
validators.missing();
// @ts-expect-error The custom factory's parameter type must be preserved.
validators.customerId(123);
// @ts-expect-error A transformed output must not be widened to any or string.
const incorrect: string = validators.amount().parse('12');
// @ts-expect-error Local schema outputs must remain typed as well.
const incorrectLocal: string = local.validators.integer(1).parse(2);
// @ts-expect-error Factories must synchronously return a Zod schema.
defineValidators({ invalid: () => 123 });

void [customer, amount, optional, output, registered, integer, incorrect, incorrectLocal];
