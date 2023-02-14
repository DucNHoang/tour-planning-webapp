module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:security/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:vue/recommended',
    'prettier',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.eslint.json',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['eslint-plugin-security', '@typescript-eslint'],
  rules: {
    // disable semicolon
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    // Disable semicolon on Interface and Type definitions
    '@typescript-eslint/member-delimiter-style': 'off',
    // Allow use of 'any'
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
    // Allow explicit type declarations
    '@typescript-eslint/no-inferrable-types': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
