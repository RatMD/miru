import type { Plugin } from "vue";

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
        
    },
} as Plugin;

/**
 * Setup Handler
 */
function createMiru() {
    return MiruPlugin
}

// Export Module
export default MiruPlugin;
export { MiruPlugin, createMiru };
