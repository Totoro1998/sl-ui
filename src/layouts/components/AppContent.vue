<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'

const openCache = computed(() => true)
</script>

<template>
  <main class="max-w-[--max-content-width] mx-auto w-full">
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
