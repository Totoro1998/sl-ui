<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from '@/hooks/useI18n'
import { ORDER_TYPE, REQUEST_URL } from '@/lib/const'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import RegistrationCard from '@/components/page/RegistrationCard.vue'
import { requestGet } from '@/lib/request'

const { t } = useI18n()
const list = ref([])
const tab = ref(ORDER_TYPE.USER)
const isUserTab = computed(() => tab.value === ORDER_TYPE.USER)

const tabList = computed(() => {
  return [
    {
      text: t('registrationList.personal'),
      value: ORDER_TYPE.USER
    },
    {
      text: t('registrationList.organize'),
      value: ORDER_TYPE.ORGANIZE
    }
  ]
})

const getRegistrationList = () => {
  requestGet(`${REQUEST_URL.ORDER_LIST}?type=${tab.value}`).then((res) => {
    list.value = res.data.data
    console.log(list.value)
  })
}
watch(tab, getRegistrationList)

getRegistrationList()
</script>

<template>
  <BaseContentLayout :title="t('signUpDetail.title')" class="lg:w-full">
    <template #subTitle>
      <span class="text-[--warning-color]">{{ t('signUpDetail.slogan') }}</span>
    </template>
    <div
      class="tab grid grid-cols-2 rounded-lg bg-[--tab-not-active-bg-color] mx-auto w-full max-w-[556px] p-[2px] mb-8"
    >
      <div
        v-for="tabItem in tabList"
        :key="tabItem.value"
        @click="tab = tabItem.value"
        :class="{
          'font-medium rounded-lg cursor-pointer h-[40px] flex items-center justify-center text-center': true,
          'bg-white': tab === tabItem.value
        }"
      >
        {{ tabItem.text }}
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <RegistrationCard v-for="item in list" :key="item.order_no" :item="item" />
    </div>
  </BaseContentLayout>
</template>
