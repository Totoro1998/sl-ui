<script setup>
import { useRouter } from 'vue-router'
import useEntry from './hooks/useEntry'
import { computed } from 'vue'
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import RegistrationForm from '@/components/page/RegistrationForm.vue'
import { useI18n } from '@/hooks/useI18n'
import { ORDER_TYPE } from '@/lib/const'

const props = defineProps(['type'])
const { getEntryByType } = useEntry()
const router = useRouter()
const { t } = useI18n()

const entry = computed(() => getEntryByType(props.type))
if (!entry.value) {
  router.push('/')
}
</script>

<template>
  <BaseContentLayout :title="entry.formTitle">
    <template #subTitle>
      <span class="text-[--warning-color]">{{ t('signUpDetail.slogan') }}</span>
    </template>
    <RegistrationForm :type="ORDER_TYPE.USER" action-type="add"> </RegistrationForm>
  </BaseContentLayout>
</template>

<style lang="less" scoped></style>
