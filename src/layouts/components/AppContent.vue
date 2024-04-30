<script setup>
import { APP_ROUTE_PATHS } from '@/lib/const'
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const openCache = computed(() => true)

const fullScreenPathName = [`/${APP_ROUTE_PATHS.LOGIN}`, `/${APP_ROUTE_PATHS.ENTRY}`]

const { path } = useRoute()

const className = computed(() => {
  const base = 'mx-auto w-full'
  if (fullScreenPathName.includes(path)) {
    return `${base}`
  }
  return `${base} max-w-[--max-content-width]`
})
</script>

<template>
  <main :class="className">
    <RouterView>
      <template #default="{ Component, route }">
        <transition appear>
          <keep-alive v-if="openCache">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
  </main>
</template>
