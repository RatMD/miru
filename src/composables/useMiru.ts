import { inject } from 'vue';
import { miruOptionsKey } from '../miru';
import { useI18n } from './useI18n';

/** Read the current app configuration and the nearest provider's translations. */
export function useMiru() {
    const options = inject(miruOptionsKey, {});
    return {
        ...useI18n(),
        get currency() {
            return options.currency ?? 'EUR';
        },
        options,
    };
}
