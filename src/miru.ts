import type { Plugin } from "vue";

import FilesizeDirective from './directives/filesize';
import OutsideDirective from "./directives/outside";

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
        app.directive('filesize', FilesizeDirective);
        app.directive('click-outside', OutsideDirective);
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
