module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'import', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'max-len': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // 1. node_modules and side effects
          ['^\\u0000', '^@?\\w'],
          // 2. types (ending with .types)
          ['^.+\\.types$'],
          // 3. styled components (ending with .styles)
          ['^.+\\.styles$'],
          // 4. components
          ['^@/components', '^.+/components'],
          // 5. hooks
          ['^@/hooks', '^.+/hooks'],
          // 6. everything else
          ['^'],
        ],
      },
    ],
    'import/newline-after-import': ['warn', { count: 1 }],
  },
};
