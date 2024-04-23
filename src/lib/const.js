export const CACHE_CIPHER = {
  key: '_11111000001111@',
  iv: '@11111000001111_'
}

export const BASE_URL = import.meta.env.VITE_BASE_URL

export const BASE_API_URL = `${BASE_URL}${import.meta.env.VITE_API_PERFIX}`

export const STORAGE_KEY = {
  REGISTER_EMAIL: 'storage_key_1'
}

export const APP_ROUTE_PATHS = {
  REGISTER: 'register',
  LOGIN: 'login',
  COUNTRY_REGION_LIST: 'country-region-list',
  RESET_PASSWORD: 'reset-password',
  PLAYER_REGISTRATION_FORM: 'player-registration-form',
  COACH_REGISTRATION_FORM: 'coach-registration-form',
  REGISTRATION_LIST: 'registration-list',
  PAYMENT: 'payment',
  SHAOLIN_TECHNIQUES: 'shaolin-techniques',
  ACTIVE_EMAIL: 'active-email'
}

export const GENDER = {
  FEMALE: 'female',
  MALE: 'male'
}

export const REQUEST_URL = {
  TEST: '/test/index',
  LOGIN: '/passport/login',
  LOGIN_BY_EMAIL_CODE: '/passport/loginByEmailCode',
  REGISTER: '/passport/register',
  ACTIVE_EMAIL: '/passport/activeEmail',
  RESET_PWD: '/passport/resetPwd',
  CHECK_EMAIL_CODE: '/passport/checkEmailCode',
  SEND_EMAIL_CODE: '/passport/sendEmailCode',
  LOGOUT: '/passport/logout',
  PROJECT_LIST: '/game/projectList',
  ORDER_SUBMIT: '/game/order/submit',
  ORDER_LIST: '/game/order/list',
  ORDER_DETAIL: '/game/order/detail',
  SUBMIT_PAYINFO: '/game/order/submitPayInfo',
  UPLOAD_IMAGE: '/upload/image'
}
