export const CACHE_CIPHER = {
  key: '_11111000001111@',
  iv: '@11111000001111_'
}

export const BASE_URL = import.meta.env.VITE_BASE_URL

export const BASE_API_URL = `${BASE_URL}${import.meta.env.VITE_API_PERFIX}`

export const STORAGE_KEY = {}

export const APP_ROUTE_PATHS = {
  REGISTER: 'register',
  LOGIN: 'login',
  COUNTRY_REGION_LIST: 'country-region-list',
  RESET_PASSWORD: 'reset-password',
  PLAYER_REGISTRATION_FORM: 'player-registration-form',
  COACH_REGISTRATION_FORM: 'coach-registration-form'
}
