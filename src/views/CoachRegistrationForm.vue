<script setup>
import BaseContentLayout from '@/components/page/BaseContentLayout.vue'
import RegistrationForm from '@/components/page/RegistrationForm.vue'
import { ORDER_TYPE } from '@/lib/const'
</script>
<template>
  <BaseContentLayout>
    <RegistrationForm :type="ORDER_TYPE.ORGANIZE" action-type="add" />
  </BaseContentLayout>
</template>
