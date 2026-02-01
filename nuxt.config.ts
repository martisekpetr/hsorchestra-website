// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // Enable SSR for static site generation

  // Set base URL for GitHub Pages
  app: {
    baseURL: '/', // Your repo name
  },

  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxt/eslint', '@vesp/nuxt-fontawesome'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  // i18n configuration - using for routing only
  // Translations are loaded via Nuxt Content (CMS-editable) using useTexts() composable
  i18n: {
    locales: [
      { code: 'cs', language: 'cs-CZ', name: 'Čeština', switcherLabel: 'CZ' },
      { code: 'en', language: 'en-US', name: 'English', switcherLabel: 'EN' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', switcherLabel: 'DE' },
    ],
    defaultLocale: 'cs',
    strategy: 'prefix_except_default', // URLs: /en/page, /de/page, /page (for default cs)
    detectBrowserLanguage: false,
    // Don't use i18n's message loading - we load from Nuxt Content instead
    vueI18n: './i18n.config.ts',
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  fontawesome: {
    icons: {
      solid: ['calendar', 'paperclip', 'ticket-alt', 'map-marker-alt'],
      brands: ['facebook'],
    },
  },
})
