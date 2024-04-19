import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_FORM_MODEL = {
  first_name: '',
  last_name: '',
  gender: '',
  birthday: '',
  country_or_region: '',
  email: '',
  phone_number: ''
}
export const useRegistrationStore = defineStore('app-registration', () => {
  const formModel = ref(DEFAULT_FORM_MODEL)
  return {
    formModel
  }
})
