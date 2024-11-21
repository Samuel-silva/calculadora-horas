import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  {
    plugins: {
      'react-hooks': reactHooks
    }
  },
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 11,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  eslint.configs.recommended,
  pluginReactConfig,
  ...tseslint.configs.recommended,
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
]
