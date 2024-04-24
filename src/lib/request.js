import axios from 'axios'
import { isDevMode } from './env'
import { BASE_API_URL } from './const'
import { useAuthStoreWithOut } from '@/store/auth'

const config = {
  baseURL: isDevMode() ? BASE_API_URL : '/',
  timeout: 60 * 1000
}

const instance = axios.create(config)

function requestBeforeInterceptor(config) {
  return config
}
function requestErrorInterceptor(error) {
  console.log(error)
  return Promise.reject()
}

function responseSuccessInterceptor(response) {
  return response.data
}
function responseErrorInterceptor(error) {
  console.log(error)
  return Promise.reject()
}

instance.interceptors.request.use(requestBeforeInterceptor, requestErrorInterceptor)
instance.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor)

const requestGet = instance.get

function requestPost(url, formData, config = {}) {
  const headers = {
    lang: 'zh_CN',
    'Content-Type': 'application/json;charset=UTF-8',
    ...config.headers
  }
  const authStore = useAuthStoreWithOut()
  const userInfo = authStore.userInfo
  if (userInfo.access_token) {
    headers.Authorization = `${userInfo.token_type} ${userInfo.access_token}`
  }
  return instance.post(url, formData, {
    ...config,
    headers
  })
}

export { requestGet, requestPost }
