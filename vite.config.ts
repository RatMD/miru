/// <reference types="histoire" />

import type { PreRenderedAsset } from 'rollup';

import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { collect, pkg, sty } from './build';
import packageJson from './package.json' with { type: 'json' };

// Collect components and entries
const { components, entries } = collect(path.resolve(__dirname, 'src'));

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        __MIRU_VERSION__: JSON.stringify(packageJson.version),
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
        pkg(),
        sty(),
        dts({
            beforeWriteFile(filePath: string, content: string) {
                const mainPath = path.resolve(__dirname, 'dist', 'miru.d.ts').replace(/\\/g, '/');
                if (filePath.startsWith(mainPath)) {
                    return {
                        filePath: filePath.replace('/miru.d.ts', '/index.d.ts'),
                        content
                    }     
                }

                const componentsPath = path.resolve(__dirname, 'dist', 'components').replace(/\\/g, '/');
                if (filePath.startsWith(componentsPath)) {
                    return {
                        filePath: filePath.replace('/components/', '/'),
                        content
                    }                    
                }
            },
            //cleanVueFileName: true,
            //tsconfigPath: 'tsconfig.types.json'
        })
    ],
    build: {
        outDir: 'dist',
        lib: {
            entry: entries,
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
