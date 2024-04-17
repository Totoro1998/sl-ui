import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const LOGIN_TYPE = {
  BY_PASSWORD: 'by_password',
  BY_CODE: 'by_code'
}
export const BUTTON_TYPE = {
  LOGIN: 'login',
  NEXT_STEP: 'next_step',
  VERTIFY: 'vertify'
}

export const useLoginStore = defineStore(
  'app-login',
  () => {
    const loginType = ref(LOGIN_TYPE.BY_PASSWORD)
    const buttonType = ref(BUTTON_TYPE.LOGIN)
    const generateCodeTime = ref('')
    const formModel = ref({
      email: '',
      password: '',
      code: ''
    })
    const isByPassword = computed(() => loginType.value === LOGIN_TYPE.BY_PASSWORD)

    return {
      loginType,
      buttonType,
      formModel,
      isByPassword,
      generateCodeTime
    }
  },
  {
    persist: true
  }
)
