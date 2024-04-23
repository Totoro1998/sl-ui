import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_FORM_MODEL = {
  name: '',
  surname: '',
  gender: '',
  birth: undefined,
  country: '',
  email: '',
  password: ''
}

export const useSignupStore = defineStore('signup', () => {
  const formModel = ref(DEFAULT_FORM_MODEL)
  const resetFormModel = () => {
    formModel.value = DEFAULT_FORM_MODEL
  }
  return { formModel, resetFormModel }
})
