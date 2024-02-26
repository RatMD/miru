
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        __BREAKPOINT_XXS__: JSON.stringify(364),
        __BREAKPOINT_XS__: JSON.stringify(576),
        __BREAKPOINT_SM__: JSON.stringify(640),
        __BREAKPOINT_MD__: JSON.stringify(768),
        __BREAKPOINT_LG__: JSON.stringify(1024),
        __BREAKPOINT_XL__: JSON.stringify(1280),
        __BREAKPOINT_XXL__: JSON.stringify(1536),
    },
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
});
