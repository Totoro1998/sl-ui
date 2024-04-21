<script setup>
import { useI18n } from '@/hooks/useI18n'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import RegistrationCard from '@/components/page/RegistrationCard.vue'
import { ref } from 'vue'

const { t } = useI18n()
const list = ref([])

const getRegistrationList = () => {
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

getRegistrationList()
</script>

<template>
  <BaseContentLayout :title="t('signUpDetail.title')" class="max-w-full">
    <template #subTitle>
      <span class="text-[--warning-color]">{{ t('signUpDetail.slogan') }}</span>
    </template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <RegistrationCard v-for="item in list" :key="item.id" :item="item" />
    </div>
  </BaseContentLayout>
</template>
