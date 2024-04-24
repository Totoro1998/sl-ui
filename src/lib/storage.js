import { AesEncryption } from './cipher'
import { CACHE_CIPHER } from './const'
import { getCommonStoragePrefix, isDevMode } from './env'

function createStorage({
  type = 'localStorage',
  hasEncrypt = !isDevMode(),
  cacheCipher = CACHE_CIPHER,
  storagePrefix = getCommonStoragePrefix()
}) {
  const { encrypt, decrypt } = AesEncryption(cacheCipher)
  return {
    setItem(key, value, expire = 2) {
      const data = {
        value,
        expire: expire ? Date.now() + expire * 1000 * 60 * 60 : 0
      }
      const stringifiedData = JSON.stringify(data)
      const encryptedData = hasEncrypt ? encrypt(stringifiedData) : stringifiedData
      window[type].setItem(`${storagePrefix}${key}`, encryptedData)
    },
    getItem(key) {
      const encryptedData = window[type].getItem(`${storagePrefix}${key}`)
      if (!encryptedData) {
        return null
      }
      const data = JSON.parse(hasEncrypt ? decrypt(encryptedData) : encryptedData)
      if (data.expire && data.expire < Date.now()) {
        window[type].removeItem(`${storagePrefix}${key}`)
        return null
      }
      return data.value
    },
    removeItem(key) {
      window[type].removeItem(`${storagePrefix}${key}`)
    }
  }
}

const LocalStorage = createStorage({})

export default LocalStorage
export { createStorage }
