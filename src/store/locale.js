import { defineStore } from 'pinia'
import { ref } from 'vue'
import { store } from '.'
import { getNormalizedLanguage } from '@/lib/util'

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
