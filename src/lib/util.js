import { isEmpty, isNil } from 'lodash-es'

export function copyToClipboard(text, callback) {
  try {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        callback && callback()
      })
      .catch(function (err) {
        console.error('use navigator.clipboard.writeText error: ' + err)
      })
  } catch (error) {
    let textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      callback && callback()
    } catch (err) {
      console.error('copy error:', err)
    }
    document.body.removeChild(textArea)
  }
}

export function splitPhoneNumber(input) {
  const regex = /^(\+\d{1,3})\s*(\d+)$/
  const match = input.match(regex)
  if (match) {
    return [match[1], match[2]]
  } else {
    return null
  }
}

export function isEmptyData(data) {
  if (typeof data === 'undefined') {
    return true
  }
  if (isNil(data) || data === '') {
    return true
  } else if (typeof data === 'number' && isNaN(data)) {
    return true
  } else if (typeof data === 'object') {
    return isEmpty(data)
  } else {
    return false
  }
}
