<script setup>
import { ref, computed } from 'vue'
import AppInput from './AppInput.vue'
import AppPopup from './AppPopup.vue'

const props = defineProps(['columns', 'placeholder'])
const model = defineModel()
const showPicker = ref(false)
const hanleConfirm = ({ selectedOptions }) => {
  showPicker.value = false
  model.value = selectedOptions[0].value
}
const inputText = computed(() => {
  const modelValue = model.value
  if (!modelValue) {
    return ''
  }
  const findColumn = props.columns.find((column) => column.value === modelValue)
  if (!findColumn) {
    return ''
  }
  return findColumn.text
})
</script>

<template>
  <app-input
    is-link
    :modelValue="inputText"
    v-bind="$attrs"
    readonly
    :placeholder="placeholder"
    @click="showPicker = true"
  />
  <app-popup v-model:show="showPicker">
    <van-picker
      :columns="columns"
      :title="placeholder"
      @cancel="showPicker = false"
      @confirm="hanleConfirm"
    />
  </app-popup>
</template>
