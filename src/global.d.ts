import type { MiruConfig } from "./miru"

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        /**
         * Access to Miru Configuration
         */
        $miru: (key: keyof MiruConfig) => any;
    }
}

// normally this is only needed in .d.ts files
export {}
