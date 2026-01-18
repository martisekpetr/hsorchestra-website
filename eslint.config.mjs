// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'

export default withNuxt(
  eslintPluginPrettier,
  {
    rules: {
      // Vue/Nuxt specific rules
      'vue/multi-word-component-names': 'off', // Allow single-word component names
      'vue/no-multiple-template-root': 'off', // Vue 3 supports multiple root elements

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',

      // General best practices
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      // Prettier integration
      'prettier/prettier': 'error',
    },
  }
)
