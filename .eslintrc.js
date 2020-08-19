module.exports = {
    plugins: ['mocha'],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
    },
    extends: ['eslint-config-airbnb-typescript', 'eslint-config-prettier'],
    rules: {
        // eslint does not always indent like prettier so disable this one
        '@typescript-eslint/indent': 'off',
        // prettier style for function paren
        '@typescript-eslint/space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        // for now, allow our special /// comments
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        // allow _foo functions and variables for now
        'no-underscore-dangle': 'off',
        // we never use default export
        'import/prefer-default-export': 'off',
        // we definitely need this one off for tests - let's see if we should turn on in lib
        'max-classes-per-file': 'off',

        // this one is purely styllistic - we'll fix later
        'no-nested-ternary': 'off',
        // allow cycles in dependencies for now
        'import/no-cycle': 'off',
        // this rule detects bad imperative style so we should fix the code
        'no-param-reassign': ['error', { props: false }],
        // we can fix this one by reordering declarations inside a file
        '@typescript-eslint/no-use-before-define': 'off',

        // this one needs more debate
        'prefer-destructuring': 'off',

        // rules that airbnb does not set and that we want
        'mocha/no-exclusive-tests': 'error',
    },
    overrides: [
        {
            files: ['test/**/*.ts'],
            rules: {
                // allow dependencies on dev packages for test
                'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
            },
        },
    ],
};
