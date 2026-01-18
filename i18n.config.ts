// i18n configuration
// Note: We don't load messages here - they come from Nuxt Content via useTexts()
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'cs',
  messages: {}, // Empty - translations loaded from CMS via Nuxt Content
}))
