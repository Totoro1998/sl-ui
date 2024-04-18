import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const LOGIN_TYPE = {
  BY_PASSWORD: 'by_password',
  BY_CODE: 'by_code'
}

export const LOGIN_BUTTON_TYPE = {
  LOGIN: 'login',
  NEXT_STEP: 'next_step',
  VERTIFY: 'vertify'
}

export const RESET_PASSWORD_BUTTON_TYPE = {
  NEXT_STEP: 'next_step',
  VERTIFY: 'vertify',
  RESET: 'reset'
}

export const useAuthStore = defineStore(
  'app-auth',
  () => {
    const resetPasswordSetting = ref({
      buttonType: RESET_PASSWORD_BUTTON_TYPE.NEXT_STEP,
      email: '',
      passowrd: '',
      code: '',
      generateCodeTime: ''
    })
    const loginSetting = ref({
      loginType: LOGIN_TYPE.BY_PASSWORD,
      buttonType: LOGIN_BUTTON_TYPE.LOGIN,
      generateCodeTime: '',
      email: '',
      password: '',
      code: '',
      isNeedRemember: false
    })
    const isLoginByPassword = computed(
      () => loginSetting.value.loginType === LOGIN_TYPE.BY_PASSWORD
    )
    return {
      resetPasswordSetting,
      loginSetting,
      isLoginByPassword
    }
  },
  {
    persist: true
  }
)
