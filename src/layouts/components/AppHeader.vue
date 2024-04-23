<script setup>
import HeaderLogo from '@/assets/icons/HeaderLogo.svg'
import { useI18n } from '@/hooks/useI18n'
import { useAuthStore } from '@/store/auth'
import AppLink from '@/components/widgets/AppLink.vue'

const { t } = useI18n()
const { userInfo } = useAuthStore()
</script>

<template>
  <header class="z-[9999] bg-[#303030] fixed top-0 left-0 w-full">
    <div
      class="max-w-[--max-content-width] h-[--header-height] lg:px-[108px] px-6 flex items-center w-full mx-auto"
    >
      <img :src="HeaderLogo" alt="Shaolin" :style="{ height: '40px' }" />
      <template v-if="!userInfo.name">
        <span class="mr-2">{{ t('common.pleaseLoginText') }}</span>
        <app-link to="/login">{{ t('common.loginText') }}</app-link>
      </template>
      <span v-else>
        {{ userInfo.name }}
      </span>
    </div>
  </header>
</template>
