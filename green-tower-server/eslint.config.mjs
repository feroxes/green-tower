// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
      'max-len': ['error', { code: 120 }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Group 1: Node modules and side-effect imports.
            ['^\\u0000', '^@?\\w'],
            // Group 2: Imports containing ".guard"
            ['\\.guard'],
            ['\\.decorator'],
            // Group 3: Imports containing ".strategy"
            ['\\.strategy'],
            // Group 4: Imports containing ".entity"
            ['\\.entity'],
            // Group 5: Imports containing ".module"
            ['\\.module'],
            // Group 6: Imports containing ".controller"
            ['\\.controller'],
            // Group 7: Imports containing ".service"
            ['\\.service'],
            // Group 8: Imports containing ".component"
            ['\\.component'],
            // Group 9: Imports containing ".dto"
            ['\\.dto'],
            // Group 10: Imports containing ".errors"
            ['\\.errors'],
            // Group 11: Imports containing ".types"
            ['\\.types'],
            // Group 12: Everything else.
            ['^'],
          ],
        },
      ],
    },
  },
);
