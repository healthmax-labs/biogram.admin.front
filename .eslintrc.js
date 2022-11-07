module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint', 'react-hooks'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    rules: {
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        // "@typescript-eslint/explicit-function-return-type": "off",
        // "@typescript-eslint/no-var-requires": 0,
        'linebreak-style': [
            'error',
            require('os').EOL === '\r\n' ? 'windows' : 'unix',
        ],
        // "linebreak-style": 0,
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
}
