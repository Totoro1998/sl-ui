<script setup>
const modules = import.meta.glob('./modules/*.vue', { eager: true })
const sortMap = [
  'banner',
  'time-block',
  'activity',
  'schedule',
  'medal',
  'sign-up-notice',
  'question-answer',
  'partners'
]
const components = sortMap.map((key) => modules[`./modules/${key}.vue`].default)
</script>

<template>
  <template v-for="(_com, _index) in components" :key="_index">
    <component :is="_com" />
  </template>
</template>
