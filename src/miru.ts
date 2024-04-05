import type { Plugin } from "vue";

import FilesizeDirective from './directives/filesize';
import OutsideDirective from "./directives/outside";
import TooltipDirective from './directives/tooltip';

/**
 * Miru Vue3 Plugin
 */
const MiruPlugin = {
    /**
     * Install Miru Plugin
     * @param app 
     * @param options 
     */
    install(app, ...options) {
        app.directive('click-outside', OutsideDirective);
        app.directive('filesize', FilesizeDirective);
        app.directive('tooltip', TooltipDirective);
    },
} as Plugin;

/**
 * Setup Handler
 */
function createMiru() {
    return MiruPlugin
}

// Export Module
export { MiruPlugin, createMiru };
