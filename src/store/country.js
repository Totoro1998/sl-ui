import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountryStore = defineStore('app-country', () => {
  const country = ref({
    alpha3: '',
    en: ''
  })
  const setCountry = (value) => {
    country.value = value
  }
  return {
    country,
    setCountry
  }
})
