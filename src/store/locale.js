import { defineStore } from 'pinia'
import { ref } from 'vue'
import { store } from '.'

function getNormalizedLanguage() {
  const language = navigator.language || navigator.userLanguage
  if (language && language.indexOf('-') !== -1) {
    const parts = language.split('-')
    return parts[0] + '-' + parts[1].toUpperCase()
  } else {
    return language
  }
}

export const useLocaleStore = defineStore(
  'app-locale',
  () => {
    const locale = ref(getNormalizedLanguage())
    const setLocale = (lang) => {
      locale.value = lang
    }
    return {
      locale,
      setLocale
    }
  },
  {
    persist: true
  }
)

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
