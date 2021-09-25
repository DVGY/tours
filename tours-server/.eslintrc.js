module.exports = {
  root: true,
  env: {
    node: false,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prefer-const': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-params': 'off',
  },
  overrides: [
    {
      files: ['test/**/*.ts'],
      env: { jest: true, node: true },
    },
  ],
  ignorePatterns: ['.eslintrc.js', 'src/api-docs/**'],
};
