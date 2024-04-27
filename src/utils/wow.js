import WOW from 'wow.js'

export function setupWow() {
  const wow = new WOW({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: '#app-wrapper-id', // optional scroll container selector, otherwise use window,
    resetAnimation: true // reset animation on end (default is true)
  })
  wow.init()
}
