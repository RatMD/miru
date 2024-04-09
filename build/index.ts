import type { NormalizedOutputOptions, OutputBundle } from 'rollup';
import type { Plugin } from 'vite';

import fs from 'node:fs';
import path from 'node:path';
import _pkg from '../package.json';

/**
 * Collect components and entry points
 * @param root
 * @returns 
 */
export function collect(root: string) {
    const components: { [key: string]: string } = {};
    const entries: { [key: string]: string } = {};

    // Fetch Components
    const componentsPath = path.join(root, 'components');
    for (const component of fs.readdirSync(componentsPath)) {
        if (component.startsWith('_')) {
            continue;
        }

        const entryPath = path.join(componentsPath, component);
        for (const entry of fs.readdirSync(entryPath)) {
            if (entry.endsWith('.stories.ts') || entry.endsWith('.story.vue')) {
                continue;
            }
            const entryName = entry.endsWith('.vue') ? entry.slice(0, -4) : entry.slice(0, -3);
            components[entryName] = component;
            entries[`${component}/${entryName}`] = `src/components/${component}/${entry}`;
        }
    }

    // Fetch Composables
    const composablesPath = path.join(root, 'composables');
    for (const composable of fs.readdirSync(composablesPath)) {
        entries[`composables/${composable.slice(0, -3)}`] = `src/composables/${composable}`;
    }

    // Fetch Constants
    const constantsPath = path.join(root, 'constants');
    for (const constant of fs.readdirSync(constantsPath)) {
        entries[`constants/${constant.slice(0, -3)}`] = `src/constants/${constant}`;
    }

    // Fetch Utilities
    const utilsPath = path.join(root, 'utils');
    for (const util of fs.readdirSync(utilsPath)) {
        entries[`utils/${util.slice(0, -3)}`] = `src/utils/${util}`;
    }

    // Fetch Main Plugin
    entries['index'] = 'src/miru.ts';

    // Return entries
    return { components, entries };
}

/**
 * VITE package.json Plugin
 * @returns 
 */
export function pkg(): Plugin {
    return {
        name: 'pkg',
        apply: 'build',
        writeBundle() {
            const content = JSON.parse(JSON.stringify(_pkg));
            delete content.scripts;
            delete content.dependencies;
            delete content.devDependencies;
            content.types = 'index.d.ts';
            content.typings = 'index.d.ts';
            fs.writeFileSync('dist/package.json', JSON.stringify(content, void 0, 4));
            fs.copyFileSync('CHANGELOG.md', 'dist/CHANGELOG.md');
            fs.copyFileSync('LICENSE.md', 'dist/LICENSE.md');
            fs.copyFileSync('README.md', 'dist/README.md');

            // @todo temporary solution to include basic miru.ink stylings.
            fs.copyFileSync('src/styles/base.css', 'dist/base.css');
        }
    };
}

/**
 * VITE styles Plugin
 */
export function sty(): Plugin {
    return {
        name: 'sty',
        apply: 'build',

        /**
         * Append .vue files to dist
         * @param options 
         * @param bundle 
         */
        generateBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
            for (const [key, chunk] of Object.entries(bundle)) {
                const moduleId = ((chunk as any).facadeModuleId ?? null);

                if (moduleId && moduleId.includes('/components/') && moduleId.endsWith('.vue')) {
                    bundle[`${key.slice(0, -2)}vue`] = {
                        fileName: `${key.slice(0, -2)}vue`,
                        name: undefined,
                        needsCodeReference: false,
                        source: fs.readFileSync(moduleId, 'utf-8').replace(/..\/..\//g, '../'),
                        type: 'asset'
                    };
                }
            }
        },

        /**
         * Collect & Write stylesheet to dist
         * @param options 
         * @param bundle 
         */
        async writeBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
            const stylings = [];

            // Append Stylings
            for (const [key, file] of Object.entries(bundle)) {
                if (!key.endsWith('.css')) {
                    continue;
                }
                stylings.push((file as any).source);
            }
            if (!fs.existsSync('dist/themes')) {
                fs.mkdirSync('dist/themes')
            }
            fs.writeFileSync('dist/themes/miru.min.css', stylings.join(''));
            fs.cpSync('src/styles', 'dist/styles', { recursive: true });
        }
    };
}
