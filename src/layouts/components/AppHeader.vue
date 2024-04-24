<script setup>
import HeaderLogo from '@/assets/icons/HeaderLogo.svg'
import { useI18n } from '@/hooks/useI18n'
import { useAuthStore, DEFAULT_USER_INFO } from '@/store/auth'
import AppLink from '@/components/widgets/AppLink.vue'
import { requestPost } from '@/lib/request'
import { REQUEST_URL } from '@/lib/const'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const store = useAuthStore()
const { userInfo } = storeToRefs(store)

const handleLogout = () => {
  requestPost(REQUEST_URL.LOGOUT).then(() => {
    store.setUserInfo(DEFAULT_USER_INFO)
  })
}
</script>

<template>
  <header class="z-[9999] bg-[#303030] fixed top-0 left-0 w-full">
    <div
      class="max-w-[--max-content-width] h-[--header-height] lg:px-[108px] px-6 flex items-center w-full mx-auto"
    >
      <img :src="HeaderLogo" alt="Shaolin" :style="{ height: '40px' }" />
      <span class="flex gap-x-2 ml-2 lg:ml-6">
        <template v-if="!userInfo.email">
          <span class="text-white">{{ t('common.pleaseLoginText') }}</span>
          <app-link to="/login" style="color: var(--blue-primay-color)">{{
            t('common.loginText')
          }}</app-link>
        </template>
        <template v-else>
          <span class="text-white ml-2 lg:ml-6">
            {{ userInfo.email }}
          </span>
          <span role="button" @click="handleLogout" class="text-[--blue-primay-color]">{{
            t('login.logout')
          }}</span>
        </template>
      </span>
    </div>
  </header>
</template>
