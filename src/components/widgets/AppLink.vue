<script setup>
defineProps(['to'])
</script>

<template>
  <RouterLink
    :to="to"
    class="text-[--primary-second-color] font-medium cursor-pointer hover:text-[--warning-color] active:text-[--warning-color]"
  >
    <slot></slot>
  </RouterLink>
</template>
