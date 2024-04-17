<script setup>
import { ref, computed } from 'vue'
const props = defineProps(['barList'])

const indexList = computed(() => {
  return props.barList.map((bar) => bar.key)
})

const barListRef = ref(null)

const itemsRef = ref({})

const setRef = (key) => (el) => {
  if (el) {
    itemsRef.value[`item-${key}`] = el
  }
}

const scrollToItem = (key) => {
  const itemRef = itemsRef.value[`item-${key}`]
  if (itemRef) {
    barListRef.value.scrollTop = itemRef.offsetTop
  }
}
</script>

<template>
  <div class="app-index-bar-list-wrapper">
    <div class="app-index-bar-sidebar">
      <span class="sidebar-item" v-for="key in indexList" :key="key" @click="scrollToItem(key)">
        {{ key }}
      </span>
    </div>
    <div class="app-index-bar-content hidden-scrollbar" ref="barListRef">
      <template v-for="bar in barList" :key="bar.key">
        <div class="index-bar-title" :ref="setRef(bar.key)">
          {{ bar.key }}
        </div>
        <div class="index-bar-item" v-for="item in bar.items" :key="item.value">
          <slot name="barItem" :item="item"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="less">
.app-index-bar-list-wrapper {
  height: 600px;
  position: relative;
}
.app-index-bar-sidebar {
  position: absolute;
  display: flex;
  right: 24px;
  top: 24px;
  flex-direction: column;
}
.app-index-bar-content {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
</style>
