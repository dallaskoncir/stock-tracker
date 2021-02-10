module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react'],
    settings: {
        react: {
            version: 'detect' // Automatically detect the react version
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
    ],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton']
            }
        ]
    }
};
