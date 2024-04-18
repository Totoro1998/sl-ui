<script setup>
defineProps(['to'])
</script>

<template>
  <RouterLink
    :to="to"
    class="cursor-pointer hover:text-[--warning-color] active:text-[--warning-color]"
  >
    <slot></slot>
  </RouterLink>
</template>
