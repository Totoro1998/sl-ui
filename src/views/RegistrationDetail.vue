<script setup>
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import RegistrationForm from '@/components/page/RegistrationForm.vue'
import { useI18n } from '@/hooks/useI18n'

import { ORDER_TYPE, REQUEST_URL } from '@/lib/const'
import { requestGet } from '@/lib/request'
import { ref, computed } from 'vue'

const props = defineProps(['id'])
const detail = ref(null)
const { t } = useI18n()
requestGet(`${REQUEST_URL.ORDER_DETAIL}?orderNo=${props.id}`).then((res) => {
  detail.value = res.data
})
const title = computed(() => {
  const detailValue = detail.value
  if (detailValue) {
    if (detailValue.role.value === ORDER_TYPE.USER) {
      return t('registrationForm.playerTitle')
    } else {
      return t('registrationForm.coachTitle')
    }
  }
  return ''
})
</script>
<template>
  <BaseContentLayout :title="title">
    <template #subTitle>
      <span class="text-[--warning-color]">{{ t('signUpDetail.slogan') }}</span>
    </template>
    <RegistrationForm :init-data="detail" actionType="fuck" />
  </BaseContentLayout>
</template>
