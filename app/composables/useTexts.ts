export const useTexts = () => {
  // Get current locale from i18n
  const { locale } = useI18n()

  // Map locale to collection name
  const collectionMap: Record<string, 'localesCs' | 'localesEn' | 'localesDe'> = {
    cs: 'localesCs',
    en: 'localesEn',
    de: 'localesDe',
  }

  const collectionName = computed(() => collectionMap[locale.value] || 'localesCs')

  return useAsyncData(
    () => `site-texts-${locale.value}`,
    async () => queryCollection(collectionName.value).first()
  )
}
