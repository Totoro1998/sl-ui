<script setup>
import { useI18n } from '@/hooks/useI18n'
import LocalStorage from '@/lib/storage'
import { STORAGE_KEY } from '@/lib/const'
import { useRouter } from 'vue-router'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import AppInput from '@/components/widgets/AppInput.vue'
import useValidate from '@/hooks/useValidate'

const { t } = useI18n()

const router = useRouter()

const email = LocalStorage.getItem(STORAGE_KEY.REGISTER_EMAIL)

const formRules = useValidate(['code'])

if (!email) {
  router.back()
}
</script>
<template>
  <BaseContentLayout :title="t('pageTitle.activeEmail')" :subTitle="t('common.sendedEmailTip')">
    <template #headerExtra?>{{ email }}</template>
    <van-form validate-trigger="onSubmit" @submit="handleSubmit" label-align="top">
      <app-input
        v-model="code"
        type="text"
        :label="t('inputFields.verificationCode')"
        :placeholder="t('inputFields.verificationCodePlaceholder')"
        :rules="formRules.code"
      />
    </van-form>
  </BaseContentLayout>
</template>
