// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import-x';
import storybook from "eslint-plugin-storybook";
import vue from 'eslint-plugin-vue';

export default defineConfigWithVueTs(
    {
        name: 'miru/generated-files',
        ignores: [
            '**/node_modules/**',
            '.qa/**',
            'dist/**',
            'build/**',
            'storybook-static/**',
            'coverage/**',
            'test-results/**',
            'playwright-report/**',
            '.tmp/**',
            'tmp/**',
            '.codex-staging/**',
            '.agents/**',
        ],
    },
    vue.configs['flat/essential'],
    vueTsConfigs.recommended,
    {
        name: 'miru/conventions',
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        plugins: { import: importPlugin },
        languageOptions: {
            parserOptions: { vueFeatures: { filter: false } },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/block-order': [
                'error',
                { order: ['template', 'script:not([setup])', 'script[setup]', 'style'] },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
            ],
            'import/order': [
                'error',
                {
                    groups: [
                        'type',
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        },
    },
    prettier,
    {
        name: 'miru/support-conventions',
        files: ['src/support/**/*.ts'],
        rules: {
            curly: ['error', 'all'],
            'import/no-default-export': 'error',
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ExportNamedDeclaration[declaration!=null]',
                    message: 'Collect named exports at the end of the support module.',
                },
            ],
        },
    },
);
