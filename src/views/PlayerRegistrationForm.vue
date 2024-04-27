<script setup>
import { useI18n } from '@/hooks/useI18n'

import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import RegistrationForm from '@/components/page/RegistrationForm.vue'
import { ORDER_TYPE } from '@/lib/const'

const { t } = useI18n()
</script>
<template>
  <BaseContentLayout :title="t('registrationForm.playerTitle')">
    <template #subTitle>
      <span class="text-[--warning-color]">{{ t('signUpDetail.slogan') }}</span>
    </template>
    <RegistrationForm :type="ORDER_TYPE.USER" action-type="add"> </RegistrationForm>
  </BaseContentLayout>
</template>
