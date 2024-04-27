function replaceFn(str) {
  return str.replace(/\n/g, '<br />')
}

export default {
  mounted(el, binding) {
    el.innerHTML = replaceFn(binding.value)
  },
  updated(el, binding) {
    el.innerHTML = replaceFn(binding.value)
  }
}
