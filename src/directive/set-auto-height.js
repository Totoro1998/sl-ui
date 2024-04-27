export default {
  mounted(el) {
    // 初次绑定到元素时获取高度
    const height = el.scrollHeight
    el.style.setProperty('--height', `${height}px`)
  },
  updated(el) {
    // 当元素更新时获取新高度
    const height = el.scrollHeight
    el.style.setProperty('--height', `${height}px`)
  }
}
