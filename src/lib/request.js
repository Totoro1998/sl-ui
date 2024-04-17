import axios from 'axios'
import { isDevMode } from './env'
import { BASE_API_URL } from './const'

const config = {
  baseURL: isDevMode() ? BASE_API_URL : '/',
  timeout: 60 * 1000,
  withCredentials: true
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
  return response
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
