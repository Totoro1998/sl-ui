<script setup>
defineProps(['title', 'subTitle'])
</script>
<template>
  <div class="w-full mx-auto max-w-[556px] pt-12 pb-8 px-6">
    <div class="lg:text-center mb-8">
      <h1 class="text-4xl text-[--primary-color] font-semibold">
        <slot name="title" v-if="!title"></slot>
        <template v-else>
          {{ title }}
        </template>
      </h1>
      <p class="text-[--primary-second-color] text-lg mt-4">
        <slot name="subTitle" v-if="!subTitle"></slot>
        <template v-else>
          {{ subTitle }}
        </template>
      </p>
      <slot name="headerExtra"></slot>
    </div>
    <slot></slot>
  </div>
</template>
