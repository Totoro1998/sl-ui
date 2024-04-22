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
