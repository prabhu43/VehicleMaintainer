module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        'plugin:jest/recommended',
    ],
    plugins: ['detox', 'jest', 'react', 'react-native'],
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
        node: true,
        'detox/detox': true,
        'jest/globals': true,
        'react-native/react-native': true,
    },
    rules: {
        'react/prop-types': 'off',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
};
