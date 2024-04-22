<script setup>
import { useI18n } from '@/hooks/useI18n'
import { ref } from 'vue'

const payAmount = ref(50)
const { t } = useI18n()
</script>
<template>
  <div class="w-full mx-auto max-w-[564px] pt-12 pb-8 px-6">
    <div class="flex flex-col gap-y-4 items-center justify-center">
      <span class="flex flex-col gap-y-2 items-center justify-center">
        <van-icon name="more" size="96" color="rgb(40, 120, 255)" />
        <span class="text-[--blue-primay-color] text-[12px] font-medium">
          {{ t('payment.toBePaid') }}
        </span>
        <span class="text-2xl font-semibold"> {{ `$${payAmount}` }} </span>
      </span>
      <span class="font-semibold">{{ t('payment.tip') }}</span>
    </div>
  </div>
</template>
