<script setup>
import { ref } from 'vue'
import AppPopup from './AppPopup.vue'
import countryList from '@/lib/countries'
import { computed } from 'vue'

const model = defineModel()
const country = defineModel('country', { type: String, default: 'CHN' })

const columns = countryList.filter((country) => country.calling_code)

const currentCountry = computed(() => {
  const findColumn = columns.find((column) => column.value === country.value)
  if (findColumn) {
    return findColumn
  }
  return {
    value: '',
    calling_code: '',
    text: '',
    alpha2: '',
    alpha3: ''
  }
})

defineProps(['placeholder'])

const showPicker = ref(false)

const hanleConfirm = ({ selectedOptions }) => {
  country.value = selectedOptions[0].value
  showPicker.value = false
}
</script>

<template>
  <div>
    <van-field
      class="app-input app-tel-input"
      v-model="model"
      v-bind="{ ...props, ...$attrs }"
      :border="false"
    >
      <template #button>
        <button class="flex gap-x-2 items-center" @click="showPicker = true">
          <span :class="`fi fi-${currentCountry.alpha2.toLowerCase()}`"></span>
          <span>{{ `+(${currentCountry.calling_code})` }}</span>
          <span :class="{ 'rotate-180 duration-150': showPicker }">
            <van-icon name="arrow-down" />
          </span>
        </button>
      </template>
    </van-field>
    <app-popup v-model:show="showPicker">
      <van-picker
        :columns="columns"
        :title="placeholder"
        @cancel="showPicker = false"
        @confirm="hanleConfirm"
      >
        <template #option="option">
          <span class="flex gap-x-2 items-center">
            <span :class="`fi fi-${option.alpha2.toLowerCase()}`"></span>
            <span>{{ `+(${option.calling_code})` }}</span>
          </span>
        </template>
      </van-picker>
    </app-popup>
  </div>
</template>

<style lang="less">
.app-tel-input {
  .van-field__body {
    flex-direction: row-reverse;
    .van-field__button {
      padding-left: 0;
      padding-right: 4px;
    }
  }
}
</style>
