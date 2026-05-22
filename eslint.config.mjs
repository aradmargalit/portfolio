import js from '@eslint/js';
import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import unusedImports from 'eslint-plugin-unused-imports';

const config = [
  { ignores: ['.cache/**', '.next/**', 'node_modules/**'] },
  js.configs.recommended,
  ...nextConfig,
  { rules: prettierConfig.rules },
  {
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      'prettier/prettier': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-keys-fix/sort-keys-fix': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];

export default config;
