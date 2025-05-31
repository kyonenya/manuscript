import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends(
      'plugin:@typescript-eslint/recommended',
      'next/core-web-vitals',
      'prettier',
    ),
    rules: {
      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
    ignores: ['**/*.js', '**/*.mjs'],
  },
]);
