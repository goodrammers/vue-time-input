/* eslint-env node */
module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 0,
        'vue/padding-line-between-blocks': ['error', 'always'],
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'prefer-const': 0,
        '@typescript-eslint/no-empty-interface': ['warn'],
        '@typescript-eslint/no-empty-function': 'warn',
        'vue/no-unused-vars': ['warn'],
        '@typescript-eslint/no-inferrable-types': 'off',
    },
}
