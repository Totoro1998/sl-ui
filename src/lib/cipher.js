import { decrypt as aesDecrypt, encrypt as aesEncrypt } from 'crypto-js/aes'
import UTF8, { parse } from 'crypto-js/enc-utf8'
import pkcs7 from 'crypto-js/pad-pkcs7'
import CTR from 'crypto-js/mode-ctr'

function AesEncryption({ key, iv }) {
  const _key = parse(key)
  const _iv = parse(iv)

  function getOptions() {
    return {
      mode: CTR,
      padding: pkcs7,
      iv: _iv
    }
  }

  function encrypt(plainText) {
    return aesEncrypt(plainText, _key, getOptions()).toString()
  }

  function decrypt(cipherText) {
    return aesDecrypt(cipherText, _key, getOptions()).toString(UTF8)
  }

  return {
    encrypt,
    decrypt
  }
}

export { AesEncryption }
