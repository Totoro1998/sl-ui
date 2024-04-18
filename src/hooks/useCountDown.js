import { ref, unref, watch } from 'vue'
export default function useCountDown(totalTime = 300, generateCodeTime, endCallback) {
  const leaveTime = ref(totalTime)
  let timerId = ref(null)

  const startCountDown = () => {
    const generateCodeTimeValue = unref(generateCodeTime)
    const currentDate = new Date().getTime()
    leaveTime.value -= parseInt((currentDate - parseInt(generateCodeTimeValue)) / 1000)
    timerId.value = setInterval(() => {
      leaveTime.value--
    }, 1000)
  }

  const stopCountDown = () => {
    clearInterval(timerId.value)
    leaveTime.value = totalTime
  }

  watch(
    generateCodeTime,
    (value) => {
      if (value) {
        startCountDown()
      } else {
        stopCountDown()
      }
    },
    {
      immediate: true
    }
  )

  watch(leaveTime, (value) => {
    if (value === 0) {
      stopCountDown()
      endCallback()
    }
  })

  return {
    leaveTime
  }
}
