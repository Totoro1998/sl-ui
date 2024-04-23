<script setup>
import HeaderLogo from '@/assets/icons/HeaderLogo.svg'
</script>

<template>
  <header class="z-[9999] bg-[#303030] fixed top-0 left-0 w-full">
    <div
      class="max-w-[--max-content-width] h-[--header-height] lg:px-[108px] px-6 flex items-center w-full mx-auto"
    >
      <img :src="HeaderLogo" alt="Shaolin" :style="{ height: '40px' }" />
    </div>
  </header>
</template>
