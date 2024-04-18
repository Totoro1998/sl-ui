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
    console.log(itemRef.offsetTop)
    barListRef.value.scrollTop = itemRef.offsetTop - 24
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
        <div
          class="index-bar-item cursor-pointer hover:bg-slate-100"
          v-for="item in bar.items"
          :key="item.value"
        >
          <slot name="barItem" :item="item"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="less">
.app-index-bar-list-wrapper {
  height: 600px;
  width: 100%;
  position: relative;
  padding: 36px;
  border-radius: 36px;
  background-color: white;
}
.app-index-bar-sidebar {
  position: absolute;
  display: flex;
  right: 36px;
  top: 36px;
  flex-direction: column;
  .sidebar-item {
    font-size: 12px;
    cursor: pointer;
  }
}
.app-index-bar-content {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  .index-bar-item {
    padding: 16px 0;
  }
  .index-bar-item:not(:last-child) {
    border-bottom: 0.5px rgb(235, 237, 240) solid;
  }
  .index-bar-title {
    padding-top: 16px;
  }
  .index-bar-title:first-child {
    padding-top: 0;
  }
}
</style>
