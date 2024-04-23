<script setup>
import AppHeader from './components/AppHeader.vue'
import AppContent from './components/AppContent.vue'
import AppFooter from './components/AppFooter.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const wrapperRef = ref(null)
router.beforeEach((to, from, next) => {
  wrapperRef.value &&
    wrapperRef.value.scrollTo({
      top: 0,
      left: 0
    })
  next()
})
</script>

<template>
  <div
    ref="wrapperRef"
    class="w-full flex flex-col hidden-scrollbar h-full bg-[#f2f2f7] overflow-y-scroll relative mx-auto pt-[--header-height] max-w-[--max-content-width] bg-[--bg-color]"
  >
    <AppHeader />
    <AppContent />
  </div>
  <AppFooter />
</template>
