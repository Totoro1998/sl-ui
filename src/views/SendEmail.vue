<script setup>
import { useI18n } from '@/hooks/useI18n'
import LocalStorage from '@/lib/storage'
import { STORAGE_KEY, SEND_EMAIL_CODE_TYPE } from '@/lib/const'
import { useRouter } from 'vue-router'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import AppInput from '@/components/widgets/AppInput.vue'
import useValidate from '@/hooks/useValidate'
import { requestPost } from '@/lib/request'
import { REQUEST_URL } from '@/lib/const'
import { ref } from 'vue'

const { t } = useI18n()

const router = useRouter()

const props = defineProps(['type'])

const sendEmailSetting = LocalStorage.getItem(STORAGE_KEY.SEND_EMAIL)

const code = ref('')

const formRules = useValidate(['code'])

const handleRegistration = () => {
  const data = sendEmailSetting.data
  requestPost(REQUEST_URL.ORDER_SUBMIT, { ...data, code: code.value }).then((res) => {
    LocalStorage.removeItem(STORAGE_KEY.SEND_EMAIL)
    router.push({
      name: 'PAYMENT',
      params: {
        id: res.data.orderId
      }
    })
  })
}

const resendEmailCode = () => {
  requestPost(REQUEST_URL.SEND_EMAIL_CODE, {
    email: sendEmailSetting.email,
    type: SEND_EMAIL_CODE_TYPE.AUTH
  })
}

const handleSubmit = () => {
  if (props.type === 'registration') {
    handleRegistration()
  }
}

if (!sendEmailSetting.email) {
  router.back()
}
</script>
<template>
  <BaseContentLayout :title="t('pageTitle')" :subTitle="t('email.sendedEmailTip')">
    <template #headerExtra>{{ sendEmailSetting.email }}</template>
    <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
      <div class="space-y-10">
        <app-input
          v-model="code"
          type="text"
          :label="t('inputFields.verificationCode')"
          :placeholder="t('inputFields.verificationCodePlaceholder')"
          :rules="formRules.code"
        />
        <div
          class="text-[--warning-color] text-sm text-center cursor-pointer"
          role="button"
          @click="resendEmailCode"
        >
          {{ t('email.resendEmailTip') }}
        </div>
        <div class="flex justify-center">
          <van-button round color="#ff6418" size="normal" native-type="submit" style="width: 200px">
            {{ t('register.activeButton') }}
          </van-button>
        </div>
      </div>
    </van-form>
  </BaseContentLayout>
</template>
