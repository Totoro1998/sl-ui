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
  config.headers = {
    ...config.headers,
    lang: 'zh_CN',
    'Content-Type': 'application/json;charset=UTF-8'
  }
  const authStore = useAuthStoreWithOut()
  if (authStore.userInfo.access_token) {
    config.headers.Authorization = `${authStore.userInfo.token_type} ${authStore.userInfo.access_token}`
  }
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
const requestPost = instance.post

export { requestGet, requestPost }
