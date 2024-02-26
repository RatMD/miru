import type { PreRenderedAsset, PreRenderedChunk } from 'rollup';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


/**
 * Collect Entries
 */
const components: { [key: string]: string } = {};
function collectEntries(): { [key: string]: string } {
    const entries: { [key: string]: string } = {};
    const root = path.resolve(__dirname, 'src');

    // Fetch Components
    let componentsPath = path.join(root, 'components');
    for (const component of fs.readdirSync(componentsPath)) {
        if (component.startsWith('_')) {
            continue;
        }

        let entryPath = path.join(componentsPath, component);
        for (const entry of fs.readdirSync(entryPath)) {
            if (entry.endsWith('.stories.ts')) {
                continue;
            }
            const entryName = entry.endsWith('.vue') ? entry.slice(0, -4) : entry.slice(0, -3);
            components[entryName] = component;
            entries[`${component}/${entryName}`] = `src/components/${component}/${entry}`;
        }
    }

    // Fetch Composables
    let composablesPath = path.join(root, 'composables');
    for (const composable of fs.readdirSync(composablesPath)) {
        entries[`composables/${composable.slice(0, -3)}`] = `src/composables/${composable}`;
    }

    // Fetch Constants
    let constantsPath = path.join(root, 'constants');
    for (const constant of fs.readdirSync(constantsPath)) {
        entries[`constants/${constant.slice(0, -3)}`] = `src/constants/${constant}`;
    }

    // Fetch Utilities
    let utilsPath = path.join(root, 'utils');
    for (const util of fs.readdirSync(utilsPath)) {
        entries[`utils/${util.slice(0, -3)}`] = `src/utils/${util}`;
    }

    // Fetch Main Plugin
    entries['index'] = 'src/miru.ts';

    // Return entries
    return entries;
}

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
    build: {
        outDir: 'dist',
        lib: {
            entry: collectEntries(),
            name: 'miru',
            formats: ['es']
        },
        cssCodeSplit: true,
        rollupOptions: {
            external: ['vue'],
            output: {
                assetFileNames(chunkInfo: PreRenderedAsset) {
                    if (chunkInfo.name) {
                        let name = chunkInfo.name?.slice(0, -4);
                        if (name in components) {
                            return `${components[name]}/${chunkInfo.name}`;
                        } else {
                            return '';
                        }
                    } else {
                        return '';
                    }
                },
                chunkFileNames: '_shared/[name]-[hash].js',
                entryFileNames: '[name].js',
                globals: {
                    vue: 'Vue'
                },
            },
        }
    }
});
