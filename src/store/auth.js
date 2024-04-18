import { defineStore } from 'pinia'
import { ref } from 'vue'

export const BUTTON_TYPE = {
  LOGIN: 'login',
  NEXT_STEP: 'next_step',
  VERTIFY: 'vertify'
}

export const RESET_PASSWORD_TYPE = {
  NEXT_STEP: 'next_step',
  VERTIFY: 'vertify',
  RESET: 'reset'
}

export const useAuthStore = defineStore(
  'app-auth',
  () => {
    const resetPasswordSetting = ref({
      buttonType: BUTTON_TYPE.NEXT_STEP,
      email: '',
      passowrd: '',
      code: '',
      generateCodeTime: ''
    })

    return {
      resetPasswordSetting
    }
  },
  {
    persist: true
  }
)
