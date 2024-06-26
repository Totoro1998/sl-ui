import { defineStore } from 'pinia'
import { ref } from 'vue'

export const DEFAULT_FORM_MODEL = {
  headimg: '',
  order_no: '',
  name: '',
  surname: '',
  gender: '',
  birth: '',
  country: '',
  code: '',
  address: '',
  email: '',
  mobile: '',
  role: '',
  organize_name: '',
  organize_head: '',
  organize_address: '',
  organize_contact: '',
  custom_project: [],
  project_id: [],
  fileList: [],
  entourage_num: 0
}
export const useRegistrationStore = defineStore('app-registration', () => {
  const formModel = ref({ ...DEFAULT_FORM_MODEL })
  const isEdit = ref(false)
  return {
    isEdit,
    formModel
  }
})
