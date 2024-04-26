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
    console.log(res)
  })
  list.value = [
    {
      status: 'passed',
      gender: 'female',
      total: 50,
      name: 'Shen Dan',
      id: 1,
      school: '少林友谊功夫学校',
      projects: [
        {
          id: 1,
          name: '教练/馆校长发展研讨会'
        }
      ]
    },
    {
      status: 'not_pass',
      gender: 'male',
      total: 50,
      name: 'Shen Dan',
      id: 2,
      school: '少林友谊功夫学校',
      projects: [
        {
          id: 1,
          name: '一招功'
        },
        {
          id: 2,
          name: '罗汉拳'
        },
        {
          id: 3,
          name: '一路路梅花单刀'
        }
      ]
    },
    {
      status: 'pending',
      gender: 'male',
      total: 50,
      name: 'Shen Dan',
      id: 3,
      school: '少林友谊功夫学校',
      projects: [
        {
          id: 1,
          name: '一招功'
        },
        {
          id: 2,
          name: '罗汉拳'
        },
        {
          id: 3,
          name: '一路路梅花单刀'
        }
      ]
    }
  ]
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
      <RegistrationCard v-for="item in list" :key="item.id" :item="item" />
    </div>
  </BaseContentLayout>
</template>
