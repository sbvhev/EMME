module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
    'jest/globals': true,
  },
  globals: {
    page: 'readonly',
    JSX: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest'],
  rules: {
    'max-classes-per-file': 0,
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'no-continue': 0,
    'import/extensions': 0,
    'newline-per-chained-call': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 'error',
    'import/prefer-default-export': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'consistent-return': 0, // enable this one
    'linebreak-style': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: 140,
        tabWidth: 2,
      },
    ],
    'no-mixed-operators': 0,
    'operator-linebreak': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        imports: 'always-multiline',
        exports: 'never',
        functions: 'never',
        objects: 'always-multiline',
      },
    ],
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    indent: 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-curly-newline': 0,
    'no-nested-ternary': 0,
    'react/jsx-wrap-multilines': 0,
    'no-await-in-loop': 0,
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': ['error'],
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};