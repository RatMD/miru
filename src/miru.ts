import type { App, Plugin } from "vue";

import FilesizeDirective from './directives/filesize';
import OutsideDirective from "./directives/outside";
import TooltipDirective from './directives/tooltip';

export interface MiruConfig {
    /**
     * The application root selector (defaults to '#app').
     */
    root?: string;
}

/**
 * Configuration Object
 */
const MiruOptions: Required<MiruConfig> = {
    root: '#app'
};

/**
 * Miru Vue3 Plugin
 */
const MiruPlugin = {
    /**
     * Install Miru Plugin
     * @param app 
     * @param options 
     */
    install(app: App, options: MiruConfig) {
        if (typeof options == 'object' && options !== null) {
            for (const [key, val] of Object.entries(options)) {
                if (typeof MiruOptions[(key as keyof MiruConfig)] != 'undefined') {
                    MiruOptions[(key as keyof MiruConfig)] = val;
                }
            }
        }

        app.config.globalProperties.$miru = (key: keyof MiruConfig) => {
            return MiruOptions[key] ?? null;
        };

        app.directive('click-outside', OutsideDirective);
        app.directive('filesize', FilesizeDirective);
        app.directive('tooltip', TooltipDirective);
    },
} as Plugin<MiruConfig>;

// Export Module
export default MiruPlugin;
