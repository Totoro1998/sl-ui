<script setup>
import { ref } from 'vue'
import AppInput from './AppInput.vue'
import AppPopup from './AppPopup.vue'

defineProps(['columns', 'placeholder'])
const model = defineModel()
const showPicker = ref(false)
const hanleConfirm = ({ selectedOptions }) => {
  showPicker.value = false
  model.value = selectedOptions[0].text
}
</script>

<template>
  <app-input
    is-link
    v-model="model"
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
