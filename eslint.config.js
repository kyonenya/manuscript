const { defineConfig } = require('eslint/config');
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
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
  },
]);
