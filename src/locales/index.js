import { createI18n } from 'vue-i18n'
import { Locale } from 'vant'
import { useLocaleStoreWithOut } from '@/store/locale'
import { computed, unref, watch } from 'vue'

let i18n

export const LOCALE = {
  ZH_CN: 'zh_CN',
  EN_US: 'en_US'
}

export const loadedLocalePool = []

export const localeSetting = {
  locale: LOCALE.ZH_CN,
  fallback: LOCALE.ZH_CN,
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US]
}

export function setHtmlPageLang(locale) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function setVantLocale(locale, vantLocale) {
  Locale.use(locale, vantLocale)
}

async function createI18nOptions() {
  const localeStore = useLocaleStoreWithOut()
  let locale = localeStore.locale
  const { fallback, availableLocales } = localeSetting
  const defaultLocal = await import(`./lang/${locale}.js`)
  const message = defaultLocal.default.message ?? {}
  const vantLocale = message.vantLocale ?? {}
  setHtmlPageLang(locale)
  setVantLocale(locale, vantLocale)
  loadedLocalePool.push(locale)
  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message
    },
    availableLocales: availableLocales,
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true
  }
}

async function setupI18n(app) {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}

function setI18nLanguage(locale) {
  const localeStore = useLocaleStoreWithOut()
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  localeStore.setLocale(locale)
  setHtmlPageLang(locale)
}

function useLocale() {
  const localeStore = useLocaleStoreWithOut()
  const locale = computed(() => localeStore.locale)

  async function changeLocale(locale) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
      return locale
    }
    if (loadedLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }
    const langModule = (await import(`./lang/${locale}.js`)).default
    if (!langModule) return

    const { message } = langModule

    globalI18n.setLocaleMessage(locale, message)
    loadedLocalePool.push(locale)
    setI18nLanguage(locale)
    return locale
  }
  watch(locale, (value) => {
    const localeMessage = i18n.global.getLocaleMessage(value)
    setVantLocale(value, localeMessage.vantLocale)
  })
  return {
    locale,
    changeLocale
  }
}

export { setupI18n, i18n, useLocale }
