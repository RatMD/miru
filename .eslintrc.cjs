/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-typescript'
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'vue/no-unused-vars': 'off',
    },
    parserOptions: {
        ecmaVersion: 'latest'
    },
    settings: { }
};
