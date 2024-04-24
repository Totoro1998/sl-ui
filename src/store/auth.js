import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { store } from '.'

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

const DEFAULT_RESET_PASSWORD_SETTING = {
  buttonType: RESET_PASSWORD_BUTTON_TYPE.NEXT_STEP,
  generateCodeTime: ''
}

const DEFAULT_LOGIN_SETTING = {
  loginType: LOGIN_TYPE.BY_PASSWORD,
  buttonType: LOGIN_BUTTON_TYPE.LOGIN,
  generateCodeTime: '',
  password: '',
  isNeedRemember: false
}

export const DEFAULT_USER_INFO = {
  email: '',
  access_token: '',
  expires_in: '',
  refresh_token: '',
  token_type: ''
}

export const useAuthStore = defineStore(
  'app-auth',
  () => {
    const authEmail = ref('')
    const userInfo = ref({ ...DEFAULT_USER_INFO })
    const resetPasswordSetting = ref({ ...DEFAULT_RESET_PASSWORD_SETTING })
    const loginSetting = ref({ ...DEFAULT_LOGIN_SETTING })
    const isLoginByPassword = computed(
      () => loginSetting.value.loginType === LOGIN_TYPE.BY_PASSWORD
    )

    const resetResetPasswordSetting = () => {
      resetPasswordSetting.value = DEFAULT_RESET_PASSWORD_SETTING
    }
    const setUserInfo = (value) => {
      userInfo.value = {
        ...userInfo.value,
        ...value
      }
    }
    const resetLoginSetting = () => {
      loginSetting.value = DEFAULT_LOGIN_SETTING
    }
    return {
      userInfo,
      resetPasswordSetting,
      authEmail,
      loginSetting,
      isLoginByPassword,
      resetResetPasswordSetting,
      resetLoginSetting,
      setUserInfo
    }
  },
  {
    persist: true
  }
)

// Need to be used outside the setup
export function useAuthStoreWithOut() {
  return useAuthStore(store)
}
