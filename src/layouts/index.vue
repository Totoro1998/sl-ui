<script setup>
import AppHeader from './components/AppHeader.vue'
import AppContent from './components/AppContent.vue'
import AppFooter from './components/AppFooter.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { requestGet } from '@/lib/request'
import { REQUEST_URL } from '@/lib/const'

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

requestGet(REQUEST_URL.TEST).then((res) => {
  console.log(res)
})
</script>

<template>
  <div
    ref="wrapperRef"
    class="w-full h-full overflow-y-scroll hidden-scrollbar relative pt-[--header-height] flex flex-col"
  >
    <AppHeader />
    <div class="flex-1 flex flex-col bg-[#f2f2f7] mx-auto max-w-[--max-content-width]">
      <AppContent />
    </div>
    <AppFooter />
  </div>
</template>
