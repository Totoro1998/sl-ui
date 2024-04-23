import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_FORM_MODEL = {
  first_name: '',
  last_name: '',
  gender: '',
  birth: '',
  country_or_region: '',
  email: '',
  phone_number: '',
  company_name: '',
  contact_person_name: '',
  company_address: '',
  contact_type: '',
  projects: [
    {
      id: '1001',
      type: '小洪拳',
      name: '少林拳'
    },
    {
      id: '1002',
      type: '二路小洪拳',
      name: '少林段品制套路'
    },
    {
      uuid: 'testtest',
      type: '二路小洪拳',
      name: '少林段品制套路'
    }
  ]
}
export const useRegistrationStore = defineStore('app-registration', () => {
  const formModel = ref(DEFAULT_FORM_MODEL)
  return {
    formModel
  }
})
