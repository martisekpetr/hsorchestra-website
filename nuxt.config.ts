// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // Recommended for SEO (pre-renders content)
  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxt/eslint'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  // i18n configuration matching Decap CMS setup
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'de', language: 'de-DE', name: 'Deutsch' },
      { code: 'fr', language: 'fr-FR', name: 'Français' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default', // URLs: /en/page, /de/page, /page (for default)
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
