<script setup>
import { useI18n } from '@/hooks/useI18n'
import useRegistration from '@/hooks/useRegistration'
import { computed } from 'vue'
import { GENDER } from '@/lib/const'
import FemaleIcon from '@/assets/icons/female.svg'
import MaleIcon from '@/assets/icons/male.svg'

const props = defineProps(['item'])
const { t } = useI18n()
const { getStatusSetting } = useRegistration()
const isMale = computed(() => props.item.gender === GENDER.MALE)
const statusSetting = computed(() => {
  return getStatusSetting(props.item.status)
})
</script>
<template>
  <div
    class="rounded-2xl shadow-xl cursor-pointer border-b-2 flex flex-col w-full bg-white"
    :style="{
      borderColor: statusSetting.color
    }"
  >
    <div class="border-b px-4 py-3 flex justify-between">
      <span class="flex gap-x-2 items-center text-sm">
        {{ t('signUpDetail.slogan') }}
        <van-icon size="16" name="arrow" />
      </span>
      <span
        class="gap-x-2 flex items-center"
        :style="{
          color: statusSetting.color
        }"
      >
        <van-icon size="16" :name="statusSetting.icon" :color="statusSetting.color" />
        <span class="font-semibold">{{ statusSetting.text }}</span>
      </span>
    </div>
    <div class="content flex-1 flex flex-col gap-y-4 px-4 py-3">
      <div class="flex flex-1 gap-x-4">
        <div class="relative h-[80px]">
          <van-image
            width="80"
            height="80"
            round
            fit="cover"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <div
            class="absolute px-3 py-1 flex items-center justify-end bottom-1 -left-1 rounded-md rounded-tr-2xl text-white"
            :style="{
              backgroundColor: isMale ? 'var(--success-color)' : 'var(--warning-color)'
            }"
          >
            <van-image :src="isMale ? MaleIcon : FemaleIcon" />
          </div>
        </div>
        <div class="flex gap-y-4 flex-col">
          <div class="flex flex-col gap-y-2">
            <p class="text-xl">
              {{ item.name }}
            </p>
            <p class="text-[--primary-second-color] text-sm">{{ item.school }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="project in item.projects"
              :key="project.id"
              class="text-[--warning-color] rounded-full px-2 py-1 text-[12px] font-medium bg-[--waring-light-color]"
            >
              {{ project.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-end font-semibold text-2xl">
        {{ `${t('registrationForm.grandTotal')}$${item.total}` }}
      </div>
    </div>
  </div>
</template>
