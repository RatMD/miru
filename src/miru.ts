import type { Plugin } from "vue";

import FilesizeDirective from './directives/filesize';

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
        app.directive('filesize', FilesizeDirective)
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
