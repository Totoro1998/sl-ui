<script setup>
import AppHeader from './components/AppHeader.vue'
import AppContent from './components/AppContent.vue'
import AppFooter from './components/AppFooter.vue'
import { useCommonStore } from '@/store/common'
import { setupWow } from '@/utils/wow'
import { onMounted } from 'vue'

const { setCommonStore } = useCommonStore()
setCommonStore()

onMounted(() => {
  setupWow()
})
</script>

<template>
  <div id="app-wrapper-id" class="flex flex-col min-h-screen relative">
    <AppHeader />
    <div class="pt-[--header-height] bg-[#f2f2f7]">
      <AppContent />
      <AppFooter />
    </div>
  </div>
</template>
