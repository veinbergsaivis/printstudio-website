import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
// opcija Tailwind pluginam
// import tailwind from 'eslint-plugin-tailwindcss'

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '.vite', 'coverage'],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // tailwind.configs['flat/recommended'], // ja gribi Tailwind lint
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // 'tailwindcss': tailwind,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Stilistikas piemēri
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  }
)
