import type { NavigationAdapter } from '../adapters/ajax';
import { inject } from 'vue';
import { browserNavigation } from '../adapters/ajax';
import { miruOptionsKey } from '../miru';

/** Use the navigation integration belonging to the current Vue application. */
export function useNavigation(): NavigationAdapter {
    const config = inject(miruOptionsKey, {});
    return {
        get link() {
            return config.navigation?.link;
        },
        visit(url, options) {
            (config.navigation ?? browserNavigation).visit(url, options);
        },
    };
}
