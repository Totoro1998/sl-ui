<script setup>
import { useI18n } from '@/hooks/useI18n'
import useRegistration from '@/hooks/useRegistration'
import { computed } from 'vue'
import { GENDER } from '@/lib/const'
import FemaleIcon from '@/assets/icons/female.svg'
import MaleIcon from '@/assets/icons/male.svg'
import { useRouter } from 'vue-router'
import { APP_ROUTE_PATHS } from '@/lib/const'

const props = defineProps(['item'])
const { t } = useI18n()
const { getStatusSetting } = useRegistration()
const router = useRouter()
const isMale = computed(() => props.item.gender === GENDER.MALE)
const projects = computed(() => [
  ...props.item.projectInfo.map((item) => item.name),
  ...props.item.custom_project
])
const statusSetting = computed(() => {
  return getStatusSetting(props.item.status.value)
})
</script>
<template>
  <div
    class="rounded-2xl shadow-xl cursor-pointer border-b-2 flex flex-col w-full bg-white"
    :style="{
      borderColor: statusSetting.color
    }"
    @click="router.push(`${APP_ROUTE_PATHS.REGISTRATION_DETAIL}/${item.order_no}`)"
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
        <span class="font-semibold">{{ item.status.name }}</span>
      </span>
    </div>
    <div class="content flex-1 flex flex-col gap-y-4 px-4 py-3">
      <div class="flex flex-1 gap-x-4">
        <div class="relative h-[80px]">
          <van-image width="80" height="80" round fit="cover" :src="item.headimg.url" />
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
            <p class="text-[--primary-second-color] text-sm">
              {{ item.organize_info.organize_name }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="project in projects"
              :key="project"
              class="text-[--warning-color] rounded-full px-2 py-1 text-[12px] font-medium bg-[--waring-light-color]"
            >
              {{ project }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-end font-semibold text-2xl">
        {{ `${t('registrationForm.grandTotal')}$${item.amount}` }}
      </div>
    </div>
  </div>
</template>
