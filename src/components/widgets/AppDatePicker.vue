<script setup>
import { ref, watch } from 'vue'
import AppInput from './AppInput.vue'
import AppPopup from './AppPopup.vue'
import dayjs from 'dayjs'

defineProps(['placeholder'])
const model = defineModel({ default: '' })
const showPicker = ref(false)
const currentDate = ref([])
const hanleConfirm = ({ selectedValues }) => {
  showPicker.value = false
  model.value = `${selectedValues[0]}-${selectedValues[1]}-${selectedValues[2]}`
}
watch(
  model,
  (value) => {
    if (!value) {
      currentDate.value = []
      return
    }
    const currentDay = dayjs(value)
    const year = currentDay.year()
    const month = currentDay.month()
    const date = currentDay.date()
    currentDate.value = [year, month, date]
  },
  {
    immediate: true
  }
)
</script>

<template>
  <app-input
    v-model="model"
    readonly
    is-link
    v-bind="$attrs"
    :placeholder="placeholder"
    @click="showPicker = true"
  />
  <app-popup v-model:show="showPicker">
    <van-date-picker
      :min-date="new Date(1900, 0, 1)"
      v-model="currentDate"
      :title="placeholder"
      @confirm="hanleConfirm"
      @cancel="showPicker = false"
    />
  </app-popup>
</template>
