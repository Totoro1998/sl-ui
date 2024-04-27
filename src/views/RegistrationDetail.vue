<script setup>
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import RegistrationForm from '@/components/page/RegistrationForm.vue'
import { useI18n } from '@/hooks/useI18n'
import { REGISTRATION_STATUS } from '@/hooks/useRegistration'

import { ORDER_TYPE, REQUEST_URL } from '@/lib/const'
import { requestGet } from '@/lib/request'
import { ref, computed } from 'vue'

const props = defineProps(['id'])
const detail = ref({})
const { t } = useI18n()
const isEdit = ref(false)
const RegistrationFormRef = ref(null)

const title = computed(() => {
  const detailValue = detail.value
  if (!detailValue.role) {
    return ''
  }
  if (detailValue.role.value === ORDER_TYPE.USER) {
    return t('registrationForm.playerTitle')
  } else {
    return t('registrationForm.coachTitle')
  }
})

requestGet(`${REQUEST_URL.ORDER_DETAIL}?orderNo=${props.id}`).then((res) => {
  detail.value = res.data
})

const handleReset = () => {
  RegistrationFormRef.value.handleSetValueFromInit(detail.value)
  isEdit.value = false
}

const handleSave = () => {
  RegistrationFormRef.value.handleSubmit()
  isEdit.value = false
}
</script>
<template>
  <BaseContentLayout :title="title">
    <template
      #actionHeader
      v-if="detail.status && [REGISTRATION_STATUS.WAIT_SUBMIT].includes(detail.status.value)"
    >
      <div class="flex justify-end cursor-pointer">
        <span v-if="!isEdit" @click="isEdit = true" class="text-[--blue-primay-color]">{{
          t('registrationForm.edit')
        }}</span>
        <span v-else class="flex gap-x-4">
          <span @click="handleReset">{{ t('registrationForm.cancel') }}</span>
          <span @click="handleSave" class="text-[--blue-primay-color]">{{
            t('registrationForm.save')
          }}</span>
        </span>
      </div>
    </template>
    <template #subTitle>
      <span class="text-[--warning-color]">{{ t('signUpDetail.slogan') }}</span>
    </template>
    <RegistrationForm ref="RegistrationFormRef" :is-edit="isEdit" :init-data="detail">
      <template
        #actionButton
        v-if="detail.status && detail.status.value === REGISTRATION_STATUS.SUCCESS"
      >
        <div class="w-full justify-center flex">
          <van-button round color="#ff6418" size="normal" native-type="submit" style="width: 200px">
            {{ t('participantRegistrationDetail.downloadConfirmationLetter') }}
          </van-button>
        </div>
      </template>
    </RegistrationForm>
  </BaseContentLayout>
</template>
