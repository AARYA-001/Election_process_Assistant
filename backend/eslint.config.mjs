import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Allow unused variables if they start with an underscore (e.g. _req, _res)
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Warn on explicit any, but don't fail the build
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    // Specify the files to lint
    files: ['src/**/*.ts'],
  }
);
