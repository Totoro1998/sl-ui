<script setup>
import AppHeader from './components/AppHeader.vue'
import AppContent from './components/AppContent.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div
    class="w-full hidden-scrollbar h-screen overflow-y-scroll relative mx-auto pt-[--header-height] max-w-[--max-content-width] bg-[--bg-color]"
  >
    <AppHeader />
    <AppContent />
    <AppFooter />
  </div>
</template>
