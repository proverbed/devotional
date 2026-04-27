module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  globals: {
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    vi: 'readonly',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'airbnb',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'functions'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'vitest'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'linebreak-style': 0,
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', 'src/test/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: { alwaysTryTypes: true },
    },
  },
};
