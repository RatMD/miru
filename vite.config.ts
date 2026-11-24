import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import ts from 'typescript';
import { defineConfig } from 'vite';
import packageJson from './package.json' with { type: 'json' };

const { dependencies, peerDependencies } = packageJson;
// The public barrels are the source of truth for individual module entry points.
function publicModuleEntries(group: 'composables' | 'support'): Record<string, string> {
    const url = new URL(`./src/${group}/index.ts`, import.meta.url);
    const source = ts.createSourceFile(
        'index.ts',
        readFileSync(url, 'utf8'),
        ts.ScriptTarget.Latest,
    );
    const modules = new Set<string>();
    for (const statement of source.statements) {
        if (
            ts.isExportDeclaration(statement) &&
            statement.moduleSpecifier &&
            ts.isStringLiteral(statement.moduleSpecifier) &&
            statement.moduleSpecifier.text.startsWith('./')
        ) {
            modules.add(statement.moduleSpecifier.text.slice(2));
        }
    }
    return Object.fromEntries(
        [...modules].map((name) => [
            `${group}/${name}`,
            fileURLToPath(new URL(`./src/${group}/${name}.ts`, import.meta.url)),
        ]),
    );
}
const externalPackages = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];
export default defineConfig({
    base: './',
    plugins: [vue(), tailwindcss()],
    build: {
        assetsDir: '',
        lib: {
            entry: {
                layouts: fileURLToPath(new URL('./src/layouts/index.ts', import.meta.url)),
                plugins: fileURLToPath(new URL('./src/plugins/index.ts', import.meta.url)),
                miru: fileURLToPath(new URL('./src/miru.ts', import.meta.url)),
                ...Object.fromEntries(
                    [
                        'click-outside',
                        'dayjs',
                        'filesize',
                        'price',
                        'resize',
                        'tinymce',
                        'inertia',
                        'i18n',
                        'directives',
                        'validation',
                    ].map((name) => [
                        'plugins/' + name,
                        fileURLToPath(new URL('./src/plugins/' + name + '.ts', import.meta.url)),
                    ]),
                ),
                composables: fileURLToPath(new URL('./src/composables/index.ts', import.meta.url)),
                support: fileURLToPath(new URL('./src/support/index.ts', import.meta.url)),
                ...publicModuleEntries('composables'),
                ...publicModuleEntries('support'),
                index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
                styles: fileURLToPath(new URL('./src/styles.ts', import.meta.url)),
            },
            formats: ['es'],
            fileName: (_format, entryName) => `${entryName}.js`,
            cssFileName: 'style',
        },
        rollupOptions: {
            external: (id) =>
                !id.includes('.css') &&
                externalPackages.some((name) => id === name || id.startsWith(`${name}/`)),
        },
    },
});
