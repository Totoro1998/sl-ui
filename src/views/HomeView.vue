<script setup>
import { ref } from 'vue'

const default_ref = {
  name: 'fk',
  age: '18'
}
const form = ref({ ...default_ref })

function handleClick() {
  console.log(default_ref)
}
</script>
<template>
  <main>
    <div>
      <span>name:</span>
      <input v-model="form.name" />
    </div>
    <div>
      <span>age:</span>
      <input v-model="form.age" />
    </div>
    <button @click="handleClick">click</button>
  </main>
</template>
