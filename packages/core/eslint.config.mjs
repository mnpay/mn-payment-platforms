import js from '@eslint/js'
import globals from 'globals'
// import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'
import typescriptEslintParser from '@typescript-eslint/parser'

// const compat = new FlatCompat();

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['**/dist', '**/@types', '**/.lintstagedrc.mjs', '**/node_modules', '!.lintstagedrc.mjs'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    languageOptions: {
      ecmaVersion: 2020,
      parser: typescriptEslintParser,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        NodeJS: true,
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  eslintConfigPrettier,
]
