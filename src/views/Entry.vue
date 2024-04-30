<script setup>
import Logo from '@/assets/images/entry-logo.svg'
import useEntry from './hooks/useEntry'
import { useRouter } from 'vue-router'

const { allEntryList } = useEntry()

const router = useRouter()
</script>

<template>
  <div class="entry-wrapper pt-6 pb-12 px-4">
    <div class="w-full max-w-[564px] mx-auto">
      <div class="flex items-center justify-center mb-6">
        <img :src="Logo" />
      </div>
      <div class="flex flex-col gap-y-8">
        <div
          v-for="entryItem in allEntryList"
          :key="entryItem.type"
          @click="
            router.push({
              name: 'ENTRY-FORM',
              params: {
                type: entryItem.type
              }
            })
          "
          class="flex py-12 px-6 gap-x-4 items-center justify-between rounded-2xl bg-white cursor-pointer shadow-lg"
        >
          <div class="flex flex-col gap-y-6">
            <h1 class="font-bold text-xl lg:text-3xl">{{ entryItem.title }}</h1>
            <p class="lg:text-xl text-sm">{{ entryItem.tip }}</p>
          </div>
          <div>
            <van-icon name="down" color="#ff6418" size="24" class="-rotate-90" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.entry-wrapper {
  position: relative;
  background: linear-gradient(#ff6418, rgb(239, 238, 244) 50%, rgb(239, 238, 244));
}
</style>
